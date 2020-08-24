# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, 
and usually is referred to in code as `zcf`. 

The contract instance is launched by `E(zoe).startInstance`, and is given access to 
the `zcf` object during that launch. In the operations below, `instance` is 
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

I wrote these pointers for an internal audience. I'm not sure they work for external audience. do we want the external audience looking at the types file? I don't think so. We can point them to the API doc instead.

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
lifetime. This method returns the Zoe `InvitationIssuer`, which
is used to validate `invitations` that users receive to participate
in contract instances.

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuer, keyword)
- `issuerP` `{Promise<Issuer>|Issuer}``
- `keyword` `{String}`
Returns: `{Promise<IssuerRecord>}`

Informs Zoe about an `issuer` and returns a `promise` for acknowledging
when the `issuer` is added and ready. The `keyword` is the one associated
with the new `issuer`. It returns a promise for `issuerRecord` of the new `issuer`

This saves an `issuer` to Zoe such that Zoe has a local `amountMath` for the `issuer`
It also has saved the `issuer` information such that Zoe can handle offers involving 
this `issuer` and ZCF can provide the `issuerRecord` (`amountMath`, `brand`, `issuer`) 
synchronously on request.

```js
await zcf.saveIssuer(secondaryIssuer, keyword);
``` 
## zcf.makeInvitation(offerHandler, description, customProperties)
- `offerHandler` `{OfferHandle => Object}`
- `description` `{String}`
- `customProperties` `{Object}`
- Returns: <router-link to="/ertp/api/payment.html#payment">`{Promise<Invitation>}`</router-link>

Make a credible Zoe `invitation` for a smart contract. The invitation's 
`value` specifies:
- The specific contract `instance`.
- The Zoe `installation`.
- A unique `handle`

The second argument is a required `description` for the `invitation`, 
and should include whatever information is needed for a potential recipient of the `invitation`
to know what they are getting in the optional `customProperties` argument, which is
put in the `invitation`'s `value`.

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

Returns the `brand` associated with the `issuer`.

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

**Note**: Still in development, use at your own risk.

Shuts down the entire vat and gives payouts.

This exits all `seats` associated with the contract `instance`, 
giving them their payouts.

Call when:
- You want nothing more to happen in the contract, and 
- You don't want to take any more offers


```js
zcf.shutdown();
```
## zcf.getTerms()
- Returns: `{Object}`

Returns the `issuers`, `brands`, and custom `terms` the current contract instance was instantiated with.

Note that there is also an `E(zoe).getTerms(instance)`. Often the choice of which to use is not which method 
to use, but which of Zoe Service or ZCF you have access to. On the contract side, you more easily have access 
to `zcf`, and `zcf` already knows what instance is running. So in contract code, you use `zcf.getTerms()`. From 
a user side, with access to Zoe Service, you use `E(zoe).getTerms()`. In other words, are you in contract code or not?
```js
const { brands, issuers, terms } = zcf.getTerms()
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

Expose the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to the contracts as well.
**tyg todo: Need sample and use cases. Why do you use this instead of E(zoe.whatever)?**


## zcf.assertUniqueKeyword(keyword)
- `keyword` `{String}`
Returns: Undefined

Checks if a keyword is valid and not already used as a `brand` in this `instance` (i.e. unique)
and could be used as a new `brand` to make an `issuer`.
```js
zcf.assertUniqueKeyword(keyword);
```
## zcf.reallocate(seatStagings)
- `seatStagings` `{SeatStaging[]}` (at least two)
- Returns: `{void}`

The contract reallocates over `seatStagings`, which are
associations of seats with new allocations to be used in reallocation.
There must be at least two `seatStagings` in the array argument. 

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

Reallocate throws these errors:
- `reallocating must be done over two or more seats`
- `The seatStaging was not recognized`
- `The seatStaging was not recognized`
- `keyword must be unique`
- If the total `amount` per `brand` is not equal to the total `amount` per `brand`
  in the proposed reallocation. (no message)
```js
zcf.reallocate(
    seat.stage(seatAAllocation),
    seat.stage(seatBAllocation),
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

`zcfSeats` are created when an offer is made, and are passed to the `offerHandler` specified when the `invitation`
is made, as the sole argument.

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

