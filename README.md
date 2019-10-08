# Documentation

This repository contains documentation of [Agoric](https://agoric.com/) products

Agoric develop technologies to enable safe collaboration via the creation of [smart contracts](http://www.erights.org/talks/pisa/paper/#smart-contracts) running on blockchains


## Current intention

The current work aims at creating a progressive learning experience into writing Smart Contracts as proposed by Agoric. An attention is given to provide a very simple first experience and increase the complexity gradually

Emphasize "progressive" here. Right now its more of a "blank wall" learning experience.

1. Start with a clear and simple overview. What are the main pieces of the stack? What are the major building blocks of the architecture and how do they fit together? I cant find this anywhere. How about some diagrams?
2. FOcus in on the platform upon which the developer will be dpeloying contracts. Help them understand the shape of this platform? What is the frame inside of which they will be painting?
What do they need to know about this frame? What about the paints available to them?
3. SLOWLY roll out new concepts, explaining them clearly. An avalanche of esoterica will drive everyone away.

Build the tutorial around a narrative. "Lets do XYZ cool valuable thing on Agoric", here is how we get to it. Keep it simple, focused and too the point. Demonatrate how to accomplish something valuable with speed and ease. Explain core concepts as they come up along the way. 

Dont give too many choices too soon. Why three scenarios? How about just one that is thorough and clear? Then add more later. 



Either document something clearly or hide it entirely. 

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


### Progress

Progress can be followed [on this board](https://github.com/Agoric/Documentation/projects/1?fullscreen=true)


### Tutorial on creating and running the simplest Smart Contract

This first contract will be a one-player game where the player tries to guess a number. If they guess right, they win, otherwise, they lose. The game can be played any number of times and there is no actual stake. For the purpose of keeping things simple, the number is hardcoded to be `37`


First off, as a newcomer I need a lot more context. You need to show someone the whole chess board before explaining how the Knight can move. This "tutorial" leaves the reader feeling blinded from begining to end.  The scope of this tutorial (guess 37) is too narrow to illustrate much. Add more layers to it, like upgrading the contract perhaps?


Dont introduce concepts without explaining them. Either abstract them away into a neat bundle, or lay them out and explain them clearly. 


#### Set up the environment for the contract

Clone the [cosmic-swingset repository](https://github.com/Agoric/cosmic-swingset):
```sh
git clone git@github.com:Agoric/cosmic-swingset.git
```


What is a cosmic swingset? why do I need one?
Follow the instruction to [build and setup cosmic-swingset](https://github.com/Agoric/cosmic-swingset#build-from-source) (~20 minutes)

Cool, more contextual info here would be key. Tell me more about the environment for running contracts? What is great about it? How is it better than the EVM or NEAR protocol? Why would I chose this environment for deploying my contract?


#### Write a contract


```sh
# Make sure you're in the cosmic-swingset root directory
echo $PWD
# => /maybe/home/you/code-projects/cosmic-swingset

# (optional) create a git branch
# git branch -c my-contract-tutorial

# Create a directory for the contract
mkdir contracts
# Create the contract file
touch contracts/guess37.js
```

- copy/paste the following code in the file:
```js
function guess37Contract(terms, inviteMaker) {
  const seat = harden({
    guess(attempt) {
      return attempt === 37 ? 'you win' : 'you lose';
    },
  });

  return harden({
    playerInvite: inviteMaker.make('player', seat),
  });
}

export default guess37Contract.toString();

```

The contract is materialized by the source code of the `start` function. JavaScript makes it possible to retrieve the source code of a function by calling [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) on the function

<small>
TODO a documentation of the contract format

Why are these contracts better?  Why would I want to be writing Agoric contracts? So far all I can see is that they are in JS which is nice but possibly messy too. Maybe introduce SES here?

- Explain the contract host
    Again, dont introduce concepts you dont explain. That leaves the reader more confused than when they started.
    - Explain `terms` and `inviteMaker` arguments
- Explain the [provided top-level variables](https://github.com/Agoric/ERTP/blob/8f42af53581821bb16a9f4e3d62603833354ef8b/core/contractHost.js#L53-L63)
- Explain Jessie........?
</small>

Change the content of `lib/ag-solo/vats/vat-demo.js` to be the following:
WHY? Giving instructions without any context makes the tech feel impenetrable and esoteric. 

This is JS! It should be easy and straightforward, but without more contextual information, the dev is left unable to manipulate things in a way that makes them feel empowered and capable. 

What is harden? startup? build? 

So many concepts without context.

```js
import harden from '@agoric/harden';
import guess37ContractSource from '../../contracts/guess37.js';

function build(E, log) {
  let sharedGame;

  async function startup(host) {
    const guess37Installation = await E(host).install({
      start: guess37ContractSource,
    });
    const { playerInvite } = await E(guess37Installation).spawn();
    const game = await E(host).redeem(playerInvite);

    sharedGame = game;
  }

  async function createDemoClientBundle() {
    const chainBundle = {
      game: sharedGame,
    };
    return harden(chainBundle);
  }

  return harden({ startup, createDemoClientBundle });
}

export default function setup(syscall, state, helpers) {
  return helpers.makeLiveSlots(
    syscall,
    state,
    E => build(E, helpers.log),
    helpers.vatID,
  );
}

```


#### Run the contract

[Run "scenario 3"](https://github.com/Agoric/cosmic-swingset#scenario-3--no-testnet-develop-off-chain-demo)

```sh
make scenario3-setup
make scenario3-run-client
```

Open a web browser to http://localhost:8000/
This is very confusing. The Pixel demo has nothing to do with guess37...... 

<small>
currently, this is the UI of the Pixel Gallery demo. Why is this included? What are you trying to demonstrate? It just explodes the surface area of an already large amount of "things I dont understand"
TODO : provide a proper UI of what?
</small>

In the REPL, try the following commands in the same order:
-- Not obvious where the REPL is. I can see the running log of my swingset but no REPL...
What is the swingset?

```
home
home!game!guess(14)
home!game!guess(37)
```

The first `home` command shows what was defined in `lib/ag-solo/vats/vat-demo.js` as `chainBundle`
// Not actually explaining anything helpful. Why do I care what chainBundle is?

`home!game!guess(14)` is a losing guess
`home!game!guess(37)` is a winning guess

Where are these commands going? What are they calling?

As you have guessed (pun intended!), `guess` refers to the function with the same name defined in the contract

<small>
TODO : explain infix-bang syntax
</small>

**Congratulations!**\
You've successfully written a smart contract in JavaScript and run it in a solo node --



In the next steps, we'll discover how to make **more interesting contracts** and **how to run them in a proper blockchain**

That would be great! Demonstrate the flexibility of the contracts? Advantages of the context?  Shw a variety of use cases? 

Check out NEAR protocol's web IDE into- they have boilerplate projects demonstrating a variety of contracts that you can easily manipulate 
https://studio.nearprotocol.com

Im not saying you need a Web IDE, but a variety of contracts to build upon would be helpful. The tutorial needs toanswer "What is Agoric?, "Why should I use it?" and "How do I use it?". 




