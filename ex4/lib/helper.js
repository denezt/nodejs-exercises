/*
 * Helper for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');
var path = require('path');

// Container for all the helper
var helper = {};

// Parse a JSON string to an object in all cases, without throwing
helper.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

// Create a SHA256 hash
helper.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a SHA128 hash
helper.hash128 = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('md5', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a string of random alphanumeric characters, of a given length parameter.
helper.createRandomString = function(strLength){
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

helper.datastore = function(data, callback){
  let convertToFilename = (typeof(data) !== 'undefined') ? data.replace('@','_').replace('.','_') : false;
  if (convertToFilename) {
    return convertToFilename.replace(/^"(.+)"$/,'$1');
  } else {
    return false;
  }
};

// Get the string content of a template
helper.getTemplate = function(templateName,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err,str){
      if(!err && str && str.length > 0){
        callback(false,str);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Export the module
module.exports = helper;
