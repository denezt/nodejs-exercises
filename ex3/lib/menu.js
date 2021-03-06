/*
 * Request Handler for Menu
 *
 */

// Dependencies
var _data = require('./data');
var token_holder = require('./token');
var helper = require('./helper');
const fs = require('fs');

var menu = {};

// Container for all the menu methods
menu._menu = {};

// Menu
menu.menu = function(data, callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    menu._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};

// This should always run
_data.initiate('menu','menu_items',function(err){
  if(!err){
    console.log("Created Dataset [menu_items]");
  } else {
    console.log("Dataset [menu_items] was found");
  }
});

// Required data: emailAddress
// Optional data: none
menu._menu.get = function(data, callback){
  var emailAddress = data.queryStringObject.emailAddress;
  if(emailAddress){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          // Static Resturant Menu
          _data.read('menu','menu_items',function(err,data){
            if(!err && data){
              callback(200,data);
            } else {
              callback(404);
            }
          });
        } else {
          callback(403,{'Error':'Missing required token in header, or token is invalid'});
        }
      });
  } else {
    callback(400, {'Error':'Missing required field'});
  }
};

module.exports = menu;
