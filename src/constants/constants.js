// constants.js

const fs = require('fs');
const path = require('path');

var okdk;

const DATA_DIR = path.join(__dirname, '../../assets');
const KEYSTORE_DIR = path.join(DATA_DIR, '/keystore');
const CONTRACTS_DIR = path.join(DATA_DIR, '/contracts');

// JSON data holding compiled contracts.
const ITERABLE_MAPPING_DATA_PATH = path.join(CONTRACTS_DIR, '/IterableMapping.json');
const SAFE_MATH_DATA_PATH = path.join(CONTRACTS_DIR, '/SafeMath.json');
const DATABASE_DATA_PATH = path.join(CONTRACTS_DIR, '/Database.json');
const DATABASE_TEST_DATA_PATH = path.join(CONTRACTS_DIR, '/DatabaseTest.json');
const OKEYDOKEY_GOD_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyDokeyGod.json');
const OKEYDOKEY_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyDokey.json');
const TOKEN_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyToken.json');

// JSON data holding address of users.
const USER_ADDR_PATH = path.join(DATA_DIR, 'users.json');

export default class Constants {

	/**
   * Initialize constants module.
   * @constructor
   *
   * @param {Object} _okdk - OkeyDokey module instance.
   */
  constructor(_okdk) {
    okdk = _okdk;
  }

  static get DATA_DIR() {
    return DATA_DIR;
  }

  static get KEYSTORE_DIR() {
    return KEYSTORE_DIR;
  }

  /* JSON data holding compiled contracts. */
  static get ITERABLE_MAPPING_DATA_PATH() {
    return ITERABLE_MAPPING_DATA_PATH;
  }

  static get SAFE_MATH_DATA_PATH() {
    return SAFE_MATH_DATA_PATH;
  }

  static get DATABASE_DATA_PATH() {
    return DATABASE_DATA_PATH;
  }

  static get DATABASE_TEST_DATA_PATH() {
    return DATABASE_TEST_DATA_PATH;
  }

  static get OKEYDOKEY_GOD_DATA_PATH() {
    return OKEYDOKEY_GOD_DATA_PATH;
  }

  static get OKEYDOKEY_DATA_PATH() {
    return OKEYDOKEY_DATA_PATH;
  }

  static get TOKEN_DATA_PATH() {
    return TOKEN_DATA_PATH;
  }

  /* JSON data holding address of users. */
  static get USER_ADDR_PATH() {
    return USER_ADDR_PATH;
  }

}