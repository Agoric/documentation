# Zoe: Offer-Safety Enforcement

Note: Zoe is currently at the pre-alpha stage. It has not yet been
formally tested or hardened.

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

To use Zoe, we put things in terms of "offers". An offer is a
statement about what you want and what you're willing to offer. It
turns out, many smart contracts (apart from gifts and one-way
payments) involve an exchange of digital assets that can be put in
terms of offers.

In this version of Zoe, our offers are simple (see [our roadmap](../roadmap/README.md) for
more complex offer types). We can say
things like, "I'll give you [three
wood for two bricks](https://en.wikipedia.org/wiki/Catan)." We can
also say something like, "I want three wood, and *the most* I'm
willing to pay is two bricks." Or even: "I can pay you two bricks and
I expect *at least* three wood back." [Learn more about the particulars
of structuring an offer here](./offer-rules.md).

Offers are a structured way of describing user intent. To a certain
extent, an offer's rules are the user's *contractual understanding*
of the agreement they are entering into. You might have noticed that
the offer doesn't specify the mechanism by which the exchange happens.
The offer doesn't say whether the item you want is up for auction, in
an exchange, or part of a private trade. The offer doesn't mention the
particular mechanism because an important part of the design of Zoe is
a __separation of concerns__. Zoe is responsible for enforcing what we
call "offer safety", and the smart contract that runs on top of Zoe is
responsible for figuring out a proposed reallocation of resources. To
use an auction as an example, the smart contract is responsible for
figuring out who wins the auction and how much they pay, but Zoe
handles the escrowing of the bids and the payments. You can think of
this as similar to e-commerce websites using a separate
payment-processor so that they don't have to handle the credit cards
themselves.

### What is "offer safety"?

Zoe guarantees offer safety, meaning that when a user makes an offer
that is escrowed with Zoe, Zoe guarantees that the user will either
get back why they said they wanted, or the user will get back what they
originally offered.

When a user escrows with Zoe, they get two things back immediately: a `seat`, and a JavaScript promise for a future payout. This `seat` has methods that the user can call to take action in the smart contract on Zoe, without the
smart contract ever having access to the underlying digital assets.
Let's look a particular example to see how this works.

## An example: A swap

I want to trade my three bricks for five wool. You realize you have
five wool and agree to the deal. Without Zoe, though, you might send
me the five wool, and I might disappear without ever giving you the
three bricks in return. With Zoe, we can safely trade with each other,
even if we don't trust one another. We are assured that at worst, if
the swap contract behaves badly, we will both get a refund, and at
best, we'll get what we each wanted.

Let's look at the basic `atomicSwap` contract ([full text of
the real contract](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js)).

Here's a high-level overview of what would happen:
1. I make an instance of the swap contract, which creates an invite.
2. I redeem my invite and escrow my three bricks with Zoe. In return, I get a seat and a promise for a payout in return.
3. I use my seat to make the first offer in the swap.
4. I tell you the swap's `instanceHandle`
5. Using the `instanceHandle`, you look up the swap with Zoe.
6. You verify that it's using the `atomicSwap` contract
   code you expect, and can ask the swap about the offers made so far.
7. You escrow your offer (offering five wool for three bricks) with
   Zoe, getting a seat and a promise for a payout in
   return.
8. You send your seat to the swap as a matching offer.
9. The offer matches and both of our payout promises resolve to [ERTP
   payments](../../ertp/guide/mint.html#payments), mine to the five wool that I wanted, and yours to
   the three bricks that you wanted. Success!


## How to write smart contracts

Writing smart contracts that run on Zoe is easy, but let's look
at a simple contract. This contract only does one thing, and
it's pretty useless - it gives you back what you put in. Let's call it
`automaticRefund`. Let's say the code of `automaticRefund` looks like this (see
the [real contract code here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/automaticRefund.js)):

```js
export const makeContract = (zoe, terms) => {
  const makeSeatInvite = () => {
    const seat = harden({
      makeOffer: () => {
        zoe.complete(harden([inviteHandle]));
        return `The offer was accepted`;
      },
    });
    const { invite, inviteHandle } = zoe.makeInvite(seat, {
      seatDesc: 'getRefund',
    });
    return invite;
  };

  return harden({
    invite: makeSeatInvite(),
    publicAPI: {
      makeInvite: makeSeatInvite,
    },
    terms,
  });
};
```
(In a real contract, whenever we create a new object or array, we recursively
deep-freeze it with `@agoric/harden`. You can [learn more about `harden` here](https://github.com/Agoric/harden).)

`automaticRefund` has one method exposed to the user: `makeOffer`.
`makeOffer` tells Zoe to complete the offer, which gives the user their payout through Zoe.

A smart contract on Zoe must export a function `makeContract` that
takes two parameters: `zoe`, which is the contract-specific API for Zoe, and
`terms`, which are the contract terms that a contract instance is made
with. `Terms` must include a property called `assays`, which is an
array of assays, the public API of mints. For instance, in our
bricks-for-wool example above, the contract terms would include the
brick assay and the wool assay. `Terms` would also include any other
contract-specific parameters that the author specified.

The smart contract must return an object with two properties:
`instance`, which is the user-facing API of the
contract, and `assays`, which is what the contract has decided is the
canonical list of assays for the contract. If no change is necessary,
`assays` may just be the assays in the terms.

## Diving Deeper

To get a better idea of the usual control flow, let's look at a more
complex smart contract, such as the `atomicSwap` contract that we
mentioned earlier. Someone needs to make the first offer, so let's
make sure our user-facing API has a method for that:

```js
const makeFirstOfferInvite = () => {
  const seat = harden({
    makeFirstOffer: () => {
      if (
        !hasValidPayoutRules(['offerAtMost', 'wantAtLeast'], inviteHandle)
      ) {
        throw rejectOffer(inviteHandle);
      }
      return makeMatchingInvite(inviteHandle);
    },
  });
  const { invite, inviteHandle } = zoe.makeInvite(seat, {
    seatDesc: 'firstOffer',
  });
  return invite;
};
```

This is pretty similar in format to the `automaticRefund`, but there
are a few changes. First, in this contract, we actually check what was
escrowed with Zoe to see if it's the kind of offer that we want to
accept. In this case, we only want to accept offers that have a
`payoutRules` of the
form:
```js
[{ kind: 'offerAtMost', units: x}, { kind: 'wantAtLeast', units: y}]
```
where `x` and `y` are units with the correct assays.

Also, this is a swap, so we can't immediately return a payout to the
user who puts in the first offer; we have to wait for a valid matching
offer. So, if we get a valid first offer, we create an invite which can be shared with other parties to create a matching offer.

So, how does the matching happen? We can look at another user-facing
method, `makeMatchingInvite`, and a helper function, `swap`:

```js
const makeMatchingInvite = firstInviteHandle => {
    const seat = harden({
      matchOffer: () => swap(firstInviteHandle, inviteHandle),
    });
    const { invite, inviteHandle } = zoe.makeInvite(seat, {
      offerMadeRules: zoe.getOffer(firstInviteHandle).payoutRules,
      seatDesc: 'matchOffer',
    });
    return invite;
  };
```

```js
swap: (
  keepHandle,
  tryHandle,
  keepHandleInactiveMsg = 'prior offer is unavailable',
) => {
  if (!zoe.isOfferActive(keepHandle)) {
    throw helpers.rejectOffer(tryHandle, keepHandleInactiveMsg);
  }
  if (!helpers.canTradeWith(keepHandle, tryHandle)) {
    throw helpers.rejectOffer(tryHandle);
  }
  const keepUnits = zoe.getOffer(keepHandle).units;
  const tryUnits = zoe.getOffer(tryHandle).units;
  // reallocate by switching the units
  const handles = harden([keepHandle, tryHandle]);
  zoe.reallocate(handles, harden([tryUnits, keepUnits]));
  zoe.complete(handles);
  return defaultAcceptanceMsg;
},
```

In the `makeMatchingInvite` method we call `swap`, which handles a lot of the logic. First, it checks if the offer is still active. If not, we reject the offer at
hand. Second, if the offer at hand isn't a match for the first offer,
we want to reject it for that reason as well.

Once we're sure that we *do* have a matching offer, we can do the most
exciting part, the reallocation.

Smart contracts on Zoe have no access to the underlying
digital assets, but they can ask Zoe for information on what was
escrowed for each offer. That information is in the form of a
`unit`, which can be thought of as the answer to `how much` or `how
many` ([see more about ERTP fundamentals here](../../ertp/guide/)). In "3 bricks"
the "3" is the unit.

Because this is a swap, we want to literally swap the units for the
first offer and the matching offer. That is, the user who put in the
first offer will get what the second user put in and vice versa. `swap` makes a call to `zoe.reallocate` in order to tell Zoe about
this reallocation for the two offers.

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
