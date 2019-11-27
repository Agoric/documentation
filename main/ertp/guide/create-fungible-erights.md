# Creating a fungible eright with ERTP

## A quick tutorial

Let's look at an example. In ERTP, all digital assets, including fungible and
non-fungible tokens, are created by a [`mint`](./mint.html). Having access to the mint
gives you the power to create more digital assets of the same type at
will. For instance, let's say we want to create a new community
currency called 'BaytownBucks'.
You would first install the [ertp JavaScript package](https://www.npmjs.com/package/@agoric/ertp)
(`npm install @agoric/ertp`) and then:

```js
import { makeMint } from '@agoric/ertp/core/mint';

const baytownBucksMint = makeMint('BaytownBucks');
```

Great! Now let's use our mint to create 1000 new BaytownBucks.

```js
const purse = baytownBucksMint.mint(1000, 'community treasury');
```

The act of minting created 1000 BaytownBucks and stored them together in a
`purse`. [Purses](./mint.html#purses) in ERTP only hold one type of digital asset, so this
purse can only ever hold BaytownBucks.

Let's distribute the BaytownBucks to members of the community. To send
money in ERTP, we withdraw [`payments`](./mint.html#payments) from purses.

```js
const paymentForAlice = purse.withdraw(10, `alice's community money`);
```

Like our purse, this payment contains BaytownBucks, but unlike purses,
payments are used to represent tokens in transit. A payment can be
sent to someone else, a purse never should be.

Now let's send the payment to Alice as message:

```js
alice.receivePayment(paymentForAlice);
```

This may seem strange, but ERTP is built on top of [an
infrastructure](https://github.com/Agoric/SwingSet) in which
everything is an object. In this example, we have a reference to the
object `alice`, and can call her `receivePayment` to ask her to
receive this payment. Alice's methods are entirely up to her, and are
not part of ERTP.

## Security Properties

How does Alice know that she got paid real money? She could have been
sent fake money, or she could have been sent money that was
[double-spent](https://en.wikipedia.org/wiki/Double-spending).

When alice receives an alleged payment, she can call a method to know
that the alleged payment was valid, and get a new payment that is
exclusively hers:

```js
const myExclusivePayment = BaytownBucksIssuer.claimAll(allegedPayment);
```

The BaytownBucksIssuer is associated with the BaytownBucksMint, but
the issuer is the public-facing version that is accessible to anyone.
By holding the reference to a mint, you can mint more tokens. By
holding a reference to the issuer for a mint, you can check that a
payment is valid and exclusively claim it in a new payment to yourself.

That's the basic use case for a fungible token. `makeMint` in
[issuers.js](core/issuers.js) takes
in an optional configuration that allows for many more possibilities.