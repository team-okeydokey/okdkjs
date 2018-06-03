// houses.js

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _okdk;

module.exports = function (okdk) {
  return new Houses(okdk);
};

/**
 * Set up Houses module.
 * @constructor
 *
 * @param {Object} okdk - OKDk module instance.
 */
function Houses(okdk) {
  _okdk = okdk;

  /* Load abi & address */
  this.address = _okdk.core._housesAddress;
  this.abi = _okdk.core._housesAbi;
  this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}

/**
 * Create house listing with supplied information.
 *
 * Handles Swarm upload and transaction to Houses contract.
 *
 * @param {User} user - User instance of host.
 * @param {Object} houseJSON - JSON object containing house info.
 * @return {int} newHouseId - Id of the new house.
 */
Houses.prototype.createListing = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, houseName, hostName, addrFull, addrSummary, addrDirection, description, numGuest, numBedroom, numBed, numBathroom, hourlyRate, dailyRate, utilityFee, cleaningFee, latitude, longitude, housePolicy, cancellationPolicy, amenities, houseImageHashes, houseType) {
    var houseJSON, gridId, bzzHash, newId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            houseJSON = {
              'houseName': houseName,
              'hostName': hostName,
              'addrFull': addrFull,
              'addrSummary': addrSummary,
              'addrDirection': addrDirection,
              'description': description,
              'numGuest': numGuest,
              'numBedroom': numBedroom,
              'numBed': numBed,
              'numBathroom': numBathroom,
              'latitude': latitude,
              'longitude': longitude,
              'housePolicy': housePolicy,
              'cancellationPolicy': cancellationPolicy,
              'amenities': amenities,
              'houseImageHashes': houseImageHashes,
              'houseType': houseType
            };
            gridId = _okdk.utils.getGridId(latitude, longitude);
            _context.next = 5;
            return this.uploadHouseToSwarm(houseJSON);

          case 5:
            bzzHash = _context.sent;
            _context.next = 8;
            return this.registerHouse(user, bzzHash, gridId, hourlyRate, dailyRate, utilityFee, cleaningFee);

          case 8:
            newId = _context.sent;
            return _context.abrupt('return', newId);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', -1);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function (_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Wrapper for Houses' registerHouse method.
 *
 * @param {User} user - User instance of host.
 * @param {string} bzzHash - Swarm hash of JSON file containing house info.
 * @param {int} gridId - Id within the Earth's grid.
 * @param {int} hourlyRate - Hourly fee in KEY tokens.
 * @param {int} dailyRate - Daily fee in KEY tokens.
 * @param {int} utilityFee - Utility fee in KEY tokens.
 * @param {int} cleaningFee - Cleaning fee in KEY tokens.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Houses.prototype.registerHouse = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, bzzHash, gridId, hourlyRate, dailyRate, utilityFee, cleaningFee) {
    var bytesHash, callData, result, houseId;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            bytesHash = _okdk.web3.utils.asciiToHex(bzzHash);

            // Construct abi.

            callData = this.contract.methods.registerHouse(bytesHash, gridId, hourlyRate, dailyRate, utilityFee, cleaningFee).encodeABI();
            _context2.next = 5;
            return _okdk.core.callContract(user, this.address, callData);

          case 5:
            result = _context2.sent;

            if (!result.success) {
              _context2.next = 11;
              break;
            }

            houseId = result.receipt.logs[0].data; // Catch house id from event.  

            return _context2.abrupt('return', parseInt(houseId, 16));

          case 11:
            return _context2.abrupt('return', -1);

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            return _context2.abrupt('return', null);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 14]]);
  }));

  return function (_x23, _x24, _x25, _x26, _x27, _x28, _x29) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Upload house JSON file to Swarm.
 *
 * @param {Object} houseJSON - JSON object containing house info.
 * @return {Promise} bzzHash - Promise that resolves to id of the new house.
 */
Houses.prototype.uploadHouseToSwarm = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(houseJSON) {
    var bzzHash;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _okdk.storage.uploadJSON(houseJSON);

          case 3:
            bzzHash = _context3.sent;

            console.log('House JSON upload to swarm complete.');
            return _context3.abrupt('return', bzzHash);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            return _context3.abrupt('return', null);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 8]]);
  }));

  return function (_x30) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Wrapper for Houses' getHouseInfo method.
 *
 * @param {id} id - Id of the house to query.
 * @return {Promise} houseInfo - Promise that resolves to an
 *    JSON object containing info of the house.
 */
Houses.prototype.getHouseInfo = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
    var result, houseJSON;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return this.contract.methods.getHouseInfo(id).call();

          case 3:
            result = _context4.sent;
            houseJSON = {
              'id': result[0],
              'bzzHash': result[1],
              'host': result[2],
              'hourlyRate': result[3],
              'dailyRate': result[4],
              'utilityFee': result[5],
              'cleaningFee': result[6],
              'active': result[7]
            };
            return _context4.abrupt('return', houseJSON);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);
            return _context4.abrupt('return', null);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 8]]);
  }));

  return function (_x31) {
    return _ref4.apply(this, arguments);
  };
}();