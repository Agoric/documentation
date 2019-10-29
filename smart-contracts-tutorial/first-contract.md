# Tutorial on creating and running the simplest Smart Contract

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

**copy/paste the following code in the contract file:**
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

```md
TODO a documentation of the contract format
- Explain the contract host
    - Explain `terms` and `inviteMaker` arguments
- Explain the [provided top-level variables](https://github.com/Agoric/ERTP/blob/8f42af53581821bb16a9f4e3d62603833354ef8b/core/contractHost.js#L53-L63)
- Explain Jessie
```

Replace the content of `lib/ag-solo/vats/vat-pixel.js` with the following:

```js
import harden from '@agoric/harden';
import { makeHandoffService } from '@agoric/ertp/more/handoff/handoff';
import guess37ContractSource from './guess37-contract.js';

function build(E, log) {
  let contractHost

  async function startup(host) {
    contractHost = host
  }

  async function createPixelBundle() {
    return harden({
      contractHost,
      handoffService: makeHandoffService(),
      guess37ContractSource,
    });
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
host = home.contractHost
installation = host~.install({start: home.guess37ContractSource})
invites = installation~.spawn()
playerInvite = invites~.playerInvite
seat = host~.redeem(playerInvite)

seat~.guess(14)
seat~.guess(37)
```

### Commands breakdown 

The first `home` command shows what was defined in `lib/ag-solo/vats/vat-pixel.js` as return value of `createPixelBundle`
It is an object containing the properties `contractHost`, `handoffService` and `guess37ContractSource`

`host = home.contractHost` retrieves the contractHost presence and stores it in the `host` variable for convenience

`installation = host~.install({start: home.guess37ContractSource})` installs the guess37 contract in the contract host

`invites = installation~.spawn()` runs the contract (here, the `guess37Contract` function) and store the invites bundle returned by the contract

`playerInvite = invites~.playerInvite` extracts the `playerInvite` from the invites bundle

`seat = host~.redeem(playerInvite)` redeems the invitation. `redeem` returns an object that represents a right to participate in the contract (a seat at the table)

`seat~.guess(14)` is a losing guess as defined by the `guess37` contract
`seat~.guess(37)` is a winning guess

As you have guessed (pun intended!), `guess` refers to the function with the same name defined in the contract

The contractHost/install/spawn/invites/redeem choregraphy is part of the [ERTP framework](https://github.com/Agoric/ERTP) developed by Agoric. You can read more about it [in the dedicated repo](https://github.com/Agoric/ERTP/blob/master/core/contractHost.chainmail). [More detailled documentation is coming soon](https://github.com/Agoric/Documentation/pull/17)


## Conclusion and next steps

**Congratulations!**\
You've successfully written a smart contract in JavaScript and run it in a solo node

In the next steps, [we'll discover how to make someone else play the `guess37` game](./guess37-multiple-participants)


`TODO : explain ~. syntax`