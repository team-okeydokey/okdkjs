// user.js

const keythereum = require('keythereum');

var okdk;

export default class User {

  /**
   * Instantiate a User object.
   * @constructor
   *
   * @param {Object} _okdk - OkeyDokey module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;
    this._name = '';
    this._address = '';
  }

  /**
   * Setter for name.
   *
   * @param {string} _name - Name of user.
   */
  set name(_name) {
    this._name = _name;
  };

  /**
   * Getter for name.
   *
   * @return {string} Name of user.
   */
  get name() {
     return this._name;
  };

  /**
   * Setter for public address.
   *
   * @param {string} _address - Public address of user.
   */
  set address(_address) {
    this._address = _address;
  };

  /**
   * Getter for public address.
   *
   * @return {string} Public address of user in string format.
   */
  get address() {
     return this._address;
  };

  /**
   * Getter for private key.
   *
   * @param {string} password - Password to open keystore file.
   * @return {string} Private key of user in string format.
   */
 async getPrivateKey(password) {

    try {

      /* Fetch private key from keystore. */
      var keyObject = keythereum.importFromFile(
        this._address.toLowerCase(), okdk.constants.DATA_DIR);

      return new Promise((resolve, reject) => {
        keythereum.importFromFile(this._address.toLowerCase(), 
          okdk.constants.DATA_DIR, function (keyObject) {

          keythereum.recover(password, keyObject, function (privateKey) {
            /* Return error if private key is undefined. */
            if (privateKey === 'undefined') {
              reject(null);
            }
            resolve(privateKey);
          });
        });
      });

    } catch(error) {
      throw error;
    }
  };

}

