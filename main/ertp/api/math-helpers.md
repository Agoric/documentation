##### I'm trying to understand what `doGetIdentity()` and `doIsIdentity()` are for. What is an identity and why is it important to know? Why is it often '0' or an empty array.







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

## mathHelpers.doGetIdentity()
- Returns: `{Extent}`

Get the representation for the identity element (often 0 or an empty array).

```js

```

## mathHelpers.doIsIdentity(extent)
- `extent` `{Extent}`
- Returns: `{Boolean}`

Is the extent the identity element?

```js

```

## mathHelpers.doIsGTE(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Is the left greater than or equal to the right?

```js

```

## mathHelpers.doIsEqual(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Does left equal right?

```js

```

## mathHelpers.doAdd(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return the left combined with the right

```js

```

## mathHelpers.doSubtract(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return what remains after removing the right from the left. If the result is negative (i.e. something in the right was not in the left) we throw an error.

```js

```