/* 
* @Author: ocean
* @Date:   2016-01-15 10:26:29
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-04-12 13:08:19
*/

'use strict';

var mongodb = require('../db');
var Tools = require('../function/tools');
	// markdown = require('markdown').markdown;

var Post = function(username, title, tags, post){
	this.username = username;
	this.title = title;
	this.tags = tags;
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

	var abstract = Tools.delHtmlTag(this.post);
	abstract = abstract.substring(0, 120);

	//要存入数据库的文档
	var post = {
		username: this.username,
		time: time,
		title: this.title,
		tags: this.tags,
		abstract: abstract,
		post: this.post,
		userhead: this.userhead,
		comments: [],
		reprint_info: {},
		pv: 0
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
			});
		});
	});
};

// 获取一个人的所有文章（传入参数 username）或获取所有人的文章（不传入参数）
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
				// docs.forEach(function(doc){
				// 	doc.post = markdown.toHTML(doc.post);
				// })
				callback(null, docs)
			})
		});
	});
};

// 一次获取诗篇文章
Post.getTen = function(username, page, callback){

	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取 posts 集合
		db.collection('posts', function (err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var pageNum = 5;
			var query = {};
			if(username){
				query.username = username;
			}
			//使用 count 返回特定查询的文档数 total
			collection.count(query, function (err, total){
				//根据 query 对象查询，并跳过前 (page-1) * pageNum 个结果，返回之后的 pageNum 个结果
				collection.find(query, {
					skip: (page - 1) * pageNum,
					limit: pageNum
				}).sort({
					time: -1
				}).toArray(function (err, docs){
					mongodb.close();
					// if(err){
					// 	return callback(err);
					// }
					// 解析 markdown 为 html
					// docs.forEach(function (doc, index){
					// 	doc.post = markdown.toHTML(doc.post);
					// })
					callback(null, docs, total);
				});
			});
		});
	});
}

//根据用户名、发表日期及文章名精确获取一篇文章。
Post.getOne = function(username, day, title, callback){
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
				return callback(err);
			}
			// 根据用户名、发表日期及文章名进行查询
			collection.findOne({
				"username": username,
				"time.day": day,
				"title": title
			}, function(err, doc){
				if(err){
					mongodb.close();
					return callback(err);
				}
				// 解析 markdown 为 html
				if(doc){
					//每访问 1 次，pv 值增加 1
					collection.update({
						"username": username,
						"time.day": day,
						"title": title
					}, {
						$inc: {"pv": 1}
					});
					// doc.post = markdown.toHTML(doc.post);
					// doc.comments.forEach(function(comment){
					// 	comment.content = markdown.toHTML(comment.content);
					// });
					mongodb.close();
					callback(null, doc);
				}
			});
		});
	});
}

// 返回所有标签
Post.getTags = function(callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取posts 集合
		db.collection('posts', function (err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
      		//distinct 用来找出给定键的所有不同值
			collection.distinct('tags', function(err, docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
}

// 返回含有标签的所有文章
Post.getTag = function(tag, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({
				'tags': tag
			}, {
				'username': 1,
				'time': 1,
				'title': 1,
			}).sort({
				time: -1
			}).toArray(function(err, docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, docs);
			})
		})
	})
}

// 返回通过标题关键字查询的所有文章信息
Post.search = function(keyword, callback){
	mongodb.open(function (err, db){
		if(err){
			return callback(err);
		}
		db.collection('posts', function (err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var pattern = new RegExp(keyword, "i");
			collection.find({
				"title": pattern
			}, {
				"username": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function (err, docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
}

// 返回所有文章存档信息
Post.getArchive = function(callback){
	// 打开数据库
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 连接 posts 集合
		db.collection('posts', function (err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//返回只包含 username、time、title 属性的文档组成的存档数组
			collection.find({}, {
				"username": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err, docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, docs);
			})
		})
	})
}

// 返回原始发表的内容（ markdown 格式）
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

			// 查找要删除的文章
			collection.findOne({
				"username": username,
				"time.day": day,
				"title": title
			}, function (err, doc){
				if(err){
					mongodb.close();
					return callback(err);
				}
				// 如果有reprint_from, 文章是转载过来的, 先保存reprint_from
				var reprint_from = "";
				if(doc.reprint_info.reprint_from){
					reprint_from = doc.reprint_info.reprint_from;
				}
				if(reprint_from != ""){
					//更新原文章所在文档的 reprint_to
					collection.update({
						"username": reprint_from.username,
						"time.day": reprint_from.day,
						"title": reprint_from.title
					}, {
						$pull: {
							"reprint_info.reprint_to": {
								"username": username,
								"day": day,
								"title": title
							}
						}
					}, function(err){
						if(err){
							mongodb.close();
							return callback(err);
						}
					})
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

		})
	});
}

// 转载一篇文章
Post.reprint = function(reprint_from, reprint_to, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('posts', function (err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 找到被转载文章的原文档
			collection.findOne({
				"username": reprint_from.username,
				"time.day": reprint_from.day,
				"title": reprint_from.title
			}, function(err, doc){
				if(err){
					mongodb.close();
					return callback(err);
				}

				var date = new Date();
		        var time = {
		            date: date,
		            year : date.getFullYear(),
		            month : date.getFullYear() + "-" + (date.getMonth() + 1),
		            day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		            minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
		            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		        }

		        delete doc._id;		//注意要删掉原来的 _id

		        doc.username = reprint_to.username;
		        doc.time = time;
		        doc.title = (doc.title.search(/[转载]/) > -1) ? doc.title : doc.title + "[转载]";
		        doc.comments = [];
		        doc.reprint_info = {"reprint_from": reprint_from};
		        doc.pv = 0;

        		//更新被转载的原文档的 reprint_info 内的 reprint_to
        		collection.update({
        			"username": reprint_from.username,
        			"time.day": reprint_from.day,
        			"title": reprint_from.title
        		}, {
        			$push: {
        				"reprint_info.reprint_to": {
        					"username": doc.username,
        					"day": time.day,
        					"title": doc.title
        				}
        			}
        		}, function (err){
        			if(err){
        				mongodb.close();
        				return callback(err);
        			}
        		});

        		//将转载生成的副本修改后存入数据库，并返回存储后的文档
        		collection.insert(doc, {
        			safe: true
        		}, function (err, post){
        			mongodb.close();

        			if(err){
        				return callback(err);
        			}
        			callback(null, post.ops[0]);
        		})
			})
		});
	});
}