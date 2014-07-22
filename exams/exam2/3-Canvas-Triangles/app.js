$(document).ready(function() {
  "use strict"

  var
    canvas = document.getElementById("myCanvas"),
    ctx    = canvas.getContext("2d"),
    canvasWidth  = $("#myCanvas").width(),
    canvasHeight = $("#myCanvas").height();
  var
    points = [],
    allTriangles = [];

  function Point (x,y) {
    this.x = x;
    this.y = y;
  };

  function Triangle (p1, p2, p3, color) {
    //Points
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.color = color;
  };

  Triangle.prototype.print = function() {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.closePath();

    ctx.fill();
  };

  var saveToLocal = function(triangles) { //array of triangles
    var name = prompt("Set a name: ");
    var
      previous = localStorage.getItem("Triangles"),
      payload = {};

    payload[name] = triangles;
    payload = JSON.stringify(payload);

    if(!previous) {
      localStorage.setItem("Triangles",payload);
    }
    else {
      payload = payload.slice(1,payload.length - 1);
      localStorage.setItem("Triangles", "{" + payload + "," + previous.slice(1,previous.length));
    }
  };

  var lookAllSaves = function () {
    var allLoads = JSON.parse(localStorage.getItem("Triangles") || "");
    var keys = Object.keys(allLoads);
    var
      source   = $("#loads-template").html(),
      template = Handlebars.compile(source),
      context  = {'load': keys },
      html     = template(context), hate;

      $("#loads-table-body").append(html);
  }
  var loadFromLocal = function() {
      var name = prompt("Enter a name to load: ");
      return name ? JSON.parse(localStorage.getItem("Triangles") || "")[name] : allTriangles;//O(1)
  };

  var clearCanvas = function() {
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
  };

  var getCoordinates = function (event) {
    var
        x = new Number(),
        y = new Number();

      if (event.x !== undefined && event.y !== undefined) {
        x = event.x;
        y = event.y;
      }
      else {// Firefox method to get the position
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
      }

      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;

    return {
      "x": x,
      "y": y
    };
  };

  canvas.addEventListener("mousedown", function (event) {
   var
      triangle,p,
      coord = getCoordinates(event),
      color = $("input[name=favcolor]").val();

    p = new Point(coord.x,coord.y);
    points.push(p);

    if (points.length === 3) {
      triangle = new Triangle(points[0], points[1], points[2], color);
      triangle.print();

      allTriangles.push(triangle);
      points = [];
    }
  }, false);

  $("#clear").on("click", function () {
    clearCanvas();
  });

  $("#save").on("click", function () {
    saveToLocal(allTriangles);
  });

  $("#load-modal").on("click", function () {

    $("#loads-table-body").empty();
     lookAllSaves();
  });

  $("#load").on("click", function () {
    allTriangles = loadFromLocal();
    clearCanvas();
    allTriangles.forEach(function (triangle) {
      (new Triangle(triangle.p1, triangle.p2, triangle.p3, triangle.color)).print();
      //the initial was just: triangle.print(), but something went wrong;
    });
  });
});
