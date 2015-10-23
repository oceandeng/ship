/* 
* @Author: ocean
* @Date:   2015-10-19 11:11:06
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-19 11:20:53
*/

'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('d3', {
		title: 'd3DEMO'
	});
});

module.exports = router;