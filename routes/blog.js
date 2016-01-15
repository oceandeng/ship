/*
* @Author: ocean
* @Date:   2016-01-10 21:11:07
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-15 18:30:04
*/

'use strict';
var crypto = require('crypto');
var User = require('../models/blog/user');
var Post = require('../models/blog/post');

var blogRouter = function(app){
	app.get('/blog/', function(req, res){
		var username = req.session.user ? req.session.user.username : null;
		Post.getAll(username, function(err, posts){
			if(err){
				posts = [];
			}
			res.render('blog/index', {
				title: '首页',
				user: req.session.user,
				posts: posts,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
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
			post = new Post(currentUser.username, req.body.title, req.body.post);

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

	app.get('/blog/u/:name', function(req, res){
		// 检查用户是否存在
		User.get(req.params.name, function(err, user){
			if(!user){
				req.flash('error', '用户名不存在！');
				return res.redirect('/blog/'); //用户不存在则跳转到主页
			}
			// 查询并返回改用户的所有文章
			Post.getAll(user.username, function(err, posts){
				if(err){
					req.flash('error', err);
					return res.redirect('/blog/');
				}
				res.render('blog/user', {
					title: user.username,
					posts: posts,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
	});

	app.get('/blog/u/:name/:day/:title', function(req, res){
		Post.getOne(req.params.name, req.params.day, req.params.title, function(err, post){
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

	app.use(function (req, res) {
		res.render("404");
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