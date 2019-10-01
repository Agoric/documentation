---
####
# YAML section setting up the home page
# run `npm run docs:dev` at any time to start local dev server and access website at
# localhost:8080 by default
####
home: true # use default home page layout (hero image with text, features section)
heroImage: https://agoric.com/assets/images/logo.svg
actionText: Get Started → # text that goes in the button
actionLink: /guide/ # go-to link when clicking on button
features:
  - title: New Protocol
    details: Bitcoin has unspent transactions. Ethereum has account balances. Agoric has ERTP.

  - title: Familiarity of JavaScript
    details: ERTP is a uniform way of transferring tokens and other digital assets in JavaScript.

  - title: Securely Create and Transfer
    details: All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

footer: Apache-2.0 Licensed | Copyright © 2019-Agoric
---

## A quick tutorial

Let's look at an example. In ERTP, all digital assets, including fungible and
non-fungible tokens, are created by a `mint`. Having access to the mint
gives you the power to create more digital assets of the same type at
will. For instance, let's say we want to create a new community
currency called 'BaytownBucks':

```js
const baytownBucksMint = makeMint('BaytownBucks');
```

Great! Now let's use our mint to create 1000 new BaytownBucks.

```js
const purse = baytownBucksMint.mint(1000, 'community treasury');
```

The act of minting created 1000 BaytownBucks and stored them together in a
`purse`. Purses in ERTP only hold one type of digital asset, so this
purse can only ever hold BaytownBucks.

Let's distribute the BaytownBucks to members of the community. To send
money in ERTP, we withdraw `payments` from purses.

```js
const paymentForAlice = purse.withdraw(10, `alice's community money`);
```

Like our purse, this payment contains BaytownBucks, but unlike purses,
payments are used to represent tokens in transit. A payment can be
sent to someone else, a purse never should be.

Now let's send the payment to Alice as message:

```
alice.receivePayment(paymentForAlice);
```

This may seem strange, but ERTP is built on top of [an
infrastructure](https://github.com/Agoric/SwingSet) in which
everything is an object. In this example, we have a reference to the
object `alice`, and can call her `receivePayment` to ask her to
receive this payment. Alice's methods are entirely up to her, and are
not part of ERTP.
