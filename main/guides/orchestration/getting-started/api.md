# Orchestration API

The Agoric Orchestration API enables developers to seamlessly manage and interact with accounts across multiple blockchain networks, simplifying the complexities of cross-chain operations.

See [Orchestration API Spec](https://agoric-sdk.pages.dev/modules/_agoric_orchestration)

## Orchestrator Interface

The `Orchestrator` interface provides a set of high-level methods to manage and interact with interchain accounts. Below are the primary methods:

### `getChain`
Retrieves the chain information and provides access to chain-specific methods.

```javascript
const chain = await orchestrator.getChain('chainName');
```

### makeLocalAccount
Creates a new LocalChainAccount.

```javascript
const localAccount = await orchestrator.makeLocalAccount();
```

### getBrandInfo
Returns information about a `denom`, including the equivalent local Brand, the chain where the denom is held, and the chain that issues the corresponding asset.

```javascript
const brandInfo = orchestrator.getBrandInfo('denom');
```

### asAmount
Converts a denom amount to an `Amount` with a brand.

```javascript
const amount = orchestrator.asAmount({ denom: 'uatom', value: 1000n });
```

## OrchestrationAccount Interface
Orchestration accounts provide high-level operations for managing accounts on remote chains. Below are the primary methods available:

### getAddress
Retrieves the address of the account on the remote chain.
```javascript
const address = await orchestrationAccount.getAddress();
```

### getBalances
Returns an array of amounts for every balance in the account.

```javascript
const balances = await orchestrationAccount.getBalances();
```

### getBalance
Retrieves the balance of a specific denom for the account.

```javascript
const balance = await orchestrationAccount.getBalance('uatom');
```

### send
Transfers an amount to another account on the same chain. The promise settles when the transfer is complete.

```javascript
await orchestrationAccount.send(receiverAddress, amount);
```

### transfer
Transfers an amount to another account, typically on another chain. The promise settles when the transfer is complete.

```javascript
await orchestrationAccount.transfer(amount, destinationAddress);
```

### transferSteps
Transfers an amount to another account in multiple steps. The promise settles when the entire path of the transfer is complete.
```javascript
await orchestrationAccount.transferSteps(amount, transferMsg);
```

### deposit
Deposits payment from Zoe to the account. For remote accounts, an IBC Transfer will be executed to transfer funds there.
```javascript
await orchestrationAccount.deposit(payment);
```
