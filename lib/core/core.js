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
Core.prototype.syncAddresses = function() {

    var context = this;

    /* Load okdk-god abi */
    this._okdkGodAbi = require('../contracts/OkeyDokeyGod.json').abi;
    this._okdkGodAddress = '0x98f6621da7b5f3dddcd4bc74310e3f2410350f12';
    var okdkGodContract = new _okdk.web3.eth.Contract(this._okdkGodAbi, 
                                                       this._okdkGodAddress);
    /* Fetch okdk address */
    return okdkGodContract.methods.getAddress().call().then(result => {
        console.log('Retreived okdk address: ' + result);
        context._okdkAddress = result;
        context._okdkAbi = require('../contracts/OkeyDokey.json').abi;
    }).then(() => {
        /* Construct okdk contract */
        context.okdkContract = new _okdk.web3.eth.Contract(context._okdkAbi, 
                                                            context._okdkAddress);
    }).then(() => {
        /* Fetch token address */
        return context.okdkContract.methods.getAddress(0).call().then(result => {
            console.log('Retreived token address: ' + result);
            context._tokenAddress = result;
            context._tokenAbi = require('../contracts/OkeyDokeyToken.json').abi;

            context.initTransactionContract();

        }).catch(error => {
            console.log("Token initialization falied.");
            console.log(error);
        });

    }).then(() => {
        /* Fetch houses address */
        return context.okdkContract.methods.getAddress(1).call().then(result => {
            console.log('Retreived houses address: ' + result);
            context._housesAddress = result;
            context._housesAbi = require('../contracts/Houses.json').abi;
        }).catch(error => {
            console.log("Houses initialization falied.");
            console.log(error);
        });

    }).then(() => {
        /* Fetch devices address */
        return context.okdkContract.methods.getAddress(2).call().then(result => {
            console.log('Retreived devices address: ' + result);
            context._devicesAddress = result;
            context._devicesAbi = require('../contracts/Devices.json').abi;
        }).catch(error => {
            console.log("Devices initialization falied.");
            console.log(error);
        });

    }).then(() => {
        /* Fetch reservations address */
        return context.okdkContract.methods.getAddress(3).call().then(result => {
            console.log('Retreived reservations address: ' + result);
            context._reservationsAddress = result;
            context._reservationsAbi = require('../contracts/Reservations.json').abi;
        }).catch(error => {
            console.log("Reservations initialization falied.");
            console.log(error);
        });

    }).then(() => {
        /* Fetch reviews address */
        return context.okdkContract.methods.getAddress(4).call().then(result => {
            console.log('Retreived reviews address: ' + result);
            context._reviewsAddress = result;
            context._reviewsAbi = require('../contracts/Reviews.json').abi;
        }).catch(error => {
            console.log("Reviews initialization falied.");
            console.log(error);
        });

    }).catch(error => {
        console.log("Address sync falied.");
        console.log(error);
    });
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