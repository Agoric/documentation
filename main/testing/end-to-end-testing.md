---
sidebar: auto
---

# End-to-End Testing

## Overview

Developing Decentralized Applications (DApps) on the Cosmos network often involves integrating with the Keplr wallet. Solid testing is key for ensuring users can flawlessly interact with your DApp through the Keplr wallet. 

[`@agoric/synpress`](https://github.com/agoric-labs/synpress) is an end-to-end (e2e) testing framework that simplifies the testing process for Keplr-based DApps. This framework automates testing how your DApp interacts with the Keplr wallet, simulating real user experiences. `@agoric/synpress` is built upon [`synthetixio/synpress`](https://github.com/Synthetixio/synpress), a framework originally designed for Metamask-based DApps.

## Getting Started

### Installation:

`@agoric/synpress` can be installed using the following command:

```bash
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

2. Create a test file to utilize some of the basic commands provided by @agoric/synpress. Here is a small example:

```js
describe('Dapp tests', () => {
  it(`should setup a Keplr wallet`, () => {
    cy.setupWallet({
      secretWords: 'pineapple cow fat water .....',
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

3. You can now trigger the tests by running this command:

```bash
EXTENSION=keplr synpress run
```

### Custom Configuration

You can optionally create a custom configuration file for your Synpress setup. Since `@agoric/synpress` is based on Cypress, it follows the same configuration [file](https://github.com/agoric-labs/synpress/blob/master/synpress.config.js) format. To override the default settings and add your custom configurations, create a file named synpress.config.js in /project_dir/tests/e2e with the following content:

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

Use this configuration by passing the `--configFile` flag to Synpress.

```bash
EXTENSION=keplr synpress run --configFile=test/e2e/synpress.config.js
```

### Projects Using `@agoric/synpress`

Here are some examples of projects utilizing `@agoric/synpress` for their e2e tests. These examples showcase the framework in action and demonstrate its capabilities:

- [PSM dApp E2E Tests](https://github.com/Agoric/dapp-psm/tree/main/tests/e2e)
- [Wallet dApp E2E Tests](https://github.com/frazarshad/wallet-app/tree/main/test/e2e)
