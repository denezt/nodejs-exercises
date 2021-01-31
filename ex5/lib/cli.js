/*
 * CLI-related tasks
 *
 */

// Dependencies
const readline = require('readline');
const util = require('util');
const fs = require('fs');
const _data = require('./data');
const helpers = require('./helpers');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events{};
const e = new _events();

// Instantiate the cli module object
var cli = {};

// Input handlers
e.on('help',function(str){
  cli.responders.help();
});

e.on('menu items',function(str){
  cli.responders.menu();
});

e.on('view menu items',function(str){
  cli.responders.menu();
});

e.on('view recent signups',function(str){
  console.log(cli.responders.signups());
});

e.on('view recent orders',function(str){
  cli.responders.orders();
});

e.on('exit',function(str){
  cli.responders.exit();
});

// Responders object
cli.responders = {};

// Help
cli.responders.help = function(){
  console.log("You asked for help");
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
  var signups = "";
  const now = new Date();
  var dd = String(now.getDate()). padStart(2, '0');
  var mm = String(now.getMonth() + 1). padStart(2, '0'); //January is 0!
  var yyyy = now.getFullYear();
  const signUpDate = dd + '-' + mm + '-' + yyyy;
  fs.readFile('.data/records/users_list.json', 'utf8', function(err, contents) {
    signups = contents;
    for (var i = 0; i < contents.recent_signup.size(); i++) {
      console.log(contents.recent_signup[i].firstName);
      console.log(contents.recent_signup[i].lastName);
    }
    // console.log(contents);
  });
  return signups;
};

cli.responders.orders = function(){
  console.log("showing orders");
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
      'view menu items',
      'view recent orders',
      'view recent signups'
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
