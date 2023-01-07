/*
* Unit Tests
*/

// Dependencies
var lib = require('./../app/lib');
var assert = require('assert');
var logs = require('./../lib/logs');

// Container for the tests
var unit = {};

// Assert that the checkIfNumber function is returning a number
unit['lib.checkIfNumber should return a number'] = function(done){
	let val = lib.checkIfNumber(1);
	assert.equal(typeof(val),'number');
	done();
};

// Assert that the checkIfNumber function is returning a 1
unit['lib.checkIfNumber should return 1'] = function(done){
	let val = lib.checkIfNumber(1);
	assert.equal(val,1);
	done();
};

// Assert that the checkIfNumber function is returning a 2
unit['lib.checkIfNumber should return 2'] = function(done){
	let val = lib.checkIfNumber(1);
	assert.equal(val,2);
	done();
};

// Assert that the checkIfString function is returning a 2
unit['lib.checkIfWord should return string'] = function(done){
	let val = lib.checkIfString('1');
	assert.equal(typeof(val),'string');
	done();
};

unit['lib.checkIfPalindrome should return true'] = function(done){
	let val = lib.checkIfPalindrome('won','now');
	assert.ok(val);
	done();
};

unit['lib.checkIfPalindrome should return false'] = function(done){
	let val = lib.checkIfPalindrome('estate','status');
	assert.ok(val);
	done();
};

// Export all test to runner
module.exports = unit;
