/* 
* @Author: ocean
* @Date:   2015-10-19 15:03:02
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-19 15:12:45
*/

'use strict';

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongoose.model('User', UserSchema);

module.exports = User;