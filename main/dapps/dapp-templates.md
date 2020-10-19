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
JavaScript with [Material Design Components](https://material-components.github.io/material-components-web-catalog/#/).

### Encouragement Dapp

[Github:
dapp-encouragement](https://github.com/Agoric/dapp-encouragement)

Sends encouragement messages to the user through either the dapp
backend or by minting encouragement NFT tokens in a contract.
Frontend is raw JavaScript.

### Autoswap Dapp

[Github: dapp-autoswap](https://github.com/Agoric/dapp-autoswap)

A Uniswap implementation that lets the user trade fungible
tokens. Frontend is React.

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