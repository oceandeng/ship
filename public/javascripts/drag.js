/* 
* @Author: ocean
* @Date:   2015-10-01 16:46:14
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-28 10:31:38
*/

'use strict';

/* MOBILE */
var DragDropMobile = function(){

    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0,
        diffW = 0,
        diffH = 0;

    var winW = window.screen.width,
        winH = window.screen.height;

    function handleEvent(event){

        // 获取位置对象和目标
        var eventPos = event.changedTouches[0];
        var target = event.target;

        // 确定事件类型
        switch(event.type){

            case "touchstart":
                if(target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = eventPos.clientX - target.offsetLeft;
                    diffY = eventPos.clientY - target.offsetTop;
                    diffW = target.clientWidth - diffX;
                    diffH = target.clientHeight - diffY;
                    dragdrop.fire({type: "dragstart", target: dragging, x: eventPos.clientX, y: eventPos.clientY});
                }
                break;
            case "touchmove":
                if(dragging !== null){
                    // 指定位置
                    var posLeft = eventPos.clientX - diffX;
                    var posRig = winW - (eventPos.clientX + diffW);
                    var posTop = eventPos.clientY - diffY;
                    var posBtm = winH - (eventPos.clientY + diffH);

                    dragging.style.left =  posLeft < 0 ? 0 : posRig < 0 ? winW - dragging.clientWidth + 'px' : posLeft + "px";

                    dragging.style.top = posTop < 0 ? 0 : posBtm < 0 ? winH - dragging.clientHeight + 'px' : posTop + "px";

                    // 触发自定义事件
                    dragdrop.fire({type: "drag", target: dragging, x: eventPos.clientX, y: eventPos.clientY});
                }

                event.preventDefault();
                break;
            case "touchend":
                dragdrop.fire({type: "dragend", target: dragging, x: eventPos.clientX, y: eventPos.clientY});
                dragging = null;
                break;
        }
    };

    // 公共接口
    dragdrop.enable = function(){
            EventUtil.addHandler(document, "touchstart", handleEvent);
            EventUtil.addHandler(document, "touchmove", handleEvent);
            EventUtil.addHandler(document, "touchend", handleEvent);
    },
    dragdrop.disable = function(){
            EventUtil.removeHandler(document, "touchstart", handleEvent);
            EventUtil.removeHandler(document, "touchmove", handleEvent);
            EventUtil.removeHandler(document, "touchend", handleEvent);
    }

    return dragdrop;
}

/* PC */
var DragDropPC = function(){

	var dragdrop = new EventTarget(),
		dragging = null,
		diffX = 0,
		diffY = 0;

	function handleEvent(event){

		// 获取事件和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		// 确定事件类型
		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable") > -1){
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					dragdrop.fire({type: "dragstart", target: dragging, x: event.clientX, y: event.clientY});
				}
				break;
			case "mousemove":
				if(dragging !== null){

					// 指定位置
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";

					// 触发自定义事件
					dragdrop.fire({type: "drag", target: dragging, x: event.clientX, y: event.clientY});
				}

				event.preventDefault();
				break;
			case "mouseup":
				dragdrop.fire({type: "dragend", target: dragging, x: event.clientX, y: event.clientY});
				dragging = null;
				break;
		}
	};

	// 公共接口
	dragdrop.enable = function(){
			EventUtil.addHandler(document, "mousedown", handleEvent);
			EventUtil.addHandler(document, "mousemove", handleEvent);
			EventUtil.addHandler(document, "mouseup", handleEvent);
	},
	dragdrop.disable = function(){
			EventUtil.removeHandler(document, "mousedown", handleEvent);
			EventUtil.removeHandler(document, "mousemove", handleEvent);
			EventUtil.removeHandler(document, "mouseup", handleEvent);
	}

	return dragdrop;
}

// 调用demo

var DragDropPC = new DragDropPC();
DragDropPC.enable();

var DragDropMobile = new DragDropMobile();
DragDropMobile.enable();

// DragDrop.addHandler("dragstart", function(event){
// 	var status = document.getElementById('myDiv');
// 	status.innerHTML = "Start dragging" + event.target.id;
// });

// DragDrop.addHandler("drag", function(event){
// 	var status = document.getElementById('myDiv');
// 	status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
// });

// DragDrop.addHandler("dragend", function(event){
// 	var status = document.getElementById('myDiv');
// 	status.innerHTML = "<br/> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
// });