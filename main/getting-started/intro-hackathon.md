# Getting Started for HackTheOrb, The Agoric x Chainlink Hackathon!

Welcome to the Agoric Platform! This doc is a guide to what you should
do to get started developing smart contracts and DeFi components.

## Install and run the Agoric platform

1. Follow the steps in **[Before Using the Agoric SDK](./before-using-agoric.md)** 
to install the software the Agoric SDK depends on.

2. Follow the steps in **[Start a Project](./start-a-project.md)** to
create a new Agoric SDK project from scratch. As part of this, you'll install
the Fungible Faucet Dapp we wrote to provide a simple skeleton for a smart contract.

## Introduction to Agoric concepts and design

Conceptually, you want to look at these docs:

1. **[ERTP Introduction](./ertp-introduction.md)**:
  A quick introduction to the concepts and components of Agoric's Electronic
  Rights Transfer Protocol (ERTP). Its components and methods create, store,
  transfer, and manipulate digital assets. 
2. **[Zoe Introduction](./intro-zoe.md)**: 
  This explains the concepts and components of Zoe, Agoric's reusable smart contract 
  for writing other smart contracts in JavaScript. Zoe implements our offer safety 
  guarantee that users either get what they wanted from the contract or a full refund
  of what they put up for it. 
3. **[Agoric Platform/Stack](/platform/README.md)**: A brief introduction to the complete Agoric platform/technical stack.
4. **[Agoric Dapp Guide](/dapps/README.md)** and **[Agoric Dapp Templates](/dapps/dapp-templates.md)**
   A Dapp is a distributed application, typically with a browser-based user interface, a public
   API server, and a contract running on the Agoric blockchain. 
   1. The Guide explains a Dapp's basic directory and file structure. 
   2. The Templates page lists and briefly describes pre-written Dapp templates you can install. 
      Each template description includes a link to its source code. Of likely interest to hackathon
      participants is the Oracle Dapp, a generic way to interact with oracles such as the Chainlink
      decentralized oracle network.
   
There are several ways you can go from here:
- [Watch](#videos) videos showing how to write smart contracts on the Agoric platform.
- [Read](#ertp-and-zoe-guides-and-apis) the more detailed Guides and look at our APIs.
- [Look](#example-contracts) at our already written sample contracts. 

For general help, you should be aware of and use:
- **[Agoric Glossary](/glossary/)**: Definitions of how we use terms on the Agoric platform (i.e. what does *mint* mean?).

## Videos

We have two videos of talks given to external audiences that are particularly useful for contract developers.

- [DeFi Workshops: Smart Contracts in JavaScript](https://www.youtube.com/watch?v=qudVWjSqDJU)
  by Dean Tribble covers general concepts with examples.
  
- [Building a Composable DeFi Contract](https://www.youtube.com/watch?v=faxrecQgEio) by Kate Sills walks through 
  programming first a covered call option contract, and then writing an OTC Desk contract that uses 
  the covered call contract.

## ERTP and Zoe Guides and APIs

For a deeper explanation of Agoric concepts, what you can accomplish with a contract,
and what Agoric API commands do, read the following:

- ERTP: 
  - The **[ERTP Guide](/ertp/guide/README.md)** is a detailed description of 
    ERTP concepts, design, components, and commands. 
  - The **ERTP API** is documented [here](/ertp/api/#ertp-api). 
- Zoe: 
  - The **[Zoe Guide](/zoe/guide/README.md)** is a detailed description of 
    Zoe concepts, design, components, and commands. 
  - The **Zoe API** is documented [here](/zoe/api/#zoe-api).
  
## Example contracts

To familiarize yourself with working Agoric smart contracts, take a look at our 
[documented sample contracts](/zoe/guide/contracts/README.md). They are:
- [Atomic Swap](/zoe/guide/contracts/atomic-swap.md)
- [Autoswap](/zoe/guide/contracts/autoswap.md)
- [Barter Exchange](/zoe/guide/contracts/barter-exchange.md)
- [Covered Call](/zoe/guide/contracts/covered-call.md)
- [Multipool Autoswap](/zoe/guide/contracts/multipoolAutoswap.md)
- [Second-price auction](/zoe/guide/contracts/second-price-auction.md)
- [Simple Exchange](/zoe/guide/contracts/simple-exchange.md)

In addition, the commented source code is available for these contracts:
- [automaticRefund](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/automaticRefund.js)
- [mintAndSellNFTs](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintAndSellNFT.js)
- [mintPayments](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintPayments.js)
- [otcDesk](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/otcDesk.js)
- [sellItems](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/sellItems.js)
- [useObjExample](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/contracts/useObjExample.js)
- [escrowToVote](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/contracts/escrowToVote.js) 

## Advanced or specialized documentation

The Agoric platform lets you write smart contracts in JavaScript, and run them where
they can communicate with other programs running on Cosmos, Ethereum, or BitCoin. 
We've made some Agoric-specific additions to JavaScript, and added functionality that
makes distributed programming both more secure and more approachable than other platforms.

Our **[JavaScript Distributed Programming Guide](/distributed-programming.md)**. 
describes the additional concepts, syntax, and tools available on our platform. You should know about 
and understand them before doing significant programming on the Agoric platform.

More specialized documentation includes:
- **[Wallet API Reference](/wallet-api.md)**: How to work with an Agoric wallet, which stores users' assets.
- **[Agoric CLI Guide](/getting-started/agoric-cli-guide.md)**: Details about Agoric CLI commands, which
  install dependencies, initialize, deploy, and start Agoric projects. It also tells how to use 
  the Agoric CLI to develop and test multiuser Dapps by deploying and starting a local-chain-multiuser scenario.
- **[Deploying Smart Contracts](./deploying.md)**: A brief description of the tools and processes 
  for deploying contracts to the chain and application code to the application server.
- **[dIBC (Dynamic Inter-Blockchain Communication Protocol) Guide](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md)**:
  Our enhancement to [IBC](https://cosmos.network/ibc) for connecting to services on other blockchains or making
  services on the Agoric blockchain available to other blockchains. 

Finally, our ultimate documentation is our **[GitHub
repository](https://github.com/Agoric/agoric-sdk)** for the code that defines the Agoric SDK.

## Support

Chat with our engineers on [Agoric Discord](https://discord.gg/gC9z6US).

You can also follow us on [Twitter](https://twitter.com/agoric), [Telegram](https://t.me/agoricsystems), and [LinkedIn](https://www.linkedin.com/company/agoric/).
