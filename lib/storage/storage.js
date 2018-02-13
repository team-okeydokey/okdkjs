// storage.js

const https = require('https');

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

    var host = _okdk._web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');

    var serialized = JSON.stringify(data);

    return new Promise((resolve, reject) => {

        var options = {
              host: host,
              path: '/bzz-raw:',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
        };

        var request = http.request(options, response => {
            response.setEncoding('utf8');
            response.on('data', chunk => {
                console.log("JSON upload to Swarm complete.");
                resolve(chunk);
            });
            response.on('error', chunk => {
                console.log("JSON upload to Swarm failed.");
                reject();
            }); 
        });

        request.write(serialized);
        request.end();
    });
}

/**
 * Download JSON data from Swarm.
 * 
 * @param {string} bzzHash - Swarm hash of JSON data.
 * @param {Promise} data - Promise that resolves to JSON stored in bzzHash.
 */
Storage.prototype.downloadJSON = function(bzzHash) {

    var host = _okdk._web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');

    return new Promise((resolve, reject) => {

        var options = {
              host: host,
              path: '/bzz-raw:' + bzzHash,
              method: 'GET'
        };

        var request = http.request(options, response => {
            response.setEncoding('utf8');
            response.on('data', chunk => {
                console.log("JSON download from Swarm complete.");
                resolve(chunk);
            });
            response.on('error', chunk => {
                console.log("JSON download from Swarm failed.");
                reject();
            }); 
        });

        request.end();
    });
}