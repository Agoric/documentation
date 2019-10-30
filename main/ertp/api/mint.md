# Mint

Holding a Mint carries the right to control issuance and destruction of purses and payments containing `units` of a particular currency.
Purses and payments associated with a particular assay can only transfer value to others using the same mint.

## makeMint

### makeMint(allegedName, makeConfig)

- `allegedName` `{String}` - Description of the mint; becomes part of
  the label used by the `unitOps`
- `makeConfig` `{MintConfigMaker}` - Default is for a basic fungible configuration
- Returns: `{Mint}`

`makeMint` takes in an allegedName as well as a function to make a configuration.

This configuration can be used to add custom methods to assays, payments, purses, and mints, and it also defines the functions to make the "mintKeeper" (the actual holder
of the mappings from purses/payments to `units`) and to make the `unitOps`
(the object that describes the "extent operations" `extentOps` of how `units` are withdrawn or deposited, among other things).

`unitOps` must be compatible with the type of asset managed by the mint.

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

An Assay represents the identity of an issuer. Holding an Assay provides the ability to create `units` and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

### assay.getLabel()
- Returns: `{Label}` The label for the assay.

Get the label for this Assay. Labels can be used to manually construct `units`.

```js
import { makeMint } from '@agoric/ertp/core/mint';
import config from 'customConfig.js';

// Initial mint
const happyTownBucks = makeMint('happyTownBucks');
const assay = happyTownBucks.getAssay();
const { allegedName } = assay.getLabel();

// Make a child mint using the initial mint's allegedName
const childMint = makeMint(allegedName, config);
```

### assay.getUnitOps()
- Returns: `{UnitOps}` - returns the unit operations for the Assay

Get the `UnitOps` for this Assay.

```js
const galleryPixel = makeMint('galleryPixel');
const galleryPixelAssay = galleryPixel.getAssay();
const galleryPixelUnitOps = galleryPixelAssay.getUnitOps();
```

After getting the `UnitOps` of an `Assay`, `UnitOps` methods can be called to verify properties of the `units`. See the [UnitOps API](/api/unitOps) for all available methods.

```js
function insist(asset, units) {
  !assay.getUnitOps().isEmpty(units);
  // no use rights present in units ${units}`;
}

function insistAssetHasUnits(assay, asset, units) {
  insist(assay.getUnitOps().includes(asset.getBalance(), units));
  // ERTP asset ${asset} does not include units ${units}`;
}

function getPixelList(assay, units) {
  return assay.getUnitOps().extent(units);
}
```

### assay.getExtentOps()
- Returns: `{ExtentOps}` - returns the extent operations for the Assay

Get the `ExtentOps` for this Assay.

```js
const exampleExtentOps = exampleAssay.getExtentOps();
```

### assay.makeUnits(extent)
- `extent` `{Extent}`
- Returns: `{Units}`

Make Units that contain the indicated extent.

```js
import { setup } from '../setupBasicMints';

const { assays: originalAssays, mints, unitOps } = setup();
const assays = originalAssays.slice(0, 2);

// In this scenario, purses are created for two different assays.
// We provide Units, containing an extent, from the Moola and Simolean assays to create the appropriate purses.
const aliceMoolaPurse = mints[0].mint(assays[0].makeUnits(3));
const aliceSimoleanPurse = mints[1].mint(assays[1].makeUnits(0));
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

### assay.split(payment, unitsArray)
- `payment` `{Payment}`
- `unitsArray` `{Array <Units>}`
- Returns: `{Array <Payment>}`

Split a single payment into multiple payments, according to the `units` and names passed in.

```js
// Assume a mint has already been set up.
const aliceMoolaPurse = mints[0].mint(assays[0].makeUnits(40));
const aliceMoolaPayment = aliceMoolaPurse.withdrawAll();
const moola10 = assays[0].makeUnits(10);
const moola20 = assays[0].makeUnits(20);

// The following divides the aliceMoolaPayment into three payments:
const aliceMoolaPayments = assays[0].split(aliceMoolaPayment, [
  moola10,
  moola10,
  moola20,
]);
// aliceMoolaPayments is now an array of three Payment objects, with balances of 10, 10, 20, respectively.
```

### assay.claimExactly(units, src, name)
- `units` `{Units}`
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`, optional
- Returns: `{Payment}`

Make a new `Payment` that has exclusive rights to all the contents of `src`. If `units` does not equal the balance of the `src` payment, throws error.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payment = await purse.withdraw(7);
const newPayment = await assay.claimExactly(7, payment);

// .claimExactly() will throw an error because the the balance of wrongPayment does not equal the units
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

### assay.burnExactly(units, src)
- `units` `{Units}`
- `src` `{Payment}`
- Returns: `{Units}`

Burn all of the rights from `src`. If `units` does not equal the balance of the `src` payment, throw error.

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
- Returns: `{Units}`

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
Purses hold verified `units` of certain rights issued by Mints. Purses can transfer part of the balance they hold in a payment, which has a narrower interface. A purse's balance can rise and fall, through the action of depositExactly() and withdraw(). Operations on payments (`burnExactly()`, `depositExactly()`, `assay.claimExactly()`) kill the original payment and create new payments if applicable. The primary use for Purses and Payments is for currency-like and goods-like valuables, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

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
const aliceMoolaPurse = mints[0].mint(assays[0].makeUnits(40));
const aliceSimoleanPurse = mints[0].mint(assays[1].makeUnits(40));

const moolaAssay = await E(aliceMoolaPurse).getAssay();
const simoleanAssay = await E(aliceSimoleanPurse).getAssay();
```

### purse.getBalance()
- Returns: `{Units}`

Get the `units` contained in this purse, confirmed by the assay.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

// Returns 1000
purse.getBalance();
```

### purse.depositExactly(units, src)
- `units` `{Units}`
- `src` `{Payment}`
- Returns: `{Units}`

Deposit all the contents of `src` Payment into this purse, returning the `units`. If the `units` does not equal the balance of `src` Payment, throw error.

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
- Returns: `{Units}`

Deposit all the contents of `srcPayment` into this purse, returning the `units`.

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

### purse.withdraw(units, name)
- `units` `{Units}`
- `name` `{String}` - Optional
- Returns: `{Payment}`

Withdraw `units` from this purse into a new Payment.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payments = [];
payments.push(purse.withdraw(20));

// Returns 20
payments.getBalance();
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
payment.getBalance();
```

## Payment
Payments hold verified units of certain rights issued by Mints. Units from payments can be deposited in purses, but otherwise, the entire unit is available when the payment is transferred. A payment's balance can only fall, through the action of `depositExactly()`, `claimExactly()` or `burnExactly()`. Payments can be converted to Purses by getting a verified assay and calling `assay.makeEmptyPurse().depositAll(payment)`;

### payment.getName()
- Returns: `{String}`

Get the name of this purse.

```js
Examples
```

### payment.getAssay()
- Returns: `{Assay}`

Get the Assay for this payment.

```js
const paymentAssay = anyPayment.getAssay();
```

### payment.getBalance()
- Returns: `{Units}`

Get the units contained in this payment, confirmed by the assay.

```js
import { makeMint } from './core/mint';

const mint = makeMint('fungible');
const assay = mint.getAssay();
const purse = mint.mint(1000);

const payments = [];
payments.push(purse.withdraw(20));

// Returns 20
payments.getBalance();
```

## ExtentOps
All of the difference in how an unitOps behaves can be reduced to the behavior of the set operations on extents (think: arithmetic) such as `empty`, `with`, `without`, `includes`, etc. We extract this custom logic into an extentOps. ExtentOps are about extent arithmetic, whereas UnitOps are about Units, which are labeled extents. UnitOps use ExtentOps to do their extent arithmetic, and then label the results, making new Units.

### extentOps.insistKind(allegedExtent)
- `allegedExtent` `{Extent}`
- Returns: `{Extent}`

Check the kind of this extent and throw if it is not the expected kind.

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const pixelList = [startPixel, secondPixel, thirdPixel];

// Creates an array of pixels
const pixelExtentOps = makePixelExtentOps();

// Successful check
pixelExtentOps.insistKind(pixelList));

// Throws error because pixelExtentOps expects an array
pixelExtentOps.insistKind(startPixel);
```

### extentOps.empty()
- Returns: `{Extent}`

Get the representation for empty.

```js
const empty = exampleExtentOps.empty();
```

### extentOps.isEmpty(extent)
- `extent` `{Extent}`
- Returns: `{boolean}`

Is the extent empty?

```js
const isExtentEmpty = exampleExtentOps.isEmpty(randomExtent);
```

### extentOps.includes(whole, part)
- `whole` `{Extent}`
- `part` `{Extent}`
- Returns: `{boolean}`

Does the whole include the part?

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const fourthPixel = { x: 9, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns true:
extentOps.include([], []);
extentOps.include([startPixel], []);
extentOps.include([startPixel], [startPixel]);
extentOps.include([startPixel, secondPixel], [startPixel]);

// returns false:
extentOps.include([], [startPixel]);
extentOps.include([startPixel], [secondPixel]);
extentOps.include([startPixel, thirdPixel], [secondPixel, fourthPixel]);
extentOps.include([startPixel, secondPixel, thirdPixel], [thirdPixel, fourthPixel]);
```

### extentOps.equals(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Does left equal right?

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns true:
extentOps.equals([], []);
extentOps.equals([startPixel], [startPixel]);

// returns false:
extentOps.equals([startPixel], []);
```

### extentOps.with(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return the left combined with the right

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns []
extentOps.with([], []);

// returns [startPixel]
extentOps.with([startPixel]), []);

// returns [startPixel]
extentOps.with([], [startPixel]);

// returns [startPixel]
extentOps.with([startPixel], [startPixel]);

// returns [startPixel, secondPixel]
extentOps.with([startPixel], [secondPixel]);

// returns [startPixel, secondPixel]
extentOps.with([startPixel, secondPixel], [startPixel]);
```

### extentOps.without(whole, part)
- `whole` `{Extent}`
- `part` `{Extent}`
- Returns: `{Extent}`

Return what remains after removing the part from the whole.

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns []
extentOps.without([]), []);

// returns [startPixel]
extentOps.without([startPixel]), []);

// throws error
extentOps.without([]), [startPixel]);
```
