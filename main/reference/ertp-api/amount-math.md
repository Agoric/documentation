# AmountMath Object

Logic for manipulating **amounts**.

## Importing and Using AmountMath

To use the **AmountMath** library, import it from ERTP:
- `import { AmountMath } from '@agoric/ertp';`

## Brand Parameters

Note that many **AmountMath** methods have a **[brand](./brand.md)** parameter. For the ones with an optional **brand** argument, you should use it if
you need to do an "absolute" check on the brand in the **amount** argument.
In this case, you want to use the **brand** you got from the issuer (or from Zoe)
as the optional parameter to compare the **amount** **brand**(s) to. If they are
not equal, an error is thrown.


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

Makes sure an **Amount** is for the specified **Brand** and if so, returns it.
If it's not valid, the method throws an exception. This method is used to 
check if an **Amount** is actually for the expected **Brand**.

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

Returns the **Amount** representing an empty **Amount** for the **brand** argument's 
**Brand**. This is the identity element for **AmountMath.add()** 
and **AmountMath.subtract()**. The empty **value** depends 
on whether the **assetKind** is **AssetKind.NAT** (**0n**) or **AssetKind.SET** (**[]**).

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
**Amount** as the template for the **[Brand](./brand.md)** and **assetKind**.

```js
// quatloosAmount837 = { value: 837n, brand: quatloos }
const quatloosAmount837 = AmountMath.make(quatloosBrand, 837n);
// Returns an amount = { value: 0n, brand: quatloos }
const quatloosAmount0 = AmountMath.makeEmptyFromAmount(quatloosAmount837);
```

## AmountMath.isEmpty(amount, brand?)
- **amount** **[Amount](./ertp-data-types.md#amount)**
- **brand?** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **Boolean**

Returns **true** if the **Amount** is empty. Otherwise returns **false**.

If the *brand* argument doesn't match the **Amount**'s **Brand**, an error is thrown.

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
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **boolean**

Returns **true** if the **[Value](./ertp-data-types.md#value)** of *leftAmount* is greater than or equal to
the **Value** of *rightAmount*. Both **Amount** arguments must have the same
**Brand**.

If the *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

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
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **boolean**

Returns **true** if the **[Value](./ertp-data-types.md#value)** of *leftAmount* is equal to
the **Value** of *rightAmount*. Both **Amount** arguments must have the same
**Brand**.

If the *brand* argument doesn't match the **Amount**s' **Brand**, an error is thrown.

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
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **Amount**

Returns a new **Amount** that is the union of *leftAmount* and *rightAmount*. Both
arguments must be of the same **Brand**.

The **brand** argument is optional, defaulting to **undefined**.
If it does not match the **amounts** **brand**, an error is thrown.

For fungible **amounts** this means adding their **values**. For non-fungible
**amounts**, it usually means including all of the elements from *leftAmount*
and *rightAmount*.

If either *leftAmount* or *rightAmount* is empty, it just returns the non-empty 
**amount** argument. If both are empty, it returns an empty **amount**.

```js
import { AssetKind, makeIssuerKit, AmountMath } from '@agoric/ertp';
const { brand: myItemsBrand } = makeIssuerKit('myItems', AssetKind.SET');
const listAmountA = AmountMath.make(myItemsBrand, ['1','2','4']);
const listAmountB = AmountMath.make(myItemsBrand, ['3']);

// Returns an amount whose value is ['1', '2', '4', '3']
const combinedList = AmountMath.add(listAmountA, listAmountB);
```

## AmountMath.subtract(leftAmount, rightAmount, brand?)
- **leftAmount** **[Amount](./ertp-data-types.md#amount)**
- **rightAmount** **Amount**
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **Amount**

Returns a new **Amount** that is the *leftAmount* minus the *rightAmount* (i.e., 
everything in the *leftAmount* that is not in the *rightAmount*). If *leftAmount* 
doesn't include *rightAmount* (subtraction results in a negative), it throws an 
error. Because *leftAmount* must include *rightAmount*, this is **not** 
equivalent to set subtraction.

*leftAmount* and *rightAmount* must be of the same **brand**.

The **brand** argument is optional, defaulting to **undefined**.
If it does not match the **amounts** **brand**, an error is thrown.

If the **rightAmount** is empty, it returns the **leftAmount**. If both arguments are
empty, it returns an empty **amount**.

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

## AmountMath.min(x, y, brand?)
- **x** **Amount**
- **y** **Amount**
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **Amount**

TBD

## AmountMath.max(x, y, brand?)
- **x** **Amount**
- **y** **Amount**
- **brand** **[Brand](./brand.md)** (optional, defaults to **undefined**)
- Returns: **Amount**

TBD

## Related Methods

The following methods on other ERTP components and objects also either operate
on or return an **Amount** or **AssetKind**.

- [**Issuer.getAmountOf(payment)**](./issuer.md#issuer-getamountof-payment)
  - Returns the **Amount** of the **Payment**
- [**Issuer.getAssetKind()**](./issuer.md#issuer-getassetkind)
  - Returns the **AssetKind** of the **Issuer**'s associated math helpers.
- [**zcf.getAssetKind(brand)**](/reference/zoe-api/zoe-contract-facet.md#zcf-getassetkind-brand)
  - Returns the **AssetKind** associated with the **Brand**.

