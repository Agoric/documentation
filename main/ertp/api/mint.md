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
import { makeMint } from '@agoric/ertp';

// Make a mint for happyTownBucks with default basic fungible configuration
const happyTownBucks = makeMint('happyTownBucks');

// Make a mint for sadTownBucks with default basic fungible configuration
const sadTownBucks = makeMint('sadTownBucks');
```

## mint.mint(initialBalance, name)
- `initialBalance` `{Units}` - Initial balance for the purse
- `name` `{String}` - Name for the purse. Default is 'a purse'.
- Returns: `{Purse}`

Since newly minted units need to be held somewhere, this method actually creates a new Purse containing the specified units.
Units must be held in either a Payment or a Purse.

```js
import { makeMint } from '@agoric/ertp';
const happyTownBucks = makeMint('happyTownBucks');

// Create a new purse with 100 happyTownBucks
const myHappyTownBucks = happyTownBucks.mint(100, 'myHappyTownBucks');

// Create you a purse with 200 happyTownBucks
const yourHappyTownBucks = happyTownBucks.mint(200, 'yourHappyTownBucks');

```

## mint.getAssay()
- Returns: `{Assay}`

Get the Assay for this mint.

```js
import { makeMint } from '@agoric/ertp';

// Make a mint
const happyTownBucks = makeMint('happyTownBucks');
// Get the assay for the mint
const assay = happyTownBucks.getAssay();
```
