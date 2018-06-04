// libs.js

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

var _iterable_mapping = require('./iterable_mapping');

var _iterable_mapping2 = _interopRequireDefault(_iterable_mapping);

var _safe_math = require('./safe_math');

var _safe_math2 = _interopRequireDefault(_safe_math);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

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
    this.iterableMapping = new _iterable_mapping2.default(okdk);
    this.safeMath = new _safe_math2.default(okdk);
    this.database = new _database2.default(okdk);
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
        var iterableMappingReady, safeMathReady, databaseReady;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.iterableMapping.init();

              case 3:
                iterableMappingReady = _context.sent;
                _context.next = 6;
                return this.safeMath.init();

              case 6:
                safeMathReady = _context.sent;
                _context.next = 9;
                return this.database.init();

              case 9:
                databaseReady = _context.sent;
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
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