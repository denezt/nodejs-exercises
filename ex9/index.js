/*
 * Primary file for API
 *
 */

// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const data = require('./lib/data');

// Declare the app
var app = {};

// Init function
app.init = function(callback){
  // Start the server
  server.init();

  // Start the workers
  workers.init();

  // Initialize datastore
  data.init();

 // Starts the CLI,
 // and ensure it starts last
  setTimeout(function(){
    cli.init();
    callback();
  },50);
};

// Self Invoke only when required directly
if (require.main === module){
  app.init(function(){});
}


// Export the app
module.exports = app;
