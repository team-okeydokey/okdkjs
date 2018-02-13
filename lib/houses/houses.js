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
 * Create house listing with supplied information.
 *
 * Handles Swarm upload and transaction to Houses contract. 
 *
 * @param {Object} houseJSON - JSON object containing house info.
 * @return {Promise} newHouseId - Promise that resolves to id of the new house.
 */
Houses.prototype.createListings = function(houseName, hostName, 
    addrFull, addrSummary, addrDirection, description, 
    numGuest, numBedroom, numBed, numBathroom,
    hourlyRate, dailyRate, utilityFee, cleaningFee,
    latitude, longitude, housePolicy, cancellationPolicy,
    amenities, houseImageHashes, houseType) {

    // var context = this;

    // context.uploadHouseToSwarm();

    // context.registerHouse();

}

/**
 * Wrapper for Houses' registerHouse method. 
 *
 * @param {string} bzzHash - Swarm hash of JSON file containing house info.
 * @param {string} latitude - The lattitude of the house, multiplied by 1 million.
 * @param {string} longitude - The longitude of the house, multiplied by 1 million.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Houses.prototype.registerHouse = function(ipfsHash, latitude, longitude) {
    var context = this;
    
    var user = _okdk.accounts[0];
    var bytesHash = _okdk._web3.utils.asciiToHex(ipfsHash);

    // Construct abi.
    var convertedLatitude = latitude * 1000000000;
    var convertedLongitude = latitude * 1000000000;
    var abi = this.contract.methods.registerHouse(bytesHash, 
              convertedLatitude, convertedLongitude).encodeABI();

    // Call function.
    return new Promise((resolve, reject) => {
        _okdk.core.callContract(user, context.address, abi).then(() => {
            resolve("House registration complete.");
        }).catch(() => {
            reject("House registration failed.");
        });
    });
}

/**
 * Upload house JSON file to Swarm. 
 *
 * @param {Object} houseJSON - JSON object containing house info.
 * @return {Promise} bzzHash - Promise that resolves to id of the new house.
 */
Houses.prototype.uploadHouseToSwarm = function(houseJSON) {

    return new Promise((resolve, reject) => {
        _okdk.storage.uploadJSON(houseJSON).then(bzzHash => {
            console.log("House JSON upload to swarm complete.");
            resolve(bzzHash);
        }).catch(error => {
            console.log("House JSON download to swarm complete.");
            reject(error);
        });
    });
}