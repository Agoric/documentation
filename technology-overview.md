# Technology overview

[Agoric](https://agoric.com/about/) enables safe cooperation among mutually suspicious parties

It does this by making it easier to write secure smart contracts and making it possible to run these contracts on one or several blockchains. Agoric strategy to writing smart contracts is to write them in JavaScript using a framework called ERTP (Electronic Rights Transfer Protocol)


## High-level view

### JavaScript

Agoric makes [ECMAScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm) (the standards name for JavaScript) a suitable language for easily expressing secure smart contracts. Agoric participates in ECMA TC39 (the JavaScript standards committee) in that direction

Agoric also participates in [ECMA TC53](https://www.ecma-international.org/memento/tc53.htm) which builds on [SES](https://github.com/Agoric/SES) as the JavaScript standard for embedded devices


#### Long term

- [Realms](https://github.com/tc39/proposal-realms)
- [Eventual-send operator](https://github.com/Agoric/proposal-infix-bang)
- [WeakRefs](https://github.com/tc39/proposal-weakrefs/)
- Jessie, a subset of JavaScript that simplifies writing of reliable smart contracts
    - eslint-config-jessie (v1+)
- SES (v1+), a secure JavaScript runtime to run untrusted code


#### Short term

- [Realms shim](https://github.com/Agoric/realms-shim)
- Tooling
        - [Safe modules](https://github.com/Agoric/safe-modules)
            - [TOFU (Trust On First Use)](https://github.com/bmeck/tofu/)
- [Jessie prototype](https://github.com/Agoric/Jessie), a subset of JavaScript that simplifies writing of reliable smart contracts
    - [eslint-config-jessie (v0.x)](https://github.com/Agoric/eslint-config-jessie) is an [ESLint](https://eslint.org/) plugin that enforces that some JavaScript files are valid Jessie
- [SES prototype (v0.x)](https://github.com/Agoric/SES), a secure JavaScript runtime to run untrusted code


### Smart Contracts in JavaScript

Agoric works on [ERTP](https://github.com/Agoric/ERTP) (Electronic Rights Transfer Protocol), a framework to express secure smart contracts

ERTP is to writing smart contracts in JavaScript what [React](https://reactjs.org/) is to write user interfaces in plain DOM or what [express](https://expressjs.com/) is to writing a web server in Node.js

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


## Useful concepts

### Vat

A central abstraction to Agoric's technical stack is the **vat**. A vat is a unit of computation running JavaScript

A vat is the equivalent of a Unix process. It has its **own memory space** separate from other vats, and can communicate with other vats via **message passing**

A vat can run on a single physical machine. Agoric's framework for vats running on single machines is called [Swingset](https://github.com/Agoric/swingset)\
A vat can also run on a blockchain. Agoric's work to run a vat on a blockchain can be found in the [cosmic-swingset repo](https://github.com/Agoric/cosmic-swingset/)

Vats communicating with one another are unaware of whether the other vats run on single machines or on blockchains

Vats are not a new concept. More can be read about [vats original definition on erights.com](http://erights.org/elib/concurrency/vat.html).
