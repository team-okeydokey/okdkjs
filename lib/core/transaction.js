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
}


/**
 * Call contract requiring transaction with supplied abi.
 * 
 * @param {Object} user - User instance of caller.
 * @param string} address - Address of contract being called.
 * @param {Object} callData - Abi encoded function call.
* @param {int} chainId - Abi encoded function call.
 */
Transaction.prototype.callContract = async function(user, contractAddress, callData, chainId) {

   try {

    const result = await this.sendTransaction(user.getPublicKeyString(), contractAddress, 
                                              0, callData, user.getPrivateKeyString(), chainId);
    return result;

  } catch (error) {
    console.log(error);
    return constructFailureJSON(error.toString());
  }
}

Transaction.prototype.sendTransaction = async function(from, to, value, data, privateKey, chainId) {
  
  try {

    var hexValue = _okdk.web3.utils.toHex(value);

    const getNonce = _okdk.web3.eth.getTransactionCount(from);
    const getGasPrice = _okdk.web3.eth.getGasPrice()
    const getGasLimit = _okdk.web3.eth.estimateGas({
      from: from,
      to: to,
      value: hexValue,
      data: data,
      chainId: chainId
    });

    const [nonce, gasPrice, gasLimit] = await Promise.all([getNonce, getGasPrice, getGasLimit]);
    // var hexGasPrice = this.web3.utils.toHex(gasPrice);
    var hexGasPrice = _okdk.web3.utils.toHex(20000000000);
    // var hexGasLimit = this.web3.utils.toHex(gasLimit);
    var hexGasLimit = _okdk.web3.utils.toHex(4000000);

    const transactionResult = await this.sendTransactionWithValues(from, to, hexValue, data, nonce, 
                             hexGasPrice, hexGasLimit, privateKey, chainId);
    return transactionResult;

  } catch(error) {
    console.log(error);
    return constructFailureJSON(error.toString());
  }
}

Transaction.prototype.sendTransactionWithValues = async function(from, to, value, data, nonce, 
                                 gasPrice, gasLimit, privateKey, chainId) {
  try {
    
    let rawTx = {
      from: from,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      to: to,
      value: value,
      data: data
    }

    console.log('Creating and signing the following transaction:\n',
           'from:', from, '\nnonce:', nonce, '\ngasPrice:', parseInt(gasPrice, 16), 
           '\ngasLimit:', parseInt(gasLimit, 16), 
           '\nto:', to, '\nvalue:', value);

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    
    const transaction = new ethTx(rawTx);
    transaction.sign(privateKeyBuffer);
    

    const serializedTxn = '0x' + transaction.serialize().toString('hex');
    var transactionId = _okdk.web3.utils.sha3(serializedTxn);

    const receipt = await _okdk.web3.eth.sendSignedTransaction(serializedTxn);

    return constructSuccessJSON(receipt);

  } catch(error) {
    console.log(error);
    return constructFailureJSON(error.toString());
  }
}

var constructSuccessJSON = (receipt) => {
  console.log('Transaction success! Receipt received.');
  var data = { 'success': true, 
               'receipt': receipt };
  return data;
}

var constructFailureJSON = (message) => {
  var data = { 'success': false, 
               'message': message };
  return data;
}