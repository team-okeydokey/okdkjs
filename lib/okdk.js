// okdk.js

'use strict';

module.exports = function(web3) {
  /* Set up web3 */
  // const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
  const ethClient = 'http://localhost:8545';
  const bzzClient = 'http://swarm-gateways.net';

  let Web3 = require('web3');

  web3 = new Web3(new Web3.providers.HttpProvider(ethClient));
  web3.bzz.setProvider(bzzClient);

  return new OKDK(web3);
};

/* Import libraries. */
const Core = require('./core/core');
const Accounts = require('./accounts/accounts');
const Utils = require('./utils/utils');
const Storage = require('./storage/storage');
const Whisper = require('./whisper/whisper');
const Houses = require('./houses/houses');
const Devices = require('./devices/devices');
const Reservations = require('./reservations/reservations');
const Reviews = require('./reviews/reviews');

/**
 * Set up OKDK library and relevant modules.
 * @constructor
 *
 * @param {Object} web3 - Externally created web3 object.
 */
function OKDK(web3) {
  this.chainId = 3; // Use Ropsten.

  this.web3 = web3;
  this.utils = Utils(this);
  this.storage = Storage(this);
  this.whisper = Whisper(this);

  /* Set up core module */
  this.core = Core(this);
}

OKDK.prototype.init = async function() {

  try {

    const coreReady = await this.core.init();

    /* Set up accounts */
    let _accounts = Accounts();
    this.accounts = _accounts._accounts;

    /* Set up contract endpoints. */
    this.houses = Houses(this);
    this.devices = Devices(this);
    this.reservations = Reservations(this);
    this.reviews = Reviews(this);

  } catch(error) {
      console.log(error);
      console.log("OKDKjs init failed.")
  }
}

/* Test */
OKDK.prototype.test = async function() {
    /* Return account address */
    // console.log('Account address: ' + this.accounts[0].getAddressString());

    /* Test send token */
    // console.log(this.accounts[0].getAddressString());
    // this.core.approve(this.accounts[0],
    //                   '0xb24af1f3d5ec84aa14693d114ae94ef542da521f', 200000);

    /* Test send token */
    // this.core.sendToken(this.accounts[0],
    //                     '0x435C4c81bb9cf4326FfB05cb25A862d62151897D', 2);

    /* Test house registration */
    const houseId = await this.houses.createListing(
      this.accounts[0],
      'House Name', 
      'Host Name',
      'addrFull', 
      'addrSummary',
      'addrDirection',
      'description',
       2, 
       1,
       1,
       2,
       2441,
       402,
       1234,
       5678,
       127.23,
       12.42,
       'policy',
       'Don\'t cancel',
       [],
       [],
       1);
    console.log(houseId);

    /* Test house info fetch */
    const houseInfo = await this.houses.getHouseInfo(1);
    console.log(houseInfo);

    /* Test reservation */
    const reservationId =
      await this.reservations.reserve(this.accounts[0], 1, 4, 5);
    console.log(reservationId);

    /* Test reservation info fetch */
    const reservationInfo =
      await this.reservations.getReservationInfo(1);
    console.log(reservationInfo);


    // this.reservations.reserve(1, 4, 5) .then(result => {
    //     console.log(result);

    // }).catch(error => {
    //     console.log(error);
    // });
};

