/* 
* @Author: ocean
* @Date:   2016-01-17 22:11:01
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-18 10:23:44
*/

'use strict';

var mongodb = require('../db');

function Comment(username, day, title, comment){
	this.username = username;
	this.day = day;
	this.title = title;
	this.comment = comment;
}

module.exports = Comment;

// 存储一条留言信息
Comment.prototype.save = function(callback){
	var username = this.username,
		day = this.day,
		title = this.title,
		comment = this.comment;

	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback();
			}
			collection.update({
				"username": username,
				"time.day": day,
				"title": title
			}, {
				$push: {"comments": comment}
			}, function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			})
		})
	})
}