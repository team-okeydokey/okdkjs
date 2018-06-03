// devices.js

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _okdk;

module.exports = function (okdk) {
    return new Devices(okdk);
};

/**
 * Set up Devices module.
 * @ignore
 * @constructor
 *
 * @param {Object} okdk - OKDk module instance.
 */
function Devices(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._devicesAddress;
    this.abi = _okdk.core._devicesAbi;
    this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}

/**
 * Wrapper for Devices' register method.
 *
 * @param {User} user - User instance of device.
 * @param {string} owner - Address of device owner.
 * @param {int} deviceType - Type of device. (ex 0: doorlock, 1:...)
 * @param {string} name - Time of checkOut, in milliseconds since UNIX epoch.
 */
Devices.prototype.register = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, owner, deviceType, name) {
        var encodedType, encodedName, abi, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        encodedType = _okdk.web3.utils.asciiToHex(deviceType);
                        encodedName = _okdk.web3.utils.asciiToHex(name);
                        abi = this.contract.methods.register(owner, encodedType, encodedName).encodeABI();
                        _context.next = 6;
                        return _okdk.core.callContract(user, this.address, abi);

                    case 6:
                        result = _context.sent;
                        return _context.abrupt('return', result);

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        return _context.abrupt('return', null);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 10]]);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Wrapper for Devices' addToHouse method.
 *
 * @param {User} user - Owner of the device.
 * @param {int} houseId - Id of the house to register device to.
 * @param {string} device - Address of the device to register.
 */
Devices.prototype.addToHouse = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, houseId, device) {
        var abi, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        abi = this.contract.methods.addToHouse(houseId, device).encodeABI();
                        _context2.next = 4;
                        return _okdk.core.callContract(user, this.address, abi);

                    case 4:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        console.log(_context2.t0);
                        return _context2.abrupt('return', null);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 8]]);
    }));

    return function (_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Wrapper for Devices' verifyGuest method.
 *
 * @param {User} device - User instance of device.
 * @param {string} guest - Guest address to verify.
 * @return {boolean} Whether the address is authorized to manipulate the device.
 */
Devices.prototype.verifyGuest = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(device, guest) {
        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return this.contract.methods.verifyGuest(guest).call({ from: device.getAddressString() });

                    case 3:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        console.log(_context3.t0);
                        return _context3.abrupt('return', false);

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 7]]);
    }));

    return function (_x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Wrapper for Devices' getDeviceInfo method.
 *
 * @param {addr} addr - Address of the device to register.
 * @return {Promise} reservationInfo - Promise that resolves to an JSON object containing info of the reservation.
 */

Devices.prototype.getDeviceInfo = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(addr) {
        var result, deviceJSON;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return this.contract.methods.getDeviceInfo(addr).call();

                    case 3:
                        result = _context4.sent;
                        deviceJSON = {
                            'success': result[0],
                            'deviceAddr': result[1],
                            'houseId': result[2],
                            'deviceType': result[3],
                            'name': result[4],
                            'state': result[5]
                        };
                        return _context4.abrupt('return', devicesJSON);

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

    return function (_x10) {
        return _ref4.apply(this, arguments);
    };
}();