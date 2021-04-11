/*
* Example HTTP2 Server
*/

// Dependencies
const http2 = require('http2');

// Init the server
const server = http2.createServer();

// On a stream, response with hello world
server.on('stream', function(stream,headers){
  stream.respond({
    'status' : 200,
    'content-type' : 'text/html'
  });
  console.log(headers);
  stream.end('<html><body><p>Hello World</p></body></html>');
});

// Listen on 6000
server.listen(6000);
