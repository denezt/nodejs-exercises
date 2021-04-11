/*
* Example UDP Server
* Creating a UDP Datagram server listening on 6000
*
*/

// Dependencies
const dgram = require('dgram');

// Create a server
const server = dgram.createSocket('udp4');

server.on('message',function(messageBuffer,sender){
  // Do Something with the incoming message
  let messageString = messageBuffer.toString();
  console.log(messageString);
});

// Bind to 6000
server.bind(6000);
