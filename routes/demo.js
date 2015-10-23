/* 
* @Author: ocean
* @Date:   2015-09-09 14:46:16
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-19 16:27:54
*/

'use strict';

var express = require('express');
var router = express.Router();

// CURL 请求模块
var request = require('request');

/* GET demo listing. */
router.get('/', function(req, res, next) {

	res.render('demo', {
		title: 'Express'
	});

});

// 使用多个回调函数处理路由（记得指定 next 对象）
	// router.get('/', function (req, res, next) {
	//   console.log('response will be sent by the next function ...');
	//   next();
	// }, function (req, res) {
	//   res.send('Hello from B!');
	// });

/* POST demo listing. */
router.post('/', function(req, res, next) {

	var user = req.body.user;
  // res.send('respond post with a resource');
	request.post(
		{
			url: 'http://demo.cn/demo.php',
			form: {
				username: user,
			},
			encoding: 'utf8'
		}, function(error, response, body){
			if(response.statusCode == 200){

				var json = JSON.parse(response.body);

console.log('---------------------------------');
				console.log(json.username);
console.log('---------------------------------');

			// console.log(body);

			}else{
				console.log(response.statusCode);
			}
	});

});

module.exports = router;

// 实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。