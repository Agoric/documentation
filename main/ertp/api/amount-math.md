# Amount Math

Logic for manipulating `amounts`.

## Obtaining an AmountMath

To get access to an `amountMath`:
- `import { amountMath } from '@agoric/ertp';`
  - It's a record, not an object with a constructor.
- By writing a Zoe contract. The `issuer` is saved in Zoe, so call `zcf.getAmountMath(brand)`. 

## AmountMath Kinds

There are two different kinds of `amountMath`, each of which implements all the methods shown on this page. You only have to specify the `amountMath` kind when creating its associated `issuer`.

The two`amountMath` kinds each implement all of the same API methods (i.e. `amountMath` methods are polymorphic). We recommend you import the `MathKind` values from `@agoric/ERTP` instead of making the strings yourself. 

- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` `values` are natural numbers (non-negative BigInts).
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` `values` are objects or records with multiple properties.

Use `makeIssuerKit(allegedName, amountMathKind, displayInfo)` to specify which `amountMath` 
kind your contract uses. The second parameter, `amountMathKind` is optional and 
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

## makeLocalAmountMath(issuer). DEPRECATED 20-03-2021

## amountMath.getBrand() DEPRECATED 20-03-2021

## amountMath.getAmountMathKind() DEPRECATED 20-03-2021

## amountMath.make(brand, allegedValue)
- `brand` `{Brand}`
- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an `amount` from a `value` by adding the `brand`.

Remember that numbers in `values` are represented as `BigInts`; integers
with an appended "n". As seen in the below example, we strongly encourage
using BigInts as the argument to `amountMath.make()`. While `amountMath.make()`
does coerce a `Number` argument to a `BigInt`, so both `4` and `4n` return an
amount with a value of `4n`, using `Numbers` is likely to confuse later viewers
of your code. 

See the [BigInt section in the JavaScript Distributed Programming Guide](/guides/js-programming/bigint.md) for 
details about `BigInts`. 

```js
//amount837 = { value: 837n, brand: quatloos }
const amount837 = amountMath.make(quatloosBrand, 837n);
```

## amountMath.coerce(brand, allegedAmount)
- `brand` `{Brand}`
- `allegedAmount` `{Amount}`
- Returns: `{Amount}`

Make sure this `amount` is valid and if so, return it.
If not valid, throws an exception. This checks if
an `amount` coming from elsewhere is for the expected `brand`.

```js
const quatloos50 = amountMath.make(quatloosBrand, 50n);
// Returns the same amount as quatloos50
const verifiedAmount = amountMath.coerce(quatloosBrand, allegedAmount); 
```

## amountMath.getValue(brand, amount)
- `amount` `{Amount}`
- Returns: `{Value}`

Returns the `value` from the given `amount`. Remember, numeric values
are represented as `BigInts`, not `Numbers`.

```js
const quatloos123 = amountMath.make(quatloosBrand, 123n);

// returns 123n
const myValue = amountMath.getValue(quatloosBrand, quatloos123);
```

## amountMath.makeEmpty(brand, amountMathKind)
- Returns: `{Amount}`

Returns the `amount` representing an empty `amount` for the `brand` argument's 
`brand`. This is the identity element for `AmountMath.add()` 
and `AmountMath.subtract()`. The empty `value` depends 
on whether the `amountMathKind` is `MathKind.NAT` (`0`) of `MathKind.SET` (`[]`).

```js
// Returns an empty amount.
// Since this is a fungible amountKind it returns an amount
// with 0n as its value.
const empty = amountMath.makeEmpty(quatloosBrand, mathKind.NAT);
```

## amountMath.makeEmptyFromAmount(amount)
- `amount` `{Amount}`
- Returns: `{Amount}`

Return the `amount` representing an empty amount, using another
`amount` as the template for the `brand` and `mathKind`.

```js
// quatloosAmount837 = { value: 837n, brand: quatloos }
const quatloosAmount837 = amountMath.make(quatloosBrand, 837n);
// Returns an amount = { value: 0n, brand: quatloos }
const quatloosAmount0 = amountMath.makeEmptyFromAmount(quatloosAmount837);
```

## amountMath.isEmpty(amount, brand?)
- `amount` `{Amount}`
- `brand?` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{Boolean}`

Returns `true` if the `amount` is empty. Otherwise returns `false`.

The `brand` parameter is optional, and defaults to `undefined`.

```js
const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
const quatloos1 = amountMath.make(quatloosBrand, 1n);

// returns true
const result = amountMath.isEmpty(empty);

// returns false
const result = amountMath.isEmpty(quatloos1);
```

## amountMath.isGTE(leftAmount, rightAmount, brand?)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is greater than or equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

The `brand` argument is optional, defaulting to `undefined`.

For non-fungible `values`, what "greater than or equal to" is depends on the 
kind of `amountMath`. For example, { 'seat 1', 'seat 2' } is considered
greater than { 'seat 2' } because the former both contains all of the latter's 
contents and has additional elements.

```js
const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
const quatloos5 = amountMath.make(quatloosBrand, 5n);
const quatloos10 = amountMath.make(quatloosBrand, 10n);

// Returns true
amountMath.isGTE(quatloos5, empty);
// Returns false
amountMath.isGTE(empty, quatloos5);
// Returns true
amountMath.isGTE(quatloos10, quatloos5);
// Returns false
amountMath.isGTE(quatloos5, quatloos10);
// Returns true
amountMath.isGTE(quatloos5, quatloos5);
```

## amountMath.isEqual(leftAmount, rightAmount, brand?)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{boolean}`

Returns `true` if the `value` of `leftAmount` is equal to
the `value` of `rightAmount`. Both `amount` arguments must have the same
`brand`.

The `brand` argument is optional, defaulting to `undefined`.

For non-fungible `values`, "equal to" depends on the kind of `amountMath`. 
For example, { 'seat 1', 'seat 2' } is considered
unequal to { 'seat 2' } because the number of items in the former is
different from that of the latter. Similarly { 'seat 1',  'seat 3'  } and { 'seat 2' } 
are considered unequal because the latter has elements that are not contained in the former.

```js
const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
const quatloos5 = amountMath.make(quatloosBrand, 5n);
const quatloos5b = amountMath.make(quatloosBrand, 5n);
const quatloos10 = amountMath.make(quatloosBrand, 10n);

// Returns true
amountMath.isEqual(quatloos10, quatloos10);
// Returns true
amountMath.isEqual(quatloos5, quatloos5b);
// Returns false
amountMath.isEqual(quatloos10, quatloos5);
// Returns false
amountMath.isEqual(empty, quatloos10);
```

## amountMath.add(leftAmount, rightAmount, brand?)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- `brand` `{Brand}` (optional, defaults to `undefined`)
- Returns: `{Amount}`

Returns a new `amount` that is the union of `leftAmount` and `rightAmount`. Both
arguments must be of the same `brand`.

The `brand` argument is optional, defaulting to `undefined`.

For fungible `amounts` this means adding their `values`. For non-fungible
`amounts`, it usually means including all of the elements from `leftAmount`
and `rightAmount`.

If either `leftAmount` or `rightAmount` is empty, it just returns the non-empty 
`amount` argument. If both are empty, it returns an empty `amount`.

```js
import { MathKind, makeIssuerKit, amountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', MathKind.SET');
const listAmountA = amountMath.make(myItemsBrand, harden['1','2','4']);
const listAmountB = amountMath.make(myItemsBrand, harden['3']);

// Returns an amount whose value is ['1', '2', '4', '3']
const combinedList = amountMath.add(listAmountA, listAmountB);
```

## amountMath.subtract(leftAmount, rightAmount, brand?)
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

If the `rightAmount` is empty, it returns the `leftAmount`. If both arguments are
empty, it returns an empty `amount`.

```js

import { MathKind, makeIssuerKit, amountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', MathKind.SET');
const listAmountA = amountMath.make(myItemsBrand, harden['1','2','4']);
const listAmountB = amountMath.make(myItemsBrand, harden['3']);
const listAmountC = amountMath.make(myItemsBrand, harden['2']);

// Returns ['1', '4']
const subtractedList = amountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = amountMath.subtract(listAmountA, listAmountB)
```
## Related Methods

The following methods on other ERTP components and objects also either operate
on or return an `amount` or `amountMath`. While a brief description is given for each, you should
click through to a method's main documentation entry for full details on
what it does and how to use it.

- [`issuer.getAmountOf(payment)`](./issuer.md#issuer-getamountof-payment)
  - Returns the `amount` description of the `payment`
- [`issuer.getAmountMathKind()`](./issuer.md#issuer-getamountmathkind)
  - Returns the kind of the `issuer`'s associated math helpers.
- [`zcf.getAmountMath()`](/zoe/api/zoe-contract-facet.md#zcf-getamountmath)
  - Returns an `amountMath`.
- [`zcf.getMathKind(brand)`](/zoe/api/zoe-contract-facet.md#zcf-getamountmath-brand)
  - Returns the `MathKind` associated with the `brand`.

