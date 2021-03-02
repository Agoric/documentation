# Amount Math

Logic for manipulating `amounts`.

## Obtaining an AmountMath

There are three ways and circumstances you can get access to an `amountMath`:
- You made its associated `mint` and `issuer` with `makeIssuerKit()`, so use the `amountMath` returned from the call. 
- You are writing a Zoe contract and the `issuer` is saved in Zoe, so call `zcf.getAmountMath(brand)`. 
- You receive or learn about an `issuer` and are not writing a Zoe contract, so call `makeLocalAmountMath(issuer)`.

## AmountMath Kinds

There are three different kinds of `amountMath`, each of which implements all the methods shown on this page. You only have to specify the `amountMath` kind when creating its associated `issuer`.

The three kinds of `amountMath` each implement all of the same set of API methods (i.e. `amountMath` methods are polymorphic). We recommend you import the `MathKind` values from `@agoric/ERTP` instead of making the strings yourself. 

- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` `values` are natural numbers (non-negative BigInts).
- `MathKind.STRING_SET` (`strSet`): Used with non-fungible assets. `amount` `values` are strings.
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` `values` are objects or records with multiple properties.

Use `makeIssuerKit(allegedName, MathKind)` to specify which `amountMath` 
kind your contract uses. The second parameter, `MathKind` is optional and 
defaults to `MathKind.NAT` if not given. For example
```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to MathKind.NAT
makeIssuerKit('foobars', MathKind.STRING_SET);
makeIssuerKit('kitties', MathKind.SET);
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
normally represented by a natural number BigInt. Other `values` may be represented as strings
naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

Note that numbers in a value are represented as type `BigInt`, which allows for arbitrarily 
large numbers. BigInts are depicted as an integer with an appended "n"; e.g. 10n, 137n. 
See the [BigInt section in the JavaScript Distributed Programming Guide](/guides/js-programming/bigint.md) for details. 

## makeLocalAmountMath(issuer)
- `issuer`: `{issuer}`
- Returns: `{ Promise<AmountMath> }`

Creates and returns a local `amountMath` object. The new
local copy uses the same remote `brand` as the `issuer` does.

This should be used when you need an `amountMath`, and receive or 
learn about an `issuer`, and are not writing a Zoe contract.
```js
import { makeLocalAmountMath } from '@agoric/ertp';
const quatloosAmountMath = await makeLocalAmountMath(quatloosIssuer);
```

## amountMath.getBrand()
- Returns: `{Brand}`

Return the `brand` the `amountMath` works on. 

The association cannot be broken or changed;
a particular `amountMath` and its methods 
will always and only be used on `amounts` that have that
`amountMath`'s initially associated `brand`. 

```js
//Get the amountMath's associated brand.
const exampleBrand = exampleAmountMath.getBrand();
```

## amountMath.getAmountMathKind()
- Returns: `{String}`

Get the kind (`MathKind.NAT`, `MathKind.STRING_SET`, `MathKind.SET`) of the `amountMath`.

```js
quatloosAmountMath.getAmountMathKind(); // For example, returns MathKind.NAT
```

## amountMath.make(allegedValue)

- `allegedValue` `{Value}`
- Returns: `{Amount}`

Make an `amount` from a `value` by adding the `brand` associated with
the `amountMath`.

Remember that numbers in `values` are represented as `BigInts`; integers
with an appended "n". As seen in the below example, we strongly encourage
using BigInts as the argument to `amountMath.make()`. While `amountMath.make()`
does coerce a `Number` argument to a `BigInt`, so both `4` and `4n` return an
amount with a value of `4n`, using Numbers is likely to confuse later viewers
of your code. 

See the [BigInt section in the JavaScript Distributed Programming Guide](/guides/js-programming/bigint.md) for 
details about `BigInts`. 


```js
//amount837 = { value: 837n, brand: quatloos }
const amount837 = quatloosAmountMath.make(837n);
```

## amountMath.coerce(allegedAmount)
- `allegedAmount` `{Amount}`
- Returns: `{Amount}`

Make sure this `amount` is valid and if so, return it.
If not valid, throws an exception. This checks if
an `amount` coming from elsewhere is for the expected `brand`.

```js
const quatloos50 = quatloosAmountMath.make(50n);
// Returns the same amount as quatloos50
const verifiedAmount = quatlooAmountMath.coerce(allegedAmount); 
```

## amountMath.getValue(amount)
- `amount` `{Amount}`
- Returns: `{Value}`

Returns the `value` from the given `amount`. Remember, numeric values
are represented as `BigInts`, not `Numbers`.

```js
const quatloos123 = quatloosAmountMath.make(123n);

// returns 123n
const myValue = quatloosAmountMath.getValue(quatloos123);
```

## amountMath.getEmpty()
- Returns: `{Amount}`

Returns the `amount` representing an empty `amount` for the `amountMath`'s 
associated `brand`. This is the identity element for `AmountMath.add()` 
and `AmountMath.subtract()`. The empty `value` depends 
on whether the `amountMath` is `MathKind.NAT` (`0`), `MathKind.SET` (`[]`), 
or `MathKind.STRING_SET` (`[]`).

```js
// Returns an empty amount for this amountMath.
// Since this is a fungible amount it returns an amount
// with 0n as its value.
const empty = quatloosAmountMath.getEmpty();
```

## amountMath.isEmpty(amount)
- `amount` `{Amount}`
- Returns: `{Boolean}`

Returns `true` if the `amount` is empty. Otherwise returns `false`.

```js
const empty = quatloosAmountMath.getEmpty();
const quatloos1 = quatloosAmountMath.make(1n);

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
`brand` as this `amountMath`.

For non-fungible `values`, what "greater than or equal to" is depends on the 
kind of `amountMath`. For example, { 'seat 1', 'seat 2' } is considered
greater than { 'seat 2' } because the former both contains all of the latter's 
contents and has additional elements.

```js
const empty = quatloosAmountMath.getEmpty();
const quatloos5 = quatloosAmountMath.make(5n);
const quatloos10 = quatloosAmountMath.make(10n);

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
For example, { 'seat 1', 'seat 2' } is considered
unequal to { 'seat 2' } because the number of items in the former is
different from that of the latter. Similarly { 'seat 1',  'seat 3'  } and { 'seat 2' } 
are considered unequal because the latter has elements that are not contained in the former.

```js
const empty = quatloosAmountMath.getEmpty();
const quatloos10 = quatloosAmountMath.make(10n);
const quatloos5 = quatloosAmountMath.make(5n);
const quatloos5b = quatloosAmountMath.make(5n);

// Returns true
quatloosAmountMath.isEqual(quatloos10, quatloos10);
// Returns true
quatloosAmountMath.isEqual(quatloos5, quatloos5b);
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
const { issuer: myItemsIssuer } = makeIssuerKit('myItems', MathKind.STRING_SET');
const myItemsAmountMath = makeLocalAmountMath(myItemsIssuer);
const listAmountA = myItemsAmountMath.make(harden['1','2','4']);
const listAmountB = myItemsAmountMath.make(harden['3']);

// Returns an amount whose value is ['1', '2', '4', '3']
const combinedList = itemsAmountMath.add(listAmountA, listAmountB);
```

## amountMath.subtract(leftAmount, rightAmount)
- `leftAmount` `{Amount}`
- `rightAmount` `{Amount}`
- Returns: `{Amount}`

Returns a new `amount` that is the `leftAmount` minus the `rightAmount` (i.e. 
everything in the `leftAmount` that is not in the `rightAmount`). If `leftAmount` 
doesn't include `rightAmount` (subtraction results in a negative), it throws an 
error. Because `leftAmount` must include `rightAmount`, this is **not** 
equivalent to set subtraction.

`leftAmount` and `rightAmount` must be of the same `brand`.

If the `rightAmount` is empty, it returns the `leftAmount`. If both arguments are
empty, it returns an empty `amount`.

```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
const { issuer: myItemsIssuer } = makeIssuerKit('myItems', MathKind.STRING_SET);
const myItemsLocalAmountMath = makeLocalAmountMath(myItemsIssuer);
const listAmountA = myItemsAmountMath.make(harden['1','2','4']);
const listAmountB = myItemsAmountMath.make(harden['3']);
const listAmountC = myItemsAmountMath.make(harden['2']);

// Returns ['1', '4']
const subtractedList = itemsAmountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = itemsAmountMath.subtract(listAmountA, listAmountB)
```
## Related Methods

The following methods on other ERTP components and objects also either operate
on or return an `amount` or `amountMath`. While a brief description is given for each, you should
click through to a method's main documentation entry for full details on
what it does and how to use it.

- [`issuer.getAmountOf(payment)`](./issuer.md#issuer-getamountof-payment)
  - Returns the `amount` description of the `payment`
- [`issuer.getAmountMathKind()`](./issuer.md#issuer-getamountmathkind)
  - Returns the kind of the `issuer`'s associated `amountMath`.
- [`zcf.getAmountMath(brand)`](/zoe/api/zoe-contract-facet.md#zcf-getamountmath-brand)
  - Returns the `amountMath` associated with the `brand`.
