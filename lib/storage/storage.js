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
Storage.prototype.uploadJSON = async function(data) {
    try {
        let host = _okdk.web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');
        let serialized = JSON.stringify(data);

        let options = {
              host: host,
              path: '/bzz-raw:',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
        };

        let request = http.request(options, (response) => {
            response.setEncoding('utf8');

            response.on('data', (chunk) => {
                console.log('JSON upload to Swarm complete.');
                return chunk;
            });

            response.on('error', (chunk) => {
                console.log('JSON upload to Swarm failed.');
                return null;
            });
        });

        request.write(serialized);
        request.end();
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Download JSON data from Swarm.
 *
 * @param {string} bzzHash - Swarm hash of JSON data.
 * @param {Promise} data - Promise that resolves to JSON stored in bzzHash.
 */
Storage.prototype.downloadJSON = async function(bzzHash) {
    try {
        let host = _okdk.web3.bzz.currentProvider.replace(/(^\w+:|^)\/\//, '');

        let options = {
              host: host,
              path: '/bzz-raw:/' + bzzHash,
              method: 'GET',
        };

        let request = http.request(options, (response) => {
            response.setEncoding('utf8');

            let body = '';

            response.on('data', (chunk) => {
                body += chunk;
            });

            response.on('end', () => {
                console.log('JSON download from Swarm complete.');
                let JSONResponse = JSON.parse(body);
                return JSONResponse;
            });

            response.on('error', (chunk) => {
                console.log('JSON download from Swarm failed.');
                return null;
            });
        });

        request.end();
    } catch (error) {
        console.log(error);
        return null;
    }
};
