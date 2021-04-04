

/*
* Test Runner
*/

// Application logic for the test runner
var _app = {};

// Container for the tests
_app.tests = {};

// Insert the unit tests
_app.tests.unit = require('./../test/unit');

// Count all of the tests
_app.countTests = function(){
	var counter = 0;
	for (var key in _app.tests){
		if (_app.tests.hasOwnProperty(key)){
			var subTests = _app.tests[key];
			for (var testName in subTests){
				if (subTests.hasOwnProperty(testName)){
					counter++;
				}
			}
		}
	}
	return counter;
};

// Run all the tests, collection the errors and successes
_app.runTests = function(){
	var errors = [];
	var successes = 0;
	var limit = _app.countTests();
	var counter = 0;
	for (var key in _app.tests){
		if (_app.tests.hasOwnProperty(key)){
			var subTests = _app.tests[key];
			for (var testName in subTests){
				if (subTests.hasOwnProperty(testName)){
					(function(){
						var tmpTestName = testName;
						var testValue = subTests[testName];
						// Calling the test
						try {
							testValue(function(){
								console.log('\x1b[32m%s\x1b[0m',tmpTestName);
								counter++;
								successes++;
								if (counter == limit){
									_app.produceTestReport(limit,successes,errors);
								}
							});
						} catch(e){
							// If the error is thrown, then it has failed.
							// We should then catch the error and log it.
							errors.push({
								'name':testName,
								'error':e
							});
							console.log('\x1b[31m%s\x1b[0m',tmpTestName);
							counter++;
							if (counter == limit){
								_app.produceTestReport(limit,successes,errors);
							}
						}
					})();
				}
			}
		}
	}
};

// Produce a test outcome report
_app.produceTestReport = function(limit,successes,errors){
	console.log("");
	console.log("----------BEGIN TEST REPORT----------");
	console.log("");
	console.log("Total Tests: ",limit);
	console.log("Pass: ", successes);
	console.log("Fail: ", errors.length);
	console.log("");
	console.log("");

	// If errors exist, then print them in detail
	if (errors.length > 0){
		console.log("----------BEGIN ERROR DETAILS----------");
		console.log("");
		errors.forEach(function(testError){
			console.log('\x1b[31m%s\x1b[0m',testError.name);
			console.log(testError.error);
			console.log("");
		});
		console.log("");
		console.log("----------END ERROR DETAILS----------");
	}
	console.log("");
	console.log("----------END TEST REPORT----------");

};

// Run the tests
_app.runTests();
