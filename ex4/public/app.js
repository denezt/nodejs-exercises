/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {};

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  console.log(payloadString);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        try {
          document.querySelector("#"+formId+" .formError").style.display = 'none';
        } catch (e) {
          console.log(e);
        }

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }


        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

/**
* Form response processor
* Purpose: This is what will execute after form was submitted
*/
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the emailAddress and password, and use it to log the user in
    var newPayload = {
      'emailAddress' : requestPayload.emailAddress,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/order/create';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/order/create';
  }

  // If forms saved successfully and they have success messages, show them
  // var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2','checksEdit1'];
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just created a new check successfully, redirect back to the dashboard
  if(formId == 'orderCreate'){
    console.log('menuCreate was a success');
    window.location.reload();
    // window.location = '/order/confirm';
  }

  if(formId == 'orderConfirm'){
    console.log('Order Confirm was a success');
    window.location = '/menu/view';
    alert('Confirmation was sent!');
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
  console.log(target);

};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  for (var i = 0; i < bodyClasses.length; i++) {
    console.log('bodyClasses: ' + bodyClasses[i]);
  }

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }
  // Logic for account settings page
  if(primaryClass == 'orderCreate'){
    app.loadOrderCreatePage();
  }
  // Logic for account settings page
  if(primaryClass == 'orderConfirm'){
    app.loadOrderConfirmPage();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){

  console.log("app.loadAccountEditPage: " + app.config.sessionToken.emailAddress);
  // Get the emailAddress number from the current token, or log the user out if none is there
  var emailAddress = typeof(app.config.sessionToken.emailAddress) == 'string' ? app.config.sessionToken.emailAddress : false;
  if(emailAddress){
    // Fetch the user data
    var queryStringObject = {
      'emailAddress' : emailAddress
    };
    app.client.request(undefined,'/api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      console.log('loadAccountEditPage: ' + statusCode);

      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .displayEmailAddressInput").value = responsePayload.emailAddress;

        // Put the hidden emailAddress field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailAddressInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
            hiddenEmailInputs[i].value = responsePayload.emailAddress;
        }

      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        console.log('Logging User out');
        app.logUserOut();
      }
    });
  } else {
    console.log('Logging User out');
    app.logUserOut();
  }
};

app.loadOrderCreatePage = function(){
  console.log("Loading, loadOrderCreatePage: " + app.config.sessionToken.emailAddress);
  // Get the emailAddress number from the current token, or log the user out if none is there
  var emailAddress = typeof(app.config.sessionToken.emailAddress) == 'string' ? app.config.sessionToken.emailAddress : false;
    // Fetch the user data
    if(emailAddress){
      // Fetch the user data
      var queryStringObject = {
        'emailAddress' : emailAddress
      };
      app.client.request(undefined,'/api/cart','GET',queryStringObject,undefined,function(statusCode,responsePayload){
        if(statusCode == 200){
          var itemNameArray = [ "menuItem1", "menuItem2", "menuItem3", "menuItem4", "menuItem5" ];
          for (var i = 0; i < itemNameArray.length; i++ ){
            document.querySelector("#orderCreate ."+ itemNameArray[i]).checked = responsePayload.menuItems[itemNameArray[i]];
          }
        } else {
          console.log("Status Code: " + statusCode);
        }

      });
    }
};

// Load the account edit page specifically
app.loadOrderConfirmPage = function(){

  console.log("app.loadOrderConfirmPage: " + app.config.sessionToken.emailAddress);
  // Get the emailAddress number from the current token, or log the user out if none is there
    const emailAddress = typeof(app.config.sessionToken.emailAddress) == 'string' ? app.config.sessionToken.emailAddress : false;
    // Fetch the user data
    if(emailAddress){
      // Fetch the user data
      const queryStringObject = {
        'emailAddress' : emailAddress
      };
      var firstName = "";
      var lastName = "";
      app.client.request(undefined,'/api/cart','GET',queryStringObject,undefined,function(statusCode,responsePayload){
        console.log('loadOrderConfirmPage [statusCode]: ' + statusCode);
        let menuItems = "";
        const menuItemArray = {"items": [{"id":"1","price": "$11.25", "name": "Italian Sausage Pizza","description" :"Italian Sausage and Cheese"},{"id":"2","price": "$10.00","name": "Pepperoni Pizza","description": "Pepperoni and Cheese"},{"id":"3","price": "$5.60","name": "Happy Sparkling Juice","description": "Natural water and juice."},{"id":"4","price": "$2.18","name": "White Chocolate Chip Cookies","description": "Fat Free and Low Carb Dessert"},{"id":"5","price": "$4.50","name": "New World Lemonade","description": "Lemonade with organic sugar"}]};

        if(statusCode == 200){
          // Put the data into the forms as values where needed
          console.log('app.loadOrderConfirmPage [responsePayload]: ' +  Object.keys(responsePayload));

          const menuNameArray = [ "menuItem1", "menuItem2", "menuItem3", "menuItem4", "menuItem5" ];
          var totalCost = 0.0;

          for (var i = 0; i < menuNameArray.length; i++) {
            if (responsePayload.menuItems[menuNameArray[i]]){
              console.log('Customer bought: ' + menuItemArray.items[i].name + ' =>' + menuNameArray[i]);
              menuItems += '[+] ' + menuItemArray.items[i].name + '\n';
              totalCost += Number(menuItemArray.items[i].price);
            }
          }
          // document.querySelector("#orderConfirm .firstName").value = responsePayload.firstName;
          // document.querySelector("#orderConfirm .lastName").value = responsePayload.lastName;
          document.querySelector("#orderConfirm .orderInformation").value = menuItems;
          document.querySelector("#orderConfirm .totalCost").value = totalCost;
        } else {
          // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
          console.log('Logging User out');
          // app.logUserOut();
        }
      });
    } else {
      console.log("app.loadOrderConfirmPage: Email Address Information was not found");
    }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
