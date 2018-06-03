// utils.js

const fs = require('fs');

var okdk;

export default class Utils {

  /**
   * Initialize utility module.
   * @constructor
   *
   * @param {Object} okdk - OkeyDokey module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;
  }

  /**
   * Create byte array from string.
   *
   * @param {string} string - String to convert to byte array.
   * @return {byte[]} Converted byte array.
   */
  stringToByteArray(string) {
    let utf8 = unescape(encodeURIComponent(string));

    let array = [];
    for (let i = 0; i < utf8.length; i++) {
        array.push(utf8.charCodeAt(i));
    }

    return array;
  };

  /**
   * Calculate grid id from latitude and longitude.
   *
   * @param {int} latitude - Latitude of coordinate.
   * @param {int} longitude - Longitude of coordinate.
   * @return {int} gridId - Id within the Earth's grid.
   */
  getGridId(latitude, longitude) {
    return 0;
  };


  /**
   * Convert hex to string.
   *
   * @param {string} hex - Hex value to convert to string.
   * @return {string} String value.
   */
  hexToString(hex) {
    let string = "";

    for(let i = 2; i < hex.length; i+=2) {
      let n = parseInt(hex.slice(i, i+2), 16);
      string += String.fromCharCode(n);
    }

    return string;
  }


  /**
   * Convert string to hex value.
   *
   * @param {string} string - String to convert to hex.
   * @return {string} Hex encoded value.
   */
  stringToHex(string) {
    let hexVal = "0x";

    for(let c of string) {
      hexVal += c.charCodeAt(0).toString(16);
    }

    return hexVal;
  }

  /**
   * Shave off '0x' prefix from eth address.
   *
   * @param {string} _address - Address string with leading '0x'.
   * @return {string} Address string without leading '0x'.
   */
  shaveAddressPrefix(_address) {
    if (!okdk.web3.utils.isAddress(_address)) {
      throw 'Address invalid.'
    }
    return _address.slice(2);
  } 

  /**
   * Add '0x' prefix to eth address.
   *
   * @param {string} _address - Address string without leading '0x'.
   * @return {string} Address string with leading '0x'.
   */
  addAddressPrefix(_address) {
    if (!okdk.web3.utils.isAddress(_address)) {
      throw 'Address invalid.'
    }
    return '0x' + _address;
  } 

  /**
   * Create new random account.
   *
   * @return {Object} Account object, containing address, privateKey, etc.
   */
  generateAccount() {
    return okdk.web3.eth.accounts.create();
  } 

  /** 
   * Load json file into JSON object.
   *
   * @param {string} _path - Path to of json file.
   * @return {Object} JSON object written in file.
   */
  loadJSON(_path) {
    delete require.cache[require.resolve(_path)];
    const json = require(_path);
    return json;
  }

  /** 
   * Update json file.
   *
   * @param {string} _path - Path to of json file.
   * @param {string} _key - Key to edit.
   * @param {int} _value - Value to be assigned to key.
   * @return {boolean} True if value was replaced.
   */
  async updateJSON(_path, _key, _value) {

    const json = this.loadJSON(_path); 

    json[_key] = _value;

    return new Promise((resolve, reject) => {

      fs.writeFile(_path, JSON.stringify(json), error => {
        if (error) {
          throw error;
          reject();
        } 
        resolve();
      });

    });
  }

  /** 
   * Create a library address placeholder string the same way as the solc compiler.
   *
   * A linker placeholder is a 40 character long string that 
   * starts and ends with '__' (two underscores).
   * If the name of the library is too short, 
   * the string will be padded with underscores.
   * If it is too long, the name will be truncated.
   * Refer to CommandLineInterface::link() of solc source code.
   * Example: __LibName_______________________________
   *
   * @param {string} _libraryName - Name of library.
   * @return {string} Formatted placeholder for solc linker.
   */
    getLinkerPlaceholder(_libraryName) {

      var placeholder = "__";

      // Embed library name.
      for (var i = 0; i < _libraryName.length && i < 36; i++) {
        placeholder += _libraryName[i];
      }

      // Add trailing underscores.
      for (var i = 0; i < 38 - _libraryName.length || i < 2; i++) {
        placeholder += '_';
      }

      return placeholder;
    }

}



