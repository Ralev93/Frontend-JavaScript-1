"use strict"

$(document).ready(function() {
var
	SIZE   = 20,
	canvas = document.getElementById("snakeCanvas"),
 	ctx    = canvas.getContext("2d"),
 	img_grass    = document.getElementById("grass"),
 	canvasWidth  = $("#snakeCanvas").width(),
 	canvasHeight = $("#snakeCanvas").height(),

 	canvasText = document.getElementById("scoreCanvas"),
 	ctx_txt    = canvasText.getContext("2d"),
 	ctx_food   = canvas.getContext("2d"),
 	img_apple  = document.getElementById("apple"),
 	img_snake  = document.getElementById("snake");

 	ctx_txt.font      = "60px Arial";
 	ctx_txt.fillStyle = "red";
 	ctx.drawImage(img_grass,0,0,canvasWidth,canvasHeight);

var nIntervId,
    initKeyBrdTable = {
		 "37": "left",
		 "38": "up",
		 "39": "right",
		 "40": "down"
		};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var myIndexOf = function (arr, obj) {
	var hateJS = false;
  arr.forEach(function (item) {
		if (obj.equals(item)) {
			hateJS = true;
			// "return true;" is not working ?!
		}
	});
	return hateJS;
};

function Tile(x, y, ctx) {
   this.x = x;
   this.y = y;
   this.ctx  = ctx;
   this.size = SIZE;
};

Tile.prototype.print = function(img) { //img_apple, img_snake
  this.ctx.drawImage(img,this.x*this.size, this.y*this.size, SIZE, SIZE);
  //ctx.drawImage(img,this.x*SIZE, this.y*SIZE, SIZE, SIZE);
};

Tile.prototype.equals = function(other) {
	return (this.x === other.x) && (this.y === other.y);
};

var food = (function() {
  var _private = {
    t: new Tile(canvasWidth/20, canvasHeight/20, ctx)
  }
  return {
    genNewPos : function() {
       _private.t.x = getRandomInt(0,canvasWidth/SIZE - 2);
       _private.t.y = getRandomInt(0,canvasHeight/SIZE - 2);
    },
    print: function() {
      _private.t.print(img_apple);
    },
    getTile: function() {
    	return _private.t;
    }
  }
} () );





  console.log("I AM READY");
  var
      ADDRESS = "http://localhost",//"http://192.168.1.249";
      socket = new io(ADDRESS + ":3000"),
      socketId = null,
      gameId = null,
      snake1, snake2;


  window.socket = socket;

  socket.on("connect", function(data) {
      socketId = socket.io.engine.id;
      runAfterSocketHasConnected();
  });
	food.genNewPos();



  socket.on("start", function(data) {
    var snake1 = Snake(ctx,{
				"x": 0,
				"y": 1
			  }),
  	    snake2 = Snake(ctx, {
  	    	"x": 0,
  	    	"y": canvasHeight/20 - 2
  	    });

	  console.log("game has started");
    console.log(data, gameId);

      nIntervId = setInterval(function() {
			ctx.drawImage(img_grass,0,0,canvasWidth,canvasHeight);
			ctx_txt.clearRect(0,0,canvasWidth, canvasHeight);

			snake1.print();//gameLoop(data,gameId);
    	snake2.print();


	    socket.emit("move", {
	    	"gameId": gameId,
	    	"socketId": socketId,
	    	//"body": getBody() //or maybe just the head!
	     });
			move(food.getTile());

			if (snake1.hasAte() || snake2.hasAte()) {
					food.genNewPos();
			}
			food.print();

		},100);
  });

  function runAfterSocketHasConnected() {
      $("#createGame").on("click", function() {
          $.ajax({
              url: ADDRESS + ":3000/createGame",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                  playerName: $("#playerName").val(),
                  socketId: socketId
              })
          }).done(function(result) {
              gameId = result.gameId;
              console.log("Game is created with id: ", gameId);
          });
      });

      $("#joinGame").on("click", function() {
          gameId = $("#joinGameId").val();
          $.ajax({
              url: ADDRESS + ":3000/joinGame",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                  playerName: $("#playerName").val(),
                  socketId: socketId,
                  gameId: gameId
              })
          }).done(function(result) {
              console.log(result); // success
          });
      });
  }
});

