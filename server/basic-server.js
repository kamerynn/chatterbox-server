var http = require("http");
var url = require("url");
var rh = require("./request-handler.js");
var helpers = require("./http-helpers.js");

var port = 3000;
var ip = "127.0.0.1";

var routes = {
  '/classes/messages': rh.requestHandler,
  '/send' : rh.requestHandler
}

var server = http.createServer(function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var pathname = url.parse(request.url).pathname;
  var route = routes[pathname];
  if (route) {
    route(request, response, pathname);
  } else {
    helpers.sendResponse(response, undefined, 404);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);