/*
* @Author: ocean
* @Date:   2016-01-10 21:11:07
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-24 22:51:15
*/

'use strict';
var crypto = require('crypto');
var User = require('../models/blog/user');
var Post = require('../models/blog/post');
var Uphead = require('../models/blog/uphead');
var Comment = require('../models/blog/comment');

var blogRouter = function(app){
	app.get('/blog/', function(req, res){
		// 判断是否是第一页，并把请求的页数转换成数字类型
		var page = parseInt(req.query.p) || 1;
		var pageNum = 5;

		Post.getTen(null, page, function (err, posts, total){
			if(err){
				posts = [];
			}

			res.render('blog/index', {
				title: '首页',
				user: req.session.user,
				posts: posts,
				page: page,
				total: Math.ceil(total / pageNum),
				isFirstPage: (page - 1) == 0,
				isLastPage: ((page - 1) * pageNum + posts.length) == total,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			})
		})
	});
	app.get('/blog/reg', function(req, res){
		res.render('blog/reg', {
			title: '注册'
		});
	});
	app.post('/blog/reg', function(req, res){
		var username = req.body.username,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		// 校验用户两次输入的密码是否一致
		if(password_re != password){
			req.flash('error', '两次输入的密码不一致！');
			return res.redirect('/blog/reg');
		}
		// 生成密码的md5值
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			username: username,
			password: password,
			email: req.body.email
		});
		// 检查用户名是否存在
		User.get(newUser.username, function(err, user){
			if(err){
				req.flash('error', err);
				return res.redirect('/blog/');
			}
			if(user){
				req.flash('error', '用户名已存在');
				return res.redirect('/blog/reg')
			}
			// 如果不存在则新增用户
			newUser.save(function(err, user){
				if(err){
					req.flash('error', err);
					return res.redirect('/blog/reg');
				}
				req.session.user = user;
				req.flash('success', '注册成功！');
				res.redirect('/blog/');

				// AJAX 返回json
				// res.json({success:1});
			})
		})
	});

	app.get('/blog/login', checkNotLogin);
	app.get('/blog/login',function(req, res){
		res.render('blog/login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/blog/login', checkNotLogin);
	app.post('/blog/login', function(req, res){
		// 生成密码md5
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		// 检查用户是否存在
		User.get(req.body.username, function(err, user){
			if(!user){
				req.flash('error', '用户名不存在！');
				return res.redirect('/blog/login');
			}
			if(user.password != password){
				req.flash('error', '密码错误！');
				return res.redirect('/blog/login');
			}
			// 用户名和密码都匹配后，将用户信息存入session
			req.session.user = user;
			req.flash('success', '登录成功！');
			res.redirect('/blog/');
		});
	});

	app.get('/blog/post', checkLogin);
	app.get('/blog/post', function(req, res){
		res.render('blog/post', {
			title: '发表',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/blog/post', checkLogin);
	app.post('/blog/post', function(req, res){
		var currentUser = req.session.user,
			tags = [req.body.tag1, req.body.tag2, req.body.tag3],
			post = new Post(currentUser.username, req.body.title, tags, req.body.post);

		post.save(function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('/blog/');
			}
			req.flash('success', '发布成功！');
			res.redirect('/blog/'); //发表成功跳转到主页
		});
	});

	app.get('/blog/logout', checkLogin);
	app.get('/blog/logout', function(req, res){
		req.session.user = null;
		req.flash('success', '退出成功');
		res.redirect('/blog/');
	});

	app.get('/blog/tags', function(req, res){
		Post.getTags(function(err, posts){
			if(err){
				req.flash('error', err);
				res.redirect('/blog/');
			}
			res.render('blog/tags', {
				title: "标签",
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	app.get('/blog/tag/:tag', function(req, res){
		Post.getTag(req.params.tag, function(err, posts){
			if(err){
				req.flash('error', err);
				res.redirect('/blog/');
			}
			res.render('blog/tag', {
				title: req.params.tag,
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	app.get('/blog/archive', function(req, res){
		Post.getArchive(function (err, posts){
			if(err){
				req.flash('error', err);
				res.redirect('/blog/');
			}
			res.render('blog/archive', {
				title: '存档',
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			})
		});
	})

	app.get('/blog/u/:username', function(req, res){
		var page = parseInt(req.query.p) || 1;
		var pageNum = 5;

		// 检查用户是否存在
		User.get(req.params.username, function(err, user){
			if(!user){
				req.flash('error', '用户名不存在！');
				return res.redirect('/blog/'); //用户不存在则跳转到主页
			}

			//查询并返回该用户第 page 页的 10 篇文章
			Post.getTen(user.username, page, function(err, posts, total){
				if(err){
					req.flash('error', err);
					return res.redirect('blog/');
				}

				Uphead.get(user.username, function(err, userhead){
					if(err){
						req.flash('error', err);
						return res.redirect('blog/');
					}
					console.log(userhead);
					res.render('blog/user', {
						title: '首页',
						user: req.session.user,
						userhead: userhead,
						posts: posts,
						page: page,
						total: Math.ceil(total / pageNum),
						isFirstPage: (page - 1) == 0,
						isLastPage: ((page - 1) * pageNum + posts.length) == total,
						success: req.flash('success').toString(),
						error: req.flash('error').toString()
					})
				})

			});
		});
	});

	app.get('/blog/u/:username/:day/:title', function(req, res){
		Post.getOne(req.params.username, req.params.day, req.params.title, function(err, post){
			if(err){
				req.flash('error', err);
				return res.redirect('/blog/');
			}
			res.render('blog/article', {
				title: req.params.title,
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	app.get('/blog/edit/:username/:day/:title', checkLogin);
	app.get('/blog/edit/:username/:day/:title', function(req, res){
		var currentUser = req.session.user;
		Post.edit(currentUser.username, req.params.day, req.params.title, function(err, post){
			if(err){
				req.flash('error', err);
				return res.redirect('back');
			}
			res.render('blog/edit', {
				title: '编辑',
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.post('/blog/edit/:username/:day/:title', checkLogin);
	app.post('/blog/edit/:username/:day/:title', function(req, res){
		var currentUser = req.session.user;
		Post.update(currentUser.username, req.params.day, req.params.title, req.body.post, function(err){
			var url = encodeURI('/blog/u/' + req.params.username + '/' + req.params.day + '/' + req.params.title);
			if(err){
				req.flash('error', err);
				return res.redirect(url); //出错返回文章页
			}
			req.flash('success', '修改成功！');
			res.redirect(url); // 成功！返回文章页
		})
	})

	app.get('/blog/remove/:username/:day/:title', checkLogin);
	app.get('/blog/remove/:username/:day/:title', function(req, res){
		var currentUser = req.session.user;
		Post.remove(currentUser.username, req.params.day, req.params.title, function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('back');
			}
			req.flash('success', '删除成功！');
			res.redirect('/blog/');
		})
	});

	app.post('/blog/u/:username/:day/:title', function(req, res){
		var date = new Date(),
			time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "" + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

		var comment = {
			username: req.body.username,
			email: req.body.email,
			website: req.body.website,
			time: time,
			content: req.body.content
		}

		var newComment = new Comment(req.params.username, req.params.day, req.params.title, comment);

		newComment.save(function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('back');
			}
			req.flash('success', '留言成功！');
			res.redirect('back');
		})
	})

	app.get('/blog/search', function(req, res){
		Post.search(req.query.keyword, function (err, posts){
			if(err){
				req.flash('error', err);
				res.redirect('/blog/');
			}
			res.render('blog/search', {
				title: req.query.keyword,
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	app.get('/blog/links', function(req, res){
		res.render('blog/links', {
			title: '友情链接',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		})
	})

	// 转载
	app.get('/blog/reprint/:username/:day/:title', checkLogin);
	app.get('/blog/reprint/:username/:day/:title', function(req, res){
		Post.edit(req.params.username, req.params.day, req.params.title, function(err, post){
			if(err){
				req.flash('error', err);
				return res.redirect('back');
			}

			var currentUser = req.session.user,
				reprint_from = { username: post.username, day: post.time.day, title: post.title},
				reprint_to = { username: currentUser.username};

			Post.reprint(reprint_from, reprint_to, function (err, post){
				if(err){
					req.flash('error', err);
					return res.redirect('back');
				}
				req.flash('success', '转载成功！');
				var url = encodeURI('/blog/u/' + post.username + '/' + post.time.day + '/' + post.title);
				// 跳转到转载后的文章页面
				res.redirect(url);
			});
		});
	});

	app.get('/blog/post', function(req, res){
		res.render('blog/post', {
			title: '发表',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			res.redirect('/blog/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登录!');
			res.redirect('back');//返回之前的页面
		}
		next();
	}

}

module.exports = blogRouter;