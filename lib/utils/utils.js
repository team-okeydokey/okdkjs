"use strict";

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

// utils.js

var fs = require('fs');

var okdk;

var Utils = function () {

  /**
   * Initialize utility module.
   * @constructor
   *
   * @param {Object} okdk - OkeyDokey module instance.
   */
  function Utils(_okdk) {
    (0, _classCallCheck3.default)(this, Utils);

    okdk = _okdk;
  }

  /**
   * Create byte array from string.
   *
   * @param {string} string - String to convert to byte array.
   * @return {byte[]} Converted byte array.
   */


  (0, _createClass3.default)(Utils, [{
    key: "stringToByteArray",
    value: function stringToByteArray(string) {
      var utf8 = unescape(encodeURIComponent(string));

      var array = [];
      for (var i = 0; i < utf8.length; i++) {
        array.push(utf8.charCodeAt(i));
      }

      return array;
    }
  }, {
    key: "getGridId",


    /**
     * Calculate grid id from latitude and longitude.
     *
     * @param {int} latitude - Latitude of coordinate.
     * @param {int} longitude - Longitude of coordinate.
     * @return {int} gridId - Id within the Earth's grid.
     */
    value: function getGridId(latitude, longitude) {
      return 0;
    }
  }, {
    key: "hexToString",


    /**
     * Convert hex to string.
     *
     * @param {string} hex - Hex value to convert to string.
     * @return {string} String value.
     */
    value: function hexToString(hex) {
      var string = "";

      for (var i = 2; i < hex.length; i += 2) {
        var n = parseInt(hex.slice(i, i + 2), 16);
        string += String.fromCharCode(n);
      }

      return string;
    }

    /**
     * Convert string to hex value.
     *
     * @param {string} string - String to convert to hex.
     * @return {string} Hex encoded value.
     */

  }, {
    key: "stringToHex",
    value: function stringToHex(string) {
      var hexVal = "0x";

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;

          hexVal += c.charCodeAt(0).toString(16);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return hexVal;
    }

    /**
     * Shave off '0x' prefix from eth address.
     *
     * @param {string} _address - Address string with leading '0x'.
     * @return {string} Address string without leading '0x'.
     */

  }, {
    key: "shaveAddressPrefix",
    value: function shaveAddressPrefix(_address) {
      if (!okdk.web3.utils.isAddress(_address)) {
        throw 'Address invalid.';
      }
      return _address.slice(2);
    }

    /**
     * Add '0x' prefix to eth address.
     *
     * @param {string} _address - Address string without leading '0x'.
     * @return {string} Address string with leading '0x'.
     */

  }, {
    key: "addAddressPrefix",
    value: function addAddressPrefix(_address) {
      if (!okdk.web3.utils.isAddress(_address)) {
        throw 'Address invalid.';
      }
      return '0x' + _address;
    }

    /**
     * Create new random account.
     *
     * @return {Object} Account object, containing address, privateKey, etc.
     */

  }, {
    key: "generateAccount",
    value: function generateAccount() {
      return okdk.web3.eth.accounts.create();
    }

    /** 
     * Load json file into JSON object.
     *
     * @param {string} _path - Path to of json file.
     * @return {Object} JSON object written in file.
     */

  }, {
    key: "loadJSON",
    value: function loadJSON(_path) {
      delete require.cache[require.resolve(_path)];
      var json = require(_path);
      return json;
    }

    /** 
     * Update json file.
     *
     * @param {string} _path - Path to of json file.
     * @param {string} _key - Key to edit.
     * @param {int} _value - Value to be assigned to key.
     * @return {boolean} True if value was replaced.
     */

  }, {
    key: "updateJSON",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_path, _key, _value) {
        var json;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                json = this.loadJSON(_path);


                json[_key] = _value;

                return _context.abrupt("return", new Promise(function (resolve, reject) {

                  fs.writeFile(_path, JSON.stringify(json), function (error) {
                    if (error) {
                      throw error;
                      reject();
                    }
                    resolve();
                  });
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateJSON(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return updateJSON;
    }()

    /** 
     * Create a library address placeholder string the same way as the solc compiler.
     *
     * A linker placeholder is a 40 character long string that 
     * starts and ends with '__' (two underscores).
     * If the name of the library is too short, 
     * the string will be padded with underscores.
     * If it is too long, the name will be truncated.
     * Refer to CommandLineInterface::link() of solc source code.
     * Example: __LibName_______________________________
     *
     * @param {string} _libraryName - Name of library.
     * @return {string} Formatted placeholder for solc linker.
     */

  }, {
    key: "getLinkerPlaceholder",
    value: function getLinkerPlaceholder(_libraryName) {

      var placeholder = "__";

      // Embed library name.
      for (var i = 0; i < _libraryName.length && i < 36; i++) {
        placeholder += _libraryName[i];
      }

      // Add trailing underscores.
      for (var i = 0; i < 38 - _libraryName.length || i < 2; i++) {
        placeholder += '_';
      }

      return placeholder;
    }
  }]);
  return Utils;
}();

exports.default = Utils;
module.exports = exports["default"];