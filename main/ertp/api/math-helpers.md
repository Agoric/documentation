# MathHelpers
AmountMath is about doing math operations on `amount`s, which are extents labeled with a brand.
AmountMath uses MathHelpers to do its extent arithmatic operations. It then brands the results,
creating a new `amount`. 

There are three different types of MathHelpers, each of which implements all the methods shown 
on this page. You only have to specify the MathHelper type when creating an `issuer`; it then knows
which type's operations to use on itself. 

There are three types of MathHelpers, each of which implements all of the same 
set of API methods (i.e. MathHelpers are polymorphic):
- `nat`: Used with fungible assests.
- `strSet`: Used with non-fungible assets.
- `set`: Used with sets of objects, primarily non-fungible assets.

Use `produceIssuer(allegedName, mathHelpersName)` to specify which type of MathHelpers
your contract uses. The second parameter, `mathHelpersName` is optional and defaults 
to `nat` if not given. For example
```js
produceIssuer('quatloos`); // Defaults to 'nat'
produceIssuer('quatloos', 'strSet');
produceIssuer('quatloos, 'set');
```
For more details on the MathHelper types, see the [ERTP Guide's MathHelpers section](https://agoric.com/documentation/ertp/api/math-helpers.html)

::: warning MathHelpers versus AmountMath
MathHelper operations should not be used on their own. Instead, you 
should first make a local version of AmountMath as shown below.
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
