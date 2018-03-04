// devices.js

'use strict'; 

var _okdk;

module.exports = function(okdk) {
    return new Devices(okdk);
};

/**
 * Set up Devices module.
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
 * @param {int} houseId - Id of the house to register device to.
 * @param {String} deviceAddr - Address of the device to register.
 * @param {int} deviceType - Type of device. (ex 0: doorlock, 1:...)
 * @param {String} name - Time of checkOut, in milliseconds since UNIX epoch.
 */
Devices.prototype.registerDevice = function(houseId, deviceAddr, deviceType, name) {
    var context = this;

    var user = _okdk.accounts[0];

    // Construct abi.
    var abi = this.contract.methods.registerDevice(houseId, deviceAddr, deviceType, name).encodeABI();

    // Call function.
    return new Promise((resolve, reject) => {
        _okdk.core.callContract(user, context.address, abi).then(() => {
            resolve("Device Registration complete.");
        }).catch(error => {
            console.log(error);
            reject("Device Registration failed.");
        });
    });
}

/**
 * Wrapper for Devices' getDeviceInfo method. 
 *
 * @param {addr} addr - Address of the device to register.
 * @return {Promise} reservationInfo - Promise that resolves to an JSON object containing info of the reservation.
 */

Devices.prototype.getDeviceInfo = function(addr) {
    var context = this;

    // Call function.
    return new Promise((resolve, reject) => {
       context.contract.methods.getDeviceInfo(addr).call().then(result => {

            var deviceJSON = {
                "success": result[0],
                "deviceAddr": result[1],
                "houseId": result[2],
                "deviceType": result[3],
                "name": result[4],
                "state": result[5]
            }

            resolve(deviceJSON);

        }).catch(error => {
            reject(error);
        });
    });
}
