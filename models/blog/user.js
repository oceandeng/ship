/* 
* @Author: ocean
* @Date:   2016-01-10 23:15:19
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-11 11:47:39
*/

'use strict';

var mongodb = require('../db');

function User(user){
	this.username = user.username;
	this.password = user.password;
	this.email = user.email;
}

// 存储用户信息
User.prototype.save = function(callback){
	// 要存入数据库的文档
	var user = {
		username: this.username,
		password: this.password,
		email: this.email
	};
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取users集合
		db.collection('users', function(err, collection){
			if(err){
				mongodb.close;
				return callback(err)
			}
			// 将用户数据插入users集合
			collection.insert(user, {
				safe: true
			}, function(err, user){
				mongodb.close();
				if(err){
					return callback(err)
				}
				callback(null, user[0]);
			})
		})
	})
}

// 读取用户信息
User.get = function(username, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取users集合
		db.collection('users', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 查找用户名
			collection.findOne({
				username: username
			}, function(err, user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, user);
			})
		});
	})
}

module.exports = User;