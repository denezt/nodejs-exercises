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
class _events extends events { };
const e = new _events();

const item = {
  "items": [
    {
      "id": "1",
      "name": "name of item",
      "description": "description of item"
    }
  ],
  "count": 1
};

// Instantiate the cli module object
var cli = {};

// Input handlers
e.on('help', function () {
  cli.responders.help();
});

// View current menu items
e.on('view items', function () {
  cli.responders.menu();
});

// View all the users who have signed up in the last 24 hours
e.on('recent signups', function () {
  console.log("=========================================");
  console.log(cli.responders.signups());
  console.log("=========================================");
});

// Lookup the details of a specific user by email address
e.on('user details', function (str) {
  cli.responders.user(str);
});

e.on('exit', function () {
  cli.responders.exit();
});

// Responders object
cli.responders = {};

// Help
cli.responders.help = function () {
  console.log("Show Help Menu       - help");
  console.log("Show Items           - menu items");
  console.log("Show Recent SignUps  - recent signups");
  console.log("Find specific Users  - user details --email EMAIL_ADDRESS");
  console.log("Exit CLI             - exit");
};

// Current Menu items
cli.responders.menu = function () {
  console.log(item.items);
};

cli.responders.signups = function () {
  var signUpOutput = "";
  const now = new Date();
  var dd = String(now.getDate()).padStart(2, '0');
  var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = now.getFullYear();
  const currentDate = dd + '-' + mm + '-' + yyyy;
  var content = fs.readFileSync('.data/records/users_list.json', 'utf-8');
  const contentObj = JSON.parse(content);
  var counter = 1;
  for (var i = 0; i < contentObj.recent_signup.length; i++) {
    if (contentObj.recent_signup[i].signupDate == currentDate) {
      signUpOutput += '[' + counter + '] ' + contentObj.recent_signup[i].firstName + ' ' + contentObj.recent_signup[i].lastName + ' ' + contentObj.recent_signup[i].emailAddress + '\n';
    }
    counter++;
  }
  return signUpOutput;
};

cli.responders.user = function (str) {
  var arr = typeof(str) == 'string' ? str.split('--') : false;
  var userInfo = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  try {
    if (userInfo) {
      var givenEmailArg = (typeof(userInfo.split(' ')[0]) == 'string' && userInfo.split(' ')[0] == 'email') ? true : false;
      var isEmailSet =  (typeof(userInfo.split(' ')[1]) == 'string') ? true : false;
      if (userInfo && isEmailSet && givenEmailArg) {
        var userEmail = userInfo.split(' ')[1].replace('@', '_').replace('.', '_');
        _data.read('users', userEmail, function (err, userData) {
          if (!err) {
            delete userData.hashedPassword;
            console.log('First Name:\t' + userData.firstName);
            console.log('Last Name:\t' + userData.lastName);
            console.log('Email Address:\t' + userData.emailAddress);
          }
        });
      } else {
        console.error("\033[31mMissing or invalid parameter was given!\033[0m");
        cli.responders.help();
      }
    } else {
      console.error("\033[31mMissing parameters!\033[0m");
      cli.responders.help();
    }  
  } catch (error) {
    console.error("\033[31merror: " + error.message + "\033[0m");
  }
};

// Exit
cli.responders.exit = function () {
  process.exit(0);
};

// Input processor
cli.processInput = function (str) {
  str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something, otherwise ignore it
  if (str) {
    // Codify the unique strings that identify the different unique questions allowed be the asked
    var uniqueInputs = [
      'help',
      'exit',
      'view items',
      'recent signups',
      'user details'
    ];

    // Go through the possible inputs, emit event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log("Sorry, try again");
    }
  }
};

// Init script
cli.init = function () {

  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function (str) {
    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function () {
    process.exit(0);
  });

};

// Export the module
module.exports = cli;
