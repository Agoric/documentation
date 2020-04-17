# Zoe Contract Facet

<Zoe-Version/>

## zcf.reallocate(offerHandles, reallocation)
- `offerHandles` `{Array <Object>}`
- `reallocation` <router-link to="/zoe/api/records.html#amountkeywordrecord">`{Array <AmountKeywordRecord>}`</router-link>

Instruct Zoe to try reallocating for the given `offerHandles`. Reallocation is an array of `AmountKeywordRecords`, which are objects where the keys are keywords and the values are amounts. The amount to be paid to the player who made the offer at the same index in the `offerHandles` array. The reallocation will only happen if 'offer safety' and conservation of rights are true, as enforced by Zoe.

```js
import harden from '@agoric/harden';

// reallocate by switching the amount of the firstOffer and matchingOffer
zoe.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferAmount, firstOfferAmount]),
);
```

## zcf.complete(offerHandles)
- `offerHandles` `{Array <Object>}`

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zoe.complete(harden([someOfferHandle]));
```

## zcf.addNewIssuer(issuer, keyword)
- `issuers` `{Issuer}`
- `keyword` `{String}`
- Returns: `{Promise}`

Inform Zoe about a new issuer. Returns a promise for acknowledging when the issuer is added and ready.

```js
zoe.addNewIssuer(liquidityIssuer, 'Liquidity').then(() => {
  //do stuff
});
```

## zcf.getZoeService()
- Returns: `{ZoeService}`

Expose the user-facing Zoe Service API to the contracts as well.

## zcf.makeInvite(seat, customProperties)
- `seat` `{Object}`
- `customProperties` `{Object}`
- Returns: `{Payment}`

Create an invite using the Zoe `inviteMint`.

```js
const { invite, inviteHandle } = zoe.makeInvite(
  seat,
  { seatDesc: 'bid', auctionedAssets: tickets3, minimumBid: simoleans100 }
);
```

## zcf.getInviteIssuer()
- Returns: `{Issuer}`

Get the Zoe `inviteIssuer`.

```js
const inviteIssuer = await E(zoe).getInviteIssuer();
```

## zcf.getAmountMaths(issuerKeywordRecord)
- `issuerKeywordRecord` <router-link to="/zoe/api/records.html#issuerkeywordrecord">`{IssuerKeywordRecord}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#amountmathkeywordrecord">`{AmountMathKeywordRecord}`</router-link>

Pass in an issuerKeywordRecord and get an amountMathKeywordRecord in return.

```js
const amountMathKeywordRecord = zoe.getAmountMaths(issuerKeywordRecord);
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
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{Array <OfferRecord>}`</router-link>

Get a list of offer records.

```js
const offers = zoe.getOffers(listOfOfferHandles);
```

## zcf.getOffer(offerHandle)
- `offerHandle` `{Object}`
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{<OfferRecord>}`</router-link>

Get the offer record.

```js
const { payoutRules } = zoe.getOffer(inviteHandle);
```

## zcf.getInstanceRecord()
- Returns: <router-link
  to="/zoe/api/records.html#instance-record-properties">`{InstanceRecord}`</router-link>


Get the instance record. This allows the contracts to get access
to their keywords, issuers and other "instanceRecord" information from
Zoe.

```js
const { issuerKeywordRecord, keywords, terms } = zoe.getInstanceRecord()
```
