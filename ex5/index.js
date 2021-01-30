/*
 * Primary file for API
 *
 */

// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');

// Declare the app
var app = {};

// Init function
app.init = function(){
  // Start the server
  server.init();

  // Start the workers
  workers.init();

 // Starts the CLI,
 // and ensure it starts last
  setTimeout(function(){
    cli.init();
  },50);

};

// Self executing
app.init();


// Export the app
module.exports = app;
