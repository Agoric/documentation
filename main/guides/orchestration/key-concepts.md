# Orchestration Key Concepts and APIs

This document provides an overview of the fundamental concepts involved in building Orchestration smart contracts,
focusing on Orchestrator Interface, Orchestration Accounts, and ChainHub.

## Orchestrator Interface

The [`Orchestrator`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator) interface provides a
set of high-level methods to manage and interact with local and remote chains. Below are the primary methods:

### Access Chain Object

- `getChain` retrieves a chain object for the given `chainName` to get access to chain-specific methods. See [getChain](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#getChain).

```js
const chain = await orchestrator.getChain('chainName');
```

### Brand Utility Functions

- `getBrandInfo` returns information about a `denom`, including the equivalent local Brand, the chain where the denom is
  held, and the chain that issues the corresponding asset. See [getBrandInfo](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#getBrandInfo).

```js
const brandInfo = orchestrator.getBrandInfo('denom');
```

- `asAmount` converts a denom amount to an `Amount` with a brand. See [asAmount](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#asAmount).

```js
const amount = orchestrator.asAmount({ denom: 'uatom', value: 1000n });
```

## Orchestration Account

Orchestration accounts are a key concept in the Agoric Orchestration API, represented by the [`OrchestrationAccountI`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI)
interface. These accounts provide high-level operations for managing accounts on remote chains, allowing seamless
interaction and management of interchain accounts. The Orchestration accounts abstract the complexity of interchain
interactions, providing a unified and simplified interface for developers.

### Account Creation

- `makeAccount` (for a chain object) creates a new account on local and/or remote chain as below.

```js
const [agoric, remoteChain] = await Promise.all([
  orch.getChain('agoric'),
  orch.getChain(chainName)
]);
const [localAccount, remoteAccount] = await Promise.all([
  agoric.makeAccount(),
  remoteChain.makeAccount()
]);
```

### Address Management

- `getAddress` retrieves the address of the account on the remote chain.

```js
const address = await orchestrationAccount.getAddress();
```

### Balance Management

- `getBalances` returns an array of amounts for every balance in the account.
- `getBalance` retrieves the balance of a specific denom for the account.

```js
const balances = await orchestrationAccount.getBalances();
const balance = await orchestrationAccount.getBalance('uatom');
```

### Funds Transfer

- `send` transfers an amount to another account on the same chain.
- `transfer` transfers an amount to another account, typically on another chain.
- `transferSteps` transfers an amount in multiple steps, handling complex transfer paths.
- `deposit` deposits payment from Zoe to the account. For remote accounts, an IBC Transfer will be executed to transfer
  funds there.

```js
await orchestrationAccount.send(receiverAddress, amount);
await orchestrationAccount.transfer(amount, destinationAddress);
await orchestrationAccount.transferSteps(amount, transferMsg);
await orchestrationAccount.deposit(payment);
```

## ChainHub

ChainHub is a centralized registry of chains, connections, and denoms that simplifies accessing and interacting with
multiple chains, providing a unified interface for the Orchestration logic to manage cross-chain operations effectively.
A chainHub instance can be created using a call to `makeChainHub` that makes a new ChainHub in the zone (or in the heap
if no [zone](/glossary/#zone) is provided). The resulting object is an [Exo](/glossary/#exo) singleton. It has no
precious state. Its only state is a cache of queries to `agoricNames` and the info provided in registration calls. When
you need a newer version you can simply make a hub and repeat the registrations. ChainHub allows dynamic registration
and use of chain and connection information using the following APIs:

### Registration APIs

- `registerChain` register a new chain with `chainHub`. The name will override a name in well-known chain names.
- `registerConnection` registers a connections between two given chain IDs.
- `registerAsset` registers an asset that may be held on a chain other than the issuing chain. Both corresponding chains
  should already be registered before this call.

### Information Retrieval

- `getChainInfo` takes a chain name to get chain info.
- `getConnectionInfo` returns `Vow<IBCConnectionInfo>` for two given chain IDs.
- `getChainsAndConnection` is used to get chain and connection info given primary and counter chain names.
- `getAsset` retrieves holding, issuing chain names etc. for a denom.
- `getDenom` retrieves denom (string) for a `Brand`.

In the below example, `chainHub` is used to register a new chain and establish a connection between the Agoric chain and
the newly registered chain.

```js
const chainHub = makeChainHub(privateArgs.agoricNames, vowTools);

// Register a new chain with its information
chainHub.registerChain(chainKey, chainInfo);

// Register a connection between the Agoric chain and the new chain
chainHub.registerConnection(
  agoricChainInfo.chainId,
  chainInfo.chainId,
  connectionInfo
);
```
