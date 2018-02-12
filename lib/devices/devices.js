// devices.js

'use strict'; 

var _okdk;

module.exports = function(okdk) {
    return new Devices(okdk);
};

/**
 * Set up Transaction module.
 * @constructor
 * 
 * @param {Object} okdk - OKDk module instance.
 */
function Devices(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._devicesAddress;
    this.abi = _okdk.core._devicesAbi;
    this.contract = new _okdk._web3.eth.Contract(this.abi, this.address);
}