# Smart Wallet API

A smart wallet is an on-chain object, one per provisioned address, created
and held by the `walletFactory` contract. There is no local REPL or
`home.wallet` presence to script against: everything a client does with a
wallet is a [`BridgeAction`](./wallet-bridge) message, delivered over the
Cosmos bridge and reflected back through vstorage. See
[Smart Wallet](/guides/wallet/) for the architecture and
[Building Client Dapps](/guides/getting-started/contract-rpc) for the full
dapp-integration walkthrough, including how a `BridgeAction` is marshalled
and signed.

This section documents:

- [BridgeAction Reference](./wallet-bridge): the `executeOffer` /
  `tryExitOffer` / `invokeEntry` message shapes a wallet accepts, and the
  `OfferSpec` / `OfferStatus` / `ResultPlan` types they carry.
- [agoric wallet CLI](./wallet-commands): the `agoric wallet` subcommands
  for provisioning a wallet and preparing, signing, and inspecting
  `BridgeAction` messages from a shell.
