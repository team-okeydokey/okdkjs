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
Houses.prototype.createListing = function(houseName, hostName, 
    addrFull, addrSummary, addrDirection, description, 
    numGuest, numBedroom, numBed, numBathroom,
    hourlyRate, dailyRate, utilityFee, cleaningFee,
    latitude, longitude, housePolicy, cancellationPolicy,
    amenities, houseImageHashes, houseType) {

    var context = this;

    var houseJSON = {
        "houseName": houseName,
        "hostName": hostName,
        "addrFull": addrFull,
        "addrSummary": addrSummary,
        "addrDirection": addrDirection,
        "description": description,
        "numGuest": numGuest,
        "numBedroom": numBedroom,
        "numBed": numBed,
        "numBathroom": numBathroom,
        "hourlyRate": hourlyRate,
        "dailyRate": dailyRate,
        "utilityFee": utilityFee,
        "cleaningFee": cleaningFee,
        "latitude": latitude,
        "longitude": longitude,
        "housePolicy": housePolicy,
        "cancellationPolicy": cancellationPolicy,
        "amenities": amenities,
        "houseImageHashes": houseImageHashes, 
        "houseType": houseType
    }

    var gridId = _okdk.utils.getGridId(latitude, longitude);

    return new Promise((resolve, reject) => {

        context.uploadHouseToSwarm(houseJSON).then(bzzHash => {
            return context.registerHouse(bzzHash, gridId)
                .then(result => {
                    resolve(result);
                });
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * Wrapper for Houses' registerHouse method. 
 *
 * @param {string} bzzHash - Swarm hash of JSON file containing house info.
 * @param {int} gridId - Id within the Earth's grid.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Houses.prototype.registerHouse = function(bzzHash, gridId) {
    var context = this;
    
    var user = _okdk.accounts[0];
    var bytesHash = _okdk._web3.utils.asciiToHex(bzzHash);

    // Construct abi.
    var abi = this.contract.methods.registerHouse(bytesHash,gridId).encodeABI();

    // Call function.
    return new Promise((resolve, reject) => {
        _okdk.core.callContract(user, context.address, abi).then(() => {
            resolve("House registration complete.");
        }).catch(error => {
            console.log(error);
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

/**
 * Wrapper for Houses' getHouseInfo method. 
 *
 * @param {id} id - Id of the house to query.
 * @return {Promise} newId - Promise that resolves to an JSON object containing info of the house.
 */
Houses.prototype.getHouseInfo = function(id) {
    var context = this;

    // Call function.
    return new Promise((resolve, reject) => {
       context.contract.methods.getHouseInfo(id).call().then(result => {

            var houseJSON = {
                "success": result[0],
                "id": result[1],
                "bzzHash": result[2],
                "host": result[3],
                "active": result[4]
            }

            resolve(houseJSON);

        }).catch(error => {
            reject(error);
        });
    });
}