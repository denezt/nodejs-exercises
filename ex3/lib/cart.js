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

// Cart - post
// Required data: emailAddress, itemObject
// Optional data: none
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
                    callback(200,{'status':'created'});
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


// Cart - put
// Required data: emailAddress, itemId, itemCount
// Optional data: none
cart._cart.put = function(data,callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  // Item Id for update
  var itemId = typeof(data.payload.itemId) == 'string' && data.payload.itemId.trim().length > 0 ? data.payload.itemId.trim() : false;
  // Item Count for update
  var itemCount = typeof(Number(data.payload.itemCount)) == 'number' && Number(data.payload.itemCount) >= 0 ? Number(data.payload.itemCount) : -1;

  // Check if required request info given
  if (emailAddress){
    // Error if nothing is sent to update
    if(itemId && itemCount >= 0){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the email
        token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
            if (tokenIsValid){
              var cartName = helper.hash128(emailAddress);
              var menuCount;

              _data.read('menu','menu_items',function(err,data){
                  if(!err && data){
                    menuCount = data.items.length;
                  }
                  console.log('Menu Count Type: ' + typeof(menuCount));
                  console.log('Menu Count: ' + menuCount);
                });

                // will prevent item count from invalid input
                if (Number(itemId) < menuCount) {
                  _data.read('carts',cartName,function(err,data){
                    if(!err){
                        data.items[itemId-1].count = itemCount;
                        // Store the cart items
                        _data.update('carts',cartName,data,function(err){
                          if(!err){
                            callback(200,{'status':'updated'});
                          } else {
                            console.log(err);
                            callback(500,{'Error' : 'Could not create the new cart'});
                          }
                        });
                    } else {
                      // User already exists
                      callback(400,{'Error' : 'No cart was found'});
                    }
                });
              } else {
                callback(400,{'Error' : 'Incorrect menu count was entered'});
              }
        } else {
          callback(403,{'Error':'Missing required token in header, or token is invalid'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing required field or parameters are incorrect (itemid or count).'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field or parameters are incorrect.(user login information)'});
  }
};

// Cart - get
// Required data: emailAddress
// Optional data: None
cart._cart.get = function(data,callback){
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
              callback(404,{'Error':'No cart was created'});
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

// Cart - delete
// Required data: emailAddress
// Optional data: none
cart._cart.delete = function(data, callback){
  // Check that the id is invalid
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;

  if(emailAddress){
    var cartName = helper.hash128(emailAddress);
    // Lookup the user
    _data.read('carts',cartName,function(err,data){
      if(!err && data){
        _data.delete('carts',cartName,function(err){
          if(!err){
            callback(200,{'status':'deleted'});
          } else {
            callback(500,{'Error' : 'Could not delete the specified cart'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified cart.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};




// Export the module
module.exports = cart;
