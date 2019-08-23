# Technology overview

[Agoric](https://agoric.com/about/) aims at enabling safe cooperation among otherwise mutually suspicious parties

The way it does it is by making easy to write secure smart contracts and making it possible to run these contracts on one or several blockchains. Agoric strategy to writing smart contract is to write them in JavaScript using a framework called ERTP (Electronic Rights Transfer Protocol)


## High-level view

### JavaScript

Agoric works to make [ECMAScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm) (standard defining JavaScript) a suitable language for easily expressing secure smart contracts. Agoric works with ECMA TC39 (which includes browser makers and Node.js representatives) in that direction


#### Long term

- [Realms](https://github.com/tc39/proposal-realms)
- [Eventual-send operator](https://github.com/Agoric/proposal-infix-bang)
- [WeakRefs](https://github.com/tc39/proposal-weakrefs/)


#### Short term

- [Realms shim](https://github.com/Agoric/realms-shim)
- Tooling
        - [Safe modules](https://github.com/Agoric/safe-modules)
            - [TOFU (Trust On First Use)](https://github.com/bmeck/tofu/)
- [Jessie](https://github.com/Agoric/Jessie), a subset of JavaScript that enables easily writing of deterministic smart contracts. Jessie is intended to be interpreted (directly or after compilation) into blockchain virtual machines instruction set
    - [eslint-config-jessie](https://github.com/Agoric/eslint-config-jessie) is an [ESLint](https://eslint.org/) plugin that enforces that some JavaScript files are valid Jessie
- [SES](https://github.com/Agoric/SES), a secure JavaScript runtime to run untrusted code


### Smart Contracts in JavaScript

Agoric works on [ERTP](https://github.com/Agoric/ERTP) (Electronic Rights Transfer Protocol), a framework to express secure smart contracts

ERTP is to writing smart contracts in JavaScript what React is to write user interfaces in plain DOM

ERTP provides well-designed and carefully reviewed smart contract building blocks as well as examples of how they can be used to build complex smart contracts


### Blockchains

Various blockchains with various trade-offs exist and are created. Agoric does not develop its own blockchain *consensus* technology, but rather builds on top of existing blockchains


#### Long-term

Agoric aims at running its smart contract technology on top of all widely used blockchains.

Agoric will also produce a blockchain using the [Tendermint](https://tendermint.com/docs/introduction/what-is-tendermint.html) consensus integrated with Cosmos and the larger Cosmos ecosystem


#### Short-term

Agoric runs on top of blockchains created with the [Cosmos SDK](https://cosmos.network/docs/intro/)

It is planned to enable smart contracts running across different blockchains. To this end, Agoric also works with [Cosmos](https://cosmos.network/) on **IBC (Inter-BlockChain protocol)**


### JavaScript on blockchains

*(soon)*


## Detailed view

### Vat

A central concept to Agoric's technical stack is the **vat**. A vat is a unit of computation running JavaScript

A vat is the moral equivalent of a Unix process. It has its **own memory space** separate from other vats, but can communicate with other vats via **message passing**

Agoric has developed a framework to create and manage vats called [Swingset](https://github.com/Agoric/swingset). Among other things, vats created with Swingset have **persistent state**. This means that they can be shut down and restarted. They can be restarted on the same machine or on a different machine.

One physical machine can host and run several vats\
Agoric works so that blockchains can be valid and interoperable vat environments. Currently this work is done in the [cosmic-swingset repo](https://github.com/Agoric/cosmic-swingset/). Each blockchain would play the role of one virtual machine in which instructions are run by different machines reaching consensus towards the next machine state



