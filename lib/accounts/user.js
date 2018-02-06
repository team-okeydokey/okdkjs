// user.js

const wallet = require('ethereumjs-wallet');

module.exports = function() {
    return new User();
};

/**
 * Instantiate a User object.
 * @constructor 
 */
function User() {
    this.name = ""
    this._address = "";
    this._privateKey = "";
}

/**
 * Setter for public address.
 * 
 * @param {string} address - Public address of user.
 */
User.prototype.setAddress = function(address) {
	this._address = address;
}

/**
 * Getter for public address.
 * 
 * @return {string} Public address of user in string format.
 */
User.prototype.getAddressString = function() {
	 return this._address;
}

/**
 * Setter for private key.
 * 
 * @param {string} address - Private key of user.
 */
User.prototype.setPrivateKey = function(privateKey) {
	this._privateKey = privateKey;
}

/**
 * Getter for private key.
 * 
 * @return {string} Private key of user in string format.
 */
User.prototype.getPrivateKeyString = function() {
	return this._privateKey;
}