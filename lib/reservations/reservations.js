// reservations.js

'use strict'; 

var _okdk;

module.exports = function(okdk) {
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
 * @param {int} houseId - Id of the house to reserve.
 * @param {int} checkIn - Time of checkin, in milliseconds since UNIX epoch.
 * @param {int} checkOut - Time of checkOut, in milliseconds since UNIX epoch.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Reservations.prototype.reserve = async function(user, houseId, checkIn, checkOut) {

    try {

        // Construct abi.
        var abi = this.contract.methods.reserve(houseId, checkIn, checkOut).encodeABI();

        const result = await _okdk.core.callContract(user, context.address, abi);
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Wrapper for Reservations' getReservation method. 
 *
 * @param {id} id - Id of the reservation to query.
 * @return {Promise} reservationInfo - Promise that resolves to an JSON object containing info of the reservation.
 */
Reservations.prototype.getReservationInfo = async function(id) {
    try {

        const result = await this.contract.methods.getReservationInfo(id).call();

        var reservationJSON = {
                "id": result[0],
                "houseId": result[1],
                "reservationCode": result[2],
                "host": result[3],
                "reserver": result[4],
                "guests": result[5],
                "checkIn": result[6],
                "checkOut": result[7],
                "status": result[8]
        }
        return reservationJSON;

    } catch (error) {
        console.log(error);
        return null;
    }
}