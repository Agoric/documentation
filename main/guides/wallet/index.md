# Smart Wallet

This page documents the _smart wallet_: what it is, how it is provisioned, and
how clients drive it. See also [Wallet UI](./ui) for the end-user signing
experience, and the [Smart Wallet API reference](/reference/wallet-api/) for
the message shapes and CLI.

::: tip Looking for the old ag-solo Wallet?
Earlier versions of this page documented an _ag-solo_ Wallet reached with
`agoric open` and a REPL presence at `home.wallet`. That architecture has
been retired. The wallet described below, provisioned on chain and driven by
signed messages, is what every current Agoric chain runs.
:::

## Wallet and Agoric Architecture

Each address that wants to interact with contracts on an Agoric chain is
provisioned a _smart wallet_: a durable object, held by the `walletFactory`
contract, that escrows the address's offer payments, tracks its live offers,
and publishes its state. The smart wallet lives entirely inside the chain's
JavaScript VM. Clients (a dapp frontend, the `agoric wallet` CLI, a signing
UI) never hold a direct reference to it; they interact with it exclusively
through signed Cosmos messages and vstorage reads.

## Provisioning

A wallet must be provisioned before it can be used. `walletFactory`'s
creator facet exposes `provideSmartWallet(address, bank, namesByAddressAdmin)`,
which either returns an address's existing wallet or creates one.
Provisioning has an on-chain cost, and is typically done with:

```sh
agoric wallet provision --account <address> --spend
```

See [`agoric wallet provision`](/reference/wallet-api/wallet-commands#agoric-wallet-provision)
for the full command, and `@agoric/react-components`'s smart wallet
provisioning UI (in the
[UI Component Library](/guides/UIComponentLibrary/#smart-wallet-provisioning))
for prompting a dapp user to provision from the browser.

## Driving the wallet: BridgeAction

Once provisioned, a wallet accepts exactly one kind of input: a
`BridgeAction`, a discriminated union of `executeOffer`, `tryExitOffer`, and
`invokeEntry`. A client marshals a `BridgeAction` to `CapData`, wraps it in
a Cosmos `MsgWalletAction` (read-only actions) or `MsgWalletSpendAction`
(actions that can move the address's assets), and submits it as a signed
transaction. The chain routes the message to `walletFactory`, which finds
the address's wallet and calls its `handleBridgeAction`.

This is the mechanism behind every offer a dapp makes on a user's behalf: the
dapp prepares an `OfferSpec` describing the invitation and proposal, the
user's wallet-signing UI (typically Keplr) shows the resulting transaction
for approval, and once signed and broadcast the smart wallet withdraws the
offered payments, calls `E(zoe).offer(...)`, and tracks the outcome.

For the complete message shapes, see the
[BridgeAction Reference](/reference/wallet-api/wallet-bridge). For the full
walkthrough of constructing, marshalling, and signing one from a dapp, see
[Building Client Dapps](/guides/getting-started/contract-rpc).

## Wallet state and vstorage

A wallet publishes its state under `published.wallet.<address>`: a
`.current` child holding a `CurrentWalletRecord` snapshot (purses, live
offers, used invitations), and the node itself streaming an `UpdateRecord`
for every change. Clients reconstruct a wallet's state by reading `.current`
once and then folding the update stream on top of it with the
`coalesceUpdates` helper from `@agoric/smart-wallet/src/utils.js`.

See [Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics)
for the full record shapes and worked `agoric follow` examples, and
[`agoric wallet show` / `agoric wallet watch`](/reference/wallet-api/wallet-commands)
for inspecting this state from a shell.

## Petnames

A `Petname` (`string | string[]`) is still how a smart wallet's own
holdings, such as purses by brand, are labeled for display. The older
protocol where a Dapp suggested petnames to the wallet over a wallet-bridge
iframe (`suggestIssuer`, `suggestInstallation`, `suggestInstance`) no longer
exists: brands and instances are looked up through
[`agoricNames`](/guides/integration/name-services) instead.
