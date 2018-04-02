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
 * Wrapper for Devices' register method.
 *
 * @param {User} user - User instance of device.
 * @param {string} owner - Address of device owner.
 * @param {int} deviceType - Type of device. (ex 0: doorlock, 1:...)
 * @param {string} name - Time of checkOut, in milliseconds since UNIX epoch.
 */
Devices.prototype.register = async function(user, owner, deviceType, name) {
    try {

        const encodedType = _okdk.web3.utils.asciiToHex(deviceType);
        const encodedName = _okdk.web3.utils.asciiToHex(name);

        let abi = this.contract.methods.register(
            owner, encodedType, encodedName).encodeABI();

        const result = await _okdk.core.callContract(user, this.address, abi);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Wrapper for Devices' addToHouse method.
 *
 * @param {User} user - Owner of the device.
 * @param {int} houseId - Id of the house to register device to.
 * @param {string} device - Address of the device to register.
 */
Devices.prototype.addToHouse = async function(user, houseId, device) {
    try {
        let abi = this.contract.methods.addToHouse(houseId, device).encodeABI();

        const result = await _okdk.core.callContract(user, this.address, abi);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Wrapper for Devices' verifyGuest method.
 *
 * @param {User} device - User instance of device.
 * @param {string} guest - Guest address to verify.
 * @return {boolean} Whether the address is authorized to manipulate the device.
 */
Devices.prototype.verifyGuest = async function(device, guest) {
    try {

        const result = await this.contract.methods.verifyGuest(guest).call(
            {from: device.getAddressString()});
        
        return result;

    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 * Wrapper for Devices' getDeviceInfo method.
 *
 * @param {addr} addr - Address of the device to register.
 * @return {Promise} reservationInfo - Promise that resolves to an JSON object containing info of the reservation.
 */

Devices.prototype.getDeviceInfo = async function(addr) {
    try {
        const result = await this.contract.methods.getDeviceInfo(addr).call();
        let deviceJSON = {
            'success': result[0],
            'deviceAddr': result[1],
            'houseId': result[2],
            'deviceType': result[3],
            'name': result[4],
            'state': result[5],
        };

        return devicesJSON;
    } catch (error) {
        console.log(error);
        return null;
    }
};
