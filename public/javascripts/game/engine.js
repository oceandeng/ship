/* 
* @Author: ocean
* @Date:   2015-08-02 17:27:05
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-19 18:11:32
*/

'use strict';

var Game = new function(){
	// Game Initaliztion
	this.initialize = function(canvasElementId, spriteData, callback){

		var sW = document.documentElement.clientWidth,
			sH = document.documentElement.clientHeight;

		this.canvas = document.getElementById(canvasElementId);

		this.canvas.width = sW;
		this.canvas.height = sH;

		this.width = sW;
		this.height = sH;
		// this.width = this.canvas.width;
		// this.height = this.canvas.height;

		// Set up the rendering context
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');

		if(!this.ctx){
			return alert('Please upgrade your brower to play');
		}

		// Set up input
		this.setupInput();

		// Start the game loop
		this.loop();

		// Load the sprite sheet and pass forward the callback
		SpriteSheet.load(spriteData, callback);

	};

	// Handle Input
	var KEY_CODES = {37: 'left', 39: 'right', 32: 'fire'};
	this.keys = {};
	this.setupInput = function(){
		window.addEventListener('keydown', function(e){
			if(KEY_CODES[event.keyCode]){
				Game.keys[KEY_CODES[event.keyCode]] = true;
				e.preventDefault();
			}
		}, false);
		window.addEventListener('keyup', function(e){
			if(KEY_CODES[event.keyCode]){
				Game.keys[KEY_CODES[event.keyCode]] = false;
				e.preventDefault();
			}
		}, false);
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
}

var SpriteSheet = new function(){
	this.map = {};

	this.load = function(spriteData, callback){
		this.map = spriteData;
		this.image = new Image();
		this.image.onload = callback;
		this.image.src = 'images/sprites.png';
	};

	this.draw = function(ctx, sprite, x, y, frame){
		var s = this.map[sprite];
		if(!frame) frame = 0;
		ctx.drawImage(this.image,
						s.sx + frame * s.w,
						s.sy,
						s.w, s.h,
						Math.floor(x), Math.floor(y),
						s.w, s.h);
	};
};

var TitleScreen = function(title, subtitle, callback) {
  var up = false;

  this.step = function(dt) {
    if(!Game.keys['fire']) up = true;
    if(up && Game.keys['fire'] && callback) callback();
  };

  this.draw = function(ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";

    ctx.font = "bold 40px bangers";
    ctx.fillText(title, Game.width/2, Game.height/2);

    ctx.font = "bold 20px bangers";
    ctx.fillText(subtitle, Game.width/2, Game.height/2 + 40);

  };
};