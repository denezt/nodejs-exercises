/*
 * Primary file for API
 *
 */

// Dependencies
const server = require('./../lib/server');
const workers = require('./../lib/workers');
const cli = require('./../lib/cli');
const data = require('./../lib/data');

// Declare the app
var app = {};

// Init function
app.init = function(){
  // Start the server
  server.init();
  debugger;
  // Start the workers
  workers.init();

  // Initialize datastore
  data.init();

 // Starts the CLI,
 // and ensure it starts last
  setTimeout(function(){
    cli.init();
  },50);

};
debugger;
// Self executing
app.init();


// Export the app
module.exports = app;
