# Mint

Holding a Mint carries the right to control issuance and destruction of purses and payments containing `assetDescs` of a particular currency.
Purses and payments associated with a particular assay can only transfer value to others using the same mint.

## makeMint

### makeMint(description, makeConfig)

- `description` `{String}` - Description of the mint; becomes part of the label, and is used by the `descOps` to identify `assetDescs`
  authorized/acknowledged by the mint
- `makeConfig` `{MintConfigMaker}` - Default is for a basic fungible configuration
- Returns: `{Mint}`

`makeMint` takes in a string description as well as a function to make a configuration.

This configuration can be used to add custom methods to assays, payments, purses, and mints, and it also defines the functions to make the "mintKeeper" (the actual holder
of the mappings from purses/payments to "asset descriptions"--`assetDescs`) and to make the "asset description operations"--`descOps`
(the object that describes the "extent operations" `extentOps` of how `assetDescs` are withdrawn or deposted, among other things).

`descOps` must be compatible with the type of asset managed by the mint.

```js
import { makeMint } from '@agoric/ertp/core/mint';

// Make a mint for happyTownBucks with default basic fungible configuration
const happyTownBucks = makeMint('happyTownBucks');

// Make a mint for sadTownBucks with default basic fungible configuration
const sadTownBucks = makeMint('sadTownBucks');
```

### mint.getAssay()
- Returns: `{Assay}`

Get the Assay for this mint.

```js
import { makeMint } from '@agoric/ertp/core/mint';

// Make a mint
const happyTownBucks = makeMint('happyTownBucks');
// Get the assay for the mint
const assay = happyTownBucks.getAssay();
```

## Assay

An Assay represents the identity of an issuer. Holding an Assay provides the ability to create `assetDescs` and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

### assay.getLabel()
- Returns: `{Label}` The label for the assay.

Get the label for this Assay. Labels can be used to manually construct `assetDescs`.

```js
import { makeMint } from '@agoric/ertp/core/mint';
import config from 'customConfig.js';

// Initial mint
const happyTownBucks = makeMint('happyTownBucks');
const assay = happyTownBucks.getAssay();
const { description } = assay.getLabel();

// Make a child mint using the initial mint's description
const childMint = makeMint(description, config);
```

### assay.getDescOps()
- Returns: `{DescOps}` - returns the asset description operations for the Assay

Get the `DescOps` for this Assay.

```js
const galleryPixel = makeMint('galleryPixel');
const galleryPixelAssay = galleryPixel.getAssay();
const galleryPixelDescOps = galleryPixelAssay.getDescOps();
```

After getting the `DescOps` of an `Assay`, `DescOps` methods can be called to verify properties of the `assetDesc`. See the [DescOps API](/api/descOps) for all available methods.

```js
function insist(asset, assetDesc) {
  !assay.getDescOps().isEmpty(assetDesc)
  // no use rights present in assetDesc ${assetDesc}`;
}

function insistAssetHasAssetDesc(assay, asset, assetDesc) {
  insist(assay.getDescOps().includes(asset.getBalance(), assetDesc))
  // ERTP asset ${asset} does not include assetDesc ${assetDesc}`;
}

function getPixelList(assay, assetDesc) {
  return assay.getDescOps().extent(assetDesc);
}
```

### assay.getExtentOps()
- Returns: `{ExtentOps}`

Get the `ExtentOps` for this Assay.

```js
Examples
```
### assay.makeAssetDesc(extent)
Make an AssetDesc that contains the indicated extent.
- `extent` `{Extent}`

**Returns:** `{AssetDesc}`

```js
Examples
```

### assay.makeEmptyPurse(name)
Make an empty purse associated with this kind of right.

- `name` `{String}`

**Returns:** `{Purse}`

```js
Examples
```

### assay.combine(paymentsArray, name)
Combine multiple payments into one payment.

- `paymentsArray` `{Array <Payment>}` - A list of payments to combine into a new payment
- `name` `{String}` - Name to call this combination of payments

**Returns:** `{Payment}`

```js
Examples
```

### assay.split(payment, assetDescsArray)
Split a single payment into multiple payments, according to the `assetDescs` and names passed in.

- `payment` `{Payment}`
- `assetDescsArray` `{Array <AssetDesc>}`

**Returns:** `{Array <Payment>}`

```js
Examples
```

### assay.claimExactly(assetDesc, src, name)
Make a new `Payment` that has exclusive rights to all the contents of `src`. If `assetDesc` does not equal the balance of the `src` payment, throws error.

- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`

**Returns:** `{Payment}`

```js
Examples
```

### assay.claimAll(src, name)
Make a new `Payment` that has exclusive rights to all the contents of `src`.

- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`

**Returns:** `{Payment}`

```js
Examples
```

### assay.burnExactly(assetDesc, src)
Burn all of the rights from `src`. If `assetDesc` does not equal the balance of the `src` payment, throw error.

- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`

**Returns:** `{AssetDesc}`

```js
Examples
```

### assay.burnAll(src)
Burn all of the rights from `src`.

- `src` `{Payment}`

**Returns:** `{AssetDesc}`

```js
Examples
```

## Purse
Purses hold verified `assetDescs` of certain rights issued by Mints. Purses can transfer part of the balance they hold in a payment, which has a narrower interface. A purse's balance can rise and fall, through the action of depositExactly() and withdraw(). Operations on payments (`burnExactly()`, `depositExactly()`, `assay.claimExactly()`) kill the original payment and create new payments if applicable. The primary use for Purses and Payments is for currency-like and goods-like valuables, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

### purse.getName()
Get the name of this purse.

**Returns:** `{String}`

```js
Examples
```

### purse.getAssay()
# Double check this description, in the `.chainmail` file it says that this method get the assay for this **mint**
Get the Assay for this purse.

**Returns:** `{Assay}`

```js
Examples
```

### purse.getBalance()
Get the `assetDesc` contained in this purse, confirmed by the assay.

**Returns:** `{AssetDesc}`

```js
Examples
```

### purse.depositExactly(assetDesc, src)
# should this be srcPayment instead of src?
Deposit all the contents of `src` Payment into this purse, returning the `assetDesc`. If the `assetDesc` does not equal the balance of `src` Payment, throw error.

- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`

**Returns:** `{AssetDesc}`

```js
Examples
```

### purse.depositAll(srcPayment)
Deposit all the contents of `srcPayment` into this purse, returning the `assetDesc`.

- `srcPayment` `{Payment}`

**Returns:** `{AssetDesc}`

```js
Examples
```

### purse.withdraw(assetDesc, name)
Withdraw `assetDesc` from this purse into a new Payment.

- `assetDesc` `{AssetDesc}`
- `name` `{String}`

**Returns:** `{Payment}`

```js
Examples
```

### purse.withdrawAll(name)
Withdraw entire content of this purse into a new Payment.

- `name` `{String}`

**Returns:** `{Payment}`

```js
Examples
```

## Payment
Payments hold verified assetDescs of certain rights issued by Mints. AssetDescs from payments can be deposited in purses, but otherwise, the entire assetDesc is available when the payment is transferred. A payment's balance can only fall, through the action of `depositExactly()`, `claimExactly()` or `burnExactly()`. Payments can be converted to Purses by getting a verified assay and calling `assay.makeEmptyPurse().depositAll(payment)`;

### payment.getName()
Get the name of this purse.


**Returns:** `{String}`

```js
Examples
```

### payment.getAssay()
Get the Assay for this mint.


**Returns:** `{Assay}`

```js
Examples
```

### payment.getBalance()
Get the assetDesc contained in this payment, confirmed by the assay.


**Returns:** `{AssetDesc}`

```js
Examples
```

## Strategy
# Is it Strategy or ExtentOps?
All of the difference in how an descOps behaves can be reduced to the behavior of the set operations on quantities (think: arithmetic) such as `empty`, `with`, `without`, `includes`, etc. We extract this custom logic into a strategy. Strategies are about extent arithmetic, whereas DescOps are about AssetDescs, which are labeled quantities. DescOps use Strategies to do their extent arithmetic, and then label the results, making new AssetDescs.

### strategy.insistKind(allegedExtent)
Check the kind of this extent and throw if it is not the expected kind.

- `allegedExtent` `{Extent}`

**Returns:** `{Extent}`

```js
Examples
```

### strategy.empty()
Get the representation for empty.

**Returns:** `{Extent}`

```js
Examples
```

### strategy.isEmpty(extent)
Is the extent empty?

- `extent` `{Extent}`

**Returns:** `{boolean}`

```js
Examples
```

### strategy.includes(whole, part)
Does the whole include the part?

- `whole` `{Extent}`
- `part` `{Extent}`

**Returns:** `{boolean}`

```js
Examples
```

### strategy.equals(left, right)
Does left equal right?

- `left` `{Extent}`
- `right` `{Extent}`

**Returns:** `{Extent}`

```js
Examples
```

### strategy.with(left, right)
Return the left combined with the right

- `left` `{Extent}`
- `right` `{Extent}`

**Returns:** `{Extent}`

```js
Examples
```

### strategy.without(whole, part)
Return what remains after removing the part from the whole.

- `whole` `{Extent}`
- `part` `{Extent}`

**Returns:** `{Extent}`

```js
Examples
```
