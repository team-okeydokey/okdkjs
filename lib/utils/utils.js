// utils.js

var _okdk;

module.exports = function(okdk) {
    return new Utils(okdk);
};

/**
 * Initialize utility module.
 * @constructor
 * 
 * @param {Object} okdk - OkeyDokey module instance.
 */
function Utils(okdk) {
	var _okdk = okdk;
}

/**
 * Create byte array from string.
 * 
 * @param {string} string - String to convert to byte array.
 * @param {byte[]} bytes - Converted byte array.
 */
Utils.prototype.stringToByteArray = function(string) {
	var utf8 = unescape(encodeURIComponent(string));

	var array = [];
	for (var i = 0; i < utf8.length; i++) {
	    array.push(utf8.charCodeAt(i));
	}

	return array;
}