
var Snake = (function (ctx, startPosition) {
	var body = [],
			head, direction, ate, score = 0, allScores = [];

	[1,2,3].forEach(function(i) {
		body.push(new Tile(i + startPosition.x,startPosition.y,ctx)); //startPosition = 10
	});

	var getStartPosition = function() {
		return startPosition;
	}


	var getBody = function() {
		var result = [];
		body.forEach(function (tile) {
			result.push(
				{"x":tile.x,
				 "y": tile.y//,
				 //"size": tile.size,
				 //"ctx": tile.ctx
				});
		});
		return result;
	}


	head = body[body.length - 1];

	var print = function(otherBody) {
		if(!otherBody){
			body.forEach(function (tile) {
					tile.print(img_snake);
				});
		}
		else {
			console.log("my turn");
			otherBody.forEach(function (rawtile) {
					var tile = new Tile(rawtile.x, rawtile.y, ctx);
					tile.print(img_snake);
				});
		}
	}

	var move = function (food) {
		var new_head;
		switch (direction) {
			case "right":
				new_head = new Tile(head.x + 1, head.y, ctx);
				break;
			case "up":
				new_head = new Tile(head.x, head.y - 1, ctx);
				break;
			case "down":
				new_head = new Tile(head.x, head.y + 1, ctx);
				break;
			case "left":
				new_head = new Tile(head.x - 1, head.y, ctx);
				break;
			default: return;
		};

		if (validMove(new_head)) {
			body.push(new_head);
		}
		else {return gameOver();}

		ate = new_head.equals(food);

		if(!ate) {
			body.shift();
		}
		head = new_head;
		score = body.length - 3;
	};

	var validMove = function(new_head) {
		return !((new_head.x >= canvasWidth/new_head.size) || (new_head.x < 0) || (new_head.y >= canvasHeight/new_head.size) || (new_head.y < 0)
						|| (myIndexOf(body, new_head)));
	};

	var setDirection = function(d) {
		direction = d;
	};

	var hasAte = function() {
		return ate;
	}

	var showScore = function() {
		ctx_txt.fillText("Score: " + score, 240, 170);
	}
	var gameOver = function() {
		ctx.font = "60px Arial";
 		ctx.fillStyle = "red";
 		ctx.textAlign = "center";

		ctx.fillText("GAME OVER!!!", canvasWidth/2, canvasHeight/2);
		clearInterval(nIntervId);

		var
		  nickName = prompt("Nickname: "),
		  dic = {
			"name": nickName,
			"score": score
		  },
		  highScores = localStorage["SnakeHighScores"] || "",
		  highScoresArray = highScores.split(";");

		if(nickName) {
      localStorage.setItem("SnakeHighScores", JSON.stringify(dic) + ";" + highScores);
		}
		  highScoresArray.pop();

		highScoresArray.forEach(function(item) {
			allScores.push(JSON.parse(item));
		});
		//console.log(allScores);
		//console.log(topScores());
	}

	var topScores = function() {
		return allScores.sort(function (a,b) {
			return b["score"] - a["score"];
		});
		//return allScores.splice(10, allScores.length - 10 + 1);
	}
	var setCoordinates = function(x,y) {
		/*
		arg.forEach(function (coord,index) {
			console.log(coord, index);
			body[index].x = coord.x;
			body[index].y = coord.y;
		});*/

		body.forEach(function (tile) {
			tile.x = x;
			tile.y = y;
		})
	}

	var gameLoop = function(data,gameId) {
		print();
		food.genNewPos();

		nIntervId = setInterval(function() {
			ctx.drawImage(img_grass,0,0,canvasWidth,canvasHeight);
			ctx_txt.clearRect(0,0,canvasWidth, canvasHeight);

			print();
			showScore();
			move(food.getTile());

			/*socket.emit("move", {
        	"gameId": gameId,
        	"body": getBody() //or maybe just the head!
        });*/

			if (hasAte()) {
				food.genNewPos();
			}
			food.print();

			socket.on("render", function(data) {
	      console.log("Should render now", data);
	      if (data["socketId"] === socketId) {
	      	snake1.move(food.getTile());
	      }
	      else snake2.move(food.getTile());
  		});

		},100);

	}
	return {
		print: print,
		move: move,
		setDirection: setDirection,
		hasAte: hasAte,
		showScore: showScore,
		getBody: getBody,
		setCoordinates: setCoordinates,
		gameLoop: gameLoop
	//	topScores: topScores
	}
});

$(document).keydown(function(e) {
		     setDirection(initKeyBrdTable[e.keyCode]);
		});
