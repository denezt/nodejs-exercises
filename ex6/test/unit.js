/*
* Unit Tests
*/

// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');
var exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem');

// Container for the tests
var unit = {};

// Assert that the getANumber function is returning a number
unit['helpers.getANumber should return a number'] = function(done){
	var val = helpers.getANumber();
	assert.equal(typeof(val),'number');
	done();
};

// Assert that the getANumber function is returning a 1
unit['helpers.getANumber should return 1'] = function(done){
	var val = helpers.getANumber();
	assert.equal(val,1);
	done();
};

// Assert that the getANumber function is returning a 2
unit['helpers.getANumber should return 2'] = function(done){
	var val = helpers.getANumber();
	assert.equal(val,2);
	done();
};

// Export all test to runner
module.exports = unit;
