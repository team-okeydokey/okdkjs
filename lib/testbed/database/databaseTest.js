// database.js

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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _contract = require('../../core/contract');

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var okdk;

var DatabaseTest = function (_Contract) {
  (0, _inherits3.default)(DatabaseTest, _Contract);

  /**
   * Set up Database Test module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  function DatabaseTest(_okdk) {
    (0, _classCallCheck3.default)(this, DatabaseTest);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatabaseTest.__proto__ || Object.getPrototypeOf(DatabaseTest)).call(this, _okdk));

    okdk = _okdk;
    return _this;
  }

  /**
   * Initialize Database test module.
   */


  (0, _createClass3.default)(DatabaseTest, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* Load abi & address */
                this._abi = okdk.core._databaseTestAbi;
                this._bytecode = okdk.core._databaseTestBytecode;
                // this.address = okdk.core._databaseTestAddress;

              case 2:
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
     * Read table.
     *
     * @param {string} _tableName - Table name.
     */

  }, {
    key: 'readTable',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_user, _password, _tableName, _options) {
        var hexName, hasTable, tableSize, tableWidth, table, i, row, j, query;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hexName = okdk.web3.utils.toHex(_tableName);
                _context2.next = 3;
                return this._contract.methods.hasTable(hexName).call();

              case 3:
                hasTable = _context2.sent;

                if (hasTable) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', []);

              case 6:
                _context2.next = 8;
                return this._contract.methods.tableSize(hexName).call();

              case 8:
                tableSize = _context2.sent;
                _context2.next = 11;
                return this._contract.methods.tableHeight(hexName).call();

              case 11:
                tableWidth = _context2.sent;
                table = [];
                i = 0;

              case 14:
                if (!(i < tableSize)) {
                  _context2.next = 29;
                  break;
                }

                row = [];
                j = 0;

              case 17:
                if (!(j < tableWidth)) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 20;
                return this._contract.methods.query(hexName, i, j).call();

              case 20:
                query = _context2.sent;

                row.push(query);

              case 22:
                j++;
                _context2.next = 17;
                break;

              case 25:
                table.push(row);

              case 26:
                i++;
                _context2.next = 14;
                break;

              case 29:
                console.log(table);
                return _context2.abrupt('return', table);

              case 31:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function readTable(_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return readTable;
    }()
  }, {
    key: 'createTable',


    /**
     * Create table.
     *
     * @param {string} _tableName - Table name.
     */
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_user, _password, _tableName, _options) {
        var hexName, callData, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                hexName = okdk.web3.utils.toHex(_tableName);

                console.log(hexName);

                // Construct abi.
                callData = this._contract.methods.createTable(hexName).encodeABI();
                _context3.next = 6;
                return okdk.core.callContract(_user, _password, this._address, callData, _options);

              case 6:
                result = _context3.sent;
                return _context3.abrupt('return', result);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function createTable(_x5, _x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      }

      return createTable;
    }()
  }]);
  return DatabaseTest;
}(_contract2.default);

exports.default = DatabaseTest;
module.exports = exports['default'];