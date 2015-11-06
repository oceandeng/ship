/* 
* @Author: ocean
* @Date:   2015-10-26 13:49:19
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-26 14:13:47
*/

'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('mobiscroll', {title: 'mobiscroll'});
})

module.exports = router;
