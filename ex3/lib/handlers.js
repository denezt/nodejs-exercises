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

// Ping
handlers.ping = function(data,callback){
  callback(200,{'status':'ok'});
};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

/* Moving Cart to user.js */

/* Moving Tokens to token.js */

/* Moving Menu to menu.js */

/* Moving Cart to cart.js */

// Export the handlers
module.exports = handlers;
