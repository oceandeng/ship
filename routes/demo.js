/* 
* @Author: ocean
* @Date:   2015-09-09 14:46:16
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-10 14:59:18
*/

'use strict';

var express = require('express');
var router = express.Router();

/* GET demo listing. */
router.get('/', function(req, res, next) {
  res.render('demo', { title: 'Express' });
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