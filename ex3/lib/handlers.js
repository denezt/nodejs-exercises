/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

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

// Users
handlers.users = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

handlers.datastore = function(data, callback){
  let emailToFilename = (typeof(data) !== 'undefined') ? data.replace('@','_').replace('.','_') : false;
  if (emailToFilename) {
    return emailToFilename.replace(/^"(.+)"$/,'$1');
  } else {
    return false;
  }

};

// Users - post
// Required data: firstName, lastName, emailAddress, streetAddress, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' ? data.payload.streetAddress.trim() : false;

  var password = (typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0) ? data.payload.password.trim() : false;
  var tosAgreement = (typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true) ? true : false;

  var datastoreFilename = handlers.datastore(data.payload.emailAddress);
  if(firstName && lastName && emailAddress && streetAddress && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',datastoreFilename,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'emailAddress' : emailAddress,
            'streetAddress' : streetAddress,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',datastoreFilename,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User already exists
        callback(400,{'Error' : 'A user with that emailAddress already exists'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

// Required data: emailAddress
// Optional data: none
handlers._users.get = function(data, callback){
  console.log(data)
  var emailAddress = data.queryStringObject.emailAddress;
  var datastoreFilename = typeof(handlers.datastore(emailAddress)) == 'string' && emailAddress.trim().length > 1 ? handlers.datastore(emailAddress) : false;

  console.log(datastoreFilename);
  if(datastoreFilename){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          // Lookup the user
          _data.read('users',datastoreFilename,function(err,data){
            if(!err && data){
              // Remove the hashed password from the user user object before returning it to the requester
              delete data.hashedPassword;
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

// Required data: emailAddress
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function(data,callback){
  var emailAddress = data.payload.emailAddress;
  var datastoreFilename = typeof(handlers.datastore(emailAddress)) == 'string' && emailAddress.trim().length > 0 ? handlers.datastore(emailAddress) : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (datastoreFilename){
    // Error if nothing is sent to update
    if(firstName || lastName || password){

      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the email
        handlers._tokens.verifyToken(token, emailAddress, function(tokenIsValid){
            if (tokenIsValid){
              // Lookup the user
              _data.read('users',datastoreFilename, function(err,userData){
                if(!err && userData){
                  // Update the fields if necessary
                  if(firstName){
                    userData.firstName = firstName;
                  }
                  if(lastName){
                    userData.lastName = lastName;
                  }
                  if(password){
                    userData.hashedPassword = helpers.hash(password);
                  }
                  // Store the new updates
                  _data.update('users',datastoreFilename,userData,function(err){
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
// @TODO Cleanup (delete) any other data files associated with the user
handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  var emailAddress = data.queryStringObject.emailAddress;
  var datastoreFilename = (typeof(handlers.datastore(emailAddress)) == 'string') && emailAddress.trim().length > 0 ? handlers.datastore(emailAddress) : false;

  if(datastoreFilename){
    // Lookup the user
    // Get the token from the headers
    var token = (typeof(data.headers.token) == 'string') ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,emailAddress,function(tokenIsValid){
      if (tokenIsValid) {
        _data.read('users',datastoreFilename,function(err,data){
          if(!err && data){
            _data.delete('users',datastoreFilename,function(err){
              if(!err){
                callback(200);
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{'Error':'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Tokens
handlers.tokens = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
handlers._tokens.post = function(data, callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress.trim() : false;
  var password = (typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0) ? data.payload.password.trim() : false;
  var datastoreFilename = typeof(handlers.datastore(data.payload.emailAddress)) === 'string' && data.payload.emailAddress.trim().length > 0 ? handlers.datastore(data.payload.emailAddress) : false;
  if (emailAddress && password){
    // Search for user via the emailAddress
    _data.read('users',datastoreFilename, function(err, userData){
      if(!err && userData){
        // Here we will hash the sent password and compare it to the
        // stored password from the user object.
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword){
            // When the password is valid, then we will create a token with random name.
            // Set an expiration data for one hour in the future.
            var tokenId = helpers.createRandomString(20);
            var expires = Date.now() + 1000 * 60 * 60;
            var tokenObject = {
                'emailAddress' : emailAddress,
                'id': tokenId,
                'expires' : expires
            };
            // Store the tokens
            _data.create('tokens',tokenId, tokenObject, function(err){
              if(!err){
                callback(200,tokenObject);
              } else {
                callback(500, {'Error':'Could not creat the new token'});
              }
            });
        } else {
          callback(400, {'Error':'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400, {'Error':'Could not find the specified user'});
      }
    });
  } else {
    callback(400, {'Error':'Missing required field(s) or invalid parameters given'});
  }

};

// Tokens - get
handlers._tokens.get = function(data, callback){
  var id = (typeof(data.queryStringObject.id) == 'string'
  && data.queryStringObject.id.trim().length == 19) ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the user
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {'Error':'Missing required field'});
  }
};

// Tokens - put
// Required data : id, extend
// Optional data: none
handlers._tokens.put = function(data, callback){
  var id = (typeof(data.payload.id) == 'string'
  && data.payload.id.trim().length == 19) ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean'
  && data.payload.extend == true ? true : false;
  console.log("ID: " + id);
  console.log("Extend: " + extend.toString());
  if (id && extend) {
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if (!err && tokenData) {
        // Check to the make sure the token isn't already expired.
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Will store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if (!err) {
              callback(200);
            } else {
              callback(500,{'Error':'Could not update the token\'s expiration'});
            }
          });
        } else {
          callback(400,{'Error':'The token has already expired, and cannot be extended'});
        }
      } else {
        callback(400,{'Error':'The specified token does not exist'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field(s) or field(s) are invalid'});
  }
};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data, callback){
  // Check that the id is invalid
  var id = typeof(handlers.datastore(data.queryStringObject.id)) === 'string' && data.queryStringObject.id.trim().length == 19 ? data.queryStringObject.id : false;

  if(id){
    // Lookup the user
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// // General Purpose function
// // Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,emailAddress,callback){
  // Lookup the tokens
  _data.read('tokens',id,function(err,tokenData){
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.emailAddress == emailAddress && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Menu
handlers.menu = function(data, callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the menu methods
handlers._menu = {};

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
handlers._menu.get = function(data, callback){
  var emailAddress = data.queryStringObject.emailAddress;
  if(emailAddress){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token, emailAddress, function(tokenIsValid){
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

// Menu
handlers.cart = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._cart[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the cart methods
handlers._cart = {};

handlers._cart.post = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  var itemObject = typeof(data.payload.itemList) == 'object' ? data.payload.itemList : false;

  if(emailAddress && itemObject){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var cartName = helpers.hash128(emailAddress);
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

handlers._cart.get = function(data,callback){
  console.log(data.payload);
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;

  if(emailAddress){
    var cartName = helpers.hash128(emailAddress);
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          // Lookup the user
          _data.read('carts',cartName,function(err,data){
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

// Export the handlers
module.exports = handlers;
