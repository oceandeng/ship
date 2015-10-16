/* 
* @Author: ocean
* @Date:   2015-09-09 14:46:16
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-16 17:30:50
*/

'use strict';

var express = require('express');
var router = express.Router();

var request = require('request');

/* GET demo listing. */
router.get('/', function(req, res, next) {

	request.post(
		{
			url: 'http://demo.cn/demo.php',
			form: {
				username: 'hahaha',
				password: 'wowowowo'
			},
			encoding: 'utf8'
		}, function(error, response, body){
			if(response.statusCode == 200){

				var json = JSON.parse(response.body);

console.log('---------------------------------');
				console.log(json.username);
				console.log(json.password);
console.log('---------------------------------');

			// console.log(body);

			res.render('demo', {
				title: 'Express',
				form: json
			});

			}else{
				console.log(response.statusCode);
			}
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
  res.send('respond post with a resource');
});

module.exports = router;

// 实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。