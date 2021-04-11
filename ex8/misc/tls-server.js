/*
* Example TLS Server
* Listens to Port 6000 and sends the word "pong" to client
*
*/

// Dependencies
const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Instantiate the HTTPS server
var options = {
  'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};

// Create the Server
var server = tls.createServer(options,function(connection){
  // Send the word "pong"
  var outboundMessage = 'pong';
  connection.write(outboundMessage);

  // When the client writes something, log it out
  connection.on('data',function(inboundMessage){
    var messageString = inboundMessage.toString();
    console.log("I wrote " + outboundMessage + " and they said " + messageString);
  });
});

// Start Listening
server.listen(6000);
