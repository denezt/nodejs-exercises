/*
 * Request Handler for Cart
 *
 */

var _data = require('./data');
var token_holder = require('./token');
var helper = require('./helper');
var menu = require('./menu');

var cart = {};

// Container for all the cart methods
cart._cart = {};

// Menu
cart.cart = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    cart._cart[data.method](data,callback);
  } else {
    callback(405);
  }
};


cart._cart.post = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  var itemObject = typeof(data.payload.shoppingCart) == 'object' ? data.payload.shoppingCart : false;

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



// Required data: emailAddress, itemId, itemCount
// Optional data: firstName, lastName, password (at least one must be specified)
cart._cart.put = function(data,callback){

  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  var cartName = helper.hash128(emailAddress);
  // Item Id for update
  var itemId = typeof(data.payload.itemId) == 'string' && data.payload.itemId.trim().length > 0 ? data.payload.itemId.trim() : false;
  // Item Count for update
  var itemCount = typeof(data.payload.itemCount) == 'number' && data.payload.itemCount.trim().length > 0 ? data.payload.itemCount.trim() : false;

  // Check if required request info given
  if (emailAddress && cartName){
    // Error if nothing is sent to update
    if(itemId && itemCount){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the email
        token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
            if (tokenIsValid){
              var cartName = helper.hash128(emailAddress);

              // Lookup the user
              _data.read('carts',cartName, function(err,userData){
                if(!err && userData){
                  for (var i = 0; i < userData.items.length; i++) {
                    console.log(userData.items[i]);
                    // Update the fields if necessary
                    if(itemId == userData.items[i]){
                      userData.items[i].count = itemCount;
                    }
                  }

                  // Store the new updates
                  _data.update('carts',cartName,userData,function(err){
                    if(!err){
                      callback(200);
                    } else {
                      console.log(err);
                      callback(500,{'Error' : 'Could not update the user.'});
                    }
                  });
                } else {
                  callback(400,{'Error' : 'Specified user does not exist.'});
                }
              });
            }else{
              callback(403,{'Error':'Missing required token in header, or token is invalid'});
            }
        });
      }
  } else {
    callback(400,{'Error' : 'Missing required field or parameters are incorrect.'});
  }
};


// Required data: emailAddress
// Optional data: None
cart._cart.get = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  console.log(token);

  if(emailAddress){
    var cartName = helper.hash128(emailAddress);
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var menuCount = 0;
          // Counts the menu items
          _data.read('menu','menu_items',function(err,data){
            if(!err && data){
              menuCount = data.items.length;
            }
            console.log('Menu Count: ' + menuCount);
          });
          // Lookup the carts
          _data.read('carts',cartName,function(err,data){
            if(!err && data){
              console.log('Array Length: ' + data.items.length);
              console.log('Displaying Shopping Cart:');
              for (var i = 0; i < data.items.length; i++) {
                // Only show if added to cart
                if (data.items[i].count > 0){
                  console.log('Item in shopping cart: ' + data.items[i].itemid + ' Count in shopping cart: ' + data.items[i].count);
                }
              }
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
module.exports = cart;
