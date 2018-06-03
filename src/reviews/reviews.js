// reviews.js

'use strict';

var _okdk;

module.exports = function(okdk) {
    return new Reviews(okdk);
};

/**
 * Set up Reviews module.
 * @constructor
 *
 * @param {Object} okdk - OKDk module instance.
 */
function Reviews(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._reviewsAddress;
    this.abi = _okdk.core._reviewsAbi;
    this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}
