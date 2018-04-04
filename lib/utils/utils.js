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
  _okdk = okdk;
}

/**
 * Create byte array from string.
 *
 * @param {string} string - String to convert to byte array.
 * @return {byte[]} bytes - Converted byte array.
 */
Utils.prototype.stringToByteArray = function(string) {
  let utf8 = unescape(encodeURIComponent(string));

  let array = [];
  for (let i = 0; i < utf8.length; i++) {
      array.push(utf8.charCodeAt(i));
  }

  return array;
};

/**
 * Calculate grid id from latitude and longitude.
 *
 * @param {int} latitude - Latitude of coordinate.
 * @param {int} longitude - Longitude of coordinate.
 * @return {int} gridId - Id within the Earth's grid.
 */
Utils.prototype.getGridId = function(latitude, longitude) {
  return 0;
};


/**
 * Convert hex to string.
 *
 * @param {string} hex - Hex value to convert to string.
 * @return {string} string - string value.
 */
Utils.prototype.hexToString = function(hex) {
	let string = "";

	console.log("INSIDE")

	console.log(hex)

	for(let i = 2; i < hex.length; i+=2) {
		let n = parseInt(hex.slice(i, i+2), 16);
		string += String.fromCharCode(n);
	}

	return string;
}


/**
 * Convert string to hex value.
 *
 * @param {string} string - String to convert to hex.
 * @return {string} hexVal - Hex encoded value.
 */
Utils.prototype.stringToHex = function(string) {
	let hexVal = "0x";

	for(let c of string) {
		hexVal += c.charCodeAt(0).toString(16);
	}

	return hexVal;
}


