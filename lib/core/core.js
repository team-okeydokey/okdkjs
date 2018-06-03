// core.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _transaction = require('./transaction');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var okdk;

var Core = function () {

  /**
   * Set up Core library and relevant modules.
   * @constructor
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  function Core(_okdk) {
    (0, _classCallCheck3.default)(this, Core);

    okdk = _okdk;

    /* Set up transaction module. */
    this._transaction = new _transaction2.default(okdk);
  }

  /**
   * Initialize Core module.
   * @ignore
   *
   * @param {Object} _okdk - OKDK module instance.
   */


  (0, _createClass3.default)(Core, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var addressSynced;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.syncAddresses();

              case 3:
                addressSynced = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()

    /**
     * Sync addresses deployed contracts.
     * @ignore
     *
     * @return {boolean} success - Sync succeeded.
     */

  }, {
    key: 'syncAddresses',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var contractAddresses, iterableMappingData, safeMathData, tokenData, whitelistData, referralData, icoData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;


                /* Load static address file. */
                contractAddresses = okdk.utils.loadJSON(okdk.constants.ICO_ADDR_PATH);

                /* Fetch and construct libraries. */

                iterableMappingData = okdk.utils.loadJSON(okdk.constants.ITERABLE_MAPPING_DATA_PATH);

                this._iterableMappingAbi = iterableMappingData.abi;
                this._iterableMappingBytecode = iterableMappingData.bytecode;
                this._iterableMappingAddress = contractAddresses.iterableMapping;

                /* Fetch and construct libraries. */
                safeMathData = okdk.utils.loadJSON(okdk.constants.SAFE_MATH_DATA_PATH);

                this._safeMathAbi = safeMathData.abi;
                this._safeMathBytecode = safeMathData.bytecode;
                this._safeMathAddress = contractAddresses.safeMath;

                /* Fetch and construct token contract. */
                tokenData = okdk.utils.loadJSON(okdk.constants.TOKEN_DATA_PATH);

                this._tokenAbi = tokenData.abi;
                this._tokenBytecode = tokenData.bytecode;
                this._tokenAddress = contractAddresses.token;

                /* Fetch and construct whitelist contract. */
                whitelistData = okdk.utils.loadJSON(okdk.constants.WHITELIST_DATA_PATH);

                this._whitelistAbi = whitelistData.abi;
                this._whitelistBytecode = whitelistData.bytecode;
                this._whitelistAddress = contractAddresses.whitelist;

                /* Fetch and construct whitelist contract. */
                referralData = okdk.utils.loadJSON(okdk.constants.REFERRAL_DATA_PATH);

                this._referralAbi = referralData.abi;
                this._referralBytecode = referralData.bytecode;
                this._referralAddress = contractAddresses.referral;

                /* Fetch and construct ico contracts. */
                icoData = okdk.utils.loadJSON(okdk.constants.ICO_DATA_PATH);

                this._icoAbi = icoData.abi;
                this._icoBytecode = icoData.bytecode;
                this._reservationSaleAddress = contractAddresses.reservationSale;
                this._presaleAddress = contractAddresses.presale;
                this._publicSaleAddress = contractAddresses.publicSale;

                _context2.next = 33;
                break;

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 33:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 30]]);
      }));

      function syncAddresses() {
        return _ref2.apply(this, arguments);
      }

      return syncAddresses;
    }()
  }, {
    key: 'callContract',


    /**
     * Wrapper for Transaction's callContract method.
     *
     * @param {Object} _user - User instance of caller.
     * @param {string} _password - Password to keyfile of user.
     * @param {string} _address - Address of contract being called.
     * @param {Object} _callData - Abi encoded function call.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_user, _password, _address, _callData) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._transaction.callContract(_user, _password, _address, _callData, _options);

              case 3:
                result = _context3.sent;
                return _context3.abrupt('return', result);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function callContract(_x2, _x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return callContract;
    }()
  }, {
    key: 'deployContract',


    /**
     * Wrapper for Transaction's deployContract method.
     *
     * @param {Object} _user - User instance of caller.
     * @param {string} _password - Password for keystore.
     * @param {Object} _abi - Abi encoded function call.
     * @param {Object} _bytecode - Bytecode of abi.
     * @param {Object} _constructorParams - Constructor parameters in an array.
     * @param {int} _value - Wei to send to deployed contract.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_user, _password, _abi, _bytecode, _constructorParams, _value) {
        var _options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

        var result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._transaction.deployContract(_user, _password, _abi, _bytecode, _constructorParams, _value, _options);

              case 3:
                result = _context4.sent;
                return _context4.abrupt('return', result);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function deployContract(_x7, _x8, _x9, _x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return deployContract;
    }()
  }, {
    key: 'sendEther',


    /**
     * Send ether to address.
     *
     * @param {Object} _user - User instance of caller.
     * @param {string} _password - Password for keystore.
     * @param {string} _to - Address to send ether to.
     * @param {int} _value - Amount in ether to send to address.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_user, _password, _to, _value) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var weiValue, result;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                weiValue = okdk.web3.utils.toWei(_value.toString(), "ether");
                _context5.next = 4;
                return this._transaction.sendTransaction(_user, _to, weiValue, null, _password, _options);

              case 4:
                result = _context5.sent;
                return _context5.abrupt('return', result);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](0);
                throw _context5.t0;

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function sendEther(_x14, _x15, _x16, _x17) {
        return _ref5.apply(this, arguments);
      }

      return sendEther;
    }()
  }]);
  return Core;
}();

/**
 * Wrapper for Transaction's approve method.
 *
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
// Core.prototype.approve = function(user, spender, value) {
//     return this._transaction.approve(user, spender, value);
// };

/**
 * Wrapper for Transaction's sendToken method.
 *
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
// Core.prototype.sendToken = function(user, to, value) {
//     this._transaction.sendToken(user, to, value);
// };


exports.default = Core;
module.exports = exports['default'];