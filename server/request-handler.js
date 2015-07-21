var url = require('url');
var fs = require('fs');
var qs = require('querystring');

exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  // right now, putting this on all, but ideally should only be on OPTIONS
  //headers['Allow'] = 'GET,POST';

  var action = actions[request.method];
  action ? action(request, response) : function(response) {
    sendResponse(response, undefined, 404)
  }
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var actions = {
  GET: function(request, response) {
    var parsedURL = url.parse(request.url)
    if (parsedURL.pathname === '/classes/messages') {
      sendResponse(response, sampleMessages);
    }

    if (parsedURL.pathname === '/classes/room') {

    }
  },

  POST: function(request, response) {
    var parsedURL = url.parse(request.url)
    if (parsedURL.pathname === '/send') {
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      })

      request.on('end', function() {

        var decodedBody = qs.parse(body);
        // The response is being sent as a key to an object for some reason, like so:
        // '{"username":"Kam","text":"dsa","roomname":"lobby"}'

        // Grab 'key', which is really the POST object
        var message = Object.keys(decodedBody)[0];
        // The messages are separated by new lines
        fs.appendFile('./messagelog.txt', message + '\n', function() {
          sendResponse(response, {results: 'success'}, 201);
        })
      })
    }
  },

  OPTIONS: function(request, response) {
    sendResponse(response);
  }
}

function sendResponse(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
}

var sampleMessages = {
  results: [
    {
      username: 'Kam',
      text: 'yooo'
    },
    {
      username: 'Mere',
      text: 'hey!'
    },
    {
      username: 'Mere',
      text: 'wuddup!'
    }
  ]
}