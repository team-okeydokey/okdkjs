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
const TOKEN_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyToken.json');
const WHITELIST_DATA_PATH = path.join(CONTRACTS_DIR, '/Whitelist.json');
const REFERRAL_DATA_PATH = path.join(CONTRACTS_DIR, '/Referral.json');
const ICO_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyDokeySale.json');

// JSON data holding state of ico.
const USER_ADDR_PATH = path.join(DATA_DIR, 'users.json');
const ICO_ADDR_PATH = path.join(DATA_DIR, 'ico.json');

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

  static get TOKEN_DATA_PATH() {
    return TOKEN_DATA_PATH;
  }

  static get WHITELIST_DATA_PATH() {
    return WHITELIST_DATA_PATH;
  }

  static get REFERRAL_DATA_PATH() {
    return REFERRAL_DATA_PATH;
  }

  static get ICO_DATA_PATH() {
    return ICO_DATA_PATH;
  }

  /* JSON data holding state of ico. */
  static get USER_ADDR_PATH() {
    return USER_ADDR_PATH;
  }

  static get ICO_ADDR_PATH() {
    return ICO_ADDR_PATH;
  }

}