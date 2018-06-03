// accounts.js

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

var fs = require('fs');
var keythereum = require("keythereum");
var User = require('./user.js');

var okdk;

var Accounts = function () {

  /**
   * Set up user accounts.
   * @constructor
   *
   * @param {Object} )okdk - OkeyDokey module instance.
   */
  function Accounts(_okdk) {
    (0, _classCallCheck3.default)(this, Accounts);

    okdk = _okdk;
    this._accounts = [];
  }

  /**
   * Restore or instantiate user instance.
   */


  (0, _createClass3.default)(Accounts, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var keystoreAddrs, userJSON, name, i, keystoreAddr, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.loadKeyStoreAddresses();

              case 3:
                keystoreAddrs = _context.sent;


                // Read assets/users.json
                userJSON = okdk.utils.loadJSON(okdk.constants.USER_ADDR_PATH);

                // For each user...

                for (name in userJSON) {
                  if (userJSON.hasOwnProperty(name)) {
                    // .. loop through every stored address and see if there is a match.
                    for (i in keystoreAddrs) {
                      keystoreAddr = keystoreAddrs[i];

                      if (userJSON[name] == keystoreAddr) {
                        user = new User(okdk);

                        user.name = name;
                        user.address = keystoreAddr;
                        this._accounts.push(user);
                      } // End if (userJSON[name] == keystoreAddr).
                    } // End addresses for loop.
                  } // End if (userJSON.hasOwnProperty(name)).
                } // End userJSON for loop.

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'loadKeyStoreAddresses',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var storedAddresses;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                storedAddresses = [];
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  return fs.readdir(okdk.constants.KEYSTORE_DIR, function (err, files) {
                    for (var i in files) {
                      var file = files[i];
                      // Check file name validity.
                      if (file != 'README.md' && file.length == 71) {
                        var address = '0x' + file.slice(-40);
                        // If extracted address is valid, push user to account list.
                        if (okdk.web3.utils.isAddress(address)) {
                          storedAddresses.push(address);
                        }
                      } // End if (file != 'README.md' && file.length == 71).
                    }
                    resolve(storedAddresses);
                  });
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadKeyStoreAddresses() {
        return _ref2.apply(this, arguments);
      }

      return loadKeyStoreAddresses;
    }()

    /**
     * Create a new user.
     * @param {string} name - Name of user.
     * @param {password} password - Password to use in keystore.
     * @return {User} A user object.
     */

  }, {
    key: 'newAccount',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(name, password) {
        var _this = this;

        var context, userJSON, newUser;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                context = this;
                userJSON = okdk.utils.loadJSON(okdk.constants.USER_ADDR_PATH);
                newUser = new User(okdk);

                newUser.name = name;

                return _context5.abrupt('return', new Promise(function (resolve, reject) {

                  // Create new random wallet.
                  keythereum.create(null, function () {
                    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dk) {
                      return _regenerator2.default.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:

                              // Generate and store keystore file.
                              keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, null, function () {
                                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(keyObject) {
                                  var updated;
                                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                                    while (1) {
                                      switch (_context3.prev = _context3.next) {
                                        case 0:

                                          // Store info in newUser.
                                          newUser.address = '0x' + keyObject.address;

                                          // Store new user in assets/users.json.
                                          _context3.next = 3;
                                          return okdk.utils.updateJSON(okdk.constants.USER_ADDR_PATH, newUser.name, newUser.address);

                                        case 3:
                                          updated = _context3.sent;


                                          context._accounts.push(newUser);

                                          resolve(newUser);

                                        case 6:
                                        case 'end':
                                          return _context3.stop();
                                      }
                                    }
                                  }, _callee3, _this);
                                }));

                                return function (_x4) {
                                  return _ref5.apply(this, arguments);
                                };
                              }()); // End keythereum dump.

                            case 1:
                            case 'end':
                              return _context4.stop();
                          }
                        }
                      }, _callee4, _this);
                    }));

                    return function (_x3) {
                      return _ref4.apply(this, arguments);
                    };
                  }()); // End keythereum create.
                }));

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

      function newAccount(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return newAccount;
    }()
  }, {
    key: 'loadAccount',


    /**
     * Load an existing user.
     *
     * @param {string} name - Name of user.
     * @return {User} A user object.
     */
    value: function loadAccount(name) {
      for (var i in this._accounts) {
        if (this._accounts[i].name == name) {
          return this._accounts[i];
        }
      }
      return null;
    }
  }]);
  return Accounts;
}();

exports.default = Accounts;
module.exports = exports['default'];