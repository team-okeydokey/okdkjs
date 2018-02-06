// accounts.js

'use strict';

var User = require('./user.js');

module.exports = function() {
    return new Accounts();
};

/**
 * Set up user accounts.
 * @constructor 
 */
function Accounts() {
    this._accounts = new Array();
    this.initAccounts();
}

/**
 * Restore or instantiate user instance.
 */
Accounts.prototype.initAccounts = function() {
	var newUser = loadAccount('okdk');
	this._accounts.push(newUser);
	var anotherUser = loadAccount('lock');
	this._accounts.push(anotherUser);
}

/**
 * Create a new user.
 * @return {User} A user object.
 */
var newAccount = function() {
	var newUser = User();
	var newWallet = wallet.generate();
	newUser.setAddress(wallet.getAddressString());
	newUser.setPrivateKey(wallet.getPrivateKeyString());
	return newUser;
}

/**
 * Load an existing user.
 *
 * @param {string} name - Name of user.
 * @return {User} A user object.
 */
var loadAccount = function(name) {
	var newUser = User();
	
	/* Test */
	if (name == 'okdk') {
		newUser.setAddress('0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3');
		newUser.setPrivateKey('3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0');
	} else if (name == 'lock') {
		newUser.setAddress('0x435C4c81bb9cf4326FfB05cb25A862d62151897D');
		newUser.setPrivateKey('fd4c79eee4e36d966b38a6617f60e3bdebec184e640d1d11348ba838c9129c48');
	}

	return newUser;
}
