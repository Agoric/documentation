# Agoric Structure and Process

This document describes and illustrates:
- Agoric's components and structure
- Agoric's infrastructure processes

## Agoric Dapp file structure

## Agoric CLI process

1. `git clone https://github.com/Agoric/agoric-sdk`
   1. Clones the Agoric SDK into an `agoric-sdk` directory on your system.
2. yarn install	Install NPM dependencies.
3. yarn build	Build sources that need compiling. 
4	 Install the Agoric CLI by: yarn link-cli <agoric script location>
5. `agoric init`
   1. Creates a sub-directory of agoric-sdk and copies an existing Dapp into it.
6. `agoric install`
   1. Installs JavaScript dependencies.
7. `agoric start`
   1. Start the Agoric VM. Creates the vats in which smart contract code runs. 
8. `agoric deploy ./contract/deploy.js ./api/deploy.js`
   1. Deploy the Dapp on an Agoric VM, install the Dapp's smart contract and web 
     API, as well as JavaScript code that implements the Agoric APIs
9. Dapp UI at `localhost:3000`. Wallet UI at `localhost:8000`.
  

