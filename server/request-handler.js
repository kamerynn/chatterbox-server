var url = require('url');
var fs = require('fs');
var qs = require('querystring');

exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  // right now, putting this on all, but ideally should only be on OPTIONS
  //headers['Allow'] = 'GET,POST';

  var action = actions[request.method];
  action ? action(request, response) : function(response) {
    // Send 404
    response.writeHead(404, headers);
    response.end();
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";


var actions = {
  GET: function(request, response) {
    var parsedURL = url.parse(request.url)
    if (parsedURL.pathname === '/classes/messages') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(sampleMessages));
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
        response.writeHead(201, headers);

        var decodedBody = qs.parse(body);
        // The response is being sent as a key to an object for some reason, like so:
        // '{"username":"Kam","text":"dsa","roomname":"lobby"}'

        // Grab 'key', which is really the POST object
        var message = Object.keys(decodedBody)[0];
        // The messages are separated by new lines
        fs.appendFile('./messagelog.txt', message + '\n', function() {
          response.end(JSON.stringify({
            results: 'success'
          }))
        })
      })
    }
  },

  OPTIONS: function(request, response) {
    response.writeHead(200, headers);
    response.end();
  }
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