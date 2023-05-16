# ZoeHelper Functions

The ZoeHelper functions extract common contract code and
patterns into reusable helpers.

All of the ZoeHelper functions are described below. To use any of them, import them
directly from **@agoric/zoe/src/contractSupport/index.js**. For example, the
following imports the two ZoeHelper functions **[assertIssuerKeywords()](#assertissuerkeywords-zcf-expected)** and
**[assertProposalShape()](#assertproposalshape-seat-expected)**:

```js
import {
  assertIssuerKeywords,
  assertProposalShape
} from '@agoric/zoe/src/contractSupport/index.js';
```

ZoeHelper functions are contract helpers, in that they are useful to contract code. 
Contracts are started up by Zoe, 
and **zcf** is passed in as a parameter to **start()**. 

## atomicRearrange(zcf, transfers)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)** 
- **transfers**: **TransferPart[]**
- Returns: None.

Asks Zoe to rearrange the [Allocation](./zoe-data-types.md#allocation) among the seats
mentioned in *transfers*. This is a set of changes to allocations that must satisfy
 * several constraints. If these constraints are all met, then the
 * reallocation happens atomically. Otherwise it does not happen
 * at all.
 *

* All the mentioned seats are still live -- enforced by ZCF.
* The overall transfer is expressed as an array of `TransferPart`.
 *      Each individual `TransferPart` is one of
 *       - A transfer from a `fromSeat` to a `toSeat`.
 *         This is not needed for Zoe's safety, as Zoe does
           its own overall conservation check. Rather, it helps catch
           and diagnose contract bugs earlier.
 *       - A taking from a `fromSeat`'s allocation. See the `fromOnly`
           helper.
         - A giving into a `toSeat`'s allocation. See the `toOnly`
           helper.


## assertIssuerKeywords(zcf, expected)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)** 
- **expected**: **Array&lt;String>**
- Returns: None.

Checks that the **[Keywords](./zoe-data-types.md#keyword)** in the *expected* argument match what the contract expects. 
The function throws an error if incorrect or extra **Keywords** are passed
in, or if there are **Keywords** missing. The **Keyword** order is irrelevant.

```js
import {
  assertIssuerKeywords
} from '@agoric/zoe/src/contractSupport/index.js';

// proposals for this contract instance use keywords 'Asset' and 'Price'
assertIssuerKeywords(zcf, harden(['Asset', 'Price']));
```

## satisfies(zcf, seat, update)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **seat**: **[ZCFSeat](./zcfseat.md)**
- **update**: **[AmountKeywordRecord](./zoe-data-types.md#amountkeywordrecord)**
- Returns: **Boolean** 

Returns **true** if an update to a **seat**'s **currentAllocation** satisfies its
**proposal.want**. Note this is half of the offer safety check; 
it does not check if the **[Allocation](./zoe-data-types.md#allocation)** constitutes a refund.
The update is merged with **currentAllocation** such that
*update*'s values prevail if the **[Keywords](./zoe-data-types.md#keyword)** are the same. If they
are not the same, the **Keyword** and **value** is just added to the **currentAllocation**.

The following example code uses **satisfies()** to define a **satisfiedBy()** comparison
function between two **seats**. It checks if the second **seat** argument's *currentAllocation*
satisfies the first **seat** argument's **proposal.want**. 

It then calls **satisfiedBy()** on both orders of the two **seats**. If both satisfy each other,
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

## swap(zcf, leftSeat, rightSeat)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **leftSeat**: **[ZCFSeat](./zcfseat.md)**
- **rightSeat**: **ZCFSeat**
- Returns: **defaultAcceptanceMsg**

For both **seats**, everything a **seat** wants is given to it, having been
taken from the other **seat**. **swap()** exits both **seats**.
Use **swap()** when all of these are true:
  - Both **seats** use the same **[Keywords](./zoe-data-types.md#keyword)**.
  - The **seats**' wants can be fulfilled from the other **seat**.
  - No further **seat** interaction is desired.

If the two **seats** can trade, they swap their compatible assets,
exiting both **seats**. It returns the message **The offer has been accepted. 
Once the contract has been completed, please check your payout**.

Any surplus remains with whichever **seat** has the surplus. 
For example if **seat** A gives 5 Quatloos and **seat** B only 
wants 3 Quatloos, **seat** A retains 2 Quatloos.

If the swap fails, no assets transfer, and both *leftSeat* and *rightSeat* are exited.

```js
import {
  swap
} from '@agoric/zoe/src/contractSupport.js';

swap(zcf, firstSeat, secondSeat);
```

## swapExact(zcf, leftSeat, rightSeat)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **leftSeat**: **[ZCFSeat](./zcfseat.md)**
- **rightSeat**: **ZCFSeat**
- Returns: **defaultAcceptanceMsg**

For both seats, everything a seat wants is given to it, having been
taken from the other seat. **swapExact()** exits both seats.
Use **swapExact()** when both of these are true:
  - The **seats**' wants can be fulfilled from the other **seat**.
  - No further **seat** interaction is desired.

Note that unlike the **swap()** function, *leftSeat* and *rightSeat* don't necessarily use the same **[Keywords](./zoe-data-types.md#keyword)**.

**swapExact()** is a special case of **swap()** such that it is successful only
if both seats gain everything they want and lose everything they were willing to give.
It is only good for exact and entire swaps where each
seat wants everything that the other seat has. The benefit of using
this method is that the **Keywords** of each seat do not matter.

If the two **seats** can trade, they swap their compatible assets,
exiting both **seats**. It returns the message **The offer has been accepted. 
Once the contract has been completed, please check your payout**.

If the swap fails, no assets transfer, and both *leftSeat* and *rightSeat* are exited.

```js
import {
  swapExact
} from '@agoric/zoe/src/contractSupport/index.js';

const swapMsg = swapExact(zcf, zcfSeatA, zcfSeatB);
```

## fitProposalShape(seat, proposalShape)
- **seat**: **[ZCFSeat](./zcfseat.md)**
- **proposalShape**: **Pattern**
- Returns: None.

Checks the seat's proposal against the *proposalShape* argument. If the proposal does not match *proposalShape*, the seat will be exited and all **[Payments](/reference/ertp-api/payment.md)** will be refunded.

## assertProposalShape(seat, expected)
- **seat**: **[ZCFSeat](./zcfseat.md)**
- **expected**: **ExpectedRecord**
- Returns: None.

Checks the seat's proposal against an *expected* record that says
what shape of proposal is acceptable.
 
By "shape", we mean the **give**, **want**, and **exit** rule **[Keywords](./zoe-data-types.md#keyword)** of the proposal must be equal to 
those in *expected*. Note that **exit** rule **Keywords** are optional in *expected*. Also, none of the 
values of those **Keywords** are checked.

This **ExpectedRecord** is like a **Proposal**, but the amounts in **want**
and **give** should be **null**; the **exit** clause should specify a rule with
**null** contents. If the client submits a **Proposal** which does not match
these expectations, that **proposal** is rejected (and refunded). 

```js
import {
  assertProposalShape
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

## assertNatAssetKind(zcf, brand)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **brand**: **[Brand](/reference/ertp-api/brand.md)**
- Returns: **Boolean**

Asserts that the *brand* is [AssetKind.NAT](/reference/ertp-api/ertp-data-types.md#assetkind).
This means the corresponding **[Mint](/reference/ertp-api/mint.md)** creates fungible assets.

If **false** throws with message **brand must be AssetKind.NAT**.

```js
import {
  assertNatAssetKind
} from '@agoric/zoe/src/contractSupport/index.js';

assertNatAssetKind(zcf, quatloosBrand);
```

## depositToSeat(zcf, recipientSeat, amounts, payments)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **recipientSeat**: **[ZCFSeat](./zcfseat.md)**
- **amounts**: **[AmountKeywordRecord](./zoe-data-types.md#allocation)**
- **payments**: **PaymentKeywordRecord**
- Returns: **Promise&lt;String>**

Deposits payments such that their amounts are reallocated to a seat.
The **amounts** and **payments** records must have corresponding
**[Keywords](./zoe-data-types.md#keyword)**.

If the seat has exited, aborts with the message **The recipientSeat cannot have exited.**

On success, returns the exported and settable **depositToSeatSuccessMsg** which
defaults to **Deposit and reallocation successful.**
```js
import {
  depositToSeat,
} from '@agoric/zoe/src/contractSupport/index.js';
await depositToSeat(zcf, zcfSeat, { Dep: quatloos(2n) }, { Dep: quatloosPayment });
```

## withdrawFromSeat(zcf, seat, amounts)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **seat**: **[ZCFSeat](./zcfseat.md)**
- **amounts**: **[AmountKeywordRecord](./zoe-data-types.md#allocation)**
- Returns: **Promise&lt;PaymentKeywordRecord>**

Withdraws payments from a seat. Note that withdrawing the amounts of
the payments must not and cannot violate offer safety for the seat. The
**amounts** and **payments** records must have corresponding **[Keywords](./zoe-data-types.md#keyword)**.

If the seat has exited, aborts with the message **The seat cannot have exited.**

Unlike **depositToSeat()**, a **PaymentKeywordRecord** is returned, not a success message.
```js
import {
  withdrawFromSeat
} from '@agoric/zoe/src/contractSupport/index.js';
const paymentKeywordRecord = await withdrawFromSeat(zcf, zcfSeat, { With: quatloos(2n) });
```

## saveAllIssuers(zcf, issuerKeywordRecord)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **issuerKeywordRecord**: **IssuerKeywordRecord**
- Returns: **Promise&lt;PaymentKeywordRecord>**

Saves all of the issuers in an **IssuersKeywordRecord** to ZCF, using
the method [**zcf.saveIssuer()**](./zoe-contract-facet.md#zcf-saveissuer-issuer-keyword).

This does **not** error if any of the [Keywords](./zoe-data-types.md#keyword) already exist. If the **Keyword** is
already present, it is ignored.

```js
import {
  saveAllIssuers,
} from '@agoric/zoe/src/contractSupport/index.js';
await saveAllIssuers(zcf, { G: gIssuer, D: dIssuer, P: pIssuer });
```

## offerTo(zcf, invitation, keywordMapping, proposal, fromSeat, toSeat, offerArgs)
- **zcf**: **[ZoeContractFacet](./zoe-contract-facet.md)**
- **invitation**: **ERef&lt;[Invitation](./zoe-data-types.md#invitation)>**
- **keywordMapping**: **KeywordRecord**
- **proposal**: **Proposal**
- **fromSeat**: **[ZCFSeat](./zcfseat.md)**
- **toSeat**: **ZCFSeat**
- **offerArgs**: **Object**
- Returns: **OfferToReturns**

**offerTo()** makes an offer from your current contract instance (which
we'll call "contractA") to another contract instance (which we'll call
"contractB"). It withdraws offer payments from the *fromSeat* in
contractA and deposits any payouts in the *toSeat*, also a contractA
seat. Note that *fromSeat* and *toSeat* may be the same seat, which is
the default condition (i.e. *toSeat* is an optional parameter
defaulting to *fromSeat*'s value). **offerTo()** can be used to make an
offer from any contract instance to any other contract instance, as
long as the *fromSeat* allows the withdrawal without violating
offer-safety. To be clear, this does mean that contractA and contractB
do not have to be instances of the same contract. 

*zcf* is contractA's Zoe contract facet. The *invitation* parameter is an **Invitation** 
to contractB. The *proposal* parameter is the proposal part of the offer made to contractB.

*keywordMapping* is a record of the **[Keywords](./zoe-data-types.md#keyword)** used in contractA mapped to the 
**Keywords** for contractB. Note that the pathway to deposit the payout back to
contractA reverses this mapping. It looks like this, where the **Keywords** are
from the contracts indicated by using "A" or "B" in the **Keyword** name.
```js
// Map the keywords in contractA to the keywords in contractB
  const keywordMapping = harden({
    TokenA1: 'TokenB1',
    TokenA2: 'TokenB2'
  });
```

*offerArgs* is an object that can be used to pass
additional arguments to the **offerHandler** of contractB's contract code.
Which arguments should be included within *offerArgs* is determined by the
contract in question; each contract can define whatever additional arguments it requires. If no
additional arguments are defined for a particular contract, then the *offerArgs* argument can be
omitted entirely. It is up to the contract code how it chooses to handle any unexpected or missing
arguments within *offerArgs*.

Contract code should be careful interacting with *offerArgs*. These values need input validation
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
   lenderSeat
 );
```
