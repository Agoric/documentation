# Terms and invitation

This tutorial builds on a [previous tutorial](./first-contract.md). You may want to get familiar with it before continuing reading this page

## Configuring the number to be guessed

We want to configure the contract so that it can be set up for the player to guess an arbitary number

That's when we would be using the `terms`:

Contract code (`guess.js`):
```js
// Our contract defines that `terms` must be an object with a `toGuess` property
function guessContract(terms, inviteMaker) {
  const seat = harden({
    guess(attempt) {
      return attempt === terms.toGuess ? 'you win' : 'you lose';
    },
  });

  return harden({
    playerInvite: inviteMaker.make('player', seat),
  });
}

export default guessContract.toString();
```

vat-demo.js code:
```js
import harden from '@agoric/harden';
import guessContractSource from '../../contracts/guess.js';

function build(E, log) {
  let sharedGame;

  async function startup(host) {
    const guessInstallation = await E(host).install({
      start: guessContractSource,
    });
    // aside from naming changes, only this line changed with terms argument to `.spawn`
    const { playerInvite } = await E(guessInstallation).spawn({toGuess: 94});
    sharedGame = await E(host).redeem(playerInvite);
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

That's it! That was easy!

In more real life examples, the terms can be used to parametrize when the contract expires or a minimum amount (and which currency) to commit to the contract for participating, etc.


## Sending an invite for someone else to play

- Amethyst sets up the contract. It produces a `game` object and a `handoffService`
=> This is done via **Amethyst's solo node**
- Amethyst produces a `corkboard` using the `handoffService`
=> This creates a URL like `https://example/corkboard/ng2oeg938vEgpoj9U` (random at the end)
- Amethyst puts the `guess` function of the `game` as the `"guess"` key of the corkboard
=> The message can be retrieved via `https://example/corkboard/ng2oeg938vEgpoj9U/guess`
- Amethyst shares the url with Pearl
- Pearl opens the game (how?), then puts the url in a dedicated field
=> The url is sent to **Pearl's solo node**
=> **Pearl's solo node** retrieves the function and exposes it to UI
- Pearl plays the game




