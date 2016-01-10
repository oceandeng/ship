/* 
* @Author: ocean
* @Date:   2016-01-10 21:11:07
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-10 23:34:07
*/

'use strict';
var crypto = require('crypto');
var User = require('../models/blog/user');

var blogRouter = function(app){
	app.get('/blog/', function(req, res){
		res.render('blog/index', {
			title: '首页'
		});
	});
	app.get('/blog/reg', function(req, res){
		res.render('blog/reg', {
			title: '注册'
		});
	});
	app.post('/blog/reg', function(req, res){
		var name = req.body.username,
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
			username: req.body.username,
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
	app.get('/blog/login',function(req, res){
		res.render('blog/login', {
			title: '登录'
		});
	});
	app.post('/blog/login', function(req, res){

	});
	app.get('/blog/post', function(req, res){
		res.render('blog/post', {
			title: '发表'
		});
	});
	app.post('/blog/post', function(req, res){

	});
	app.get('/blog/logout', function(req, res){

	});
}

module.exports = blogRouter;