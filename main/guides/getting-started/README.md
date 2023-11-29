# Starting a Basic Dapp

Welcome! We'll start with a basic _dapp_; that is: a JavaScript contract and UI.

But first, note that help is not far away:

## Getting Support

- Chat with peers on the [Agoric Discord](https://agoric.com/discord)
- Join weekly [Office Hours](https://github.com/Agoric/agoric-sdk/wiki/Office-Hours)
- Search and post [Q & A](https://github.com/Agoric/agoric-sdk/discussions/categories/q-a) in [agoric-sdk discussions](https://github.com/Agoric/agoric-sdk/discussions)

## Platform Requirements

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

The Agoric SDK is supported on <a href="https://en.wikipedia.org/wiki/Linux">Linux</a>, <a href="https://www.apple.com/macos/">MacOS</a>, and <a href="https://docs.microsoft.com/en-us/windows/wsl/">Windows Subsystem for Linux (WSL)</a>.

::: tip Mac Dev Tools
On a Mac, you must first install
[Xcode](https://apps.apple.com/us/app/xcode/id497799835)
:::

We support running a local Agoric blockchain with [docker-compose](https://docs.docker.com/compose/).

Our user interfaces integrate with the [keplr](https://www.keplr.app/) wallet.

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

      node_modules

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
[supported platform](#platform-linux-shell-or-equivalent) and
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

Look at the logs from the blockchain until it is steadily making blocks:

```sh
yarn docker:logs
```

## Deploy the Contract and Start the UI

Let's start it up:

```sh
yarn start
```

::: tip TODO: integrated `yarn start` script

For now, use the [Agoric Gov Proposal Builder](https://cosgov.org/)
for deployment:

1. Make the contract and proposal bundles.

```sh
(cd contract; yarn build:proposal)
```

Note the long `b1-xxx.json` bundle filenames
as well as `start-game1-permit.json`
and `start-game1.js`.

2. Use the [Install Bundle](https://cosgov.org/?msgType=installBundle&network=local) tab to install the 2 bundles.
   It will likely say **insufficient balance**.
   To get enough IST:

```sh
yarn docker:make mint4k
```

2. Get ready to vote. To query the status of proposals, use

```sh
yarn docker:make gov-q
```

Then, don't execute this command, but get it ready:

```sh
yarn docker:make vote PROPOSAL=N
```

3. Use the [CoreEval Proposal](https://cosgov.org/?msgType=coreEvalProposal&network=local) tab to make a proposal to
   start the contract using the permit and script.
   Note the **10 second voting period**,
   When you **Sign & Submit** the proposal, you can replace `N`
   above with the proposal number that pops up.

   To verify that the proposal executed correctly:

```sh
docker-compose logs | less -R
```

The logs should include some `console.log` output with no errors.

**TODO: what console output exactly?**

4. Start the UI

```sh
(cd ui; yarn dev)
```

:::

Use `yarn docker:bash` to print account info, including `user1`.
Add that account to keplr using its mnemonic.

Then hit **Connect Wallet**. The UI should show your address.

Then **Make Offer**. Keplr should show an offer to **give** 0.25 IST
and **want** a few places. Sign and broadcast the offer.
After a few seconds, the UI should show the places.
