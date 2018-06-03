// reservations.js

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _okdk;

module.exports = function (okdk) {
    return new Reservations(okdk);
};

/**
 * Set up Reservations module.
 * @constructor
 *
 * @param {Object} okdk - OKDk module instance.
 */
function Reservations(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._reservationsAddress;
    this.abi = _okdk.core._reservationsAbi;
    this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}

/**
 * Wrapper for Reservations' reserve method.
 *
 * @param {User} user - User instance of reserver.
 * @param {int} houseId - Id of the house to reserve.
 * @param {int} checkIn - Time of checkin, in seconds since UNIX epoch.
 * @param {int} checkOut - Time of checkOut, in seconds since UNIX epoch.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Reservations.prototype.reserve = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, houseId, checkIn, checkOut) {
        var data, result, reservationId;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;


                        // const fee = await this.calculateReservationFee(houseId, checkin, checkOut);
                        data = _okdk.web3.utils.asciiToHex("data");
                        _context.next = 4;
                        return _okdk.token.approveAndCall(user, this.address, 500, data);

                    case 4:
                        result = _context.sent;

                        if (!result.success) {
                            _context.next = 10;
                            break;
                        }

                        reservationId = result.receipt.logs[1].data; // Catch reservation id from event.

                        return _context.abrupt('return', parseInt(reservationId, 16));

                    case 10:
                        return _context.abrupt('return', -1);

                    case 11:
                        _context.next = 17;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        return _context.abrupt('return', -1);

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 13]]);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Wrapper for Reservations' getReservation method.
 *
 * @param {id} id - Id of the reservation to query.
 * @return {Promise} Promise that resolves to an
 *    JSON object containing info of the reservation.
 */
Reservations.prototype.getReservationInfo = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        var result, reservationJSON;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return this.contract.methods.getReservationInfo(id).call();

                    case 3:
                        result = _context2.sent;
                        reservationJSON = {
                            'id': result[1],
                            'houseId': result[2],
                            'reservationCode': result[3],
                            'host': result[4],
                            'reserver': result[5],
                            'checkIn': result[6],
                            'checkOut': result[7],
                            'status': result[8]
                        };
                        return _context2.abrupt('return', reservationJSON);

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

    return function (_x5) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Wrapper for Reservations' calculateReservationFee method.
 *
 * @param {int} checkIn - Time of check in, in seconds since UNIX epoch.
 * @param {int} checkOut - Time of check out, in seconds since UNIX epoch.
 * @param {int} hourlyRate - Hourly fee in KEY tokens.
 * @param {int} dailyRate - Daily fee in KEY tokens.
 * @param {int} utilityFee - Utility fee in KEY tokens.
 * @param {int} cleaningFee - Cleaning fee in KEY tokens.
 * @return {int} Total cost of reservation.
 */
Reservations.prototype.calculateReservationFee = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(user) {
        var reservationFee;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return this.contract.methods.calculateReservationFee(checkIn, checkOut, hourlyRate, dailyRate, utilityFee, cleaningFee).call();

                    case 2:
                        reservationFee = _context3.sent;
                        return _context3.abrupt('return', reservationFee);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x6) {
        return _ref3.apply(this, arguments);
    };
}();