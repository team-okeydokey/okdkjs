// accounts.js

'use strict';

const fs = require('fs');
const keythereum = require("keythereum");
const User = require('./user.js');

var okdk;

export default class Accounts {
  
  /**
   * Set up user accounts.
   * @constructor
   *
   * @param {Object} )okdk - OkeyDokey module instance.
   */
  constructor(_okdk) {
      okdk = _okdk;
      this._accounts = [];
  }

  /**
   * Restore or instantiate user instance.
   */
  async init() {

    try {

      const keystoreAddrs = await this.loadKeyStoreAddresses();

      // Read assets/users.json
      const userJSON = okdk.utils.loadJSON(okdk.constants.USER_ADDR_PATH); 

      // For each user...
      for (var name in userJSON) {
        if (userJSON.hasOwnProperty(name)) {
          // .. loop through every stored address and see if there is a match.
          for (var i in keystoreAddrs) {
            const keystoreAddr = keystoreAddrs[i];
            if (userJSON[name] == keystoreAddr) {
              const user = new User(okdk);
              user.name = name;
              user.address = keystoreAddr;
              this._accounts.push(user);
            } // End if (userJSON[name] == keystoreAddr).
          } // End addresses for loop.
        } // End if (userJSON.hasOwnProperty(name)).
      } // End userJSON for loop.

    } catch(error) {
      throw error;
    }
    
  };

  async loadKeyStoreAddresses() {

    var storedAddresses = [];

    return new Promise((resolve, reject) => {
      return fs.readdir(okdk.constants.KEYSTORE_DIR, (err, files) => {
        for (var i in files) {
          const file = files[i];
          // Check file name validity.
          if (file != 'README.md' && file.length == 71) {
            const address = '0x' + file.slice(-40);
            // If extracted address is valid, push user to account list.
            if (okdk.web3.utils.isAddress(address)) {
              storedAddresses.push(address);
            } 
          } // End if (file != 'README.md' && file.length == 71).
        }
        resolve(storedAddresses);
      })
    });
  }

  /**
   * Create a new user.
   * @param {string} name - Name of user.
   * @param {password} password - Password to use in keystore.
   * @return {User} A user object.
   */
  async newAccount(name, password) {

    try { 

      const context = this;

      const userJSON = okdk.utils.loadJSON(okdk.constants.USER_ADDR_PATH);

      let newUser = new User(okdk);
      newUser.name = name;

      return new Promise((resolve, reject) => {

        // Create new random wallet.
        keythereum.create(null, async dk => {

          // Generate and store keystore file.
          keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, 
            null, async keyObject => {

              // Store info in newUser.
              newUser.address = '0x' + keyObject.address;

              // Store new user in assets/users.json.
              const updated = await okdk.utils.updateJSON(
                okdk.constants.USER_ADDR_PATH, newUser.name, newUser.address);

              context._accounts.push(newUser);

              resolve(newUser);

            }); // End keythereum dump.

        }); // End keythereum create.

      });

    } catch (error) {
      throw error;
    }
  };

  /**
   * Load an existing user.
   *
   * @param {string} name - Name of user.
   * @return {User} A user object.
   */
  loadAccount(name) {
    for (var i in this._accounts) {
      if (this._accounts[i].name == name) {
        return this._accounts[i];
      }
    }
    return null;
  };

}