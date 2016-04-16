/* 
* @Author: ocean
* @Date:   2016-01-27 16:41:20
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-04-12 12:37:41
*/

'use strict';

var Tools = function(){};

Tools.delHtmlTag = function(str){
	return str.replace(/<[^<]*>/g, "");
}

module.exports = Tools;