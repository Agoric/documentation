# ZoeHelpers

ZoeHelpers are functions that extract common contract code and
patterns into reusable helpers.

All of the ZoeHelper methods are described below. To use any of them, import it
directly from `@agoric/zoe/src/contractSupport/index.js`. For example, the
following imports the two ZoeHelpers `assertIssuerKeywords()` and
`assertProposalShape()`:
```js
import {
  assertIssuerKeywords,
  assertProposalShape,
} from '@agoric/zoe/src/contractSupport/index.js';
```
Note that almost all ZoeHelpers require `zcf`, a `ContractFacet` as a first argument.
ZoeHelpers are contract helpers, in that they are useful to contract code. Contracts are started up by Zoe, 
and `zcf` is passed in as a parameter to `start()`. 

## `assertIssuerKeywords(zcf, keywords)`
- `zcf` `{ContractFacet}` 
- `keywords` `{Array <String>}`

This method always takes `zcf` as its first argument.

Checks that keywords submitted by the contract instance creator
match what the contract expects. Throws if incorrect or if there are
missing or extra keywords. The keywords order is irrelevant.

```js
import {
  assertIssuerKeywords,
} from '@agoric/zoe/src/contractSupport/index.js';

// proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## `assertNatAssetKind(zcf, brand)`
- `zcf`- `{ContractFacet}`
- `brand` - `{Brand}`

This method always takes `zcf` as its first argument. 

Assert that the `brand` has the AssetKind.NAT
This means the corresponding `mint` creates fungible assets.

If `false` throws with message `brand must be AssetKind.NAT`.

```js
import {
  assertNatAssetKind,
} from '@agoric/zoe/src/contractSupport/index.js';

 assertNatAssetKind(zcf, quatloosBrand);
 ```

## `satisfies(zcf, seat, update)`
- `zcf`- `{ContractFacet}`
- `seat` - `{ZCFSeat}`
- `update` - `{AmountKeywordRecord}`
- Returns: `{Boolean}` 

This method always takes `zcf` as its first argument.

Returns `true` if an update to a `seat`'s `currentAllocation` satisfies its
`proposal.want`. Note this is half of the offer safety check; 
it does not check if the allocation constitutes a refund.
The update is merged with `currentAllocation` such that
`update`'s values prevail if the keywords are the same. If they
are not the same, the `keyword` and `value` is just added to the `currentAllocation`.

The following example code uses `satisfies()` to define a `satisfiedBy()` comparison
method between two `seats`. It checks if the second `seat` argument's `currentAllocation`
satisfies the first `seat` argument's `proposal.want`. 

It then calls `satisfiedBy()` on both orders of the two `seats`. If both satisfy each other,
it does a swap on them.

```js
import {
  satisfies,
} from '@agoric/zoe/src/contractSupport/index.js';

const satisfiedBy = (xSeat, ySeat) =>
        satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
    swap(zcf, seat, offer);
```

## `swap(zcf, leftSeat, rightSeat)`
- `zcf` `{ContractFacet}`
- `leftSeat` `{ZCFSeat}`
- `rightSeat` `{ZCFSeat}`
- Returns: `defaultAcceptanceMsg`

**Note**: In `swap(),` 
for both `seats`, everything a `seat` wants is given to it, having been
taken from the other `seat`. `swap()` exits both `seats`.
Use `swap()` when all of these are true:
  - Both `seats` use the same keywords.
  - The `seats`' wants can be fulfilled from the other `seat`.
  - No further `seat` interaction is desired.

This method always takes `zcf` as its first argument.

If the two `seats` can trade, they swap their compatible assets,
exiting both `seats`. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

Any surplus remains with whichever `seat` has the surplus. 
For example if `seat` A gives 5 Quatloos and `seat` B only 
wants 3 Quatloos, `seat` A retains 2 Quatloos.

If the swap fails, no assets transfer, and both left and right `seats` are exited.

```js
import {
  swap,
} from '@agoric/zoe/src/contractSupport.js';

swap(zcf, firstSeat, secondSeat);
```

## `swapExact(zcf, leftSeat, rightSeat)`
- `zcf` `{ContractFacet}`
- `leftSeat` `{ZCFSeat}`
- `rightSeat` `{ZCFSeat}`
- Returns: `defaultAcceptanceMsg`

In `swap()` and `swapExact()`,
for both seats, everything a seat wants is given to it, having been
taken from the other seat. `swap()` and `swapExact()` exit both seats.
Use `swap()` or `swapExact()` when both of these are true:
  - The `seats`' wants can be fulfilled from the other `seat`.
  - No further `seat` interaction is desired.

For `swap()` only, both `seats` use the same keywords. This does **not** 
hold for `swapExact()`

This method always takes `zcf` as its first argument.

`exactSwap()` is a special case of `swap()` such that it is successful only
if both seats gain everything they want and lose everything they were willing to give.
It is only good for exact and entire swaps where each
seat wants everything that the other seat has. The benefit of using
this method is that the keywords of each seat do not matter.

If the two `seats` can trade, they swap their compatible assets,
exiting both `seats`. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

If the swap fails, no assets transfer, and both left and right `seats` are exited.

```js
import {
  swapExact,
} from '@agoric/zoe/src/contractSupport/index.js';

const swapMsg = swapExact(zcf, zcfSeatA, zcfSeatB);
```

## `assertProposalShape(seat, expected)`
- `seat` `{ZCFSeat}`
- `expected` `{ExpectedRecord}`
- Returns: `{void}`

This is the only ZoeHelper that does **not** take 'zcf' as its first argument.

Check the seat's proposal against an `expected` record that says
what shape of proposal is acceptable.
 
By "shape", we mean the `give`, `want`, and exit rule keywords of the proposal must be equal to 
those in `expected`. Note that exit rule keywords are optional in `expected`. Also, none of the 
values of those keywords are checked.

This `ExpectedRecord` is like a `Proposal`, but the amounts in `want`
and `give` should be `null`; the `exit` clause should specify a rule with
`null` contents. If the client submits a `Proposal` which does not match
these expectations, that `proposal` is rejected (and refunded). 

```js
import {
  assertProposalShape,
} from '@agoric/zoe/src/contractSupport/index.js';

const sellAssetForPrice = harden({
    give: { Asset: null },
    want: { Price: null },
  });
const sell = seat => {
  assertProposalShape(seat, sellAssetForPrice);
  buySeats = swapIfCanTradeAndUpdateBook(buySeats, sellSeats, seat);
  return 'Trade Successful';
};
```
 
## `depositToSeat(zcf, recipientSeat, amounts, payments)`
- `zcf` `{ContractFacet }`
- `recipientSeat` `{ZCFSeat}`
- `amounts` `{AmountKeywordRecord}`
- `payments` `{PaymentPKeywordRecord}`
- Returns: `{Promise<string>}`
Deposit payments such that their amounts are reallocated to a seat.
The `amounts` and `payments` records must have corresponding
keywords.

If the seat has exited, aborts with the message `The recipientSeat cannot have exited.`

On success, returns the exported and settable `depositToSeatSuccessMsg` which
defaults to `Deposit and reallocation successful.`
```js
import {
  depositToSeat,
} from '@agoric/zoe/src/contractSupport/index.js';
await depositToSeat(zcf, zcfSeat, { Dep: quatloos(2n) }, { Dep: quatloosPayment });
```

## `withdrawFromSeat(zcf, seat, amounts)`
- `zcf` `{ContractFacet }`
- `seat` `{ZCFSeat}`
- `amounts` `{AmountKeywordRecord}`
- Returns: `{Promise<PaymentPKeywordRecord>}`

Withdraw payments from a seat. Note that withdrawing the amounts of
the payments must not and cannot violate offer safety for the seat. The
`amounts` and `payments` records must have corresponding keywords.

If the seat has exited, aborts with the message `The seat cannot have exited.`

Unlike `depositToSeat()`, a `PaymentKeywordRecord` is returned, not a success message.
```js
import {
  withdrawFromSeat,
} from '@agoric/zoe/src/contractSupport/index.js';
const paymentKeywordRecord = await withdrawFromSeat(zcf, zcfSeat, { With: quatloos(2n) });
```

## `saveAllIssuers(zcf, issuerKeywordRecord)`
- `zcf` `{ContractFacet}`
- `issuerKeywordRecord` `{IssuerKeywordRecord}`
- Returns: `{Promise<PaymentPKeywordRecord>}`

Save all of the issuers in an `issuersKeywordRecord` to ZCF, using
the method [`zcf.saveIssuer()`](./zoe-contract-facet.md#zcf-saveissuer-issuer-keyword).

This does **not** error if any of the keywords already exist. If the keyword is
already present, it is ignored.

```js
import {
  saveAllIssuers,
} from '@agoric/zoe/src/contractSupport/index.js';
await saveAllIssuers(zcf, { G: gIssuer, D: dIssuer, P: pIssuer });
```

## `offerTo(zcf, invitation, keywordMapping, proposal, fromSeat, toSeat)`
- `zcf` `{ContractFacet}`
- `invitation` `{ERef<Invitation>}`
- `keywordMapping` `{KeywordKeywordRecord=}`
- `proposal` `{Proposal}`
- `fromSeat` `{ZCFSeat}`
- `toSeat` `{ZCFSeat}`
- Returns: `{OfferToReturns}`

`offerTo()` makes an offer from your current contract instance (which
we'll call "contractA") to another contract instance (which we'll call
"contractB"). It withdraws offer payments from the `fromSeat` in
contractA and deposits any payouts in the `toSeat`, also a contractA
seat. Note that `fromSeat` and `toSeat` may be the same seat, which is
the default condition (i.e. `toSeat` is an optional parameter
defaulting to `fromSeat`'s value). `offerTo` can be used to make an
offer from any contract instance to any other contract instance, as
long as the `fromSeat` allows the withdrawal without violating
offer-safety. To be clear, this does mean that contractA and contractB
do not have to be instances of the same contract. 

`zcf` is contractA's Zoe contract facet. The `invitation` parameter is an invitation 
to contractB. The `proposal` parameter is the proposal part of the offer made to contractB.

`keywordMapping` is a record of the keywords used in contractA mapped to the 
keywords for contractB. Note that the pathway to deposit the payout back to
contractA reverses this mapping. It looks like this, where the keywords are
from the contracts indicated by using "A" or "B" in the keyword name.
```js
// Map the keywords in contractA to the keywords in contractB
  const keywordMapping = harden({
    TokenA1: 'TokenB1',
    TokenA2: 'TokenB2',
  });
```

The `OfferToReturns` return value is a promise for an object containing
the `userSeat` for the offer to the other contract, and a promise (`deposited`) 
that resolves when the payout for the offer has been deposited to the `toSeat`. 
Its two properties are:
- `userSeatPromise`: `Promise<UserSeat>` 
- `deposited`: `Promise<AmountKeywordRecord>`

```js
 const { userSeatPromise: autoswapUserSeat, deposited } = zcf.offerTo(
   swapInvitation,
   keywordMapping, // {}
   proposal,
   fromSeat,
   lenderSeat,
 );
```
