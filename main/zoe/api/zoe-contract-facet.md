# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, 
and usually is referred to in code as `zcf`. 

The contract instance is launched by `E(zoe).startInstance`, and is given access to 
the `zcf` object during that launch. In the operations below, the `instanceHandle` is 
the handle for the running contract instance.

## zcf.makeZCFMint(keyword, amountMathKind)
- `keyword` `{String}`
- `amountMathKind` `{AmountMathKind}` (defaults to `NAT`)
Returns: `{Promise<ZCFMint>}`

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of importing and using ERTP-based `mints`.

For more information on how to use these specialized mints, please see the type
definitions [here](https://github.com/Agoric/agoric-sdk/blob/7058a852c46625e28aa9a290b2c99f2a39d0cba5/packages/zoe/src/types.js#L221)
and example [here](https://github.com/Agoric/agoric-sdk/blob/ee8f782578ff4f2ea9e0ec557e14d1f52c795ca9/packages/zoe/src/contracts/mintPayments.js#L34). 
The `issuers` associated with the synchronous 
mints are already saved in Zoe, so no need to run `saveIssuer()` 
for synchronous mints. 

**tyg todo: Does a ZCFMint have the same methods as an ERTP mint?**

**Note**: The call to make the `ZCFMint` is asynchronous, but 
calls to the resulting `ZCFMint` are synchronous.
```js
const mySynchronousMint = await zcf.makeZCFMint('MySyncMint', 'set');
const { amountMath, brand, issuer } = mySynchronousMint.getIssuerRecord();
mySynchronousMint.mintGains({ MyKeyword: amount }, seat);
```

## zcf.getInvitationIssuer()
- Returns: <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>
Zoe has a single `invitationIssuer` for the entirety of its
lifetime. By having a reference to Zoe, a user can get the
`invitationIssuer` and thus validate any `invitation` they receive
from someone else. The `mint `associated with the `invitationIssuer`
creates the ERTP `payments` (`invitations`) that represent the right to 
interact with a smart contract in particular ways.
**tyg todo: May want to clarify the "have a reference to Zoe" bit, since
it looks like being able to call zcf methods is sufficient to indicate
that**  **tyg todo: We seem to have both zoe. and zcf. invitationIssuers.
When should each be used?**
```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuerP, keyword)
- `issuerP` `{Promise<Issuer>|Issuer}``
- `keyword` `{String}`
Returns: `{Promise<IssuerRecord>}`

Informs Zoe about an `issuer` and returns a `promise` for acknowledging
when the `issuer` is added and ready. The `keyword` is the one associated
with the new `issuer`. It returns a promise for `issuerRecord` of the new `issuer`

**tyg todo: How/when is this used?**
```js
await zcf.saveIssuer(secondaryIssuer, keyword);
``` 
## zcf.makeInvitation(offerHandler, invitationDesc, customProperties)
- `offerHandler` `{OfferHandle => Object}`
- `invitationDesc` `{String}`
- `customProperties` `{Object}`
- Returns: <router-link to="/ertp/api/payment.html#payment">`{Promise<Invitation>}`</router-link>

**tyg todo: In the types.js, says "the extent of the invitation" several
times. Shouldn't that be "the value..."? Changed to that below.**

Make a credible Zoe `invitation` for a smart contract. The invitation's 
`value` specifies:
- The specific contract `instance`.
- The Zoe `installation`.
- A unique `handle`

The second argument is a required `description` for the `invitation`, 
and should include whatever information is needed for a potential buyer **tyg todo: Should this be "recipient"  instead of "buyer"?** of the invitation
to know what they are getting in the **tyg todo: Is this optional?**`customProperties` argument, which is
put in the invitation's `value`.

**tyg todo: Pretty sure I don't understand this well enough, and need an infodump from someone**
```js
const creatorInvitation = zcf.makeInvitation(
    assertProposalShape(makeCallOption, makeCallOptionExpected),
    'makeCallOption',
  );
```

## zcf.makeEmptySeatKit()
- Returns: `{ZcfSeat}`

Returns an empty `zcfSeat`. See `zcfSeat` in the ZCF Objects section for details.

Seats are used to represent offers, and have two facets (a particular view or API of an object; 
there may be multiple such APIs per object) a `ZCFSeat` and a `UserSeat`. A `ZCFSeat` is passed
to `offerHandlers`
```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```
The `zcfSeat` is what is passed to the `offerHandlers`, like this one:
```js
const mintPayment = mySeat => {
  const amount = amountMath.make(1000);
  // Synchronously mint and allocate amount to seat.
  zcfMint.mintGains({ Token: amount }, mySeat);
  // Exit the seat so that the user gets a payout.
  mySeat.exit();
  // Since the user is getting the payout through Zoe, we can
  // return anything here. Let's return some helpful instructions.
  return 'Offer completed. You should receive a payment from Zoe';
};
```
See the Objects section for more about `ZCFSeat`. 
 
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
```js
const assetMath = zcf.getAmountMath(assetAmount.brand);
```
## zcf.shutdown()

Shuts down the entire vat and gives payouts.
**tyg todo: Need more info; what does shutting the vat usually do?
Shut down a contract instance? What does "gives payouts" mean, particularly
in active trades? When should you use this/not use this?**
```js
zcf.shutdown();
```
## zcf.getTerms()
- Returns: `{Object}`

Gets the `issuers`, `brands`, and custom `terms` the current contract instance was instantiated with.
Note in the example below, `brands` and `issuers` are records with keyword keys, formerly 
called `brandKeywordRecord` and `issuerKeywordRecord`, respectively.

**tyg todo: there's also E(zoe).getTerms(instance). Any difference, when would you use one and when the other,
and should we kill one of them?**
```js
const { brands, issuers, terms } = zcf.getTerms()
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.
**tyg todo: Need sample and use cases. Why do you use this instead of E(zoe.whatever)?**


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
# ZCF Objects

**tyg todo: May move to separate page. Here for the time being**

## zcfSeat
A `zcfSeat` has these properties and methods:
- `exit()`
  - Returns: `void`
- `kickOut(msg?: string)`
  - Returns: `void` 
- `getNotifier()` 
  - Returns: `{Notifier<Allocation>}`  **tyg todo Is this right?** 
- `hasExited()`
  - Returns: `boolean`
- `getProposal()`
  - Returns: `ProposalRecord` 
- `getAmountAllocated(keyword, brand)`
  - `keyword` `Keyword`
  - `brand` `Brand`
  - Returns: `Amount`
  - The `brand` fills in an empty `amount` if the `keyword` is not present in the `allocation`
- `getCurrentAllocation()`
  - Returns: `Allocation`
- `isOfferSafe(newAllocation)`
  - `newAllocation` `Allocation`
  - Returns `Boolean` 
- `stage(newAllocation)`
  - `newAllocation` `Allocation`
  - Returns: `SeatStaging` 

`zcfSeats` are created as empty seats; you need to fill in the property values. **tyg todo: Is this correct?**
**tyg todo: Why and when do you want to use a zcfSeat?**

## ZCFMint
A `ZCFMint` has these properties and methods:
- `getIssuerRecord()`
  - Returns: `IssuerRecord` 
- `mintGains(gains, zcfSeat)`
  - `gains` `AmountKeywordRecord`
  - `zcfSeat?` `ZCFSeat`  **tyg todo: Not sure about this; was "zcfSeat?: ZCFSeat"?**
  - Returns: `ZCFSeat`             
  - All `amounts` in `gains` must be of this `ZCFMint`'s `brand`.
    The `gains`' keywords are in the namespace of that seat.
    Add the `gains` to that `seat`'s `allocation`.
    The resulting state must be offer safe. (Currently, increasing assets can
    never violate offer safety.)
    Mint that amount of assets into the pooled `purse`.
    If a `seat` is provided, it is returned. Otherwise a new `seat` is
    returned. 
- `burnLosses(losses. zcfSeat)`
  - `losses` `AmountKeywordRecord`
  - `zcfSeat` `ZCFSeat` 
  - Returns: `void`
  - All the `amounts` in `losses` must be of this `ZCFMint`'s `brand`.
    The `losses`' keywords are in the namespace of that `seat`.
    Subtract `losses` from that `seat`'s `allocation`.
    The resulting state must be offer safe.
    Burn that `amount` of assets from the pooled `purse`.

# Deprecated ZCF Methods

From here to the are method descriptions from 0.7 that I think have
been deprecated in Alpha. Please let me know if any should stay in.


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
