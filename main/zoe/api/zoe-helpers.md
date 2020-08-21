# ZoeHelpers

ZoeHelpers are functions that extract common contract code and
patterns into reusable helpers.

The ZoeHelper methods are listed below. To use any of them, you import
it directly from `@agoric/zoe/src/contractSupport/`. For example, the following 
imports the two ZoeHelpers `assertIssuerKeywords()` and `asserProposalShape()`:
```js
import {
  assertIssuerKeywords,
  assertProposalShape,
} from '../../../src/contractSupport';
```
**tyg todo: Do the exported methods in .../contractSupport/index.js all need to be documented?
Specifically, the ones not in the zoeHelpers.js file?**

Note that almost all ZoeHelpers require `zcf` as a first argument. 
**tyg todo: Why? Also, if this is a contractFacet rather than a string, 
where is it coming from? Looking at the contracts, the only prior zcf
looked to be the argument to start(), which also seemed to just be a 'zcf' string?**

## assertIssuerKeywords(zcf, keywords)
- `zcf` `{String}`  **tyg todo: Should this be contractFacet or similar? Just noting it here; if need to correct will then go do the other four methods**
- `keywords` `{Array <String>}`

Checks that keywords submitted by the contract instance creator
match what the contract expects. Throws if incorrect or if there are
missing or extra keywords. The keywords order is irrelevant.

The first argument is always `zcf`.

**tyg todo: Does this need (or should most of the time) to follow `zcf.getTerms`?
Seems to in most of the contracts. Or is just the `zcf` argument sufficient?**
**tyg todo: Should the keywords always be hardened? If so, can that be done by
the method instead of the developer having to specify it?**
```js
import {
  assertIssuerKeywords,
} from '../../../src/contractSupport';

// proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## satisfies(zcf, seat, update)
- `zcf`- `{String}`
- `seat` - `{ZcfSeat}`
- `update` - `{AmountKeywordRecord}`
- Returns: `true` if the `seat`'s allocation update satisfies its `proposal.want`, `false` if not.

Checks if an update to a `seat`'s `currentAllocation` satisfies its
`proposal.want`. Note this is half of the offer safety check; 
it does not check if the allocation constitutes a refund.
The update is merged with `currentAllocation` such that
`update`'s values prevail if the keywords are the same **(tyg todo: And if they're not the same?)**
The result is the `newAllocation`. **tyg todo: Which is used how/where is it?**

This code uses `satisfies()` to define a `satisfiedBy()` comparison
method between two `seats` to see if the second `seat` argument's `currentAllocation`
satisfies the first `seat` argument's `proposal.want`. It then calls
`satisfiedBy()` on both orders of the two `seats`, and if both satisfy each other,
it does a swap on them. 
```js
import {
  satisfies,
} from '../../../src/contractSupport';

const satisfiedBy = (xSeat, ySeat) =>
        satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
    swap(zcf, seat, offer);
```
## assertUsesNatMath
- `zcf`- `{String}`
- `brand` - `{Brand}`
- Returns - `{Boolean}` with a message if `false`  **tyg todo: Not sure how to describe this?**

**tyg todo: Should this be assertUsesNatMathKind()?**

This method always takes `'zcf'` as its first argument. 

Assert that the `brand` argument's one-to-one associated `amountMath`
use the `NAT` value of `amountMathKind` (i.e. the `brand`, and its 
associated `issuer`, are for fungible assets).

Returns `true` if so, `false` if not. `false` also returns `details` '`issuer must use NAT amountMath`'
```js
import {
  assertUsesNatMath,
} from '../../../src/contractSupport';

 assertUsesNatMath(zcf, quatloosBrand);
 ```
## trade(zcf, keepLeft, tryRight)
- `zcf` - `{String}`
- `keepLeft` - See below.
- `tryRight` - See below.
- Returns: Undefined.

The first argument is always '`zcf`'.

The `keepLeft` and `tryRight` arguments are each offers **tyg todo: Is this correct?** 
with `seat`, `gains`, and optional `losses` properties. `gains` and `losses` are `amountKeywordRecords`
describing declaratively what is added or removed from that offer's allocation.

`trade()` does a trade between its two offer arguments. If the two offers can trade, 
it swaps their compatible assets and marks both offers as complete.

Any surplus remains with the original, left, offer. For example if offer 
A gives 5 moola and offer B only wants 3 moola, offer A retains 2 moola.

If the first offer argument has already completed and is no longer active, 
the other offer is rejected with a message.

If the trade fails for any reason, it throws the message `The trade between 
left ${keepLeft} and right ${tryRight} failed. Please check the log for more 
information`. It writes the specific error to the console.
```js
import {
  trade,
} from '../../../src/contractSupport';
trade(
      zcf,
      {
        seat: poolSeat,
        gains: {
          [getPoolKeyword(amountIn.brand)]: amountIn,
        },
        losses: {
          [getPoolKeyword(amountOut.brand)]: amountOut,
        },
      },
      {
        seat: swapSeat,
        gains: { Out: amountOut },
        losses: { In: amountIn },
      },
    );
```

## swap(keepSeat, trySeat, keepHandleInactiveMsg)
- `zcf` `{String}
- `keepSeat` `{ZCFSeat}
- `trySeat` `{ZCFSeat}
- `[keepHandleInactiveMsg]` `{String}`
- Returns: `defaultAcceptanceMsg`

**tyg todo: Could I get a description that's a clear distinction between
swap() and trade(), including use cases when you'd use each one (but not the other)?**

If the two `seats` and their offers can trade, then swap their compatible assets,
marking both offers as complete. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

In many contracts, we have a particular offer we want to find a
match for. The contract iterates over potential matches, and 
checks if the two offers are swappable. `keepSeat` is the offer
we are trying to match, and `trySeat` is the offer being checked
for a match with `keepSeat`

If the `keepSeat` offer is no longer active, `swap()` rejects the `trySeat` offer
with the `keepHandleInactiveMsg`, which defaults to `'prior offer is unavailable'` 

If `satisfies()` returns `false` for the two offers, we reject the
`trySeat` offer.

If `satisfies` is `true`, Zoe reallocates by swapping the
amounts for the two offers, then both offers complete so the
users receive their payout.

Any surplus remains with the `keepSeat` original offer. For example if
offer A gives 5 Quatloos and offer B only wants 3 Quatloos, offer A
retains 2 Quatloos.

If the swap fails, no assets transfer, and the 'trySeat' offer is rejected.

```js
import {
  swap,
} from '../../../src/contractSupport';

// If there's an existing offer this offer is a match for, make the trade
// and return the seat for the matched offer. If not, return undefined, so
// the caller knows to add the new offer to the offer book.
function swapIfCanTrade(offers, seat) {
  for (const offer of offers) {
    const satisfiedBy = (xSeat, ySeat) =>
      satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
    if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
      swap(zcf, seat, offer);
      // return handle to remove
      return offer;      }
   }
   return undefined;
 }
```
## assertProposalShape(offerHandler, expected)
- `offerHandler` `{OfferHandler}`
- `expected` `{ExpectedRecord}`
- Returns: **tyg todo: Not sure what to put here since I'm not sure what's happening**

This is the only ZoeHelper that does **not** take 'zcf' as its first argument.

Make an `offerHandler` that wraps the provided `offerHandler`, to first
check the submitted offer against an `expected` record that says
what shape of proposal is acceptable.  **tyg todo: Not sure what "shape" means here?**

This `ExpectedRecord` is like a `Proposal`, but the amounts in `want`
and `give` should be `null`; the `exit` clause should specify a rule with
null contents. If the client submits an `Offer` which does not match
these expectations, that offer is rejected (and refunded). **tyg todo: Really need a clearer explanation of just what's being 
checked here.**
```js
import {
  assertProposalShape,
} from '../../../src/contractSupport';

const sellAssetForPrice = harden({
    give: { Asset: null },
    want: { Price: null },
  });
const sell = seat => {
  buySeats = swapIfCanTradeAndUpdateBook(buySeats, sellSeats, seat);
  return 'Trade Successful';
};

const sellHandler = assertProposalShape(sell, sellAssetForPrice);
```


# Eliminated Previous ZoeHelpers

**tyg todo: From here down are what looks to me like eliminated zoeHelpers. Please check to
be sure none of them are still active**

## zoeHelpers.rejectIfNotProposal(offerHandle, expectedProposalStructure)
- `offerHandle` `{Handle}`
- `expectedProposalStructure` `{Object}`

Throws and completes the offer if the `proposal` for the offer indexed by offerHandle does
not match the `expectedProposalStructure`. If a property (`want`,
`give` or `exit`) is undefined in
`expectedProposalStructure`, anything under that property in the
actual proposal is accepted.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { rejectIfNotProposal } = makeZoeHelpers(zoe);

// proposal for offerHandle
const proposal = {
  want: { Asset: moola(4) },
  give: { Price: simoleans(16) },
  exit: { onDemand: null },
}

// Throws: "Asset" !== "Assets"
rejectIfNotProposal(
  offerHandle,
  harden({ want: ['Assets'], give: ['Price'] }),
)
```

## zoeHelpers.checkIfProposal(offerHandle, expectedProposalStructure)
- `offerHandle` `{Handle}`
- `expectedProposalStructure` `{Object}`

Like `rejectIfNotProposal`, this checks if the proposal has the
expected proposal structure. However, `checkIfProposal` returns a
boolean and never throws or completes the offer. 

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { checkIfProposal } = makeZoeHelpers(zoe);

// proposal for offerHandle
const proposal = {
  want: { Asset: moola(4) },
  give: { Price: simoleans(16) },
  exit: { onDemand: null },
}

checkIfProposal(
  offerHandle,
  harden({ want: ['Assets'], give: ['Price'] }),
) // => false
```
## zoeHelpers.getActiveOffers(offerHandles)
- `offerHandle[]`

Returns the offer records, but only if the offer is still active.

## zoeHelpers.rejectOffer(offerHandle)
- `offerHandle`



## zoeHelpers.makeEmptyOffer()
- Returns: a promise for the new offerHandle

Creates an empty offer.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { makeEmptyOffer } = makeZoeHelpers(zoe);

makeEmptyOffer().then(offerHandle => {...})
```

## zoeHelpers.checkHook(offerHook, expected)
- `offerHook` - the function to be called when the offer is made and
  invite redeemed
- `expected` - the expected structure of the proposal for the offer. Values are null.
- Returns: a new offerHook

Create a new offerHook that checks whether the proposal matches the
`expected` structure before calling the `offerHook` argument

## zoeHelpers.escrowAndAllocateTo({ amount, payment, keyword, recipientHandle })
- `amount` - the amount to be escrowed. This should be equal to the
  payment amount
- `payment` - the payment that will be escrowed
- `keyword` - the keyword under which the payment should be escrowed.
  This will be used to create the proposal and the
  paymentKeywordRecord
- `recipientHandle` - the offerHandle that we will reallocate the
  amount to
- Returns: undefined

Escrow a payment with Zoe and reallocate the amount of the payment to a recipient.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { checkHook } = makeZoeHelpers(zoe);

const expected = harden({
  give: { Asset: null },
  want: { Price: null },
});

return zcf.makeInvitation(
  checkHook(internalOfferHook, expected),
  'firstOffer',
);

const { escrowAndAllocateTo } = makeZoeHelpers(zoe);

const offerHook = offerHandle => {
  // We will send everyone who makes an offer 1000 tokens

  const tokens1000 = amountMath.make(1000);
  const payment = mint.mintPayment(tokens1000);

  // Let's use a helper function which escrows the payment with
  // Zoe, and reallocates to the recipientHandle.
  return zoeHelpers
    .escrowAndAllocateTo({
      amount: tokens1000,
      payment,
      keyword: 'Token',
      recipientHandle: offerHandle,
    })
    .then(() => {
      // Complete the user's offer so that the user gets a payout
      zcf.complete(harden([offerHandle]));

      // Since the user is getting the payout through Zoe, we can
      // return anything here. Let's return some helpful instructions.
      return 'Offer completed. You should receive a payment from Zoe';
    });
};
```
## zoeHelpers.isOfferSafe()
- `offerHandle` - Offer being checked.
- `allocation` - Proposed allocation
- Returns: `true` if the allocation is safe for the offer, `false` otherwise.
checks whether an
allocation for a particular offer would satisfy offer safety. Any
allocation that returns true under `satisfies` will also return true
under `isOfferSafe`. (`isOfferSafe` is equivalent of `satisfies` logical OR
gives a refund).
```js
//If `leftOfferHandle` has the proposal
//{ give: { Asset: moola(10) },
//  want: { Price: simoleans(4) },
//Giving someone exactly what they want is offer safe
isOfferSafe(leftOfferHandle, {
  Asset: moola(0),
  Price: simoleans(4),
})
// Giving someone less than what they want and not what they gave is not offer safe
isOfferSafe(leftOfferHandle, {
  Asset: moola(0),
  Price: simoleans(3),
})  ,
```

