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
- Explain the contract host
    - Explain `terms` and `inviteMaker` arguments
- Explain the [provided top-level variables](https://github.com/Agoric/ERTP/blob/8f42af53581821bb16a9f4e3d62603833354ef8b/core/contractHost.js#L53-L63)
- Explain Jessie
</small>

Change the content of `lib/ag-solo/vats/vat-demo.js` to be the following:

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


## Run the contract

[Run "scenario 3"](https://github.com/Agoric/cosmic-swingset#scenario-3--no-testnet-develop-off-chain-demo)

```sh
make scenario3-setup
make scenario3-run-client
```

Open a web browser to http://localhost:8000/

<small>
currently, this is the UI of the Pixel Gallery demo
TODO : provide a proper UI
</small>

In the REPL, try the following commands in the same order:
```
home
home!game!guess(14)
home!game!guess(37)
```

The first `home` command shows what was defined in `lib/ag-solo/vats/vat-demo.js` as `chainBundle`

`home!game!guess(14)` is a losing guess
`home!game!guess(37)` is a winning guess

As you have guessed (pun intended!), `guess` refers to the function with the same name defined in the contract

<small>
TODO : explain infix-bang syntax
</small>

**Congratulations!**\
You've successfully written a smart contract in JavaScript and run it in a solo node

In the next steps, we'll discover how to make **more interesting contracts** and **how to run them in a proper blockchain**
