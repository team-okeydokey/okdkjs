// okdk.js

'use strict';

/* Import libraries. */

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

var _constants = require('./constants/constants');

var _constants2 = _interopRequireDefault(_constants);

var _accounts = require('./accounts/accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _libs = require('./libs/libs');

var _libs2 = _interopRequireDefault(_libs);

var _core = require('./core/core');

var _core2 = _interopRequireDefault(_core);

var _token = require('./token/token');

var _token2 = _interopRequireDefault(_token);

var _testbed = require('./testbed/testbed');

var _testbed2 = _interopRequireDefault(_testbed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OKDK = function () {

  /**
   * Set up OKDK library and relevant modules.
   * @constructor
   *
   * @param {Object} _web3 - Externally created web3 object.
   */
  function OKDK(_web3) {
    (0, _classCallCheck3.default)(this, OKDK);


    /* Set up web3 */
    this.web3 = _web3;
    // this.chainId = 3; // Use Ropsten.
    this.chainId = 1;

    /* Set up utils */
    this.utils = new _utils2.default(this);
    this.constants = _constants2.default;

    /* Set up accounts */
    this.accounts = new _accounts2.default(this);
    // this.accounts = _accounts._accounts;

    /* Set up core module */
    this.core = new _core2.default(this);

    /* Set up libs module */
    this.libs = new _libs2.default(this);

    /* Set up OKEY token. */
    this.token = new _token2.default(this);

    /* Set up testbed module. */
    this.testbed = new _testbed2.default(this);
  }

  (0, _createClass3.default)(OKDK, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var accountsReady, coreReady, libsReady, tokenReady, testbedReady;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.accounts.init();

              case 3:
                accountsReady = _context.sent;
                _context.next = 6;
                return this.core.init();

              case 6:
                coreReady = _context.sent;
                _context.next = 9;
                return this.libs.init();

              case 9:
                libsReady = _context.sent;
                _context.next = 12;
                return this.token.init();

              case 12:
                tokenReady = _context.sent;
                _context.next = 15;
                return this.testbed.init();

              case 15:
                testbedReady = _context.sent;
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }]);
  return OKDK;
}();

exports.default = OKDK;
module.exports = exports['default'];