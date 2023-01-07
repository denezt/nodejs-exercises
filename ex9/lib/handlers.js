/*
 * Request Handlers
 *
 */

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');
const https = require('https');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers
 */

// Index
handlers.index = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Handler Framework',
      'head.description': 'Welcome to the JSHandler Framework',
      'body.class': 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create Account
handlers.accountCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.',
      'body.class': 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create New Session
handlers.sessionCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Login to your account.',
      'head.description': 'Please enter your emailAddress number and password to access your account.',
      'body.class': 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit Your Account
handlers.accountEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Settings',
      'head.description': '',
      'body.class': 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out of your account.',
      'body.class': 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Deleted',
      'head.description': 'Your account has been deleted.',
      'body.class': 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit a Check
handlers.externalApiSettings = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'External API Settings',
      'body.class': 'externalApiSettings'
    };
    // Read in a template as a string
    helpers.getTemplate('externalApiSettings', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Favicon
handlers.favicon = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico', function (err, data) {
      if (!err && data) {
        // Callback the data
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};

/*
 * JSON API Handlers
 *
 */

// Ping
handlers.ping = function (data, callback) {
  callback(200);
};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};

// Users
handlers.users = function (data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, emailAddress, password, tosAgreement
// Optional data: none
handlers._users.post = function (data, callback) {
  // Check that all required fields are filled out
  var emailAddressNormal = typeof (data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1) ? data.payload.emailAddress.trim() : false;
  var emailAddress = typeof (data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1) ? helpers.datastore(data.payload.emailAddress.trim()) : false;
  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var apikey = typeof (data.payload.apikey) == 'string' && data.payload.apikey.trim().length > 0 ? data.payload.apikey.trim() : false;
  var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && emailAddress && password && tosAgreement) {
    // Make sure the user doesnt already exist
    _data.read('users', emailAddress, function (err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if (hashedPassword) {
          var userObject = {
            'firstName': firstName,
            'lastName': lastName,
            'emailAddress': emailAddressNormal,
            'hashedPassword': hashedPassword,
            'api_key': {
              "mailgun": apikey
            },
            'tosAgreement': true
          };

          // Store the user
          _data.create('users', emailAddress, userObject, function (err) {
            // Get older logging records
            _data.read('users', emailAddress, function (err, data) {
              if (!err && data) {
                console.log("Extracting older logging records");
                // callback(200,data);
              } else {
                callback(404);
              }
            });
            const now = new Date();
            // const signUpDate = Math.round(now.getTime() / 1000);
            var dd = String(now.getDate()).padStart(2, '0');
            var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = now.getFullYear();
            const signUpDate = dd + '-' + mm + '-' + yyyy;

            // Update the records
            const userSignInfo = {
              'firstName': userObject.firstName,
              'lastName': userObject.lastName,
              'emailAddress': emailAddressNormal,
              'signupDate': signUpDate
            };
            // Container for New User SignUps
            var userSignUpList = {};

            if (!err) {
              // Extract data from users_list
              _data.read('records', 'users_list', function (err, data) {
                if (!err && data) {
                  // Count Recent SignUps
                  console.log('Signup Count [data]: ' + (data.recent_signup.length + 1));
                  userSignUpList = data;
                  // Rotates and stores only the last 5
                  if (data.recent_signup.length > 4) {
                    userSignUpList.recent_signup.shift();
                  }
                  userSignUpList.recent_signup.push(userSignInfo);
                  // Append new data to users_list
                  _data.update('records', 'users_list', userSignUpList, function (err) {
                    if (!err) {
                      callback(200);
                    }
                  });
                }
              });
            } else {
              callback(500, { 'Error': 'Could not create the new user' });
            }
          });
        } else {
          callback(500, { 'Error': 'Could not hash the user\'s password.' });
        }
      } else {
        // User alread exists
        callback(400, { 'Error': 'A user with that emailAddress number already exists' });
      }
    });

  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }

};

// Required data: emailAddress
// Optional data: none
handlers._users.get = function (data, callback) {
  // Check that emailAddress number is valid
  var emailAddress = typeof (data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 1 ? helpers.datastore(data.queryStringObject.emailAddress.trim()) : false;

  console.log('handlers._users.get [emailAddress]' + emailAddress);
  if (emailAddress) {

    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the emailAddress number
    handlers._tokens.verifyToken(token, emailAddress, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', emailAddress, function (err, data) {
          if (!err && data) {
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." })
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' })
  }
};

// Required data: emailAddress
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function (data, callback) {
  // Check for required field
  var emailAddress = typeof (data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  // Check for optional fields
  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  var apikey = typeof (data.payload.apikey) == 'string' && data.payload.apikey.trim().length > 0 ? data.payload.apikey.trim() : false;

  // Error if emailAddress is invalid
  if (emailAddress) {
    // Error if nothing is sent to update
    if (firstName || lastName || password || apikey) {

      // Get token from headers
      var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the emailAddress number
      handlers._tokens.verifyToken(token, emailAddress, function (tokenIsValid) {
        if (tokenIsValid) {

          // Lookup the user
          _data.read('users', emailAddress, function (err, userData) {
            if (!err && userData) {
              // Update the fields if necessary
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }
              if (apikey) {
                userData.api_key.mailgun = apikey;
              }
              // Store the new updates
              _data.update('users', emailAddress, userData, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { 'Error': 'Could not update the user.' });
                }
              });
            } else {
              callback(400, { 'Error': 'Specified user does not exist.' });
            }
          });
        } else {
          callback(403, { "Error": "Missing required token in header, or token is invalid." });
        }
      });
    } else {
      callback(400, { 'Error': 'Missing fields to update.' });
    }
  } else {
    callback(400, { 'Error': 'Missing required field.' });
  }

};

// Required data: emailAddress
// Cleanup old order associated with the user
handlers._users.delete = function (data, callback) {
  // Check that emailAddress number is valid
  var emailAddress = typeof (data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  if (emailAddress) {

    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the emailAddress number
    handlers._tokens.verifyToken(token, emailAddress, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', emailAddress, function (err, userData) {
          if (!err && userData) {
            // Delete the user's data
            _data.delete('users', emailAddress, function (err) {
              console.log();
            });
          } else {
            callback(400, { 'Error': 'Could not find the specified user.' });
          }
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' })
  }
};

// Tokens
handlers.tokens = function (data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
// Required data: emailAddress, password
// Optional data: none
handlers._tokens.post = function (data, callback) {
  var emailAddress = typeof (data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if (emailAddress && password) {
    // Lookup the user who matches that emailAddress number
    _data.read('users', emailAddress, function (err, userData) {
      if (!err && userData) {
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'emailAddress': emailAddress,
            'id': tokenId,
            'expires': expires
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { 'Error': 'Could not create the new token' });
            }
          });
        } else {
          callback(400, { 'Error': 'Password did not match the specified user\'s stored password' });
        }
      } else {
        callback(400, { 'Error': 'Could not find the specified user.' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field(s).' })
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function (data, callback) {
  // Check that id is valid
  var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field, or field invalid' })
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function (data, callback) {
  var id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof (data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if (id && extend) {
    // Lookup the existing token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        // Check to make sure the token isn't already expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens', id, tokenData, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, { 'Error': 'Could not update the token\'s expiration.' });
            }
          });
        } else {
          callback(400, { "Error": "The token has already expired, and cannot be extended." });
        }
      } else {
        callback(400, { 'Error': 'Specified user does not exist.' });
      }
    });
  } else {
    callback(400, { "Error": "Missing required field(s) or field(s) are invalid." });
  }
};


// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function (data, callback) {
  // Check that id is valid
  var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        // Delete the token
        _data.delete('tokens', id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { 'Error': 'Could not delete the specified token' });
          }
        });
      } else {
        callback(400, { 'Error': 'Could not find the specified token.' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' })
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function (id, emailAddress, callback) {
  // Lookup the token
  _data.read('tokens', id, function (err, tokenData) {
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

// External
handlers.external = function (data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._external[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._external = {};



// Export the handlers
module.exports = handlers;
