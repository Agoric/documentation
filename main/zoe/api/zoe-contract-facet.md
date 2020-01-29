# Zoe Contract Facet

<Zoe-Version/>

## zcf.reallocate(offerHandles, reallocation)
- `offerHandles` `{Array <Object>}`
- `reallocation` `{Array <Array <Unit>>}`

Instruct Zoe to try reallocating for the given `offerHandles`. Reallocation is a matrix (array of arrays) where the rows are the units to be paid to the player who made the offer at the same index in the `offerHandles` array. The reallocation will only happen if 'offer safety' and conservation of rights are true, as enforced by Zoe.

```js
import harden from '@agoric/harden';

// reallocate by switching the units of the firstOffer and matchingOffer
zoe.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferUnits, firstOfferUnits]),
);
```

## zcf.complete(offerHandles)
- `offerHandles` `{Array <Object>}`

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zoe.complete(harden([someOfferHandle]));
```

## zcf.addAssays(assays)
- `assays` `{Array <Assays>}`
- Returns: `{Promise}`

Inform Zoe about new assays. Returns a promise for acknowledging when the assays are added and ready.

## zcf.getZoeService()
- Returns: `{ZoeService}`

Expose the user-facing Zoe Service API to the contracts as well.

```js
```

## zcf.makeInvite(seat, customProperties)
- `seat` `{Object}`
- `customProperties` `{Object}`
- Returns: `{Payment}`

Create an invite using the Zoe `inviteMint`.

```js
const { invite, inviteHandle } = zoe.makeInvite(
  seat,
  { seatDesc: 'bid', auctionedAssets, minimumBid }
);
```

## zcf.getInviteAssay()
- Returns: `{Assay}`

Get the Zoe `inviteAssay`.

```js
const inviteAssay = await E(zoe).getInviteAssay();
```

## zcf.getUnitOpsForAssays(assays)
- `assays` `{Array <Assay>}`
- Returns: `{Array <UnitOps>}`

Get a list of `unitOps` per assay

```js
const unitOpsArray = zoe.getUnitOpsForAssays(assays);
```

## zcf.isOfferActive(offerHandle)
- `offerHandles` `{Object}`
- Returns: `{Boolean}``

Check if the offer is still active. This method does not throw if the offer is inactive.

```js
const isActive = zoe.isOfferActive(someOfferHandle);
```

## zcf.getOfferStatuses(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: `{OfferStatusesRecord}`

Divide the `offerHandles` into 'active' and 'inactive' lists

```js
const { active: activeBidHandles } = zoe.getOfferStatuses(
  harden(allBidHandles),
);
```

## zcf.getOffers(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: `{Array <OfferRecord>}`

Get a list of offer records.

```js
const offers = offerTable.getOffers(listOfOfferHandles);
```

## zcf.getOffer(offerHandle)
- `offerHandle` `{Object}`
- Returns: `{Array <OfferRecord>}`

Get the offer record.

```js
const { payoutRules } = zoe.getOffer(inviteHandle);
```
