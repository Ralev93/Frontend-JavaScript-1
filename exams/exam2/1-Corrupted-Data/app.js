"use strict"

var data = require("./data");
var helper = {};

data.forEach(function (c) {
  var
    date    = c["fields"]["date"],
    student = c["fields"]["student"];

  !helper[date] ? helper[date] = {} : {}
  helper[date][student] ?  console.log(c) :  helper[date][student] = 1;
});
//time:   O(n)
//memory: O(n)
