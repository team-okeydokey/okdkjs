// contract.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var okdk;

var Contract = function () {

  /**
   * Set up Contract module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  function Contract(_okdk) {
    (0, _classCallCheck3.default)(this, Contract);

    okdk = _okdk;
    this._abi = null;
    this._bytecode = "";
    this._address = "";
    this._contract = null;
  }

  /**
   * Getter for address.
   *
   * @return {string} Address of contract.
   */


  (0, _createClass3.default)(Contract, [{
    key: "deploy",


    /**
     * Deploy contract.
     *
     * @param {Object} _user - User instance of caller.
     * @param {string} _password - Password for keystore.
     * @param {Array} _params - Constructor parameters in an array.
     * @param {int} _value - Wei to send to deployed contract.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_user, _password, _params, _value) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return okdk.core.deployContract(_user, _password, this._abi, this._bytecode, _params, _value, _options);

              case 3:
                result = _context.sent;


                if (result && result.receipt && result.receipt.contractAddress) {
                  this._address = result.receipt.contractAddress;
                }

                return _context.abrupt("return", result);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function deploy(_x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      }

      return deploy;
    }()

    /**
    * Link libraries.
    *
    * Replace library placeholders in bytecode with library address.
    *
    * @param {string} _name - Name of library being linked.
    * @param {string} _address - Address of library being linked.
    * @return {boolean} True if linking was successful.
    */

  }, {
    key: "link",
    value: function link(_name, _address) {

      // Return false if bytecode is invalid.
      if (!this._bytecode) {
        return false;
      }

      // Find placeholder to replace.
      var placeholder = okdk.utils.getLinkerPlaceholder(_name);

      // Replace placeholders in bytecode to actual address.
      this._bytecode = this._bytecode.replace(new RegExp(placeholder, 'g'), _address);

      return true;
    }
  }, {
    key: "address",
    get: function get() {
      return this._address;
    }

    /**
     * Setter for address. 
     *
     * Set address of contract and reconstruct contract.
     *
     * @param {string} _address - Address of contract.
     */
    ,
    set: function set(_address) {
      if (okdk.web3.utils.isAddress(_address)) {
        this._address = _address;
        this._contract = new okdk.web3.eth.Contract(this.abi, this.address);
      } else {
        throw 'Tried to set invalid address.';
      }
    }

    /**
     * Getter for abi.
     *
     * @return {Object} JSON abi of contract.
     */

  }, {
    key: "abi",
    get: function get() {
      return this._abi;
    }

    /**
     * Setter for abi.
     *
     * @param {Object} _abi - JSON abi of contract.
     */
    ,
    set: function set(_abi) {
      return this._abi;
    }

    /**
     * Getter for bytecode.
     *
     * @return {string} Bytecode of contract.
     */

  }, {
    key: "bytecode",
    get: function get() {
      return this._bytecode;
    }

    /**
     * Setter for bytecode.
     *
     * @param {string} _bytecode - Bytecode of contract.
     */
    ,
    set: function set(_bytecode) {
      return this._bytecode;
    }
  }]);
  return Contract;
}();

exports.default = Contract;
module.exports = exports["default"];