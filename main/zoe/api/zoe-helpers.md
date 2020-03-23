# ZoeHelpers

ZoeHelpers are contract helper functions.

## zoeHelper.assertKeywords(keywords)
- `keywords` `{Array <String>}`

Checks if the array of strings are the correct keywords. Throws if incorrect or if there is missing or extra keywords. Order of keywords is irrelevant.

## zoeHelper.rejectIfNotProposal(proposal, proposalStructure)
- `proposal` `{Proposal}`
- `proposalStructure` `{Object}`

Throws if the `proposal` and `proposalStructure` are not an exact match.

```js
const proposal = {
  want: { Asset: moola(4) },
  give: { Price: simoleans(16) },
  exit: { onDemand: null },
}

// Throws: "Asset" !== "Assets"
rejectIfNotProposal(
  proposal,
  harden({ want: ['Assets'], give: ['Price'] }),
)
```

## zoeHelper.checkIfProposal(proposal, proposalStructure)
- `proposal` `{Proposal}`
- `proposalStructure` `{Object}`

Checks if the proposal has the expected proposal structure.

```js
const proposal = {
  want: { Asset: moola(4) },
  give: { Price: simoleans(16) },
  exit: { onDemand: null },
}

checkIfProposal(
  proposal,
  harden({ want: ['Asset'], give: ['Price'] }),
)
```
## zoeHelper.getActiveOffers(offerHandle)
- `offerHandle`

Get a list of active offers.

## zoeHelper.rejectOffer(offerHandle)
- `offerHandle`


## zoeHelper.canTradeWith(leftInviteHandle, rightInviteHandle)
- `leftInviteHandle`
- `rightInviteHandle`
- Returns: `{Boolean}`

Checks if the `give` and `want` of two invites are comparable.

```js
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

## zoeHelper.swap()

## zoeHelper.makeEmptyOffer()
- Returns:

Creates an empty offer.

```js
const emptyOffer = makeEmptyOffer()
```