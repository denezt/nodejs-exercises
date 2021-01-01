

var _data = require('./data');
var _token = require('./token');
var helper = require('./helper');
var token_holder = require('./token');

var shopping_cart = {};

// Container for all the cart methods
shopping_cart._cart = {};

// Menu
shopping_cart.cart = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    shopping_cart._cart[data.method](data,callback);
  } else {
    callback(405);
  }
};


shopping_cart._cart.post = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  var itemObject = typeof(data.payload.itemList) == 'object' ? data.payload.itemList : false;

  if(emailAddress && itemObject){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var cartName = helper.hash128(emailAddress);
          // Get the token from the headers
          _data.read('carts',cartName,function(err,data){
            if(err){
                // Store the cart items
                _data.create('carts',cartName,itemObject,function(err){
                  if(!err){
                    callback(200);
                  } else {
                    console.log(err);
                    callback(500,{'Error' : 'Could not create the new cart'});
                  }
                });
            } else {
              // User already exists
              callback(400,{'Error' : 'Cart already exists update instead'});
            }
        });
      } else {
        callback(403,{'Error':'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

shopping_cart._cart.get = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;

  if(emailAddress){
    var cartName = helper.hash128(emailAddress);
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var menuCount = 0;
          _data.read('menu','menu_items',function(err,data){
            if(!err && data){
              menuCount = data.items.length;
            }
            console.log('Menu Count: ' + menuCount);
          });
          // Lookup the carts
          _data.read('carts',cartName,function(err,data){
            if(!err && data){
              console.log('Array Length: ' + data.length);
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

// Export the module
module.exports = shopping_cart;
