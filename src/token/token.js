// token.js

'use strict';

const QUINTILLION = 10.0 ** 18; // Ratio of wei to eth.

var okdk

import Contract from '../core/contract';

export default class Token extends Contract {

  /**
   * Set up Token module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
      super(_okdk);
      okdk = _okdk;
  }

  /**
   * Initialize Token module.
   */
  async init() {
    /* Load abi & address */
    this._abi = okdk.core._tokenAbi;
    this._bytecode = okdk.core._tokenBytecode;
    this.address = okdk.core._tokenAddress;
  }

  /**
   * Deploy token to network.
   *
   * @param {Object} _user - User instance of token holder.
   * @param {string} _password - Password to keyfile of user.
   * @param {int} _initialSupply - Initial supply of token.
   * @param {string} _tokenName - Name of token.
   * @param {string} _tokenSymbol - Token symbol.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async deploy(_user, _password, 
      _initialSupply, _tokenName, _tokenSymbol, _options = {}) {

    try {

      // const initialSupply = okdk.web3.utils.toBN(_initialSupply)
      //                     .mul(okdk.web3.utils.toBN(QUINTILLION));

      const initialSupply = okdk.web3.utils.toBN(_initialSupply);

      const params = [initialSupply, _tokenName, _tokenSymbol];

      /* Deploy contract with relevant values. */
      const result = await super.deploy(
        _user, _password, params, 0, _options);

      return result;

    } catch (error) {
      throw error;
    }
  }

  /**
   * Query OKDK token balance of a user.
   *
   * @param {Object} _user - User instance of account to query.
   */
  async balanceOf(_user) {

      const address = _user.address;
      const balance = await this._contract.methods.balanceOf(address).call();

      return this.unitsToTokens(balance);
  };

  /**
   * Query OKDK token balance of address string.
   *
   * @param {string} _address - Address of account to query.
   */
  async balanceOfAddress(_address) {

      const balance = await this._contract.methods.balanceOf(_address).call();

      return this.unitsToTokens(balance);
  };

  /**
   * Query OKDK token allowance of a user.
   *
   * @param {Object} _user - User instance of account to query.
   * @param {string} _address - Address of spender.
   */
  async getAllowance(_user, _address) {

      const userAddress = _user.address;
      const balance = await this._contract.methods.allowance(userAddress, _address).call();

      return this.unitsToTokens(balance);
  };

  /**
   * Send OKDK token to address.
   *
   * @param {Object} _user - User instance of sender.
   * @param {string} _password - Password to unlock user's keystore.
   * @param {string} _address - Address to send tokens to.
   * @param {int} _value - Amount to send.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async transfer(_user, _password, _address, _value, _options = {}) {
    try {
      
      const valueInContract = this.tokensToUnits(_value);

      // Construct abi.
      let callData =
        this._contract.methods.transfer(_address, valueInContract).encodeABI();
        
      const result =
        await okdk.core.callContract(_user, _password, this._address, callData, _options);

      return result;

    } catch (error) {
      throw error;
    }
  };

  /**
   * Freeze tokens.
   *
   * @param {Object} _user - User instance of sender.
   * @param {string} _password - Password to unlock user's keystore.
   * @param {string} _address - Address to send tokens to.
   * @param {boolean} _freeze - True to freeze.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async freezeAccount(_user, _password, _address, _freeze, _options = {}) {
    try {
      
      // Construct abi.
      let callData =
        this._contract.methods.freezeAccount(_address, _freeze).encodeABI();
        
      const result =
        await okdk.core.callContract(_user, _password, this._address, callData ,_options);

      return result;

    } catch (error) {
      throw error;
    }
  };

  /**
   * Convert token units in decimals to actual tokens with float.
   *
   * @param {int} _units - Number of tokens represented in smart contract.
   * @param {int} Actual number of tokens.
   */
  unitsToTokens(_units) {
    const BN_QUINTILLION = okdk.web3.utils.toBN(QUINTILLION);
    return Math.floor(okdk.web3.utils.toBN(_units).div(BN_QUINTILLION));
  };

  /**
   * Convert tokens with float to decimal token units.
   *
   * @param {float} _tokens - Actual number of tokens.
   * @param {string} Big number of tokens represented in smart contract.
   */
  tokensToUnits(_tokens) {
    const BN_QUINTILLION = okdk.web3.utils.toBN(QUINTILLION);
    return okdk.web3.utils.toBN(_tokens).mul(BN_QUINTILLION);
  };

}

