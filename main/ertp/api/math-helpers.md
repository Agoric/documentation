# MathHelpers
AmountMath is about doing math operations on `amount`s, which are values labeled with a brand.
AmountMath uses MathHelpers to do its value arithmatic operations. It then brands the results,
creating a new `amount`. 

There are three different types of MathHelpers, each of which implements all the methods shown 
on this page. You only have to specify the MathHelper type when creating an `issuer`; it then knows
which type's operations to use on itself. 

There are three types of MathHelpers, each of which implements all of the same 
set of API methods (i.e. MathHelpers are polymorphic):
- `nat`: Used with fungible assests.
- `strSet`: Used with non-fungible assets.
- `set`: Used with sets of objects, primarily non-fungible assets.

Use `makeIssuerKit(allegedName, mathHelpersName)` to specify which type of MathHelpers
your contract uses. The second parameter, `mathHelpersName` is optional and defaults 
to `nat` if not given. For example
```js
makeIssuerKit('quatloos`); // Defaults to 'nat'
makeIssuerKit('quatloos', 'strSet');
makeIssuerKit('quatloos, 'set');
```
For more details on the MathHelper types, see the [ERTP Guide's MathHelpers section](https://agoric.com/documentation/ertp/api/math-helpers.html)

::: warning MathHelpers versus AmountMath
MathHelper operations should not be used on their own. Instead, you 
should first make a local version of AmountMath as shown below.
:::


```js
const { issuer, brand } = makeIssuerKit('bucks');
const mathHelperName = issuer.getMathHelpersName(); // 'nat'
const localAmountMath = makeAmountMath(brand, mathHelpersName)
```

## mathHelpers.doAssertKind(allegedValue)
- `allegedValuet` `{Value}`
- Returns: `undefined`

Check the kind of this value and throw an error if it is not the expected kind.

```js
// Used in amountMath.make():
make: allegedValue => {
  helpers.doAssertKind(allegedValue);
  const amount = harden({
    brand,
    value: allegedValue,
  });
  cache.add(amount);
  return amount;
},
```

## mathHelpers.doGetEmpty()
- Returns: `{Value}`

Get the value for an empty value (often 0 or an empty array).

Mathematically, this is a representation of the identity element for the addition operation.

```js
// Used in amountMath:
const empty = amountMath.make(helpers.doGetEmpty());
```

## mathHelpers.doIsEmpty(value)
- `value` `{Value}`
- Returns: `{Boolean}`

Is this an empty value?

Mathematically, this determines if the value is the identity element for the addition operation.

```js
// Used in amountMath:
mathHelper.doIsEmpty(amountMath.getValue(amount));
```

## mathHelpers.doIsGTE(left, right)
- `left` `{Value}`
- `right` `{Value}`
- Returns: `{Boolean}`

Is the left greater than or equal to the right?

```js
// Used in amountMath:
helpers.doIsGTE(
  amountMath.getValue(leftAmount),
  amountMath.getValue(rightAmount),
);
```

## mathHelpers.doIsEqual(left, right)
- `left` `{Value}`
- `right` `{Value}`
- Returns: `{Boolean}`

Does left equal right?

```js
// Used in amountMath:
helpers.doIsEqual(
  amountMath.getValue(leftAmount),
  amountMath.getValue(rightAmount),
);
```

## mathHelpers.doAdd(left, right)
- `left` `{Value}`
- `right` `{Value}`
- Returns: `{Value}`

Return the left combined with the right.

```js
// Used in amountMath:
const combinedValue = helpers.doAdd(
  amountMath.getValue(leftAmount),
  amountMath.getValue(rightAmount),
);
```

## mathHelpers.doSubtract(left, right)
- `left` `{Value}`
- `right` `{Value}`
- Returns: `{Value}`

Return what remains after removing the right from the left. If the result is negative (i.e. something in the right was not in the left) we throw an error.

```js
// Used in amountMath:
const remainingValue = helpers.doSubtract(
  amountMath.getValue(leftAmount),
  amountMath.getValue(rightAmount),
);
```
