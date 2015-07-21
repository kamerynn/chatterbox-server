var url = require('url');
var fs = require('fs');
var helpers = require('./http-helpers.js');

var objectId = 1;
var messages = [
  {
    username: 'Kam',
    text: 'yooo',
    objectId: objectId
  }
]

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var action = actions[request.method];
  action ? action(request, response) : helpers.sendResponse(response, undefined, 404);
};

var actions = {
  GET: function(request, response) {
    var pathname = url.parse(request.url).pathname
    if (pathname === '/classes/messages') {
      helpers.sendResponse(response, {results: messages});
    }

    if (pathname === '/classes/room') {}
  },

  POST: function(request, response) {
    var pathname = url.parse(request.url).pathname
    if (pathname === '/send') {
      helpers.collectData(request, function(message) {
        messages.push(message);
        message.objectId = ++objectId;
        helpers.sendResponse(response, {objectId: objectId}, 201);
      })
    }
  },

  OPTIONS: function(request, response) {
    helpers.sendResponse(response);
  }
}