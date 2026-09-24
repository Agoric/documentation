# BridgeAction Reference

A smart wallet is driven entirely by `BridgeAction` messages. There is no
in-process API to call: every command a client sends to a wallet
(`agoric wallet` CLI, a dapp frontend, a signing UI) is a `BridgeAction`
value, marshalled to `CapData` and delivered over the Cosmos bridge described
in [Signing and Broadcasting Offers](/guides/getting-started/contract-rpc#signing-and-broadcasting-offers).
This page documents the `BridgeAction` union and the message shapes it
contains. For the full marshalling walkthrough (board IDs, `CapData`, the
`spend_action` string), see
[Building Client Dapps](/guides/getting-started/contract-rpc).

Source: [`packages/smart-wallet/src/smartWallet.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/smart-wallet/src/smartWallet.js),
[`packages/smart-wallet/src/offers.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/smart-wallet/src/offers.js),
[`packages/smart-wallet/src/types.ts`](https://github.com/Agoric/agoric-sdk/blob/master/packages/smart-wallet/src/types.ts).

## `BridgeAction`

```ts
type BridgeAction = ExecuteOfferAction | TryExitOfferAction | InvokeEntryAction;
```

### `executeOffer`

```ts
{ method: 'executeOffer', offer: OfferSpec }
```

Withdraws any payments the offer's proposal calls for, makes the offer to
Zoe, and tracks its outcome. Requires spend authority (see
[Spend authority](#spend-authority) below); the wallet rejects an
`executeOffer` sent without it.

### `tryExitOffer`

```ts
{ method: 'tryExitOffer', offerId: OfferId }
```

Looks up the seat for a still-live offer by its `offerId` and calls
`E(seat).tryExit()` on it. Requires spend authority.

### `invokeEntry`

```ts
{ method: 'invokeEntry', message: InvokeEntryMessage }
```

Invokes a method on a value the wallet previously saved (see
[`saveResult`](#resultplan-and-saved-results) below). Does not require spend
authority: it can call only what the wallet has already chosen to save, and
cannot withdraw or move assets on its own.

## `OfferSpec`

```ts
type OfferSpec = {
  id: OfferId; // number | string
  invitationSpec: InvitationSpec;
  proposal: Proposal;
  offerArgs?: any;
  saveResult?: ResultPlan;
};
```

`invitationSpec` is a discriminated union (`agoricContract` | `contract` |
`purse` | `continuing`) describing how the wallet should obtain the
`Invitation` to pass to `E(zoe).offer(...)`. `proposal` is the ordinary Zoe
`{ give, want, exit }` record. Each of `invitationSpec`'s four variants,
with worked examples, is documented in
[Specifying Offers](/guides/getting-started/contract-rpc#specifying-offers).

`id` must be unique among offers this wallet has ever seen (including
offers from before an upgrade); the wallet throws on reuse. A `continuing`
invitation spec elsewhere in the same or a later offer refers back to this
`id` via its `previousOffer` property.

## `OfferStatus`

Every offer's progress is published as an `OfferStatus`, an `OfferSpec`
extended with:

```ts
type OfferStatus = OfferSpec & {
  error?: string;
  numWantsSatisfied?: number;
  result?: unknown | 'UNPUBLISHED' | { name: string; passStyle: string };
  payouts?: AmountKeywordRecord;
};
```

`result` is `'UNPUBLISHED'` when the offer's result cannot be represented in
`CapData` (for example, a live remote presence) and no `saveResult` was
given for it. See [Wallet vstorage state](#wallet-vstorage-state) for where
`OfferStatus` values are published.

## `ResultPlan` and saved results

```ts
type ResultPlan = { name: string; overwrite?: boolean };
```

An `OfferSpec` (or an `InvokeEntryMessage`) can carry a `saveResult` plan.
Instead of publishing the raw offer result or invocation result to
vstorage, the wallet stores it under `name` in a private, per-wallet store
and returns the (possibly disambiguated) name it actually used. A later
`invokeEntry` action names that same store entry as its `targetName` to
call a method on it:

```ts
type InvokeEntryMessage = {
  targetName: string;
  method: string;
  args: Passable[];
  saveResult?: ResultPlan;
  id?: number | string;
};
```

`saveResult` on an `InvokeEntryMessage` lets an invocation's own result be
saved under a further name, so invocations can be chained without ever
publishing an intermediate capability to vstorage.

## Spend authority

`handleBridgeAction` on the wallet takes a `canSpend` boolean alongside the
`BridgeAction` `CapData`. `executeOffer` and `tryExitOffer` both assert
`canSpend`; `invokeEntry` does not require it. `canSpend` is set by which
Cosmos message carried the action, not by anything in the `BridgeAction`
itself:

```ts
type WalletActionMsg = {
  type: 'WALLET_ACTION';
  owner: string; // bech32 address
  action: string; // JSON of marshalled BridgeAction
  blockHeight: unknown;
  blockTime: unknown;
};

type WalletSpendActionMsg = {
  type: 'WALLET_SPEND_ACTION';
  owner: string;
  spendAction: string; // JSON of marshalled BridgeAction
  blockHeight: unknown;
  blockTime: unknown;
};
```

These correspond with the Cosmos `agoric.swingset.MsgWalletAction` and
`agoric.swingset.MsgWalletSpendAction` proto messages: a signed
`MsgWalletSpendAction` grants spend authority, a signed `MsgWalletAction`
does not. This split is what lets a signing UI show the user only
spend-authorizing transactions for explicit approval, while read-only or
already-scoped `invokeEntry` calls can be sent without a spend prompt.

## Wallet vstorage state

Once a `BridgeAction` is handled, its effects are published to vstorage
under `published.wallet.<address>`. See
[Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics)
for the full `CurrentWalletRecord` and `UpdateRecord` shapes and worked
`agoric follow` examples.

## See also

- [Smart Wallet](/guides/wallet/) for the architecture this reference
  assumes (`walletFactory`, provisioning, signing).
- [agoric wallet CLI](./wallet-commands) for preparing and sending these
  messages from a shell.
- [Building Client Dapps](/guides/getting-started/contract-rpc) for the
  full offer lifecycle and `CapData` marshalling.
