// transaction.js

'use strict';


const ethTx = require('ethereumjs-tx'); 

var _okdk;

module.exports = function(okdk) {
    return new Transaction(okdk);
};

/**
 * Set up Transaction module.
 * @constructor
 * 
 * @param {Object} okdk - OKDk module instance.
 */
function Transaction(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this._okdkTokenAbi = okdk.core._tokenAbi;
    this._okdkTokenAddress = okdk.core._tokenAddress;

    this._okdkTokenContract = new _okdk._web3.eth.Contract(this._okdkTokenAbi, 
                                                           this._okdkTokenAddress);
}

/**
 * Approve spending on contract's behalf.
 * 
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Transaction.prototype.approve = function(user, spender, value) {

    var callData = this._okdkTokenContract.methods.approve(
                                spender, value).encodeABI();

    var ccwv = this.callContractWithValues;
    var context = this;
    var tokenContractAddr = this._okdkTokenAddress;

    var nonce = _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
      ccwv(context, user, result, tokenContractAddr, 0, callData);
    }).catch(error => {
        errorNonce(error);
        console.log("Promise Rejected");
    });
}


/**
 * Send OKDK token.
 * 
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Transaction.prototype.sendToken = function(user, to, value) {

    var callData = this._okdkTokenContract.methods.transferFrom(
                                user.getAddressString(), to, value).encodeABI();

    var ccwv = this.callContractWithValues;
    var context = this;
    var tokenContractAddr = this._okdkTokenAddress;

    var nonce = _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
      ccwv(context, user, result, tokenContractAddr, 0, callData);
    }).catch(error => {
        errorNonce(error);
        console.log("Promise Rejected");
    });
}

/**
 * Call contract requiring transaction with supplied abi.
 * 
 * @param {Object} user - User instance of caller.
 * @param string} address - Address of contract being called.
 * @param {Object} abi - Abi encoded function call.
 */
Transaction.prototype.callContract = function(user, address, abi) {

    var ccwv = this.callContractWithValues;
    var context = this;

    var nonce = _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
      ccwv(context, user, result, address, 0, abi);
    }).catch(error => {
        errorNonce(error);
        console.log("Promise Rejected");
    });
}

/**
 * Helper function for creating and signing a transaction.
 * 
 * @param {int} nonce - Nonce of sender's account.
 * @param {string} to - Address of function being called.
 * @param {int} value - 'value' field of a raw transaction.
 * @param {data} data - 'data' field of a raw transaction.
 */
Transaction.prototype.callContractWithValues = function(context, user, nonce, to, value, data) {

    var __web3 = _okdk._web3;

    return __web3.eth.estimateGas({
        to: to,
        data: data
    }).then(estimate => {
        console.log("Sdsdsds");
        console.log(estimate);
        console.log("Sdsdsds");
        let rawTx = {
            from: user.getAddressString(),
            nonce: __web3.utils.toHex(nonce),
            gasPrice: __web3.utils.toHex(100000000000),
            gasLimit: estimate,
            to: to,
            value: __web3.utils.toHex(value),
            data: data
        }

        const privateKey = Buffer.from(user.getPrivateKeyString(), 'hex');

        const transaction = new ethTx(rawTx);
        transaction.sign(privateKey);

        const serializedTxn = '0x' + transaction.serialize().toString('hex');
        var transactionId = __web3.utils.sha3(serializedTxn);

        __web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
            printTransactionId(transactionId));

    }).catch(error => {
        console.log("Error while estimating gas.");
        console.log(error);
    });
}

/**
 * Indicate successful transaction and print transaction id.
 * 
 * @param {string} transactionId - Transaction Id.
 */
var printTransactionId = function(transactionId) {
    console.log('Transaction sent! Tx receipt: ' + transactionId);
}

/**
 * Indicate error in fetching nonce.
 *
 * @param {string} error - Error from promise.
 */
var errorNonce = function(error) {
    console.log("Error in retreiving nonce!");
}
