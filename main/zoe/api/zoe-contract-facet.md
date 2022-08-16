# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract,
and usually is referred to in code as `zcf`.

The contract instance is launched by `E(zoe).startInstance()`, and is given access to
the `zcf` object during that launch (see [Contract Requirements](/zoe/guide/contract-requirements.md)).
In the operations below, `instance` is the handle for the running contract instance.

## `zcf.makeZCFMint(keyword, assetKind, displayInfo)`
- `keyword` `{String}`
- `assetKind` `{AssetKind}` (defaults to `AssetKind.NAT`)
- `displayInfo` `{DisplayInfo}` (optional)
- Returns: `{Promise<ZCFMint>}`

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of relying on an asynchronous ERTP `mint`. The optional `displayInfo` parameter takes values
like `{ decimalPlaces: 16 }` that tell the UI how to display values associated with the created mint's 
brand. It defaults to undefined.

**Important**: `ZCFMints` do **not** have the same methods as an ERTP `mint`. Do not try to use
ERTP methods on a `ZCFMint` or vice versa.

**Important**: On the other hand, the `issuer` and `brand` associated with a `zcfMint`
do have the same methods as their ERTP-derived counterparts. Assets created by a `zcfMint` are treated
the same as ERTP `mint`-created assets by ERTP methods.

The following demonstrates `zcf.makeZCFMint`:

**Note**: The call to make the `ZCFMint` is asynchronous, but
calls to the resulting `ZCFMint` are synchronous.
```js
const mySynchronousMint = await zcf.makeZCFMint('MyToken', AssetKind.SET);
const { brand, issuer } = mySynchronousMint.getIssuerRecord();
mySynchronousMint.mintGains({ MyKeyword: amount }, seat);
```
`ZCFMints` have three methods, two of which use an `AmountKeywordRecord`
- `getIssuerRecord()`
- `mintGains(gains, zcfSeat)`
- `burnLosses(losses, zcfSeat)`

### `AmountKeywordRecord`

`AmountKeywordRecord` is a record in which the keys are keywords, and
the values are `amounts`. Keywords are unique identifiers per contract,
that tie together the `proposal`, `payments` to be escrowed, and `payouts`
to the user. In the below example, `Asset` and `Price` are keywords.

Users should submit their `payments` using keywords:
```js
const payments = { Asset: quatloosPayment };
```

And, users will receive their `payouts` with keywords as the keys of a `payout`:
```js
quatloosPurse.deposit(payout.Asset);
```

For example:
```js
const quatloos5 = AmountMath.make(quatloosBrand, 5n);
const quatloos9 = AmountMath.make(quatloosBrand, 9n);
const myAmountKeywordRecord =
{
  Asset: quatloos5,
  Price: quatloos9
}
```

### `ZCFMint.getIssuerRecord()`
  - Returns: `{IssuerRecord}`
  - Returns an `issuerRecord` containing the `issuer` and `brand` associated with the `zcfMint`.
### `ZCFMint.mintGains(gains, zcfSeat)`
  - `gains`: `AmountKeywordRecord`
  - `zcfSeat`: `{ZCFSeat}` - optional
  - Returns: `{ZCFSeat}`
  - All `amounts` in `gains` must be of this `ZCFMint`'s `brand`.
    The `gains`' keywords are in that `seat`'s namespace.
    Mint the `gains` `amount` of assets and add them to
    that `seat`'s `allocation`. If a `seat` is provided,
    it is returned. Otherwise a new `seat` is returned.
  - `zcfMint.mintGains({ Token: amount }, seat);`
### `ZCFMint.burnLosses(losses, zcfSeat)`
  - `losses`: `AmountKeywordRecord`
  - `zcfSeat` : `{ZCFSeat}`
  - Returns: void
  - All `amounts` in `losses` must be of this `ZCFMint`'s `brand`.
    The `losses`' keywords are in that `seat`'s namespace.
    Subtract `losses` from that `seat`'s `allocation`, then
    burn that `amount` of assets from the pooled `purse`.
  - `zcfMint.burnLosses({ Token: amount }, seat);`getIssuerRecord()`

## `zcf.getInvitationIssuer()`
- Returns: [`{Issuer}`](/ertp/api/issuer.md)

Zoe has a single `invitationIssuer` for the entirety of its
lifetime. This method returns the Zoe `InvitationIssuer`, which
validates user-received `invitations` to participate
in contract instances. 

"All `invitations` come from this single `invitation` `issuer` and its `mint`, which 
mint `invitations` and validate their `amounts`."

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## `zcf.saveIssuer(issuer, keyword)`
- `issuer` `{Issuer}`
- `keyword` `{String}`
- Returns: `{Promise<IssuerRecord>}`

Informs Zoe about an `issuer` and returns a promise for acknowledging
when the `issuer` is added and ready. The `keyword` is the one associated
with the new `issuer`. It returns a promise for `issuerRecord` of the new `issuer`

This saves an `issuer` in Zoe's records for this contract `instance`.
It also has saved the `issuer` information such that Zoe can handle offers involving
this `issuer` and ZCF can provide the `issuerRecord` synchronously on request.

An `IssuerRecord` has two fields, each of which holds the namesake object
associated with the `issuer` value of the record:
`issuerRecord.brand` and `issuerRecord.issuer`.

```js
await zcf.saveIssuer(secondaryIssuer, keyword);
```
## `zcf.makeInvitation(offerHandler, description, customProperties)`
- `offerHandler` `{ZCFSeat => Object}`
- `description` `{String}`
- `customProperties` `{Object}`
- Returns: [`{Promise<Invitation>}`](/ertp/api/payment.md#payment)

Make a credible Zoe `invitation` for a smart contract. Note that `invitations` are a special case
of an ERTP `payment`. They are associated with the `invitationIssuer` and its `mint`, which 
validate and mint `invitations`. `zcf.makeInvitation()` serves as an interface to
the `invitation` `mint`.

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

## `zcf.makeEmptySeatKit()`
- Returns: `{ZCFSeat, Promise<UserSeat>}`

Returns an empty `ZCFSeat` and a promise for a `UserSeat`

Zoe uses `seats` to represent offers, and has two seat facets (a
particular view or API of an object;
there may be multiple such APIs per object) a `ZCFSeat` and a `UserSeat`.
```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```
## `ZCFSeat` object

Zoe uses `seats` to access or manipulate offers. Seats represent active
offers and let contracts and users interact with them. Zoe has two kinds
of seats. `ZCFSeats` are used within contracts and with `zcf` methods.
`UserSeats` represent offers external to Zoe and the contract.

A `ZCFSeat` includes synchronous queries for the current state of the
associated offer, such as the amounts of assets that are currently
allocated to the offer. It also includes synchronous operations
to manipulate the offer. The queries and operations are as follows:

### `ZCFSeat.hasExited()`
  - Returns: `{Boolean}`
  - Returns `true` if the `seat` has exited, `false` if it is still active.
### `ZCFSeat.getNotifier()`
  - Returns: `{Notifier<Allocation>}`
  - Returns a `notifier` associated with the `seat`'s `allocation`. You use a `notifier`
    wherever some piece of code has changing state that other code wants updates on.
    This `notifier` provides updates on changing `allocations` for this `seat`, and tells
    when the `seat` has been exited. For more on `notifiers`, see the [Distributed Programming Guide](/guides/js-programming/notifiers.md).
### `ZCFSeat.getProposal()`
  - Returns: `{ProposalRecord}`
  - A `Proposal` is represented by a `ProposalRecord`. It is the rules
    accompanying the escrow of `payments` dictating what the user expects
    to get back from Zoe. It has keys `give`, `want`, and
    `exit`. `give` and `want` are records with keywords as keys and
    `amounts` as values. The `proposal` is a user's understanding of the
    contract that they are entering when they make an offer. See
    [`E(zoe).offer()`](./zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs) for full details.
  - Example:
    ```js
    const { want, give, exit } = sellerSeat.getProposal();
    ```
### `ZCFSeat.getAmountAllocated(keyword, brand)`
  - `keyword`: `{String}`
  - `brand`: `{Brand}`
  - Returns: `{Amount}`
  - Returns the `amount` from the part of the `allocation` that matches the
    `keyword` and `brand`. If the `keyword` is not in the `allocation`, it
    returns an empty `amount` of the `brand` argument. (After
    `exit()` has been called, it continues to report the final allocation balance, 
    which was transferred to a payout.)

    This is similar to the next method, `getCurrentAllocation()`. `getAmountAllocated()`
    gets the `allocation` of one keyword at a time, while `getCurrentAllocation()` returns
    all the current `allocations` at once.
### `ZCFSeat.getCurrentAllocation()`
  - Returns: `{<Allocation>}`
  - An `Allocation` is an `AmountKeywordRecord` of key-value pairs where
    the key is a keyword such as `Asset` or `Price` applicable to the
    contract. The value is an `amount` with its `value` and `brand`.

    `Allocations` represent the `amounts` to be paid out to each `seat` on exit. (After
    `exit()` has been called, the final allocation balances, which were transferred to
    payouts, continue to be reported.)
    Normal reasons for exiting are the user requesting to exit or the contract
    explicitly choosing to close out the `seat`. The guarantees also hold if the contract
    encounters an error or misbehaves. There are several methods for finding out
    what `amount` a current `allocation` is.
    

    This is similar to the previous method, `getAmountAllocated()`. `getAmountAllocated()`
    gets the `allocation` of one keyword at a time, while `getCurrentAllocation()` returns
    all the current `allocations` at once.

    An `Allocation` example:
    ```js
      {
        Asset: AmountMath.make(quatloosBrand, 5n),
        Price: AmountMath.make(quatloosBrand, 9n)
      }
    ```
 ### `ZCFSeat.incrementBy(amountKeywordRecord)`
  - `amountKeywordRecord`: `{AmountKeywordRecord}`
  - Returns: `{AmountKeyRecord}`
  - Adds the `amountKeywordRecord` argument to the `ZCFseat`'s staged allocation and returns the 
    same `amountKeywordRecord` so it can be reused in another call. Note that this lets
    `zcfSeat1.incrementBy(zcfSeat2.decrementBy(amountKeywordRecord))` work as a usage pattern. 
    
    Note that you can add amounts to original or staged allocations which do not have the
    specified keyword for the amount. The result is for the keyword and amount to become part
    of the allocation. For example, if we start with a new, empty, allocation:
    ```js
    // Make an empty seat.
    const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
    // The allocation is currently empty, i.e. `{}`
    const stagedAllocation = zcfSeat1.getStagedAllocation();
    const empty = AmountMath.makeEmpty(brand, AssetKind.NAT);
    // Try to incrementBy empty. This succeeds, and the keyword is added
    // with an empty amount.
    zcfSeat1.incrementBy({ IST: empty }); 
    t.deepEqual(zcfSeat1.getStagedAllocation(), { IST: empty  });
    ```
    While this incremented the allocation by an empty amount, any amount would have been added to the 
    allocation in the same way. 

### `ZCFSeat.decrementBy(amountKeywordRecord)`
  - `amountKeywordRecord`: `{AmountKeywordRecord}`
  - Returns: `{AmountKeywordRecord}`
  - Subtracts the `amountKeywordRecord` argument from the `ZCFseat`'s staged allocation and returns the
    same `amountKeywordRecord` so it can be used in another call.  Note that this lets
    `zcfSeat1.incrementBy(zcfSeat2.decrementBy(amountKeywordRecord))` work as a usage pattern.  
    
    The amounts to subtract cannot be greater than the staged allocation (i.e. negative 
    results are not allowed).
    
    `decrementBy()` has different behavior from `incrementBy()` if the original or staged allocation 
    does not have the keyword specified for an amount in the `amountKeywordRecord` argument. There are two
    cases to look at; when the corresponding amount to subtract is empty and when it isn't. 
    ```js
    // Make an empty seat.
    const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
    // The allocation is currently {}
    const stagedAllocation = zcfSeat1.getStagedAllocation();
    const empty = AmountMath.makeEmpty(brand, AssetKind.NAT);
    // decrementBy empty does not throw, and does not add a keyword 
    zcfSeat1.decrementBy({ IST: empty });
    t.deepEqual(zcfSeat1.getStagedAllocation(), {});
    ```
    The result here is **not** to add the keyword to the allocation. It wasn't there to begin with, and
    the operation was to try to subtract it from the allocation. Subtracting something that's not there
    does not add it to the original value. For example, if I tell you I'm taking away the Mona Lisa from
    you and you are not the Louvre and don't have it, you still don't have it after I try to take it away.
    In the above example, trying to take away an empty amount from an empty allocation is effectively a
    null operation; the allocation is still empty, didn't add the new keyword, and no error is thrown. 
    
    However, decrementing a non-empty amount from an empty allocation has a different result. For example:
    ```js
    // Make an empty seat.
    const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
    // The allocation is currently {}
    const stagedAllocation = zcfSeat1.getStagedAllocation();
    // decrementBy throws for a keyword that does not exist on the stagedAllocation and a non-empty amount
    zcfSeat1.decrementBy({ IST: runFee });
    ```
    It throws an error because you cannot subtract something from nothing. So trying to decrement an empty
    allocation by a non-empty amount is an error, while decrementing an empty allocation by an empty amount
    is effectively a null operation with no effects.

### `ZCFSeat.clear()`
  - Returns: `{void}`
  - Deletes the `ZCFSeat`'s current staged allocation, if any.

### `ZCFSeat.getStagedAllocation()`
  - Returns: `{<Allocation>}`
  - Gets and returns the `stagedAllocation`, which is the allocation committed if the seat is reallocated over, if offer safety holds and rights are conserved.

### `ZCFSeat.hasStagedAllocation()`
  - Returns: `{boolean}`
  - Returns `true` if there is a staged allocation, i.e. whether `incrementBy()` or `decrementBy()` has been called and `clear()`
    and `reallocate()` have not. Otherwise returns `false`.      
      
### `ZCFSeat.exit(completion)`
   - `completion`: `{Object}`
   - Returns: `void`
   - Causes the `seat` to exit, concluding its existence. All `payouts`, if any,
     are made, and the `seat` object can no longer interact with the contract.
     The `completion` argument is usually a string, but this is not required. Its
     only use is for the notification sent to the contract instance's `done()` function. 
     Any other still open seats or outstanding promises and the contract instance continue.
     
     Note: You should not use `ZCFSeat.exit()` when exiting with an error. Use the method
     described next, `ZCFSeat.fail()`, instead. 
     
### `ZCFSeat.fail(msg)`
   - `msg`: `{String}`
   - Returns: `void`
   - The `seat` exits, displaying the optional `msg` string, if there is one, on the console.
     This is equivalent to exiting, except that `exit` is successful while
     `fail()` signals an error occurred while processing the offer. The contract
     still gets its current `allocation` and the `seat` can no longer interact with the contract.
     Any other still open seats or outstanding promises and the contract instance continue.
     
     Agoric recommends you exit a seat with an error as follows:
     ```js
     throw seat.fail(Error('you did it wrong'));
     ```
     
### `ZCFSeat.isOfferSafe(newAllocation)`
   - `newAllocation`: `{Allocation}`
   - Returns `{Boolean}`
   - Takes an `allocation` as an argument and returns `true` if that `allocation`
     satisfies offer safety, `false` if it doesn't. Essentially, it checks
     `newAllocation` for offer safety, against the `seat`'s `proposal`.
     It checks whether `newAllocation` fully satisfies
     `proposal.give` (giving a refund) or whether it fully satisfies
     `proposal.want`. Both can be fully satisfied. See the ZoeHelper
     [`satisfies()`](./zoe-helpers.md#satisfies-zcf-seat-update) method for more details.

## `zcf.getInstance()`
- Returns: `{Instance}`

The contract code can request its own current instance, so it can be sent elsewhere.

## `zcf.getBrandForIssuer(issuer)`
- `issuer` `{Issuer}`
- Returns: `{Brand}`

Returns the `brand` associated with the `issuer`.

## `zcf.getIssuerForBrand(brand)`
- `brand` `{Brand}`
- Returns: `{Issuer}`

Returns the `issuer` of the `brand` argument.

## `zcf.getAssetKind(brand)`
- `brand` `{Brand}`
- Returns: `{AssetKind}`

Returns the `AssetKind` associated with the `brand` argument.
```js
const quatloosAssetKind = zcf.getAssetKind(quatloosBrand);
```

## `zcf.stopAcceptingOffers()`
- The contract requests Zoe to not accept offers for this contract instance. 
It can't be called from outside the contract unless the contract explicitly makes it accessible.

## `zcf.shutdown(completion)`
     
Shuts down the entire vat and contract instance and gives payouts.

All open `seats` associated with the current `instance` have `fail()`
called on them.

Call when:
- You want nothing more to happen in the contract, and
- You don't want to take any more offers

The `completion` argument is usually a string, but this 
is not required. It is used for the notification sent to the
contract instance's `done()` function. Any still open seats or
other outstanding promises are closed with a generic 'vat terminated' 
message.
```js
zcf.shutdown();
```
## `zcf.getTerms()`
- Returns: `{Object}`

Returns the `issuers`, `brands`, and custom `terms` the current contract `instance` was instantiated with.

The returned values look like:
```js
{ brands, issuers, customTermA, customTermB ... }
// where brands and issuers are keywordRecords, like:

{
    brands: { A: moolaKit.brand, B: simoleanKit.brand },
    issuers: { A: moolaKit.issuer, B: simoleanKit.issuer },
    customTermA: 'something',
    customTermB: 'something else',
 };
 ```

Note that there is also an `E(zoe).getTerms(instance)`. Often the choice of which to use is not which method
to use, but which of Zoe Service or ZCF you have access to. On the contract side, you more easily have access
to `zcf`, and `zcf` already knows what instance is running. So in contract code, you use `zcf.getTerms()`. From
a user side, with access to Zoe Service, you use `E(zoe).getTerms()`.
```js
const { brands, issuers, maths, terms } = zcf.getTerms()
```

## `zcf.getZoeService()`
- Returns: [ZoeService](./zoe.md)

This is the only way to get the user-facing [Zoe Service API](/zoe/api/zoe.md#zoe) to
the contract code as well.
```js
// Making an offer to another contract instance in the contract.
const zoeService = zcf.getZoeService();
E(zoeService).offer(creatorInvitation, proposal, paymentKeywordRecord);
```

## `zcf.assertUniqueKeyword(keyword)`
- `keyword` `{String}`
- Returns: Undefined

Checks if a keyword is valid and not already used as a `brand` in this `instance` (i.e. unique)
and could be used as a new `brand` to make an `issuer`. Throws an appropriate error if it's not
a valid keyword, or is not unique.
```js
zcf.assertUniqueKeyword(keyword);
```
## `zcf.reallocate(seats)`
- `seats` `{ZCFSeats[]}` (at least two)
- Returns: `{void}`

`zcf.reallocate()` commits the staged allocations for each of its seat arguments,
making their staged allocations their current allocations. `zcf.reallocate()` then
transfers the assets escrowed in Zoe from one seat to another. Importantly, the assets 
stay escrowed, with only the internal Zoe accounting of each seat's allocation changed.

There must be at least two `ZCFSeats` in the array argument. Every `ZCFSeat`
with a staged allocation must be included in the argument array or an error
is thrown. If any seat in the argument array does not have a staged allocation,
an error is thrown. 

On commit, the staged allocations become the seats' current allocations and 
the staged allocations are deleted.

Note: `reallocate()` is an *atomic operation*. To enforce offer safety, 
it will never abort part way through. It will completely succeed or it will 
fail before any seats have their current allocation changed.

The reallocation only succeeds if it:
1. Conserves rights (the specified `amounts` have the same total value as the
  current total amount)
2. Is 'offer-safe' for all parties involved. 

The reallocation is partial, only applying to the `seats` in the
argument array. By induction, if rights conservation and
offer safety hold before, they hold after a safe reallocation.

This is true even though we only re-validate for `seats` whose
allocations change. A reallocation can only effect offer safety for
those `seats`, and since rights are conserved for the change, overall
rights are unchanged.

`reallocate()` throws this error:
- `reallocating must be done over two or more seats`

```js
sellerSeat.incrementBy(buyerSeat.decrementBy({ Money: providedMoney }));
buyerSeat.incrementBy(sellerSeat.decrementBy({ Items: wantedItems }));
zcf.reallocate(buyerSeat, sellerSeat);
```
