// whisper.js

var _okdk;
var _ssh;

module.exports = function(okdk) {
    return new Whisper(okdk);
};

/**
 * Initialize whisper module.
 * @ignore
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
Whisper.prototype.post = async function(topic, message) {

    try {

    	var messageOptions = {
	      // symKeyID: symKey,
	      ttl: 20,
	      topic: topic,
	      payload: message,
	      powTime: 3,
	      powTarget: 0.5
	    }

        const success = await _shh.post(messageOptions);

        return success;

    } catch (error) {
        console.log(error);
    }
}

/**
 * Subscrice to a topic in OkeyDokey's whisper network.
 * 
 * @param {string} topic - Array of topics to subscribe to. A topic be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {function} onMessage - Callback function for message. Parameters should be (message, subscription).
 * @param {function} onError - Callback function for error. Parameters should be (error, subscription).
 */
Whisper.prototype.subscribe = async function(topics, onMessage, onError) {

    try {

    	var subscriptionOptions = {
	      // symKeyID: symKey,
      	  topics: topics
	    }

        const message = await _shh.subscribe(subscriptionOptions, (err, msg, sub) => {
        	if (err != null) { onError(error, sub); }
        	if (msg != null) { onMessage(msg, sub); }
        });

    } catch (error) {
        console.log(error);
    }
}
