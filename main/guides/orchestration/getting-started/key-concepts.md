# Orchestration Key Concepts

This document provides an overview of the fundamental concepts involved in building orchestration smart contracts, focusing on Interchain Accounts (ICA), ChainHub, and Orchestration Accounts.

---

## Interchain Account (ICA)

[Interchain Accounts](/glossary/#interchain-account-ica) (ICAs) are an IBC feature utilized within Agoric’s Orchestration API. They enable an Agoric smart contract to control an account on another blockchain in the Cosmos ecosystem. The [Inter-Blockchain Communication (IBC)](/glossary/#ibc) protocol facilitates seamless interactions and transactions across different blockchains.

#### Benefits of ICAs
- **Cross-chain Control**: ICAs allow a contract to manage accounts on other chains, treating them like any other (remotable) object.
- **Access Control**: Only the contract that creates the ICA has full control over it but can delegate specific access permissions to clients.

For more details on access control, refer to [Access Control with Objects](/guides/zoe/contract-access-control).


### Example: ICA Usage in a Smart Contract

Here’s an example of ICA usage from one of the [sample contracts](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/examples/swapExample.contract.js):

```js
const stakeAndSwapFn = async (orch, ...) => {
  const omni = await orch.getChain('omniflixhub');
  const agoric = await orch.getChain('agoric');

  const [omniAccount, localAccount] = await Promise.all([
    omni.makeAccount(),
    agoric.makeAccount(),
  ]);

  const omniAddress = omniAccount.getAddress();

  // Deposit funds from user seat to LocalChainAccount
  const transferMsg = orcUtils.makeOsmosisSwap({ ... });

  try {
    await localAccount.transferSteps(give.Stable, transferMsg);
    await omniAccount.delegate(offerArgs.validator, offerArgs.staked);
  } catch (e) {
    console.error(e);
  }
};
```

## ChainHub

The `makeChainHub` utility manages the connections and metadata for various blockchain networks. It creates a new `ChainHub` instance implementing the [`ChainHubI`](https://github.com/Agoric/agoric-sdk/blob/000693442f821c1fcea007a2df740733b1f75ebe/packages/orchestration/src/exos/chain-hub.js#L70-L80C4) interface.

It simplifies accessing and interacting with multiple chains, providing a unified interface for the orchestration logic to manage cross-chain operations effectively.
ChainHub also allows dynamic registration and use of chain and connection information.

```js
const chainHub = makeChainHub(remotePowers.agoricNames);

// Register a new chain with its information
chainHub.registerChain(chainKey, chainInfo);

// Register a connection between the Agoric chain and the new chain
chainHub.registerConnection(
  agoricChainInfo.chainId,
  chainInfo.chainId,
  connectionInfo
);
```

In this example, `chainHub` is used to register a new chain and establish a connection between the Agoric chain and the newly registered chain.

## Orchestration Account

Orchestration accounts are a key concept in the Agoric Orchestration API, represented by the [`OrchestrationAccountI`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI) interface. These accounts provide high-level operations for managing accounts on remote chains, allowing seamless interaction and management of interchain accounts. The orchestration accounts abstract the complexity of interchain interactions, providing a unified and simplified interface for developers.

**1. Address Management**

- `getAddress` retrieves the address of the account on the remote chain.

```js
const address = await orchestrationAccount.getAddress();
```

**2. Balance Management**

- `getBalances` returns an array of amounts for every balance in the account.
- `getBalance` retrieves the balance of a specific denom for the account.

```js
const balances = await orchestrationAccount.getBalances();
const balance = await orchestrationAccount.getBalance('uatom');
```

**3. Funds Transfer**

- `send` transfers an amount to another account on the same chain.
- `transfer` transfers an amount to another account, typically on another chain.
- `transferSteps` transfers an amount in multiple steps, handling complex transfer paths.

```js
await orchestrationAccount.send(receiverAddress, amount);
await orchestrationAccount.transfer(amount, destinationAddress);
await orchestrationAccount.transferSteps(amount, transferMsg);
```

To see the function the Orchestration API exposes, see [Orchestration API](/guides/orchestration/getting-started/api.html)
