// transaction.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ethTx = require('ethereumjs-tx');

var okdk;

var Transaction = function () {

  /**
   * Set up Transaction module.
   * @constructor
   *
   * @param {Object} _okdk - OKDk module instance.
   */
  function Transaction(_okdk) {
    (0, _classCallCheck3.default)(this, Transaction);

    okdk = _okdk;
  }

  /**
   * Deploy contract.
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


  (0, _createClass3.default)(Transaction, [{
    key: 'deployContract',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_user, _password, _abi, _bytecode, _constructorParams, _value) {
        var _options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

        var contract, deployInfo, deployData, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                contract = new okdk.web3.eth.Contract(_abi);
                deployInfo = contract.deploy({
                  data: _bytecode,
                  arguments: _constructorParams
                });
                deployData = deployInfo.encodeABI();
                _context.next = 6;
                return this.sendTransaction(_user, null, _value, deployData, _password, _options);

              case 6:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function deployContract(_x2, _x3, _x4, _x5, _x6, _x7) {
        return _ref.apply(this, arguments);
      }

      return deployContract;
    }()

    /**
     * Call contract requiring transaction with supplied abi.
     * @ignore
     *
     * @param {Object} _user - User instance of caller.
     * @param {string} _password - Password to keyfile of user.
     * @param {string} _address - Address of contract being called.
     * @param {Object} _callData - Abi encoded function call.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */

  }, {
    key: 'callContract',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_user, _password, _address, _callData) {
        var _options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.sendTransaction(_user, _address, 0, _callData, _password, _options);

              case 3:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function callContract(_x9, _x10, _x11, _x12) {
        return _ref2.apply(this, arguments);
      }

      return callContract;
    }()
  }, {
    key: 'sendTransaction',


    /**
     * Send transaction to network.
     * @ignore
     *
     * @param {Object} _from - User instance of caller.
     * @param {string} _to - Address receiving transaction. null if contract deployment.
     * @param {int} _value - Value of transaction.
     * @param {Object} _data - Data(function call/contract info) to include in transaction.
     * @param {string} _password - Password to keystore file of caller.
     * @param {Object} _options - Optional object containing values of 
     *                            nonce, gasPrice, and gasLimit to be used.
     */
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_from, _to, _value, _data, _password) {
        var _options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        var privateKey, nonce, gasPrice, gasLimit, promises, _ref4, _ref5, resolvedNonce, resolvedGasPrice, resolvedGasLimit, _hexValue, hexNonce, hexGasPrice, hexGasLimit, transactionResult;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _from.getPrivateKey(_password);

              case 3:
                privateKey = _context3.sent;

                if (!(privateKey === 'undefined')) {
                  _context3.next = 6;
                  break;
                }

                throw 'Private key is undefined.';

              case 6:
                nonce = 0;
                gasPrice = 0;
                gasLimit = 0;

                /* Generate promises to fetch transaction information from the blockchain. */

                promises = [];

                /* Check if nonce has a default value. */

                if (_options.nonce) {
                  nonce = _options.nonce;
                } else {
                  promises.push(okdk.web3.eth.getTransactionCount(_from.address));
                }

                /* Check if gasPrice has a default value. */
                if (_options.gasPrice) {
                  gasPrice = _options.gasPrice;
                } else {
                  promises.push(okdk.web3.eth.getGasPrice());
                }

                /* Check if gasLimit has a default value. */
                if (_options.gasLimit) {
                  gasLimit = _options.gasLimit;
                } else {
                  promises.push(okdk.web3.eth.estimateGas({
                    from: _from.address,
                    to: _to,
                    value: _hexValue,
                    data: _data,
                    chainId: okdk.chainId
                  }));
                }

                /* If there is a value to resolve, resolve it. */

                if (!(promises.length > 0)) {
                  _context3.next = 24;
                  break;
                }

                _context3.next = 16;
                return Promise.all(promises);

              case 16:
                _ref4 = _context3.sent;
                _ref5 = (0, _slicedToArray3.default)(_ref4, 3);
                resolvedNonce = _ref5[0];
                resolvedGasPrice = _ref5[1];
                resolvedGasLimit = _ref5[2];


                /* Set resolved values. */
                if (resolvedNonce) {
                  nonce = resolvedNonce;
                }
                if (resolvedGasPrice) {
                  gasPrice = resolvedGasPrice;
                }
                if (resolvedGasLimit) {
                  gasLimit = resolvedGasLimit;
                }

              case 24:
                _hexValue = okdk.web3.utils.toHex(_value);
                hexNonce = okdk.web3.utils.toHex(nonce);
                hexGasPrice = okdk.web3.utils.toHex(gasPrice);
                hexGasLimit = okdk.web3.utils.toHex(gasLimit);
                // const hexGasLimit = okdk.web3.utils.toHex(4300000);

                _context3.next = 30;
                return this.sendTransactionWithValues(_from, _to, _hexValue, _data, hexNonce, hexGasPrice, hexGasLimit, privateKey);

              case 30:
                transactionResult = _context3.sent;
                return _context3.abrupt('return', transactionResult);

              case 34:
                _context3.prev = 34;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 37:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 34]]);
      }));

      function sendTransaction(_x14, _x15, _x16, _x17, _x18) {
        return _ref3.apply(this, arguments);
      }

      return sendTransaction;
    }()
  }, {
    key: 'sendTransactionWithValues',


    /**
     * Create, sign, and send transaction to network.
     * @ignore
     *
     * @param {Object} _from - User instance of caller.
     * @param {string} _to - Address receiving transaction. null if contract deployment.
     * @param {int} _value - Value of transaction.
     * @param {Object} _data - Data(function call/contract info) to include in transaction.
     * @param {int} _nonce - Number of ending transactions by caller in network.
     * @param {int} _gasPrice - Price per gas used.
     * @param {int} _gasLimit - Maximum gas to use in transaction.
     * @param {string} _privateKey - Private key of caller.
     */
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_from, _to, _value, _data, _nonce, _gasPrice, _gasLimit, _privateKey) {
        var rawTx, privateKeyBuffer, transaction, serializedTxn, transactionId, receipt;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                rawTx = {
                  from: _from.address,
                  nonce: _nonce,
                  gasPrice: _gasPrice,
                  gasLimit: _gasLimit,
                  to: _to,
                  value: _value,
                  data: _data,
                  chainId: okdk.chainId
                };

                // console.log('\n========================',
                //        '\nCreating and signing the following transaction:',
                //        '\nfrom:', _from.address, '\nnonce:', _nonce, '\ngasPrice:', parseInt(_gasPrice, 16),
                //        '\ngasLimit:', parseInt(_gasLimit, 16),
                //        '\nto:', _to, '\nvalue:', _value, '\nchain id:', okdk.chainId, 
                //        '\n========================\n');

                privateKeyBuffer = Buffer.from(_privateKey, 'hex');
                transaction = new ethTx(rawTx);

                transaction.sign(privateKeyBuffer);

                serializedTxn = '0x' + transaction.serialize().toString('hex');
                transactionId = okdk.web3.utils.sha3(serializedTxn);
                _context4.next = 9;
                return okdk.web3.eth.sendSignedTransaction(serializedTxn);

              case 9:
                receipt = _context4.sent;
                return _context4.abrupt('return', this.constructSuccessJSON(receipt));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function sendTransactionWithValues(_x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26) {
        return _ref6.apply(this, arguments);
      }

      return sendTransactionWithValues;
    }()
  }, {
    key: 'constructSuccessJSON',
    value: function constructSuccessJSON(receipt) {
      // console.log('Transaction success! Receipt received.');
      var data = { 'success': true,
        'receipt': receipt };
      return data;
    }
  }, {
    key: 'constructFailureJSON',
    value: function constructFailureJSON(message) {
      var data = { 'success': false,
        'message': message };
      return data;
    }
  }]);
  return Transaction;
}();

exports.default = Transaction;
module.exports = exports['default'];