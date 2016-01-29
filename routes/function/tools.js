/* 
* @Author: ocean
* @Date:   2016-01-28 14:48:46
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-28 15:43:10
*/

'use strict';

var Tools = function(){};

Tools.isNull = function(str){
	if(str == ''){
		return true;
	}
}

Tools.isEmail = function(str){
	var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
	if(myReg.test(str)){
		return true;
	}
	return false;
}

Tools.rLength = function(str){
	if(str.length >= 6 || str.length <= 20){
		return true;
	}
	return false;
}

module.exports = Tools;