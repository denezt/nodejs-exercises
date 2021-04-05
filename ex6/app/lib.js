/*
* Test Runner
*/

// Application logic for the test runner
var _lib = {};

_lib.checkIfNumber = function(){
	return 1;
}

_lib.checkIfString = function(word){
	return word;
}

_lib.checkIfPalindrome = function(word1, word2){
	var a = (typeof(word1) == 'string') ? word1.split('') : false;
	var b = (typeof(word2) == 'string') ? word2.split('') : false;
	if (a && b){
		console.log('\x1b[34mInitial [a,b]:\x1b[0m\t %s %s',a.join(''),b.join(''));
		console.log('\x1b[33mReverse [a]:\x1b[0m\t %s',a.reverse().join(''));
		console.log('\x1b[32mCurrent [a,b]:\x1b[0m\t %s %s',a.join(''),b.join(''));
		let isPalindrome = (a.join('') == b.join('')) ? true : false;
		return isPalindrome;
	}
	return false;
}

module.exports = _lib;
