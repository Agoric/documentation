# AmountMath Object

Library for manipulating and analyzing **[Amounts](./ertp-data-types.md#amount)**.

## Importing and Using AmountMath

To use **AmountMath**, import it from ERTP:
- `import { AmountMath } from '@agoric/ertp';`

## Brand Parameters

Note that many **AmountMath** methods have an optional **[Brand](./brand.md)** parameter. 
For these methods, you should pass in a **Brand** argument you got from  when
you need to do an "absolute" check on the **Brand** within an **[Amount](./ertp-data-types.md#amount)** parameter.
In this case, you want to use the **Brand** you got from the **Issuer** (or from Zoe)
as the optional parameter to compare the **Amount** **Brand**(s) to. If they are
not equal, an error is thrown and no changes are made.


## AmountMath.make(brand, allegedValue)
- **brand** **[Brand](./brand.md)**
- **allegedValue** **[Value](./ertp-data-types.md#value)**
- Returns: **[Amount](./ertp-data-types.md#amount)**

Creates an **Amount** from a given **Value** and a **Brand**.

```js
//amount837 = { value: 837n, brand: quatloos }
const amount837 = AmountMath.make(quatloosBrand, 837n);
```

## AmountMath.coerce(brand, allegedAmount)
- **brand** **[Brand](./brand.md)**
- **allegedAmount** **[Amount](./ertp-data-types.md#amount)**
- Returns: **Amount**

Makes sure an **Amount** is for the specified *brand* and if so, returns it.
If the **Amount** is for an invalid **Brand**, this method throws an exception.

```js
const quatloos50 = AmountMath.make(quatloosBrand, 50n);
// Returns the same amount as quatloos50
const verifiedAmount = AmountMath.coerce(quatloosBrand, allegedAmount); 
```

## AmountMath.getValue(brand, amount)
- **brand** **[Brand](./brand.md)**
- **amount** **[Amount](./ertp-data-types.md#amount)**
- Returns: **[Value](./ertp-data-types.md#amount)**

Returns the **Value** from the given **Amount**.

```js
const quatloos123 = AmountMath.make(quatloosBrand, 123n);

// returns 123n
const myValue = AmountMath.getValue(quatloosBrand, quatloos123);
```
## AmountMath.makeEmpty(brand, assetKind)
- **brand** **[Brand](./brand.md)**
- **assetKind** **[AssetKind](./ertp-data-types.md#assetkind)**
- Returns: **[Amount](./ertp-data-types.md#amount)**

Returns the **Amount** representing an empty **Amount** for the *brand* parameter's 
**Brand**. This is the identity element for **AmountMath.add()** 
and **AmountMath.subtract()**. The empty **Value** depends 
on whether the *assetKind* is **AssetKind.NAT** (*0n*), **AssetKind.COPY_SET** (*[]*), or **AssetKind.COPY_BAG** (*[]*).

```js
// Returns an empty amount.
// Since this is a fungible assetKind it returns an amount
// with 0n as its value.
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
```

## AmountMath.makeEmptyFromAmount(amount)
- **amount** **[Amount](./ertp-data-types.md#amount)**
- Returns: **Amount**

Returns the **Amount** representing an empty **Amount**, using another
**Amount** as the template for the **[Brand](./brand.md)** and **[Value](./ertp-data-types.md#value)**.

```js
// quatloosAmount837 = { value: 837n, brand: quatloos }
const quatloosAmount837 = AmountMath.make(quatloosBrand, 837n);
// Returns an amount = { value: 0n, brand: quatloos }
const quatloosAmount0 = AmountMath.makeEmptyFromAmount(quatloosAmount837);
```

## AmountMath.isEmpty(amount, brand?)
- **amount** **[Amount](./ertp-data-types.md#amount)**
- **brand?** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Boolean**

Returns **true** if the **Amount** is empty. Otherwise returns **false**.

If the optional *brand* argument doesn't match the **Amount**'s **Brand**, an error is thrown.

```js
const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
const quatloos1 = AmountMath.make(quatloosBrand, 1n);

// returns true
const result = AmountMath.isEmpty(empty);

// returns false
const result = AmountMath.isEmpty(quatloos1);
```

## AmountMath.isGTE(leftAmount, rightAmount, brand?)
- **leftAmount** **[Amount](./ertp-data-types.md#amount)**
- **rightAmount** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Boolean**

Returns **true** if the **[Value](./ertp-data-types.md#value)** of *leftAmount* is greater than or equal to
the **Value** of *rightAmount*. Both **Amount** arguments must have the same
**Brand**.

If the optional *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

For non-fungible **Values**, what "greater than or equal to" is depends on the 
kind of **AmountMath**. For example, { 'seat 1', 'seat 2' } is considered
greater than { 'seat 2' } because the former both contains all of the latter's 
content and has additional elements.

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

## AmountMath.isEqual(leftAmount, rightAmount, brand?)
- **leftAmount** **[Amount](./ertp-data-types.md#amount)**
- **rightAmount** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Boolean**

Returns **true** if the **[Value](./ertp-data-types.md#value)** of *leftAmount* is equal to
the **Value** of *rightAmount*. Both **Amount** arguments must have the same
**Brand**.

If the optional *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

For non-fungible **Values**, "equal to" depends on the value of the
**Brand's** **[AssetKind](./ertp-data-types.md#assetkind)**. 

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

## AmountMath.add(leftAmount, rightAmount, brand?)
- **leftAmount** **[Amount](./ertp-data-types.md#amount)**
- **rightAmount** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Amount**

Returns a new **Amount** that is the union of *leftAmount* and *rightAmount*. Both
arguments must be of the same **Brand**.

If the optional *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

For fungible **Amounts** this means adding their **[Values](./ertp-data-types.md#value)**. For non-fungible
**Amounts**, it usually means including all of the elements from *leftAmount*
and *rightAmount*.

If either *leftAmount* or *rightAmount* is empty, this method returns the non-empty 
**Amount** argument. If both are empty, this method returns an empty **Amount**.

```js
import { AssetKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', AssetKind.COPY_SET');
const listAmountA = AmountMath.make(myItemsBrand, ['1','2','4']);
const listAmountB = AmountMath.make(myItemsBrand, ['3']);

// Returns an amount whose value is ['1', '2', '4', '3']
const combinedList = AmountMath.add(listAmountA, listAmountB);
```

## AmountMath.subtract(leftAmount, rightAmount, brand?)
- **leftAmount** **[Amount](./ertp-data-types.md#amount)**
- **rightAmount** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Amount**

Returns a new **Amount** that is the *leftAmount* minus the *rightAmount* (i.e., 
everything in the *leftAmount* that is not in the *rightAmount*). If *leftAmount* 
doesn't include *rightAmount* (i.e., subtraction results in a negative), this method throws an 
error. Because *leftAmount* must include *rightAmount*, this is **not** 
equivalent to set subtraction.

*leftAmount* and *rightAmount* must be of the same **Brand**.

If the optional *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

If *rightAmount* is empty, this method returns *leftAmount*. If both arguments are
empty, this method returns an empty **Amount**.

```js
import { AssetKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', AssetKind.COPY_SET');
const listAmountA = AmountMath.make(myItemsBrand, ['1','2','4']);
const listAmountB = AmountMath.make(myItemsBrand, ['3']);
const listAmountC = AmountMath.make(myItemsBrand, ['2']);

// Returns ['1', '4']
const subtractedList = AmountMath.subtract(listAmountA, listAmountC)

// Throws error
const badList = AmountMath.subtract(listAmountA, listAmountB)
```

## AmountMath.min(x, y, brand?)
- **x** **[Amount](./ertp-data-types.md#amount)**
- **y** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Amount**

Returns the minimum value between *x* and *y*.

*x* and *y* must be of the same **Brand**. If they're not, an error is thrown.

If the optional *brand* argument doesn't match the **Brand** of *x* and *y*, an error is thrown.

```js
const smallerAmount = AmountMath.make(quatloosBrand, 5n);
const largerAmount = AmountMath.make(quatloosBrand, 10n);

//returns smallerAmount
const comparisonResult = AmountMath.min(smallerAmount, largerAmount);
```

## AmountMath.max(x, y, brand?)
- **x** **[Amount](./ertp-data-types.md#amount)**
- **y** **Amount**
- **brand** **[Brand](./brand.md)** - Optional, defaults to **undefined**.
- Returns: **Amount**

Returns the maximum value between *x* and *y*.

*x* and *y* must be of the same **Brand**. If they're not, an error is thrown.

If the optional *brand* argument doesn't match the **Brand** of *x* and *y*, an error is thrown.

```js
const smallerAmount = AmountMath.make(quatloosBrand, 5n);
const largerAmount = AmountMath.make(quatloosBrand, 10n);

//returns largerAmount
const comparisonResult = AmountMath.max(smallerAmount, largerAmount);
```

## Related Methods

The following methods on other ERTP components and objects also either operate
on or return an **Amount** or **AssetKind**.

- [**Issuer.getAmountOf()**](./issuer.md#issuer-getamountof-payment)
  - Returns the **Amount** of a **Payment**.
- [**Issuer.getAssetKind()**](./issuer.md#issuer-getassetkind)
  - Returns the **AssetKind** of the **Issuer**'s associated math helpers.
- [**zcf.getAssetKind()**](/reference/zoe-api/zoe-contract-facet.md#zcf-getassetkind-brand)
  - Returns the **AssetKind** associated with a **Brand**.

