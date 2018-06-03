// safe_math.js

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

var _contract = require('../core/contract');

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var okdk;

var SafeMath = function (_Contract) {
  (0, _inherits3.default)(SafeMath, _Contract);

  /**
   * Set up SafeMath module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  function SafeMath(_okdk) {
    (0, _classCallCheck3.default)(this, SafeMath);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SafeMath.__proto__ || Object.getPrototypeOf(SafeMath)).call(this, _okdk));

    okdk = _okdk;
    return _this;
  }

  /**
   * Initialize SafeMath module.
   */


  (0, _createClass3.default)(SafeMath, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* Load abi & address */
                this._abi = okdk.core._safeMathAbi;
                this._bytecode = okdk.core._safeMathBytecode;
                if (okdk.web3.utils.isAddress(okdk.core._safeMathAddress)) {
                  this.address = okdk.core._safeMathAddress;
                }

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
  }]);
  return SafeMath;
}(_contract2.default);

exports.default = SafeMath;
module.exports = exports['default'];