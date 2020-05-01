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
  canTradeWith,
  checkIfProposal,
  rejectOffer,
  swap,
  rejectIfNotProposal,
  getActiveOffers,
  makeEmptyOffer,
} = makeZoeHelpers(zoe);
```

## zoeHelper.assertKeywords(keywords)
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

## zoeHelper.rejectIfNotProposal(offerHandle, expectedProposalStructure)
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

## zoeHelper.checkIfProposal(offerHandle, expectedProposalStructure)
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
## zoeHelper.getActiveOffers(offerHandles)
- `offerHandle[]`

Returns the offer records, but only if the offer is still active.

## zoeHelper.rejectOffer(offerHandle)
- `offerHandle`


## zoeHelper.canTradeWith(leftOfferHandle, rightOfferHandle)
- `leftOfferHandle`
- `rightOfferHandle`
- Returns: `{Boolean}`

Checks if the `give` and `want` of two invites would satisfy offer
safety if the two allocations are swapped.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { canTradeWith } = makeZoeHelpers(zoe);

const leftInvite = harden({
  give: { Asset: moola(10) },
  want: { Price: simoleans(4) },
  exit: { onDemand: null },
})

const rightInvite = harden({
  give: { Price: simoleans(6) },
  want: { Asset: moola(7) },
  exit: { onDemand: null },
})

const cantTradeRightInvite = harden({
  give: { Price: simoleans(6) },
  want: { Asset: moola(100) },
  exit: { onDemand: null },
})

// Returns true
canTradeWith(leftInvite, rightInvite)

// Returns false
canTradeWith(leftInvite, cantTradeRightInvite)
```

## zoeHelper.swap(keepHandle, tryHandle, keepHandleInactiveMsg)
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

If `canTradeWith` returns false for the two offers, we reject the
`tryOffer`.

If `canTradeWith` is true, we reallocate with Zoe by swapping the
amounts for the two offers, then we complete both offers so that the
users will receive their payout.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { swap } = makeZoeHelpers(zoe);

  // `firstOfferHandle` is from a prior offer to the contract
  const hook = newHandle => swap(firstOfferHandle, newHandle);
  return zcf.makeInvitation(hook);
```

## zoeHelper.inviteAnOffer(options)
- `options` `{offerHook, customProperties, expected}` Optional name 
  properties of the 
- Returns: a promise for the new offerHandle

**DEPRECATED AS OF ZOE 0.6 / MAY 2020**

**We recommend using `checkhook` instead.**

**See [`zcf.makeInvitation`](https://agoric.com/documentation/zoe/api/zoe-contract-facet.html#zcf-makeinvitation-offerhook-customproperties)**

Make an invitation to submit an Offer to this contract. This
invitation can be given to a client, granting them the ability to
participate in the contract.

If "offerHook" is provided, it will be called when an offer is made 
using the invite. The callback will get a reference to the offerHandle.

If the "expected" option is provided, it should be an {ExpectedRecord}.
This is like a {Proposal}, but the amounts in 'want' and 'give' should be null,
and the 'exit' should have a choice but the contents should be null.
If the client submits an Offer which does not match these expectations,
that offer will be rejected (and refunded) without invoking the offerHook.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { inviteAnOffer } = makeZoeHelpers(zoe);

  const firstOffer = inviteAnOffer({
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

## zoeHelper.makeEmptyOffer()
- Returns: a promise for the new offerHandle

Creates an empty offer.

```js
import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

const { makeEmptyOffer } = makeZoeHelpers(zoe);

makeEmptyOffer().then(offerHandle => {...})
```
