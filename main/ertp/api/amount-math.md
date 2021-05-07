# AmountMath

Logic for manipulating `amounts`.

## Importing and Using AmountMath

To use the `AmountMath` library, import it from ERTP:
- `import { AmountMath } from '@agoric/ertp';`
## AmountMath Kinds

There are two different kinds of `AmountMath`, each of which implements all the 
methods shown on this page. You only have to specify the `AmountMath` kind when 
creating its associated `issuer`.

The two `AmountMathKinds` each implement all of the same API methods 
(i.e. `AmountMath` methods are polymorphic). We recommend you import 
the `MathKind` values from `@agoric/ERTP` instead of making the strings yourself. 

- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` `values` are natural numbers (non-negative BigInts).
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` `values` are objects or records with multiple properties.

Use `makeIssuerKit(allegedName, AmountMathKind, displayInfo)` to specify which `AmountMathKind` 
your contract uses. The second parameter, `AmountMathKind` is optional and 
defaults to `MathKind.NAT` if not given. For example
```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to MathKind.NAT and undefined displayInfo
makeIssuerKit('kitties', MathKind.SET); // Defaults to undefined displayInfo
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
  value: someValue,}
```

## Value

`values` describe how much of something can be owned or shared. A fungible `value` is
normally represented by a natural number `BigInt`. Other `values` may be represented as strings
naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

Note that numbers in a value are represented as type `BigInt`, which allows for arbitrarily 
large numbers. `BigInts` are depicted as an integer with an appended "n"; e.g. `10n`, `137n`. 
See the [`BigInt` section in the JavaScript Distributed Programming Guide](/guides/js-programming/bigint.md) for details. 

## Brand parameters

Note that many `AmountMath` methods have a `brand` argument, either required or
optional. For the ones with an optional `brand` argument, you should use it if
you need to do an "absolute" check on the brand in the `amount` argument(s).
In this case, you want to use the `brand` you got from the issuer (or from Zoe)
as the optional parameter to compare the `amount` `brand`(s) to. If they are
not equal, an error is thrown.

## `makeLocalAmountMath(issuer)` DEPRECATED 20-03-2021

## `AmountMath.getBrand()` DEPRECATED 20-03-2021

## `AmountMath.getAmountMathKind()` DEPRECATED 20-03-2021

## `AmountMath.make(brand, allegedValue)`
- `brand` `{Brand}`
- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an `amount` from a `value` by adding the `brand`.

Remember that numbers in `values` are represented as `BigInts`; integers
with an appended "n". As seen in the below example, we strongly encourage
using BigInts as the argument to `AmountMath.make()`. While `AmountMath.make()`
does coerce a `Number` argument to a `BigInt`, so both `4` and `4n` return an
amount with a value of `4n`, using `Numbers` is likely to confuse later viewers
of your code. 

See the [BigInt section in the JavaScript Distributed Programming Guide](/guides/js-programming/bigint.md) for 
details about `BigInts`. 

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

Returns the `value` from the given `amount`. Remember, numeric values
are represented as `BigInts`, not `Numbers`.

```js
const quatloos123 = AmountMath.make(quatloosBrand, 123n);

// returns 123n
const myValue = AmountMath.getValue(quatloosBrand, quatloos123);
```

## `AmountMath.makeEmpty(brand, AmountMathKind)`
- Returns: `{Amount}`

Returns the `amount` representing an empty `amount` for the `brand` argument's 
`brand`. This is the identity element for `AmountMath.add()` 
and `AmountMath.subtract()`. The empty `value` depends 
on whether the `AmountMathKind` is `MathKind.NAT` (`0`) of `MathKind.SET` (`[]`).

```js
// Returns an empty amount.
// Since this is a fungible amountKind it returns an amount
// with 0n as its value.
const empty = AmountMath.makeEmpty(quatloosBrand, mathKind.NAT);
```

## `AmountMath.makeEmptyFromAmount(amount)`
- `amount` `{Amount}`
- Returns: `{Amount}`

Return the `amount` representing an empty amount, using another
`amount` as the template for the `brand` and `mathKind`.

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
const empty = AmountMath.makeEmpty(quatloosBrand, MathKind.NAT);
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
const empty = AmountMath.makeEmpty(quatloosBrand, MathKind.NAT);
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

For non-fungible `values`, "equal to" depends on the kind of `AmountMath`. 
For example, { 'seat 1', 'seat 2' } is considered
unequal to { 'seat 2' } because the number of items in the former is
different from that of the latter. Similarly { 'seat 1',  'seat 3'  } and { 'seat 2' } 
are considered unequal because the latter has elements that are not contained in the former.

```js
const empty = AmountMath.makeEmpty(quatloosBrand, MathKind.NAT);
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
import { MathKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', MathKind.SET');
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

import { MathKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', MathKind.SET');
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
on or return an `amount` or `MathKind`. While a brief description is given for each, you should
click through to a method's main documentation entry for full details on
what it does and how to use it.

- [`issuer.getAmountOf(payment)`](./issuer.md#issuer-getamountof-payment)
  - Returns the `amount` description of the `payment`
- [`issuer.getAmountMathKind()`](./issuer.md#issuer-getamountmathkind)
  - Returns the `MathKind` of the `issuer`'s associated math helpers.
- [`zcf.getMathKind(brand)`](/zoe/api/zoe-contract-facet.md#zcf-getmathkind-brand)
  - Returns the `MathKind` associated with the `brand`.

