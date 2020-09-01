# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract, 
and usually is referred to in code as `zcf`. 

The contract instance is launched by `E(zoe).startInstance`, and is given access to 
the `zcf` object during that launch. In the operations below, `instance` is 
the handle for the running contract instance.

## start

This section covers the code you need to have at the start of your contract code.

To warn if the correct return values for your contract are not being returned,
add this right before the start of your contract code. It also lets TypeScript-aware 
tools (IDEs like vsCode and WebStorm) inform the developer about required parameters 
and return values and warn when methods are misused.

```js
/**
 * @type {ContractStartFn}
 */
```
Your contract code must export a function `start` as a non-default export.
`zcf` is the Zoe Contract Facet and is the only argument provided to the contract

```js
const start = zcf => {
  ...
  // your code here
  return harden({ creatorFacet, creatorInvitation, publicFacet });
}
harden(start);
export { start };
```
The contract must return a record with any (or none) of the following:

- `creatorFacet` - an object, usually with admin authority. It is only given to the entity that 
calls `E(zoe).startInstance(...)`; i.e. the party that was the creator of the current contract instance.
It creates invitations for other parties, and takes actions that are unrelated to making offers.
- `creatorInvitation` - a Zoe invitation only given to the entity that calls `E(zoe).startInstance(...)`; i.e. 
the party that was the creator of the current contract instance.
This is usually used when a party has to make an offer first, such as escrowing the underlying good 
for sale in an auction or covered call.
- `publicFacet` - an object available through Zoe to anyone who knows the contract `instance`. Use the `publicFacet` for general queries and actions, such as getting the current price or creating public invitations.

## zcf.makeZCFMint(keyword, amountMathKind)
- `keyword` `{String}`
- `amountMathKind` `{AmountMathKind}` (defaults to `MathKind.NAT`)
- Returns: `{Promise<ZCFMint>}`

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of relying on an asynchronous ERTP `mint`. 

**Important**: `ZCFMints` do **not** have the same methods as an ERTP `mint`. Do not try to use
ERTP methods on a `ZCFMint` or vice versa.

**Important**: On the other hand, the `issuer`, `brand`, and `amountMath` associated with a `zcfMint`
do have the same methods as their ERTP-derived counterparts. Assets created by a `zcfMint` are treated
the same as ERTP `mint`-created assets by ERTP methods.

`ZCFMints` have three methods:
- `getIssuerRecord()` 
  - Returns: `{IssuerRecord}`
  - Returns an `issuerRecord` containing the `issuer`, `brand`, or `amountMath` associated with the `zcfMint`.
- `mintGains`
  - `gains`: `AmountKeywordRecord` 
  - `zcfSeat` `{ZCFSeat}` - optional
  - Returns: `{ZCFSeat}`
  - All `amounts` in `gains` must be of this `ZCFMint`'s `brand`.
    The `gains`' keywords are in that seat's namespace.
    Add the `gains` to that seat's `allocation`, then
    mint that `amount` of assets and assign it to the contract.
    If a `seat` is provided, it is returned. Otherwise a new `seat` is
    returned.
  - `zcfMint.mintGains({ Token: amount }, seat);`
- `burnlosses`
  - `losses`: `AmountKeyWordRecord` 
  - `zcfSeat` : `{ZCFSeat}`
  - Returns: void
  - All `amounts` in `losses` must be of this `ZCFMint`'s `brand`.
    The `losses`' keywords are in that `seat`'s namespace.
    Subtract `losses` from that `seat`'s `allocation`, then
    burn that `amount` of assets from the pooled `purse`.
  - `zcfMint.burnLosses({ Token: amount }, seat);`

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
validates user-received `invitations` to participate
in contract instances.

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuer, keyword)
- `issuer` `{Issuer}`
- `keyword` `{String}`
- Returns: `{Promise<IssuerRecord>}`

Informs Zoe about an `issuer` and returns a `promise` for acknowledging
when the `issuer` is added and ready. The `keyword` is the one associated
with the new `issuer`. It returns a promise for `issuerRecord` of the new `issuer`

This saves an `issuer` to Zoe.
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

Make a credible Zoe `invitation` for a smart contract. Note that `invitations` are a special case
of an ERTP `payment`. They are in a one-to-one relationship with the `invitationIssuer`, which is used
to validate invitations and their `amounts`.

The `invitation`'s 
`value` specifies:
- The specific contract `instance`.
- The Zoe `installation`.
- A unique `handle`

The second argument is a required `description` for the `invitation`, 
and should include whatever information is needed for a potential recipient of the `invitation`
to know what they are getting in the optional `customProperties` argument, which is
put in the `invitation`'s `value`.

```js
const creatorInvitation = zcf.makeInvitation(makeCallOption, 'makeCallOption')
```

## zcf.makeEmptySeatKit()
- Returns: `{ZCFSeatRecord, Promise<UserSeat>}`

Returns an empty `zcfSeatRecord` and a `promise` for a `userSeat` 

Zoe uses `seats` to represent offers, and has two `seat` facets (a particular view or API of an object; 
there may be multiple such APIs per object) a `ZCFSeat` and a `UserSeat`. 
```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
``` 
 
## zcf.getBrandForIssuer(issuer)
- `issuer` `{Issuer}`
- Returns: `{Brand}`

Returns the `brand` associated with the `issuer`.

## zcf.getIssuerForBrand(brand)
- `brand` `{Brand}`
- Returns: `{Issuer}`

Returns the `issuer` of the `brand` argument.

## zcf.getAmountMath(brand)
- `brand` `{String}`
- Returns: `{amountMath}`

Returns the `amountMath` object associated with the `brand` argument.
```js
const assetAmountMath = zcf.getAmountMath(assetAmount.brand);
```
## zcf.shutdown()

**Note**: Still in development, use at your own risk.

Shuts down the entire vat and gives payouts.

This exits all `seats` associated with the current `instance`, 
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
a user side, with access to Zoe Service, you use `E(zoe).getTerms()`. 
```js
const { brands, issuers, terms } = zcf.getTerms()
```

## zcf.getZoeService()
- Returns: <router-link to="/zoe/api/zoe.html#zoe">`{ZoeService}`</router-link>

This is the only way to get the user-facing <router-link to="/zoe/api/zoe.html#zoe">Zoe Service API</router-link> to
the contract code as well.
```js
// Making an offer to another contract instance in the contract.
const zoeService = zcf.getZoeService();
E(zoeService).offer(creatorInvitation, proposal, paymentKeywordRecord);
```

## zcf.assertUniqueKeyword(keyword)
- `keyword` `{String}`
- Returns: Undefined

Checks if a keyword is valid and not already used as a `brand` in this `instance` (i.e. unique)
and could be used as a new `brand` to make an `issuer`. Throws an appropriate error if it's not 
a valid keyword, or is not unique.
```js
zcf.assertUniqueKeyword(keyword);
```
## zcf.reallocate(seatStagings)
- `seatStagings` `{SeatStaging[]}` (at least two)
- Returns: `{void}`

The contract reallocates over `seatStagings`, which are
associations of `seats` with new `allocations` to be used in reallocation.
There must be at least two `seatStagings` in the array argument. 

The reallocation only succeeds if it:
1. Conserves rights (the specified `amounts` have the same total value as the
  current total amount)
2. Is 'offer-safe' for all parties
  involved. Offer safety is checked at the staging step.

The reallocation is partial, only applying to `seats` associated
with the `seatStagings`. By induction, if rights conservation and 
offer safety hold before, they hold after a safe reallocation. 

This is true even though we only re-validate for `seats` whose 
`allocations` change. A reallocation can only effect offer safety for 
those `seats`, and since rights are conserved for the change, overall 
rights are unchanged.

`reallocate()` throws these errors:
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
