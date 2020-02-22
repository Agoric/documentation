# Math Helpers
All of the differences in how digital asset amount are manipulated can be reduced to the behavior of the math on extents. We extract this custom logic into mathHelpers. MathHelpers are about extent arithmetic, whereas AmountMath is about amounts, which are the extents labeled with a brand. AmountMath use mathHelpers to do their extent arithmetic, and then brand the results, making a new amount.

## mathHelpers.doAssertKind(allegedExtent)
- `allegedExtent` `{Extent}`
- Returns: `{Extent}`

Check the kind of this extent and throw if it is not the expected kind.

```js
// Get the extent for a fungible issuer
const { issuer, amountMath } = produceIssuer('fungible');
const amount = amountMath.make(10)
const fungibleExtent = amountMath.extent(amount)

// Get the mathHelper for a fungible issuer
const fungibleMathHelper = issuer.getMathHelpersName()

// Get the extent for a liquidity issuer
const { issuerL, amountMathL } = produceIssuer('liquidity');
const amountL = amountMathL.make(10)
const liquidityExtent = amountMathL.extent(amountL)

// Check passes
fungibleMathHelper.doAssertKind(fungibleExtent)

// Throws error
fungibleMathHelper.doAssertKind(liquidityExtent)
```

## mathHelpers.doGetEmpty()
- Returns: `{Extent}`

Get the value for an empty extent (often 0 or an empty array).

Mathematically, this is a representation of the identity element for the addition operation.

```js
// Create an empty amount using a mathHelper
const empty = amountMath.make(mathHelper.doGetEmpty());
```

## mathHelpers.doIsEmpty(extent)
- `extent` `{Extent}`
- Returns: `{Boolean}`

Is this an empty extent?

Mathematically, this determines if the extent is the identity element for the addition operation.

```js
mathHelper.doIsEmpty(amountMath.getExtent(amount))
```

## mathHelpers.doIsGTE(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Is the left greater than or equal to the right?

```js
helpers.doIsGTE(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
)
```

## mathHelpers.doIsEqual(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Does left equal right?

```js
helpers.doIsEqual(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
)
```

## mathHelpers.doAdd(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return the left combined with the right.

```js
const combinedExtent = helpers.doAdd(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
)
```

## mathHelpers.doSubtract(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return what remains after removing the right from the left. If the result is negative (i.e. something in the right was not in the left) we throw an error.

```js
const remainingExtent = helpers.doSubtract(leftExtent, rightExtent)
```