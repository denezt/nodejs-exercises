/*
 * Create and export configuration variables
 *
 */

// Container for all environments
var environments = {};
var serverUrl = 'localhost';

let setServerIp = function (arg)
{
	// Match only valid IP Addresses
	let inServerIp = arg.match(/--serverip=(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/gi);
	if (inServerIp){
		// console.log('Typeof: %s, Value: %s', typeof(inServerIp), inServerIp[0].split('='));
		serverUrl = inServerIp[0].split('=')[1];
	}
	return serverUrl;
}

process.argv.forEach(function(element){
	s = setServerIp(element);
	console.log(s);
});

const currentYear = new Date().getFullYear();


// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxOrders' : 5,
  'templateGlobals' : {
    'appName' : 'Big Joe\'s Online Pizza Delivery',
    'companyName' : 'Big Joe\'s Pizza Co.',
    'yearCreated' : currentYear,
    'baseUrl' : 'http://' + serverUrl +':3000/'
  }
};

// Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'maxOrders' : 10,
  'templateGlobals' : {
    'appName' : 'Big Joe\'s Online Pizza Delivery',
    'companyName' : 'Big Joe\'s Pizza Co.',
    'yearCreated' : currentYear,
    'baseUrl' : 'http://' + serverUrl +':5000/'
  }
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
