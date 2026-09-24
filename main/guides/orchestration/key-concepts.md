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

### Denom Utility Functions

- `getDenomInfo` returns information about a `denom`: the equivalent local `Brand` (if any), the `Chain` where the
  denom is currently held, and the `Chain` that issues the underlying asset. It is synchronous and returns the
  `DenomInfo` record directly (not a promise). It requires that `getChain` has already been called (and resolved)
  for both the holding chain and the issuing chain earlier in the flow; otherwise it throws. See
  [getDenomInfo](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.Orchestrator#getDenomInfo).

```js
// getChain must be awaited first so the Orchestrator has resolved the chains
// that back this denom.
await orch.getChain(srcChainName);
await orch.getChain(issuingChainName);

const denomInfo = orch.getDenomInfo(denom, srcChainName);
// => { brand, chain, base, baseDenom }
```

- `asAmount` is declared to convert a `DenomAmount` to a local, structured `Amount`, but as of this writing it is not
  yet implemented in `@agoric/orchestration` (it throws `not yet implemented`). Do not rely on it; look up the
  `Brand` via `getDenomInfo` or a chain's `getVBankAssetInfo()` and construct the `Amount` with `AmountMath` instead.

## Orchestration Account

Orchestration accounts are a key concept in the Agoric Orchestration API, represented by the [`OrchestrationAccountCommon`](https://agoric-sdk.pages.dev/interfaces/_agoric_orchestration.OrchestrationAccountCommon)
interface, which every account (local or remote) implements. These accounts provide high-level operations for
managing accounts on remote chains, allowing seamless interaction and management of interchain accounts. The
Orchestration accounts abstract the complexity of interchain interactions, providing a unified and simplified
interface for developers.

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

- `getAddress` retrieves the address of the account on the remote chain. It is synchronous; do not `await` it.

```js
const address = orchestrationAccount.getAddress();
```

### Balance Management

- `getBalances` returns an array of amounts for every balance in the account.
- `getBalance` retrieves the balance of a specific denom for the account.

Both throw if the chain does not have ICQ enabled (`icqEnabled` in its `CosmosChainInfo`); see
[how-orch-works](./how-orch-works.md).

```js
const balances = await orchestrationAccount.getBalances();
const balance = await orchestrationAccount.getBalance('uatom');
```

### Funds Transfer

- `send` transfers an amount to another account on the same chain: `send(toAccount, amount, opts?)`.
- `sendAll` transfers multiple amounts to another account on the same chain in one transaction:
  `sendAll(toAccount, amounts, opts?)`.
- `transfer` transfers an amount to another account, typically on another chain. The destination comes first:
  `transfer(destination, amount, opts?)`.
- `transferSteps` transfers an amount across a multi-hop path, handling complex transfer paths. Here the amount
  comes first: `transferSteps(amount, transferMsg)`.
- `makeProgressTracker` returns a `ProgressTracker` that can be passed as `{ progressTracker }` in the options of a
  transfer-like call to receive incremental updates as a multi-step transfer progresses.
- `getPublicTopics` returns the account's published vstorage topics (used together with `asContinuingOffer` to
  expose account state to a smart-wallet client).

```js
await orchestrationAccount.send(receiverAddress, amount);
await orchestrationAccount.sendAll(receiverAddress, [amount1, amount2]);
await orchestrationAccount.transfer(destinationAddress, amount);
await orchestrationAccount.transferSteps(amount, transferMsg);
```

`deposit` (move a Zoe `Payment` into the account) is **not** part of `OrchestrationAccountCommon`. It is only
available on the local (Agoric) account facet, via `LocalAccountMethods`:

```js
// only on the local Agoric chain account, for example agoricAccount from agoric.makeAccount()
const depositedAmount = await agoricAccount.deposit(payment);
```

Cosmos accounts do not have `deposit`; move funds onto a cosmos account with `transfer` instead. A Noble account has
its own `depositForBurn` for CCTP transfers; see the
[send-anywhere walkthrough](./contract-walkthroughs/send-anywhere.md).

## ChainHub

ChainHub is a centralized registry of chains, connections, and denoms that simplifies accessing and interacting with
multiple chains, providing a unified interface for the Orchestration logic to manage cross-chain operations
effectively. The resulting object is an [Exo](/glossary/#exo) singleton. It has no precious state: its only state is
a cache of queries to `agoricNames` and the info provided in registration calls. When you need a newer version you
can simply make a hub and repeat the registrations.

`withOrchestration` (see [`start-helper.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/utils/start-helper.js))
creates and provides a `chainHub` instance as part of the `tools` passed to a contract's `start` function, so most
contracts do not call `makeChainHub` directly; it is mainly useful when constructing a `ChainHub` outside of a
contract, such as in tests.

### Registering chains and assets

The idiomatic way for a contract to populate its `chainHub` is `registerChainsAndAssets`, called once during
`start` with the `chainInfo`/`assetInfo` the contract received in `privateArgs`:

```js
import { registerChainsAndAssets } from '@agoric/orchestration/src/utils/chain-hub-helper.js';

// inside the contract's start function, given `{ chainHub }` from `tools`
registerChainsAndAssets(
  chainHub,
  zcf.getTerms().brands,
  privateArgs.chainInfo,
  privateArgs.assetInfo
);
```

This registers every chain in `chainInfo` (and the connections nested under each chain's `connections` field), then
every asset in `assetInfo`, resolving each asset's `brandKey` against the contract's `brands`. Well-known chains
(the ones already indexed in `agoricNames`, such as `agoric`, `cosmoshub`, `osmosis`, `noble`) are looked up
automatically and do not need to be registered this way.

For lower-level, one-off registration (for example from a creator facet after the contract has started), `chainHub`
also exposes the primitives `registerChain`, `registerConnection`, and `registerAsset` directly:

```js
chainHub.registerChain(chainKey, chainInfo);
chainHub.registerConnection(
  agoricChainInfo.chainId,
  chainInfo.chainId,
  connectionInfo
);
chainHub.registerAsset(denom, denomDetail);
```

`prepareChainHubAdmin` (in [`chain-hub-admin.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/exos/chain-hub-admin.js))
wraps `registerChain`/`registerAsset` as a durable creator-facet API for adding chain configuration after the
contract has already started.

### Information Retrieval

- `getChainInfo(chainName)` returns a `Vow<ChainInfo>` for a chain name.
- `getChainInfoByChainId(chainId)` returns the `ChainInfo` (synchronously) for a CAIP chain ID, once that chain has
  been registered or looked up.
- `getConnectionInfo(primary, counter)` returns a `Vow<IBCConnectionInfo>` for two given chain IDs.
- `getChainsAndConnection(primaryName, counterName)` returns a `Vow` of chain and connection info given primary and
  counterparty chain names.
- `getAsset(denom, srcChainName)` retrieves the `DenomDetail` (holding/issuing chain names, base denom, brand) for a
  denom.
- `getDenom(brand)` retrieves the denom (string) for a `Brand`, or `undefined` if it is not registered.
