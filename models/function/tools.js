/* 
* @Author: ocean
* @Date:   2016-01-27 16:41:20
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-27 16:46:01
*/

'use strict';

var Tools = function(){};

Tools.delHtmlTag = function(str){
	return str.replace(/<[^>]+>/g, "");
}

module.exports = Tools;