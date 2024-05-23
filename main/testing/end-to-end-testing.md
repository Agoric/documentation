---
sidebar: auto
---

# End-to-End Testing

## Overview

[`@agoric/synpress`](https://github.com/agoric-labs/synpress) is an end-to-end (e2e) testing framework specifically designed for DApps. Built on [Cypress.io](https://www.cypress.io/), it provides a fully-featured testing environment. Using `@agoric/synpress`, developers can automate and test interactions with the Keplr wallet.

`@agoric/synpress` is a fork of the [`synthetixio/synpress`](https://github.com/Synthetixio/synpress) framework, which is a e2e testing framework written for the Metamask wallet. `@agoric/synpress` heavily modifies it in order to provide a robust testing framework for the Keplr wallet and Cosmos SDK.

## Getting Started

### Installation:
`@agoric/synpress` can be installed as a dev dependancy to any node project using the following command
```bash
# with npm
npm install --save-dev @agoric/synpress
# with pnpm
pnpm add --save-dev @agoric/synpress
# with yarn
yarn add -D @agoric/synpress
```

### Example setup

Project structure:

```text
project_dir
└── src
└── tests
    └── e2e
        └── support.js
        └── specs
            └── test.spec.js
```

1. Create `support.js` inside your tests folder (`/project_dir/tests/e2e`). This file can be used to extend synpress - add custom commands, and more:

```js
import '@agoric/synpress/support/index';
```

2. Create a test file. This is a small example that shows some of the basic commands that are provided by `@agoric/synpress`
```js
describe('Dapp tests', () => {

	it(`should setup a Keplr wallet`, () => {
      cy.setupWallet({
        secretWords: "pineapple cow fat water ....."
      });
      cy.visit('/');
    });
    
	it(`should accept connection with wallet`, () => {
      cy.contains('Connect Wallet').click();
      cy.acceptAccess();
    });
    
    it(`should confirm make an offer transaction`, () => {
      cy.contains('Make an Offer').click();
      cy.confirmTransaction();
    });
});

```

3. You're done! you can now trigger the tests by running:

```bash
EXTENSION=keplr synpress run
```

### Custom Configuration
Optionally, you can create a custom config file for your synpress setup. Since `@agoric/synpress` is based on Cypress, it follows the same config file format.
 `@agoric/synpress` aleardy has some
   configurations set up in this
   [file](https://github.com/agoric-labs/synpress/blob/master/synpress.config.js).
   To override this and add your custom config, you can create your own config
   file `synpress.config.js` in `/project_dir/tests/e2e`

```js
const baseConfig = require('@agoric/synpress/synpress.config');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'http://localhost:5173',
  },
});
```

use this config by passing the `--configFile` flag to synpress

```bash
EXTENSION=keplr synpress run --configFile=test/e2e/synpress.config.js
```

### Projects Using `@agoric/synpress`

Here are some examples of projects utilizing `@agoric/synpress` for their e2e tests, showcasing the framework in action and demonstrating its capabilities:

- [dapp-psm](https://github.com/Agoric/dapp-psm/tree/main/tests/e2e)
- [wallet-app](https://github.com/frazarshad/wallet-app/tree/main/test/e2e)
