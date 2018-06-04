// testbed.js

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

var _databaseTest = require('./database/databaseTest');

var _databaseTest2 = _interopRequireDefault(_databaseTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var okdk;

var Libs = function () {

  /**
   * Set up Libs and relevant modules.
   * @constructor
   *
   * @param {Object} _okdk - OKDK module instance.
   */
  function Libs(_okdk) {
    (0, _classCallCheck3.default)(this, Libs);

    okdk = _okdk;

    /* Set up transaction module. */
    this.databaseTest = new _databaseTest2.default(okdk);
  }

  /**
   * Initialize Libs module.
   *
   * @param {Object} _okdk - OKDK module instance.
   */


  (0, _createClass3.default)(Libs, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var databaseTestReady;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.databaseTest.init();

              case 3:
                databaseTestReady = _context.sent;
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
  }]);
  return Libs;
}();

exports.default = Libs;
module.exports = exports['default'];