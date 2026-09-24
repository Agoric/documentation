# Wallet UI

::: tip Looking for a standalone Agoric Wallet app?
There is no longer a separate Agoric Wallet web application to open and
browse. Each dapp embeds wallet connection, provisioning, and offer signing
directly in its own UI, using
[`@agoric/react-components`](/guides/UIComponentLibrary/). Signing itself
happens in the user's browser-extension wallet, typically Keplr.
:::

## Connecting

A dapp built with `@agoric/react-components` renders a
[Connect Wallet button](/guides/UIComponentLibrary/#connect-wallet). Clicking
it opens the user's choice of Cosmos signing extension (Keplr is the common
case) and asks them to approve the connection. Once connected, the dapp's
`useAgoric()` hook exposes the connected address and a live, coalesced view
of the wallet's purses, without the dapp needing to talk to vstorage
directly. See
[Connect Wallet](/guides/getting-started/ui-tutorial/connect-wallet) in the
Getting Started tutorial for a worked example.

## Provisioning

If the connected address has no smart wallet yet, `AgoricProviderLite` shows
a provisioning notice before the dapp can make offers, explaining the
one-time on-chain cost. See
[Smart Wallet Provisioning](/guides/UIComponentLibrary/#smart-wallet-provisioning)
for how a dapp customizes this notice, and
[Provisioning](/guides/wallet/#provisioning) for what happens on chain when
the user accepts it.

## Making and approving an offer

When a dapp prepares an offer, it does not talk to the wallet directly.
Instead it builds an `OfferSpec`, has `@agoric/react-components` marshal and
wrap it as a `MsgWalletSpendAction`, and hands that transaction to the
connected signing extension. Keplr then shows the user the transaction to
approve: which contract instance the offer is for, and what assets it will
give and want, decoded from the underlying `BridgeAction` rather than shown
as opaque bytes. The user approves or rejects it in the extension, not in
the dapp's own UI; the dapp only learns the outcome once the transaction is
broadcast and its effects appear in the wallet's vstorage state.

See [BridgeAction Reference](/reference/wallet-api/wallet-bridge) for what
is actually inside that transaction, and
[Making an Offer](/guides/getting-started/ui-tutorial/making-an-offer) for
a worked dapp-side example.

## Purses and balances

A connected dapp reads purse balances through `useAgoric()`'s `purses`,
which merges the smart wallet's ERTP purses (published under
`published.wallet.<address>.current`) with the address's native Cosmos bank
balances, such as IST and BLD (queried directly from the bank module; the
smart wallet does not republish these). See
[VBank Assets and Cosmos Bank Balances](/guides/getting-started/contract-rpc#vbank-assets-and-cosmos-bank-balances)
for how the two are correlated. The same balances are also visible directly
in the signing extension's own asset list, since they are ordinary Cosmos
bank holdings of the address, not something specific to the smart wallet.

## Offer status

An offer's outcome (accepted, rejected, or still pending) is not a UI state
the dapp invents. It is read from the wallet's `liveOffers` and the
`offerStatus` updates streamed to `published.wallet.<address>`, described in
[Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics).
A dapp built on `@agoric/react-components` gets these coalesced
automatically; a script or CLI workflow can follow them directly with
[`agoric wallet watch`](/reference/wallet-api/wallet-commands#agoric-wallet-watch).
