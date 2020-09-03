# ZoeHelpers

ZoeHelpers are functions that extract common contract code and
patterns into reusable helpers.

All of the ZoeHelper methods are described below. To use any of them, import
it directly from `@agoric/zoe/src/contractSupport/`. For example, the following 
imports the two ZoeHelpers `assertIssuerKeywords()` and `assertProposalShape()`:
```js
import {
  assertIssuerKeywords,
  assertProposalShape,
} from '@agoric/zoe/src/contractSupport';
```
Note that almost all ZoeHelpers require `zcf`, a `ContractFacet` as a first argument.
ZoeHelpers are contract helpers, in that they are useful to contract code. Contracts are started up by Zoe, 
and `zcf` is passed in as a parameter to `start()`. 

## assertIssuerKeywords(zcf, keywords)
- `zcf` `{ContractFacet}` 
- `keywords` `{Array <String>}`

This method always takes `zcf` as its first argument.

Checks that keywords submitted by the contract instance creator
match what the contract expects. Throws if incorrect or if there are
missing or extra keywords. The keywords order is irrelevant.

```js
import {
  assertIssuerKeywords,
} from '@agoric/zoe/src/contractSupport';

// proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## assertUsesNatMath(zcf, brand)
- `zcf`- `{ContractFacet}`
- `brand` - `{Brand}`

This method always takes `zcf` as its first argument. 

Assert that the `brand` corresponds to an `issuer` that uses `MathKind.NAT`. 
This means the `issuer` creates fungible assets.

If `false` throws with message `issuer must use NAT amountMath`.

```js
import {
  assertUsesNatMath,
} from '@agoric/zoe/src/contractSupport';

 assertUsesNatMath(zcf, quatloosBrand);
 ```

## satisfies(zcf, seat, update)
- `zcf`- `{ContractFacet}`
- `seat` - `{ZCFSeat}`
- `update` - `{AmountKeywordRecord}`
- Returns: `{Boolean} 

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
} from '@agoric/zoe/src/contractSupport';

const satisfiedBy = (xSeat, ySeat) =>
        satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
    swap(zcf, seat, offer);
```

## trade(zcf, left, right, leftHasExitedMsg, rightHasExitedMsg)
- `zcf` - `{ContractFacet}`
- `left` - `{SeatGainsLossesRecord}`
- `right` - `{SeatGainsLossesRecord}`
- `leftHasExitedMsg` - `{String}` - Optional
- `rightHasExitedMsg` - `{String}` - Optional
- Returns: void

::: details SeatGainsLossesRecord
 - `seat` - `{ZCFSeat}`
 - `gains` - `{AmountKeywordRecord}`  - what the seat will
gain as a result of this trade
 - `losses` - `{AmountKeywordRecord=}`  - what the seat will give up
   as a result of this trade. Losses is optional, but can only be
   omitted if the keywords for both seats are the same. If losses is
   not defined, the gains of the other seat is subtracted.
:::

**Note**: The `swap()` method is a specific use of `trade()`. In `swap()`, 
for both `seats`, everything a `seat` wants is given to it, having been
taken from the other `seat`. `swap()` exits both `seats`, but `trade()` does not.
- Use `trade()` when any of these are true:
  - The `seats` have different keywords.
  - The `amounts` to be reallocated don't exactly match the wants of the `seats`. 
  - You want more interaction with the `seats`. 
- Use `swap()` when all of these are true:
  - Both `seats` use the same keywords.
  - The `seats`' wants can be fulfilled from the other `seat`.
  - No other `seat` interaction is wanted. 

This method always takes `zcf` as its first argument.

The `left` and `right` arguments are each `SeatGainsLossesRecords`
with `seat`, `gains`, and optional `losses` properties. `gains` and
`losses` are `amountKeywordRecords` describing declaratively what is
added or removed from that `seat`'s allocation.

`trade()` does a trade between the `seats` in `left` and `right`. If the two `seats` can trade, 
it swaps their compatible assets.

Any surplus remains with its original `seat`. For example if `seat` 
A gives 5 Quatloos and `seat` B only wants 3 Quatloos, `seat` A retains 2 Quatloos.

If either of the seats has exited, `trade` throws. `trade` itself does NOT
`kickOut` or `exit` either seat for any reason.

If the trade fails for reasons other than either seat exiting, it
throws the message `The trade between left and right failed. Please
check the log for more information`. It writes the specific error to
the console.

```js
import {
  trade,
} from '@agoric/zoe/src/contractSupport';
trade(
      zcf,
      {
        seat: poolSeat,
        gains: { Central: amountIn },
        losses: { Secondary: amountOut },
        },
      },
      {
        seat: swapSeat,
        gains: { Out: amountOut },
        losses: { In: amountIn },
      },
    );
```

## swap(zcf, leftSeat, rightSeat, leftHasExitedMsg, rightHasExitedMsg)
- `zcf` `{ContractFacet}`
- `leftSeat` `{ZCFSeat}`
- `rightSeat` `{ZCFSeat}`
- `leftHasExitedMsg` - `{String}` - Optional
- `rightHasExitedMsg` - `{String}` - Optional
- Returns: `defaultAcceptanceMsg`

**Note**: The `swap()` method is a specific use of `trade()`. In `swap(),` 
for both `seats`, everything a `seat` wants is given to it, having been
taken from the other `seat`. `swap()` exits both `seats`, but `trade()` does not.
- Use `trade()` when any of these are true:
  - The `seats` have different keywords.
  - The `amounts` to be reallocated don't exactly match the wants of the `seats`. 
  - You want more interaction with the `seats`. 
- Use `swap()` when all of these are true:
  - Both `seats` use the same keywords.
  - The `seats`' wants can be fulfilled from the other `seat`.
  - No other `seat` interaction is wanted. 

This method always takes `zcf` as its first argument.

`leftHasExitedMsg` and `rightHasExitedMsg` are optional and are passed
to `trade` within `swap` to add custom error messages in the case that
either seat has exited.

If the two `seats` can trade, then swap their compatible assets,
exiting both `seats`. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

Any surplus remains with whichever `seat` has the surplus. 
For example if `seat` A gives 5 Quatloos and `seat` B only 
wants 3 Quatloos, `seat` A retains 2 Quatloos.

If the swap fails, no assets transfer, and both left and right `seats` are exited.

```js
import {
  swap,
} from '@agoric/zoe/src/contractSupport';

swap(zcf, firstSeat, secondSeat);
```

## assertProposalShape(offerHandler, expected)
- `offerHandler` `{OfferHandler}`
- `expected` `{ExpectedRecord}`
- Returns: `{OfferHandler}`

This is the only ZoeHelper that does **not** take 'zcf' as its first argument.

Makes an `offerHandler` that wraps the provided `offerHandler`, to first
check the submitted proposal against an `expected` record that says
what shape of proposal is acceptable.  

By "shape", we mean the `give`, `want`, and exit rule keywords of the proposal must be equal to 
those in `expected`. Note that exit rule keywords are optional in `expected`. Also, none of the 
values of those keywords are checked.

This `ExpectedRecord` is like a `Proposal`, but the amounts in `want`
and `give` should be `null`; the `exit` clause should specify a rule with
`null` contents. If the client submits a `Proposal` which does not match
these expectations, that `proposal` is rejected (and refunded). 

The returned `offerHandler` performs the check. It then calls the `offerHandler`
that was passed in as an argument.

```js
import {
  assertProposalShape,
} from '@agoric/zoe/src/contractSupport';

const sellAssetForPrice = harden({
    give: { Asset: null },
    want: { Price: null },
  });
const sell = seat => {
  buySeats = swapIfCanTradeAndUpdateBook(buySeats, sellSeats, seat);
  return 'Trade Successful';
};

const sellHandler = assertProposalShape(sell, sellAssetForPrice);
```
