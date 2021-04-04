

/*
* Test Runner
*/

// Application logic for the test runner
var _lib = {};

_lib.checkIfNumber = function(){
	return 1;
}

_lib.checkIfPalindrome = function(word1, word2){
	var a = (typeof(word1) == 'string') ? word1.split('') : false;
	var b = (typeof(word2) == 'string') ? word2.split('') : false;
	if (a && b){
		console.log('\x1b[34mInitial:\x1b[0m ',a.join(''),b.join(''));
		console.log('\x1b[33mReverse:\x1b[0m ',a.reverse().join(''),b.join(''));
		console.log('\x1b[32mCurrent:\x1b[0m ',a.join(''),b.join(''));
		let isPalindrome = (a.join('') == b.join('')) ? true : false;
		return isPalindrome;
	}
	return false;
}

module.exports = _lib;

