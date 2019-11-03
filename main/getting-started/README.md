# Getting Started with the Agoric Devtools

This tutorial will show you how to:
1) __Write smart contracts on Zoe, the Agoric platform.__

   Our pre-made contracts that you can copy include a Uniswap implementation
   (called autoswap), a second-price auction, and a simple exchange
   with an order book.

2) __Create dapp user interfaces that interact with the smart contracts
   and the user wallet.__
   
   Our pre-made UI that you can work with is the
   UI for autoswap, the Uniswap implementation.

Note that this environment does not connect to the Agoric testnet chain and
also does not create a local chain. We are working on adding the
ability to run contracts on chain to this devtool, but you can find
[more information on running on chain here](../manual-setup/README.md).

## Prerequisites

### Vagrant

To run a standardized Linux distribution with all the required development tools, you probably want [Vagrant](https://www.vagrantup.com/docs/):

```sh
vagrant up --provider=docker
# or
vagrant up --provider=virtualbox
# then
vagrant ssh
```

The Vagrant setup has synchronized filesystem access with the workspace directory on your host system, so you can use your favourite IDE to modify the files, and just run Linux commands on the SSH connection.

### Developing on the current OS

If you don't use Vagrant, you can develop on your own local operating system.

NOTE: You will need Go 1.12 or newer to run the Agoric VM.

```sh
# Install the agoric devtool.
npm install -g agoric
```

or:

```sh
# Run the agoric devtool.
npx agoric [...options]
```

## Your First Agoric Dapp

Let's install the default smart contracts and UI. 

```sh
# Initialize your dapp project.
# Note: Change the `demo` name to something meaningful.
agoric init demo
# Go to its directory.
cd demo
```
`init` creates a folder with the name you specify and copies over all
the files you might need. 

Next, let's install the necessary JavaScript packages and Go
dependencies. This step might take a while. We use Go on our testnet,
so this step is preparing for the near future in which we use this
tutorial to run on our testnet. 

```sh
# Install Javascript/Go dependencies.
agoric install
```

Next, let's start up the Agoric VM. This creates the "vats" in which
our smart contract code will be run. 

```sh
# Run the local vat machine.
agoric start
```

Lastly, let's deploy our dapp on the Agoric VM. 
```sh
# Install your smart contract and web api (can be done separately)
agoric deploy ./contract/deploy.js ./api/deploy.js
# Navigate to http://localhost:8000/
```

## Writing a smart contract 

If you take a look at the `demo` folder that you had just created,
you should see folders like:

* api
* contract
* ui

Go ahead and open up `contract/myFirstDapp.js`. This is a
stripped-down version of our [autoswap
contract](../zoe/guide/contracts/autoswap.md) that is meant to be
filled in with your particular business logic. To learn more about
writing a smart contract on Zoe, please see the [Zoe
guide](../zoe/guide/).

Once you've made changes to the smart contract, run:

```sh
# Start the Agoric VM from the beginning, dropping any state
agoric start --reset
# Redeploy
agoric deploy ./contract/deploy.js ./api/deploy.js
```

## Editing the UI


