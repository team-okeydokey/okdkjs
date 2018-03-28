// devices.js

'use strict'; 

var _okdk;

module.exports = function(okdk) {
    return new Devices(okdk);
};

/**
 * Set up Devices module.
 * @ignore
 * @constructor
 * 
 * @param {Object} okdk - OKDk module instance.
 */
function Devices(okdk) {
    _okdk = okdk;

    /* Load abi & address */
    this.address = _okdk.core._devicesAddress;
    this.abi = _okdk.core._devicesAbi;
    this.contract = new _okdk.web3.eth.Contract(this.abi, this.address);
}

/**
 * Wrapper for Devices' registerDevice method. 
 *
 * @param {User} user - Owner of the device.
 * @param {int} houseId - Id of the house to register device to.
 * @param {String} deviceAddr - Address of the device to register.
 * @param {int} deviceType - Type of device. (ex 0: doorlock, 1:...)
 * @param {String} name - Time of checkOut, in milliseconds since UNIX epoch.
 */
Devices.prototype.registerDevice = async function(user, houseId, deviceAddr, deviceType, name) {

    try {

        var abi = this.contract.methods.registerDevice(houseId, deviceAddr, deviceType, name).encodeABI();

        const result = await _okdk.core.callContract(user, context.address, abi);
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Wrapper for Devices' getDeviceInfo method. 
 *
 * @param {addr} addr - Address of the device to register.
 * @return {Promise} reservationInfo - Promise that resolves to an JSON object containing info of the reservation.
 */

Devices.prototype.getDeviceInfo = async function(addr) {

    try {

        const result = await this.contract.methods.getDeviceInfo(addr).call();
        var deviceJSON = {
            "success": result[0],
            "deviceAddr": result[1],
            "houseId": result[2],
            "deviceType": result[3],
            "name": result[4],
            "state": result[5]
        };

        return devicesJSON;

    } catch (error) {
        console.log(error);
        return null;
    }
}
