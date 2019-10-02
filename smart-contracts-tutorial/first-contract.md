# Creating and running the simplest Smart Contract

This first contract will be a one-player game where the player tries to guess a number. If they guess right, they win, otherwise, they lose. The game can be played any number of times and there is no actual stake. For the purpose of keeping things simple, the number is hardcoded to be `37`


## Set up the environment for the contract

Clone the [cosmic-swingset repository](https://github.com/Agoric/cosmic-swingset):
```sh
git clone git@github.com:Agoric/cosmic-swingset.git
```

Follow the instruction to [build and setup cosmic-swingset](https://github.com/Agoric/cosmic-swingset#build-from-source) (~20 minutes)


## Write a contract

```sh
# Make sure you're in the cosmic-swingset root directory
echo $PWD
# => /maybe/home/you/code-projects/cosmic-swingset

# (optional) create a git branch
# git branch -c my-contract-tutorial

# Create the contract file
touch lib/ag-solo/vats/guess37-contract.js
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

(This code is explained in a section below)

The contract is materialized by the source code of the `start` function. JavaScript makes it possible to retrieve the source code of a function by calling [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) on the function

```
TODO a documentation of the contract format
- Explain the contract host
    - Explain `terms` and `inviteMaker` arguments
- Explain the [provided top-level variables](https://github.com/Agoric/ERTP/blob/8f42af53581821bb16a9f4e3d62603833354ef8b/core/contractHost.js#L53-L63)
- Explain Jessie
```

Change the content of `lib/ag-solo/vats/vat-pixel.js` to be the following:

```js
import harden from '@agoric/harden';
import guess37ContractSource from './guess37-contract.js';

function build(E, log) {
  let sharedGame;

  async function startup(host) {
    const guess37Installation = await E(host).install({
      start: guess37ContractSource,
    });
    const { playerInvite } = await E(guess37Installation).spawn();
    sharedGame = await E(host).redeem(playerInvite);
  }

  async function createPixelBundle() {
    const chainBundle = {
      game: sharedGame,
    };
    return harden(chainBundle);
  }

  return harden({ startup, createPixelBundle });
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

(This code is explained in a section below)

## Run the contract

[Run "scenario 3"](https://github.com/Agoric/cosmic-swingset#scenario-3--no-testnet-develop-off-chain-demo)

```sh
make scenario3-setup
make scenario3-run-client
```

Open a web browser to http://localhost:8000/

```
currently, this is the UI of the Pixel Gallery demo
TODO : provide a proper UI
```

In the REPL, try the following commands in the same order:
```
home
home~.game~.guess(14)
home~.game~.guess(37)
```

The first `home` command shows what was defined in `lib/ag-solo/vats/vat-demo.js` as `chainBundle`

`home~.game~.guess(14)` is a losing guess\
`home~.game~.guess(37)` is a winning guess

As you have guessed (pun intended!), `guess` refers to the function with the same name defined in the contract

```
TODO : explain ~. syntax
```

**Congratulations!**\
You've successfully written a smart contract in JavaScript and run it in a solo node

In the next steps, we'll discover how to make [more interesting contracts](./smart-contracts-tutorial/terms-and-invitation.md) and **how to run them in a proper blockchain**


## Code breakdown

### Contract code

This code is exactly the same code as above, but it's heavily commented in order to explain the different parts

```js
/*

The first thing you see is a function declaration. This function will be used as the "start" function
used in the call to contractHost.install
The contract function arguments are:
- `terms`, which can be any JavaScript value (number, string, object, array, etc.).
In this specific contract, for the sake of simplicity, the "terms" argument is unused
- `inviteMaker` is an object with a `make(description, seat)` function. It is used to create "invites"
to the contract invites are explained later

*/
function guess37Contract(terms, inviteMaker) {
  // `harden` is a global function provided to the contract by ERTP
  // it deeply freezes its argument. This garantees that no one can modify the seat object
  // More here : https://github.com/Agoric/harden
  const seat = harden({ 
    // this object is the heart of the contract. It is the API that you provide to contract participants
    // here there is a single participant that can do only one thing: guess a number
    // we'll see more complex and interesting examples later in the tutorial
    guess(attempt) {
      return attempt === 37 ? 'you win' : 'you lose';
    },
  });

  // Create an invite to play and associate the corresponding seat
  return harden({
    playerInvite: inviteMaker.make('player', seat),
  });
}

// Contracts are strings that will be interpreted as source code by the contract host
// so we're not exporting the function, but its string representation
export default guess37Contract.toString();
```


### vat-demo.js

This code is exactly the same code as above, but it's heavily commented in order to explain the different parts

```js
// This is the same harden as above
// See https://github.com/Agoric/harden for details
import harden from '@agoric/harden';
// This inline imports to contract source code string and puts it in the `guess37ContractSource` variable
import guess37ContractSource from './guess37-contract.js';

/*

`build` and its `E` and `log` arguments as well as the `setup` function below are part of the vats API
This is all defined in https://github.com/Agoric/swingset
The only important part is that `E` is a function that gives access to remote objects in a way that's 
convenient to write. The remote object is called a "presence"
Eventually, this pattern will be replace by the future infix-bang syntax https://github.com/Agoric/proposal-infix-bang

As far as swingset is concerned, the `build` function can return anything. 
For the purpose of usage by cosmic-swingset (https://github.com/Agoric/cosmic-swingset), the `build` 
function of the demo vat is expected to return an object with 2 functions `startup` and 
`createPixelBundle`. Each function is always called only once and always `startup`
first, then `createPixelBundle`

*/
function build(E, log) {
  // this variable is shared by both functions, initialized in startup and used in createPixelBundle
  let sharedGame;

  // the startup function is passed an object representing a presence of the contract host
  // The contract host runs in a different vat. At some point in this tutorial, this different vat will 
  // be executed by a blockchain
  async function startup(host) {
    // installing the contract...
    const guess37Installation = await E(host).install({
      start: guess37ContractSource,
    });
    // spawning the contract...
    // (spawn takes an optional argument which is the contracts `terms`, but we're not using them here)
    const { playerInvite } = await E(guess37Installation).spawn();
    // Using the invite, let's ask the seat to the contract host
    sharedGame = await E(host).redeem(playerInvite);
  }

  async function createPixelBundle() {
    // This object is what will be exposed in the client-side.
    // when you type "home" and see a "game" property, it's this one!
    const chainBundle = {
      game: sharedGame,
    };
    return harden(chainBundle);
  }

  return harden({ startup, createPixelBundle });
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