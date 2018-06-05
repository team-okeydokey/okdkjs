// safe_math.js

'use strict';

import Contract from '../core/contract';

var okdk;

export default class SafeMath extends Contract {

  /**
   * Set up SafeMath module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
    super(_okdk);
    okdk = _okdk;
  }

  /**
   * Initialize SafeMath module.
   */
  async init() {
    /* Load abi & address */
    this._abi = okdk.core._safeMathAbi;
    this._bytecode = okdk.core._safeMathBytecode;
    if (okdk.web3.utils.isAddress(okdk.core._safeMathAddress)) {
      this.address = okdk.core._safeMathAddress;
    }
  }

}