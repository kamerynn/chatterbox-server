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

  // right now, putting this on all, but ideally should only be on OPTIONS
  //headers['Allow'] = 'GET,POST';

  var action = actions[request.method];
  action ? action(request, response) : helpers.sendResponse(response, undefined, 404);
};



var actions = {
  GET: function(request, response) {
    var parsedURL = url.parse(request.url)
    if (parsedURL.pathname === '/classes/messages') {
      helpers.sendResponse(response, {results: messages});
    }

    if (parsedURL.pathname === '/classes/room') {

    }
  },

  POST: function(request, response) {
    var parsedURL = url.parse(request.url)
    if (parsedURL.pathname === '/send') {
      helpers.collectData(request, function(message) {
        console.log()
        messages.push(message);
        message.objectId = ++objectId;
        
        helpers.sendResponse(response, {objectId: objectId}, 201);
        //fs.appendFile('./messagelog.txt', message + '\n', function() {})
      })
    }
  },

  OPTIONS: function(request, response) {
    helpers.sendResponse(response);
  }
}