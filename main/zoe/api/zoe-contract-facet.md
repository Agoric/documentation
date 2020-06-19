# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance. It accesses the instance's Zoe state. From within the contract, you synchronously access a Zoe Contract Facet (usually is referred to in code as `zcf`). The contract instance is launched and given access to the zcf object by `E(zoe).makeInstance`. In the operation below, the `instanceHandle` is the handle for the running contract instance.
**tyg todo: There is no other instance of `instanceHandle` in this doc. Delete or rework?**

## zcf.reallocate(offerHandles, newAmountKeywordRecords)

- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `newAmountKeywordRecords` <router-link to="/zoe/api/records.html#amountkeywordrecord">`{Array <AmountKeywordRecord>}`</router-link>

Instructs Zoe to try to reallocate payouts for the given `offerHandles`. This only succeeds if the reallocation:
- Conserves rights.
- Is 'offer-safe' for all involved parties.
This reallocation is partial, so it only applies to the amounts associated with passed in `offerHandles`. We ensure that with each reallocation, rights are conserved and offer safety enforced for all offers. This is true even for partial reallocations. Once these invariants are true, they stay true until changes happen.

`newAmountKeywordRecords` is an array of `AmountKeywordRecords`, objects where the keys are
keywords and the values are the amounts to be paid to the offer at the same index in the `offerHandles`.

This operation throws an error if there are only 0 or 1 `offerHandles` given.

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

Pass in an array of keywords and get an `amountMathKeywordRecord` in return.

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

## zcf.getCurrentAllocation(offerHandle, brandKeywordRecord)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `brandKeywordRecord` <router-link to="/zoe/api/records.html#brand-keyword-record">
`{[<BrandKeywordRecord>]}`</router-link> is an optional record mapping keywords to brands for each of the offers.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">
`{<AmountKeywordRecord>}`</router-link>

For the keywords specified by `brandKeywordRecord, get the amounts currently allocated to the offer. If
`brandKeywordRecord` is not specified, amounts are returned for only the Keywords that currently have
allocated amounts (including empty amounts.) This might mean amounts that will be included in the
payout could be omitted if not specified.

If `brandKeywordRecord` is specified, for keywords without amounts assigned to the offer, empty amounts are filled in 

```js
const { foo, bar } = zoe.getCurrentAllocation(offerHandle, ['foo', 'bar']);
```

## zcf.getCurrentAllocations(offerHandles, brandKeywordRecords)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `brandKeywordRecords` <router-link to="/zoe/api/records.html#brand-keyword-record">
`{[ Array <BrandKeywordRecords>]}`</router-link> `brandKeywordRecords` is an optional array of records
mapping keywords to brands for each offer.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{[<AmountKeywordRecord>]}`</router-link>

For each `brandKeywordRecord specified keyword, from each offer get its currently allocated amount. If
`brandKeywordRecord``` is not specified, amounts are returned only for the Keywords that currently have
allocated amounts (including empty amounts.) Amounts included in the payout might be omitted if not specified.

If `brandKeywordRecord` is specified, and some keywords' amounts haven't been assigned to the offer, empty amounts are filled in.

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
