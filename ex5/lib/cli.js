/*
 * CLI-related tasks
 *
 */

// Dependencies
const readline = require('readline');
const util = require('util');
const fs = require('fs');
const v8 = require('v8');
const _data = require('./data');
const helpers = require('./helpers');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events{};
const e = new _events();

// Instantiate the cli module object
var cli = {};

// Input handlers
e.on('help',function(){
  cli.responders.help();
});

e.on('menu items',function(){
  cli.responders.menu();
});

e.on('recent signups',function(){
  console.log(cli.responders.signups());
});

e.on('recent orders',function(){
  cli.responders.orders();
});

e.on('user details',function(str){
  cli.responders.user(str);
});

e.on('exit',function(){
  cli.responders.exit();
});

// Responders object
cli.responders = {};

// Help
cli.responders.help = function(){
  console.log("Show Help Menu       - help");
  console.log("Show Menu Items      - menu items");
  console.log("Show Recent SignUps  - recent signups");
  console.log("Show Recent Orders   - recent orders");
  console.log("Exit CLI             - exit");
};

// Current Menu items
cli.responders.menu = function(){
  const menuitem = {
   "items": [
   {
     "id":"1",
     "price": "$11.25",
     "name": "Italian Sausage Pizza",
     "description" :"Italian Sausage and Cheese"
   },
   {
     "id":"2",
     "price":"$10.00",
     "name": "Pepperoni Pizza",
     "description": "Pepperoni and Cheese"
   },
   {
     "id":"3",
     "price": "$5.60",
     "name": "Happy Sparkling Juice",
     "description": "Natural water and juice."
   },
   {
     "id":"4",
     "price": "$2.18",
     "name": "White Chocolate Chip Cookies",
     "description": "Fat Free and Low Carb Dessert"
   },
   {
     "id":"5",
     "price":"$4.50",
     "name":"New World Lemonade",
     "description": "Lemonade with organic sugar"
   }
  ],
  "count" : 5
  };
  console.log(menuitem.items);
};

cli.responders.signups = function(){
  var signUpOutput = "";
  const now = new Date();
  var dd = String(now.getDate()).padStart(2, '0');
  var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = now.getFullYear();
  const currentDate = dd + '-' + mm + '-' + yyyy;
  var content = fs.readFileSync('.data/records/users_list.json','utf-8');
  const contentObj = JSON.parse(content);
  var counter = 1;
  for (var i = 0; i < contentObj.recent_signup.length; i++) {
    if (contentObj.recent_signup[i].signupDate == currentDate){
      signUpOutput += '[' + counter + '] ' + contentObj.recent_signup[i].firstName + ' ' + contentObj.recent_signup[i].lastName + ' ' + contentObj.recent_signup[i].emailAddress + '\n';
    }
    counter++;
  }
  return signUpOutput;
};

cli.responders.orders = function(){
  console.log("showing orders");
};

cli.responders.user = function(str){
  var arr = typeof(str) == 'string' ? str.split('--') : false;
  var userInfo = typeof(arr[1]) == 'string' && arr[1].trim().length > 0  ? arr[1].trim() : false;
  var emailArg =  (typeof(userInfo.split(' ')[0]) == 'string' && userInfo.split(' ')[0] == 'email') ? true : false;

  console.log('Type of: ' + typeof(userInfo.split(' ')[0]));
  if (userInfo && emailArg){
    var userEmail = userInfo.split(' ')[1].replace('@','_').replace('.','_');
    console.log("showing user: ",userEmail);
    _data.read('users',userEmail,function(err,userData){
      if (!err){
        delete userData.hashedPassword;
        console.log(userData.firstName);
      }
    });
  } else {
    console.log("Missing or invalid parameter was given");
  }
};

// Exit
cli.responders.exit = function(){
  process.exit(0);
};

// Input processor
cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something, otherwise ignore it
  if(str){
    // Codify the unique strings that identify the different unique questions allowed be the asked
    var uniqueInputs = [
      'help',
      'exit',
      'menu items',
      'recent orders',
      'recent signups',
      'user details'
    ];

    // Go through the possible inputs, emit event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input,str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if(!matchFound){
      console.log("Sorry, try again");
    }

  }
};

// Init script
cli.init = function(){

  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function(str){

    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function(){
    process.exit(0);
  });

};

// Export the module
module.exports = cli;
