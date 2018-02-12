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

/**
 * Wrapper for Houses' registerHouse method. 
 *
 * @param {string} ipfsHash - Ipfs identifier of JSON file containing house info.
 * @param {string} latitude - The lattitude of the house, multiplied by 1 million.
 * @param {string} longitude - The longitude of the house, multiplied by 1 million.
 * @return {boolean} success - Registration succeeded.
 * @return {int} houseId - Id of the new house.
 */
Houses.prototype.registerHouse = function(ipfsHash, latitude, longitude) {
    var user = _okdk.accounts[0];

    // Construct abi.
    var convertedLatitude = latitude * 1000000000;
    var convertedLongitude = latitude * 1000000000;
    var abi = this.contract.methods.registerHouse(ipfsHash, 
              convertedLatitude, convertedLongitude).encodeABI();

    // Call function.
    _okdk.core.callContract(user, abi, this.address);
}