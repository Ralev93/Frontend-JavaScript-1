"use strict";

var
		nIntervId = 0,
		minuteFstDigit = 0,
		minuteSndDigit = 0,
		secondFstDigit = 0,
		secondSndDigit = 0,
		SPEED = 300;

var appendTimer = function (secSndDigit) {
	  $("#second-second-digit").text(secSndDigit);
		$("#second-first-digit").text(secondFstDigit);
		$("#minute-second-digit").text(minuteSndDigit);
		$("#minute-first-digit").text(minuteFstDigit);
}

function terminate() {
			 clearInterval(nIntervId);
			};

function begin(f) {
			nIntervId = setInterval(f, SPEED);
		};

function nullarize() {
			minuteFstDigit = 0;
			minuteSndDigit = 0;
			secondFstDigit = 0;
			secondSndDigit = 0;
};

$(document).ready(function() {

	$("#minutes").on("click keypress", function () {
			var minutes = parseInt($("#minutes").val(), 10);

			if (minutes < 10) {
				minuteFstDigit = 0;
				minuteSndDigit = minutes;
			}
			else {
					minuteFstDigit = Math.floor(minutes/10)%10;
				  minuteSndDigit = minutes%10;
				}
			$("#minute-second-digit").text(minuteSndDigit);
			$("#minute-first-digit").text(minuteFstDigit);
	});

		$("#seconds").on("click keypress", function () {
			var seconds = parseInt($("#seconds").val(), 10);

			if (seconds < 10) {
				secondFstDigit = 0;
				secondSndDigit = seconds;
			}
			else {
					secondFstDigit = Math.floor(seconds/10)%10;
				  secondSndDigit = seconds%10;
				}
			$("#second-second-digit").text(secondSndDigit);
			$("#second-first-digit").text(secondFstDigit);
	});


	$("#startDown").on("click", function() {

		begin(
				function () {
					if (secondSndDigit < 0) {
						secondSndDigit = 9;
						secondFstDigit -= 1;
					}

					if (secondFstDigit < 0) {
						secondFstDigit = 5;
						minuteSndDigit -= 1;
					}

					if (minuteSndDigit < 0) {
						minuteSndDigit = 9;
						minuteFstDigit -= 1;
					}

					if (minuteFstDigit < 0) {
						nullarize();
						terminate();
					}

					appendTimer(secondSndDigit--);
				});
	});

	$("#startUp").on("click", function() {

		var fin1 = secondSndDigit,
				fin2 = secondFstDigit,
				fin3 = minuteSndDigit,
				fin4 = minuteFstDigit;

		nullarize();

		begin(function () {

			if (secondSndDigit >= 10) {
				secondSndDigit = 0;
				secondFstDigit += 1;
			}

			if (secondFstDigit >= 6) {
				secondFstDigit = 0;
				minuteSndDigit += 1;
			}
			if (minuteSndDigit >= 10) {
				minuteSndDigit = 0;
				minuteFstDigit += 1;
			}

			if (secondSndDigit === fin1 && secondFstDigit === fin2 &&
				  minuteSndDigit === fin3 && minuteFstDigit === fin4) {
				terminate();
			}

			appendTimer(secondSndDigit++);
		});
	});

	$("#StopAndReset").on("click", function() {
		terminate();
		nullarize();
  	appendTimer(0);
	});

});
