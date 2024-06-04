---
sidebar: auto
---

# Testing

## Overview

Developing Decentralized Applications (DApps) on the Cosmos network often involves integrating with the Keplr wallet. Testing is key for ensuring users can flawlessly interact with your DApp through the Keplr wallet.

[`@agoric/synpress`](https://github.com/agoric-labs/synpress) is an end-to-end (e2e) testing framework that simplifies the testing process for Keplr-based DApps. This framework automates testing how your DApp interacts with the Keplr wallet, simulating real user experiences. `@agoric/synpress` is built upon [`synthetixio/synpress`](https://github.com/Synthetixio/synpress), a framework designed for Metamask-based DApps.

## Installation

Before you start testing your DApp with Keplr, you'll need to install the `@agoric/synpress` in your project. Here's how to install it, depending on the package manager you're using:

- **yarn**: `yarn add -D @agoric/synpress`
- **npm**: `npm install --save-dev @agoric/synpress`
- **pnpm**: `pnpm add -D @agoric/synpress`

## Project structure

We recommend the following project structure for keeping your e2e tests clean and manageable:

```text
project_dir
└── src
└── tests
    └── e2e
        └── support.js
        └── specs
            └── test.spec.js
```

## Creating a Support File

Navigate to your project's `tests/e2e` directory and create a new file named `support.js`. This file can be used to create reusable commands that encapsulate common testing actions. For example, you could create a custom command to navigate to a specific page within your application. You can read more about it [over here](https://docs.cypress.io/api/cypress-api/custom-commands).

After creating your `support.js` file, make sure to include the following import statement:

```js
import '@agoric/synpress/support/index';
```

This import is essential because it brings in the necessary functionalities from `@agoric/synpress` to interact with the Keplr wallet within your e2e tests. Without it, your tests won't be able to leverage the features provided by `@agoric/synpress` for Keplr integration.

## Write your first e2e test

Create a test file to utilize some of the basic commands provided by @agoric/synpress. Here is a small example:

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

You can now trigger the tests by running this command:

```bash
EXTENSION=keplr synpress run
```

## Custom Configuration

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
