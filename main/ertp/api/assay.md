# Assay

An Assay represents the identity of an issuer. Holding an Assay provides the ability to create `units` and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

## assay.getLabel()
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

## assay.getUnitOps()
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

## assay.getExtentOps()
- Returns: `{ExtentOps}` - returns the extent operations for the Assay

Get the `ExtentOps` for this Assay.

```js
const exampleExtentOps = exampleAssay.getExtentOps();
```

## assay.makeUnits(extent)
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

## assay.makeEmptyPurse(name)
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

## assay.combine(paymentsArray, name)
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

## assay.split(payment, unitsArray)
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

## assay.claimExactly(units, src, name)
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

## assay.claimAll(src, name)
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

## assay.burnExactly(units, src)
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

## assay.burnAll(src)
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
