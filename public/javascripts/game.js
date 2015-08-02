/* 
* @Author: ocean
* @Date:   2015-08-02 16:17:04
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-02 21:32:58
*/

'use strict';

var sprites = {
	ship: {
		sx: 0,
		sy: 0,
		w: 37,
		h: 42,
		frames: 1
	}
};

var startGame = function(){
	// SpriteSheet.draw(Game.ctx, "ship", 100, 100, 0);
	Game.setBoard(0, new Starfield(20, 0.4, 100, true));
	Game.setBoard(1, new Starfield(50, 0.6, 100));
	Game.setBoard(2, new Starfield(100, 1.0, 50));
	Game.setBoard(3, new TitleScreen('Alien Invasion', 
									'Press space to start playing', 
									playGame));
}

var playGame = function(){
	Game.setBoard(3, new PlayerShip());
	// Game.setBoard(3, new TitleScreen('Alien Invasion', 'Game Started...'));
}


window.addEventListener('load', function(){
	Game.initialize('game', sprites, startGame);
}, false);


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
}

// Player Ship
var PlayerShip = function(){
	this.w = SpriteSheet.map['ship'].w;
	this.h = SpriteSheet.map['ship'].h;
	this.x = Game.width/2 - this.w/2;
	this.y = Game.height - 10 - this.h;
	this.vx = 0;
	this.maxVel = 200;

	this.step = function(dt){
		// TODO - added the next section
		if(Game.keys['left']){
			this.vx = -this.maxVel;
		}else if(Game.keys['right']){
			this.vx = this.maxVel;
		}else{
			this.vx = 0;
		}

		this.x += this.vx * dt;

		if(this.x < 0){
			this.x = 0;
		}else if(this.x > Game.width - this.w){
			this.x = Game.width - this.w;
		}
	};
	this.draw = function(ctx){
		SpriteSheet.draw(ctx, 'ship', this.x, this.y, 0);
	}
}