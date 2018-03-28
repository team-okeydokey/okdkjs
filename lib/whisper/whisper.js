// whisper.js

var _okdk;
var _ssh;

module.exports = function(okdk) {
    return new Whisper(okdk);
};

/**
 * Initialize whisper module.
 * @constructor
 * 
 * @param {Object} okdk - OkeyDokey module instance.
 */
function Whisper(okdk) {
    _okdk = okdk;
    _ssh = okdk.web3.ssh;
}

/**
 * Send message to OkeyDokey's whisper network.
 * 
 * @param {string} topic - Topic recipients can subscribe to. Must be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {string} message - Message to post.
 * @return {boolean} success - Whether the message was successfully posted.
 */
Storage.prototype.post = async function(topic, message) {

    try {

    	var messageObject = {
	      symKeyID: symKey,
	      ttl: 20,
	      topic: topic,
	      payload: message,
	      powTime: 3,
	      powTarget: 0.5
	    }

        const success = await _shh.post();

        return success;

    } catch (error) {
        console.log(error);
    }
}
