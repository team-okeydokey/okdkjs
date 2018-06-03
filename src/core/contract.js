// contract.js

'use strict';

var okdk;

export default class Contract {

	/**
	 * Set up Contract module.
	 * @constructor
	 *
	 * @param {Object} _okdk - OKDk module instance.
	 */
	constructor(_okdk) {
    okdk = _okdk;
    this._abi = null;
    this._bytecode = "";
    this._address = "";
    this._contract = null;
  }

  /**
   * Getter for address.
   *
   * @return {string} Address of contract.
   */
  get address() {
    return this._address;
  }

  /**
   * Setter for address. 
   *
   * Set address of contract and reconstruct contract.
   *
   * @param {string} _address - Address of contract.
   */
  set address(_address) {
    if (okdk.web3.utils.isAddress(_address)) {
      this._address = _address;
      this._contract = new okdk.web3.eth.Contract(this.abi, this.address);
    } else {
      throw 'Tried to set invalid address.';
    }
  }

  /**
   * Getter for abi.
   *
   * @return {Object} JSON abi of contract.
   */
  get abi() {
    return this._abi;
  }

  /**
   * Setter for abi.
   *
   * @param {Object} _abi - JSON abi of contract.
   */
  set abi(_abi) {
    return this._abi;
  }

  /**
   * Getter for bytecode.
   *
   * @return {string} Bytecode of contract.
   */
  get bytecode() {
    return this._bytecode;
  }

  /**
   * Setter for bytecode.
   *
   * @param {string} _bytecode - Bytecode of contract.
   */
  set bytecode(_bytecode) {
    return this._bytecode;
  }

  /**
   * Deploy contract.
   *
   * @param {Object} _user - User instance of caller.
   * @param {string} _password - Password for keystore.
   * @param {Array} _params - Constructor parameters in an array.
   * @param {int} _value - Wei to send to deployed contract.
   * @param {Object} _options - Optional object containing values of 
   *                            nonce, gasPrice, and gasLimit to be used.
   */
  async deploy(_user, _password, _params, _value, _options = {}) {
    
    try {
      
      /* Deploy contract with relevant values. */
      const result = await okdk.core.deployContract(
        _user, _password, this._abi, this._bytecode, _params, _value, _options);

      if (result && result.receipt && result.receipt.contractAddress) {
      	this._address = result.receipt.contractAddress;
      }

      return result;

    } catch (error) {
      throw error;
    }
  }

  /**
	 * Link libraries.
	 *
	 * Replace library placeholders in bytecode with library address.
	 *
	 * @param {string} _name - Name of library being linked.
	 * @param {string} _address - Address of library being linked.
	 * @return {boolean} True if linking was successful.
	 */
  link(_name, _address) {

  	// Return false if bytecode is invalid.
  	if (!this._bytecode) {
  		return false;
  	}

  	// Find placeholder to replace.
  	const placeholder = okdk.utils.getLinkerPlaceholder(_name);

  	// Replace placeholders in bytecode to actual address.
  	this._bytecode 
      = this._bytecode.replace(new RegExp(placeholder, 'g'), _address);
  
    return true;
  }

}