# Zoe: Offer-Safety Enforcement

<Zoe-Version/>

::: tip Pre-alpha status
Zoe is currently at the pre-alpha stage. It has not yet been
formally tested or hardened. It is not yet of production quality.
:::

::: tip Out-of-date status
Zoe's master branch is currently an Alpha release candidate. The docs
are in the process of being updated, and should be current with
the release candidate in another few days. What you see here is out of
date. We apologize for any inconvenience this may cause.
:::

This guide assumes some knowledge of the [ERTP
fundamentals](../../ertp/guide/).

## What is Zoe?

__For users__: Zoe guarantees that as a user of a smart contract, you
will either get what you wanted or get a full refund, even if the
smart contract is buggy or malicious. (In fact, the smart contract
never has access to your digital assets.)

__For developers__: Zoe provides a safety net so you can focus on what
your smart contract does best, without worrying about your users
losing their assets due to a bug in the code that you wrote. Writing a
smart contract on Zoe is easy: all of the Zoe smart contracts are
written in the familiar language of JavaScript.

## Sounds like magic. How does it actually work?

To use Zoe, we put things in terms of "offers". An offer proposal is a
statement about what you want and what you're willing to offer. It
turns out, many smart contracts (apart from gifts and one-way
payments) involve an exchange of digital assets that can be put in
terms of offer proposals. We
can say things like, "I'll give you [three wood for two
bricks](https://en.wikipedia.org/wiki/Catan)." [Learn more about the
particulars of structuring an offer proposal here](./proposal.md).

Offers are a structured way of describing user intent. To a certain
extent, an offer's rules (called a *proposal*) are the user's
*contractual understanding* of the agreement they are entering into.

You might have noticed that the offer doesn't specify the mechanism by
which the exchange happens. The offer doesn't say whether the item you
want is up for auction, in an exchange, or part of a private trade.
The offer doesn't mention the particular mechanism because an
important part of the design of Zoe is a __separation of concerns__.

Zoe is responsible for enforcing what we call "offer safety", and the
smart contract that runs on top of Zoe is responsible for figuring out
a proposed reallocation of resources. To use an auction as an example,
the smart contract is responsible for figuring out who wins the
auction and how much they pay, but Zoe handles the escrowing of the
bids and the payments. You can think of this as similar to e-commerce
websites using a separate payment-processor so that they don't have to
handle the credit cards themselves.

### What is "offer safety"?

Zoe guarantees offer safety, meaning that when a user makes an offer
and it is escrowed with Zoe, Zoe guarantees that the user either
gets back why they said they wanted, or gets back (refunded) what they
originally offered and escrowed.

When a user escrows with Zoe, they get back
a JavaScript promise for a future payout. Let's
look a particular example to see how this works.

## An example: A swap

I want to trade my three bricks for five wool. You realize you have
five wool and agree to the deal. Without Zoe, you might send
me the five wool, and I might disappear without ever giving you the
three bricks. With Zoe, we can safely trade with each other,
even if we don't trust each other. We are assured that at worst, if
the swap contract behaves badly, we both get a refund, and at
best, we get what we each wanted.

Let's look at the basic `atomicSwap` contract ([full text of
the real contract](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js)).

Here's a high-level overview of what happens:
1. I make an instance of the swap contract, and get an invitation to
   participate in the contract.
2. I make an offer through Zoe by presenting my invitation, a proposal
   of 3 bricks for 5 wool, and a payment with the 3 bricks. Zoe escrows
   the bricks and returns me a seat (a `UserSeat` to be precise) in the
   contract, from which I can get the results of my offer, the payouts, etc.
3. The result of processing my offer is an invitation for my counterparty.
   I send you that invitation to participate in this contract instance.
4. You inspect the invitation and verify it was created by the
   `atomicSwap` contract code.
5. You use your invitation to make your offer (offering five wool for
   three bricks) with Zoe, making a matching offer. You get your own seat
   to with which to access your payout and offer results.
6. The contract confirms that our offers match, and reallocates our bricks
   and wool and exits our offers. That will resolve our respective payout
   promises, mine to the five wool that I wanted, and yours to the three
   bricks that you wanted. Success!

## How to write smart contracts

Writing smart contracts that run on Zoe is easy. Let's look
at a simple contract. It only does one thing, and
it's pretty useless - it gives you back what you put in. Let's call it
`automaticRefund`. Let's say the code of `automaticRefund` looks like
this (see the [real contract code
here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/automaticRefund.js)):

```js
export const start = zcf => {
  const refund = seat => {
    seat.exit();
    return `The offer was accepted`;
  };
  const makeRefundInvitation = () => zcf.makeInvitation(refund, 'getRefund');

  const publicFacet = {
    makeInvitation: makeRefundInvitation,
  };
  const creatorInvitation = makeRefundInvitation();
  return { creatorInvitation, publicFacet };
};
```
(In a real contract, whenever we create a new object or array, we recursively
deep-freeze it with `@agoric/harden`. You can [learn more about `harden` here](https://agoric.com/documentation/distributed-programming.html#harden).)

The `automaticRefund` contract behavior is implemented in `refund`.
It just tells Zoe to exit the offer, which gives the user their payout
through Zoe.

A smart contract on Zoe must export a function named `start` that
takes a single parameter: `zcf`, which is the contract-internal API
for Zoe. The `start` function must return an object with any of
several optional properties:
- `creatorInvitation`: an invitation only available to the creator of the contract instance.
- `creatorFacet`: an object with operations made accessible only to the creator.
- `publicFacet`: and object with operations available to any client with access to the instance.

## Diving Deeper

With that as background, let's dive back into the `atomicSwap` contract. As with `automaticRefund`, see the [real contract code
here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js).

The first thing the contract does is confirm that issuers are setup
for the Asset and Price. Those are the two items that will be swapped.
this uses the [`assertIssuerKeywords` helper function](../api/zoe-helpers.html#assertissuerkeywords-zcf-keywords), which checks properties of the running contract's terms (retrieved via `zcf.getTerms() in the `automaticRefund` contract).
```javascript
const start = zcf => {
  assertIssuerKeywords(zcf, ['Asset', 'Price']);
```

The first handler is for the creator of the contract, and it
will make the invitation for the other party. We will see how it
gets wired up at the end of the contract. When the associated
invitation is used to make an offer, this handler will be invoked
with the seat for that offer. This contract uses the
[`assertProposalShape` helper function](../api/zoe-helpers.html#assertproposalshape-seat-expected) to check that the offer proposes the kind of trade that the
contract will accept. In this case, it only accepts offers that
have a proposal of the form:

> `{ give: { Asset: amount1, want: { Price: amount2 } }`"

where `amount1` and `amount2` are amounts with the correct issuers.
It then pulls out the elements of the proposal in order to later
match them.

```javascript
  const makeMatchingInvitation = firstSeat => {
    assertProposalShape(firstSeat, {
      give: { Asset: null },
      want: { Price: null },
    });
    const { want, give } = firstSeat.getProposal();
```

The first handler then constructs a handler for the second offer,
with the first offer's `want` and `give` in scope. This second
handler does the final step: use the [`swap` helper function](../api/zoe-helpers.html#swap-zcf-leftseat-rightseat-lefthasexitedmsg-righthasexitedmsg),
which handles a lot of the logic. Once the swap succeeds,
it exits both seats and the contract shuts down.
```javascript
    const matchingSeatOfferHandler = matchingSeat => {
      const swapResult = swap(zcf, firstSeat, matchingSeat);
      zcf.shutdown();
      return swapResult;
    };
```
Now let's wire it up. The last step of the first handler is to
create and return the second party's invitation, using
`matchingSeatOfferHandler` and including custom properties
for the expected proposal.
```javascript
    const matchingSeatInvitation = zcf.makeInvitation(
      matchingSeatOfferHandler,
      'matchOffer',
      {
        asset: give.Asset,
        price: want.Price,
      },
    );
    return matchingSeatInvitation;
  };
```
Finally, we make the invitation for the first party, and return it as
the `creatorInvitation` of the contract.
```javascript
  const creatorInvitation = zcf.makeInvitation(
    makeMatchingInvitation,
    'firstOffer',
  );
  return { creatorInvitation };
};
```
The `creatorInvitation` is only available only to the
creator of the contract instance (see [`startInstance`](../api/zoe.html#e-zoe-startinstance-installation-issuerkeywordrecord-terms)).
The creator can use the invitation (by making an offer with it)
or send to some other party.

<!--
Smart contracts on Zoe have no access to the underlying
digital assets, but they can ask Zoe for information on what was
escrowed for each offer. That information is in the form of an
`amount`, which is a branded value. For instance, in "3 bricks", "3" is
the value, and "bricks" is the brand. ([See more about ERTP fundamentals here](../../ertp/guide/)).

Because this is a swap, we want to literally swap the amounts for the
first offer and the matching offer. That is, the user who put in the
first offer will get what the second user put in and vice versa. `swap` makes a call to `zoe.reallocate` in order to tell Zoe about this reallocation for the two offers.

Zoe checks two invariants before changing its bookkeeping. First, Zoe
checks that offer safety holds for these offers. In other words, does
this reallocation either give a refund or give the user what they
wanted? Second, Zoe checks that asset supply is conserved. This means
that we haven't lost or added any digital assets on the whole as a
result of this reallocation.

If the reallocation passes, we can tell Zoe to complete the offers and
send out payouts with a call to `zoe.complete`. Note that we can
reallocate without completing offers, or complete without
reallocating, depending on the logic of the contract.

<!--
More:

* [How do I write a smart contract on Zoe and upload and install it?](/TODO)

* [How can I build an application with my Zoe smart contract?](/TODO)

* [What is the API of the contract facet for Zoe?](../api/TODO)

* [What is the API of the user-facing facet for Zoe](../api/TODO)
-->
