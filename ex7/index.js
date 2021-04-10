/*
 * Primary file for API
 *
 */

// Dependencies
var server = require('./lib/server');
var cluster = require('cluster');
var os = require('os');

// Declare the app
var app = {};

// Init function
app.init = function(callback){
  // Start the server
  console.log('Number of CPUs: ' + os.cpus().length);
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
