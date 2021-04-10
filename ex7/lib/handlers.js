/**
* Handler for requests
*/

const os = require('os');
// Define all the handlers
var handlers = {};


// Sample handler
handlers.hello = function(data,callback){
  console.log(data);
  console.log(data.headers['user-agent']);
  console.log('\x1b[32m%s\x1b[0m','Called Hello World');
  callback(200,{'hello':'My name is computer'});
};

// Extra Sample handlers
handlers.index = function(data,callback){
    console.log(data);
    console.log(data.headers['user-agent']);
    console.log('\x1b[32m%s\x1b[0m','Called Index Page');
    callback(200,{'index':'Main page'});
};

handlers.info = function(data,callback){
    console.log(data);
    console.log(data.headers['user-agent']);
    console.log('Number of CPUs: ' + os.cpus().length);
    var output = {
      'cpu_count' : os.cpus().length
    };
    callback(200,output);
};

handlers.ping = function(data,callback){
    console.log(data);
    console.log(data.headers['user-agent']);
    console.log('\x1b[32m%s\x1b[0m','Called Ping');
    callback(200,{'status':'ok'});
};

// Not found handler
handlers.notFound = function(data,callback){
  console.log(data);
  console.log(data.headers['user-agent']);
  console.log('\x1b[32m%s\x1b[0m','Called an Unknown Page');
  callback(404,{'error':'Page Not Found'});
};

module.exports = handlers;
