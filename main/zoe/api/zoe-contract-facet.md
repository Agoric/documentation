# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, 
and usually is referred to in code as `zcf`. 

The contract instance is launched by `E(zoe).startInstance`, and is given access to 
the `zcf` object during that launch. In the operations below, the `instanceHandle` is 
the handle for the running contract instance.

----------------------
From Types.js starting at 190
@property {Reallocate} reallocate - reallocate amounts among seats
 * @property {(keyword: Keyword) => void} assertUniqueKeyword - check
 * whether a keyword is valid and unique and could be added in `saveIssuer`
 * @property {SaveIssuer} saveIssuer - save an issuer to ZCF and Zoe
 * and get the amountMath and brand synchronously accessible after saving
 * @property {MakeInvitation} makeInvitation
 * @property {Shutdown} shutdown
 * @property {() => ZoeService} getZoeService
 * @property {() => Issuer} getInvitationIssuer
 * @property {() => Terms } getTerms
 * @property {(issuer: Issuer) => Brand} getBrandForIssuer
 * @property {(brand: Brand) => Issuer} getIssuerForBrand
 * @property {GetAmountMath} getAmountMath
 * @property {MakeZCFMint} makeZCFMint
 * @property {() => ZcfSeatKit} makeEmptySeatKit
---------------------------
In Progress:
@property {Reallocate} reallocate - reallocate amounts among seats
 * @property {SaveIssuer} saveIssuer - save an issuer to ZCF and Zoe
 * and get the amountMath and brand synchronously accessible after saving
 * @property {MakeInvitation} makeInvitation
 * @property {() => Issuer} getInvitationIssuer
 * @property {MakeZCFMint} makeZCFMint
 * @property {() => ZcfSeatKit} makeEmptySeatKit
 ------------------------------------
## zcf.getBrandForIssuer(issuer)
- `issuer` `{Issuer}`
- Returns `{Brand}`

Returns the `brand` of the `issuer` argument.

## zcf.getIssuerForBrand(brand)
- `brand` `{Brand}`
- Returns `{Issuer}`

Returns the `issuer` of the `brand` argument

## zcf.getAmountMath(brand)
- `brand` `{String}`
- Returns `{amountMath}`

Returns the `amountMath` object associated with the `brand` argument.
**tyg todo: Need to fix source code**
```js
const ticketIssuer = publicAPI.getTicketIssuer();
const ticketAmountMath = ticketIssuer.getAmountMath();
```
## zcf.shutdown()

Shuts down the entire vat and gives payouts.
**tyg todo: Need more info; what does shutting the vat usually do?
Shut down a contract instance? What does "gives payouts" mean, particularly
in active trades? When should you use this/not use this?
```js
zcf.shutdown();
```
## zcf.getTerms()
- Returns: `{Object}`

Returns the terms given when this contract instance was instantiated. 
**tyg todo: there's also E(zoe).getTerms(instance). Any difference, when would you use one and when the other,
and should we kill one of them?**
```js
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.
**tyg todo: Need sample and use cases. Why do you use this instead of E(zoe.whatever)?**


GYT


## zcf.assertUniqueKeyword(keyword)
- `keyword` `{String}`
Returns: `true` if the keyword is not already used as a brand, otherwise `false`

Checks if a keyword is valid and not already used as a `brand` in this `instance` (i.e. unique)
and could be used as a new `brand` to make an `issuer`
```js
zcf.assertUniqueKeyword(keyword);
```


## zcf.reallocate(seatStagings)
- `seatStagings` `{SeatStaging[]}` (at least two)
- Returns: `{void}`

The contract reallocates over `seatStagings`, which are
associations of seats with reallocations. **tyg todo: should it be
"reallocates payouts" or similar?** There must be at least two
`seatStagings` in the array argument. 

The reallocation only succeeds if it:
1 Conserves rights (the amounts specified have the same total value as the
  current total amount)
2 Is 'offer-safe' for all parties
  involved. Offer safety is checked at the staging step.

The reallocation is partial, only applying to seats associated
with the `seatStagings`. By induction, if rights conservation and 
offer safety hold before, they hold after a safe reallocation. 

This is true even though we only re-validate for seats whose 
allocations change. A reallocation can only effect offer safety for 
those seats, and since rights are conserved for the change, overall 
rights are unchanged.

**tyg todo: Check to see if it throws any errors. Doesn't seem to, but does have some assert fail messages.**
**tyg todo: Rewrite sample code**
```js
zcf.reallocate(
    offerA.seat.stage(offerAAllocation),
    offerB.seat.stage(offerBAllocation),
  );
```

## zcf.saveIssuer(issuerP, keyword)
- `issuerP` `{promise of an Issuer}`
- `keyword` `{String}`
Returns **tyg todo not sure?**

Save an `issuer` to ZCF and Zoe and get the `amountMath` and `brand` 
synchronously accessible after saving. **tyg todo: Not really clear on what this is doing. Creating a new
issuer with brand keyword? what is the keyword for?**
```js
await zcf.saveIssuer(secondaryIssuer, keyword);
```
gyt
## zcf.makeInvitation(offerHandler, invitationDesc, customProperties)
- `offerHandler` `{OfferHandle => Object}`
- `invitationDesc` `{String}`
- `customProperties` `{Object}`
- Returns: <router-link to="/ertp/api/payment.html#payment">`{Promise<Invitation>}`</router-link>

**tyg todo: In the types.js, says "the extent of the invitation" several
times. Shouldn't that be "the value..."?**

Make a credible Zoe `invitation` for a smart contract. The invitation's 
`value` specifies:
- The specific contract `instance`.
- The Zoe `installation`.
- A unique `handle`

The second argument is a required `description` for the `invitation`, 
and should include whatever information is needed for a potential buyer **tyg todo: Should this be "recipient"  instead of "buyer"?** of the invitation
to know what they are getting in the `customProperties` argument, which is
put in the invitation's `value`.
**tyg todo: Rewrite sample code
```js
const invite = zcf.makeInvitation(
  myAuction.onNewOffer,
  { inviteDesc: 'bid', auctionedAssets: tickets3, minimumBid: simoleans100 }
);
```
## zcf.assertUniqueKeyword(keyword)
- `keyword` `{String}`
Returns: `true` if the keyword is not already used as a brand, otherwise `false`

Checks if a keyword is valid and not already used as a `brand` in this `instance` (i.e. unique)
and could be used as a new `brand` to make an `issuer`
```js
zcf.assertUniqueKeyword(keyword);
```




## zcf.addNewIssuer(issuerP, keyword)
- `issuerP` <router-link to="/ertp/api/issuer.html">`{ERef<Issuer>}`</router-link>
- `keyword` `{String}`
- Returns: `{Promise<IssuerRecord>}`

**tyg todo: This doesn't seem to actually be used at all. And it's not
defined in contractFacet.js? Delete?**

Inform Zoe about an `issuer`. Returns a promise for acknowledging when the `issuer` is added and ready. **tyg todo: What is the keyword argument for?
The issuer's brand name? A petname?**

```js
zcf.addNewIssuer(liquidityIssuer, 'Liquidity')
});
```



## zcf.getInvitationIssuer()
- Returns: <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>
Zoe has a single `invitationIssuer` for the entirety of its
lifetime. By having a reference to Zoe, a user can get the
`invitationIssuer` and thus validate any `invitation` they receive
from someone else. The `mint `associated with the `invitationIssuer`
creates the ERTP `payments` (`invitations`) that represent the right to 
interact with a smart contract in particular ways.
**tyg todo: May want to clafiry the "have a reference to Zoe" bit, since
it looks like being able to call zcf methods is sufficient to indicate
that**
```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

**tyg todo: Redo as Allocations are properties of Seats, specificall
ZCFSeat and UserSeat**
## zcf.getCurrentAllocation(offerHandle, brandKeywordRecord)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `brandKeywordRecord` An optional parameter. If omitted, only returns amounts for brands for which an allocation currently exists.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{<AmountKeywordRecord>}`</router-link>

Get the amounts associated with the `brand`s for the offer. If the optional `brandKeywordRecord`
argument is omitted, it only returns amounts for brands for which an allocation currently exists.

```js
const { foo, bar } = zcf.getCurrentAllocation(offerHandle, ['foo', 'bar']);
```
## zcf.initPublicAPI(publicAPI)
- `publicAPI` <Object>
- Returns `{void}`

Initialize the publicAPI for the contract instance, as stored by Zoe in
the `instanceRecord`. The `publicAPI` argument is an object whose methods are the API available to anyone who knows the `instanceHandle`

**tyg todo: Below here are Zoe 0.7 zcf API requests no longer in zcf. 
Confirm they're gone **
# Removed API Requests

## zcf.complete(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zcf.complete(harden([someOfferHandle]));
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
