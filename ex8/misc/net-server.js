/*
* Example TCP (Net) Server
* Listens to Port 6000 and sends the word "pong" to client
*
*/

// Dependencies
const net = require('net');

// Create the Server
const server = net.createServer(function(connection){
  // Send the word "pong"
  var outboundMessage = 'pong';
  connection.write(outboundMessage);

  // When the client writes something, log it out
  connection.on('data',function(inboundMessage){
    var messageString = inboundMessage.toString();
    console.log("I wrote " + outboundMessage + " and they said " + inboundMessage);
  });
});

// Start Listening
server.listen(6000);
