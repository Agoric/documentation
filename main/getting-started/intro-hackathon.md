# Getting Started for HackTheOrb, The Agoric x Chainlink Hackathon!

Welcome to the Agoric Platform! This doc is a guide for developing smart contracts and DeFi components.

## Install and Run the Starter Dapp

1. [Install the prerequisites](./before-using-agoric.md)

2. Create the starter dapp

```sh
agoric init my-fungible-faucet
cd my-fungible-faucet
# Start the Agoric platform
agoric install && agoric start --reset
# In a second terminal
agoric deploy contract/deploy.js
agoric deploy api/deploy.js
# In a third terminal
cd ui && yarn start
```

Having trouble? Chat with our engineers on [Agoric Discord](https://discord.gg/gC9z6US). Also, check out our more [detailed documentation](./getting-started.md).

## Introduction to Agoric

You'll want to take look at these docs:

1. **[ERTP](./ertp-introduction.md)**: An intro to ERTP, our token standard for fungible and non-fungible tokens.
2. **[Zoe](./intro-zoe.md)**: An intro to Zoe, our smart contract runner. Zoe escrows and
   protects your users' digital assets, letting you focus on development. 
3. **[Agoric Stack](/platform/README.md)**: An intro to the Agoric technical stack.
4. **[Agoric Dapp Guide](/dapps/README.md)** and **[Agoric Dapp
   Templates](/dapps/dapp-templates.md)** There are a number of
   pre-written Dapp templates with UI you can install, such as our constant
   product AMM, Autoswap.

## Videos

Quickly get up to speed with some instructional videos:

- [DeFi Workshops: Smart Contracts in JavaScript](https://www.youtube.com/watch?v=qudVWjSqDJU)
  by Dean Tribble covers general concepts with examples.
  
- [Building a Composable DeFi Contract](https://www.youtube.com/watch?v=faxrecQgEio) by Kate Sills walks through 
  programming first a covered call option contract, and then writing an OTC Desk contract that uses 
  the covered call contract.

## Support

Need help? Chat with our engineers on [Agoric Discord](https://discord.gg/gC9z6US).
