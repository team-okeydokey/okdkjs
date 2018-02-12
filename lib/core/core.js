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

    var context = this;

    this.ready = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (context.syncAddresses()) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });

}

/**
 * Sync addresses deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAddresses = function() {

    var context = this;

    /* Load okdk-god abi */
    this._okdkGodAbi = require('../contracts/OkeyDokeyGod.json');
    this._okdkGodAddress = '0x83A2A9bAB6DC542279b7bD4874ea34F24723A704';
    var okdkGodContract = new _okdk._web3.eth.Contract(this._okdkGodAbi, 
                                                       this._okdkGodAddress);
    /* Fetch okdk address */
    okdkGodContract.methods.getAddress().call().then(function(result) {
        console.log('Retreived okdk address: ' + result);
        context._okdkAddress = result;
        context._okdkAbi = require('../contracts/OkeyDokey.json');
    }).then(function() {
        /* Construct okdk contract */
        context.okdkContract = new _okdk._web3.eth.Contract(context._okdkAbi, 
                                                                context._okdkAddress);
    }).then(function() {
        /* Fetch token address */
        // context.okdkContract.methods.getAddress(0).call().then(function(result) {
        //     console.log('Retreived token address: ' + result);
        //     context._tokenAddress = result;
        //     context._tokenAbi = require('../contracts/okdk-token.json');

        //     context.initTransactionContract();
        // });
    }).then(function() {
        /* Fetch houses address */
        context.okdkContract.methods.getAddress(1).call().then(function(result) {
            console.log('Retreived houses address: ' + result);
            context._housesAddress = result;
            context._housesAbi = require('../contracts/Houses.json');
        });
    }).then(function() {
        /* Fetch devices address */
        context.okdkContract.methods.getAddress(2).call().then(function(result) {
            console.log('Retreived devices address: ' + result);
            context._devicesAddress = result;
            context._devicesAbi = require('../contracts/Devices.json');
        });
    }).then(function() {
        /* Fetch reservations address */
        context.okdkContract.methods.getAddress(3).call().then(function(result) {
            console.log('Retreived reservations address: ' + result);
            context._reservationsAddress = result;
            context._reservationsAbi = require('../contracts/Reservations.json');
        });
    }).then(function() {
        /* Fetch reviews address */
        context.okdkContract.methods.getAddress(4).call().then(function(result) {
            console.log('Retreived reviews address: ' + result);
            context._reviewsAddress = result;
            context._reviewsAbi = require('../contracts/Reviews.json');
        });
    })
    
    return true;
}


/**
 * Initialize Transaction contract. 
 *
 * @return {boolean} Sync succeeded.
 */
Core.prototype.initTransactionContract = function() {
    this._transaction = Transaction(_okdk);
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
 * @param {Object} abi - Abi encoded function call.
 * @param {string} address - Address of contract being called.
 */
Core.prototype.callContract = function(user, abi, address) {
    this._transaction.callContract(user, abi, addres);
};

/**
 * Wrapper for Transaction's approve method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Core.prototype.approve = function(user, spender, value) {
    this._transaction.approve(user, spender, value);
};

/**
 * Wrapper for Transaction's sendToken method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Core.prototype.sendToken = function(user, to, value) {
    this._transaction.sendToken(user, to, value);
};

/**
 * Wrapper for OKDKgod's updateAddress method. 
 *
 * @param {string} address - Address of okeydokey.
 * @return {boolean} Address update succeeded.
 */
Core.prototype.setOkeyDokey = function(address) {
    
    return true;
};