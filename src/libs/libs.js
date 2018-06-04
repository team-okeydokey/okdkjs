// libs.js

'use strict';

import IterableMapping from './iterable_mapping'
import SafeMath from './safe_math'
import Database from './database';

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
    this.iterableMapping = new IterableMapping(okdk);
    this.safeMath = new SafeMath(okdk);
    this.database = new Database(okdk);
  }

  /**
   * Initialize Libs module.
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  async init() {
    try {

      const iterableMappingReady = await this.iterableMapping.init();
      const safeMathReady = await this.safeMath.init();
      const databaseReady = await this.database.init();

    } catch(error) {
      throw error;
    }
  }

}