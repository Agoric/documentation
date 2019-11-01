# Zoe Governing Contract Facet

### <span style="color:red">Need clarification: In many methods the instanceHandle is referenced in the chaimail file, but in the code it is not used. Affected methods: reallocate, complete, burnEscrowReceipt</span>

## zgcf.reallocate(instanceHandle, offerHandles, reallocation)
- `instanceHandle` `{Object}`
- `offerHandles` `{Array <Object>}`
- `reallocation` `{Array <Array <Extent>>}`

Instruct Zoe to try reallocating for the given `offerHandles`. Reallocation is a matrix (array of arrays) where the rows are the extents to be paid to the player who made the offer at the same index in the `offerHandles` array. The reallocation will only happen if 'offer safety' and conservation of rights are true, as enforced by Zoe.

```js
import harden from '@agoric/harden';

// reallocate by switching the extents of the firstOffer and matchingOffer
zoe.reallocate(
  harden([firstOfferHandle, matchingOfferHandle]),
  harden([matchingOfferExtents, firstOfferExtents]),
);
```

## zgcf.complete(instanceHandle, offerHandles)
- `instanceHandle` `{Object}`
- `offerHandles` `{Array <Object>}`

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

### <span style="color:red"></span>
```js
import harden from '@agoric/harden';

zoe.complete(harden([someOfferHandle]));
```

## zgcf.escrowEmptyOffer()
- Returns: `{OfferHandle}`

Create an empty offer for recordkeeping purposes (Autoswap uses this to create the liquidity pool).

```js
let poolOfferHandle = zoe.escrowEmptyOffer();
```

## zgcf.escrowOffer(payoutRules, offerPayments)
- `payoutRules` `{Array <PayoutRulesElem>}`
- `offerPayments` `{Array <Payment>}`
- Returns: `{OfferHandle}`

Escrow an offer created by the smart contract. Autoswap uses this to mint liquidity tokens and add them to the rights managed by Zoe.

```js
const liquidityOfferHandle = await zoe.escrowOffer(
  harden([undefined, undefined, newPayment]),
);
```

## zgcf.burnEscrowReceipt(instanceHandle, escrowReceipt)
- `instanceHandle` `{Object}`
- `escrowReceipt` `{Payment}`
- Returns: `{Extent}`

Burn and validate an escrowReceipt received from the user.

```js
const { someExtent } = await zoe.burnEscrowReceipt(someEscrowReceipt);
```

## zgcf.makeInvite(offerToBeMade, useObj)
- `offerToBeMade` `{Array <PayoutRulesElem>}`
- `useObj` `{Object}`
- Returns: `{Payment}`

Create an invite using the Zoe `inviteMint`.

```js
import harden from '@agoric/harden';

const inviteP = zoe.makeInvite(
  harden({ matchOffer }),
);
```

(need to add this bit of info?)
 ////// The methods below are pure and have no side-effects. ////////

## zgcf.makeEmptyExtents()
- Returns: `{Array <Extent>}`

Create an array of empty extents per assay. Note that if the mint is not a basic fungible mint, this may be something other than 0.

```js
// Set the liquidity token extent in the array of extents that
// will be turned into payments sent back to the user.
const newPlayerExtents = zoe.makeEmptyExtents();
newPlayerExtents[2] = liquidityEOut;
```

## zgcf.getExtentOps(instanceHandle)
- `instanceHandle` `{Object}`
- Returns: `{Array <ExtentOps>}`

Get the array of `extentOps` (the logic from the `unitOps`).

### <span style="color:red">Could not find example</span>
```js

```

## zgcf.getExtentsFor(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: `{Array <Array <Extent>>}`

Pass in an array of offerHandles and get a matrix (array of arrays) containing the extents, in the same order as the offerHandles array.

```js
const [
  firstOfferExtents
   matchingOfferExtents
] = zoe.getExtentsFor(offerHandles);
```

## zgcf.getPayoutRulesFor(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: <router-link to="/zoe/api/structs.html#payoutrule">`{Array <PayoutRules>}`</router-link>

Pass in an array of `offerHandles` and get a matrix (array of arrays) containing the offer descriptions for the offers, in the same order as the `offerHandles` array.

```js
import harden from '@agoric/harden';

export const getActivePayoutRules = (zoe, offerHandles) => {
  const { active } = zoe.getStatusFor(offerHandles);
  return harden({
    offerHandles: active,
    payoutRulesArray: zoe.getPayoutRulesFor(active),
  });
};
```

## zgcf.getSeatAssay()
- Returns: `{Assay}`

Get the Zoe `seatAssay`.

### <span style="color:red">Couldn't find an example in the code, this needs checking.</span>
```js
const someSeatAssay = zoe.getSeatAssay()
```

## zgcf.getEscrowReceiptAssay()
- Returns: `{Assay}`

Get the Zoe `escrowReceiptAssay`.

```js
const escrowReceiptAssay = zoe.getEscrowReceiptAssay();
```