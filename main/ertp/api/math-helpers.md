# Math Helpers
All of the differences in how digital asset amount are manipulated can
be reduced to the behavior of the math on extents. We extract this
custom logic into mathHelpers. MathHelpers are about extent
arithmetic, whereas AmountMath is about amounts, which are the extents
labeled with a brand. AmountMath use mathHelpers to do their extent
arithmetic, and then brand the results, making a new amount.

::: warning MathHelpers versus AmountMath
These MathHelpers should not be used on their own. Instead, a local
version of AmountMath should be made (see below).
:::


```js
const { issuer, brand } = produceIssuer('bucks');
const mathHelperName = issuer.getMathHelpersName(); // 'nat'
const localAmountMath = makeAmountMath(brand, mathHelpersName)
```

## mathHelpers.doAssertKind(allegedExtent)
- `allegedExtent` `{Extent}`
- Returns: `undefined`

Check the kind of this extent and throw if it is not the expected kind.

```js
// Used in amountMath.make():
make: allegedExtent => {
  helpers.doAssertKind(allegedExtent);
  const amount = harden({
    brand,
    extent: allegedExtent,
  });
  cache.add(amount);
  return amount;
},
```

## mathHelpers.doGetEmpty()
- Returns: `{Extent}`

Get the value for an empty extent (often 0 or an empty array).

Mathematically, this is a representation of the identity element for the addition operation.

```js
// Used in amountMath:
const empty = amountMath.make(helpers.doGetEmpty());
```

## mathHelpers.doIsEmpty(extent)
- `extent` `{Extent}`
- Returns: `{Boolean}`

Is this an empty extent?

Mathematically, this determines if the extent is the identity element for the addition operation.

```js
// Used in amountMath:
mathHelper.doIsEmpty(amountMath.getExtent(amount));
```

## mathHelpers.doIsGTE(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Is the left greater than or equal to the right?

```js
// Used in amountMath:
helpers.doIsGTE(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
);
```

## mathHelpers.doIsEqual(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Boolean}`

Does left equal right?

```js
// Used in amountMath:
helpers.doIsEqual(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
);
```

## mathHelpers.doAdd(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return the left combined with the right.

```js
// Used in amountMath:
const combinedExtent = helpers.doAdd(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
);
```

## mathHelpers.doSubtract(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return what remains after removing the right from the left. If the result is negative (i.e. something in the right was not in the left) we throw an error.

```js
// Used in amountMath:
const remainingExtent = helpers.doSubtract(
  amountMath.getExtent(leftAmount),
  amountMath.getExtent(rightAmount),
);
```
