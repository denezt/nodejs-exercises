/*
 * Request Handler for Cart
 *
 */

var _data = require('./data');
var token_holder = require('./token');
var helper = require('./helper');


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
  var itemObject = typeof(data.payload.itemList) == 'object' ? data.payload.itemList : false;

  if(emailAddress && itemObject){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var cartName = helper.hash128(emailAddress);
          itemObject = {
            "items":[
              {'':''}
            ]
          }
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



// Required data: emailAddress
// Optional data: firstName, lastName, password (at least one must be specified)
cart._cart.put = function(data,callback){
  var emailAddress = data.payload.emailAddress;
  var datastoreFilename = typeof(helper.datastore(emailAddress)) == 'string' && emailAddress.trim().length > 0 ? helper.datastore(emailAddress) : false;

  // Check for optional fields
  var itemId = typeof(data.payload.itemid) == 'string' && data.payload.itemid.trim().length > 0 ? data.payload.itemid.trim() : false;


  if (datastoreFilename){
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
                  for (var i = 0; i < userData.itemList.length; i++) {
                    console.log(userData.itemList[i]);

                  }
                  // Update the fields if necessary
                  if(firstName){
                    userData.firstName = firstName;
                  }

                  // Store the new updates
                  _data.update('carts',datastoreFilename,userData,function(err){
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
module.exports = cart;
