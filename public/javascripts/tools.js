/* 
* @Author: ocean
* @Date:   2015-10-16 15:05:14
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-16 15:58:32
*/

'use strict';
/**********************************************
**	获取图片base64编码
***********************************************/
function getBase64(imgURL){
	var body = document.getElementsByTagName('body')[0];
	var canvas = document.createElement("canvas");

	canvas.innerHTML = '您的浏览器不支持canvas!';

	body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var image = new Image();
	var dImage = new Image();

	image.onload = function(){

		canvas.width = image.width;
		canvas.height = image.height;
		canvas.style.background = 'none';

		context.drawImage(image, 0, 0);

		dImage.src = canvas.toDataURL();
		body.appendChild(dImage);
	};

	image.src = imgURL;
}

getBase64("../images/demo.jpg");