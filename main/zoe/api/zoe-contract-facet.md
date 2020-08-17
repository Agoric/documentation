# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, and usually is referred to in code as `zcf`. The contract instance is launched by `E(zoe).startInstance`, and is given access to the `zcf` object during that launch. In the operation below, the `instanceHandle` is the handle for the running contract instance.

## zcf.reallocate(seatStagings)
- `seatStagings` 
- Returns: `{void}`

The contract reallocates over `seatStagings`, which are
associations of seats with reallocations. **tyg todo: should it be
"reallocates payouts" or similar?**

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

**tyg todo: Check to see if it throws any errors**
**tyg todo: Rewrite sample code**
```js
// reallocate by switching the amount of the firstOffer and matchingOffer
zcf.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferAmount, firstOfferAmount]),
);
```

## zcf.addNewIssuer(issuer, keyword)
- `issuerP` <router-link to="/ertp/api/issuer.html">`{ERef<Issuer>}`</router-link>
- `keyword` `{String}`
- Returns: `{Promise<IssuerRecord>}`

Inform Zoe about an `issuer`. Returns a promise for acknowledging when the `issuer` is added and ready. **tyg todo: What is the keyword argument for?
The issuer's brand name? A petname?**

```js
zcf.addNewIssuer(liquidityIssuer, 'Liquidity').then(() => {
  //do stuff
});
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.
**tyg todo: Need sample and use cases. Why do you use this instead of E(zoe.whatever)?**

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

## zcf.getBrandForIssuer(issuer)
- `issuer` `{Issuer}`
- Returns `{Brand}`

Returns the `brand` of the `issuer` argument
**tyg todo: Get sample code, use cases**

## zcf.getAmountMath(brand)
- `brand` `{String}`
- Returns `{amountMath}`

Returns the `amountMath` object associated with the `brand` argument.

```js
const ticketIssuer = publicAPI.getTicketIssuer();
const ticketAmountMath = ticketIssuer.getAmountMath();
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

## zcf.getIssuerForBrand(brand)
- `brand` `{Brand}`
- Returns `{Issuer}`

Returns the `issuer` of the `brand` argument

  
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
