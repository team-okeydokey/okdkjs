// token.js

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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _contract = require('../core/contract');

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUINTILLION = Math.pow(10.0, 18); // Ratio of wei to eth.

var okdk;

var Token = function (_Contract) {
  (0, _inherits3.default)(Token, _Contract);

  /**
   * Set up Token module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  function Token(_okdk) {
    (0, _classCallCheck3.default)(this, Token);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this, _okdk));

    okdk = _okdk;
    return _this;
  }

  /**
   * Initialize Token module.
   */


  (0, _createClass3.default)(Token, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* Load abi & address */
                this._abi = okdk.core._tokenAbi;
                this._bytecode = okdk.core._tokenBytecode;
                this.address = okdk.core._tokenAddress;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()

    /**
     * Deploy token to network.
     *
     * @param {Object} _user - User instance of token holder.
     * @param {string} _password - Password to keyfile of user.
     * @param {int} _initialSupply - Initial supply of token.
     * @param {string} _tokenName - Name of token.
     * @param {string} _tokenSymbol - Token symbol.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */

  }, {
    key: 'deploy',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_user, _password, _initialSupply, _tokenName, _tokenSymbol) {
        var _options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        var initialSupply, params, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;


                // const initialSupply = okdk.web3.utils.toBN(_initialSupply)
                //                     .mul(okdk.web3.utils.toBN(QUINTILLION));

                initialSupply = okdk.web3.utils.toBN(_initialSupply);
                params = [initialSupply, _tokenName, _tokenSymbol];

                /* Deploy contract with relevant values. */

                _context2.next = 5;
                return (0, _get3.default)(Token.prototype.__proto__ || Object.getPrototypeOf(Token.prototype), 'deploy', this).call(this, _user, _password, params, 0, _options);

              case 5:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function deploy(_x2, _x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return deploy;
    }()

    /**
     * Query OKDK token balance of a user.
     *
     * @param {Object} _user - User instance of account to query.
     */

  }, {
    key: 'balanceOf',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_user) {
        var address, balance;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                address = _user.address;
                _context3.next = 3;
                return this._contract.methods.balanceOf(address).call();

              case 3:
                balance = _context3.sent;
                return _context3.abrupt('return', this.unitsToTokens(balance));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function balanceOf(_x7) {
        return _ref3.apply(this, arguments);
      }

      return balanceOf;
    }()
  }, {
    key: 'balanceOfAddress',


    /**
     * Query OKDK token balance of address string.
     *
     * @param {string} _address - Address of account to query.
     */
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_address) {
        var balance;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._contract.methods.balanceOf(_address).call();

              case 2:
                balance = _context4.sent;
                return _context4.abrupt('return', this.unitsToTokens(balance));

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function balanceOfAddress(_x8) {
        return _ref4.apply(this, arguments);
      }

      return balanceOfAddress;
    }()
  }, {
    key: 'getAllowance',


    /**
     * Query OKDK token allowance of a user.
     *
     * @param {Object} _user - User instance of account to query.
     * @param {string} _address - Address of spender.
     */
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_user, _address) {
        var userAddress, balance;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userAddress = _user.address;
                _context5.next = 3;
                return this._contract.methods.allowance(userAddress, _address).call();

              case 3:
                balance = _context5.sent;
                return _context5.abrupt('return', this.unitsToTokens(balance));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAllowance(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getAllowance;
    }()
  }, {
    key: 'transfer',


    /**
     * Send OKDK token to address.
     *
     * @param {Object} _user - User instance of sender.
     * @param {string} _password - Password to unlock user's keystore.
     * @param {string} _address - Address to send tokens to.
     * @param {int} _value - Amount to send.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_user, _password, _address, _value) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var valueInContract, callData, result;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                valueInContract = this.tokensToUnits(_value);

                // Construct abi.

                callData = this._contract.methods.transfer(_address, valueInContract).encodeABI();
                _context6.next = 5;
                return okdk.core.callContract(_user, _password, this._address, callData, _options);

              case 5:
                result = _context6.sent;
                return _context6.abrupt('return', result);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6['catch'](0);
                throw _context6.t0;

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 9]]);
      }));

      function transfer(_x12, _x13, _x14, _x15) {
        return _ref6.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: 'freezeAccount',


    /**
     * Freeze tokens.
     *
     * @param {Object} _user - User instance of sender.
     * @param {string} _password - Password to unlock user's keystore.
     * @param {string} _address - Address to send tokens to.
     * @param {boolean} _freeze - True to freeze.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_user, _password, _address, _freeze) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var callData, result;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;


                // Construct abi.
                callData = this._contract.methods.freezeAccount(_address, _freeze).encodeABI();
                _context7.next = 4;
                return okdk.core.callContract(_user, _password, this._address, callData, _options);

              case 4:
                result = _context7.sent;
                return _context7.abrupt('return', result);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](0);
                throw _context7.t0;

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      function freezeAccount(_x17, _x18, _x19, _x20) {
        return _ref7.apply(this, arguments);
      }

      return freezeAccount;
    }()
  }, {
    key: 'unitsToTokens',


    /**
     * Convert token units in decimals to actual tokens with float.
     *
     * @param {int} _units - Number of tokens represented in smart contract.
     * @param {int} Actual number of tokens.
     */
    value: function unitsToTokens(_units) {
      var BN_QUINTILLION = okdk.web3.utils.toBN(QUINTILLION);
      return Math.floor(okdk.web3.utils.toBN(_units).div(BN_QUINTILLION));
    }
  }, {
    key: 'tokensToUnits',


    /**
     * Convert tokens with float to decimal token units.
     *
     * @param {float} _tokens - Actual number of tokens.
     * @param {string} Big number of tokens represented in smart contract.
     */
    value: function tokensToUnits(_tokens) {
      var BN_QUINTILLION = okdk.web3.utils.toBN(QUINTILLION);
      return okdk.web3.utils.toBN(_tokens).mul(BN_QUINTILLION);
    }
  }]);
  return Token;
}(_contract2.default);

exports.default = Token;
module.exports = exports['default'];