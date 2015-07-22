var http = require("http");
var url = require("url");
var rh = require("./request-handler.js");
var helpers = require("./http-helpers.js");
var express = require("express");
var app = express();

var server = app.listen(3000, function() {
  var host = "127.0.0.1";
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
})

var objectId = 1;
var messages = [
  {
    username: 'Kam',
    text: 'yooo',
    objectId: objectId
  }
]

// Set headers
app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);
  next();
})

app.get('/', function(req, res) {
  res.send("hello world!");
})

app.get('/classes/messages', function(req, res) {
  res.json({results: messages});
})