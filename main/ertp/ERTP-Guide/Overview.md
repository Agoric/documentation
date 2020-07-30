# ERTP Guide

[ERTP](https://agoric.com/documentation/glossary/#ertp) (*Electronic
Rights Transfer Protocol*)
is Agoric's token standard for transferring tokens and other digital assets in
JavaScript. Using the
[ERTP API](https://agoric.com/documentation/ertp/api/),
you can easily create and use digital assets, all of which are
transferred exactly the same way and with exactly the same security properties. 

ERTP uses
*[object capabilities](https://agoric.com/documentation/glossary/#object-capabilities)*
to enforce access control. If your program has a reference to an
object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see
[Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## Objects Overview

![ERTP object relationships](./assets/relationships.svg)  

There are eight fundamental ERTP objects, two of which are parts of
another, and one which is used by that same object. For each entry,
the name is linked to its primary page in this Guide. 

- **[Amount](./Amounts.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#amount)**:
  The description of an asset, it is not an asset itself, having no economic scarcity or economic value.
  Made up of a:
  - *[value](./Amounts.md)* *[(Glossary)](https://agoric.com/documentation/glossary/#value)*:  The
  size of the amount.
  - *[brand](./Amounts.md)* *[(Glossary)](https://agoric.com/documentation/glossary/#brand)* The
  kind of asset. 
  
  You can think of these as the "how many" and the "what" of an asset, for example, 7 quatloos (an imaginary
  currency).
- **[AmountMath](./AmountMath.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#amountmath)**:
Methods to do math operations on an `amount`..
- **[Purse](./PursesAndPayments.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#purse)**: an
  object for long term digital assets storage. 
- **[Payment](./PuresAndPayments.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#payment)**:
  an object for transfering digital assets to another party.
- **[Mint](./IssuersAndMints.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#mint)**: an
  object that creates new `payment` objects of a specific `brand`. Each `brand` has
  a one to one relationship with a `mint` and vice versa.
- **[Issuer](./IssuersAndMints.md)** **[(Glossary)](https://agoric.com/documentation/glossary/#issuer)**: 
an object linked to a single `mint` object that creates empty `purse` objects
for that mint's `brand` and operates on any `payment` of that `brand`. 

## Fungible and Non-Fungible Assets

There are two kinds of assets,
*[fungible](https://agoric.com/documentation/glossary/#fungible)* and
*[non-fungible](https://agoric.com/documentation/glossary/#non-fungible)*. 

Fungible assets are interchangeable. For example, if you have 100
one-dollar bills and need to pay someone 5 dollars, it doesn't matter
which five of your one-dollar bills you give them. 

Non-fungible assets are of the same type, but are not interchangeable
and specific items must be used. For example, you might have 100
tickets. But someone wanting to buy even a General Admission ticket from you will want one
for a specific date and time. This might also affect the price; you'll want to charge more
for a Friday evening ticket than a Wednesday matinee ticket, even if it's for the same show.

## Amounts are not assets

**IMPORTANT**: Despite how it may seem, an `amount` is only a description of an asset, not
an asset in and of itself. Actual assets are in `purse` and `payment` objects, and exist via
the records kept by the associated `issuer` object. Some analogies may be helpful in understanding this:

- Let's say Caltech replicates its famous hack of 

## Security properties

ERTP `purse` objects have a `deposit` method which takes a `payment`
object as its argument. It first checks that the `payment` object is
genuine and the same asset `brand` as the `purse`

If everything passes the checks, the asset moves from 
the `payment` to the `purse`. If there's a problem, it throws an error.

After a successful deposit, ERTP guarantees:
- The `payment` object is deleted from the `issuer`'s records and no longer has any assets associated with it.
- Its `issuer` no longer recognizes the `payment`.
- The `purse` contains all of the `payment`'s digital assets.

When the `deposit` call throws an error (i.e. something went wrong), ERTP guarantees:

- The alleged `payment` is in the same state as before the call.
- The `purse` is in the same state as before the call.

In addition, you can create a *deposit facet* for any `purse`. This is an object associated
with a specific purse that can be sent to another party instead of a reference to the `purse`.
The security advantage is that the other party can only make deposits to the associated `purse`
via the deposit facet. They cannot make a withdrawal from a `purse` via its deposit facet.

## Promises

Several ERTP methods are *asynchronous* and instead of immediately returning their expected value, return a *promise* for that value.

JavaScript implements `Promise` objects, and recently added the two commands `async` and `await` to simplify working with them. For general, and extensive, information about JavaScript's implementation, see either:
- [javascript.info](https://javascript.info/async)
- [Mozilla's Developer Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

**tyg todo: Could use beefing up about how and when Promises, async, and await are
  actually used in contracts**

## Object capabilities and ERTP

ERTP implements [*object capabilities*](https://agoric.com/documentation/glossary/#object-capabilities). You can only use an object and issue commands to it if you have access to that object, not just its human-readable name or similar. For example, I might know (or make a good guess), that the mint that makes quatloos has the human-understandable alleged name of 'quatloos-mint'. But unless I have the actual object that is a `mint` object associated with the `quatloos` `brand` object, I can't use it to create a million `quatloos` and bet
them all on Captain Kirk to win his gladitorial match on Triskelion (see the [Wikipedia entry for the Star Trek episode](https://en.wikipedia.org/wiki/The_Gamesters_of_Triskelion)).

## Creating and sending a fungible asset

In ERTP, digital assets are created by a `mint`. You must have
access to a `mint` object to create new assets of the `mint` object's
associated `brand`. 

For instance, let's say we want to create a new community
currency called 'BaytownBucks'. You start by getting access to a `mint`
object whose associated brand is 'BaytownBucks'.
```js
import { makeMint } from '@agoric/ertp';
const baytownBucksMint = makeMint('BaytownBucks');
```

Now, use the `mint` to create 1000 new BaytownBucks.

```js
const { issuer, mint } = makeIssuerKit('BaytownBucks');
const bb1000 = amountMath.make(1000);
const newPayment = mint.mintPayment(bb1000);
const bbpurse = issuer.makeEmptyPurse();
const bb1000Amount = bbpurse.deposit(newPayment);
```

The act of minting created 1000 BaytownBucks and stored them together in a
`payment`. We then deposited the `payment` into a `purse` for BaytownBucks.

Now, let's distribute the BaytownBucks to others. To send assets
in ERTP, we withdraw a `payment` from a `purse`.

```js
const paymentForAlice = purse.withdraw(bucks10);
```

Like our `purse`, this `payment` contains BaytownBucks, but unlike purses,
payments are used to represent tokens in transit. A `payment` can be
sent to someone else, a `purse` should never be sent to someone else.

Now let's send the `payment` to Alice.

Before she can receive a `payment` in BaytownBucks, Alice needs to 
create an empty `purse` for BaytownBucks and otherwise get ready to
receive payments. 

For this to happen, Alice needs access to `baytownBucksIssuer`.
However, she does not need access to `baytownBucksMint`.
If she had access to the `mint`, she could create BaytownBucks herself
by calling `baytownBucksMint.mint`. 

```js
const aliceBaytownBucksPurse = baytownBucksIssuer.makeEmptyPurse()
aliceBaytownBucksPurse.getAmount(); // Empty, so the value is 0
```
Next, we make a deposit facet for Alice's `purse`. A deposit facet is an object 
associated with a `purse` which only allows deposits to its `purse` and cannot be used
to make a withdrawal from its `purse`.
```js
const aliceDepositFacet = purse.makeDepositFacet();
```
Here `aliceDepositFacet` is an object reference, and we can call its `receive`method
to deposit this `payment` into its associated `purse`. 
```js
aliceDepositFacet.receive(paymentForAlice);
```

As a more complete example using Agoric's Board, a simple contract-internal "bulletin board"
for posting and getting Id-value pairs:
```js
// Alice posts an Id-value pair to the Board, where the value is the deposit facet object
// for her `purse`.
// Alice then gives us the boardId to use for the transfer: aliceDepositFacetBoardId
// We retrieve the value from the boardID and then deposit the payment in the deposit facet.
const aliceDepositFacet = await E(board).getValue(aliceDepositFacetBoardId);
E(aliceDepositFacet).receive(payment);
// Alice got her payment automatically deposited in her purse!

When Alice wants to exchange something for 300 BaytownBucks, she
creates a `payment` from her `purse`: 
```js
const payment = myBaytownBucksPurse.withdraw(baytownBucks(300));
```
This happened without having to express which 300 BaytownBucks she wanted to withdraw,
since BaytownBucks are fungible.

## Creating a non-fungible asset with ERTP

### Modeling and creating the asset

In ERTP, digital assets are created by a `mint`. Having
access to the `mint` gives you the power to create more digital assets
of the same brand at  will.

Let's say we own a theater and want to sell tickets to seats for ballet shows. Tickets are
the non-fungible assets we want to represent, which refer to a
specific seat for a specific show at a specific time and date. 

```js
import { makeIssuerKit } from '@agoric/ertp';
const { mint: balletTicketMint, amountMath: balletTicketAmountMath } = makeIssuerKit('Agoric Ballet Opera tickets', 'set');
```

This theater has 1114 seats numbered `1` to `1114`.
Objects that represent valid tickets have these properties:
- `seat` with a number
- `show` with a string describing the show
- `start` with a string representing a [time/date in ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)

To create tickets, we first create JavaScript objects that each represent a ticket.
Then, only units can be minted, so let's create units from the JavaScript objects and then
mint the tickets! 

```js
const startDateString = (new Date(2019, 11, 9, 20, 30)).toISOString();

const ticketValues = Array(1114).fill().map((_, i) => ({
  seat: i+1,
  show: 'Hamilton',
  start: startDateString,
}))

const ticketAmounts = ticketValues.map(ticketValue => theatreTicketAmountMath.make(ticketValue));
const theaterTicketPayments = ticketAmounts.map(ticketAmount => theatreTicketMint.mintPayment(ticketAmount))
```

For each `amount`, we've created a `payment` which contains digital assets
of the corresponding `amount`. These digital assets can be transferred 
to other people and used in smart contracts.
