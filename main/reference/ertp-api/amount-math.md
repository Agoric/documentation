# AmountMath Object

Logic for manipulating `amounts`.

## Importing and Using AmountMath

To use the `AmountMath` library, import it from ERTP:
- `import { AmountMath } from '@agoric/ertp';`
## AssetKinds

The `AmountMath` library lets you manipulate amounts, such as by adding two amounts together. 
However, remember that we have two types of amounts, fungible and non-fungible. While a fungible 
amount has natural numbers for its value, a non-fungible amount has an array of elements, such as 
strings, numbers, objects, or records, for its value. Even though very different mathematical processes
are performed, `AmountMath()` methods work for both types of amounts. 

The `AmountMath` library methods are polymorphic. All of the operations work for both fungible 
and non-fungible assets. Which method is used is 
determined by the `AssetKind` associated with the amounts' `Issuer` and `Brand`. This is 
specified when `issuerKit()` creates the issuer and brand. 

We recommend you import the two `AssetKind` values from `@agoric/ERTP` instead of making the 
strings yourself. 
- `AssetKind.NAT` (`nat`): Used with fungible assets. Values are natural numbers using the JavaScript  [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type to avoid overflow risks from using the usual JavaScript `Number` type.
- `AssetKind.SET` (`set`): Used with non-fungible assets. Values are arrays of objects (e.g., strings).

Use `makeIssuerKit(allegedName, assetKind, displayInfo)` to specify which `AssetKind` 
your contract uses. The second parameter, `assetKind`, is optional and 
defaults to `AssetKind.NAT` if not given. Similarly, the `displayInfo` parameter is optional and defaults to undefined if not given. For example
```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to AssetKind.NAT and undefined displayInfo
makeIssuerKit('kitties', AssetKind.SET); // Defaults to undefined displayInfo
```

## Amount

An `amount` is a description of digital assets, answering the 
questions "how much?" and "of what kind?". It is a `value` ("how much") 
labeled with a `brand` ("of what kind"). `AmountMath` executes the logic 
of how an `amount` changes when digital assets are merged, separated, or 
otherwise manipulated. For example, a deposit of 2 Quatloos into a `purse` 
that already has 3 Quatloos gives a new balance of 5 Quatloos. 
An empty `purse` has 0 Quatloos. 

```js
someAmount: {
  brand: someBrand,
  value: someValue,
}
```

## Value

`values` describe how much of something can be owned or shared.
A value is either a non-negative `BigInt` for a fungible amount
or, for a non-fungible amount, [copyArray](/guides/js-programming/far.md#passstyleof-api)
such as a hardened array of strings.

Recall that `BigInt`s are written with an `n` at the end: `10n`, `137n`, etc.

## Brand Parameters

Note that many `AmountMath` methods have a `brand` parameters. For the ones with an optional `brand` argument, you should use it if
you need to do an "absolute" check on the brand in the `amount` argument.
In this case, you want to use the `brand` you got from the issuer (or from Zoe)
as the optional parameter to compare the `amount` `brand`(s) to. If they are
not equal, an error is thrown.

## `makeLocalAmountMath(issuer)` DEPRECATED Mar 20, 2021

## `AmountMath.getBrand()` DEPRECATED Mar 20, 2021

## `AmountMath.getAmountMathKind()` DEPRECATED Mar 20, 2021

## `AmountMath.make(brand, allegedValue)`
- `brand` `{Brand}`
- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an `amount` from a `value` and a `brand`.

```js
//amount837 = { value: 837n, brand: quatloos }
const amount837 = AmountMath.make(quatloosBrand, 837n);
```

## `AmountMath.coerce(brand, allegedAmount)`
- `brand` `{Brand}`
- `allegedAmount` `{Amount}`
- Returns: `{Amount}`

Make sure this `amount` is valid and if so, return it.
If not valid, throws an exception. This checks if
an `amount` coming from elsewhere is for the expected `brand`.

```js
const quatloos50 = AmountMath.make(quatloosBrand, 50n);
// Returns the same amount as quatloos50
const verifiedAmount = AmountMath.coerce(quatloosBrand, allegedAmount); 
```

## `AmountMath.getValue(brand, amount)`
- `amount` `{Amount}`
- Returns: `{Value}`

Returns the `value` from the given `amount`.

```js
const quatloos123 = AmountMath.make(quatloosBrand, 123n);

// returns 123n
const myValue = AmountMath.getValue(quatloosBrand, quatloos123);
```
## AmountMath.makeEmpty(brand, assetKind)
- Returns: `{Amount}`

Returns the `amount` representing an empty `Amount` for the `brand` argument's 
`Brand`. This is the identity element for `AmountMath.add()` 
and `AmountMath.subtract()`. The empty `value` depends 
on whether the `assetKind` is `AssetKind.NAT` (`0n`) or `AssetKind.SET` (`[]`).

```js
// Returns an empty amount.
// Since this is a fungible assetKind it returns an amount
// with 0n as its value.
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
```

## `AmountMath.makeEmptyFromAmount(amount)`
- `amount` `{Amount}`
- Returns: `{Amount}`

Return the `amount` representing an empty amount, using another
`amount` as the template for the `brand` and `assetKind`.

```js
// quatloosAmount837 = { value: 837n, brand: quatloos }
const quatloosAmount837 = AmountMath.make(quatloosBrand, 837n);
// Returns an amount = { value: 0n, brand: quatloos }
const quatloosAmount0 = AmountMath.makeEmptyFromAmount(quatloosAmount837);
```

## `AmountMath.isEmpty(amount, brand?)`
- `amount` `{Amount}`
- `brand?` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{Boolean}`

Returns `true` if the `amount` is empty. Otherwise returns `false`.

The `brand` parameter is optional, and defaults to `undefined`. 
If it does not match `amount`'s `brand`, an error is thrown.

```js
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
const quatloos1 = AmountMath.make(quatloosBrand, 1n);

// returns true
const result = AmountMath.isEmpty(empty);

// returns false
const result = AmountMath.isEmpty(quatloos1);
```

## `AmountMath.isGTE(leftAmount, rightAmount, brand?)`
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is greater than or equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

The `brand` argument is optional, defaulting to `undefined`.
If it does not match the `amounts` `brand`, an error is thrown.

For non-fungible `values`, what "greater than or equal to" is depends on the 
kind of `AmountMath`. For example, { 'seat 1', 'seat 2' } is considered
greater than { 'seat 2' } because the former both contains all of the latter's 
contents and has additional elements.

```js
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
const quatloos5 = AmountMath.make(quatloosBrand, 5n);
const quatloos10 = AmountMath.make(quatloosBrand, 10n);

// Returns true
AmountMath.isGTE(quatloos5, empty);
// Returns false
AmountMath.isGTE(empty, quatloos5, quatloosBrand);
// Returns true
AmountMath.isGTE(quatloos10, quatloos5);
// Returns false
AmountMath.isGTE(quatloos5, quatloos10);
// Returns true
AmountMath.isGTE(quatloos5, quatloos5);
```

## `AmountMath.isEqual(leftAmount, rightAmount, brand?)`
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

The `brand` argument is optional, defaulting to `undefined`.
If it does not match the `amounts` `brand`, an error is thrown.

For non-fungible `values`, "equal to" depends on the value of the
brand's `AssetKind`. 

For example, { 'seat 1', 'seat 2' } is considered
unequal to { 'seat 2' } because the number of items in the former is
different from that of the latter. Similarly { 'seat 1',  'seat 3'  } and { 'seat 2' } 
are considered unequal because the latter has elements that are not contained in the former.

```js
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
const quatloos5 = AmountMath.make(quatloosBrand, 5n);
const quatloos5b = AmountMath.make(quatloosBrand, 5n);
const quatloos10 = AmountMath.make(quatloosBrand, 10n);

// Returns true
AmountMath.isEqual(quatloos10, quatloos10);
// Returns true
AmountMath.isEqual(quatloos5, quatloos5b);
// Returns false
AmountMath.isEqual(quatloos10, quatloos5);
// Returns false
AmountMath.isEqual(empty, quatloos10);
```

## `AmountMath.add(leftAmount, rightAmount, brand?)`
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{Amount}`

Returns a new `amount` that is the union of `leftAmount` and `rightAmount`. Both
arguments must be of the same `brand`.

The `brand` argument is optional, defaulting to `undefined`.
If it does not match the `amounts` `brand`, an error is thrown.

For fungible `amounts` this means adding their `values`. For non-fungible
`amounts`, it usually means including all of the elements from `leftAmount`
and `rightAmount`.

If either `leftAmount` or `rightAmount` is empty, it just returns the non-empty 
`amount` argument. If both are empty, it returns an empty `amount`.

```js
import { AssetKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', AssetKind.SET');
const listAmountA = AmountMath.make(myItemsBrand, ['1','2','4']);
const listAmountB = AmountMath.make(myItemsBrand, ['3']);

// Returns an amount whose value is ['1', '2', '4', '3']
const combinedList = AmountMath.add(listAmountA, listAmountB);
```

## `AmountMath.subtract(leftAmount, rightAmount, brand?)`
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{Amount}`

Returns a new `amount` that is the `leftAmount` minus the `rightAmount` (i.e. 
everything in the `leftAmount` that is not in the `rightAmount`). If `leftAmount` 
doesn't include `rightAmount` (subtraction results in a negative), it throws an 
error. Because `leftAmount` must include `rightAmount`, this is **not** 
equivalent to set subtraction.

`leftAmount` and `rightAmount` must be of the same `brand`.

The `brand` argument is optional, defaulting to `undefined`.
If it does not match the `amounts` `brand`, an error is thrown.

If the `rightAmount` is empty, it returns the `leftAmount`. If both arguments are
empty, it returns an empty `amount`.

```js
import { AssetKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', AssetKind.SET');
const listAmountA = AmountMath.make(myItemsBrand, ['1','2','4']);
const listAmountB = AmountMath.make(myItemsBrand, ['3']);
const listAmountC = AmountMath.make(myItemsBrand, ['2']);

// Returns ['1', '4']
const subtractedList = AmountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = AmountMath.subtract(listAmountA, listAmountB)
```
## Related Methods

The following methods on other ERTP components and objects also either operate
on or return an `amount` or `AssetKind`. While a brief description is given for each, you should
click through to a method's main documentation entry for full details on
what it does and how to use it.

- [`issuer.getAmountOf(payment)`](./issuer.md#issuer-getamountof-payment)
  - Returns the `amount` description of the `payment`
- [`issuer.getAssetKind()`](./issuer.md#issuer-getassetkind)
  - Returns the `AssetKind` of the `issuer`'s associated math helpers.
- [`zcf.getAssetKind(brand)`](/reference/zoe-api/zoe-contract-facet.md#zcf-getassetkind-brand)
  - Returns the `AssetKind` associated with the `brand`.

