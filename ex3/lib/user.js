/*
 * Request Handler for User
 *
 */

// Dependencies
var _data = require('./data');
var token_holder = require('./token');
var helper = require('./helper');


var user = {};

// Container for all the users methods
user._user  = {};

// Users
user.user = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    user._user[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Users - post
// Required data: firstName, lastName, emailAddress, streetAddress, password, tosAgreement
// Optional data: none
user._user.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' ? data.payload.streetAddress.trim() : false;

  var password = (typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0) ? data.payload.password.trim() : false;
  var tosAgreement = (typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true) ? true : false;

  var datastoreFilename = helper.datastore(data.payload.emailAddress);
  if(firstName && lastName && emailAddress && streetAddress && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',datastoreFilename,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helper.hash(password);

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
user._user.get = function(data, callback){
  console.log(data)
  var emailAddress = data.queryStringObject.emailAddress;
  var datastoreFilename = typeof(helper.datastore(emailAddress)) == 'string' && emailAddress.trim().length > 1 ? helper.datastore(emailAddress) : false;

  console.log(datastoreFilename);
  if(datastoreFilename){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
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
user._user.put = function(data,callback){
  var emailAddress = data.payload.emailAddress;
  var datastoreFilename = typeof(helper.datastore(emailAddress)) == 'string' && emailAddress.trim().length > 0 ? helper.datastore(emailAddress) : false;

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
        token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
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
                    userData.hashedPassword = helper.hash(password);
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
user._user.delete = function(data,callback){
  // Check that phone number is valid
  var emailAddress = data.queryStringObject.emailAddress;
  var datastoreFilename = (typeof(helper.datastore(emailAddress)) == 'string') && emailAddress.trim().length > 0 ? helper.datastore(emailAddress) : false;

  if(datastoreFilename){
    // Lookup the user
    // Get the token from the headers
    var token = (typeof(data.headers.token) == 'string') ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    token_holder._token.verifyToken(token,emailAddress,function(tokenIsValid){
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

// Export the user
module.exports = user;
