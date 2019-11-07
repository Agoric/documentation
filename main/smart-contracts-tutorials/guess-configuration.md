# Guess game - Configuration

In the [previous step](./guess-multiple), we used the guess37 contract and used it in a way that multiple people can interact around it

In this section, we discover how to configure a contract


## Configuring the game

We are going to make 2 changes to the game:
1. the person organizing the game can choose which number must be guessed
2. we're limiting the number of attempts

```js
function guessContract(terms, inviteMaker) {
  const {attemptsCount} = terms
  if(typeof attemptsCount !== 'number' || !Number.isFinite(attemptsCount) || attemptsCount < 1){
    throw new Error(`invalid 'attemptsCount' term: ${attemptsCount}`);
  }

  let remainingAttemptsCount = terms.attemptsCount;
  let toGuess;

  const organizerSeat = harden({
    setToGuess(_toGuess){
      if(toGuess !== undefined)
        toGuess = _toGuess;
      else
        throw new Error('toGuess is already set, you cannot change it');
    }
  })

  const seat = harden({
    guess(attempt) {
      if(remainingAttemptsCount < 1)
        throw new Error('No guess attempt left');
      else{
        remainingAttemptsCount = remainingAttemptsCount - 1;
        return attempt === toGuess ? 'you win' : 'you lose';
      }
    },
    getRemainingAttemptsCount(){
      return remainingAttemptsCount;
    }
  });

  return harden({
    organizerInvite: inviteMaker.make('organizer', organizerSeat),
    playerInvite: inviteMaker.make('player', seat),
  });
}

export default guessContract.toString();
```

In this contract, 2 seats are defined. One for the person organizing the game, the other for playing the game

The person organizing the game would be doing the following:
```js
host = home.contractHost
invites = host~.install({start: home.guessGameContractSource})~.spawn({attemptsCount: 5})
organizerSeat = host~.redeem(invites~.organizerInvite)
organizerSeat~.setToGuess(284)

playerInvite = invites~.playerInvite
handoff = home.handoff
board = handoff~.createBoard("guess game")
board~.addEntry("invite", playerInvite)
```

The person playing the game would be doing the following:
```js
handoff = home.handoff
board = handoff~.grabBoard("guess game")
playerInvite = board~.lookup("invite")

// let's check the contract source and terms!
terms = playerInvite~.getBalance()~.terms
source = host~.getInstallationSourceCode(playerInvite~.getBalance()~.installation)
// super interesting contract!
terms~.attemptsCount // hmm... i have 5 guesses, better make them count!

// Sounds like a fun game, i want to play: let's retrieve the seat!
seat = host~.redeem(playerInvite)

seat~.guess(121)
seat~.guess(283)
seat~.guess(1)
// wait, how many guesses do i have left?
seat~.getRemainingAttemptsCount() // 2!
seat~.guess(284) // I win! and i still had one attempt left! 
```


## Discussion

The smart contract now has 2 roles. One person sets up the game and can configure it; the other person plays the game

Two configurations happen: number to guess and maximum number of attempts
The first aspect is configured via a method on the organizer contract. The second is via the terms. Terms are reviewable by anyone who has recieved an invite to the contract, so this is a good way to provide the number of attempts, so the player can know before participating what the rules are. On the other hand, the number to guess is not something the organizer wants the player to access to, hence the configuration via a method on their seat.

The organizer seat provides an API of the shape `{setToGuess(toGuess)}`. The way the function is written, the organizer can only set the number once. This is good to know for the player when they consult the source code. They are sure that nobody is going to change the number once it's set


## Conclusion - next step

Now we know how to configure a contract

In the next step, we'll see how to make the contract produce rewards and how the player can bet previous rewards