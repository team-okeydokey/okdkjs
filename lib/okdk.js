// okdk.js

'use strict';

module.exports = function(web3) {

	/* Set up web3 */
	// const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
	const ethClient = 'http://localhost:8545';
	var Web3 = require('web3');
	web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

    return new OKDK(web3);
};

/* Import libraries. */
var Core = require('./core/core');
var Accounts = require('./accounts/accounts')
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
  	this._web3 = web3;

  	var context = this;
	
	/* Set up core module */
	this.core = Core(this);

	this.core.ready.then(function(result) {
		/* Set up accounts */
		var _accounts = Accounts();
		context.accounts = _accounts._accounts;

		/* Set up contract endpoints. */
		context.houses = Houses(this);
		context.devices = Devices(this);
		context.reservations = Reservations(this);
		context.reviews = Reviews(this);

	}, function(err) {
		console.log(err)

	}).catch(function () {
     	console.log("Promise Rejected");
	});

}

/* Test */
OKDK.prototype.test = function() {

	/* Return account address */
	console.log('Account address: ' + this.accounts[0].getAddressString());

	/* Test send token */
	console.log(this.accounts[0].getOwnPropertyNames());
	console.log(User.getOwnPropertyNames() );
	this.core.approve(this.accounts[0], '0xb24af1f3d5ec84aa14693d114ae94ef542da521f', 200000);

	/* Test send token */
	//this.core.sendToken(this.accounts[0], '0x435C4c81bb9cf4326FfB05cb25A862d62151897D', 2);

	/* Test grid methods */
	this.grid.registerOwner(this.accounts[1], this.accounts[0].getAddressString());
}