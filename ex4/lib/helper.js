/*
 * Helper for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');
var path = require('path');
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');

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

// Get the string content of a template, and use provided data for string interpolation
helper.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolation on the string
        var finalString = helper.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helper.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  // Get the header
  helper.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helper.getTemplate('_footer',data,function(err,footerString){
        if(!err && headerString){
          // Add them all together
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and data object, and find/replace all the keys within it
helper.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  for(var keyName in config.templateGlobals){
     if(config.templateGlobals.hasOwnProperty(keyName)){
       data['global.'+keyName] = config.templateGlobals[keyName]
     }
  }
  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
     if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
        var replace = data[key];
        var find = '{'+key+'}';
        str = str.replace(find,replace);
     }
  }
  return str;
};

// Get the contents of a static (public) asset
helper.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName, function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};

// Export the module
module.exports = helper;
