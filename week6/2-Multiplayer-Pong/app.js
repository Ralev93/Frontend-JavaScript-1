"use strict"

$(document).ready(function() {
	var
		MOVE_SIZE = 10,
	  canvas    = document.getElementById("pongCanvas"),
	 	ctx       = canvas.getContext("2d"),
	 	canvasWidth  = $("#pongCanvas").width(),
   	canvasHeight = $("#pongCanvas").height(),
    nIntervId,
    initKeyBrdTable = {
		 "87": "up_enemy",//->UP(W)77",
		 "38": "up",
		 "40": "down",//->DOWN(S)73",
		 "83": "down_enemy"
		},
		direction = "";
var
	paddle1 = new paddle(ctx,    25,           75),
	paddle2 = new paddle(ctx,canvasWidth - 40, 35);

	function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	  if (typeof stroke == "undefined" ) {
	    stroke = true;
	  }
	  if (typeof radius === "undefined") {
	    radius = 5;
	  }
	  ctx.beginPath();
	  ctx.moveTo(x + radius, y);
	  ctx.lineTo(x + width - radius, y);
	  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	  ctx.lineTo(x + width, y + height - radius);
	  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  ctx.lineTo(x + radius, y + height);
	  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	  ctx.lineTo(x, y + radius);
	  ctx.quadraticCurveTo(x, y, x + radius, y);
	  ctx.closePath();
	  if (stroke) {
	    ctx.stroke();
	  }
	  if (fill) {
	    ctx.fill();
	  }
	}

	function paddle(ctx, x, y) {
		this.x   = x,
		this.y   = y,
		this.xsize = 15,
		this.ysize = 75,
		this.ctx = ctx;

		this.print = function () {
			this.ctx.strokeStyle = "#2d6";
			this.ctx.fillStyle = "#abc";
			roundRect(this.ctx, this.x, this.y, this.xsize, this.ysize, 5, true);
		};

		this.stay = function() {
			if (this.y < 0 ) {
				this.y = canvasHeight;
			}
			if (this.y > canvasHeight) {
				this.y = 0;
			}
		}
	};

	var setDirection = function(d) {
				direction = d;
			};

	var move = function (player1, player2) {
			switch (direction) {
				case "up":
					player1.y -= MOVE_SIZE;
					break;
				case "up_enemy":
					player2.y -= MOVE_SIZE;
					break;
				case "down":
					player1.y += MOVE_SIZE;
					break;
				case "down_enemy":
					player2.y += MOVE_SIZE;
				break;
				default:
				 return;
			};
		};

var getRandom = function (min, max) {
  return (Math.random() * (max - min)) + min; // 1
};
	var randomDirection = function () {
		var result   = [],
		    x_values = [-1,1];
		result.push(x_values[Math.floor(getRandom(0,2))], getRandom(-1,1));
		return result;
	}

	var ball = (function (ctx) {
		var
			x = canvasWidth/2,
		  y = canvasHeight/2,
		  radius = 15,
		  speed_x = 9,
		  speed_y = 9,
		  dir_vector = randomDirection();

		return {
			move: function() {
				x = x + speed_x*dir_vector[0];
				y = y + speed_y*dir_vector[1];
				this.reflect();
			},
			print: function() {
				ctx.beginPath();
				ctx.arc(x,y,radius,0,2*Math.PI);
				ctx.stroke();
			},
			hitPaddle: function() {
				return ( ((y+radius) < (paddle2.y + paddle2.ysize)) && ((y+radius) < (paddle2.y - paddle2.ysize)) ) &&
							 ( ((x+radius) > (paddle2.x - paddle2.xsize)) && ((x+radius) < (paddle2.x - paddle2.xsize)) );
			},
			reflect: function() {
				if (this.hitPaddle()) {
					console.log("u got it ")
					dir_vector[0] = -dir_vector[0];
				}

				if (((y-radius) < 0) || ((y+radius) > canvasHeight)) {
					dir_vector[1] = -dir_vector[1];
				}
				else if ( ((x+radius) < 0) || ((x+radius) >= canvasWidth) ||
								(x < paddle1.x) || (x > paddle2.x)) {
					dir_vector[0] = -dir_vector[0];
				}
			}

		}
	}(ctx));

	$(document).keydown(function(e) {
	     setDirection(initKeyBrdTable[e.keyCode]);
	   });

	nIntervId = setInterval(function() {
			ctx.fillStyle = "white";
			ctx.fillRect(0,0,canvasWidth,canvasHeight);

			paddle1.print();
			paddle1.stay();
			paddle2.print();
			paddle2.stay();
			move(paddle1, paddle2);
			ball.print();
			ball.move();
		},80);



});
