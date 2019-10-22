# Guess37 multiple participants

In the [previous step](./first-contract), we set up a contract and ran it and played the guess37 game

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
installation = host~.install({start: home.guess37ContractSource})
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
```
home
handoff = home.handoff
board = handoff~.grabBoard("guess37 game")
playerInvite = board~.lookup("invite")
```

Now we have the invite to participate to the contract. Let's play the game:
```
host = home.contractHost
seat = host~.redeem(playerInvite)

seat~.guess(121)
seat~.guess(37)
```

Like in the previous step, `seat~.guess(121)` is a losing guess as defined by the `guess37` contract and `seat~.guess(37)` is a winning guess


## Various security properties

In the choregraphy we just played, there are 3 main characters:
- the contract host and handoff service on the blockchain
- the contract installer
- the game player

How does the game player know they are playing the `guess37` game with the actual contract source code defined in the [previous step](./first-contract)?
What if the contract installer makes them play a different game?
Let's see what guarantees the game player has even if they're suspicious of the contract installer

The first and only assumption we need is that the game player trust the blockchain and the contract host and handoff service running on top of it.
If the game player does not trust the contract host and blockchain it's running on, no security property can be guaranteed

If they trust the contract host and blockchain it's running on, then they trust that `handoff` contains the actual handoff service
If they trust it, they trust that `board` contains the actual board that the contract installer set up for them. The reason they can trust it is that, [by design, only the first person grabbing the board can have it](https://github.com/Agoric/ERTP/blob/91aab6abe0f0d9db61f0ac3b858ba6c310410aa5/more/handoff/handoff.js#L16-L27). So, if the game player retrieved the board, they know they have the right one and they are the only person with access to this specific board

When `playerInvite = board~.lookup("invite")` happens, the game player knows that they retrieve what the contract installer shared with them.

But how does the game player know the contract installer didn't just share with them some random object that acts like a contract seat but isn't really one? This is where `host~.redeem(playerInvite)` comes to play

The actual seat is not handed directly by the contract installer. Instead, the game player redeems it from the trusted contract host running on the blockchain. This way, the game player know that what they have after `redeem` is an actual seat to a smart contact. A successful call to `host~.redeem` offers the following guarantees:
- what the game player receives is an actual seat to a contract hosted on this contract host
- the game player is the only person with access to this seat
    - Anyone trying `host~.redeem(playerInvite)` a second time will receive an error. Even the contract installer! (notice the contract installer did not redeem the invite in this section, they only shared it through the handoff service). No matter how many people saw or shared the invite, if you redeem the seat, ERTP guarantees that you're the only one holding it

So, the game player has a seat to an actual contract. Cool! But how can they know it's to the correct contract?
They can use the `playerInvite` object for this purpose.

`playerInvite` is a [payment object](https://github.com/Agoric/ERTP/blob/91aab6abe0f0d9db61f0ac3b858ba6c310410aa5/core/mint.chainmail#L136-L154)


`playerInvite~.getBalance()` provides informations about the invite 

```
TODO
Figure out how to:
- guarantee this is a genuine invite produced by the contract host (via comparison with the invite assay?)
- retrieve the source code and read it
```

`host~.getInviteAssay()`