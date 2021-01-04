/*
 * Request Handler for Cart
 *
 */

const _data = require('./data');
const token_holder = require('./token');
const helper = require('./helper');
const menu = require('./menu');
const https = require('https');

const order = {};

// Container for all the order methods
order._order = {};

// Menu
order.order = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    order._order[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Cart - post
// Required data: emailAddress, itemObject
// Optional data: none
order._order.post = function(data,callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  if(emailAddress){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var orderName = helper.hash128(emailAddress);
          var itemObject = {};
          itemObject.items = [];
          var menuItems = [];
          _data.read('menu','menu_items',function(err,menuData){
            if(!err){
              menuItems = menuData.items;
            }
          });

          _data.read('carts',orderName,function(err,cartData){
            if(!err){
                for (var i = 0; i < cartData.items.length; i++) {
                  if (cartData.items[i].count > 0 ){
                    itemObject.items.push ({
                        'name' : menuItems[cartData.items[i].itemid - 1].name,
                        'count' : cartData.items[i].count
                      });
                  }
                }
                // Store the order items
                _data.create('orders',orderName,itemObject,function(err){
                  if(!err){
                    callback(200,{'status':'created'});
                  } else {
                    callback(500,{'Error' : 'Order already exists update shopping cart instead'});
                  }
                });
            } else {
              // User already exists
              callback(400,{'Error' : 'Could not create the new order nothing in shopping cart'});
            }
        });
      } else {
        callback(403,{'Error':'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

// Cart - get
// Required data: emailAddress
// Optional data: None
order._order.get = function(data,callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;

  if(emailAddress){
    var orderName = helper.hash128(emailAddress);
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var menuCount = 0;
          // Counts the menu items
          _data.read('menu','menu_items',function(err,data){
            if(!err && data){
              menuCount = data.items.length;
            }
          });
          // Lookup the orders
          _data.read('orders',orderName,function(err,data){
            if(!err && data){
              for (var i = 0; i < data.items.length; i++) {
                // Only show if added to order
                if (data.items[i].count > 0){
                  console.log('Item in shopping order: ' + data.items[i].itemid + ' Count in shopping order: ' + data.items[i].count);
                }
              }
              callback(200,data);
            } else {
              callback(404,{'Error':'No order was created'});
            }
          });
        } else {
          callback(403,{'Error':'Missing required token in header, or token is invalid'});
        }
      });
  } else {
    callback(400, {'Error':'Missing required field'});
  }
};


// Order - put
// Required data : id, extend
// Optional data: none
order._order.put = function(data, callback){
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;
  var submit = typeof(data.payload.submit) == 'boolean' && data.payload.submit == true ? true : false;
  var apiKey = typeof(data.payload.apiKey) == 'string' && data.payload.apiKey == true ? true : false;

  console.log('submit: ' + submit);
  // Check if required request info given
  if (emailAddress){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      token_holder._token.verifyToken(token, emailAddress, function(tokenIsValid){
        if (tokenIsValid){
          var cartName = helper.hash128(emailAddress);
          var menuCount = 0;
          const data = JSON.stringify({
                  amount : 2000,
                  currency : 'eur',
                  description : 'Example charge',
                  source: 'tok_mastercard',
                  api_key: 'sk_test_51I5rz5LIu7OWc1YLkwLronOnHTMVxGo5xwHwbgkv2mftAhKr6H8ETCzyOJCrwSuAXdpsg6nOGXtNRktzGtY79wk40019Bxy6FL:'
          });
          const options = {
            hostname: 'api.stripe.com',
            port: 443,
            path: '/v1/charges',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': ' Bearer sk_test_51I5rz5LIu7OWc1YLkwLronOnHTMVxGo5xwHwbgkv2mftAhKr6H8ETCzyOJCrwSuAXdpsg6nOGXtNRktzGtY79wk40019Bxy6FL'
            }
          };
          const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
              process.stdout.write(d);
            });
          });

          req.on('error', error => {
            console.error(error);
          });
          req.write(data);
          req.end();

          const formData = JSON.stringify({
             from: 'Mailgun Sandbox <postmaster@sandbox2a526e8998d24d17ba93494a7d7e2adf.mailgun.org>',
          	 to: 'rj <denezt@yahoo.com>',
          	 subject: 'Hello rj',
          	 text: 'Congratulations rj, you just sent an email with Mailgun!  You are truly awesome!',
             api_key: 'api:b97aabb0ce934116a61e2f141af788fa-3d0809fb-7589f9f0'
           });

          const option2 = {
            hostname: 'api.mailgun.net/v3/sandbox2a526e8998d24d17ba93494a7d7e2adf.mailgun.org/messages',
            port: '5000',
            path: '/upload',
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           };

          const req2 = https.request(option2, res => {
               console.log(`statusCode: ${res.statusCode}`);
          });

          req2.on('error', error => {
            console.error(error);
          });

          req2.write(formData);
          req2.end();

          callback(200,{'status':'submitted'});
        } else {
          callback(403,{'Error':'Missing required token in header, or token is invalid'});
        }
      });
  } else {
    callback(400,{'Error' : 'Missing required field or parameters are incorrect.(user login information)'});
  }
};

// Cart - delete
// Required data: emailAddress
// Optional data: none
order._order.delete = function(data, callback){
  // Check that the id is invalid
  var emailAddress = typeof(data.payload.emailAddress) == 'string' ? data.payload.emailAddress : false;

  if(emailAddress){
    var orderName = helper.hash128(emailAddress);
    // Lookup the user
    _data.read('orders',orderName,function(err,data){
      if(!err && data){
        _data.delete('orders',orderName,function(err){
          if(!err){
            callback(200,{'status':'deleted'});
          } else {
            callback(500,{'Error' : 'Could not delete the specified order'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified order.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Export the module
module.exports = order;
