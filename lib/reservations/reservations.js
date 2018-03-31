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
 * @param {User} user - User instance of reserver.
 * @param {int} houseId - Id of the house to reserve.
 * @param {int} checkIn - Time of checkin, in seconds since UNIX epoch.
 * @param {int} checkOut - Time of checkOut, in seconds since UNIX epoch.
 * @return {Promise} newId - Promise that resolves to id of the new house.
 */
Reservations.prototype.reserve = async function(user, houseId, checkIn, checkOut) {
    try {
        // Construct abi.
        let abi = this.contract.methods.reserve(houseId, checkIn, checkOut).encodeABI();

        const result = await _okdk.core.callContract(user, this.address, abi);

        if (result.success) {
            const reservationId = result.receipt.logs[0].data; // Catch reservation id from event.
            return parseInt(reservationId, 16);
        } else {
            return -1;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Wrapper for Reservations' getReservation method.
 *
 * @param {id} id - Id of the reservation to query.
 * @return {Promise} reservationInfo - Promise that resolves to an
 *    JSON object containing info of the reservation.
 */
Reservations.prototype.getReservationInfo = async function(id) {
    try {
        const result = await this.contract.methods.getReservationInfo(id).call();

        let reservationJSON = {
                'id': result[1],
                'houseId': result[2],
                'reservationCode': result[3],
                'host': result[4],
                'reserver': result[5],
                'checkIn': result[6],
                'checkOut': result[7],
                'status': result[8],
        };
        return reservationJSON;
    } catch (error) {
        console.log(error);
        return null;
    }
};
