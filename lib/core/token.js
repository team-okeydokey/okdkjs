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
    this.address = okdk.core._tokenAddress;
    this.abi = okdk.core._tokenAbi;
    this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}

/**
 * Approve spending on contract's behalf.
 *
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Token.prototype.approve = async function(user, spender, value) {
    try {

    // Construct abi.
    let callData =
      this.contract.methods.approve(spender, value).encodeABI();

    const result =
      await _okdk.core.callContract(user, this.address, callData);

    return result;

  } catch (error) {
    console.log(error);
    return null;
  }
};


/**
 * Send OKDK token.
 *
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Token.prototype.sendToken = async function(user, to, value) {
    let callData = this.contract.methods.transferFrom(
                                user.getAddressString(), to, value).encodeABI();

    let ccwv = this.callContractWithValues;
    let tokenContractAddr = this.address;

    return _okdk.web3.eth.getTransactionCount(user.getAddressString())
    .then((result) => {
        return ccwv(user, result, tokenContractAddr, 0, callData);
    }).catch((error) => {
        errorNonce(error);
    });
};

/**
 * Wrapper for approveAndCall method of OKDK token.
 *
 * @param {Object} user - User instance of caller.
 * @param {string} spender - Address to spend on user's behalf.
 * @param {int} value - Value to set as allowance.
 * @param {string} data - Extra data to pass to spender.
 */
Token.prototype.approveAndCall = async function(user, spender, value, data) {
  try {

    let encodedData = _okdk.web3.utils.asciiToHex(data);

    // Construct abi.
    let callData = 
        this.contract.methods.approveAndCall(spender, value, encodedData).encodeABI();

    const result =
      await _okdk.core.callContract(user, this.address, callData);

    return result;

  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Query OKDK token balance of a user.
 *
 * @param {Object} user - User instance of account to query.
 */
Token.prototype.getBalance = async function(user) {

    const address = user.getAddressString();
    const balance = await this.contract.methods.balanceOf(address).call();

    return balance;
};

/**
 * Query OKDK token balance of address string.
 *
 * @param {string} address - Address of account to query.
 */
Token.prototype.getBalanceOfAddress = async function(address) {

    const balance = await this.contract.methods.balanceOf(address).call();

    return balance;
};

/**
 * Query OKDK token allowance of a user.
 *
 * @param {Object} user - User instance of account to query.
 * @param {string} address - Address of spender.
 */
Token.prototype.getAllowance = async function(user, address) {

    const userAddress = user.getAddressString();
    const balance = await this.contract.methods.allowance(userAddress, address).call();

    return balance;
};

