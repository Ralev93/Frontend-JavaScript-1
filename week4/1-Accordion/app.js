/*$("a").on("click", function(event) {
	event.preventDefault();
})
*/
"use strict"

$(document).ready(function() {
		$("#pan2").hide();
		$("#pan3").hide();
		$("#pan1").hide();

		$("#pan1").toggle();

		$(".accordion").click(function(event) {
			event.preventDefault();
		//	$("#pan2").show();
  		//$( this ).slideUp();
  		console.log("uuuh, u clicked a panel, VERY FUNKY");
			//$("#pan3").hide();
			//$("#pan1").hide();
		});
});
