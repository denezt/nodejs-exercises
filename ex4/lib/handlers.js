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

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Joe\'s Pizza Online',
      'head.description' : 'We are the #1 Pizza Online Application.',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
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
