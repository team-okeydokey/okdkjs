// okdk.js

'use strict';

module.exports = function(web3) {
  /* Set up web3 */
  // const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
  const ethClient = 'http://localhost:9545';
  const bzzClient = 'http://swarm-gateways.net';

  let Web3 = require('web3');
  let net = require('net');


  web3 = new Web3(new Web3.providers.HttpProvider(ethClient));
  web3.bzz.setProvider(bzzClient);

  web3.shh.setProvider(new Web3.providers.IpcProvider("/Users/ryanpark/Documents/okdk-whisper/datadir/geth.ipc", net));
  
  // console.log(web3.shh)

  // var shh = this.web3.shh;
  // console.log(web3)

  return new OKDK(web3);
};

/* Import libraries. */
const Core = require('./core/core');
const Accounts = require('./accounts/accounts');
const Utils = require('./utils/utils');
const Storage = require('./storage/storage');
const Whisper = require('./whisper/whisper');
const Token = require('./core/token');
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
    this.token = Token(this);
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

  /* Test get balance */
  const balance = await this.token.getBalance(this.accounts[0]);
  console.log("\n- Balance query test passed!", "Balance:", balance);

  /* Test approve */
  const approve = await this.token.approve(this.accounts[0], this.reservations.address, 50);
  const reservationsBalance = await this.token.getAllowance(
    this.accounts[0], this.reservations.address);
  console.log("\n- Approve test passed!", "Contract balance:", reservationsBalance);

  /* Test house registration. */
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
     10,
     240,
     12,
     23,
     127.23,
     12.42,
     'policy',
     'Don\'t cancel',
     [],
     [],
     1);

  if (houseId > 0) {
    console.log("\n- House register test passed!", "House id:", houseId);
  } else {
    console.log("\n- House register test failed!");
    return;
  }

  /* Test house info fetch. */
  const houseInfo = await this.houses.getHouseInfo(houseId);
  console.log("\n- House info test passed!", "House info: \n", houseInfo);

  /* Test reservation. */
  var checkIn = parseInt((new Date).getTime() / 1000);
  var checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 10);
  var checkOut = parseInt(checkOutDate.getTime() / 1000);

  const reservationId =
    await this.reservations.reserve(this.accounts[0], 1, checkIn, checkOut);

  if (reservationId > 0) {
    console.log("\n- Reservation test passed!", "Reservation id:", reservationId);
  } else {
    console.log('\n- Reservation test failed!');
    return;
  }


  /* Test reservation info fetch. */
  const reservationInfo =
    await this.reservations.getReservationInfo(reservationId);
  console.log("\n- Reservation info test passed!", "Reservation info: \n", reservationInfo);


  /* Test device registration. */
  const deviceRegisterResult = await this.devices.register(
    this.accounts[1], this.accounts[0].getAddressString(), 0, "Front door");

  /* Test adding device to house. */
  const addDeviceResult = await this.devices.addToHouse(
    this.accounts[0], 1, this.accounts[1].getAddressString());

  /* Test device authorization. */
  const verifyGuestResult = await this.devices.verifyGuest(
    this.accounts[1], this.accounts[0].getAddressString());
  if (verifyGuestResult) {
    console.log("\n- Guest authorization test passed!");
  } else {
    console.log('\n- Guest authorization test failed!');
    return;
  }

};

