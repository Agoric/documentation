# ZoeHelper Functions

The ZoeHelper functions provide convenient abstractions for accessing Zoe functionality from within
contracts. In most cases, you pass a reference to zcf or one or more seats.

All of the ZoeHelper functions are described below. To use any of them, import them
directly from **@agoric/zoe/src/contractSupport/index.js**. For example, the
following imports the two ZoeHelper functions **[assertIssuerKeywords()](#assertissuerkeywords-zcf-expected)** and
**[assertProposalShape()](#assertproposalshape-seat-expected)**:

```js
import {
  assertIssuerKeywords,
  assertProposalShape,
} from '@agoric/zoe/src/contractSupport/index.js';
```

## atomicRearrange(zcf, transfers)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **transfers**: **Array&lt;[TransferPart](./zoe-data-types#transferpart)>**
- Returns: None.

Asks Zoe to rearrange the **[Allocations](./zoe-data-types#allocation)** among the seats mentioned in
_transfers_. _transfers_ are a set of changes to **Allocations** that must satisfy several
constraints. If these constraints are all met, then the reallocation happens atomically. Otherwise an
error is thrown and none of the propossed changes has any effect. The constraints are as follows.

- All the mentioned seats are still live.
- There aren't any outstanding stagings for any of the mentioned seats.

  Stagings are a reallocation mechanism that has been
  deprecated in favor of this **atomicRearrange()** function.
  To prevent confusion, each reallocation can only be
  expressed in the old way or the new way, but not a mixture.

- Overall conservation must be maintained. In other words, the reallocated
  **[Amounts](/reference/ertp-api/ertp-data-types#amount)** must balance out.
- Offer Safety is preserved for each seat. That means reallocations can only take assets from a seat
  as long as either it gets the assets described in the want section of its proposal, or it retains
  all of the assets specified in the give section of the proposal. This constraint applies to each
  seat across the entire atomicRearrangement, not to the individual **TransferParts**.

Note that you can construct the **TransferParts** that make up the _transfers_ array manually, or for
transfers that only include one seat, you can use the helper functions
**[fromOnly()](#fromonly-fromseat-fromamounts)** and **[toOnly()](#toonly-toseat-toamounts)** to create
**TransferParts** that only use a subset of the fields.

## fromOnly(fromSeat, fromAmounts)

- **fromSeat**: **[ZCFSeat](./zcfseat)**
- **fromAmounts**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)**
- Returns: **[TransferPart](./zoe-data-types#transferpart)**

Returns a **TransferPart** which only takes **fromAmounts** from _fromSeat_. **TransferParts** are used
as part of the _transfer_ argument of the **[atomicRearrange()](#atomicrearrange-zcf-transfers)**
function.

## toOnly(toSeat, toAmounts)

- **toSeat**: **[ZCFSeat](./zcfseat)**
- **toAmounts**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)**
- Returns: **[TransferPart](./zoe-data-types#transferpart)**

Returns a **TransferPart** which only gives **toAmount** to _toSeat_. **TransferParts** are used as part
of the _transfer_ argument of the **[atomicRearrange()](#atomicrearrange-zcf-transfers)** function.

## atomicTransfer(zcf, fromSeat, toSeat, fromAmounts, toAmounts?)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **fromSeat**: **[ZCFSeat](./zcfseat)** - Optional.
- **toSeat**: **ZCFSeat** - Optional.
- **fromAmounts**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)** - Optional.
- **toAmounts**: **AmountKeywordRecord** - Optional, defaults to **fromAmounts**.
- Returns: None.

Asks Zoe to rearrange the **[Allocations](./zoe-data-types#allocation)** among the seats mentioned in
_fromSeat_ and _toSeat_. The reallocations must satisfy several constraints. If these constraints are all
met, then the reallocation happens atomically. Otherwise an error is thrown and none of the proposed
changes has any effect. The constraints are as follows.

- All the mentioned seats are still live.
- There aren't any outstanding stagings for any of the mentioned seats.

      	Stagings are a reallocation mechanism that has been

  deprecated in favor of this **atomicRearrange()** function.
  To prevent confusion, each reallocation can only be
  expressed in the old way or the new way, but not a mixture.

- Overall conservation must be maintained. In other words, the reallocated
  **[Amounts](/reference/ertp-api/ertp-data-types#amount)** must balance out.
- Offer Safety is preserved for each seat. That means reallocations can only take assets from a seat
  as long as either it gets the assets described in the want section of its proposal, or it retains
  all of the assets specified in the give section of the proposal. This constraint applies to each
  seat across the entire atomicRearrangement, not to the individual **TransferParts**.

When you don't specify _toAmounts_, it means that the _fromAmount_ will be taken from _fromSeat_ and
given to _toSeat_.

## assertIssuerKeywords(zcf, expected)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **expected**: **Array&lt;String>**
- Returns: None.

Checks that the **[Keywords](./zoe-data-types#keyword)** in the _expected_ argument match what the contract expects.
The function throws an error if incorrect or extra **Keywords** are passed
in, or if there are **Keywords** missing. The **Keyword** order is irrelevant.

```js
import { assertIssuerKeywords } from '@agoric/zoe/src/contractSupport/index.js';

// Proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## satisfies(zcf, seat, update)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **seat**: **[ZCFSeat](./zcfseat)**
- **update**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)**
- Returns: **Boolean**

Returns **true** if an update to a **seat**'s **currentAllocation** satisfies its
**proposal.want**. Note this is half of the offer safety check;
it does not check if the **[Allocation](./zoe-data-types#allocation)** constitutes a refund.
The update is merged with **currentAllocation** such that
_update_'s values prevail if the **[Keywords](./zoe-data-types#keyword)** are the same. If they
are not the same, the **Keyword** and **value** is just added to the **currentAllocation**.

The following example code uses **satisfies()** to define a **satisfiedBy()** comparison
function between two **seats**. It checks if the second **seat** argument's _currentAllocation_
satisfies the first **seat** argument's **proposal.want**.

It then calls **satisfiedBy()** on both orders of the two **seats**. If both satisfy each other,
it does a swap on them.

```js
import { satisfies } from '@agoric/zoe/src/contractSupport/index.js';

const satisfiedBy = (xSeat, ySeat) =>
  satisfies(zcf, xSeat, ySeat.getCurrentAllocation());

if (satisfiedBy(offer, seat) && satisfiedBy(seat, offer)) {
  swap(zcf, seat, offer);
}
```

## swap(zcf, leftSeat, rightSeat)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **leftSeat**: **[ZCFSeat](./zcfseat)**
- **rightSeat**: **ZCFSeat**
- Returns: **defaultAcceptanceMsg**

For both **seats**, everything a **seat** wants is given to it, having been
taken from the other **seat**. **swap()** exits both **seats**.
Use **swap()** when all of these are true:

- Both **seats** use the same **[Keywords](./zoe-data-types#keyword)**.
- The **seats**' wants can be fulfilled from the other **seat**.
- No further **seat** interaction is desired.

If the two **seats** can trade, they swap their compatible assets,
exiting both **seats**. It returns the message **The offer has been accepted.
Once the contract has been completed, please check your payout**.

Any surplus remains with whichever **seat** has the surplus.
For example if **seat** A gives 5 Quatloos and **seat** B only
wants 3 Quatloos, **seat** A retains 2 Quatloos.

If the swap fails, no assets transfer, and both _leftSeat_ and _rightSeat_ are exited.

```js
import { swap } from '@agoric/zoe/src/contractSupport.js';

swap(zcf, firstSeat, secondSeat);
```

## swapExact(zcf, leftSeat, rightSeat)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **leftSeat**: **[ZCFSeat](./zcfseat)**
- **rightSeat**: **ZCFSeat**
- Returns: **defaultAcceptanceMsg**

For both seats, everything a seat wants is given to it, having been
taken from the other seat. **swapExact()** exits both seats.
Use **swapExact()** when both of these are true:

- The **seats**' wants can be fulfilled from the other **seat**.
- No further **seat** interaction is desired.

Note that unlike the **swap()** function, _leftSeat_ and _rightSeat_ don't necessarily use the same **[Keywords](./zoe-data-types#keyword)**.

**swapExact()** is a special case of **swap()** such that it is successful only
if both seats gain everything they want and lose everything they were willing to give.
It is only good for exact and entire swaps where each
seat wants everything that the other seat has. The benefit of using
this method is that the **Keywords** of each seat do not matter.

If the two **seats** can trade, they swap their compatible assets,
exiting both **seats**. It returns the message **The offer has been accepted.
Once the contract has been completed, please check your payout**.

If the swap fails, no assets transfer, and both _leftSeat_ and _rightSeat_ are exited.

```js
import { swapExact } from '@agoric/zoe/src/contractSupport/index.js';

const swapMsg = swapExact(zcf, zcfSeatA, zcfSeatB);
```

## fitProposalShape(seat, proposalShape)

- **seat**: **[ZCFSeat](./zcfseat)**
- **proposalShape**: **[Pattern](https://github.com/endojs/endo/tree/master/packages/patterns#readme)**
- Returns: None.

Checks the seat's proposal against the _proposalShape_ argument. If the proposal does not match _proposalShape_, the seat will be exited and all **[Payments](/reference/ertp-api/payment)** will be refunded.

## assertProposalShape(seat, expected)

- **seat**: **[ZCFSeat](./zcfseat)**
- **expected**: **ExpectedRecord**
- Returns: None.

Checks the seat's proposal against an _expected_ record that says
what shape of proposal is acceptable.

By "shape", we mean the **give**, **want**, and **exit** rule **[Keywords](./zoe-data-types#keyword)** of the proposal must be equal to
those in _expected_. Note that **exit** rule **Keywords** are optional in _expected_. Also, none of the
values of those **Keywords** are checked.

This **ExpectedRecord** is like a **Proposal**, but the amounts in **want**
and **give** should be **null**; the **exit** clause should specify a rule with
**null** contents. If the client submits a **Proposal** which does not match
these expectations, that **proposal** is rejected (and refunded).

```js
import { assertProposalShape } from '@agoric/zoe/src/contractSupport/index.js';

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

## assertNatAssetKind(zcf, brand)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **brand**: **[Brand](/reference/ertp-api/brand)**
- Returns: **Boolean**

Asserts that the _brand_ is [AssetKind.NAT](/reference/ertp-api/ertp-data-types#assetkind).
This means the corresponding **[Mint](/reference/ertp-api/mint)** creates fungible assets.

If **false** throws with message **brand must be AssetKind.NAT**.

```js
import { assertNatAssetKind } from '@agoric/zoe/src/contractSupport/index.js';

assertNatAssetKind(zcf, quatloosBrand);
```

## depositToSeat(zcf, recipientSeat, amounts, payments)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **recipientSeat**: **[ZCFSeat](./zcfseat)**
- **amounts**: **[AmountKeywordRecord](./zoe-data-types#allocation)**
- **payments**: **PaymentPKeywordRecord**
- Returns: **Promise&lt;String>**

Deposits payments such that their amounts are reallocated to a seat.
The **amounts** and **payments** records must have corresponding
**[Keywords](./zoe-data-types#keyword)**.

If the seat has exited, aborts with the message **The recipientSeat cannot have exited.**

On success, returns the exported and settable **depositToSeatSuccessMsg** which
defaults to **Deposit and reallocation successful.**

```js
import { depositToSeat } from '@agoric/zoe/src/contractSupport/index.js';

await depositToSeat(
  zcf,
  zcfSeat,
  { Dep: quatloos(2n) },
  { Dep: quatloosPayment },
);
```

## withdrawFromSeat(zcf, seat, amounts)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **seat**: **[ZCFSeat](./zcfseat)**
- **amounts**: **[AmountKeywordRecord](./zoe-data-types#allocation)**
- Returns: **Promise&lt;PaymentPKeywordRecord>**

Withdraws payments from a seat. Note that withdrawing the amounts of
the payments must not and cannot violate offer safety for the seat. The
**amounts** and **payments** records must have corresponding **[Keywords](./zoe-data-types#keyword)**.

If the seat has exited, aborts with the message **The seat cannot have exited.**

Unlike **depositToSeat()**, a **PaymentPKeywordRecord** is returned, not a success message.

```js
import { withdrawFromSeat } from '@agoric/zoe/src/contractSupport/index.js';

const paymentKeywordRecord = await withdrawFromSeat(zcf, zcfSeat, {
  With: quatloos(2n),
});
```

## saveAllIssuers(zcf, issuerKeywordRecord)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **issuerKeywordRecord**: **IssuerKeywordRecord**
- Returns: **Promise&lt;PaymentPKeywordRecord>**

Saves all of the issuers in an **IssuersKeywordRecord** to ZCF, using
the method [**zcf.saveIssuer()**](./zoe-contract-facet#zcf-saveissuer-issuer-keyword).

This does **not** error if any of the **[Keywords](./zoe-data-types#keyword)** already exist. If the **Keyword** is
already present, it is ignored.

```js
import { saveAllIssuers } from '@agoric/zoe/src/contractSupport/index.js';

await saveAllIssuers(zcf, { G: gIssuer, D: dIssuer, P: pIssuer });
```

## offerTo(zcf, invitation, keywordMapping, proposal, fromSeat, toSeat, offerArgs)

- **zcf**: **[ZoeContractFacet](./zoe-contract-facet)**
- **invitation**: **ERef&lt;[Invitation](./zoe-data-types#invitation)>**
- **keywordMapping**: **KeywordRecord**
- **proposal**: **Proposal**
- **fromSeat**: **[ZCFSeat](./zcfseat)**
- **toSeat**: **ZCFSeat**
- **offerArgs**: **Object**
- Returns: **OfferToReturns**

**offerTo()** makes an offer from your current contract instance (which
we'll call "contractA") to another contract instance (which we'll call
"contractB"). It withdraws offer payments from the _fromSeat_ in
contractA and deposits any payouts in the _toSeat_, also a contractA
seat. Note that _fromSeat_ and _toSeat_ may be the same seat, which is
the default condition (i.e. _toSeat_ is an optional parameter
defaulting to _fromSeat_'s value). **offerTo()** can be used to make an
offer from any contract instance to any other contract instance, as
long as the _fromSeat_ allows the withdrawal without violating
offer-safety. To be clear, this does mean that contractA and contractB
do not have to be instances of the same contract.

_zcf_ is contractA's Zoe contract facet. The _invitation_ parameter is an **Invitation**
to contractB. The _proposal_ parameter is the proposal part of the offer made to contractB.

_keywordMapping_ is a record of the **[Keywords](./zoe-data-types#keyword)** used in contractA mapped to the
**Keywords** for contractB. Note that the pathway to deposit the payout back to
contractA reverses this mapping. It looks like this, where the **Keywords** are
from the contracts indicated by using "A" or "B" in the **Keyword** name.

```js
// Map the keywords in contractA to the keywords in contractB
const keywordMapping = harden({
  TokenA1: 'TokenB1',
  TokenA2: 'TokenB2',
});
```

_offerArgs_ is an object that can be used to pass
additional arguments to the **offerHandler** of contractB's contract code.
Which arguments should be included within _offerArgs_ is determined by the
contract in question; each contract can define whatever additional arguments it requires. If no
additional arguments are defined for a particular contract, then the _offerArgs_ argument can be
omitted entirely. It is up to the contract code how it chooses to handle any unexpected or missing
arguments within _offerArgs_.

Contract code should be careful interacting with _offerArgs_. These values need input validation
before being used by the contract code since they are coming directly from the user and may
have malicious behavior.

The **OfferToReturns** return value is a promise for an object containing
the **userSeat** for the offer to the other contract, and a promise (**deposited**)
that resolves when the payout for the offer has been deposited to the **toSeat**.
Its two properties are:

- **userSeatPromise**: **Promise&lt;UserSeat>**
- **deposited**: **Promise&lt;AmountKeywordRecord>**

```js
const { userSeatPromise: AMMUserSeat, deposited } = zcf.offerTo(
  swapInvitation,
  keywordMapping, // {}
  proposal,
  fromSeat,
  lenderSeat,
);
```
