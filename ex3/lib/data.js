/*
 * Library for storing and editing data
 *
 */

// Dependencies
const fs = require('fs');
var fsPromises = fs.promises;
var path = require('path');
var helpers = require('./helpers');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = '.data';

// Create all datastore files
const pathsToCheck = [
	lib.baseDir,
	lib.baseDir + '/users',
	lib.baseDir + '/tokens',
	lib.baseDir + '/menu',
	lib.baseDir + '/orders'
];

for (let i = 0; i < pathsToCheck.length; i++){
	let targetFile = pathsToCheck[i];
	fs.stat(targetFile, function(err,stats){
		if (typeof stats === 'undefined'){
			if (err){
				console.log("Creating missing directory: " + targetFile);
				fs.mkdir(targetFile, { recursive : true, mode: 0o777 }, (err) =>{ });
			}
		}
	});
}

// Initiate Datasets
lib.initiate = function(dir,file,data,callback){
	console.log(typeof lib.baseDir,lib.baseDir + '/' + dir);
	let myPath = lib.baseDir + dir;
	// Open the file for writing
	fs.open(lib.baseDir.toString() + '/' + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
		if(!err && fileDescriptor){
     			// Convert data to string
			var stringData = {"items": [{"id":"1","price": "$11.25", "name": "Italian Sausage Pizza","description" :"Italian Sausage and Cheese"},{"id":"2","price": "$10.00","name": "Pepperoni Pizza","description": "Pepperoni and Cheese"},{"id":"3","price": "$5.60","name": "Happy Sparkling Juice","description": "Natural water and juice."},{"id":"4","price": "$2.18","name": "White Chocolate Chip Cookies","description": "Fat Free and Low Carb Dessert"},{"id":"5","price": "$4.50","name": "New World Lemonade","description": "Lemonade with organic sugar"}]};

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });

};

// Write data to a file
lib.create = function(dir,file,data,callback){
	console.log(typeof lib.baseDir,lib.baseDir + '/' + dir);
	let myPath = lib.baseDir + dir;
	// Open the file for writing
	fs.open(lib.baseDir.toString() + '/' + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
		if(!err && fileDescriptor){
     			// Convert data to string
			var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });

};

// Read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir + '/' + dir + '/' + file + '.json', 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};

// Update data in a file
lib.update = function(dir,file,data,callback){

  // Open the file for writing
  fs.open(lib.baseDir + '/' + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor,function(err){
        if(!err){
          // Write to file and close it
          fs.writeFile(fileDescriptor, stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });

};

// Delete a file
lib.delete = function(dir, file, callback){
  // Unlink the file from the filesystem
  fs.unlink(lib.baseDir + '/' + dir + '/' + file + '.json', function(err){
    callback(err);
  });
};

// Export the module
module.exports = lib;
