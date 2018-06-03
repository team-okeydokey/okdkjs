// okdk.js

'use strict';

/* Import libraries. */
import Constants from './constants/constants';
import Accounts from './accounts/accounts';
import Utils from './utils/utils';
import Libs from './libs/libs';
import Core from './core/core';
import Token from './token/token';

export default class OKDK {

  /**
   * Set up OKDK library and relevant modules.
   * @constructor
   *
   * @param {Object} _web3 - Externally created web3 object.
   */
  constructor(_web3) {
    
    /* Set up web3 */
    this.web3 = _web3;
    // this.chainId = 3; // Use Ropsten.
    this.chainId = 1;

    /* Set up utils */
    this.utils = new Utils(this);
    this.constants = Constants;

    /* Set up accounts */
    this.accounts = new Accounts(this);
    // this.accounts = _accounts._accounts;

    /* Set up core module */
    this.core = new Core(this);

    /* Set up libs module */
    this.libs = new Libs(this);

    /* Set up OKEY token. */
    this.token = new Token(this);
  }

  async init() {

    try {

      const accountsReady = await this.accounts.init();
      const coreReady = await this.core.init();
      const libsReady = await this.libs.init();
      const tokenReady = await this.token.init();

    } catch(error) {
      throw error;
    }
  }

}