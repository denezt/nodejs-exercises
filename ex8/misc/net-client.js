/*
* Example TCP (Net) Client
* Listens to Port 6000 and sends the word "ping" to server
*
*/

// Dependencies
const net = require('net');

// Define the message to send
const outboundMessage = 'ping';

// Create the client
const client = net.createConnection({'port' : 6000},function(connection){
  // Send the word "ping"
  client.write(outboundMessage);
});

// When the server writes back, log what it says then kill connection
client.on('data',function(inboundMessage){
  let messageString = inboundMessage.toString();
  console.log("I wrote " + outboundMessage + " and they said " + messageString);
  client.end();
});
