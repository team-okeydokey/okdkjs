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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// user.js

var keythereum = require('keythereum');

var okdk;

var User = function () {

  /**
   * Instantiate a User object.
   * @constructor
   *
   * @param {Object} _okdk - OkeyDokey module instance.
   */
  function User(_okdk) {
    (0, _classCallCheck3.default)(this, User);

    okdk = _okdk;
    this._name = '';
    this._address = '';
  }

  /**
   * Setter for name.
   *
   * @param {string} _name - Name of user.
   */


  (0, _createClass3.default)(User, [{
    key: 'getPrivateKey',


    /**
     * Getter for private key.
     *
     * @param {string} password - Password to open keystore file.
     * @return {string} Private key of user in string format.
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(password) {
        var _this = this;

        var keyObject;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;


                /* Fetch private key from keystore. */
                keyObject = keythereum.importFromFile(this._address.toLowerCase(), okdk.constants.DATA_DIR);
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  keythereum.importFromFile(_this._address.toLowerCase(), okdk.constants.DATA_DIR, function (keyObject) {

                    keythereum.recover(password, keyObject, function (privateKey) {
                      /* Return error if private key is undefined. */
                      if (privateKey === 'undefined') {
                        reject(null);
                      }
                      resolve(privateKey);
                    });
                  });
                }));

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function getPrivateKey(_x) {
        return _ref.apply(this, arguments);
      }

      return getPrivateKey;
    }()
  }, {
    key: 'name',
    set: function set(_name) {
      this._name = _name;
    },


    /**
     * Getter for name.
     *
     * @return {string} Name of user.
     */
    get: function get() {
      return this._name;
    }
  }, {
    key: 'address',


    /**
     * Setter for public address.
     *
     * @param {string} _address - Public address of user.
     */
    set: function set(_address) {
      this._address = _address;
    },


    /**
     * Getter for public address.
     *
     * @return {string} Public address of user in string format.
     */
    get: function get() {
      return this._address;
    }
  }]);
  return User;
}();

exports.default = User;
module.exports = exports['default'];