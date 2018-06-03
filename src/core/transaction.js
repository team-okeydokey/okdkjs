// transaction.js

'use strict';

const ethTx = require('ethereumjs-tx');

var okdk;

export default class Transaction {

  /**
   * Set up Transaction module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;
  }

  /**
   * Deploy contract.
   *
   * @param {Object} _user - User instance of caller.
   * @param {string} _password - Password for keystore.
   * @param {Object} _abi - Abi encoded function call.
   * @param {Object} _bytecode - Bytecode of abi.
   * @param {Object} _constructorParams - Constructor parameters in an array.
   * @param {int} _value - Wei to send to deployed contract.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async deployContract(
    _user, _password, _abi, _bytecode, 
    _constructorParams, _value, _options = {}) {
    
    try {
      
      var contract = new okdk.web3.eth.Contract(_abi);

      var deployInfo = contract.deploy({
        data: _bytecode,
        arguments: _constructorParams
      });

      const deployData = deployInfo.encodeABI();

      const result = await this.sendTransaction(
        _user, null, _value, deployData, _password, _options);

      return result;

    } catch (error) {
      throw error;
    }
  }

  /**
   * Call contract requiring transaction with supplied abi.
   * @ignore
   *
   * @param {Object} _user - User instance of caller.
   * @param {string} _password - Password to keyfile of user.
   * @param {string} _address - Address of contract being called.
   * @param {Object} _callData - Abi encoded function call.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async callContract(_user, _password, _address, _callData, _options = {}) {
    try {
     
      const result = await this.sendTransaction(
        _user, _address, 0, _callData, _password, _options);
      return result;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Send transaction to network.
   * @ignore
   *
   * @param {Object} _from - User instance of caller.
   * @param {string} _to - Address receiving transaction. null if contract deployment.
   * @param {int} _value - Value of transaction.
   * @param {Object} _data - Data(function call/contract info) to include in transaction.
   * @param {string} _password - Password to keystore file of caller.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async sendTransaction(_from, _to, _value, _data, _password, _options = {}) {
    try {
      
      /* Fetch private key from keystore. */
      const privateKey = await _from.getPrivateKey(_password);

      /* Return error if private key is undefined. */
      if (privateKey === 'undefined') {
        throw 'Private key is undefined.';
      }

      var nonce = 0;
      var gasPrice = 0;
      var gasLimit = 0;

      /* Generate promises to fetch transaction information from the blockchain. */
      var promises = [];

      /* Check if nonce has a default value. */
      if (_options.nonce) { 
        nonce = _options.nonce; 
      } else { 
        promises.push(okdk.web3.eth.getTransactionCount(_from.address)); 
      }

      /* Check if gasPrice has a default value. */
      if (_options.gasPrice) { 
        gasPrice = _options.gasPrice; 
      } else { 
        promises.push(okdk.web3.eth.getGasPrice()); 
      }

      /* Check if gasLimit has a default value. */
      if (_options.gasLimit) { 
        gasLimit = _options.gasLimit; 
      } else { 
        promises.push(okdk.web3.eth.estimateGas({
          from: _from.address,
          to: _to,
          value: hexValue,
          data: _data,
          chainId: okdk.chainId
        })); 
      }

      /* If there is a value to resolve, resolve it. */
      if (promises.length > 0) {
        const [resolvedNonce, resolvedGasPrice, resolvedGasLimit] 
          = await Promise.all(promises);

        /* Set resolved values. */
        if (resolvedNonce) { nonce = resolvedNonce; }
        if (resolvedGasPrice) { gasPrice = resolvedGasPrice; }
        if (resolvedGasLimit) { gasLimit = resolvedGasLimit; }
      }

      const hexValue = okdk.web3.utils.toHex(_value);
      const hexNonce = okdk.web3.utils.toHex(nonce);
      const hexGasPrice = okdk.web3.utils.toHex(gasPrice);
      const hexGasLimit = okdk.web3.utils.toHex(gasLimit);
      // const hexGasLimit = okdk.web3.utils.toHex(4300000);
      
      const transactionResult = await this.sendTransactionWithValues(
                               _from, _to, hexValue, _data, hexNonce,
                               hexGasPrice, hexGasLimit, privateKey);
      return transactionResult;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create, sign, and send transaction to network.
   * @ignore
   *
   * @param {Object} _from - User instance of caller.
   * @param {string} _to - Address receiving transaction. null if contract deployment.
   * @param {int} _value - Value of transaction.
   * @param {Object} _data - Data(function call/contract info) to include in transaction.
   * @param {int} _nonce - Number of ending transactions by caller in network.
   * @param {int} _gasPrice - Price per gas used.
   * @param {int} _gasLimit - Maximum gas to use in transaction.
   * @param {string} _privateKey - Private key of caller.
   */
  async sendTransactionWithValues(_from, _to, _value, _data, _nonce,
                                  _gasPrice, _gasLimit, _privateKey) {
    try {

      let rawTx = {
        from: _from.address,
        nonce: _nonce,
        gasPrice: _gasPrice,
        gasLimit: _gasLimit,
        to: _to,
        value: _value,
        data: _data,
        chainId: okdk.chainId,
      };

      // console.log('\n========================',
      //        '\nCreating and signing the following transaction:',
      //        '\nfrom:', _from.address, '\nnonce:', _nonce, '\ngasPrice:', parseInt(_gasPrice, 16),
      //        '\ngasLimit:', parseInt(_gasLimit, 16),
      //        '\nto:', _to, '\nvalue:', _value, '\nchain id:', okdk.chainId, 
      //        '\n========================\n');
      
      const privateKeyBuffer = Buffer.from(_privateKey, 'hex');

      const transaction = new ethTx(rawTx);
      transaction.sign(privateKeyBuffer);

      const serializedTxn = '0x' + transaction.serialize().toString('hex');
      let transactionId = okdk.web3.utils.sha3(serializedTxn);

      const receipt = await okdk.web3.eth.sendSignedTransaction(serializedTxn);

      return this.constructSuccessJSON(receipt);
    } catch (error) {
      throw error;
    }
  };

  constructSuccessJSON(receipt) {
    // console.log('Transaction success! Receipt received.');
    let data = {'success': true,
                 'receipt': receipt};
    return data;
  };

  constructFailureJSON(message) {
    let data = {'success': false,
                 'message': message};
    return data;
  };

}