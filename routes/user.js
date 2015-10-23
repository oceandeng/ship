var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
	var data = req.body;

	// 存储提交信息
	var _user = new User({
		username: data.username
	});

	_user.save(function(err, user){
		if(err){
			console.log(err);
		}

		// 重定向跳转页面
		res.redirect('/demo');
	})

	console.log(data);
});

module.exports = router;