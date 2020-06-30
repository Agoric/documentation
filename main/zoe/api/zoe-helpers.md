# ZoeHelpers

ZoeHelpers are functions that extract common contract code and
patterns into reusable helpers.

These helper functions can be imported from @agoric/zoe/src/contractSupport. We
expect to move them to a separate package shortly, so it would become
'@agoric/zoe-contract-support'. The import provides a function `makeZoeHelpers()`,
which produces versions of the function that are bound to the current zoe instance.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const {
  assertKeywords,
  assertNatMathHelpers,
  checkIfProposal,
  rejectOffer,
  swap,
  rejectIfNotProposal,
  getActiveOffers,
  makeEmptyOffer,
  escrowAndAllocateTo,
  isOfferSafe,
  satisfies,
  trade,
} = makeZoeHelpers(zoe);
```

## zoeHelpers.assertKeywords(keywords)
- `keywords` `{Array <String>}`

Checks that the keywords submitted by the creator of the contract
instance match what the contract expects. Throws if incorrect or if there is
missing or extra keywords. Order of keywords is irrelevant.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { assertKeywords } = makeZoeHelpers(zoe);

// proposal for offerHandle
const proposal = {
  want: { Asset: moola(4) },
  give: { Price: simoleans(16) },
  exit: { onDemand: null },
}

assertKeywords(['Asset', 'Price']);
```

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

## zoeHelpers.swap(keepHandle, tryHandle, keepHandleInactiveMsg)
- `keepHandle`
- `tryHandle`
- `keepHandleInactiveMsg`
- Returns: defaultAcceptanceMsg

In many contracts, we have a particular offer that we want to find a
match for. We will iterate over a number of potential matches, and try
them out to see if the two offers are swappable. The particular offer
that we are trying to find a match for has the handle `keepHandle`,
and the offer that we are trying out has the handle `tryHandle`. 

If the `keepOffer` is no longer active, we reject the `tryOffer` with
the `keepHandleInactiveMsg`. 

If `satisfies` returns false for the two offers, we reject the
`tryOffer`.

If `satisfies` is true, we reallocate with Zoe by swapping the
amounts for the two offers, then we complete both offers so that the
users will receive their payout. Any surplus in the swap remains with the 
original offer (`keepHandle`).

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { swap } = makeZoeHelpers(zoe);

  // `firstOfferHandle` is from a prior offer to the contract
  const hook = newHandle => swap(firstOfferHandle, newHandle);
  return zcf.makeInvitation(hook);
```

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
=======
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

## zoeHelpers.satisfies()
- `offerhandle`- The offer being checked
- `allocation` - The allocation checked against the offer's wants.
- Returns: `true` if the allocation satisfies the offer, `false` if not.

Checks is an allocation would satisfy a single offer's wants if that was the allocation passed to
`reallocate()`. This is half of the offer safety check; whether the allocation constitutes a refund
is not checked. 
```js
//If `leftOfferHandle' is:
//{ give: { Asset: moola(10) },
//  want: { Price: simoleans(4) },
// giving someone exactly what they want satisifies wants, returns `true`
satisfies(leftOfferHandle, {
  Asset: moola(0),
  Price: simoleans(4),
})
// giving someone less than what they want even with a refund doesn't satisfy wants`,
satisfies(leftOfferHandle, {
  Asset: moola(10),
  Price: simoleans(3),
})
//giving someone less than what they want even with a refund doesn't satisfy wants`,      
satisfies(leftOfferHandle, {
  Asset: moola(0),
  Price: simoleans(3),
}),
```

## zoeHelpers.isOfferSafe()
- `offerHandle` - Offer being checked.
- `allocation` - Proposed allocation
- Returns: `true` if the allocation is safe for the offer, `false` otherwise.
checks whether an
allocation for a particular offer would satisfy offer safety. Any
allocation that returns true under `satisfy` **(tyg todo: Should this be "satisfies"?)** will also return true
under `isOfferSafe`. (`isOfferSafe` is equivalent of `satisfies` || **(tyg todo: I'd prefer to use "logical OR" here. OK?)**
gives a refund).
```js
//If `leftOfferHandle` is:
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

## zoeHelpers.trade()
- **(tyg todo: Not sure how to describe/name the arguments with respect to their being a combination of offerHandle, gain, and loss?)**
- Returns: **(tyg todo: Not clear on what's returned; boolean? Or from the code, either undefined or an acceptance message?)**
Performs a trade between two offers given a declarative description of what each side loses
and gains. If the two `offerHandle` arguments can trade, then swap their compatible assets, marking both offers as complete.

Any surplus remains with the original offer. For example if offer A gives 5 moola and offer B only wants 3 moola, offer A
retains 2 moola.

If the first offer argument has already completed and is no longer active, the other offer is rejected with a message.
```js
// If 'leftOfferHandle' is
// {
//  give: { Asset: moola(10) },
//  want: { Bid: simoleans(4) } }
// and `rightOfferHandle` is
// {
//  give: { Money: simoleans(6) },
//  want: { Items: moola(7) } }
// `trade` makes the trade and returns `true`
   trade(
        {
          offerHandle: leftOfferHandle,
          gains: { Bid: simoleans(4) },
          losses: { Asset: moola(7) },
        },
        {
          offerHandle: rightOfferHandle,
          gains: { Items: moola(7) },
          losses: { Money: simoleans(4) },
        },
      );
```
