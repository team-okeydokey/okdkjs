'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// storage.js

var https = require('https');

var _okdk;

module.exports = function (okdk) {
    return new Storage(okdk);
};

/**
 * Initialize storage module.
 * @constructor
 *
 * @param {Object} okdk - OkeyDokey module instance.
 */
function Storage(okdk) {
    _okdk = okdk;
}

/**
 * Upload JSON data to Swarm.
 *
 * @param {Object} data - JSON data to upload.
 * @param {Promise} bzzHash - Promise that resolves to Swarm hash of stored JSON data.
 */
Storage.prototype.uploadJSON = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var host, serialized, options, request;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        host = _okdk.web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');
                        serialized = JSON.stringify(data);
                        options = {
                            host: host,
                            path: '/bzz-raw:',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        request = https.request(options, function (response) {
                            response.setEncoding('utf8');

                            response.on('data', function (chunk) {
                                console.log('JSON upload to Swarm complete.');
                                return chunk;
                            });

                            response.on('error', function (chunk) {
                                console.log('JSON upload to Swarm failed.');
                                return null;
                            });
                        });


                        request.write(serialized);
                        request.end();
                        _context.next = 13;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        return _context.abrupt('return', null);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 9]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Download JSON data from Swarm.
 *
 * @param {string} bzzHash - Swarm hash of JSON data.
 * @param {Promise} data - Promise that resolves to JSON stored in bzzHash.
 */
Storage.prototype.downloadJSON = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(bzzHash) {
        var host, options, request;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        host = _okdk.web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');
                        options = {
                            host: host,
                            path: '/bzz-raw:/' + bzzHash,
                            method: 'GET'
                        };
                        request = https.request(options, function (response) {
                            response.setEncoding('utf8');

                            var body = '';

                            response.on('data', function (chunk) {
                                body += chunk;
                            });

                            response.on('end', function () {
                                console.log('JSON download from Swarm complete.');
                                var JSONResponse = JSON.parse(body);
                                return JSONResponse;
                            });

                            response.on('error', function (chunk) {
                                console.log('JSON download from Swarm failed.');
                                return null;
                            });
                        });


                        request.end();
                        _context2.next = 11;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        console.log(_context2.t0);
                        return _context2.abrupt('return', null);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 7]]);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}();