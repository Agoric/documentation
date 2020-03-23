# ZoeHelpers

ZoeHelpers are contract helper functions.

## zoeHelper.assertKeywords(keywords)
- `keywords` `{Array <String>}`

Checks if the array of strings are the correct keywords. Throws if incorrect or if there is missing or extra keywords. Order of keywords is irrelevant.

## zoeHelper.rejectIfNotProposal(offer, proposalStructure)
- `offer` `{Proposal}`
- `proposalStructure` `{Object}`

Checks if the offer has the expected proposal structure. Throws if the provided proposalStructure is not an exact match.

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

## zoeHelper.checkIfProposal
## zoeHelper.getActiveOffers
## zoeHelper.rejectOffer
## zoeHelper.canTradeWith
## zoeHelper.swap
## zoeHelper.makeEmptyOffer