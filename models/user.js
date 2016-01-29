/* 
* @Author: ocean
* @Date:   2015-10-19 15:03:02
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-25 10:38:09
*/

'use strict';

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/ship');

module.exports = User;