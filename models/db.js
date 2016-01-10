/* 
* @Author: ocean
* @Date:   2016-01-10 21:32:07
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-10 21:34:20
*/

'use strict';
var settings = require('../settings'),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});