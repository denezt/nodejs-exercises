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
 *
 */

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Online Ordering System',
      'head.description' : 'System for easy ordering and delivery services systems.',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handlers.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your account.',
      'head.description' : 'Please enter your emailAddress number and password to access your account.',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'head.description' : '',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new check
handlers.orderCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Order ',
      'body.class' : 'orderCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('orderCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Dashboard (view all order)
handlers.orderConfirm = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Confirm Your Order',
      'body.class' : 'orderConfirm'
    };
    // Read in a template as a string
    helpers.getTemplate('orderConfirm',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a Check
handlers.orderEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'orderEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('orderEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a Check
handlers.externalApiSettings = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'External API Settings',
      'body.class' : 'externalApiSettings'
    };
    // Read in a template as a string
    helpers.getTemplate('externalApiSettings',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Favicon
handlers.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
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


// Create Account
handlers.menuPage = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'View Our Menu',
      'head.description' : 'Choose from our delicious menu and get it delivered under 30 mins.',
      'body.class' : 'menuPage'
    };
    // Read in a template as a string
    helpers.getTemplate('menuPage',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

/*
 * JSON API Handlers
 *
 */

// Ping
handlers.ping = function(data,callback){
    callback(200);
};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

// Users - post
// Required data: firstName, lastName, emailAddress, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var emailAddressNormal = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1 ) ? data.payload.emailAddress.trim() : false;

  var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1 ) ? helpers.datastore(data.payload.emailAddress.trim()) : false;


  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;


  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  var apikey = typeof(data.payload.apikey) == 'string' && data.payload.apikey.trim().length > 0 ? data.payload.apikey.trim() : false;

  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && emailAddress && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',emailAddress,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'emailAddress' : emailAddressNormal,
            'hashedPassword' : hashedPassword,
            'order': [],
            'api_key':{
              "mailgun": apikey
            },
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',emailAddress,userObject,function(err){
            // Get older logging records
            _data.read('users',emailAddress,function(err,data){
              if(!err && data){
                console.log("Extracting order logging records");
                // callback(200,data);
              } else {
                callback(404);
              }
            });
            const now = new Date();
            // const signUpDate = Math.round(now.getTime() / 1000);
            var dd = String(now.getDate()). padStart(2, '0');
            var mm = String(now.getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = now.getFullYear();
            const signUpDate = dd + '-' + mm + '-' + yyyy;

            // Update the records
            const userSignInfo = {
              'firstName' : userObject.firstName,
              'lastName' : userObject.lastName,
              'emailAddress' : emailAddress,
              'signupDate' : signUpDate
            };
            // Container for New User SignUps
            var userSignUpList = {};

            if(!err){
              // Extract data from users_list
              _data.read('records','users_list',function(err,data){
                if(!err && data){
                  // Count Recent SignUps
                  console.log('Signup Count [data]: ' + (data.recent_signup.length + 1));
                  userSignUpList = data;
                  // Rotates and stores only the last 5
                  if (data.recent_signup.length > 4){
                    userSignUpList.recent_signup.shift();
                  }
                  userSignUpList.recent_signup.push(userSignInfo);
                  // Append new data to users_list
                  _data.update('records','users_list',userSignUpList,function(err){
                    if(!err){
                      callback(200);
                    }
                  });
                }
              });
            } else {
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }
      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that emailAddress number already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

};

// Required data: emailAddress
// Optional data: none
handlers._users.get = function(data,callback){
  // Check that emailAddress number is valid
  var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 1 ? helpers.datastore(data.queryStringObject.emailAddress.trim()) : false;

  console.log('handlers._users.get [emailAddress]' + emailAddress);
  if(emailAddress){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the emailAddress number
    handlers._tokens.verifyToken(token,emailAddress,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',emailAddress,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Required data: emailAddress
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function(data,callback){
  // Check for required field
  var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1 ) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  var apikey = typeof(data.payload.apikey) == 'string' && data.payload.apikey.trim().length > 0 ? data.payload.apikey.trim() : false;

  // Error if emailAddress is invalid
  if(emailAddress){
    // Error if nothing is sent to update
    if(firstName || lastName || password || apikey){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the emailAddress number
      handlers._tokens.verifyToken(token,emailAddress,function(tokenIsValid){
        if(tokenIsValid){

          // Lookup the user
          _data.read('users',emailAddress,function(err,userData){
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
              if(apikey){
                userData.api_key.mailgun = apikey;
              }
              // Store the new updates
              _data.update('users',emailAddress,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }

};

// Required data: emailAddress
// Cleanup old order associated with the user
handlers._users.delete = function(data,callback){
  // Check that emailAddress number is valid
  var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1 ) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  if(emailAddress){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the emailAddress number
    handlers._tokens.verifyToken(token,emailAddress,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',emailAddress,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',emailAddress,function(err){
              if(!err){
                // Delete each of the order associated with the user
                var userChecks = typeof(userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];
                var orderToDelete = userChecks.length;
                if(orderToDelete > 0){
                  var orderDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the order
                  userChecks.forEach(function(checkId){
                    // Delete the check
                    _data.delete('order',checkId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      orderDeleted++;
                      if(orderDeleted == orderToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's order. All order may not have been deleted from the system successfully."})
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens  = {};

// Tokens - post
// Required data: emailAddress, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 1 && (data.payload.emailAddress.indexOf('@') > -1 ) ? helpers.datastore(data.payload.emailAddress.trim()) : false;

  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(emailAddress && password){
    // Lookup the user who matches that emailAddress number
    _data.read('users',emailAddress,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'emailAddress' : emailAddress,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s).'})
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the existing token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};


// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
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
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,emailAddress,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.emailAddress == emailAddress && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Order
handlers.order = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._order[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._order  = {};

// Checks - post
// Required data: protocol,url,method,successCodes,timeoutSeconds
// Optional data: none
handlers._order.post = function(data,callback){
  // Validate inputs
  console.log('handlers._order.post [menuItem typeof]: ' + typeof(data.payload.menuItem1));
  var menuItem1 = typeof(data.payload.menuItem1) == 'boolean' ? data.payload.menuItem1 : false;

  var menuItem2 = typeof(data.payload.menuItem2) == 'boolean' ? data.payload.menuItem2 : false;

  var menuItem3 = typeof(data.payload.menuItem3) == 'boolean' ? data.payload.menuItem3 : false;

  var menuItem4 = typeof(data.payload.menuItem4) == 'boolean' ? data.payload.menuItem4 : false;

  var menuItem5 = typeof(data.payload.menuItem5) == 'boolean' ? data.payload.menuItem5 : false;

  if(menuItem1 || menuItem2 || menuItem3 || menuItem4 || menuItem5){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user emailAddress by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if(!err && tokenData){
        var userEmail = tokenData.emailAddress;
        console.log('handlers._order.post: ' + tokenData.emailAddress);

        // Lookup the user data
        _data.read('users',userEmail,function(err,userData){
          if(!err && userData){
            var userOrder = typeof(userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];
              // Create random id for check
              var orderId = helpers.createRandomString(20);

              // Create check object including userEmail
              var orderObject = {
                'id' : orderId,
                'userEmail' : userEmail,
                'menuItems' : {
                  menuItem1,
                  menuItem2,
                  menuItem3,
                  menuItem4,
                  menuItem5
                }
              };

              // Save the object
              _data.create('orders',orderId,orderObject,function(err){
                if(!err){
                  // Add check id to the user's object
                  userData.order = userOrder;
                  userData.order.push(orderId);

                  // Save the new user data
                  _data.update('users',userEmail,userData,function(err){
                    if(!err){
                      // Return the data about the new check
                      callback(200,orderObject);
                    } else {
                      callback(500,{'Error' : 'Could not update the order.'});
                    }
                  });
                } else {
                  callback(500,{'Error' : 'Could not create the new order'});
                }
              });
          } else {
            callback(403);
          }
        });

      } else {
        callback(403,{'Error':'Token Not Correct Exception Occurred.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
};

// Checks - get
// Required data: id
// Optional data: none
handlers._order.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the check
    _data.read('orders',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userEmail,function(tokenIsValid){
          if(tokenIsValid){
            // Return check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};




// Checks - delete
// Required data: id
// Optional data: none
handlers._order.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the check
    _data.read('orders',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userEmail,function(tokenIsValid){
          if(tokenIsValid){

            // Delete the check data
            _data.delete('orders',id,function(err){
              if(!err){
                // Lookup the user's object to get all their order
                _data.read('users',checkData.userEmail,function(err,userData){
                  if(!err){
                    var userChecks = typeof(userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];

                    // Remove the deleted check from their list of order
                    var checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      userChecks.splice(checkPosition,1);
                      // Re-save the user's data
                      userData.order = userChecks;
                      _data.update('users',checkData.userEmail,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update the user.'});
                        }
                      });
                    } else {
                      callback(500,{"Error" : "Could not find the check on the user's object, so could not remove it."});
                    }
                  } else {
                    callback(500,{"Error" : "Could not find the user who created the check, so could not remove the check from the list of order on their user object."});
                  }
                });
              } else {
                callback(500,{"Error" : "Could not delete the check data."})
              }
            });
          } else {
            callback(403);
          }
        });
      } else {
        callback(400,{"Error" : "The check ID specified could not be found"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing valid id"});
  }
};

// Order
handlers.cart = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._cart[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._cart  = {};

// Checks - post
// Required data: protocol,url,method,successCodes,timeoutSeconds
// Optional data: none
handlers._cart.post = function(data,callback){
  // Validate inputs
  var confirmOrder = (typeof(data.payload.confirm) == 'string' && data.payload.confirm === "true") ? true : false;

  console.log('handlers._cart.post: ' + confirmOrder + ' ' + typeof(data.payload.confirm));
  if(confirmOrder){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user emailAddress by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if(!err && tokenData){
        var userEmail = tokenData.emailAddress;
        console.log('handlers._cart.post: ' + tokenData.emailAddress);

        // Lookup the user data
        _data.read('users',userEmail,function(err,userData){
          if(!err && userData){
            var userOrder = typeof(userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];

            lastOrder = userOrder.length - 1;
            console.log('Get Last Order: ' + userOrder[lastOrder]);
            for (var i = 0; i < userOrder.length; i++) {
              // Delete the check data
              _data.delete('orders',userOrder[i],function(err){
                if(!err){
                  // Lookup the user's object to get all their order
                  console.log('Removing all Orders after confirmation');
                }
              });
            }
            // Flush All orders
            userData.order = [];

            _data.update('users',tokenData.emailAddress,userData,function(err){
              if(!err){
                callback(200);
              } else {
                callback(500,{'Error' : 'Could not update the user.'});
              }
            });
          } else {
            callback(403);
          }
        });

      } else {
        callback(403);
      }
    });
  } else {
    callback(200,{});
  }
};

// Required data: id
// Optional data: none
handlers._cart.get = function(data,callback){
  // Check that id is valid
  var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' ? data.queryStringObject.emailAddress : false;
  if(emailAddress){
    // Lookup the check
    _data.read('users',emailAddress,function(err,userData){
      if(!err && userData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,emailAddress,function(tokenIsValid){
          if(tokenIsValid){
            console.log('userData.order.length: ' + userData.order.length);
            var recentOrder = (userData.order.length > 0 ) ? userData.order.length - 1 : false;
            var firstName = "";
            var lastName = "";
            _data.read('users',emailAddress,function(err,userData){
              // Return check data
              firstName = userData.firstName;
              lastName = userData.lastName;
            });
            if (typeof(recentOrder) != 'boolean' ){
              _data.read('orders',userData.order[recentOrder],function(err,orderData){
                // Return check data
                orderData.firstName = firstName;
                orderData.lastName = lastName;
                callback(200,orderData);
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// External
handlers.external = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._external[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._external = {};

// External
handlers.pay = function(data,callback){
  var acceptableMethods = ['post','get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._pay[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the order methods
handlers._pay = {};

// Checks - put
// Required data: id
// Optional data: protocol,url,method,successCodes,timeoutSeconds (one must be sent)
handlers._pay.post = function(data, callback){
  var confirm = typeof(data.payload.confirm) == 'string' && data.payload.confirm == "true" ? true : false;

  console.log('confirm: ' + confirm);

  // Check if required request info given
  if(confirm){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user emailAddress by reading the token
    _data.read('tokens',token,function(err,tokenData){

      if(!err && tokenData){
        var userEmail = tokenData.emailAddress;

        handlers._tokens.verifyToken(token, userEmail, function(tokenIsValid){
          if (tokenIsValid){
            // var cartName = helper.hashmd5(emailAddress);
            var menuCount = 0;
            const data = JSON.stringify({
                    amount : 2000,
                    currency : 'eur',
                    description : 'Example charge',
                    source: 'tok_mastercard',
                    api_key: 'sk_test_51I5rz5LIu7OWc1YLkwLronOnHTMVxGo5xwHwbgkv2mftAhKr6H8ETCzyOJCrwSuAXdpsg6nOGXtNRktzGtY79wk40019Bxy6FL:'
            });
            const options = {
              hostname: 'api.stripe.com',
              port: 443,
              path: '/v1/charges',
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': ' Bearer sk_test_51I5rz5LIu7OWc1YLkwLronOnHTMVxGo5xwHwbgkv2mftAhKr6H8ETCzyOJCrwSuAXdpsg6nOGXtNRktzGtY79wk40019Bxy6FL'
              }
            };
            const req = https.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`);
              res.on('data', d => {
                process.stdout.write(d);
              });
            });

            req.on('error', error => {
              console.error(error);
            });
            req.write(data);
            req.end();


            _data.read('users',userEmail,function(err,userData){
              // var apiKey = "";
              const apiKey = userData.api_key.mailgun;

              if(!err && userData){
                console.log(userData.api_key.mailgun);

                const formData = JSON.stringify({
                  from: 'Mailgun Sandbox <postmaster@sandbox2a526e8998d24d17ba93494a7d7e2adf.mailgun.org>',
                  to: 'rj <denezt@yahoo.com>',
                  subject: 'Hello rj',
                  text: 'Congratulations rj, you just sent an email with Mailgun!  You are truly awesome!',
                  api_key: apiKey
                });

                console.log(formData);

                const option2 = {
                  hostname: 'api.mailgun.net/v3/sandbox2a526e8998d24d17ba93494a7d7e2adf.mailgun.org',
                  port: 443,
                  path: '/messages',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };

                const req2 = https.request(option2, res => {
                  console.log(`statusCode: ${res.statusCode}`);
                });

                req2.on('error', error => {
                  console.error(error);
                });

                req2.write(formData);
                req2.end();

                // Order Extraction
                var userOrder = typeof(userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];
                lastOrder = userOrder.length - 1;
                console.log('Get Last Order: ' + userOrder[lastOrder]);
                  // Removing all User's Orders
                  for (var i = 0; i < userOrder.length; i++) {
                    _data.delete('orders',userOrder[i],function(err){
                      if(!err){
                        // Lookup the user's object to get all their order
                        console.log('Removing all Orders after confirmation');
                      }
                    });
                  }
                // Flush All orders
                userData.order = [];

                _data.update('users',tokenData.emailAddress,userData,function(err){
                  if(err){
                    callback(500,{'Error' : 'Could not update the user.'});
                  }
                });
              } else {
                callback(403);
              }
            });

            callback(200,{'status':'submitted'});
          } else {
            callback(403,{'Error':'Missing required token in header, or token is invalid'});
          }
        });
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field or parameters are incorrect.(user login information)'});
  }
};


// Export the handlers
module.exports = handlers;
