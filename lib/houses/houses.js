// houses.js

'use strict';

var _okdk;

module.exports = function(okdk) {
    return new Houses(okdk);
};

/**
 * Set up Houses module.
 * @ignore
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
 * @return {Promise} newHouseId - Promise that resolves to id of the new house.
 */
Houses.prototype.createListing = async function(user, houseName, hostName,
    addrFull, addrSummary, addrDirection, description,
    numGuest, numBedroom, numBed, numBathroom,
    hourlyRate, dailyRate, utilityFee, cleaningFee,
    latitude, longitude, housePolicy, cancellationPolicy,
    amenities, houseImageHashes, houseType) {
    try {
        let context = this;

        let houseJSON = {
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
            'hourlyRate': hourlyRate,
            'dailyRate': dailyRate,
            'utilityFee': utilityFee,
            'cleaningFee': cleaningFee,
            'latitude': latitude,
            'longitude': longitude,
            'housePolicy': housePolicy,
            'cancellationPolicy': cancellationPolicy,
            'amenities': amenities,
            'houseImageHashes': houseImageHashes,
            'houseType': houseType,
        };

        let gridId = _okdk.utils.getGridId(latitude, longitude);

        const bzzHash = await this.uploadHouseToSwarm(houseJSON);

        const newId = await this.registerHouse(user, bzzHash, gridId);

        return newId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Wrapper for Houses' registerHouse method.
 *
 * @param {User} user - User instance of host.
 * @param {string} bzzHash - Swarm hash of JSON file containing house info.
 * @param {int} gridId - Id within the Earth's grid.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Houses.prototype.registerHouse = async function(user, bzzHash, gridId) {
    try {
        let bytesHash = _okdk.web3.utils.asciiToHex(bzzHash);

        // Construct abi.
        let callData = this.contract.methods.registerHouse(bytesHash, gridId).encodeABI();

        const result = await _okdk.core.callContract(user, this.address, callData);

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Upload house JSON file to Swarm.
 *
 * @param {Object} houseJSON - JSON object containing house info.
 * @return {Promise} bzzHash - Promise that resolves to id of the new house.
 */
Houses.prototype.uploadHouseToSwarm = async function(houseJSON) {
    try {
        const bzzHash = await _okdk.storage.uploadJSON(houseJSON);
        console.log('House JSON upload to swarm complete.');
        return bzzHash;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Wrapper for Houses' getHouseInfo method.
 *
 * @param {id} id - Id of the house to query.
 * @return {Promise} houseInfo - Promise that resolves to an JSON object containing info of the house.
 */
Houses.prototype.getHouseInfo = async function(id) {
    try {
        const result = await this.contract.methods.getHouseInfo(id).call();

        let houseJSON = {
            'success': result[0],
            'id': result[1],
            'bzzHash': result[2],
            'host': result[3],
            'active': result[4],
        };

        return houseJSON;
    } catch (error) {
        console.log(error);
        return null;
    }
};
