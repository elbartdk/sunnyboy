var server = require("./server");
var router = require("./router");
var readcsv = require("./readcsv");

readcsv.start("./172602N232-130301230003");
server.start();