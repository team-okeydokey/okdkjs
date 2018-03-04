// core.js

'use strict';

const Transaction = require('./transaction');

var _okdk;

module.exports = function(okdk) {
  return new Core(okdk);
};

/**
 * Set up Core library and relevant modules.
 * @constructor 
 *
 * @param {Object} okdk - OKDK module instance.
 */
function Core(okdk) {
  _okdk = okdk;

  /* Set up transaction module. */
  this._transaction = Transaction(okdk);

  var context = this;

  this.ready = new Promise((resolve, reject) =>  {
    context.syncAddresses().then(result => {
      console.log("Sync complete");    
      resolve(result);
    }).catch(error => {
      console.log("Sync failed");
      reject(error);
    });
  });
}

/**
 * Sync addresses deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAddresses = async function() {

  try {
    /* Load okdk-god abi */
    this._okdkGodAbi = require('../contracts/OkeyDokeyGod.json').abi;
    this._okdkGodAddress = '0x98f6621da7b5f3dddcd4bc74310e3f2410350f12';
    var okdkGodContract = new _okdk.web3.eth.Contract(this._okdkGodAbi, 
                              this._okdkGodAddress);
    /* Set up OkeyDokey. */
    const okdkAddress = await okdkGodContract.methods.getAddress().call();
    this._okdkAddress = okdkAddress;
    this._okdkAbi = require('../contracts/OkeyDokey.json').abi;
    this.okdkContract = new _okdk.web3.eth.Contract(this._okdkAbi, 
                            this._okdkAddress);

    /* Set up main contract addresses. */
    const getTokenAddress = this.okdkContract.methods.getAddress(0).call();
    const getHousesAddress = this.okdkContract.methods.getAddress(1).call();
    const getDevicesAddress = this.okdkContract.methods.getAddress(2).call();
    const getReservationsAddress = this.okdkContract.methods.getAddress(3).call();
    const getReviewsAddress = this.okdkContract.methods.getAddress(4).call();

    const [tokenAddress, housesAddress, devicesAddress, reservationsAddress, reviewsAddress] 
      = await Promise.all([getTokenAddress, getHousesAddress, getDevicesAddress,
                 getReservationsAddress, getReviewsAddress]);

    /* Construct contracts. */
    this._tokenAddress = tokenAddress;
    this._tokenAbi = require('../contracts/OkeyDokeyToken.json').abi;

    this._housesAddress = housesAddress;
    this._housesAbi = require('../contracts/Houses.json').abi;

    this._devicesAddress = devicesAddress;
    this._devicesAbi = require('../contracts/Devices.json').abi;

    this._reservationsAddress = reservationsAddress;
    this._reservationsAbi = require('../contracts/Reservations.json').abi;

    this._reviewsAddress = reviewsAddress;
    this._reviewsAbi = require('../contracts/Reviews.json').abi;

    console.log("Address sync complete.");

  } catch (error) {
    console.log("Address sync falied.");
    console.log(error);
  }
}


/**
 * Initialize Transaction contract. 
 *
 * @return {boolean} Sync succeeded.
 */
Core.prototype.initTransactionContract = function() {
  this._transaction = Transaction(_okdk);
  return true;
}

/**
 * Sync abis deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAbi = function() {
  // Stub for now.
  return true;
}

/**
 * Wrapper for Transaction's callContract method. 
 *
 * @param {Object} user - User instance of caller.
 * @param {string} contractAddress - Address of contract being called.
 * @param {Object} callData - Abi encoded function call.
 */
Core.prototype.callContract = function(user, contractAddress, callData) {
  return this._transaction.callContract(user, contractAddress, callData);
};

/**
 * Wrapper for Transaction's approve method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
// Core.prototype.approve = function(user, spender, value) {
//     return this._transaction.approve(user, spender, value);
// };

/**
 * Wrapper for Transaction's sendToken method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
// Core.prototype.sendToken = function(user, to, value) {
//     this._transaction.sendToken(user, to, value);
// };

/**
 * Wrapper for OKDKgod's updateAddress method. 
 *
 * @param {string} address - Address of okeydokey.
 * @return {boolean} Address update succeeded.
 */
Core.prototype.setOkeyDokey = function(address) {
  
  return true;
};