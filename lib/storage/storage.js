// storage.js

var _okdk;

module.exports = function(okdk) {
    return new Storage(okdk);
};

/**
 * Initialize storage module.
 * @constructor
 * 
 * @param {Object} okdk - OkeyDokey module instance.
 */
function Storage(okdk) {
	_okdk = okdk;
}

/**
 * Upload JSON data to Swarm.
 * 
 * @param {Object} data - JSON data to upload.
 * @param {Promise} bzzHash - Promise that resolves to Swarm hash of stored JSON data.
 */
Storage.prototype.uploadJSON = function(data) {

	var serialized = Buffer.from(JSON.stringify(data));

	return new Promise((resolve, reject) => {
        _okdk._web3.bzz.upload(serialized).then(bzzHash => {
        	console.log("JSON upload to Swarm complete.");
            resolve(bzzHash);
        }).catch(() => {
            console.log("JSON upload to Swarm failed.");
            reject();
        });
    });
}

/**
 * Download JSON data from Swarm.
 * 
 * @param {string} bzzHash - Swarm hash of JSON data.
 * @param {Promise} data - Promise that resolves to JSON stored in bzzHash.
 */
Storage.prototype.downloadJSON = function(bzzHash) {

	return new Promise((resolve, reject) => {
        _okdk._web3.bzz.download(bzzHash).then(data => {
        	console.log("JSON download from Swarm complete.");
        	console.log(data.toString());
            resolve(data);
        }).catch(() => {
            console.log("JSON download from Swarm failed.");
            reject();
        });
    });
}