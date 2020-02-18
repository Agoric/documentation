# Mint

Holding a Mint carries the right to control issuance and destruction of purses and payments containing `units` of a particular currency.
Purses and payments associated with a particular assay can only transfer value to others using the same mint.

## MintMaker.produceIssuer(allegedName, mathHelperName)
- `allegedName` `{Comporable}`
- `mathHelpersName` `{String}`
- Returns: `{IssuerObjs}`

Makes Issuers.

The `allegedName` becomes part of the brand in asset descriptions. The `allegedName` doesn't have to be a string, but it will only be used for its value. The `allegedName` is useful for debugging and double-checking assumptions, but should not be trusted.

The `mathHelpersName` will be used to import a specific mathHelpers from the mathHelpers library. For example, `natMathHelpers`, the default, is used for basic fungible tokens.

```js
const { issuer, mint, amountMath } = produceIssuer('fungible');
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
