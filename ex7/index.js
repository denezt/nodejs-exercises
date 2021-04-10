/*
 * Primary file for API
 *
 */

// Dependencies
const server = require('./lib/server');
const cluster = require('cluster');
const os = require('os');

// Declare the app
var app = {};

// Init function
app.init = function(callback){
  // Start the server
  if (cluster.isMaster){
    // Fork the process
    for(var i = 0; i < os.cpus().length; i++){
      cluster.fork();
    }
  } else {
    server.init();
  }
};

// Self invoking only if required directly
if(require.main === module){
  app.init(function(){});
}


// Export the app
module.exports = app;
