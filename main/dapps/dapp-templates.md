## Dapp Templates

When creating a new dapp using `agoric init`, you have the option of
starting from a number of templates. To use a template other than the default, add the
`--dapp-template` option:

```sh
agoric init --dapp-template dapp-fungible-faucet my-fungible-faucet
```

### Fungible Faucet Dapp

[Github:
dapp-fungible-faucet](https://github.com/Agoric/dapp-fungible-faucet#fungible-faucet-dapp)

Gives fungible tokens on request. Frontend is raw JavaScript with
[Material Design Components](https://material-components.github.io/material-components-web-catalog/#/).

### Card Store Dapp

[Github: dapp-card-store](https://github.com/Agoric/dapp-card-store#baseball-card-store-dapp)

Mints NFT (non-fungible token) baseball cards and lets users buy them with their
fungible tokens from the Fungible Faucet Dapp. Frontend is raw
JavaScript with [Material Design
Components](https://material-components.github.io/material-components-web-catalog/#/).

### OTC Desk Dapp

[Github: dapp-otc](https://github.com/Agoric/dapp-otc)

Gives custom quotes to users, in the form of an exercisable call
option. This dapp has no frontend, but does have [a video
tutorial](https://www.youtube.com/watch?v=faxrecQgEio) that walks
through the development.

### Oracle Dapp

[Github: dapp-oracle](https://github.com/Agoric/dapp-oracle)

A generic way to interact with oracles such as the [Chainlink](https://chain.link)
decentralized oracle network. Frontend is raw JavaScript.

### Pegasus Dapp

[Github: dapp-pegasus](https://github.com/Agoric/dapp-pegasus)

Peg/transfer Agoric digital assets to or from remote entities via the [Agoric Network API](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md).  The Network API notably allows smart contracts written in Javascript to communicate between blockchains via _dIBC_ (our dynamic flavour of [IBC](https://cosmos.network/ibc), the Inter-Blockchain Communication protocol).

Pegasus currently uses the packet data JSON format of the Interchain Standard fungible asset transfer protocol ([ics20-1](https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer)).  The combination of ICS20 and IBC provides compatibility with any conforming implementation such as pegging [Cosmos](https://cosmos.network) Atoms via (an upcoming version of) the Gaia hub.

Frontend is React.

### Encouragement Dapp

[Github:
dapp-encouragement](https://github.com/Agoric/dapp-encouragement)

Sends encouragement messages to the user through either the dapp
backend or by minting encouragement NFT tokens in a contract.
Frontend is raw JavaScript.

### Simple Exchange Dapp

[Github:
dapp-simple-exchange](https://github.com/Agoric/dapp-simple-exchange)

A DeFi exchange with a naively-implemented on-chain orderbook.
Frontend is React.

### Agoric Wallet Dapp

[Github: dapp-svelte-wallet in
agoric-sdk](https://github.com/Agoric/agoric-sdk/tree/master/packages/dapp-svelte-wallet)

The Agoric Wallet is implemented as a dapp. Lets the user hold digital
assets in purses, interact with dapps, approve offers to contracts,
and send payments. Frontend is Svelte.
