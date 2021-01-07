/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var token_holder = require('./token');
var helper = require('./helper');


// Define all the handlers
var handlers = {};

// Index Handler
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in a template as a string
    helpers.getTemplate('index',function(err,str){
      if(!err && str){
        callback(200,str,'html');
      } else {
        callback(500,undefined,'html')
      }
    });
    // Return that template as HTML
  } else {
    callback(405,undefined,'html');
  }
};

// Ping
handlers.ping = function(data,callback){
  callback(200,{'status':'ok'});
};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Export the handlers
module.exports = handlers;
