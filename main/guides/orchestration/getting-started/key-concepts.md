# Orchestration Key Concepts

Here, we overview the fundamental concepts involved with building orchestration smart contracts.


### Interchain Account (ICA)

[Interchain Accounts](/glossary/#ica) (ICAs) are an IBC feature used in Agoric’s orchestration API. They enable an Agoric smart contract to control an account on another blockchain within the Cosmos ecosystem, facilitated by Agoric [Orchestration](#orchestration) API. This feature leverages the [Inter-Blockchain Communication (IBC)](#ibc) protocol to facilitate interactions and transactions across different blockchains seamlessly.


<br/>
<img src="../assets/icaoverview.png" width="100%" />
<br/>

Photo credit: [cosmos.network documentation](https://tutorials.cosmos.network/academy/3-ibc/8-ica.html)

A key advantage of ICAs is that they make accounts on other chains look like any other (remotable) object, meaning normal object access rules (introduction/parenthood/endowment/initial conditions) apply. When a contract creates an ICA, it has sole access to and control over the account but can delegate certain forms of access to its clients. 

For a detailed explanation of these access control rules, see [Access Control with Objects](/guides/zoe/contract-access-control).



### Example ICA Usage from a Smart Contract

```javascript
const stackAndSwapFn = async (orch, ...) => {
...
  const omni = await orch.getChain('omniflixhub');
  const agoric = await orch.getChain('agoric');

  const [omniAccount, localAccount] = await Promise.all([
    omni.makeAccount(),
    agoric.makeAccount(),
  ]);

  const omniAddress = omniAccount.getAddress();

  // deposit funds from user seat to LocalChainAccount
...
  const transferMsg = orcUtils.makeOsmosisSwap({ ... });

  await localAccount
    .transferSteps(give.Stable, transferMsg)
    .then(_txResult =>
      omniAccount.delegate(offerArgs.validator, offerArgs.staked),
    )
    .catch(e => console.error(e));
};
```




### ChainHub

The `makeChainHub` utility manages the connections and metadata for various blockchain networks. It simplifies accessing and interacting with multiple chains, providing a unified interface for the orchestration logic to manage cross-chain operations effectively. ChainHub also allows for dynamic registration and usage of chains.

```javascript
const chainHub = makeChainHub(remotePowers.agoricNames);

// Register a new chain with its information
chainHub.registerChain(chainKey, chainInfo);

// Register a connection between the Agoric chain and the new chain
chainHub.registerConnection(
  agoricChainInfo.chainId,
  chainInfo.chainId,
  connectionInfo,
);
```

In this example, chainHub is used to register a new chain and establish a connection between the Agoric chain and the newly registered chain. This setup ensures that the orchestration logic can interact with the chain even before it has been assigned a user-friendly name by BLD stakers.

### Vow Tools

These tools handle promises and asynchronous operations within the contract. `prepareVowTools` prepares the necessary utilities to manage these asynchronous tasks, ensuring that the contract can handle complex workflows that involve waiting for events or responses from other chains.

```javascript
const vowTools = prepareVowTools(zone.subZone('vows'));
...
const makeLocalOrchestrationAccountKit = prepareLocalChainAccountKit(
  zone,
  makeRecorderKit,
  zcf,
  privateArgs.timerService,
  vowTools,
  makeChainHub(privateArgs.agoricNames),
);
...
const makeCosmosOrchestrationAccount = prepareCosmosOrchestrationAccount(
  zone,
  makeRecorderKit,
  vowTools,
  zcf,
);
```


### Orchestration Account

Orchestration accounts are a key concept in the Agoric Orchestration API, represented by the OrchestrationAccountI interface. These accounts provide high-level operations for managing accounts on remote chains, allowing seamless interaction and management of interchain accounts. The orchestration accounts abstract the complexity of interchain interactions, providing a unified and simplified interface for developers.


1. 	Address Management
```javascript
const address = await orchestrationAccount.getAddress();
```

2.	Balance Management
- getBalances returns an array of amounts for every balance in the account.
-	getBalance retrieves the balance of a specific denom for the account.
```javascript
const balances = await orchestrationAccount.getBalances();
const balance = await orchestrationAccount.getBalance('uatom');
```

3.	Funds Transfer
- send transfers an amount to another account on the same chain.
- transfer transfers an amount to another account, typically on another chain.
- transferSteps transfers an amount in multiple steps, handling complex transfer paths.

```javascript
await orchestrationAccount.send(receiverAddress, amount);
await orchestrationAccount.transfer(amount, destinationAddress);
await orchestrationAccount.transferSteps(amount, transferMsg);
```

