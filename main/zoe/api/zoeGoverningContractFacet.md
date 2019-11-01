# Zoe Governing Contract Facet

## zgcf.reallocate(instanceHandle, offerHandles, reallocation)
- `instanceHandle` `{Object}`
- `offerHandles` `{Array <Object>}`
- `reallocation` `{Array <Array <Extent>>}`

Instruct Zoe to try reallocating for the given offerHandles. Reallocation is a matrix (array of arrays) where the rows are the extents to be paid to the player who made the offer at the same index in the offerHandles array. The reallocation will only happen if 'offer safety' and conservation of rights are true, as enforced by Zoe.

```js
```

## zgcf.complete(instanceHandle, offerHandles)
- `instanceHandle` `{Object}`
- `offerHandles` `{Array <Object>}`

Eject the offer, taking the current allocation for that offer and creating payments to be returned to the user. No 'offer safety' checks are done here because any previous reallocation performed those checks.

```js
```

## zgcf.escrowEmptyOffer()
- Returns: `offerHandle`

Create an empty offer for recordkeeping purposes (Autoswap uses this to create the liquidity pool).

```js
```

## zgcf.escrowOffer(payoutRules, offerPayments)
- `payoutRules` `{Array <PayoutRulesElem>}`
- `offerPayments` `{Array <Payment>}`
- Returns: `offerHandle`

Escrow an offer created by the smart contract. Autoswap uses this to mint liquidity tokens and add them to the rights managed by Zoe.

```js
```

## zgcf.burnEscrowReceipt(instanceHandle, escrowReceipt)
- `instanceHandle` `{Object}`
- `escrowReceipt` `{Payment}`
- Returns: `{Extent}`

Burn and validate an escrowReceipt received from the user.

```js
```

## zgcf.makeInvite(offerToBeMade, useObj)
- `offerToBeMade` `{Array <PayoutRulesElem>}`
- `useObj` `{Object}`
- Returns: `{Payment}`

Create an invite using the Zoe `inviteMint`.

```js
```

(need to add this bit of info?)
 ////// The methods below are pure and have no side-effects. ////////

 ## zgcf.makeEmptyExtents()
- Returns: `{Array <Extent>}`

Create an array of empty extents per assay. Note that if the mint is not a basic fungible mint, this may be something other than 0.

```js
```

## zgcf.getExtentOps(instanceHandle)
- `instanceHandle` `{Object}`
- Returns: `{Array <ExtentOps>}`

Get the array of `extentOps` (the logic from the `unitOps`).

```js
```

## zgcf.getExtentsFor(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: `{Array <Array <Extent>>}`

Pass in an array of offerHandles and get a matrix (array of arrays) containing the extents, in the same order as the offerHandles array.

```js
```

## zgcf.getPayoutRulesFor(offerHandles)
- `offerHandles` `{Array <Object>}`
- Returns: <router-link to="/zoe/api/structs.html#payoutrule">`{Array <PayoutRules>}`</router-link>

Pass in an array of `offerHandles` and get a matrix (array of arrays) containing the offer descriptions for the offers, in the same order as the `offerHandles` array.

```js
```

## zgcf.getSeatAssay()
- Returns: `{Assay}`

Get the Zoe `seatAssay`.

```js
```

## zgcf.getEscrowReceiptAssay()
- Returns: `{Assay}`

Get the Zoe `escrowReceiptAssay`.

```js
```