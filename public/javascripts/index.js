/* requestAnimationFrame.js
 * by zhangxinxu 2013-09-30
*/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

// 绘制星系
var Galaxy = new function(){
	this.init = function(){
		var sW = document.documentElement.clientWidth,
			sH = document.documentElement.clientHeight;

		var isMobile = !!('ontouchstart' in window);

		if(sW > sH){
			this.width = parseInt(sH * 0.8)
		}else{
			this.width = parseInt(sW * 0.9);
		}

		this.canvas = document.createElement("canvas");
		this.canvas.id = "galaxy";
		this.canvas.height = this.width;
		this.canvas.width = this.width;
		this.canvas.style.position = "absolute";
		this.canvas.style.top = "50%";
		this.canvas.style.left = "50%";
		this.canvas.style.marginLeft = -(this.width / 2) + "px";
		this.canvas.style.marginTop = -(this.width / 2) + "px";

		document.body.insertBefore(this.canvas, document.body.firstChild);

		document.addEventListener('touchmove', function(e){e.preventDefault;}, false);
		document.addEventListener('touchstart', function(e){e.preventDefault;}, false);

		//设置2d绘图环境
		this.ctx = document.getElementById("galaxy").getContext("2d");

		this.sun = new Sun(0,0,parseInt(this.width / 8 - 20),0,"#108dad", {
			size: isMobile ? 12 : 30,
			txt: "博客",
			color: "#fff"
		});
		this.mercury = new Mercury(0, -(2 * this.width / 8 - 20), isMobile ? 15 : parseInt(this.width / 8 - 40), -500, "#5719f6");
		this.venus = new Venus(0, -(3 * this.width / 8), isMobile ? 25 : parseInt(this.width / 8 - 30), 1000, "#19c9f6", {
			size: isMobile ? 10 : 20,
			txt: "打飞机",
			color: "#fff"
		});
		this.earth = new Earth(0, -parseInt(this.width / 8), 10, 800, "#999999");

		this.setupInput();
		this.loop();
	}

	//画轨道
	this.drawTrack = function(){
		this.ctx.lineWidth = 1;

		drawArc({
			_this: this,
			x: this.width/2,
			y: this.width/2,
			radius: (this.width/8),
			s: 0,
			e: 360,
			direction: false,
			color: "#108dad"
		});
		drawArc({
			_this: this,
			x: this.width/2,
			y: this.width/2,
			radius: parseInt(2*(this.width/8) - 20),
			s: 0,
			e: 360,
			direction: false,
			color: "#19c9f6"
		});
		drawArc({
			_this: this,
			x: this.width/2,
			y: this.width/2,
			radius: parseInt(3*(this.width/8)),
			s: 0,
			e: 360,
			direction: false,
			color: "#19c9f6"
		});
	};

	this.loop = function(){

		Galaxy.ctx.clearRect(0,0,Galaxy.width,Galaxy.width);
		Galaxy.drawTrack();
		Galaxy.sun.draw(Galaxy);
		Galaxy.mercury.draw(Galaxy);
		Galaxy.venus.draw(Galaxy);
		Galaxy.earth.draw(Galaxy);

		requestAnimationFrame(Galaxy.loop);
		// setTimeout(Galaxy.loop, 2000);
	}
	
	// 绑定事件
	this.setupInput = function(){
		var _this = this,
			center = {
				x: this.width/2,
				y: this.width/2
			}
		this.canvas.addEventListener('click', function(e){
			var pos ={
				x: e.offsetX,
				y: e.offsetY
			}
			var wxl = _this.sun.x + center.x - _this.sun.radius,
				wxr = wxl + _this.sun.radius * 2,
				hyt = _this.sun.y + center.y - _this.sun.radius,
				hyb = hyt + _this.sun.radius * 2;

			if(pos.x > wxl && pos.x < wxr && pos.y > hyt && pos.y < hyb){
				window.location.href = "/blog/";
			};

			var venusC = {
				x: _this.width/2 + Math.sin(_this.venus.time*(360/_this.venus.cycle)*Math.PI/180)*Math.abs(_this.venus.y),
				y: _this.width/2 - Math.cos(_this.venus.time*(360/_this.venus.cycle)*Math.PI/180)*Math.abs(_this.venus.y)
			}

			var vwxl = venusC.x - _this.venus.radius,
				vwxr = vwxl + _this.venus.radius * 2,
				vhyt = venusC.y - _this.venus.radius,
				vhyb = vhyt + _this.venus.radius * 2;

			if(pos.x > vwxl && pos.x < vwxr && pos.y > vhyt && pos.y < vhyb){
				window.location.href = "/game";
			};

		}, false);
	}

// -- 绘制轨迹函数
	function drawArc(obj){
		obj._this.ctx.save();
		obj._this.ctx.beginPath();
		obj._this.ctx.arc(obj.x, obj.y, obj.radius, obj.s, obj.e, obj.direction);
		obj._this.ctx.closePath();
		obj._this.ctx.strokeStyle = obj.color;
		obj._this.ctx.stroke();
		obj._this.ctx.restore();
	}

}

//画星球
function Star(x, y, radius, cycle, color, fontObj){
	//星球需要哪些属性
	//星球的坐标点
	this.x = x;
	this.y = y;
	//星球的半径
	this.radius = radius;
	//设置周期
	this.cycle = cycle;
	//星球的颜色，起始颜色和结束颜色

	this.color = color;
	this.fontObj = fontObj;

	//设置一个计时器
	this.time = 0;
	this.draw = function(_this){
		//保存之前的内容
		_this.ctx.save();
		//重置0，0坐标
		_this.ctx.translate(_this.width/2,_this.width/2);
		//旋转角度
		_this.ctx.rotate(this.time*(360/this.cycle)*Math.PI/180);
		//画星球
		_this.ctx.beginPath();
		_this.ctx.arc(this.x,this.y,this.radius,0,360,false);
		_this.ctx.closePath();

// 根据圆心、弧度和半径算圆周坐标点 -- center.x + Math.sin(radian)*currentAdius
// console.log(_this.width/2 + Math.sin(this.time*(360/this.cycle)*Math.PI/180)*Math.abs(this.y));
// console.log(_this.width/2 - Math.cos(this.time*(360/this.cycle)*Math.PI/180)*Math.abs(this.y));

		//设置星球的填充颜色
		_this.ctx.fillStyle = this.color;
		_this.ctx.fill();
		if(this.fontObj){

			this.drawTxt(_this, 0, this.y);
		}
		//恢复之前画布的内容
		_this.ctx.restore();
		this.time += 1;
	};
	this.drawTxt = function(_this, fx, fy){
		_this.ctx.font = this.fontObj.size + "px Microsoft Yahei";
		_this.ctx.textAlign = "center";
		_this.ctx.textBaseline = "middle";
		_this.ctx.fillStyle = this.fontObj.color;
		_this.ctx.fillText(this.fontObj.txt, fx, fy);
	}
}

//创建一个太阳的构造函数
function Sun(x,y,radius,cycle,color, fontObj){
	Star.call(this,x,y,radius,cycle,color, fontObj);
}
function Earth(x, y, radius, cycle, color, fontObj){
	Star.call(this, x, y, radius, cycle, color, fontObj);
}
//创建一个水星的构造函数
function Mercury(x,y,radius,cycle,color, fontObj){
	Star.call(this,x,y,radius,cycle,color, fontObj);
}
//创建一个金星的构造函数
function Venus(x,y,radius,cycle,color, fontObj){
	Star.call(this,x,y,radius,cycle,color, fontObj);
}

window.addEventListener('load', function(){
	Galaxy.init();
}, false);
