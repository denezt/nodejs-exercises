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


// Instantiate the cli module object
var cli = {};

// Input handlers
e.on('help',function(){
  cli.responders.help();
});
// View current menu items
e.on('menu items',function(){
  cli.responders.menu();
});

// View orders placed in the last 24 hours
e.on('recent orders',function(){
  console.log("=========================================");
  console.log(cli.responders.orders());
  console.log("=========================================");
});

// ToDo: Lookup the details of a specific order by order id
e.on('order details',function(str){
  cli.responders.order(str);
});

e.on('order',function(str){
  cli.responders.order(str);
});

// View all the users who have signed up in the last 24 hours
e.on('recent signups',function(){
  console.log("=========================================");
  console.log(cli.responders.signups());
  console.log("=========================================");
});

// Lookup the details of a specific user by email address
e.on('user details',function(str){
  cli.responders.user(str);
});

e.on('user',function(str){
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
  console.log("Find specific Order  - order, order details --id ORDER_ID");
  console.log("Find specific Users  - user, user details --email EMAIL_ADDRESS");
  console.log("Exit CLI             - exit");
};

// Current Menu items
cli.responders.menu = function(){

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
  var signUpOutput = "";
  const now = new Date();
  var dd = String(now.getDate()).padStart(2, '0');
  var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = now.getFullYear();
  const currentDate = dd + '-' + mm + '-' + yyyy;
  var content = fs.readFileSync('.data/records/users_list.json','utf-8');
  const contentObj = JSON.parse(content);
  var counter = 1;
  for (var i = 0; i < contentObj.recent_orders.length; i++) {
    if (contentObj.recent_orders[i].orderDate == currentDate){
      signUpOutput += '[' + counter + ']\n';
      signUpOutput += 'OrderID: ' + contentObj.recent_orders[i].orderId + '\n';
      signUpOutput += 'Items: ' + contentObj.recent_orders[i].orderItems + '\n';
    }
    counter++;
  }
  return signUpOutput;
};

cli.responders.order = function(str){
  var arr = typeof(str) == 'string' ? str.split('--') : false;
  var orderInfo = typeof(arr[1]) == 'string' && arr[1].trim().length > 0  ? arr[1].trim() : false;

  if (orderInfo){
    var givenOrderArg =  (typeof(orderInfo.split(' ')[0]) == 'string' && orderInfo.split(' ')[0] == 'id') ? true : false;
    if (givenOrderArg){
      var orderId = orderInfo.split(' ')[1];
      _data.read('orders',orderId,function(err,orderData){
        var foundId = (typeof(orderData) == 'object') ? true : false;
        if (foundId){
          const menuItem = [ orderData.menuItems.menuItem1, orderData.menuItems.menuItem2, orderData.menuItems.menuItem3,  orderData.menuItems.menuItem4, orderData.menuItems.menuItem5 ];
          if (!err){
            var cost = 0;
            for (var i = 0; i < menuItem.length; i++) {
              if (menuItem[i]){
                console.log('Order Item:\t' + menuitem.items[i + 1].name);
                cost += Number(menuitem.items[i + 1].price.replace('$',''));
              }
            }
            console.log('Order Cost:\t $' + parseFloat(cost).toFixed(2));
          }
        } else {
          console.log("Missing or unable to find information for id");
        }
      });
    } else {
      console.log("Missing or invalid parameter was given");
    }
  } else {
    console.log("Missing or invalid parameter was given");
  }


};

cli.responders.user = function(str){
  var arr = typeof(str) == 'string' ? str.split('--') : false;
  var userInfo = typeof(arr[1]) == 'string' && arr[1].trim().length > 0  ? arr[1].trim() : false;
  var givenEmailArg =  (typeof(userInfo.split(' ')[0]) == 'string' && userInfo.split(' ')[0] == 'email') ? true : false;

  if (userInfo && givenEmailArg){
    var userEmail = userInfo.split(' ')[1].replace('@','_').replace('.','_');
    _data.read('users',userEmail,function(err,userData){
      if (!err){
        delete userData.hashedPassword;
        console.log('First Name:\t' + userData.firstName);
        console.log('Last Name:\t' + userData.lastName);
        console.log('Email Address:\t' + userData.emailAddress);
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
      'order details',
      'order',
      'recent signups',
      'user',
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
    prompt: '> '
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
