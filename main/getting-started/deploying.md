# Deploying Smart Contracts

The deploy command in the [agoric command line tool](https://agoric.com/documentation/getting-started/agoric-cli-guide.html#agoric-deploy) 
supports deploying contracts and off-chain web applications that talk to them. The command 
has two primary uses:

* Deploy smart contract source code onto the blockchain
* Deploy and setup an application program to the local server 

## Contract deployment

The primary function of `contract/deploy.js` is to bundle up a contract's source code
(which may consist of multiple files and modules) and "install" 
it on the blockchain as source code, using `zoe`. This does _not_ execute 
contract code; it just makes the code available on-chain.

The contract deployment process uses [`zoe.install`](https://agoric.com/documentation/zoe/api/zoe.html#e-zoe-install-code-moduleformat) to install 
the source code on-chain. This returns an installation handle associated with the 
source code. In a typical contract deployment, the installation handle is stored 
in the default shared registry so that it is broadly accessible on the chain.
Its registry key is written to a config file in the `ui` directory. 

See the [dapp-encouragement repository](https://github.com/Agoric/dapp-encouragement/blob/master/contract/deploy.js) for an example of a typical contract deploy script.

Deploying the dapp-encouragement contract (e.g., with `agoric deploy contract/deploy.js`) installs `dapp-encouragement` contract on chain, and generates the 
file `./ui/public/conf/installationConstants.js`
with contents like:
```js
// GENERATED FROM dapp-encouragement/contract/deploy.js
export default {
    "CONTRACT_NAME": "encouragement",
    "INSTALLATION_REG_KEY": "encouragementinstallation_9794"
};
```
The Registry determines the particular registry key, in this case
`"encouragementinstallation_9794"`, so it is different for each contract deployment.

## Application service deployment and setup

You will need to customize the API server deployment and setup much more
for your particular application and 
contract. Some dapps use a singleton contract instance that must be created, 
find and connect to on-chain resources like issuers for specific currencies, 
create new on-chain resources like new currencies or NFTs, create new Purses
for the application's use, or seed the on-chain contract with initial orders
or configuration.

The api/deploy.js scripts from teh example contracts can show some of the 
range of these custom setup actions:
* [dapp-encouragement](https://github.com/Agoric/dapp-encouragement/blob/master/api/deploy.js)
* [dapp-simple-exchange](https://github.com/Agoric/dapp-simple-exchange/blob/master/api/deploy.js)
* [dapp-autoswap](https://github.com/Agoric/dapp-autoswap/blob/master/api/deploy.js)

See the [`dibc-encouragement` branch](https://github.com/Agoric/dapp-encouragement/compare/master..dibc-encouragement) for an example of the additions needed to support IBC.

 Steps in the application deployment may include:
* Bundle the `api` code and deploy it to the running "api" process (e.g., the 
  local `ag-solo` process)
* Include the contract installation configuration information in the bundle
* Create new currencies and add them to the application's wallet

Steps for contracts that use a singleton instance for all clients may further include:
* Instantiate a contract instance using the installation created when the contract deployed
* Use the invitation from that instance creation to configure the new instance
* Register the contract instance's `instanceHandle` with the Registry
* Record the contract instance's Registry key in a configuration file

## How it works

All deployment happens via the local running Agoric process (specifically, the `ag-solo` 
process) that communicates with either a locally running
or remote chain. The local process has a `home` object, which contains 
references to services on-chain, include `zoe`, the default `registry`, and the 
application user's `wallet`. Deploying to the chain uploads 
the bundled contract source code to the local process, and then uses its `zoe` 
access (via that `home` object) to install the code on chain. All the commands
it uses can be used manually by the developer via the REPL associated with the 
wallet.

The deploy.js scripts run in an ephemeral Node.js outside of the swingset kernel.
The spawner runs within ag-solo, so is persistent. Once the deploy.js script ends,
connections to any of its objects are severed.


