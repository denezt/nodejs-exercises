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
  callback(200);
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
  return emailToFilename;
}

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
// @TODO Only let an authenticated user access their object. Dont let them access anyone elses.
handlers._users.get = function(data, callback){
  var datastoreFilename = typeof(handlers.datastore(data.queryStringObject.emailAddress)) == 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? handlers.datastore(data.queryStringObject.emailAddress) : false;

  if(datastoreFilename){
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
    callback(400, {'Error':'Missing required field'});
  }
};

// Required data: emailAddress
// Optional data: firstName, lastName, password (at least one must be specified)
// @TODO Only let an authenticated user up their object. Dont let them access update elses.
handlers._users.put = function(data,callback){
  var datastoreFilename = typeof(handlers.datastore(data.payload.emailAddress)) === 'string' && data.payload.emailAddress.trim().length > 0 ? handlers.datastore(data.payload.emailAddress) : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (datastoreFilename){
    // Error if nothing is sent to update
    if(firstName || lastName || password){
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
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field or parameters are incorrect.'});
  }
};

// Required data: phone
// @TODO Only let an authenticated user delete their object. Dont let them delete update elses.
// @TODO Cleanup (delete) any other data files associated with the user
handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  var datastoreFilename = typeof(handlers.datastore(data.queryStringObject.emailAddress)) === 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? handlers.datastore(data.queryStringObject.emailAddress) : false;

  if(datastoreFilename){
    // Lookup the user
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
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Users
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
  var id = typeof(data.queryStringObject.id) == 'string'
  && data.queryStringObject.id.trim().length > 20 ? data.queryStringObject.id.trim() : false;
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
  var id = typeof(data.payload.id) == 'string'
  && data.payload.id.trim().length > 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean'
  && data.payload.extend == true ? true : false;
  if (id && extend) {
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if (!err && tokenData) {
        // Check to the make sure the token isn't already expired.
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          var expires = Date.now() + 1000 * 60 * 60;
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
handlers._tokens.delete = function(data, callback){

};



// Export the handlers
module.exports = handlers;
