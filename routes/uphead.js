/* 
* @Author: ocean
* @Date:   2016-01-22 15:30:05
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-22 18:00:08
*/

'use strict';

var muphead = require('../models/blog/uphead');


var uphead = function(app){

	app.get('/blog/uphead', checkLogin);
	app.get('/blog/uphead', function(req, res){
		res.render('blog/uphead', {
			title: '上a传头像',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		})
	});

	app.post('/blog/uphead', function(req, res){
		console.log(req.files);
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

module.exports = uphead;