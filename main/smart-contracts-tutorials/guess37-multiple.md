# Guess37 - Multiple Participants

In the [previous step](./guess37-one.md), we set up a contract and ran it and played the guess37 game

In this section, we'll see how to play 2 different roles: "contract installer" and "game player"


## Setting up 2 contract participants on your machine

In real life, different participants will participate to the contract from different machines located potentially anywhere on the planet. For the purpose of learning how to design, write and test contracts, it is easier to set up 2 participants to the contract on your machine

To setup 2 participants, you need to [build for cosmic-swingset scenario 2](https://github.com/Agoric/cosmic-swingset#build-from-source) and run scenario 2 this way:
```sh
make scenario2-setup NUM_SOLOS=2
make scenario2-run-chain
```

Wait about 5 seconds for the chain to produce its first block, then switch to another terminal:

`make scenario2-run-client BASE_PORT=8000`\
and then in a third terminal:\
`make scenario2-run-client BASE_PORT=8001`

The first participant (contract installer) interacts with the smart contract on the blockchain via http://localhost:8000/
The second participant (game player) interacts with the smart contract on the blockchain via http://localhost:8001/ (notice the port difference)


## Acting as the contract installer

Open http://localhost:8000/ in a browser tab and in the REPL enter the following commands in order:
```
home
host = home.contractHost
installation = host~.install({start: home.guessGameContractSource})
invites = installation~.spawn()
playerInvite = invites~.playerInvite
```

The contract is now setup, like it was in the previous step. Let's now share the player invite with the game player:
```
handoff = home.handoff
board = handoff~.createBoard("guess37 game")
board~.addEntry("invite", playerInvite)
```

Then, the contract installer would communicate to the game player that a board called `guess37 game` with an entry called `invite` is available for them to retrieve the invite
This communication would happen out-of-band. Maybe via email, Mastodon DM, SMS, hand-written note; whatever is best suited to share these secrets

`handoff` is a convenience [provided by ERTP](https://github.com/Agoric/ERTP/blob/master/more/handoff/handoff.js) and exposed publicly so that people can securely share secrets and capabilities via the blockchain


## Acting as the game player

Open http://localhost:8001/ in a different browser tab and in the REPL enter the following commands in order:
```js
home
handoff = home.handoff
board = handoff~.grabBoard("guess37 game")
allegedPlayerInvite = board~.lookup("invite")
playerInvite = host~.getInviteAssay()~.claimAll( allegedPlayerInvite )
// if the previous line succeeded, we know both that the invite is genuine 
// and that we have exclusive access to it
// If we want to read the source code of the contract beforehand:
source = host~.getInstallationSourceCode(playerInvite~.getBalance()~.installation)
```

Now that the player has reviewed the contract and knows they have an exclusive access to a genuine invite, let's play the game:
```js
host = home.contractHost
seat = host~.redeem(playerInvite)

seat~.guess(121)
seat~.guess(37)
```

Like in the previous step, `seat~.guess(121)` is a losing guess as defined by the `guess37` contract and `seat~.guess(37)` is a winning guess


## Security properties

In the choregraphy we just played, there are 3 main characters:
- the contract host and handoff service on the blockchain
- the contract installer
- the game player

How does the game player know they are playing the `guess37` game with the actual contract source code defined in the [previous step](./first-contract)?
What if the contract installer makes them play a different game?
**Let's see what guarantees the game player has even if they're suspicious of the contract installer**

The first and only assumption we need is that the game player trust the blockchain and the contract host and handoff service running on top of it.
If the game player does not trust the contract host and blockchain it's running on, no security property can be guaranteed

If they trust the contract host and blockchain it's running on, then they trust that `handoff` contains the actual handoff service
If they trust it, they trust that `board` contains the actual board that the contract installer set up for them. The reason they can trust it is that, [by design, only the first person grabbing the board can have it](https://github.com/Agoric/ERTP/blob/91aab6abe0f0d9db61f0ac3b858ba6c310410aa5/more/handoff/handoff.js#L16-L27). So, if the game player retrieved the board, they know they have the right one and they are the only person with access to this specific board

When `playerInvite = board~.lookup("invite")` happens, the game player knows that they retrieve what the contract installer shared with them

But how does the game player know the contract installer didn't just share with them some random object that acts like a contract seat but isn't really one?
The game player can ask the contract host whether the `playerInvite` object is a genuine invite by doing:
`playerInvite = host~.getInviteAssay()~.claimAll(playerInvite)`
If this command succeeds, `playerInvite` is a genuine invite to a contract

... but is it an invite to the correct contract?
The content of `playerInvite` can help us here. `playerInvite` is a [payment object](https://github.com/Agoric/ERTP/blob/5d9b4dc7598ebf3b08ef4c3e2b0458ac74d2a68e/core/mint.chainmail#L136-L154) which "asset" is an object with an `installation` property (a more detailed explanation of other pieces of the invite will come later in the tutorial)
The source code can be retrieved from the contract host via:
`source = host~.getInstallationSourceCode(playerInvite~.getBalance()~.installation)`

Now the game player can read the contract source code and knows that the invite they're holding is a genuine invite to this contract. Let's play!

...wait!
Here there are no actual stake, but what if there was and someone else (like the contract installer) had the invite. Wouldn't they be able to play on our behalf? Possibly even without us knowing?

This is where `host~.redeem(playerInvite)` comes to play. A successful call to `host~.redeem` offers the following guarantees:
- what the game player receives is a genuine seat to a contract hosted on this contract host
- the game player is the only person with access to this seat
    - Anyone trying `host~.redeem(playerInvite)` a second time will receive an error. Even the contract installer! (notice the contract installer did not redeem the invite in this section, they only shared it through the handoff service). No matter how many people saw or shared the invite, if you redeem the seat, ERTP guarantees that you're the only one holding it

Phew! now, let's play!


## Conclusion and next step

Thanks to the [ERTP framework](https://github.com/Agoric/ERTP) and the design of the [contract host](https://github.com/Agoric/ERTP/blob/master/core/contractHost.chainmail), [handoff service](https://github.com/Agoric/ERTP/blob/master/more/handoff/handoff.js) and the invite system, the game player is assured that when they use the `guess` function:
- it's the **genuine** function of the **correct** contract
- they are the **only one** with access to the guess function

All of this is assured even if the contract installer is malicious

Now that we've seen all the guarantees ERTP provide, let's make a more interesting contract than a game to guess a fixed number
In the next step, we'll see [how to configure the contract](./guess-with-reward.md)
