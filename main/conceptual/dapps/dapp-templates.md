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

Gives fungible tokens on request. The front end is raw JavaScript with
[Material Design Components](https://material-components.github.io/material-components-web-catalog/#/).

### Card Store Dapp

[Github: dapp-card-store](https://github.com/Agoric/dapp-card-store#baseball-card-store-dapp)

Mints NFT (non-fungible token) baseball cards and lets users buy them with their
fungible tokens from the Fungible Faucet Dapp. The front end is raw
JavaScript with [Material Design
Components](https://material-components.github.io/material-components-web-catalog/#/).

### OTC Desk Dapp

[Github: dapp-otc](https://github.com/Agoric/dapp-otc)

Gives custom quotes to users, in the form of an exercisable call
option. This dapp has no front end, but it does have [a video
tutorial](https://www.youtube.com/watch?v=faxrecQgEio) that walks
through the development.

### Oracle Dapp

[Github: dapp-oracle](https://github.com/Agoric/dapp-oracle)

A generic way to interact with oracles such as the [Chainlink](https://chain.link)
decentralized oracle network. The front end is raw JavaScript.
