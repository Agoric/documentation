# Zoe: Offer-Safety Enforcement

<Zoe-Version/>

::: tip Pre-alpha status
Zoe is currently at the pre-alpha stage. It has not yet been
formally tested or hardened.
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
terms of offer proposals.

In this version of Zoe, our offer proposals are simple (see [our
roadmap](../roadmap/README.md) for more complex proposal types). We
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
that is escrowed with Zoe, Zoe guarantees that the user will either
get back why they said they wanted, or the user will get back what they
originally offered.

When a user escrows with Zoe, they get a few things back immediately:
an `outcome`, and a JavaScript promise for a future payout. The
`outcome` is the return value of making the offer. Let's look a
particular example to see how this works.

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
1. I make an instance of the swap contract.
2. I escrow my three bricks with Zoe and make my offer. In return, I
   get an invite to join the contract as the matching offer, and  a
   promise for a payout. I send you the invite.
3. You inspect the invite and verify that it was created using the
   `atomicSwap` contract code.
4. You use your invite to escrow your offer (offering five wool for
   three bricks) with Zoe, making a matching offer. You get an outcome
   and a promise for a payout in return.
5. The offer matches and both of our payout promises resolve, mine to
   the five wool that I wanted, and yours to the three bricks that you
   wanted. Success!


## How to write smart contracts

Writing smart contracts that run on Zoe is easy, but let's look
at a simple contract. This contract only does one thing, and
it's pretty useless - it gives you back what you put in. Let's call it
`automaticRefund`. Let's say the code of `automaticRefund` looks like
this (see the [real contract code
here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/automaticRefund.js)):

```js
export const makeContract = harden(zcf => {
  const refundOfferHook = offerHandle => {
    zcf.complete(harden([offerHandle]));
    return `The offer was accepted`;
  };
  const makeRefundInvite = () =>
    zcf.makeInvitation({
      offerHook: refundOfferHook,
      customProperties: {
        inviteDesc: 'getRefund',
      },
    });
  return {
    invite: makeRefundInvite(),
    publicAPI: {
      makeInvite: makeRefundInvite,
    },
  });
});
```
(In a real contract, whenever we create a new object or array, we recursively
deep-freeze it with `@agoric/harden`. You can [learn more about `harden` here](https://github.com/Agoric/harden).)

The `automaticRefund` contract behavior is implemented in `refundOfferHook`. 
It just tells Zoe to complete the offer, which gives the user their payout 
through Zoe.

A smart contract on Zoe must export a function `makeContract` that
takes a single parameters: `zcf`, which is the contract-internal API
for Zoe. The smart contract must return an object with two
properties:
`invite`, an invite to join the contract, which will be given to the
user who instantiated the contract, and `publicAPI`, the public API to the
contract (no invite necessary to call these methods!).

## Diving Deeper

To get a better idea of the usual control flow, let's look at a more
complex smart contract, such as the `atomicSwap` contract that we
mentioned earlier. Someone needs to make the first offer, so let's
make sure our user-facing API has a method for that:

```js
const makeFirstOfferInvite = () =>
  inviteAnOffer({
    offerHook: makeMatchingInvite,
    customProperties: {
      inviteDesc: 'firstOffer',
    },
    expected: {
      give: { Asset: null },
      want: { Price: null },
    },
  });
```

This is pretty similar in format to the `automaticRefund`, but there
are a few changes. First, in this contract, we use the 
[`inviteAnOffer` helper function](../api/zoe-helpers.html#zoehelper-inviteanoffer-options) to 
make an invite that will actually check what was
escrowed with Zoe to see if it's the kind of offer that we want to
accept. In this case, we only want to accept offers that have a
proposal of the form:
```js
{ give: { Asset: amount1, want: { Price: amount2 } }
```
where `amount1` and `amount2` are amounts with the correct issuers.

Also, this is a swap, so we can't immediately return a payout to the
user who puts in the first offer; we have to wait for a valid matching
offer. So, if we get a valid first offer, we create an invite which can 
be shared with other parties to create a matching offer.

So, how does the matching happen? We can look at another user-facing
method, `makeMatchingInvite`, and a helper function, `swap`:

```js
const makeMatchingInvite = firstOfferHandle => {
  const {
    proposal: { want, give },
  } = zcf.getOffer(firstOfferHandle);
  return inviteAnOffer({
    offerHook: offerHandle => swap(firstOfferHandle, offerHandle),
    customProperties: {
      asset: give.Asset,
      price: want.Price,
      inviteDesc: 'matchOffer',
    },
  });
};
```
In the `makeMatchingInvite` method we call the [`swap` helper function](../api/zoe-helpers.html#zoehelper-swap-keephandle-tryhandle-keephandleinactivemsg), which handles a lot of the logic. The code for `swap` is:

```js
  swap: (
    keepHandle,
    tryHandle,
    keepHandleInactiveMsg = 'prior offer is unavailable',
  ) => {
    if (!zcf.isOfferActive(keepHandle)) {
      throw helpers.rejectOffer(tryHandle, keepHandleInactiveMsg);
    }
    if (!helpers.canTradeWith(keepHandle, tryHandle)) {
      throw helpers.rejectOffer(tryHandle);
    }
    const keepAmounts = zcf.getCurrentAllocation(keepHandle);
    const tryAmounts = zcf.getCurrentAllocation(tryHandle);
    // reallocate by switching the amount
    const handles =         harden([keepHandle, tryHandle]);
    zcf.reallocate(handles, harden([tryAmounts, keepAmounts]));
    zcf.complete(handles);
    return defaultAcceptanceMsg;
  }
```
First, `swap` checks if the offer is still 
active. If not, we reject the offer at hand. Second, if the offer 
at hand isn't a match for the first offer, we want to reject it 
for that reason as well.

Once we're sure that we *do* have a matching offer, we can do the most
exciting part, the reallocation.

Smart contracts on Zoe have no access to the underlying
digital assets, but they can ask Zoe for information on what was
escrowed for each offer. That information is in the form of an
`amount`, which is a labeled extent. For instance, in "3 bricks", "3" is
the extent, and "bricks" is the label. ([See more about ERTP fundamentals here](../../ertp/guide/)).

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
