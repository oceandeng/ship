/* 
* @Author: ocean
* @Date:   2016-01-15 10:26:29
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-17 22:44:56
*/

'use strict';

var mongodb = require('../db'),
	markdown = require('markdown').markdown;

var Post = function(username, title, post){
	this.username = username;
	this.title = title;
	this.post = post;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback){
	var date = new Date(),
	//存储各种时间格式，方便以后扩展
		time = {
			time: date,
			year: date.getFullYear(),
			month: date.getFullYear() + "-" + (date.getMonth() + 1),
			day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
			minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		};

	//要存入数据库的文档
	var post = {
		username: this.username,
		time: time,
		title: this.title,
		post: this.post,
		commnets: []
	}

	//打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		//读取 posts 集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将文档插入 posts 集合
			collection.insert(post, {safe: true}, function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			})
		})
	});
};

// 获取一个人的所有文章（传入参数 name）或获取所有人的文章（不传入参数）
Post.getAll = function(username, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if(username){
				query.username = username;
			}
			// 根据 query 对象查询文章
			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				docs.forEach(function(doc){
					doc.post = markdown.toHTML(doc.post);
				})
				callback(null, docs)
			})
		});
	});
};

//根据用户名、发表日期及文章名精确获取一篇文章。
Post.getOne = function(username, day, title, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、发表日期及文章名进行查询
			collection.findOne({
				"username": username,
				"time.day": day,
				"title": title
			}, function(err, doc){
				mongodb.close();
				if(err){
					return callback(err);
				}
				// 解析 markdown 为 html
				if(doc){
					doc.post = markdown.toHTML(doc.post);
					doc.comments.forEach(function(comment){
						comment.content = markdown.toHTML(comment.content);
					});
				}
				callback(null, doc);
			});
		});
	})
}

// 返回原始发表的内容（markdown 格式）
Post.edit = function(username, day, title, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取 posts 集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、发表日期及文章名进行查询
			collection.findOne({
				"username": username,
				"time.day": day,
				"title": title
			}, function(err, doc){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, doc);  //返回查询的一篇文章（markdown 格式)
			})
		})
	})
}

// 更新一篇文章及其相关信息
Post.update = function(username, day, title, post, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 更新文章内容
			collection.update({
				"username": username,
				"time.day": day,
				"title": title
			}, {
				$set: {post: post}
			}, function(err, doc){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			});
		})
	})
}

// 删除一篇文章
Post.remove = function(username, day, title, callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 连接posts 集合
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、日期和标题查找并删除一篇文章
			collection.remove({
				"username": username,
				"time.day": day,
				"title": title
			}, {
				w: 1
			}, function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			})
		})
	});
}