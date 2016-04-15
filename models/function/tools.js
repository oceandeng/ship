/* 
* @Author: ocean
* @Date:   2016-01-27 16:41:20
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-12 11:50:54
*/

'use strict';

var Tools = function(){};

Tools.delHtmlTag = function(str){
	return str.replace(/<[^<]+>/gi, "");
}

module.exports = Tools;