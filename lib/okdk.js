// okdk.js

'use strict';

module.exports = function(web3) {

    /* Set up web3 */
    // const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
    const ethClient = 'http://localhost:8545';
    const bzzClient = 'http://swarm-gateways.net';

    var Web3 = require('web3');

    web3 = new Web3(new Web3.providers.HttpProvider(ethClient));
    web3.bzz.setProvider(bzzClient);

    return new OKDK(web3);
};

/* Import libraries. */
var Core = require('./core/core');
var Accounts = require('./accounts/accounts');
var Utils = require('./utils/utils');
var Storage = require('./storage/storage');
var Houses = require('./houses/houses');
var Devices = require('./devices/devices');
var Reservations = require('./reservations/reservations');
var Reviews = require('./reviews/reviews');

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

    var context = this;
    
    /* Set up core module */
    this.core = Core(this);

    this.core.ready.then(result => {
        
        /* Set up accounts */
        var _accounts = Accounts();
        context.accounts = _accounts._accounts;

        /* Set up contract endpoints. */
        context.houses = Houses(context);
        context.devices = Devices(context);
        context.reservations = Reservations(context);
        context.reviews = Reviews(context);

    }).catch(error => {
        console.log(error);
    });
}



/* Test */
OKDK.prototype.test = async function() {

    var context = this;

    /* Return account address */
    // console.log('Account address: ' + this.accounts[0].getAddressString());

    /* Test send token */
    // console.log(this.accounts[0].getAddressString());
    // this.core.approve(this.accounts[0], '0xb24af1f3d5ec84aa14693d114ae94ef542da521f', 200000);

    /* Test send token */
    //this.core.sendToken(this.accounts[0], '0x435C4c81bb9cf4326FfB05cb25A862d62151897D', 2);

    /* Test house methods */
    const houseId = await this.houses.createListing({houseName:"House Name", hostName:"Host Name", 
        addrFull:"addrFull", addrSummary:"addrSummary", addrDirection:"addrDirection", 
        description:"description", numGuest:2, numBedroom:1, numBed:1, numBathroom:2,
        hourlyRate:2441, dailyRate:402, utilityFee:1234, cleaningFee:5678, 
        latitude:127.23, longitude:12.42, housePolicy:"policy", cancellationPolicy:"Don't cancel", 
        amenities:[], houseImageHashes:[],  houseType:1});

    console.log(houseId);

    // .then(result => {
    //     console.log(result);

    //     return this.houses.getHouseInfo(1);

    // }).then(result => {
    //     console.log(result);
    //     /* Test reservation methods */
    //     return this.reservations.reserve(1);

    // }).then(result => {
    //     return this.reservations.getReservationInfo(1);

    // }).then(result => {
    //     console.log(result);

    // }).catch(error => {
    //     console.log(error);
    // });



    // this.reservations.reserve(1, 4, 5) .then(result => {
    //     console.log(result);

    // }).catch(error => {
    //     console.log(error);
    // });
}

