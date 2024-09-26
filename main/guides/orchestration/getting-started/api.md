# Orchestration API

The Agoric [Orchestration](/glossary/#orchestration) API enables developers to seamlessly manage and interact with accounts across multiple blockchain networks, simplifying the complexities of cross-chain operations.

See [Orchestration API Spec](https://agoric-sdk.pages.dev/modules/_agoric_orchestration)

## Orchestrator Interface

The [`Orchestrator`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator) interface provides a set of high-level methods to manage and interact with interchain accounts. Below are the primary methods:

### getChain

Retrieves the chain information and provides access to chain-specific methods. See [getChain](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#getChain).

```js
const chain = await orchestrator.getChain('chainName');
```

### makeLocalAccount

Creates a new `LocalChainAccount`. See [makeLocalAccount](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#makeLocalAccount).

```js
const localAccount = await orchestrator.makeLocalAccount();
```

### getBrandInfo

Returns information about a `denom`, including the equivalent local Brand, the chain where the denom is held, and the chain that issues the corresponding asset. See [getBrandInfo](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#getBrandInfo).

```js
const brandInfo = orchestrator.getBrandInfo('denom');
```

### asAmount

Converts a denom amount to an `Amount` with a brand. See [asAmount](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#asAmount).

```js
const amount = orchestrator.asAmount({ denom: 'uatom', value: 1000n });
```

## OrchestrationAccount

An [`OrchestrationAccount`](https://agoric-sdk.pages.dev/types/_agoric_orchestration.OrchestrationAccount) is a type alias that combines the [`OrchestrationAccountI`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI) interface with additional methods. Below are the primary methods available:

### getAddress

Retrieves the address of the account on the remote chain. See [getAddress](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#getAddress).

```js
const address = await orchestrationAccount.getAddress();
```

### getBalances

Returns an array of amounts for every balance in the account. See [getBalances](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#getBalances).

```js
const balances = await orchestrationAccount.getBalances();
```

### getBalance

Retrieves the balance of a specific denom for the account. See [getBalance](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#getBalance).

```js
const balance = await orchestrationAccount.getBalance('uatom');
```

### send

Transfers an amount to another account on the same chain. The promise settles when the transfer is complete. See [send](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#send).

```js
await orchestrationAccount.send(receiverAddress, amount);
```

### transfer

Transfers an amount to another account, typically on another chain. The promise settles when the transfer is complete. See [transfer](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#transfer).

```js
await orchestrationAccount.transfer(amount, destinationAddress);
```

### transferSteps

Transfers an amount to another account in multiple steps. The promise settles when the entire path of the transfer is complete. See [transferSteps](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountI#transferSteps).

```js
await orchestrationAccount.transferSteps(amount, transferMsg);
```

### deposit

Deposits payment from Zoe to the account. For remote accounts, an IBC Transfer will be executed to transfer funds there.

```js
await orchestrationAccount.deposit(payment);
```
