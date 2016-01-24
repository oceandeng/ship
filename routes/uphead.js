/* 
* @Author: ocean
* @Date:   2016-01-22 15:30:05
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-24 23:10:13
*/

'use strict';

var Uphead = require('../models/blog/uphead');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

var uphead = function(app){

	app.get('/blog/uphead', checkLogin);
	app.get('/blog/uphead', function(req, res){
		var currentUser = req.session.user;
		
		Uphead.get(currentUser.username, function(err, userhead){
			res.render('blog/uphead', {
				title: '上a传头像',
				userhead: userhead,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			})
		})
	});

	app.post('/blog/uphead', function(req, res, next){
		// 生成multiparty 对象，并配置上传目录路径
		var form = new multiparty.Form({uploadDir: './public/files/userhead/'});
		// 上传完后处理
		form.parse(req, function(err, fields, files){
			var filesTmp = JSON.stringify(files, null, 2);

			if(err){
				console.log('parse error' + err);
			} else {
				// console.log('parse files' + filesTmp);
				var inputFile = files.userhead[0];
				var uploadedPath = inputFile.path + '';
				var dstPath = './public/files/userhead/' + inputFile.originalFilename;

				// 重命名为真实文件名
				fs.rename(uploadedPath, dstPath, function(err) {
					if(err){
						console.log('rename error' + err);
					} else {
						console.log('rename ok');
					}
				});
			}

			var json = {
				userhead: '/files/userhead/' + inputFile.originalFilename
			}

			var user = req.session.user;

			var saveHead = new Uphead(user.username, json.userhead);

			saveHead.save(function(err){
				if(err){
					req.flash('error', err);
				}

				req.flash('success', '上传头像成功~');
				res.json(json);

			})

			// res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
			// res.write('received upload: \n\n');
			// res.end(util.inspect({fields: fields, files: filesTmp}));
		})




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