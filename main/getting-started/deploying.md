# Deploying contracts and applications

The deploy command in the [agoric command line tool](https://agoric.com/documentation/getting-started/agoric-cli-guide.html#agoric-deploy) 
supports deploying contracts and offchain web applications that talk to them. The script is used for two primary purposes:

* deploy smart contract source code onto the blockchain
* deploy and setup an application program to the local server 

## Contract deployment

The primary function of `contract/deploy.js` is to bundle up the source code 
for the contract (which may include multiple files and modules) and "install" 
it on the blockchain as source code, using `zoe`. This does _not_ execute 
contract code; it just makes the code available on-chain.

The contract deployment process uses the [`zoe.install` operation](https://agoric.com/documentation/zoe/api/zoe.html#e-zoe-install-code-moduleformat) to install 
the source code on-chain. The operation results in an installation handle associated with the 
source code. In the typical contract deployment, the installation handle is stored 
in the default shared registry to make it broadly accessible on the chain,
and its registry name is stored with is written to the config file in the 
`ui` directory. 

A typical contract deploy script can be found in the [dapp-encouragement repository](https://github.com/Agoric/dapp-encouragement/blob/master/contract/deploy.js).

Deplouying that (e.g., with `agoric deploy contract/deploy.js`)  results in an 
installation of the `dapp-encouragement` contract on chain, and generates the 
file `./ui/public/conf/installationConstants.js`
with the contents like:
```js
// GENERATED FROM dapp-encouragement/contract/deploy.js
export default {
    "CONTRACT_NAME": "encouragement",
    "INSTALLATION_REG_KEY": "encouragementinstallation_9794"
};
```
The particular registry key, `"encouragementinstallation_9794"` is 
determined by the registry, and so will be different for each contract deploy.

## Application service deployment and setup

API server deployment is much more custom for the particular application and 
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

An example of the additions needed to support IBC can be found in the 
[`dibc-encouragement` branch](https://github.com/Agoric/dapp-encouragement/compare/master..dibc-encouragement).

 Steps in the application deployment may include:
* Bundle the `api` code and deploy it to the running "api" process (e.g., the 
  local `ag-solo` process)
* Include the contract installation configuration information in the bundle
* Create new currencies and add them to the application's wallet

Steps for contracts that use a singleton instance for all clients may further include:
* Instantiate an instance using the installation created in the contract deploy step
* Use the invitation from that creation to configure the new instance
* Register the `instanceHandle` of the contract instance with the registry
* Record the registry key for the instance in a configuration file

# Notes on how it works

All deployment is performed via the local running Agoric process (the `ag-solo` 
process, specifically) that communicates with the chain (either a locally running
chain or a remote chain). The local process has a `home` object that contains 
references to services on-chain, include `zoe`, the default `registry`, the 
application user's `wallet`, etc. Deploying to the chain is done by uploading 
the bundled contract source code to the local process, and it uses its `zoe` 
access (via that `home` object) to install the code on chain. All the commands
it uses can be used manually by the developer via the REPL associated with the 
wallet.

The deploy.js scripts run in an ephemeral Node.js outside of the swingset kernel.
The spawner runs within ag-solo, so is persistent. Once the deploy.js script ends,
connections to any of its objects are severed.


