
var _data = require('./data');
var helpers = require('./helpers');

var token_holder = {};

// Container for all the tokens methods
token_holder._tokens = {};

// Tokens
token_holder.tokens = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    token_holder._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Tokens - post
token_holder._tokens.post = function(data, callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress.trim() : false;
  var password = (typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0) ? data.payload.password.trim() : false;
  var datastoreFilename = typeof(helpers.datastore(data.payload.emailAddress)) === 'string' && data.payload.emailAddress.trim().length > 0 ? helpers.datastore(data.payload.emailAddress) : false;
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
token_holder._tokens.get = function(data, callback){
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
token_holder._tokens.put = function(data, callback){
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
          tokenData.expires = Date.now() + 1000 * 60 * 1440;
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
token_holder._tokens.delete = function(data, callback){
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
token_holder._tokens.verifyToken = function(id,emailAddress,callback){
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


// Export the module
module.exports = token_holder;
