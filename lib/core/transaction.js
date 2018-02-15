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

    return _okdk._web3.eth.getTransactionCount(user.getAddressString())
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

    return _okdk._web3.eth.getTransactionCount(user.getAddressString())
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

    return _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
      return ccwv(context, user, result, address, 0, abi);
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

    // Convert values.
    var fromAddress = user.getAddressString();
    var hexValue = __web3.utils.toHex(value);

    // Calculate gas price.
    const gasPrice = __web3.eth.getGasPrice();
    const gasEstimate = __web3.eth.estimateGas({
        from: fromAddress,
        value: hexValue,
        to: to,
        data: data
    });

    // Send transaction once gas calculation is complete.
    return new Promise((resolve, reject) =>  {

        Promise.all([
            gasPrice,
            gasEstimate
        ]).then(values => {
            console.log(values[0], values[1]);
            let rawTx = {
                from: fromAddress,
                nonce: __web3.utils.toHex(nonce),
                gasPrice: values[0],
                gasLimit: values[1],
                to: to,
                value: hexValue,
                data: data
            }

            const privateKey = Buffer.from(user.getPrivateKeyString(), 'hex');

            const transaction = new ethTx(rawTx);
            transaction.sign(privateKey);

            const serializedTxn = '0x' + transaction.serialize().toString('hex');
            var transactionId = __web3.utils.sha3(serializedTxn);

            __web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
                printTransactionId(transactionId));
            resolve();

        }).catch(error => {
            console.log("Error while calculating gas.");
            console.log(error);
            reject();
        });
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
