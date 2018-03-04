// token.js

'use strict';

var _okdk;

module.exports = function(okdk) {
    return new Token(okdk);
};

/**
 * Set up Token module.
 * @constructor
 * 
 * @param {Object} okdk - OKDk module instance.
 */
function Token(okdk) {
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
Token.prototype.approve = function(user, spender, value) {

    var callData = this._okdkTokenContract.methods.approve(
                                spender, value).encodeABI();

    var ccwv = this.callContractWithValues;
    var tokenContractAddr = this._okdkTokenAddress;

    return _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
        return ccwv(user, result, tokenContractAddr, 0, callData);
    }).catch(error => {
        errorNonce(error);
    });
}


/**
 * Send OKDK token.
 * 
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Token.prototype.sendToken = function(user, to, value) {

    var callData = this._okdkTokenContract.methods.transferFrom(
                                user.getAddressString(), to, value).encodeABI();

    var ccwv = this.callContractWithValues;
    var tokenContractAddr = this._okdkTokenAddress;

    return _okdk._web3.eth.getTransactionCount(user.getAddressString())
    .then(result => {
        return ccwv(user, result, tokenContractAddr, 0, callData);
    }).catch(error => {
        errorNonce(error);
    });
}