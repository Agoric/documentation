# Amount Math

Logic for manipulating `amounts`.

## AmountMath Kinds

There are three different kinds of `amountMaths`, each of which implements all the methods shown on this page. You only have to specify the `amountMath` kind when creating an `issuer` (which also creates the `issuer`'s associated `amountMath`). It then knows which kinds's operations to use on itself.

The three kinds of `amountMaths` each implement all of the same set of API methods (i.e. `amountMath` methods are polymorphic). We recommend you import the `MathKind` values from `@agoric/ERTP` instead of making the strings yourself. 

- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` `values` are natural numbers (non-negative integers).
- `MathKind.STRING_SET` (`strSet`): Used with non-fungible assets. `amount` `values` are strings.
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` `values` are objects or records with multiple properties.

Use `makeIssuerKit(allegedName, MathKind)` to specify which `amountMath` 
kind your contract uses. The second parameter, `MathKind` is optional and 
defaults to `MathKind.NAT` if not given. For example
```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos`); // Defaults to 'MathKind.NAT'
makeIssuerKit('foobars', 'MathKind.STRSET');
makeIssuerKit('kitties', MathKind.SET');
```

## Amount

An `amount` is a description of digital assets, answering the questions "how much?" and "of what kind?". It is a `value` ("how much") labeled with a `brand` ("of what kind"). `AmountMath` executes the logic of how an `amount` changes when digital assets are merged, separated, or otherwise manipulated. For example, a deposit of 2 Quatloos into a `purse` that already has 3 Quatloos gives a new balance of 5 Quatloos. An empty `purse` has 0 Quatloos. 

```js
someAmount: {
  brand: someBrand,
  value: someValue,
}
```

## Value

`values` describe how much of something can be owned or shared. A fungible `value` is normally represented by a natural number. Other `values` may be represented as strings naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

A `value` must be `Comparable`.

## amountMath.getBrand()
- Returns: `{Brand}`

Return the `brand` the `amountMath` works on. 

An `amountMath` has a one-to-one association with a `brand`, established when
both are created by `makeIssuerKit()`. The association cannot be broken or changed;
a particular `amountMath` will always and only be used on `amounts` with its
initially associated `brand`. 

```js
const { issuer } = makeIssuerKit('quatloos');
//Get the issuer's associated amountMath.
const exampleAmountMath = issuer.getAmountMath();
//Get the amountMath's associated brand.
const exampleBrand = exampleAmountMath.getBrand();
```

## amountMath.getAmountMathKind()
- Returns: `{String}`

Get the kind (`nat`, `strSet`, `set`) of the `amountMath`.

**tyg todo: Not sure if need to import MathKind, or whether the example
returns `nat` or `MathKind.NAT`?**

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
quatloosAmountMath.getMathHelpersName(); // 'nat'
```

## amountMath.make(allegedValue)

- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an `amount` from a `value` by adding the `brand` associated with
the `amountMath`..

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
//amount837 = value: 837 brand: quatloos
const amount837 = quatloosAmountMath.make(837);
```

## amountMath.coerce(allegedAmount)
- `allegedAmount` `{Amount}`
- Returns: `{Amount}`

Make sure this `amount` is valid and if so, return it as an `amount`.
If not valid, throws an exception. 

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const quatloos50 = quatloosAmountMath.make(50);

quatloosAmountMath.coerce(quatloos50); // Returns amount equal to quatloos50
```

## amountMath.getValue(amount)
- `amount` `{Amount}`
- Returns: `{Value}`

Returns the `value` from the given `amount`.

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const quatloos123 = quatloosAmountMath.make(123);

// returns 123
const myValue = quatloosAmountMath.getValue(quatloos123);
```

## amountMath.getEmpty()
- Returns: `{Amount}`

Returns the `amount` representing an empty `amount` for the `amountMath`'s 
associated `brand`. This is the identity element for `AmountMath.add()` 
and `AmountMath.subtract()`. The empty `value` depends on whether 
the `amountMath` is of kind `nat` (`0`), `set` (`[]`), or `strSet` (`[]`).

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
// Returns an empty amount for this amountMath.
// Since this is a fungible amount it returns an amount
// with 0 as its value.
const empty = quatloosAmountMath.getEmpty();
```

## amountMath.isEmpty(amount)
- `amount` `{Amount}`
- Returns: `{Boolean}`

Returns `true` if the `amount` is empty. Otherwise returns `false`.

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const empty = quatloosAmountMath.getEmpty();
const quatloos1` = quatloosAmountMath.make(1);

// returns true
quatloosAmountMath.isEmpty(empty)

// returns false
quatloosAmountMath.isEmpty(quatloos1)
```

## amountMath.isGTE(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is greater than or equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

For non-fungible `values`, what "greater than or equal to" is depends on the 
kind of `amountMath`. For example, whether rectangle A is greater than rectangle B 
depends on whether rectangle A includes rectangle B as defined by the logic in `amountMath`

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const empty = quatloosAmountMath.getEmpty();
const quatloos5 = quatloosAmountMath.make(5);
const quatloos10 = quatloosAmountMath.make(10);

// Returns true
quatloosAmountMath.isGTE(quatloos5, empty);
// Returns false
quatloosAmountMath.isGTE(empty, quatloos5);
// Returns true
quatloosAmountMath.isGTE(quatloos10, quatloos5);
// Returns false
quatloosAmountMath.isGTE(quatloos5, quatloos10);
// Returns true
quatloosAmountMath.isGTE(quatloos5, quatloos5);
```

## amountMath.isEqual(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

For non-fungible `values`, "equal to" depends on the kind of `amountMath`. 
For example, whether rectangle A is greater to rectangle B 
depends on by the logic in `amountMath`. For example, is a 6x4 rectangle
equal to a 8x3 rectangle? Their areas are equal (24), but the first has
a total edge length of 20 while the second has a total edge length of 22.

```js
const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const empty = quatloosAmountMath.getEmpty();
const quatloos10 = quatloosAmountMath.make(10);
const quatloos5 = quatloosAmountMath.make(5);
const quatloos5-2 = quatloosAmountMath.make(5);

// Returns true
quatloosAmountMath.isEqual(quatloos10, quatloos10);

// Returns true
quatloosAmountMath.isEqual(quatloos5, quatloos5-2);

// Returns false
quatloosAmountMath.isEqual(quatloos10, quatloos5);

// Returns false
quatloosAmountMath.isEqual(empty, quatloos10);
```

## amountMath.add(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{Amount}`

Returns a new `amount` that is the union of `leftAmount` and `rightAmount`. Both
arguments must be of the same `brand`.

For fungible `amounts` this means adding their `values`. For non-fungible
`amounts`, it usually means including all of the elements from `leftAmount`
and `rightAmount`.

If either `leftAmount` or `rightAmount` is empty, it just returns the non-empty 
`amount` argument. If both are empty, it returns an empty `amount`.

```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
const { amountMath: itemsAmountMath } = makeIssuerKit('myItems', MathKind.STRING_SET');
const listAmountA = itemsAmountMath.make(harden['1','2','4']);
const listAmountB = itemsAmountMath.make(harden['3']);

// Returns ['1', '2', '4', '3']
const combinedList = itemsAmountMath.add(listAmountA, listAmountB);
```

## amountMath.subtract(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{Amount}`

Returns a new `amount` that is the `leftAmount` minus the `rightAmount` (i.e. everything in the `leftAmount` that is not in the `rightAmount`). If `leftAmount` doesn't include `rightAmount` (subtraction results in a negative), it throws an error. Because `leftAmount` must include `rightAmount`, this is **not** equivalent to set subtraction.

`leftAmount` and `rightAmount` must be of the same `brand`.

If the `rightAmount` is empty, it returns the `leftAmount`. If both arguments are
empty, it returns an empty `amount`.

```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
const { amountMath: itemsAmountMath } = makeIssuerKit('myItems', MathKind.STRING_SET);
const listAmountA = itemsAmountMath.make(harden['1','2','4']);
const listAmountB = itemsAmountMath.make(harden['3']);
const listAmountC = itemsAmountMath.make(harden['2']);

// Returns ['1', '4']
const subtractedList = itemsAmountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = itemsAmountMath.subtract(listAmountA, listAmountB)
```
## Related Methods

The following methods on other ERTP components and objects also either operate
on or return a brand. While a brief description is given for each, you should
click through to a method's main documentation entry for full details on
what it does and how to use it.
[`issuer.getAmountOf(payment)`](./issuer.html#issuer-getamountof-payment)

- [`issuer.getAmountMath()`](./issuer.html#issuer-getamountmath)
  - Returns the `amountMath` associated with the `issuer`.
- [`issuer.getAmountMathKind()`](./issuer.html#issuer-getamountmathking)
  - Returns the kind of the `issuer`'s associated `amountMath`.
- [`zcf.getAmountMath(brand)`](https://agoric.com/documentation/zoe/api/zoe-contract-facet.html#zcf-getamountmath-brand)
  - Returns the `amountMath` associated with the `brand`.

