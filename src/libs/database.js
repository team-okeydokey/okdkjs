// database.js

'use strict';

var okdk

import Contract from '../core/contract';

export default class Database extends Contract {

  /**
   * Set up Database module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
      super(_okdk);
      okdk = _okdk;
  }

  /**
   * Initialize Database module.
   */
  async init() {
    /* Load abi & address */
    this._abi = okdk.core._databaseAbi;
    this._bytecode = okdk.core._databaseBytecode;
    // if (okdk.web3.utils.isAddress(okdk.core._databaseAddress)) {
    //   this.address = okdk.core._databaseAddress;
    // }
  }
}

