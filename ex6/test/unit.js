/*
* Unit Tests
*/

// Dependencies
var lib = require('./../app/lib');
var assert = require('assert');

// Container for the tests
var unit = {};

// Assert that the getANumber function is returning a number
unit['lib.checkIfNumber should return a number'] = function(done){
	var val = lib.checkIfNumber();
	assert.equal(typeof(val),'number');
	done();
};

// Assert that the getANumber function is returning a 1
unit['lib.checkIfNumber should return 1'] = function(done){
	var val = lib.checkIfNumber();
	assert.equal(val,1);
	done();
};

// Assert that the getANumber function is returning a 2
unit['lib.checkIfNumber should return 2'] = function(done){
	var val = lib.checkIfNumber();
	assert.equal(val,2);
	done();
};

unit['lib.checkIfPalindrome should return true'] = function(done){
	var val = lib.checkIfPalindrome('won','now');
	assert.equal(val,true);
	done();
};

unit['lib.checkIfPalindrome should return false'] = function(done){
	var val = lib.checkIfPalindrome('estate','status');
	assert.equal(val,true);
	done();
};

// Export all test to runner
module.exports = unit;
