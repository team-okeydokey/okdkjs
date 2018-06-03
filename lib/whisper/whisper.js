"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// whisper.js

var _okdk;
var _shh;

module.exports = function (okdk) {
  return new Whisper(okdk);
};

/**
 * Initialize whisper module.
 * @constructor
 *
 * @param {Object} okdk - OkeyDokey module instance.
 */
function Whisper(okdk) {
  _okdk = okdk;
  _shh = okdk.web3.shh;
}

/**
 * Send message to OkeyDokey's whisper network.
 *
 * @param {string} topic - Topic recipients can subscribe to.
 *    Must be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {string} symKeyId - Symmetric key id.
 *    Symmetric key id to listen to specific messages (e.g. 0x12345....).
 * @param {string} message - Message to post.
 * @return {boolean} success - Whether the message was successfully posted.
 */
Whisper.prototype.post = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(topic, symKeyId, message) {
    var key, messageOptions, success;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;


            console.log("=klsdmslkmsdlkmclksmklcm");
            _context.next = 4;
            return _shh.getSymKey(symKeyId);

          case 4:
            key = _context.sent;

            console.log(key);
            console.log("=klsdmslkmsdlkmclksmklcm");

            messageOptions = {
              symKeyID: symKeyId,
              topic: topic,
              payload: message,
              ttl: 10,
              powTime: 3,
              powTarget: 0.5
            };
            _context.next = 10;
            return _shh.post(messageOptions);

          case 10:
            success = _context.sent;
            return _context.abrupt("return", success);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Subscrice to a topic in OkeyDokey's whisper network.
 *
 * @param {string} topic - Array of topics to subscribe to.
 *    e.g. ['0x11223344', '0x55667788']
 *    A topic be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {string} symKeyId (optional) - Symmetric key id.
 *    Symmetric key id to listen to specific messages.
 *    (e.g. 0x12345....  or null)
 * @param {function} onMessage - Callback function for message.
 *    Parameters should be (message, subscription).
 * @param {function} onError - Callback function for error.
 *    Parameters should be (error, subscription).
 */
Whisper.prototype.subscribe = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(topics, symKeyId, onMessage, onError) {
    var key, subscriptionOptions, message;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            console.log("klsdmslkmsdlkmclksmklcm");
            _context2.next = 4;
            return _shh.getSymKey(symKeyId);

          case 4:
            key = _context2.sent;

            console.log(key);
            console.log("klsdmslkmsdlkmclksmklcm");
            subscriptionOptions = {
              topics: topics,
              symKeyID: symKeyId,
              minPow: 0.8
            };
            message = _shh.subscribe('messages', subscriptionOptions, function (err, msg, sub) {
              if (err != null) {
                onError(err, sub);
              } else if (msg != null) {
                onMessage(msg, sub);
              }
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));

  return function (_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Generate symmetric key in OkeyDokey's whisper network.
 *
 * @param {string} password - Password to generate key.
 *    Same password can be used to generate the same key.
 * @return {String} symKeyId - Symmetric key Id.
 */
Whisper.prototype.generateKey = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(password) {
    var keyId;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _shh.generateSymKeyFromPassword(password);

          case 3:
            keyId = _context3.sent;
            return _context3.abrupt("return", keyId);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function (_x8) {
    return _ref3.apply(this, arguments);
  };
}();

// Whisper.prototype.addSymKey = function(symKey) {

//   var shh = this.web3.shh;

//   // return new Promise((resolve, reject) => {

//   return new Promise((resolve, reject) => {

//     console.log('(whisper.js) Symkey:', symKey)
//     shh.addSymKey(symKey).then(res => {
//       console.log(res);
//       resolve(res);
//     }).catch(err => {
//       console.log(err)
//     });
//   })
// }


// Whisper.prototype.makeMsgFilter = function(symKey) {

//   var shh = this.web3.shh;

//   // return new Promise((resolve, reject) => {

//   return new Promise((resolve, reject) => {
//     shh.newMessageFilter({
//       symKeyID: symKey, // encrypts using the sym key ID
//       topics: [config.topic]
//     }).then((filterId) => {
//       console.log("filter id = " + filterId);
//       resolve(filterId);
//     });
//   }).catch(console.log);
// }


// Whisper.prototype.useMsgFilter = function(filterId) {

//   var shh = this.web3.shh;
//   console.log("filter id using is " + filterId);

//   setInterval(() => {
//     shh.getFilterMessages(filterId).then(messages => {
//       for(let msg of messages) {
//         console.log("----------------THIS IS FILTERED MESSAGE-----------------");
//         console.log(msg);
//         console.log("--------------//THIS IS FILTERED MESSAGE//---------------");
//       }
//     });
//   }, 1000);
// }