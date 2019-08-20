# Documentation

This repository contains documentation of [Agoric](https://agoric.com/) products

Agoric develop technologies to enable safe collaboration via the creation of [smart contracts](http://www.erights.org/talks/pisa/paper/#smart-contracts) running on blockchains


## Current intention

The current work aims at creating a progressive learning experience into writing Smart Contracts as proposed by Agoric. An attention is given to provide a very simple first experience and increase the complexity gradually

Identified sources of complexity:
- How contracts can be expressed
    - Jessie
- What can be expressed in contracts
    - multi-party contracts with invites
    - turn-based contracts
    - ERTP framework
        - ContractHost
        - Escrow
    - CoveredCall
    - hierarchical rights
    - non-determinism (time, randomness)?
- Infrastructure/Tooling
    - @agoric npm packages
    - User interface
    - Vats
    - Swingset
    - Cosmic-Swingset


### Tutorial on creating and running the simplest Smart Contract

This first contract will be a one-player game where the player tries to guess a number. If they guess right, they win, otherwise, they lose. The game can be played any number of times and there is no actual stake. For the purpose of keeping things simple, the number is hardcoded to be `37`

#### Set up the environment for the contract

- clone some repo + cd
- npm install / make / some install/build commands

#### Write a contract

- create a file named `guess37.js`
- copy/paste the following code:
```js
export default {
    guess(attempt){
        return attempt === 37 ? 'You win!' : 'You lose :-('
    }
}
```
- (verify the contract is valid Jessie?)


#### Run the contract

- import the contract somehow
- insert the contract in the code

- run such command which setups some runtime environment configured to run the contract
(this step provides an interface to the contract. Maybe a URL, maybe a capability URL)
(This interface enables participating to the contract/game and play by calling `guess` with a number somehow)