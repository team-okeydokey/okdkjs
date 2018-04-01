// houses.js

'use strict';

var _okdk;

module.exports = function(okdk) {
  return new Houses(okdk);
};

/**
 * Set up Houses module.
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
 * @return {int} newHouseId - Id of the new house.
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

    const newId = await this.registerHouse(user, bzzHash, gridId, 
      hourlyRate, dailyRate, utilityFee, cleaningFee);

    return newId;

  } catch (error) {
    console.log(error);
    return -1;
  }
};

/**
 * Wrapper for Houses' registerHouse method.
 *
 * @param {User} user - User instance of host.
 * @param {string} bzzHash - Swarm hash of JSON file containing house info.
 * @param {int} gridId - Id within the Earth's grid.
 * @param {int} hourlyRate - Hourly fee in KEY tokens.
 * @param {int} dailyRate - Daily fee in KEY tokens.
 * @param {int} utilityFee - Utility fee in KEY tokens.
 * @param {int} cleaningFee - Cleaning fee in KEY tokens.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Houses.prototype.registerHouse = async function(user, bzzHash, gridId, 
  hourlyRate, dailyRate, utilityFee, cleaningFee) {

  try {

    let bytesHash = _okdk.web3.utils.asciiToHex(bzzHash);

    // Construct abi.
    let callData =
      this.contract.methods.registerHouse(bytesHash, gridId, 
        hourlyRate, dailyRate, utilityFee, cleaningFee).encodeABI();

    const result =
      await _okdk.core.callContract(user, this.address, callData);

    if (result.success) {
      const houseId = result.receipt.logs[0].data; // Catch house id from event.  
      return parseInt(houseId, 16);
    } else {
      return -1;
    }

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
 * @return {Promise} houseInfo - Promise that resolves to an
 *    JSON object containing info of the house.
 */
Houses.prototype.getHouseInfo = async function(id) {
  try {
    const result = await this.contract.methods.getHouseInfo(id).call();

    let houseJSON = {
      'id': result[0],
      'bzzHash': result[1],
      'host': result[2],
      'hourlyRate' : result[3],
      'dailyRate' : result[4],
      'utilityFee' : result[5],
      'cleaningFee' : result[6],
      'active': result[7],
    };

    return houseJSON;

  } catch (error) {
    console.log(error);
    return null;
  }
};
