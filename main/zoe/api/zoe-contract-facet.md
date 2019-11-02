# Zoe Contract Facet

## zcf.reallocate(offerHandles, reallocation)
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

## zcf.complete(offerHandles)
- `offerHandles` `{Array <Object>}`

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
import harden from '@agoric/harden';

zoe.complete(harden([someOfferHandle]));
```

## zcf.escrowEmptyOffer()
- Returns: `{OfferHandle}`

Create an empty offer for recordkeeping purposes (Autoswap uses this to create the liquidity pool).

```js
let poolOfferHandle = zoe.escrowEmptyOffer();
```

## zcf.escrowOffer(payoutRules, offerPayments)
- `payoutRules` `{Array <PayoutRulesElem>}`
- `offerPayments` `{Array <Payment>}`
- Returns: `{OfferHandle}`

Escrow an offer created by the smart contract. Autoswap uses this to mint liquidity tokens and add them to the rights managed by Zoe.

```js
const liquidityOfferHandle = await zoe.escrowOffer(
  harden([undefined, undefined, newPayment]),
);
```

## zcf.burnEscrowReceipt(escrowReceipt)
- `escrowReceipt` `{Payment}`
- Returns: `{Extent}`

Burn and validate an escrowReceipt received from the user.

```js
const { someExtent } = await zoe.burnEscrowReceipt(someEscrowReceipt);
```

## zcf.makeInvite(offerToBeMade, useObj)
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

## zcf.makeEmptyExtents()
- Returns: `{Array <Extent>}`

Create an array of empty extents per assay. Note that if the mint is not a basic fungible mint, this may be something other than 0.

```js
// Set the liquidity token extent in the array of extents that
// will be turned into payments sent back to the user.
const newPlayerExtents = zoe.makeEmptyExtents();
newPlayerExtents[2] = liquidityEOut;
```

## zcf.getExtentOps(instanceHandle)
- `instanceHandle` `{Object}`
- Returns: `{Array <ExtentOps>}`

Get the array of `extentOps` (the logic from the `unitOps`).

```js
const extentOpsArray = zoe.getExtentOpsArray();
const assetEqual = extentOpsArray[0].equals(
  sellOffer[0].units.extent,
  buyOffer[0].units.extent,
);
```

## zcf.getExtentsFor(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: `{Array <Array <Extent>>}`

Pass in an array of offerHandles and get a matrix (array of arrays) containing the extents, in the same order as the offerHandles array.

```js
const [
  firstOfferExtents
   matchingOfferExtents
] = zoe.getExtentsFor(offerHandles);
```

## zcf.getPayoutRulesFor(offerHandles)
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

## zcf.getSeatAssay()
- Returns: `{Assay}`

Get the Zoe `seatAssay`.

### <span style="color:red">Couldn't find an example in the code, this needs checking.</span>
```js
const someSeatAssay = zoe.getSeatAssay()
```

## zcf.getEscrowReceiptAssay()
- Returns: `{Assay}`

Get the Zoe `escrowReceiptAssay`.

```js
const escrowReceiptAssay = zoe.getEscrowReceiptAssay();
```