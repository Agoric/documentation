# Mint Configuration

## What is a configuration?

Configurations add custom methods to payments, purses, and mints, defines the functions to make the "mintKeeper" (the actual holder of the mappings from purses/payments to amounts), and makes the "assay" (the object that describes the strategy of how amounts are withdrawn or deposited, among other things).

## When is it used?

`makeMint` takes in a function to make a configuration. `makeMint` uses a basic fungible configuration if none is passed in. Fungible tokens (our default for mints) do not customize payments, purses, etc. They use the "basic" mintKeeper (the place where the amounts per purse and payment are recorded) and use the "Nat" assay, in which amounts are natural numbers and use subtraction and addition.

## Basic configuration function

The function to make a configuration should return an object with the following properties:

- `makePaymentTrait` - hardened `{Object}`
- `makePurseTrait` - hardened `{Object}`
- `makeMintTrait` - hardened `{Object}`
- `makeAssayTrait` - hardened `{Object}`
- `makeMintKeeper` - hardened `{Object}`
- `extentOpsName` - `{String}`
- `extentOpsArgs` - `{Array}`

```js
import harden from '@agoric/harden';
import { makeCoreMintKeeper } from './@agoric/core/config/coreMintKeeper';

function* makePaymentTrait(_corePayment) {
  yield harden({});
}

function* makePurseTrait(_corePurse) {
  yield harden({});
}

function* makeMintTrait(_coreMint) {
  yield harden({});
}

function* makeAssayTrait(_coreAssay) {
  yield harden({});
}

const noCustomization = harden({
  makePaymentTrait,
  makePurseTrait,
  makeMintTrait,
  makeAssayTrait,
});

function makeBasicFungibleConfig() {
  return harden({
    ...noCustomization,

    makeMintKeeper: makeCoreMintKeeper,

    extentOpsName: 'natExtentOps',

    extentOpsArgs: []
  });
}
```

## Make traits

### function* makePaymentTrait(_corePayment)
- `_corePayment` `{Payment}`
- Returns: `{Object}` - a hardened object with specified configurations, if any

Modifying this object gives payments additional configurations.

See [seatConfig](https://github.com/Agoric/ERTP/blob/master/core/config/seatConfig.js) for an example.

### function* makePurseTrait(_corePurse)
- `_corePurse` `{Purse}`
- Returns: `{Object}` - a hardened object with specified configurations, if any

Modifying this object gives purses additional configurations.

See [seatConfig](https://github.com/Agoric/ERTP/blob/master/core/config/seatConfig.js) for an example.

### function* makeMintTrait(_coreMint)
- `_coreMint` `{Mint}`
- Returns: `{Object}` - a hardened object with specified configurations, if any

See [pixelConfig](https://github.com/Agoric/ERTP/blob/master/more/pixels/pixelConfig.js) for an example.

### function* makeAssayTrait(_coreAssay_)
- `_coreAssay_` `{Assay}`
- Returns: `{Object}` - a hardened object with specified configurations, if any

See [pixelConfig](https://github.com/Agoric/ERTP/blob/master/more/pixels/pixelConfig.js) for an example.

// Additional descriptions in progress
