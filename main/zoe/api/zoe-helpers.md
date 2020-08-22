# ZoeHelpers

ZoeHelpers are functions that extract common contract code and
patterns into reusable helpers.

The ZoeHelper methods are listed below. To use any of them, you import
it directly from `@agoric/zoe/src/contractSupport/`. For example, the following 
imports the two ZoeHelpers `assertIssuerKeywords()` and `assertProposalShape()`:
```js
import {
  assertIssuerKeywords,
  assertProposalShape,
} from '../../../src/contractSupport';
```
**tyg todo: Do the exported methods in .../contractSupport/index.js all need to be documented?
Specifically, the ones not in the zoeHelpers.js file?**

Note that almost all ZoeHelpers require `zcf` as a first argument. 
**tyg todo: Why? Also, if this is a contractFacet rather than a string, 
where is it coming from? Looking at the contracts, the only prior zcf
looked to be the argument to start(), which also seemed to just be a 'zcf' string?**

## assertIssuerKeywords(zcf, keywords)
- `zcf` `{String}`  **tyg todo: Should this be contractFacet or similar? Just noting it here; if need to correct will then go do the other four methods**
- `keywords` `{Array <String>}`

Checks that keywords submitted by the contract instance creator
match what the contract expects. Throws if incorrect or if there are
missing or extra keywords. The keywords order is irrelevant.

The first argument is always `zcf`.
```js
import {
  assertIssuerKeywords,
} from '../../../src/contractSupport';

// proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## satisfies(zcf, seat, update)
- `zcf`- `{String}`
- `seat` - `{ZcfSeat}`
- `update` - `{AmountKeywordRecord}`
- Returns: `true` if the `seat`'s allocation update satisfies its `proposal.want`, `false` if not.

Checks if an update to a `seat`'s `currentAllocation` satisfies its
`proposal.want`. Note this is half of the offer safety check; 
it does not check if the allocation constitutes a refund.
The update is merged with `currentAllocation` such that
`update`'s values prevail if the keywords are the same **(tyg todo: And if they're not the same?)**
The result is the `newAllocation`. **tyg todo: Which is used how/where is it?**

This code uses `satisfies()` to define a `satisfiedBy()` comparison
method between two `seats` to see if the second `seat` argument's `currentAllocation`
satisfies the first `seat` argument's `proposal.want`. It then calls
`satisfiedBy()` on both orders of the two `seats`, and if both satisfy each other,
it does a swap on them. 
```js
import {
  satisfies,
} from '../../../src/contractSupport';

const satisfiedBy = (xSeat, ySeat) =>
        satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
    swap(zcf, seat, offer);
```
## assertUsesNatMath
- `zcf`- `{String}`
- `brand` - `{Brand}`
- Returns - `{Boolean}` with a message if `false`  **tyg todo: Not sure how to describe this?**

This method always takes `'zcf'` as its first argument. 

Assert that the `brand` argument's one-to-one associated `amountMath`
uses the `NAT` value of `amountMathKind` (i.e. the `brand`, and its 
associated `issuer`, are for fungible assets).

Returns `true` if so, `false` if not. `false` also returns `details` '`issuer must use NAT amountMath`'
```js
import {
  assertUsesNatMath,
} from '../../../src/contractSupport';

 assertUsesNatMath(zcf, quatloosBrand);
 ```
## trade(zcf, keepLeft, tryRight)
- `zcf` - `{String}`
- `keepLeft` - See below.
- `tryRight` - See below.
- Returns: Undefined.

The first argument is always '`zcf`'.

The `keepLeft` and `tryRight` arguments are each offers **tyg todo: Is this correct?** 
with `seat`, `gains`, and optional `losses` properties. `gains` and `losses` are `amountKeywordRecords`
describing declaratively what is added or removed from that offer's allocation.

`trade()` does a trade between its two offer arguments. If the two offers can trade, 
it swaps their compatible assets and marks both offers as complete.

Any surplus remains with its original offer. For example if offer 
A gives 5 moola and offer B only wants 3 moola, offer A retains 2 moola.

If the first offer argument has already completed and is no longer active, 
the other offer is rejected with a message.

If the trade fails for any reason, it throws the message `The trade between 
left and right failed. Please check the log for more 
information`. It writes the specific error to the console.
```js
import {
  trade,
} from '../../../src/contractSupport';
trade(
      zcf,
      {
        seat: poolSeat,
        gains: {
          tokenA: amountIn,
        },
        losses: {
          tokenB: amountOut,
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
- `zcf` `{ContractFacet}
- `keepSeat` `{ZCFSeat}
- `trySeat` `{ZCFSeat}
- `[keepHandleInactiveMsg]` `{String}`
- Returns: `defaultAcceptanceMsg`

`swap()` is a specific use of `trade()` in which everything each `seat` wants
is taken from the other `seat` and given to the `seat` that wanted it. 
`swap()` exits both `seats`, but `trade()` does not.

Use `swap()` when both `seats` use the same keywords, their wants can be fulfilled
from the other `seat`, and no other `seat` interaction is wanted. Use `trade()` when the `seats`
have different keywords, the `amounts` to be reallocated don't exactly match the wants of the `seats, 
or you want more interaction with the `seats`.

If the two `seats` and their offers can trade, then swap their compatible assets,
marking both offers as complete. It returns the message `The offer has been accepted. 
Once the contract has been completed, please check your payout`.

In many contracts, we have a particular offer we want to find a
match for. The contract iterates over potential matches, and 
checks if the two offers are swappable. `keepSeat` is the offer
we are trying to match, and `trySeat` is the offer being checked
for a match with `keepSeat`

If the `keepSeat` offer is no longer active, `swap()` rejects the `trySeat` offer
with the `keepHandleInactiveMsg`, which defaults to `'prior offer is unavailable'` 

If `satisfies()` returns `false` for the two offers, we reject the
`trySeat` offer.

If `satisfies` is `true`, Zoe reallocates by swapping the
amounts for the two offers, then both offers complete so the
users receive their payout.

Any surplus remains with whichever `seat` has the surplus. 
For example if offer A gives 5 Quatloos and offer B only 
wants 3 Quatloos, offer A retains 2 Quatloos.

If the swap fails, no assets transfer, and the 'trySeat' offer is rejected.

```js
import {
  swap,
} from '../../../src/contractSupport';

// If there's an existing offer this offer is a match for, make the trade
// and return the seat for the matched offer. If not, return undefined, so
// the caller knows to add the new offer to the offer book.
function swapIfCanTrade(offers, seat) {
  for (const offer of offers) {
    const satisfiedBy = (xSeat, ySeat) =>
      satisfies(zcf, xSeat, ySeat.getCurrentAllocation());
    if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
      swap(zcf, seat, offer);
      // return handle to remove
      return offer;      }
   }
   return undefined;
 }
```
## assertProposalShape(offerHandler, expected)
- `offerHandler` `{OfferHandler}`
- `expected` `{ExpectedRecord}`
- Returns: `{OfferHandler}

This is the only ZoeHelper that does **not** take 'zcf' as its first argument.

Make an `offerHandler` that wraps the provided `offerHandler`, to first
check the submitted offer against an `expected` record that says
what shape of proposal is acceptable.  

By "shape", we mean the `give`, `want`, and exit rule keywords of the offer must be equal to 
those in `expected`. Note that exit rule keywords are optional in `expected`. Also, none of the 
values of those keywords are checked.

This `ExpectedRecord` is like a `Proposal`, but the amounts in `want`
and `give` should be `null`; the `exit` clause should specify a rule with
null contents. If the client submits an `Offer` which does not match
these expectations, that offer is rejected (and refunded). 

The returned `offerHandler` performs the check. It then calls the `offerHandler`
that was passed in as an argument.
```js
import {
  assertProposalShape,
} from '../../../src/contractSupport';

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
