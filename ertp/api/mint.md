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
  !assay.getDescOps().isEmpty(assetDesc);
  // no use rights present in assetDesc ${assetDesc}`;
}

function insistAssetHasAssetDesc(assay, asset, assetDesc) {
  insist(assay.getDescOps().includes(asset.getBalance(), assetDesc));
  // ERTP asset ${asset} does not include assetDesc ${assetDesc}`;
}

function getPixelList(assay, assetDesc) {
  return assay.getDescOps().extent(assetDesc);
}
```

### assay.getExtentOps()
- Returns: `{ExtentOps}` - returns the extent operations for the Assay

Get the `ExtentOps` for this Assay.

```js
const exampleExtentOps = exampleAssay.getExtentOps();
```

### assay.makeAssetDesc(extent)
- `extent` `{Extent}`
- Returns: `{AssetDesc}`

Make an AssetDesc that contains the indicated extent.

```js
import { setup } from '../setupBasicMints';

const { assays: originalAssays, mints, descOps } = setup();
const assays = originalAssays.slice(0, 2);

// In this scenario, purses are created for two different assays.
// We provide an AssetDesc, containing an extent, from the Moola and Simolean assays to create the appropriate purses.
const aliceMoolaPurse = mints[0].mint(assays[0].makeAssetDesc(3));
const aliceSimoleanPurse = mints[1].mint(assays[1].makeAssetDesc(0));
```

### assay.makeEmptyPurse(name)
- `name` `{String}`
- Returns: `{Purse}`

Make an empty purse associated with this kind of right.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();

// After creating an assay you can create an empty purse:
const targetPurse = assay.makeEmptyPurse();

// Returns 0
targetPurse.getBalance();
```

### assay.combine(paymentsArray, name)
- `paymentsArray` `{Array <Payment>}` - A list of payments to combine into a new payment
- `name` `{String}` - Name to call this combination of payments
- Returns: `{Payment}`

Combine multiple payments into one payment.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

// Create a payments array. Each element, or payment, has a value of 1.
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(purse.withdraw(1));
}

// Combine all the payments in the`payments` array
const combinedPayment = assay.combine(payments);

// Returns 100
combinedPayment.getBalance();
```

### assay.split(payment, assetDescsArray)
- `payment` `{Payment}`
- `assetDescsArray` `{Array <AssetDesc>}`
- Returns: `{Array <Payment>}`

Split a single payment into multiple payments, according to the `assetDescs` and names passed in.

```js
// Assume a mint has already been set up.
const aliceMoolaPurse = mints[0].mint(assays[0].makeAssetDesc(40));
const aliceMoolaPayment = aliceMoolaPurse.withdrawAll();
const moola10 = assays[0].makeAssetDesc(10);
const moola20 = assays[0].makeAssetDesc(20);

// The following divides the aliceMoolaPayment into three payments:
const aliceMoolaPayments = assays[0].split(aliceMoolaPayment, [
  moola10,
  moola10,
  moola20,
]);
// aliceMoolaPayments is now an array of three Payment objects, with balances of 10, 10, 20, respectively.
```

### assay.claimExactly(assetDesc, src, name)
- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`, optional
- Returns: `{Payment}`

Make a new `Payment` that has exclusive rights to all the contents of `src`. If `assetDesc` does not equal the balance of the `src` payment, throws error.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = await purse.withdraw(7);
const newPayment = await assay.claimExactly(7, payment);

// .claimExactly() will throw an error because the the balance of wrongPayment does not equal the assetDesc
const wrongPayment = await purse.withdraw(7);
const wrongNewPayment = await assay.claimExactly(8, wrongPayment);
```

### assay.claimAll(src, name)
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`
- Returns: `{Payment}`

Make a new `Payment` that has exclusive rights to all the contents of `src`.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = await purse.withdraw(10);
const newPayment = await assay.claimAll(payment);

// Returns 10
newPayment.getBalance();
```

### assay.burnExactly(assetDesc, src)
- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`
- Returns: `{AssetDesc}`

Burn all of the rights from `src`. If `assetDesc` does not equal the balance of the `src` payment, throw error.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = await purse.withdraw(10);

// Throws error:
await assay.burnExactly(6, payment);

// Successful burn:
await assay.burnExactly(10, payment);
```

### assay.burnAll(src)
- `src` `{Payment}`
- Returns: `{AssetDesc}`

Burn all of the rights from `src`.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = await purse.withdraw(10);
await assay.burnAll(payment);
```

## Purse
Purses hold verified `assetDescs` of certain rights issued by Mints. Purses can transfer part of the balance they hold in a payment, which has a narrower interface. A purse's balance can rise and fall, through the action of depositExactly() and withdraw(). Operations on payments (`burnExactly()`, `depositExactly()`, `assay.claimExactly()`) kill the original payment and create new payments if applicable. The primary use for Purses and Payments is for currency-like and goods-like valuables, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

### purse.getName()
- Returns: `{String}`

Get the name of this purse.

```js
Examples
```

### purse.getAssay()
- Returns: `{Assay}`

Get the Assay for this purse.

```js
// Assume a mint has already been set up.
const aliceMoolaPurse = mints[0].mint(assays[0].makeAssetDesc(40));
const aliceSimoleanPurse = mints[0].mint(assays[1].makeAssetDesc(40));

const moolaAssay = await E(aliceMoolaPurse).getAssay();
const simoleanAssay = await E(aliceSimoleanPurse).getAssay();
```

### purse.getBalance()
- Returns: `{AssetDesc}`

Get the `assetDesc` contained in this purse, confirmed by the assay.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

// Returns 1000
purse.getBalance();
```

### purse.depositExactly(assetDesc, src)
- `assetDesc` `{AssetDesc}`
- `src` `{Payment}`
- Returns: `{AssetDesc}`

Deposit all the contents of `src` Payment into this purse, returning the `assetDesc`. If the `assetDesc` does not equal the balance of `src` Payment, throw error.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);
const targetPurse = assay.makeEmptyPurse();
const payment = await purse.withdraw(7);

// Throws error
await wrongTargetPurse.depositExactly(8, payment);

// Successful deposit
await targetPurse.depositExactly(7, payment);
```

### purse.depositAll(srcPayment)
- `srcPayment` `{Payment}`
- Returns: `{AssetDesc}`

Deposit all the contents of `srcPayment` into this purse, returning the `assetDesc`.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);
const targetPurse = assay.makeEmptyPurse();

const payment = await purse.withdraw(22);
await targetPurse.despositAll(payment);

// Returns 22
targetPurse.getBalance();
```

### purse.withdraw(assetDesc, name)
- `assetDesc` `{AssetDesc}`
- `name` `{String}` - Optional
- Returns: `{Payment}`

Withdraw `assetDesc` from this purse into a new Payment.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payments = [];
payments.push(purse.withdraw(20));

// Returns 20
payments.getBalance()
```

### purse.withdrawAll(name)
- `name` `{String}`
- Returns: `{Payment}`

Withdraw entire content of this purse into a new Payment.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = purse.withdrawAll();

// Returns 1000
payment.getBalance()
```

## Payment
Payments hold verified assetDescs of certain rights issued by Mints. AssetDescs from payments can be deposited in purses, but otherwise, the entire assetDesc is available when the payment is transferred. A payment's balance can only fall, through the action of `depositExactly()`, `claimExactly()` or `burnExactly()`. Payments can be converted to Purses by getting a verified assay and calling `assay.makeEmptyPurse().depositAll(payment)`;

### payment.getName()
Get the name of this purse.


- Returns: `{String}`

```js
Examples
```

### payment.getAssay()
Get the Assay for this mint.


- Returns: `{Assay}`

```js
Examples
```

### payment.getBalance()
Get the assetDesc contained in this payment, confirmed by the assay.


- Returns: `{AssetDesc}`

```js
Examples
```

## ExtentOps
All of the difference in how an descOps behaves can be reduced to the behavior of the set operations on quantities (think: arithmetic) such as `empty`, `with`, `without`, `includes`, etc. We extract this custom logic into an extentOps. ExtentOps are about extent arithmetic, whereas DescOps are about AssetDescs, which are labeled quantities. DescOps use ExtentOps to do their extent arithmetic, and then label the results, making new AssetDescs.

### extentOps.insistKind(allegedExtent)
Check the kind of this extent and throw if it is not the expected kind.

- `allegedExtent` `{Extent}`

- Returns: `{Extent}`

```js
Examples
```

### extentOps.empty()
Get the representation for empty.

- Returns: `{Extent}`

```js
Examples
```

### extentOps.isEmpty(extent)
Is the extent empty?

- `extent` `{Extent}`

- Returns: `{boolean}`

```js
Examples
```

### extentOps.includes(whole, part)
Does the whole include the part?

- `whole` `{Extent}`
- `part` `{Extent}`

- Returns: `{boolean}`

```js
Examples
```

### extentOps.equals(left, right)
Does left equal right?

- `left` `{Extent}`
- `right` `{Extent}`

- Returns: `{Extent}`

```js
Examples
```

### extentOps.with(left, right)
Return the left combined with the right

- `left` `{Extent}`
- `right` `{Extent}`

- Returns: `{Extent}`

```js
Examples
```

### extentOps.without(whole, part)
Return what remains after removing the part from the whole.

- `whole` `{Extent}`
- `part` `{Extent}`

- Returns: `{Extent}`

```js
Examples
```
