/*
* comp_test Tests
*/

// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');
var exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem');

// Container for the tests
var comp_test = {};

// Logs.list should callback an array and a false error
comp_test['logs.list'] = function(done){
	logs.list(true,function(err,logFileNames){
		assert.equal(err,false);
		assert.ok(logFileNames instanceof Array);
		assert.ok(logFileNames.length > 1);
		done();
	});

};

// Logs.trunction should not throw if the logId doesn't exist
comp_test['logs.truncate'] = function(done){
	assert.doesNotThrow(function(){
		log.truncate('I do not exist',function(err){
			assert.ok(err);
			done();
		});
	},TypeError);
};

// Logs.trunction should not throw (but is does)
comp_test['exampleDebuggingProblem.init should not throw when called'] = function(done){
        assert.doesNotThrow(function(){
 		exampleDebuggingProblem.init();
		done();
	},TypeError);
};

// Export all test to runner
module.exports = comp_test;
