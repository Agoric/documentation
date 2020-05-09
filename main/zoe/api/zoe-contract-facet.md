# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state for that instance. A Zoe Contract Facet is access synchronously from within the contract, and usually is referred to in code as `zcf`. The contract instance is launched by `E(zoe).makeInstance`, and is given access to the `zcf` object during that launch. In the operation below, the `instanceHandle` is the handle for the running contract instance.

## zcf.reallocate(offerHandles, newAmountKeywordRecords, sparseKeywords)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `newAmountKeywordRecords` <router-link to="/zoe/api/records.html#amountkeywordrecord">`{Array <AmountKeywordRecord>}`</router-link>
- `sparseKeywords` `{Array <String>}` sparseKeywords is an optional array of string keywords, which may be a subset of allKeywords.

Instruct Zoe to try to reallocate payouts for the given `offerHandles`.  This will only succeed if the reallocation 1) conserves rights, and 2) is 'offer-safe' for all parties involved. This reallocation is partial, meaning that it applies only to
the amount associated with the offerHandles that are passed in.  We are able to ensure that with each reallocation,
rights are conserved and offer safety is enforced for all offers, even though the reallocation is partial, because once
these invariants are true, they will remain true until changes are made.

newAmountKeywordRecords is an array of `AmountKeywordRecords`, which are objects where the keys are keywords and the
values are the amounts to be paid to the offer at the same index in the `offerHandles`.

This operation throws an error:
- If any of the newAmountKeywordRecords do not have a value for all the keywords in sparseKeywords. 
- If any newAmountKeywordRecords have keywords not in sparseKeywords.
- If there are only 0 or 1 offerHandles given.

The reallocation only happens if 'offer safety' and conservation of rights are true, as enforced by Zoe.
```js
import harden from '@agoric/harden';

// reallocate by switching the amount of the firstOffer and matchingOffer
zoe.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferAmount, firstOfferAmount]),
);
```

## zcf.complete(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zoe.complete(harden([someOfferHandle]));
```

## zcf.addNewIssuer(issuer, keyword)
- `issuer` <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>
- `keyword` `{String}`
- Returns: `{Promise}`

Inform Zoe about a new issuer. Returns a promise for acknowledging when the issuer is added and ready.

```js
zoe.addNewIssuer(liquidityIssuer, 'Liquidity').then(() => {
  //do stuff
});
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.

## zcf.MakeInvitation(offerHook, inviteDesc, customProperties)
- `offerHook` `{OfferHandle => Object}`
- `inviteDesc` `{String}`
- `customProperties` `{Object}`
- Returns: <router-link to="/ertp/api/payment.html#payment">`{Invite}`</router-link>

Make a credible Zoe invite for the associated smart contract. The Invite 
is a `Payment` minted from Zoe's internal `inviteMint`. It can be used
in `E(zoe).offer` for the holder of it to participate in this contract. 

When an offer is submitted via the invitation, `offerHook` will be
invoked in the contract with a handle for the offer. The result of the 
`offerHook` will be returned as the "outcome" of making the offer via 
the invitation.

The `inviteDesc` is a string used as a description of the invite, such as
"bidderInvite" or "exerciseOption". It's mainly used to enable searching for
and finding particular invites in a contract.

The `customProperties` is an object whose properties contain information 
as defined by the smart contract, to include in the extent of the 
invitation.

```js
const invite = zoe.makeInvitation(
  myAuction.onNewOffer,
  { inviteDesc: 'bid', auctionedAssets: tickets3, minimumBid: simoleans100 }
);
```

## zcf.getInviteIssuer()
- Returns: <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>

Get the Zoe `inviteIssuer`.

```js
const inviteIssuer = await E(zoe).getInviteIssuer();
```

## zcf.getAmountMaths(keywords)
- `keywords` `{Array <String>}`
- Returns: <router-link to="/zoe/api/records.html#amountmathkeywordrecord">`{AmountMathKeywordRecord}`</router-link>

Pass in an array of keywords and get an amountMathKeywordRecord in return.

```js
const amountMathKeywordRecord = zoe.getAmountMaths(['Asset', 'Price']);
```

## zcf.isOfferActive(offerHandle)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: `{Boolean}`

Check if the offer is still active. This method does not throw if the offer is inactive.

```js
const isActive = zoe.isOfferActive(someOfferHandle);
```

## zcf.getOfferStatuses(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offerstatuses-record">`{OfferStatusesRecord}`</router-link>

Divide the `offerHandles` into 'active' and 'inactive' lists

```js
const { active: activeBidHandles } = zoe.getOfferStatuses(
  harden(allBidHandles),
);
```

## zcf.getOffers(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{Array <OfferRecord>}`</router-link>

Get a list of offer records.

```js
const offers = zoe.getOffers(listOfOfferHandles);
```

## zcf.getOffer(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{<OfferRecord>}`</router-link>

Get the offer record.

```js
const { payoutRules } = zoe.getOffer(offerHandle);
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

## zcf.getCurrentAllocation(offerHandle, sparseKeywords)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `sparseKeywords` sparseKeywords is an array of string keywords, which may be a subset of allKeywords.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{<AmountKeywordRecord>}`</router-link>

Get the amounts associated with the sparseKeywords for the offer.

```js
const { foo, bar } = zoe.getCurrentAllocation(offerHandle, ['foo', 'bar']);
```

## zcf.getCurrentAllocations(offerHandles, sparseKeywords)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `sparseKeywords` sparseKeywords is an array of string keywords, which may be a subset of allKeywords.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{[<AmountKeywordRecord>]}`</router-link>

Get a list of the amounts associated with the sparseKeywords for the offers.

## zcf.getOfferNotifier(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`<Handle>`</router-link>
- Returns: a <router-link to="/glossary/#notifier">notifier</router-link> for the offer.

```js
  const offerNotifer = zoe.getOfferNotifier(offerHandle);
  const { value, updateHandle, done } = offerNotifier.getUpdateSince();
  if (done) {
   <drop offer from list>
  }
  newValue = value;
  waitForNextUpdate(offerNotifier, updateHandle);
```
