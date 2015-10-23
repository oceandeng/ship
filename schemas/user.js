/* 
* @Author: ocean
* @Date:   2015-10-19 15:03:22
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-19 15:40:32
*/

'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username : String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

UserSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAT = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
});

UserSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = UserSchema;