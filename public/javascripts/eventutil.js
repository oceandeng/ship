/* 
* @Author: ocean
* @Date:   2015-06-28 19:13:05
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-01 23:00:40
*/

'use strict';

var EventUtil = {
	// 添加事件绑定
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else{
			element["on" + type] = handler;
		}
	},
	// 获取事件对象
	getEvent : function(event){
		return event ? event : window.event;
	},
	// 获取事件返回的目标
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	// 组织默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	// 删除事件绑定
	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		}else{
			element["on" + type] = null;
		}
	},
	// 组织冒泡
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	// 获取滚轮信息
	getWheelDelta: function(event){
		if(event.wheelDelta){
			// return (client.engine.opera && client.engine.opera < 9.5 ? -event.whellDelta : event.wheelDelta);
			return event.wheelDelta;
		}else{
			return -event.delta *40;
		}
	},
	// 获取键盘码
	getCharCode: function(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
}

// 事件截流
	var processor = {
		timeoutId: null,

		// 实际进行处理的方法
		performProcessing: function(){
			// 实际执行的代码
		},

		// 初始处理调用的方法
		process: function(){
			clearTimeout(timeoutId);

			var that = this;
			this.timeoutId = setTimeout(function(){
				that.performProcessing();
			}, 100);
		}
	}

	// 调用
	// processor.process();

	// 简化函数
	// function throttle(method, context){
	// 	clearTimeout(method.tId);
	// 	method.tId= setTimeout(function(){
	// 		method.call(context);
	// 	}, 100);
	// }

	// // div 窗口变化时高度等于宽度
	// function resizeDiv(){
	// 	var div = document.getElementById('myDiv');
	// 	div.style.height = div.offsetWidth + 'px';
	// }

	// window.onresize = function(){
	// 	throttle(resizeDiv);
	// }

// 自定义DOM事件 createEvent('customEvent');
	// DOM.createEvent('customEvent').initCustomEvent(type, bubbles, cancelable, detail);
		// type (字符串)：触发的时间类型， 例如'keydown'
		// bubbles (布尔值)：表示事件是否应该冒泡
		// cancelable (布尔值)：表示事件是否可以取消
		// detail (对象)：任意值，保存在event对象的detail属性中
	// var div = document.getElementById('myDiv'),
	// 	event;

	// EventUtil.addHandler(div, 'myevent', function(event){
	// 	alert('DIV：' + event.detail);
	// });
	// EventUtil.addHandler(document, 'myevent', function(event){
	// 	alert('DOCUMENT:' + event.detail);
	// });

	// if(document.implementation.hasFeature('CustomEvents', '3.0')){
	// 	event = document.createEvent('CustomEvents');
	// 	event.initCustomEvent('myevent', true, false, 'Hello World!');
	// 	div.dispatchEvent(event);
	// }


// 监测是touch事件
// function handleTouchEvent(event){
// 	// 只跟踪一次
// 	if(event.changedTouches.length == 1){
// 		var output = document.getElementById("output");
// 		switch(event.type){
// 			case "touchstart":
// 				output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
// 				break;
// 			case "touchend":
// 				output.innerHTML += "<br>Touch ended (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
// 				break;
// 			case "touchmove":
// 				event.preventDefault();
// 				output.innerHTML += "<br>Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
// 				break;
// 		}
// 	}
// }
// EventUtil.addHandler(document, "touchstart", handleTouchEvent);
// EventUtil.addHandler(document, "touchend", handleTouchEvent);
// EventUtil.addHandler(document, "touchmove", handleTouchEvent);