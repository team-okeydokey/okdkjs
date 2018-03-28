// accounts.js

'use strict';

const wallet = require('ethereumjs-wallet');
const User = require('./user.js');

module.exports = function() {
    return new Accounts();
};

/**
 * Set up user accounts.
 * @ignore
 * @constructor
 */
function Accounts() {
    this._accounts = [];
    this.initAccounts();
}

/**
 * Restore or instantiate user instance.
 */
Accounts.prototype.initAccounts = function() {
  let newUser = loadAccount('okdk');
  this._accounts.push(newUser);
  let anotherUser = loadAccount('lock');
  this._accounts.push(anotherUser);
};

/**
 * Create a new user.
 * @return {User} A user object.
 */
const newAccount = function() {
  let newUser = User();
  let newWallet = wallet.generate();
  newUser.setAddress(newWallet.getAddressString());
  newUser.setPrivateKey(newWallet.getPrivateKeyString());
  return newUser;
};

/**
 * Load an existing user.
 *
 * @param {string} name - Name of user.
 * @return {User} A user object.
 */
const loadAccount = function(name) {
  let newUser = newAccount();

  /* Test */
  if (name == 'okdk') {
    newUser.setAddress('0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3');
    newUser.setPrivateKey(
      '3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0');
  } else if (name == 'lock') {
    newUser.setAddress('0x435C4c81bb9cf4326FfB05cb25A862d62151897D');
    newUser.setPrivateKey(
      'fd4c79eee4e36d966b38a6617f60e3bdebec184e640d1d11348ba838c9129c48');
  }

  return newUser;
};
