/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a string of random alphanumeric characters, of a given length parameter.
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;

  if (strLength){
    // Define all the possible characters for the string.
    var allowCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // Start the final string
    var str = '';
    for (var i = 1; i < strLength; i++) {
      // Get a random character from the possibleCharacters string.
      var randomCharacter = allowCharacters.charAt(Math.floor(Math.random() * allowCharacters.length));
      // Append this character to the final string
      str += randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};


// Export the module
module.exports = helpers;
