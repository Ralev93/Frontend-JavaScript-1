"use strict"

var data = require("./data");
var helper = {};

data.forEach(function (c) {
  var date    = c["fields"]["date"],
      student = c["fields"]["student"];

  !helper[date] ? helper[date] = {} : {}; // {} = do nothing
  helper[date][student] ? console.log(c) : helper[date][student] = 1;
});

//time:   O(n)
//memory: O(n)

/*
how helper looks like:

{ '2014-06-05': {
    '1': 1,
     :   :
     :   :
    '103': 1
   },
    :
    :
  '2014-06-28': {
     '3': 1,
      :   :
      :   :
     '99': 1
   }
}
*/
