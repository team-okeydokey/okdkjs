# okdkjs
Javascript API for OkeyDokey smart contracts

<p align="center">
  <img align="center" src="img/logo.png" width="532" height="184" alt="logo.png"/>
</p>

# Installation
To install globally:
```bash
npm install -g okdkjs
```

To install as a dev dependancy:
```bash
npm install --save-dev okdkjs
```


# Usage
```javascript
/* Set up web3 */
const ethClient = 'YOUR_ETHEREUM_CLIENT_URL'; // For example - 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

/* Initialize okdkjs and attach callbacks. */
var OKDK = require('okdkjs');
var okdk = OKDK(web3).ready.then(_okdk => { 
        // Initialization successful.
        yourInitFunction(_okdk);
    }).catch(error => {
		// Initialization failed.
		console.log(error);
    });
```

Read the [Docs](https://team-okeydokey.github.io/okdkjs/)