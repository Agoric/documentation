# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, and usually is referred to in code as `zcf`. The contract instance is launched by `E(zoe).makeInstance`, and is given access to the `zcf` object during that launch. In the operation below, the `instanceHandle` is the handle for the running contract instance.

## zcf.reallocate(offerHandles, newAmountKeywordRecords, sparseKeywords)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `newAmountKeywordRecords` <router-link to="/zoe/api/records.html#amountkeywordrecord">`{Array <AmountKeywordRecord>}`</router-link>

Instruct Zoe to try to reallocate payouts for the given `offerHandles`.  This will only succeed if the reallocation 1) conserves rights, and 2) is 'offer-safe' for all parties involved. This reallocation is partial, meaning that it applies only to
the amount associated with the offerHandles that are passed in.  We are able to ensure that with each reallocation,
rights are conserved and offer safety is enforced for all offers, even though the reallocation is partial, because once
these invariants are true, they will remain true until changes are made.

newAmountKeywordRecords is an array of `AmountKeywordRecords`, which are objects where the keys are keywords and the
values are the amounts to be paid to the offer at the same index in the `offerHandles`. Note that the offer keywords
can be different for different offers with no effect on a reallocation. 

This operation throws an error:
- If there are only 0 or 1 offerHandles given.

The reallocation only happens if 'offer safety' and conservation of rights are true, as enforced by Zoe.
```js
import harden from '@agoric/harden';

// reallocate by switching the amount of the firstOffer and matchingOffer
zcf.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferAmount, firstOfferAmount]),
);
```

## zcf.complete(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zcf.complete(harden([someOfferHandle]));
```

## zcf.addNewIssuer(issuer, keyword)
- `issuer` <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>
- `keyword` `{String}`
- Returns: `{Promise}`

Inform Zoe about a new issuer. Returns a promise for acknowledging when the issuer is added and ready.

```js
zcf.addNewIssuer(liquidityIssuer, 'Liquidity').then(() => {
  //do stuff
});
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.

## zcf.makeInvitation(offerHook, inviteDesc, customProperties)
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
as defined by the smart contract, to include in the value of the 
invitation.

```js
const invite = zcf.makeInvitation(
  myAuction.onNewOffer,
  { inviteDesc: 'bid', auctionedAssets: tickets3, minimumBid: simoleans100 }
);
```

## zcf.getInviteIssuer()
- Returns: <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>

Get the Zoe `inviteIssuer`.

```js
const inviteIssuer = await zcf.getInviteIssuer();
```

## zcf.getBrandForIssuer(issuer)
- `issuer` `{Issuer}`
- Returns `{Brand}`

Returns the `brand` of the `issuer` argument

## zcf.getIssuerForBrand(brand)
- `brand` `{Brand}`
- Returns `{Issuer}`

Returns the `issuer` of the `brand` argument

## zcf.getAmountMath(brand)
- `brand` `{String}`
- Returns `{amountMath}`

Returns the `amountMath` object associated with the `brand` argument.

```js
const ticketIssuer = publicAPI.getTicketIssuer();
const ticketAmountMath = ticketIssuer.getAmountMath();
```
  
## zcf.isOfferActive(offerHandle)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: `{Boolean}`

Check if the offer is still active. This method does not throw if the offer is inactive.

```js
const isActive = zcf.isOfferActive(someOfferHandle);
```

## zcf.getOfferStatuses(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offerstatuses-record">`{OfferStatusesRecord}`</router-link>

Divide the `offerHandles` into 'active' and 'inactive' lists

```js
const { active: activeBidHandles } = zcf.getOfferStatuses(
  harden(allBidHandles),
);
```

## zcf.getOffers(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{Array <OfferRecord>}`</router-link>

Get a list of offer records.

```js
const offers = zcf.getOffers(listOfOfferHandles);
```

## zcf.getOffer(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{<OfferRecord>}`</router-link>

Get the offer record.

```js
const { payoutRules } = zcf.getOffer(offerHandle);
```

## zcf.getInstanceRecord()
- Returns: <router-link
  to="/zoe/api/records.html#instance-record-properties">`{InstanceRecord}`</router-link>


Get the instance record. This allows the contracts to get access
to their keywords, issuers and other "instanceRecord" information from
Zoe.

```js
const { issuerKeywordRecord, keywords, terms } = zcf.getInstanceRecord()
```

## zcf.getCurrentAllocation(offerHandle, brandKeywordRecord)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `brandKeywordRecord` An optional parameter. If omitted, only returns amounts for brands for which an allocation currently exists.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{<AmountKeywordRecord>}`</router-link>

Get the amounts associated with the `brand`s for the offer. If the optional `brandKeywordRecord`
argument is omitted, it only returns amounts for brands for which an allocation currently exists.

```js
const { foo, bar } = zcf.getCurrentAllocation(offerHandle, ['foo', 'bar']);
```

## zcf.getCurrentAllocations(offerHandles, brandKeywordRecord)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `brandKeywordRecord` An optional parameter. If omitted, only returns amounts for brands for which an allocation currently exists
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{[<AmountKeywordRecord>]}`</router-link>

Get a list of the amounts associated with the `brand` for the offers. If the optional `brandKeywordRecord`
argument is omitted, it only returns amounts for brands for which an allocation currently exists.

## zcf.getOfferNotifier(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`<Handle>`</router-link>
- Returns: a <router-link to="/glossary/#notifier">notifier</router-link> for the offer.

```js
  const offerNotifer = zcf.getOfferNotifier(offerHandle);
  const { value, updateHandle, done } = offerNotifier.getUpdateSince();
  if (done) {
   <drop offer from list>
  }
  newValue = value;
  waitForNextUpdate(offerNotifier, updateHandle);
```
  
## zcf.initPublicAPI(publicAPI)
- `publicAPI` <Object>
- Returns `{void}`

Initialize the publicAPI for the contract instance, as stored by Zoe in
the instanceRecord. The `publicAPI` argument is an object whose methods are the API
available to anyone who knows the `instanceHandle`
