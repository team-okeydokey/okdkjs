// testbed.js

'use strict';

import DatabaseTest from './database/databaseTest';

var okdk;

export default class Libs {

  /**
   * Set up Libs and relevant modules.
   * @constructor
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;

    /* Set up transaction module. */
    this.databaseTest = new DatabaseTest(okdk);
  }

  /**
   * Initialize Libs module.
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  async init() {
    try {
      
      const databaseTestReady = await this.databaseTest.init();

    } catch(error) {
      throw error;
    }
  }

}