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

## trade(zcf, keepLeft, tryRight)
- `zcf` - `{ContractFacet}`
- `keepLeft` - `{Seat}`
- `tryRight` - `{Seat}`
- Returns: Undefined.

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

The `keepLeft` and `tryRight` arguments are each `seats`
with `seat`, `gains`, and optional `losses` properties. `gains` and `losses` are `amountKeywordRecords`
describing declaratively what is added or removed from that `seat`'s allocation.

Note that the reason the parameters are called `keepLeft` and `tryRight` is 
if the offer fails, `keepLeft` remains unchanged, but `tryRight`
is kicked out. This is true of both `swap` and `trade`.

`trade()` does a trade between its two `seat` arguments. If the two `seats` can trade, 
it swaps their compatible assets.

Any surplus remains with its original `seat`. For example if `seat` 
A gives 5 Quatloos and `seat` B only wants 3 Quatloos, `seat` A retains 2 Quatloos.

If the first `seat` argument has already exited and is no longer active, 
the other `seat` is rejected with a message. `trade()` does **not** exit the `seats`.

If the trade fails for any reason, it throws the message `The trade between 
left and right failed. Please check the log for more 
information`. It writes the specific error to the console.

```js
import {
  trade,
} from '@agoric/zoe/src/contractSupport';
trade(
      zcf,
      {
        seat: poolSeat,
        gains: {tokenA: amountIn},
        losses: {tokenB: amountOut},
        },
      },
      {
        seat: swapSeat,
        gains: { Out: amountOut },
        losses: { In: amountIn },
      },
    );
```

## swap(zcf, keepSeat, trySeat, keepHandleInactiveMsg)
- `zcf` `{ContractFacet}`
- `keepSeat` `{ZCFSeat}`
- `trySeat` `{ZCFSeat}`
- `[keepHandleInactiveMsg]` `{String}`
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

If the two `seats` can trade, then swap their compatible assets,
exiting both `seats`. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

Note that the reason the parameters are called `keepLeft` and `tryRight` is 
if the offer fails, `keepLeft` remains unchanged, but `tryRight`
is kicked out. This is true of both `swap` and `trade`.

In many contracts, we have a particular `seat` we want to find a
match for. The contract iterates over potential matches, and 
checks if the two `seats` are swappable. `keepSeat` is the `seat`
we are trying to match, and `trySeat` is the `seat` being checked
for a match with `keepSeat`

If the `keepSeat` offer is no longer active, `swap()` rejects the `trySeat` offer
with the `keepHandleInactiveMsg`, which defaults to `'prior offer is unavailable'` 

If `satisfies()` returns `false` for the two `seats`, we reject the
`trySeat` `seat`.

If `satisfies()` is `true`, Zoe reallocates by swapping the
amounts for the two `seats`, then both `seats` exit so the
users receive their payout.

Any surplus remains with whichever `seat` has the surplus. 
For example if `seat` A gives 5 Quatloos and `seat` B only 
wants 3 Quatloos, `seat` A retains 2 Quatloos.

If the swap fails, no assets transfer, and `trySeat`
is rejected as a possible match.

```js
import {
  swap,
} from '@agoric/zoe/src/contractSupport';

swap(zcf, firstSeat, secondSeat);
```

## assertProposalShape(seat, expected)
- `seat` `{ZCFSeat}`
- `expected` `{ExpectedRecord}`
- Returns: `{void}`

This is the only ZoeHelper that does **not** take 'zcf' as its first argument.

Checks the proposal of the seat against against an `expected` record that says
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
} from '@agoric/zoe/src/contractSupport';

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
