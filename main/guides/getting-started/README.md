# Starting a Basic Dapp

Welcome! We'll start with a basic _dapp_; that is: a JavaScript contract and associated UI.

<img alt="Vite + React + Agoric page with Connect Wallet button"
style="border: 1px solid" width="300"
src="https://github.com/Agoric/documentation/assets/150986/36a87384-0148-4f9e-8606-e176bd7880b3" />

```js
/** @param {ZCF<{joinPrice: Amount}>} zcf */
export const start = async zcf => {
  const { joinPrice } = zcf.getTerms();
...
}
```

As we begin, note that help is not far away:

## Getting Support

- Chat with peers on the [Agoric Discord](https://agoric.com/discord)
- Join weekly [Office Hours](https://github.com/Agoric/agoric-sdk/wiki/Office-Hours)
- Search and post [Q & A](https://github.com/Agoric/agoric-sdk/discussions/categories/q-a) in [agoric-sdk discussions](https://github.com/Agoric/agoric-sdk/discussions)

## Platform Requirements

The Agoric SDK is supported on <a href="https://en.wikipedia.org/wiki/Linux">Linux</a>, <a href="https://www.apple.com/macos/">MacOS</a>, and <a href="https://docs.microsoft.com/en-us/windows/wsl/">Windows Subsystem for Linux (WSL)</a>.

::: tip Mac Dev Tools
On a Mac, be sure to install
[Xcode](https://apps.apple.com/us/app/xcode/id497799835).
:::

We support any long-term support (LTS) versions of Node.js.
Download and install from [Node.js](https://nodejs.org/) if you don't
already have `node`. Check to make sure:

```shell
node --version # LTS version such as 18.16.0
```

We use the `yarn` package manager. [Installing with corepack](https://yarnpkg.com/corepack) is what the `yarn` maintainers recommend:

```sh
corepack enable
yarn --version # 1.x
```

For this getting started exercise, you will need:

- [docker compose](https://docs.docker.com/compose/)
- [Keplr wallet](https://www.keplr.app/) wallet.

## Create a project with the basic starter kit

Choose a name such as `demo` and then:

```sh
yarn create @agoric/dapp demo
```

::: tip TODO: make dapp-game-places the default

Until `dapp-game-places` is the default, use `--dapp-base` etc.
to refer to it:

```sh
yarn create @agoric/dapp \
  --dapp-base https://github.com/agoric-labs/ \
  --dapp-template dapp-game-places \
  demo

```

:::

### Project structure

The `demo` directory now has:

- **README.md**
- **package.json** as usual for a JavaScript project, along with **yarn.lock**
- **contract/** - smart contract source code, tests, etc.
- **ui/** - web UI
- **docker-compose.yml** - for running a local Agoric blockchain

::: tip TODO: prune api, agstate

Disregard these contents, for now:

- **\_agstate**
- **api**

:::

## Install dependencies

The UI depends on the React framework, and the contract depends on
the Agoric framework. The packages in this project also have
development dependencies for testing, code formatting, and static analysis.

```sh
cd demo
yarn install  # may take several minutes
```

::: tip Troubleshooting `yarn install`

If you run into errors during install or build, make sure you have the relevant developer tools installed. For example, on Debian or Ubuntu Linux, you can run `sudo apt get install build-essential` to install these tools.

Also, check that you are on a
[supported platform](#platform-requirements) and
not native Windows.
:::

## Start a local Agoric blockchain

To run a local Agoric blockchain with [docker-compose](https://docs.docker.com/compose/):

```sh
yarn start:docker
```

::: tip Note: large docker image

The docker image used here is several gigabytes.
The fist time you pull it may take several minutes.

:::

Look at the logs from the blockchain:

```sh
yarn docker:logs
```

After an initial flurry, when it is steadily making blocks, you should see:

```
agd_1  | 2023-12-05T20:52:42.933Z block-manager: block 956 begin
agd_1  | 2023-12-05T20:52:42.936Z block-manager: block 956 commit
agd_1  | 2023-12-05T20:52:43.944Z block-manager: block 957 begin
agd_1  | 2023-12-05T20:52:43.946Z block-manager: block 957 commit
```

Use control-C to stop viewing the logs and return to a shell prompt.

::: tip Note: logs include benign error messages

You can disregard messages such as:

- `v5: TypeError: target has no method "getDisplayInfo"`

These are artifacts of replaying historical events.

:::

## Deploy the Contract

Let's deploy the contract:

```sh
yarn start:contract
```

This `start:contract` script will do a number of things that we will cover in more detail later <small>(_[transaction commands](../agoric-cli/agd-query-tx.md#transaction-commands), [permissioned deployment](../coreeval/)_)</small>:

1. Bundle the contract with `agoric run ...`
2. Collect some ATOM with `agd tx bank send ...`.
3. Use the ATOM to open a vault to mint enough IST to pay to install the bundles on chain with `agops vaults open ...`.
4. Install the bundles on chain with `agd tx swingset install-bundle ...`.
5. Collect enough BLD to pay for a governance deposit with `agd tx bank send ...`
6. Make a governance proposal to start the contract with `agd tx gov submit-proposal swingset-core-eval ...`.
7. Vote for the proposal; wait for it to pass.
8. Print key material for an account you can use.

## Set up Keplr wallet and import account

Install the [Keplr Wallet](https://www.keplr.app/) if you have not done so already. Then copy the _mnemonic phrase_ printed at the end of the previous step; for example copy `congress` thru `switch` in the following:

```
Import the following mnemonic into Keplr:
congress goose visual acid shine view pair fruit chaos boost cigar upgrade certain warrior color omit perfect clutch little bulb divorce split fashion switch

The resulting address should be: agoric1a3zu5aqw255q0tuxzy9aftvgheekw2wedz3xwq
```

::: warning Keep your own mnemonic confidential!

For any mnemonic phrase you use to secure your own assets, **take care to keep it strictly confidential!** The mnemonic here is only for testing.
Using a **separate browser profile** is a good way to avoid accidentally
using the wrong account when testing vs. with real assets.

:::

Import it into Keplr:

1. Inside your Keplr wallet browser extension, press the ‘Accounts’ icon on the top right corner and then click the ‘Add Wallet button.

<img width="800" src="https://assets-global.website-files.com/634f88fecbcc16e1f71b7e3c/635b7493ae1431bd476ce90e_Adding%20Accs.png" />

2. Choose **Import an existing wallet**.

3. Choose **Use recover phrase or private key**.

4. Paste the mnemonic. Hit **Import**.

<img width="800" src="https://assets-global.website-files.com/634f88fecbcc16e1f71b7e3c/6363571c7c3d77a25e1d9bbf_accs7.webp" />

5. Enter a **Wallet Name** such as `user1`. Hit **Next**.

6. On the **Select Chains** page, hit **Save** (_choice of chain does not matter at this point._)

::: tip See also Keplr docs

The figures above are from...

- [Connect Additional Keplr Accounts](https://help.keplr.app/articles/how-to-connect-additional-keplr-accounts)
- [Four Ways to Create a Keplr Account](https://help.keplr.app/articles/four-ways-to-create-a-keplr-account#:~:text=Import%20an%20Existing%20Account%20via%20Mnemonic%20Phrase)

:::

## Start the Dapp UI

To start the Dapp UI:

```sh
yarn start:ui
```

The result includes a link:

```
  VITE v4.5.0  ready in 132 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Follow that link to get the Dapp UI:

<img alt="Vite + React + Agoric page with Connect Wallet button"
style="border: 1px solid"
src="https://github.com/Agoric/documentation/assets/150986/36a87384-0148-4f9e-8606-e176bd7880b3" />

Then hit **Connect Wallet**. The UI should show your address and your IST balance, after you approve an **Add Agoric local to Keplr** dialog.

## Make an Offer

Then hit **Make Offer**. Keplr should show an offer to **give** 0.25 IST
and **want** a few places. Approve the offer to sign and broadcast it to the (local) blockchain.

<img alt="Confirm Transaction with Give / Want offer details"
style="border: 1px solid"
src="https://github.com/Agoric/documentation/assets/150986/fd724782-9480-4acf-8e10-e0da5c780248" />

After a few seconds, the UI should show the places.

<img alt="Purses display updated with wanted Places"
style="border: 1px solid"
src="https://github.com/Agoric/documentation/assets/150986/64c0fe24-8238-4839-add8-5c1007722756" />

Congratulations! You are on your way to building dapps on Agoric.
