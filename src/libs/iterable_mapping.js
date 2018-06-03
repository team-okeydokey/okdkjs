// iterable_mapping.js

'use strict';

import Contract from '../core/contract';

var okdk;

export default class IterableMapping extends Contract {

  /**
   * Set up IterableMapping module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
    super(_okdk);
    okdk = _okdk;
  }

  /**
   * Initialize IterableMapping module.
   */
  async init() {
    /* Load abi & address */
    this._abi = okdk.core._iterableMappingAbi;
    this._bytecode = okdk.core._iterableMappingBytecode;
    if (okdk.web3.utils.isAddress(okdk.core._iterableMappingAddress)) {
      this.address = okdk.core._iterableMappingAddress;
    }
  }

}