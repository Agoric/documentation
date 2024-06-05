---
sidebar: auto
---

# Testing

## Background

Developing Decentralized Applications (DApps) on the Cosmos network often involves integrating with the Keplr wallet. Testing is key for ensuring users can flawlessly interact with your DApp through the Keplr wallet.

[`@agoric/synpress`](https://github.com/agoric-labs/synpress) is an end-to-end (e2e) testing framework that simplifies the testing process for Keplr-based DApps. This framework automates testing how your DApp interacts with the Keplr wallet, simulating real user experiences. `@agoric/synpress` is built upon [`synthetixio/synpress`](https://github.com/Synthetixio/synpress), a framework designed for Metamask-based DApps.

Since `@agoric/synpress` is based on [Cypress](https://www.cypress.io/), the official [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress) has a lot of information that you can use with `@agoric/synpress`.

## Installation

Before you start testing your DApp with Keplr, you'll need to install the `@agoric/synpress` in your project using the following command:

```bash
yarn add -D @agoric/synpress
```

## Project structure

We recommend the following project structure for keeping your e2e tests clean and manageable:

```text
project_dir
└── src
└── tests
    └── e2e
        └── synpress.config.js
        └── support.js
        └── specs
            └── test.spec.js
```

## Configure `synpress.config.js`

Before you start writing your E2E tests, you'll need to create a configuration file named `synpress.config.js` in the `tests/e2e` directory of your project.

Inside `synpress.config.js`, you'll set the `baseUrl` property within the e2e configuration. This tells Cypress where to find your DApp during testing. Here's an example configuration:

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

In this example, `baseUrl` is set to `http://localhost:5173`. Make sure to replace this with the actual URL where your DApp is running.

By default, if you don't create a `synpress.config.js` file, `@agoric/synpress` assumes your DApp runs on port 3000 of your local machine (`http://localhost:3000`). Specifying the correct `baseUrl` ensures your tests interact with the right instance of your DApp.

Since you have a separate `synpress.config.js` in the `tests/e2e` folder, you need to specify its location when running your tests. Use the `--configFile` flag with the `synpress run` command:

```bash
EXTENSION=keplr synpress run --configFile=tests/e2e/synpress.config.js
```

## Creating a Support File

Navigate to your project's `tests/e2e` directory and create a new file named `support.js`. This file can be used to create reusable commands that encapsulate common testing actions. For example, you can create a custom command to navigate to a specific page within your application. You can read more about it [over here](https://docs.cypress.io/api/cypress-api/custom-commands).

After creating your `support.js` file, make sure to include the following import statement:

```js
import '@agoric/synpress/support/index';
```

This import is essential because it brings in the necessary functionalities from `@agoric/synpress` to interact with the Keplr wallet within your e2e tests. Without it, your tests won't be able to leverage the features provided by `@agoric/synpress` for Keplr integration.

## Example Tests

With the environment set up, let's write end-to-end (e2e) tests to test your DApp's functionality. In the `tests/e2e/specs` folder, create a new file with a descriptive name that reflects what it tests (e.g., `user_login.spec.js` or `token_transfer.spec.js`).

### Test Structure

You use `describe` blocks to group related tests together, and `it` blocks to define individual test cases within those groups.

```js
describe('User Login', () => {
  it('should login with valid credentials', () => {
    // Test steps for login functionality
  });
});
```

### Test 1: Setting Up Keplr Wallet

```js
it('should setup a Keplr wallet', () => {
  cy.setupWallet({
    secretWords: 'KEPLR_MNEMONIC',
  });
  cy.visit('/');
});
```

This test case simulates setting up a Keplr wallet for your tests, using the `cy.setupWallet` method. Make sure to replace `KEPLR_MNEMONIC` with a 24-word mnemonic phrase. The `setupWallet` method creates a wallet based on the provided mnemonic phrase, which can then be used throughout your test suite.

After setting up the wallet, we visit the root path (`/`) of the DApp using `cy.visit('/')`.

### Test 2: Connecting Keplr Wallet

```js
it('should accept connection with wallet', () => {
  cy.contains('Connect Wallet').click();
  cy.acceptAccess();
});
```

This test simulates a user connecting their Keplr wallet to your DApp. `cy.contains('Connect Wallet')` searches for an element containing the text `Connect Wallet` on the webpage and triggers a click event. `cy.acceptAccess` simulates accepting Keplr wallet access for your DApp.

### Test 3: Signing a Transaction

```js
it('should confirm make an offer transaction', () => {
  cy.contains('Make an Offer').click();
  cy.confirmTransaction();
});
```

This test simulates transaction Signing on your DApp. `cy.contains('Make an Offer')` searches for an element containing the text `Make an Offer` and triggers a click event. `cy.confirmTransaction` simulates confirming a transaction.

### Running the Tests

You can now trigger the tests by running this command:

```bash
EXTENSION=keplr synpress run --configFile=tests/e2e/synpress.config.js
```

## Projects Using `@agoric/synpress`

Some examples projects utilizing `@agoric/synpress` for e2e tests:

- [PSM dApp E2E Tests](https://github.com/Agoric/dapp-psm/tree/main/tests/e2e)
- [Wallet dApp E2E Tests](https://github.com/frazarshad/wallet-app/tree/main/test/e2e)

## @agoric/synpress Commands

## `setupWallet`

Initializes a Keplr wallet for testing. You can either create a new one or import an existing one using the provided options.

**Arguments:**

(All arguments are optional)

The command takes a single object as an argument with the following keys:

- `secretWords` _(**string**)_: The secret words for the wallet. (default is a predefined mnemonic phrase that represents a wallet address on the Agoric chain)
- `privateKey` _(**string**)_: The private key for the wallet.
- `password` _(**string**)_: The password for the wallet (default is `Test1234`).
- `newAccount` _(**string**)_: Whether to create a new account (default is `false`).
- `walletName` _(**string**)_: The name of the wallet (default is `My Wallet`).
- `selectedChains` _(**string**)_: The chains to select (default is an empty array, `[]`).
- `createNewWallet` _(**string**)_: Whether to create a new wallet (default is `false`).

**Returns:**

- _(**boolean**)_: `true` if the wallet was set up successfully, `false` otherwise.

## `acceptAccess`

Handles the authorization process for connecting the Keplr wallet to a DApp. Typically, DApps provide a `Connect Wallet` option to initiate this process.

**Returns:**

- _(**boolean**)_: `true` if access was accepted successfully, `false` otherwise.

## `confirmTransaction`

Handles signing transactions within a DApp using the Keplr wallet. This occurs when a user initiates a transaction, such as sending tokens or interacting with a smart contract.

**Returns:**

- _(**boolean**)_: `true` if transaction was approved successfully, `false` otherwise.

## Managing Browser Tabs

In DApp testing, we typically have two important tabs open in the browser: one for the Keplr extension window and another for the Cypress window, where the DApp is running.

- `Keplr Extension Window`: This tab is used for managing your Keplr wallet and interacting with blockchain transactions.
- `Cypress Window`: This tab runs the DApp you are testing, allowing you to interact with the application directly.

`@agoric/synpress` provides the following commands to help determine the status of these windows and switch focus between them:

### `isExtensionWindowActive`

Determines whether the Keplr extension window is the currently active tab.
**Returns:**

- _(**boolean**)_:`true` if the Keplr extension window is active, `false` otherwise.

### `switchToExtensionWindow`

Switches the focus to the Keplr extension window tab.

**Returns:**

- _(**boolean**)_:`true` if the focus change was successful, `false` otherwise.

### `isCypressWindowActive`

Determines whether the Cypress window, where the DApp is running, is the currently active tab.

**Returns:**

- _(**boolean**)_:`true` if the Cypress window is active, `false` otherwise.

### `switchToCypressWindow`

Switches the focus to the Cypress window tab.

**Returns:**

- _(**boolean**)_:`true` if the focus change was successful, `false` otherwise.

## `disconnectWalletFromDapp`

Disconnects the Keplr wallet from all previously connected DApps. After executing this command, the DApps will need to request permission to connect to the wallet again.

**Returns:**

- _(**boolean**)_:`true` if the disconnection was successful, `false` otherwise.

## `getWalletAddress`

Retrieves the wallet address associated with a specified blockchain.

**Arguments:**

- `chainName` _(**string**)_: The name of the blockchain for which you want to obtain the wallet address.

**Returns:**

- _(**string**)_: The wallet address for the specified blockchain.

## `switchWallet`

Switches the active wallet to the specified wallet by name.

**Arguments:**

- `walletName` _(**string**)_: The name of the wallet you want to switch to. This should match the name used when the wallet was created using the `setupWallet` command.

**Returns:**

- _(**boolean**)_: `true` if the wallet switch was successful, `false` otherwise.

## `addNewTokensFound`

Adds all the new tokens discovered by the Keplr extension to the user's token portfolio when it connects to a new blockchain network.

**Returns:**

- _(**boolean**)_: `true` if the tokens were successfully added to the user's token portfolio `false` otherwise.

## `getTokenAmount`

Retrieves the balance of a specified token in the wallet.

**Arguments:**

- `tokenName` _(**string**)_: The name of the token for which you want to retrieve the balance.

**Returns:**

- _(**number**)_: The amount of the specified token currently held in the wallet.
