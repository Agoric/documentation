# Amount Math

Logic for manipulating amounts.

## Amount

Amounts are descriptions of digital assets, answering the questions "how much" and "of what kind". Amounts are values labeled with a brand. AmountMath executes the logic of how amounts are changed when digital assets are merged, separated, or otherwise manipulated. For example, a deposit of 2 bucks into a purse that already has 3 bucks gives a new balance of 5 bucks. An empty purse has 0 bucks. AmountMath relies heavily on polymorphic MathHelpers, which manipulate the unbranded portion.

```js
someAmount: {
  brand,
  value: someValue
}
```

## Value

Values describe how much of something that can be owned or shared. Fungible values are normally represented by natural numbers. Other values may be represented as strings naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

Value must be Comparable.

## amountMath.getBrand()
- Returns: `{Brand}`

Return the brand.

```js
const { issuer } = makeIssuerKit('bucks');
const exampleAmountMath = issuer.getAmountMath();

const exampleBrand = exampleAmountMath.getBrand();
```

## amountMath.getMathHelpersName()
- Returns: `{String}`

Get the name of the mathHelpers used.

```js
const { amountMath } = makeIssuerKit('bucks');
amountMath.getMathHelpersName(); // 'nat'
```

## amountMath.make(allegedValue)

- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an amount from a value by adding the brand.

```js
const { amountMath } = makeIssuerKit('bucks');
const amount837 = amountMath.make(837);
```

## amountMath.coerce(allegedAmount)
- `allegedAmount` `{Amount}`
- Returns: `{Amount}`

Make sure this amount is valid and return it as an amount if so.

```js
const { amountMath } = makeIssuerKit('bucks');
const bucks50 = amountMath.make(50);

amountMath.coerce(bucks50); // equal to bucks50
```

## amountMath.getValue(amount)
- Returns: `{Value}`

Extract and return the value.

```js
const { amountMath } = makeIssuerKit('bucks');
const fungible123 = amountMath.make(123);

// returns 123
const value = amountMath.getValue(amount);
```

## amountMath.getEmpty()
- Returns: `{Amount}`

Return the amount representing an empty amount. This is the identity element for `MathHelpers.add()` and `MatHelpers.subtract()`.

```js
const { amountMath } = makeIssuerKit('bucks');

// Returns an empty amount for this issuer.
// Since this is a fungible amount it returns 0
const empty = amountMath.getEmpty();
```

## amountMath.isEmpty(amount)
- `amount` `{Amount}`
- Returns: `{boolean}`

Return true if the amount is empty. Otherwise false.

```js
const { amountMath } = makeIssuerKit('fungible');
const empty = amountMath.getEmpty();
const fungible1 = amountMath.make(1);

// returns true
amountMath.isEmpty(empty)

// returns false
amountMath.isEmpty(fungible1)
```

## amountMath.isGTE(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{boolean}`

Returns true if the leftAmount is greater than or equal to the rightAmount. For non-scalars, "greater than or equal to" depends on the kind of amount, as defined by the MathHelpers. For example, whether rectangle A is greater than rectangle B depends on whether rectangle A includes rectangle B as defined by the logic in MathHelpers.

```js
const { amountMath } = makeIssuerKit('fungible');
const empty = amountMath.getEmpty();
const fungible1 = amountMath.make(1);

// Returns true
amountMath.isGTE(fungible1, empty);

// Returns false
amountMath.isGTE(empty, fungible1);
```

## amountMath.isEqual(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{boolean}`

Returns true if the leftAmount equals the rightAmount. We assume that if isGTE is true in both directions, isEqual is also true.

```js
const { amountMath } = makeIssuerKit('fungible');
const empty = amountMath.getEmpty();
const fungible1 = amountMath.make(1);
const anotherFungible1 = amountMath.make(1);

// Returns true
amountMath.isEqual(fungible1, anotherFungible1);

// Returns false
amountMath.isEqual(empty, fungible1);
```

## amountMath.add(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{Amount}`

Returns a new amount that is the union of both leftAmount and rightAmount.

For fungible amount this means adding the values. For other kinds of amount, it usually means including all of the elements from both left and right.

```js
const { amountMath } = makeIssuerKit('myItems', 'strSet');
const listAmountA = amountMath.make(harden['1','2','4']);
const listAmountB = amountMath.make(harden['3']);

// Returns ['1', '2', '4', '3']
const combinedList = amountMath.add(listAmountA, listAmountB);
```

## amountMath.subtract(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{Amount}`

Returns a new amount that is the leftAmount minus the rightAmount (i.e. everything in the leftAmount that is not in the rightAmount). If leftAmount doesn't include rightAmount (subtraction results in a negative), throw an error. Because the left amount must include the right amount, this is NOT equivalent to set subtraction.

```js
const { amountMath } = makeIssuerKit('myItems', 'strSet');
const listAmountA = amountMath.make(harden['1','2','4']);
const listAmountB = amountMath.make(harden['3']);
const listAmountC = amountMath.make(harden['2']);

// Returns ['1', '4']
const subtractedList = amountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = amountMath.subtract(listAmountA, listAmountB)
```
