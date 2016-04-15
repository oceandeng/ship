
/* 
* @Author: ocean
* @Date:   2015-08-02 17:27:05
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-03-15 17:44:42
*/

'use strict';

var sW = document.documentElement.clientWidth,
	sH = document.documentElement.clientHeight;

var Game = new function(){
	// Game Initaliztion
	this.initialize = function(callback){

		sW = document.documentElement.clientWidth;
		sH = document.documentElement.clientHeight;

		this.canvas = document.createElement('canvas');

		this.canvas.width = sW;
		this.canvas.height = sH;
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = '0px';
		this.canvas.style.left = '0px';
		this.canvas.style.zIndex = '-1';

		this.width = sW;
		this.height = sH;
		// this.width = this.canvas.width;
		// this.height = this.canvas.height;

		document.body.appendChild(this.canvas);

		Game.canvas.addEventListener('touchmove', function(e){e.preventDefault()}, false);
		// Set up the rendering context
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');

		if(!this.ctx){
			return alert('Please upgrade your brower to play');
		}

		this.playerOffset = 10;
		this.canvasMultiplier = 1;
		this.setupMobile();

		// Start the game loop
		this.loop();
		callback && callback();

	};

	this.resize = function(callback){
		sW = document.documentElement.clientWidth;
		sH = document.documentElement.clientHeight;

		this.canvas.width = sW;
		this.canvas.height = sH;
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = '0px';
		this.canvas.style.left = '0px';
		this.canvas.style.zIndex = '-1';

		this.width = sW;
		this.height = sH;

		callback && callback();

	};


	// Game Loop
	var boards = [];

	this.loop = function(){
		var dt = 30 / 1000;
		for(var i = 0, len = boards.length; i < len; i++){
			if(boards[i]){
				boards[i].step(dt);
				boards[i] && boards[i].draw(Game.ctx);
			}
		}
		setTimeout(Game.loop, 30);
	};

	// Change an active game board
	this.setBoard = function(num, board){
		boards[num] = board;
	};

	// this.setBoard = function(num,board) { boards[num] = board; };
	this.setupMobile = function(){
		var	hasTouch = !!('ontouchstart' in window),
			w = window.innerWidth,
			h = window.innerHeight;

		if(hasTouch){this.mobile = true;}

		if(screen.width >= 1280 || !hasTouch){return false};

		if(w > h){
			alert("Please rotate the device and then click OK");
			w = window.innerWidth;
			h = window.innerHeight;
		}

		window.scrollTo(0, 1);
		h = window.innerHeight + 2;

		if(h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75){
			this.canvasMultiplier = 2;
			this.canvas.width = w / 2;
			this.canvas.height = h / 2;
			this.canvas.style.width = w + 'px';
			this.canvas.style.height = h + 'px';
		}else{
			this.canvas.width = w;
			this.canvas.height = h;
		}
		this.canvas.style.popsition = 'absolute';
		this.canvas.style.left = "0px";
		this.canvas.style.top = "0px";
	}
}

var startGame = function(){
	// SpriteSheet.draw(Game.ctx, "ship", 100, 100, 0);
	Game.setBoard(0, new Starfield(10, 0.4, 100, true));
	Game.setBoard(1, new Starfield(20, 0.6, 100));
	Game.setBoard(2, new Starfield(50, 1.0, 50));
};

window.addEventListener('load', function(){
	Game.initialize(startGame);
}, false);

window.addEventListener('resize', function(){
	Game.resize(startGame);
})
// Star Field
var Starfield = function(speed, opacity, numStars, clear){
	// Set up the offscreen canvas
	var stars = document.createElement('canvas');
	stars.width = Game.width;
	stars.height = Game.height;

	var starCtx = stars.getContext('2d');
	var offset = 0;

	// If the clear option is set,
	// make the background black instead of transparent
	if(clear){
		starCtx.fillStyle = '#000';
		starCtx.fillRect(0, 0, stars.width, stars.height);
	}

	// Now draw a bunch of random 2 pixel
	// rectangles onto the offscreen canvas
	starCtx.fillStyle = '#9386ff';
	starCtx.globalAlpha = opacity;
	for(var i = 0; i < numStars; i++){
		starCtx.fillRect(Math.floor(Math.random() * stars.width),
						Math.floor(Math.random() * stars.height),
						2, 2);
	}

	// This method is called every frame
	// to draw the starfield onto the canvas
	this.draw = function(ctx){
		var intOffset = Math.floor(offset);
		var remaining = stars.height - intOffset;

		// Draw the top half of the starfield
		if(intOffset > 0){
			ctx.drawImage(stars,
						0, remaining,
						stars.width, intOffset,
						0, 0, stars.width, intOffset);
		}

		// Draw the bottom half of the starfield
		if(remaining > 0){
			ctx.drawImage(stars,
						0, 0,
						stars.width, remaining,
						0, intOffset,
						stars.width, remaining);
		}
	}
	// This method is called to update
	// the starfield
	this.step = function(dt){
		offset += dt * speed;
		offset = offset % stars.height;
	}
};
