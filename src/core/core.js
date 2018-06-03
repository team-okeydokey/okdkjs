// core.js

'use strict';

import Transaction from './transaction';

var okdk;

export default class Core {

  /**
   * Set up Core library and relevant modules.
   * @constructor
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;

    /* Set up transaction module. */
    this._transaction = new Transaction(okdk);
  }

  /**
   * Initialize Core module.
   * @ignore
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  async init() {
    try {

      const addressSynced = await this.syncAddresses();

    } catch(error) {
      throw error;
    }
  }

  /**
   * Sync addresses deployed contracts.
   * @ignore
   *
   * @return {boolean} success - Sync succeeded.
   */
  async syncAddresses() {
    try {

      /* Load static address file. */
      const contractAddresses = okdk.utils.loadJSON(okdk.constants.ICO_ADDR_PATH);

      /* Fetch and construct libraries. */
      const iterableMappingData = okdk.utils.loadJSON(okdk.constants.ITERABLE_MAPPING_DATA_PATH);
      this._iterableMappingAbi = iterableMappingData.abi;
      this._iterableMappingBytecode = iterableMappingData.bytecode;
      this._iterableMappingAddress = contractAddresses.iterableMapping;

      /* Fetch and construct libraries. */
      const safeMathData = okdk.utils.loadJSON(okdk.constants.SAFE_MATH_DATA_PATH);
      this._safeMathAbi = safeMathData.abi;
      this._safeMathBytecode = safeMathData.bytecode;
      this._safeMathAddress = contractAddresses.safeMath;

      /* Fetch and construct token contract. */
      const tokenData = okdk.utils.loadJSON(okdk.constants.TOKEN_DATA_PATH);
      this._tokenAbi = tokenData.abi;
      this._tokenBytecode = tokenData.bytecode;
      this._tokenAddress = contractAddresses.token;

      /* Fetch and construct whitelist contract. */
      const whitelistData = okdk.utils.loadJSON(okdk.constants.WHITELIST_DATA_PATH);
      this._whitelistAbi = whitelistData.abi;
      this._whitelistBytecode = whitelistData.bytecode;
      this._whitelistAddress = contractAddresses.whitelist;

      /* Fetch and construct whitelist contract. */
      const referralData = okdk.utils.loadJSON(okdk.constants.REFERRAL_DATA_PATH);
      this._referralAbi = referralData.abi;
      this._referralBytecode = referralData.bytecode;
      this._referralAddress = contractAddresses.referral;

      /* Fetch and construct ico contracts. */
      const icoData = okdk.utils.loadJSON(okdk.constants.ICO_DATA_PATH);
      this._icoAbi = icoData.abi;
      this._icoBytecode = icoData.bytecode;
      this._reservationSaleAddress = contractAddresses.reservationSale;
      this._presaleAddress = contractAddresses.presale;
      this._publicSaleAddress = contractAddresses.publicSale;

    } catch (error) {
      throw error;
    }
  };

  /**
   * Wrapper for Transaction's callContract method.
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
      
      const result = await this._transaction.callContract(
        _user, _password, _address, _callData, _options);

      return result;

    } catch(error) {
      throw error;
    }
  };

  /**
   * Wrapper for Transaction's deployContract method.
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
  async deployContract(_user, _password, _abi, _bytecode, 
                       _constructorParams, _value, _options = {}) {
    try {

      const result = await this._transaction.deployContract(
      _user, _password, _abi, _bytecode, _constructorParams, _value, _options);

      return result;

    } catch(error) {
      throw error;
    }
  };

  /**
   * Send ether to address.
   *
   * @param {Object} _user - User instance of caller.
   * @param {string} _password - Password for keystore.
   * @param {string} _to - Address to send ether to.
   * @param {int} _value - Amount in ether to send to address.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async sendEther(_user, _password, _to, _value, _options = {}) {
    try {

      const weiValue = okdk.web3.utils.toWei(_value.toString(), "ether");

      const result = await this._transaction.sendTransaction(
      _user, _to, weiValue, null, _password, _options);

      return result;

    } catch(error) {
      throw error;
    }
  };

}


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
