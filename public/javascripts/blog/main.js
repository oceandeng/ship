/* 
* @Author: ocean
* @Date:   2016-01-11 15:50:13
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-14 18:26:17
*/

'use strict';

var sW = 0, sH = 0, dW = 0, dH = 0, cH = 0;

$(window).load(function(){
	sW = $(window).width();
	sH = $(window).height();
	dW = document.body.clientWidth;
	dH = $('body').height();
    cH = $('.i-content').size() && $('.i-content').height() + $('.i-content').position().top;

    if(dH < cH){
        $('body').css({
            height: cH
        })
    }else if(dH < sH){
		$('body').css({
			height: sH
		});
	}

	// 登录 注册 上边距
	$('.form-box').css({
		marginTop: (sH - $('.form-box').height()) / 2 
	})

});

$(function(){
	sW = $(window).width();
	sH = $(window).height();

	var $bgImgb = $('#bgImg'),
		$bgImg = $bgImgb.find('img');

	if($bgImgb.size() > 0){

		$bgImgb.css({
			width: sW,
			height: sH
		})

		var image = new Image();
		image.onload = function(){
			var imgW = image.width,
				imgH = image.height,
				ratio = imgW / imgH;

			$bgImg.attr('src', image.src);
			
			resizeBg ($bgImg, ratio)
		}
		image.src = gConfig.imagePath + 'images/bg.jpg';
	}
});

function resizeBg ($ele, ratio){
	if($ele.width() < sW){
		$ele.css({
			width: sW,
			maxWidth: 'none',
			height: sW  / ratio,
			marginTop: - (sW  / ratio - sH) / 2
		});
	}

	if ($ele.height() < sH){
		$ele.css({
			width: sH  * ratio,
			maxWidth: 'none',
			height: sH,
			marginLeft: - (sH * ratio - sW) / 2
		});
	}


}