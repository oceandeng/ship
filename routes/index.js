/* CURL 请求模块 */
var request = require('request');

/* 引入user MODEL类 */
var User = require('../models/user')

/* ROUTER */
var router = function(app){


//-- GET index listing
	app.get('/', function(req, res, next) {
	  res.render('index', { title: '首页' });
	});

//-- GET D3 listing
	app.get('/d3', function(req, res, next){
		res.render('d3', {title: 'D3DEMO'});
	});

//-- GET DEMO listing
	app.get('/demo', function(req, res, next){
		res.render('demo', {title: 'DEMO'});
	});

//-- GET Mobiscroll listing
	app.get('/mobiscroll', function(req, res, next){
		res.render('mobiscroll', {title: 'Mobiscroll'});
	});

// -- GET Angular listing
	app.get('/angular', function(req, res, next){
		res.render('angular', {title: 'Angular'});
	})

//-- POST DEMO listing
	app.post('/demo', function(req, res, next){
		var user = req.body.user;

console.log(user);

		res.send({user: user});

	});

//-- POST user 存入mongedb方法
	app.post('/users', function(req, res, next){
		var data = req.body;

		// 存储提交信息
		var _user = new User({
			username: data.username
		});

		if(data.username != ''){
			_user.save(function(err, next){
				if(err){
					console.log(err);
				}

				// 重定向跳转页面
				res.redirect('/d3');
			});

		}

	});

//-- 接口访问方法
	app.post('/interface', function(req, res, next){
		var user = req.body.user;

		res.send('respond post with a resource');
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
	})
}

module.exports = router;