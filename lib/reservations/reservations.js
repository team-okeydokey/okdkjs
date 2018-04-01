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

      // const fee = await this.calculateReservationFee(houseId, checkin, checkOut);
      let data = _okdk.web3.utils.asciiToHex("data")
      const result = await _okdk.token.approveAndCall(user, this.address, 500, data);

      if (result.success) {
          const reservationId = result.receipt.logs[1].data; // Catch reservation id from event.
          return parseInt(reservationId, 16);
      } else {
          return -1;
      }

    } catch (error) {
        console.log(error);
        return -1;
    }
};

/**
 * Wrapper for Reservations' getReservation method.
 *
 * @param {id} id - Id of the reservation to query.
 * @return {Promise} Promise that resolves to an
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

/**
 * Wrapper for Reservations' calculateReservationFee method.
 *
 * @param {int} checkIn - Time of check in, in seconds since UNIX epoch.
 * @param {int} checkOut - Time of check out, in seconds since UNIX epoch.
 * @param {int} hourlyRate - Hourly fee in KEY tokens.
 * @param {int} dailyRate - Daily fee in KEY tokens.
 * @param {int} utilityFee - Utility fee in KEY tokens.
 * @param {int} cleaningFee - Cleaning fee in KEY tokens.
 * @return {int} Total cost of reservation.
 */
Reservations.prototype.calculateReservationFee = async function(user) {

  const reservationFee = 
    await this.contract.methods.calculateReservationFee(
      checkIn, checkOut, hourlyRate, dailyRate, utilityFee, cleaningFee).call();

  return reservationFee;
};