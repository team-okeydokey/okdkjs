// database.js

'use strict';

var okdk

import Contract from '../../core/contract';

export default class DatabaseTest extends Contract {

  /**
   * Set up Database Test module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  constructor(_okdk) {
    super(_okdk);
    okdk = _okdk;
  }

  /**
   * Initialize Database test module.
   */
  async init() {
    /* Load abi & address */
    this._abi = okdk.core._databaseTestAbi;
    this._bytecode = okdk.core._databaseTestBytecode;
    // this.address = okdk.core._databaseTestAddress;
  }

  /**
   * Read table.
   *
   * @param {string} _tableName - Table name.
   */
  async createTable(_tableName) {

    const hexName = okdk.web3.utils.toHex(_tableName);
    
    const hasTable = await this._contract.methods.hasTable(hexName).call();
    if (!hasTable) { return []; }

    const tableSize = await this._contract.methods.tableSize(hexName).call();
    const tableWidth = await this._contract.methods.tableHeight(hexName).call();

    var table = [];

    for (var i=0; i < tableSize; i ++) {
      var row = [];
      for (var j=0; j < tableWidth; j++) {
        const query = await this._contract.methods.query(hexName, i, j).call();
        row.push(query);
      }
      table.push(row);
    }
    console.log(table);
    return table;
  };

  /**
   * Create table.
   *
   * @param {string} _tableName - Table name.
   */
  async createTable(_tableName) {
    try {
      
      const hexName = okdk.web3.utils.toHex(_tableName);

      // Construct abi.
      let callData =
        this._contract.methods.createTable(hexName).encodeABI();
        
      const result =
        await okdk.core.callContract(_user, _password, this._address, callData, _options);

      return result;

    } catch (error) {
      throw error;
    }
  };
}

