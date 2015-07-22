var url = require('url');
var fs = require('fs');
var helpers = require('./http-helpers.js');



exports.requestHandler = function(request, response, pathname) {
  var action = actions[request.method];
  action ? action(request, response, pathname) : helpers.sendResponse(response, undefined, 404);
};

var actions = {
  GET: function(request, response, pathname) {
    if (pathname === '/classes/messages') {
      helpers.sendResponse(response, {results: messages});
    }

    if (pathname === '/classes/room') {}
  },

  POST: function(request, response, pathname) {
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