# Getting Started for the Agoric Hackathon

Welcome to the Agoric Platform! This doc is a guide to what you should
look at and do to get started.

Conceptually, you want to look at these docs:

1. **[ERTP Introduction](./ertp-introduction.md)**:
  A quick introduction to the concepts and components of Agoric's Electronic
  Rights Transfer Protocol (ERTP). Its components and methods create, store,
  transfer, and maninpulate digital assets. 
2. **[Zoe Introduction](./intro-zoe.md)**: 
  This explains the concepts and components of Zoe, Agoric's reusable smart contract 
  for writing other smart contracts in JavaScript. Zoe implements our offer safety 
  guarantee that users either get what they wanted from the contract or a full refund
  of what they put up for it. 
3. **[Agoric Platform/Stack](/platform/README.md)**: A brief introduction to the complete Agoric platform/technical stack.
6. **[Agoric Dapp Guide](/dapps/README.md)**: 
   A Dapp is a distributed application, typically with a browser-based user interface, a public
   API server, and a contract running on the Agoric blockchain. This document explains a Dapp's
   basic directory and file structure.


There are several ways you can go from here:
- Watch videos showing how to write smart contracts on the Agoric platform.
- Read the more detailed Guides and look at our APIs.
- Look at our already written sample contracts. 
- Install the Agoric platform and run an example contract.

For general help, you should be aware of and make use of:
- Our Glossary. The **[Agoric Glossary](/glossary/)** focuses on terms we've given Agoric-context
  definitions to (i.e. what does *mint* mean in an Agoric context?).

## Videos

We have two videos of talks given to external audiences that are particularly useful to contract developers.

- [DeFi Workshops: Smart Contracts in JavaScript](https://www.youtube.com/watch?v=qudVWjSqDJU&feature=youtu.be)
  by Dean Tribble covers general concepts with examples.
  
- [Building a Composable DeFi Contract](https://www.youtube.com/watch?v=faxrecQgEio) by Kate Sills walks through programming first a covered call option contract,
and then writing an OTC Desk contract that uses the covered call contract.

- [](https://www.youtube.com/watch?v=yeXliRBTsRk)
The workshop will introduce you to existing DeFi components that you can build on, including NFTs, atomic swap, 
covered call options, and AMMs. It will further show how to produce your own components and combine components
into new DeFi dApps in the Cosmos ecosystem.

## Install and run the Agoric platform

1. Follow the steps in **[Before Using the Agoric SDK](./before-using-agoric.md)** 
to install the software the Agoric SDK depends on.

2. Follow the steps in **[Start a Project](./start-a-project.md)** to
create a new Agoric SDK project from scratch. As part of this, you'll install
the Fungible Faucet Dapp we wrote to provide a simple skeleton for a smart contract.

## ERTP and Zoe Guides and APIs

For a deeper explanation of Agoric concepts, what you can accomplish with a contract,
and what Agoric API commands do, read the following:

- ERTP: The **[ERTP Guide](/ertp/guide/README.md)** is a detailed description of 
  ERTP concepts, design, components, and commands. The ERTP API is documented
  [here](/ertp/api/#ertp-api). 
- Zoe: The **[Zoe Guide](/zoe/guide/README.md)** is a detailed description of 
  Zoe concepts, design, components, and commands. The Zoe API is documented
  [here](/zoe/api/#zoe-api).

## Example contracts

To familiarize yourself with working Agoric smart contracts, take a look at our 
[sample contracts](/zoe/guide/contracts/README.md). They are:
- [Atomic Swap](/zoe/guide/contracts/atomic-swap.md)
- [Autoswap](/zoe/guide/contracts/autoswap.md)
- [Barter Exchange](/zoe/guide/contracts/barter-exchange.md)
- [Covered Call](/zoe/guide/contracts/covered-call.md)
- [Multipool Autoswap](/zoe/guide/contracts/multipoolAutoswap.md)
- [Second-price auction](/zoe/guide/contracts/second-price-auction.md)
- [Simple Exchange](/zoe/guide/contracts/simple-exchange.md)


As you start writing contracts, you should read our
**[JavaScript Distributed Programming Guide](/distributed-programming.md)**. 
We've made some Agoric-specific additions at various layers, including concepts, syntax, 
and additions to the Agoric library. You should know about and understand these before 
doing significant programming on the Agoric platform.

## Advanced or specialized documentation

- **[Wallet API Reference](/wallet-api.md)**,
- **[Agoric CLI Guide](/getting-started/agoric-cli-guide.md)** for details about 
  their respective commands. 
- **[Deploying Smart Contracts](./deploying.md)**: 
  A brief description of the tools and processes for deploying contracts to the chain and
  application code to the application server.
- You use Agoric's Dynamic IBC ([Inter-Blockchain Communication Protocol](https://cosmos.network/ibc)), aka dIBC, 
  to connect to services on other blockchains or make services on the Agoric blockchain available to other blockchains. 
  See our **[dIBC Guide](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md)** for more information. 

Finally, we have links to the ultimate documentation; the **[GitHub
repositories](https://github.com/Agoric/)** for the code that defines the Agoric SDK.
