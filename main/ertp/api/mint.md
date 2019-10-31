# Mint

Holding a Mint carries the right to control issuance and destruction of purses and payments containing `units` of a particular currency.
Purses and payments associated with a particular assay can only transfer value to others using the same mint.

## makeMint(allegedName, makeConfig)

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

## mint.getAssay()
- Returns: `{Assay}`

Get the Assay for this mint.

```js
import { makeMint } from '@agoric/ertp/core/mint';

// Make a mint
const happyTownBucks = makeMint('happyTownBucks');
// Get the assay for the mint
const assay = happyTownBucks.getAssay();
```
