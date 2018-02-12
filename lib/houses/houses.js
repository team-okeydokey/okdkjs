// houses.js

'use strict'; 

var _okdk;

module.exports = function(okdk) {
    return new Houses(okdk);
};

/**
 * Set up Transaction module.
 * @constructor
 * 
 * @param {Object} okdk - OKDk module instance.
 */
function Houses(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._housesAddress;
    this.abi = _okdk.core._housesAbi;
    this.contract = new _okdk._web3.eth.Contract(this.abi, this.address);
}