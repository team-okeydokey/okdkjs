// whisper.js

var _okdk;
var _shh;

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
    _shh = okdk.web3.shh;
}

/**
 * Send message to OkeyDokey's whisper network.
 *
 * @param {string} topic - Topic recipients can subscribe to.
 *    Must be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {string} symKeyId - Symmetric key id.
 *    Symmetric key id to listen to specific messages (e.g. 0x12345....).
 * @param {string} message - Message to post.
 * @return {boolean} success - Whether the message was successfully posted.
 */
Whisper.prototype.post = async function(topic, symKeyId, message) {

    try {

      let messageOptions = {
        symKeyID: symKeyId,
        topic: topic,
        payload: message,
        ttl: 10,
        powTime: 3,
        powTarget: 0.5,
      };

      const success = await _shh.post(messageOptions);

      return success;

    } catch (error) {
        console.log(error);
    }
};

/**
 * Subscrice to a topic in OkeyDokey's whisper network.
 *
 * @param {string} topic - Array of topics to subscribe to.
 *    e.g. ['0x11223344', '0x55667788']
 *    A topic be a 4 byte hex string with a '0x' prefix (e.g. 0x11223344).
 * @param {string} symKeyId (optional) - Symmetric key id.
 *    Symmetric key id to listen to specific messages.
 *    (e.g. 0x12345....  or null)
 * @param {function} onMessage - Callback function for message.
 *    Parameters should be (message, subscription).
 * @param {function} onError - Callback function for error.
 *    Parameters should be (error, subscription).
 */
Whisper.prototype.subscribe = function(topics, symKeyId, onMessage, onError) {

  try {

    let subscriptionOptions = {
      topics: topics,
      symKeyID: symKeyId,
      minPow: 0.8
    };

    const message = _shh.subscribe('messages', subscriptionOptions, (err, msg, sub) => {
      if (err != null) {
       onError(error, sub);
      }
      else if (msg != null) {
       onMessage(msg, sub);
      }
    });

  } catch (error) {
        console.log(error);
  }
};

/**
 * Generate symmetric key in OkeyDokey's whisper network.
 *
 * @param {string} password - Password to generate key.
 *    Same password can be used to generate the same key.
 * @return {String} symKeyId - Symmetric key Id.
 */
Whisper.prototype.generateKey = async function(password) {

  try {

    const keyId = await _shh.generateSymKeyFromPassword(password);    

    return keyId;

  } catch (error) {
      console.log(error);
  }
};



// Whisper.prototype.addSymKey = function(symKey) {

//   var shh = this.web3.shh;

//   // return new Promise((resolve, reject) => {

//   return new Promise((resolve, reject) => {

//     console.log('(whisper.js) Symkey:', symKey)
//     shh.addSymKey(symKey).then(res => {
//       console.log(res);
//       resolve(res);
//     }).catch(err => {
//       console.log(err)
//     });
//   })
// }


// Whisper.prototype.makeMsgFilter = function(symKey) {

//   var shh = this.web3.shh;

//   // return new Promise((resolve, reject) => {

//   return new Promise((resolve, reject) => {
//     shh.newMessageFilter({
//       symKeyID: symKey, // encrypts using the sym key ID
//       topics: [config.topic]
//     }).then((filterId) => {
//       console.log("filter id = " + filterId);
//       resolve(filterId);
//     });
//   }).catch(console.log);
// }


// Whisper.prototype.useMsgFilter = function(filterId) {

//   var shh = this.web3.shh;
//   console.log("filter id using is " + filterId);

//   setInterval(() => {
//     shh.getFilterMessages(filterId).then(messages => {
//       for(let msg of messages) {
//         console.log("----------------THIS IS FILTERED MESSAGE-----------------");
//         console.log(msg);
//         console.log("--------------//THIS IS FILTERED MESSAGE//---------------");
//       }
//     });
//   }, 1000);
// }