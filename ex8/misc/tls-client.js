/*
* Example TCP (Net) Client
* Listens to Port 6000 and sends the word "ping" to server
*
*/

// Dependencies
const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Instantiate the HTTPS server
var options = {
  'ca': fs.readFileSync(path.join(__dirname,'/../https/cert.pem')) // Only required because we are using a self-signed certificate
};

// Define the message to send
const outboundMessage = 'ping';

// Create the client
const client = tls.connect(6000,options,function(){
  // Send the message
  client.write(outboundMessage);
});

// When the server writes back, log what it says then kill connection
client.on('data',function(inboundMessage){
  var messageString = inboundMessage.toString();
  console.log("I wrote " + outboundMessage + " and they said " + messageString);
  client.end();
});
