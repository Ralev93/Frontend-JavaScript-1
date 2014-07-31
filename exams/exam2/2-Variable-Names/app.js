"use strict"
var
  arr = [1,2,3],
  source   = $("#names-template").html(),
  template = Handlebars.compile(source), context, html, result = [];

//load the names!
$.ajax({
  url: "http://localhost:8080/names",
  type: "GET",
  contentType: "application/json",
  dataType: "json",
}).done(function(data) {
  context  = {'name': data },
	html     = template(context);

	$("#names").append(html);

	listenForChange();
	return;
});

var listenForChange = function() {
    $(".updateName").on("click", function() {
      var newName = $(this).parent().find(".enter-name").val();
      var nameId = parseInt($(this).data("name-id"));

     $.ajax({
      	url: "http://localhost:8080/name",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
       	  name: newName,
         nameId: nameId
      })
    });
  });
}
