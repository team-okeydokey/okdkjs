# okdkjs
Javascript API for OkeyDokey smart contracts

<p align="center">
  <img align="center" src="img/logo.png" width="532" height="184" alt="logo.png"/>
</p>

# Installation

```bash
npm install --save okdkjs
```


# Usage
```javascript
/* Set up web3 */
const ethClient = 'YOUR_ETHEREUM_CLIENT_URL'; // For example - 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

/* Initialize okdkjs and attach callbacks. */
var OKDK = require('okdkjs');
var okdk = OKDK(web3);

okdk.init().then(() => {
  // Initialization successful.
  yourInitFunction(okdk);
}).catch(error => {
  // Initialization failed.
  console.log(error);
});
```


# API Documentation
Read the [Docs](https://team-okeydokey.github.io/okdkjs/)


# NPM Scripts

`npm run test`: Run tests.

`npm run docs`: Generate docs in the `docs/` folder.

`npm run checklint`: Check code formatting.

`npm run fixlint`: Automatically fix code formatting.
