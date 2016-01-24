/* 
* @Author: ocean
* @Date:   2016-01-22 13:59:30
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-24 22:39:35
*/

'use strict';

var mongodb = require('../db');

var UpHead = function(username, userhead){
	this.username = username;
	this.userhead = userhead;
}

// 上传头像
UpHead.prototype.save = function(callback){
	var date = new Date(),
		time = {
			time: date,
			year: date.getFullYear(),
			month: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		};

	var userhead = {
		username: this.username,
		userhead: this.userhead,
		time: time
	}

	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('userhead', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(userhead, {safe: true}, function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			})
		});
	})
}

// 读取头像
UpHead.get = function(username, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('userhead', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				username: username
			}, function(err, userhead){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, userhead);
			})
		})
	})
}

module.exports = UpHead;