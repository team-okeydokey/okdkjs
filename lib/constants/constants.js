'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// constants.js

var fs = require('fs');
var path = require('path');

var okdk;

var DATA_DIR = path.join(__dirname, '../../assets');
var KEYSTORE_DIR = path.join(DATA_DIR, '/keystore');
var CONTRACTS_DIR = path.join(DATA_DIR, '/contracts');

// JSON data holding compiled contracts.
var ITERABLE_MAPPING_DATA_PATH = path.join(CONTRACTS_DIR, '/IterableMapping.json');
var SAFE_MATH_DATA_PATH = path.join(CONTRACTS_DIR, '/SafeMath.json');
var TOKEN_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyToken.json');
var WHITELIST_DATA_PATH = path.join(CONTRACTS_DIR, '/Whitelist.json');
var REFERRAL_DATA_PATH = path.join(CONTRACTS_DIR, '/Referral.json');
var ICO_DATA_PATH = path.join(CONTRACTS_DIR, '/OkeyDokeySale.json');

// JSON data holding state of ico.
var USER_ADDR_PATH = path.join(DATA_DIR, 'users.json');
var ICO_ADDR_PATH = path.join(DATA_DIR, 'ico.json');

var Constants = function () {

  /**
    * Initialize constants module.
    * @constructor
    *
    * @param {Object} _okdk - OkeyDokey module instance.
    */
  function Constants(_okdk) {
    (0, _classCallCheck3.default)(this, Constants);

    okdk = _okdk;
  }

  (0, _createClass3.default)(Constants, null, [{
    key: 'DATA_DIR',
    get: function get() {
      return DATA_DIR;
    }
  }, {
    key: 'KEYSTORE_DIR',
    get: function get() {
      return KEYSTORE_DIR;
    }

    /* JSON data holding compiled contracts. */

  }, {
    key: 'ITERABLE_MAPPING_DATA_PATH',
    get: function get() {
      return ITERABLE_MAPPING_DATA_PATH;
    }
  }, {
    key: 'SAFE_MATH_DATA_PATH',
    get: function get() {
      return SAFE_MATH_DATA_PATH;
    }
  }, {
    key: 'TOKEN_DATA_PATH',
    get: function get() {
      return TOKEN_DATA_PATH;
    }
  }, {
    key: 'WHITELIST_DATA_PATH',
    get: function get() {
      return WHITELIST_DATA_PATH;
    }
  }, {
    key: 'REFERRAL_DATA_PATH',
    get: function get() {
      return REFERRAL_DATA_PATH;
    }
  }, {
    key: 'ICO_DATA_PATH',
    get: function get() {
      return ICO_DATA_PATH;
    }

    /* JSON data holding state of ico. */

  }, {
    key: 'USER_ADDR_PATH',
    get: function get() {
      return USER_ADDR_PATH;
    }
  }, {
    key: 'ICO_ADDR_PATH',
    get: function get() {
      return ICO_ADDR_PATH;
    }
  }]);
  return Constants;
}();

exports.default = Constants;
module.exports = exports['default'];