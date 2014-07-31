"use strict"

var data = require("./data");
var helper = {};
data.forEach(function (c) {
  !helper[c["fields"]["date"]] ? helper[c["fields"]["date"]] = {} : {}; // {} = do nothing
  helper[c["fields"]["date"]][c["fields"]["student"]] ? console.log(c) : helper[c["fields"]["date"]][c["fields"]["student"]] = 1;
});
//time:   O(n)
//memory: O(n)
