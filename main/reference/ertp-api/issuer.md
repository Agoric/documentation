# Issuer Object

An **Issuer** is the authority on what holds digital assets of its kind.
While it cannot create new value by creating digital assets like a **[Mint](./mint)** can,
it recognizes and identifies **[Purses](./purse)** and **[Payments](./payment)** that carry actual value.
It can create empty **Purses** and transform **Payments** (by splitting,
combining, burning, or exclusively claiming them).

An **Issuer** has an unchangeable one-to-one relationship with the **Mint** and
**[Brand](./brand)** that were created with it. For any **Brands** for which you will accept
**Payments** in, you should obtain its **Issuer** from a trusted source.
You can then rely on that **Issuer** as the authority to
validate an untrusted **Payment** of that **Brand**.

**Note**: You should not create an **Issuer** in a deploy script. Deploy scripts
are ephemeral, so any object created there dies as soon as the script ends.

## makeIssuerKit(allegedName, assetKind?, displayInfo?, optShutdownWithFailure?, elementShape?)

- **allegedName**: **String**
- **assetKind**: **[AssetKind](./ertp-data-types#assetkind)** - Optional, defaults to **AssetKind.NAT**.
- **displayInfo**: **[DisplayInfo](./ertp-data-types#displayinfo)** - Optional, defaults to **undefined**.
- **optShutdownWithFailure** - Optional, defaults to **undefined**.
- **elementShape** - Optional, defaults to **undefined**.
- Returns **IssuerKit**. This is an object with three properties:
  - **issuer**: **Issuer**
  - **mint**: **[Mint](./mint)**
  - **brand**: **[Brand](./brand)**

Creates and returns a new **Issuer** and its associated **Mint** and **Brand**.
All three are in unchangeable one-to-one relationships with each other.

The _allegedName_ becomes part of the **Brand** in asset descriptions. It
doesn't have to be a **String**, but it will only be used for its value. It
is useful for debugging and double-checking assumptions, but should not be trusted.

The optional _assetKind_ parameter specifies the kind of asset associated with the **Issuer** about
to be created. If no **AssetKind** argument is passed into the method, then the **Issuer**'s asset
kind defaults to **AssetKind.NAT**. **[AmountMath](./amount-math)**'s methods work with all the
kinds of assets, but exactly what math or manipulation is performed varies depending on
the **AssetKind**.

The optional _displayInfo_ parameter tells the UI how to
display **[Amounts](./ertp-data-types#amount)** of this **Brand**.

The optional _optShutdownWithFailure_ parameter should be used for mission-critical
**Issuers**. This parameter is a function that will stop the vat hosting the
**Issuer** if **Issuer** invariants are violated.

The optional _elementShape_ parameter is only used when creating an **Issuer** that
has a non-fungible asset associated with it. When used, the _elementShape_ parameter is an object
with however many properties are required to describe the asset. This object sets the
_valueShape's_ properties of the asset's **[AmountShape](./ertp-data-types#amountshape)**.

```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp'
makeIssuerKit('quatloos') // Defaults to AssetKind.NAT
makeIssuerKit('title', AssetKind.COPY_SET)
```

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
// This is merely an amount, describing assets, not minting assets
const quatloos2 = AmountMath.make(quatloosBrand, 2n)

const {
  issuer: titleIssuer,
  mint: titleMint,
  brand: titleBrand
} = makeIssuerKit('propertyTitle')
// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = AmountMath.make(propertyTitleBrand, ['1292826'])
const adjacentProperty = AmountMath.make(propertyTitleBrand, ['1028393'])
const combinedProperty = AmountMath.make(propertyTitleBrand, [
  '1292826',
  '1028393'
])
```

## anIssuer.getAllegedName()

- Returns: **allegedName**

Returns the **allegedName** for the **Issuer**.

An alleged name is a human-readable string name
of a kind of digital asset. An alleged name
should not be trusted as accurate because there is
no public registry or expectation of uniqueness. This
means there can be multiple **Issuers**, **[Mints](./mint)**, or **[Brands](./brand)** with the
same alleged name, and thus the name by itself does not
uniquely identify an **Issuer**. Rather, the **Brand** does that.

To put it another way, nothing stops anyone from creating an **Issuer**
with the alleged name _Quatloos_ (or _BTC_, or whatever), regardless of whether
or not such a name is already in use. The alleged name is just a
human readable string which is helpful for debugging.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos')
const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName()
// quatloosIssuerAllegedName === 'quatloos'
```

## anIssuer.getAssetKind()

- Returns: **[AssetKind](./ertp-data-types#assetkind)**

Returns the kind of the **Issuer**'s asset.

The **AssetKind** specifies what kind of values are used in **[Amounts](./ertp-data-types#amount)** for this **Issuer**.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos')
quatloosIssuer.getAssetKind() // Returns 'nat', also known as AssetKind.NAT, the default value.
const { issuer: moolaIssuer } = makeIssuerKit('moola', AssetKind.COPY_SET)
moolaIssuer.getAssetKind() // Returns 'copy_set', also known as 'AssetKind.COPY_SET'
```

## anIssuer.getAmountOf(payment)

- **payment**: **[Payment](./payment)**
- Returns: **[Amount](./ertp-data-types#amount)**

Describes the **Payment**'s balance as an **Amount**. Because a **Payment** from an untrusted
source cannot be trusted to provide its own true value, the **Issuer** must be used to
validate its **[Brand](./brand)** and report how much the returned **Amount** contains.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
const quatloosPayment = quatloosMint.mintPayment(
  AmountMath.make(quatloosBrand, 100n)
)
quatloosIssuer.getAmountOf(quatloosPayment) // returns an amount of 100 Quatloos
```

## anIssuer.getBrand()

- Returns: **[Brand](./brand)**

Returns the **Brand** for the **Issuer**. The **Brand** indicates the kind of digital asset
and is the same for the **Issuer**'s associated **[Mint](./mint)**, and any **[Purses](./purse)** and **[Payments](./payment)** of this particular
kind. The **Brand** is not closely held, so this method should not be trusted to identify
an **Issuer** alone. Fake digital assets and amounts can use another **Issuer's** **Brand**.

```js
const { issuer: quatloosIssuer, brand: quatloosBrand } =
  makeIssuerKit('quatloos')
const quatloosBrand = quatloosIssuer.getBrand()
// brand === quatloosBrand
```

## anIssuer.makeEmptyPurse()

- Returns: **[Purse](./purse)**

Makes and returns an empty **Purse** that holds assets of the **[Brand](./brand)** associated with the **Issuer**.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos')
const quatloosPurse = quatloosIssuer.makeEmptyPurse()
```

## **anIssuer.burn(payment, optAmount?)**

- **payment**: **[Payment](./payment)**
- **optAmount**: **[Amount](./ertp-data-types#amount)** - Optional.

- Returns: **Amount**

Destroys all of the digital assets in the **Payment**,
making it unavailable for later use,
and returns an **Amount** of what was burned.

If an _optAmount_ argument is passed into the method,
_payment_'s balance must be equal to _optAmount_ in order to prevent claiming the wrong **Payment**.
If _optAmount_ does not equal the balance in the original **Payment** an error is thrown,
and the original **Payment** is unmodified.

If _payment_ is a promise, the operation proceeds after it resolves to a **Payment**.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
const amountToBurn = AmountMath.make(quatloosBrand, 10n)
const paymentToBurn = quatloosMint.mintPayment(amountToBurn)

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosIssuer.burn(paymentToBurn, amountToBurn)
```

## anIssuer.isLive(payment)

- **payment**: **[Payment](./payment)**
- Returns: **Boolean**

Returns **true** if the _payment_ was created by the **Issuer** and is available for use
(i.e., it hasn't been consumed).

If _payment_ is a promise, the method proceeds after it resolves to a **Payment**.

::: warning DEPRECATED

## anIssuer.claim(payment, optAmount?)

- **payment**: **[Payment](./payment)**
- **optAmount**: **[Amount](./ertp-data-types#amount)** - Optional.
- Returns: **Payment**

Transfers all digital assets from _payment_ to a new **Payment** and consumes the
original **Payment**, making it unavailable for later use.

If the _optAmount_ argument is passed into the method, _payment_'s balance must be
equal to _optAmount_, to prevent claiming the wrong **Payment**.
If _optAmount_ does not equal the balance in the original **Payment** an error is thrown,
and the original **Payment** is unmodified.

If _payment_ is a promise, the operation proceeds after it resolves to a **Payment**.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
const amountExpectedToTransfer = AmountMath.make(quatloosBrand, 2n)
const originalPayment = quatloosMint.mintPayment(amountExpectedToTransfer)

const newPayment = quatloosIssuer.claim(originalPayment, amountToTransfer)
```

## anIssuer.combine(paymentsArray, optTotalAmount?)

- **paymentsArray**: **Array&lt;[Payment](./payment)>**
- **optTotalAmount**: **[Amount](./ertp-data-types#amount)** - Optional.
- Returns: **Payment**

Combines multiple **Payments** into one new **Payment**. If any item in _paymentsArray_ is
a promise, the operation proceeds after each such promise resolves to a **Payment**.
All **Payments** in _paymentsArray_ are consumed and made unavailable for later use.

If the _optTotalAmount_ argument is passed into the method,
the total value of all **Payments** in _paymentsArray_
must equal _optTotalAmount_. If they don't, the method throws an error,
and the original **Payment** is unmodified.

Each **Payment** in _paymentsArray_ must be associated with the same **[Brand](./brand)** as the **Issuer**.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
// Create an array of 100 payments of 1 quatloo each
const payments = []
for (let i = 0; i < 100; i += 1) {
  payments.push(quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 1n)))
}

// combinedPayment equals 100
const combinedPayment = quatloosIssuer.combine(payments)
```

## anIssuer.split(payment, paymentAmountA)

- **payment**: **[Payment](./payment)**
- **paymentAmountA**: **[Amount](./ertp-data-types#amount)**
- Returns: **Array&lt;Payment>**

Splits a single **Payment** into two new **Payments**, A and B, according to _paymentAmountA_.
For example, if the **Payment** is for 10 _Quatloos_, and _paymentAmountA_ is 3 _Quatloos_,
the method returns an array of two **Payments** with balances of 3 _Quatloos_ and 7 _Quatloos_.

The original **Payment** is consumed and made unavailable for later use.

If _payment_ is a promise, the operation proceeds after it resolves to a **Payment**.

_payment_ and _paymentAmountA_ must both be associated with the same **[Brand](./brand)** as the **Issuer**.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
const oldPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 20n))
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = quatloosIssuer.split(
  oldPayment,
  AmountMath.make(quatloosBrand, 5n)
)
```

## anIssuer.splitMany(payment, amountArray)

- **payment**: **[Payment](./payment)**
- **amountArray**: **Array&lt;[Amount](./ertp-data-types#amount)>**
- Returns: **Array&lt;Payment>**

Splits a single **Payment** into multiple **Payments**.
The returned array includes a **Payment** item corresponding to each **Amount** in the _amountArray_ parameter, in order.

The original **Payment** is consumed and made unavailable for later use.

If _payment_ is a promise, the operation proceeds after it resolves to a **Payment**.

If the **Amounts** in _amountArray_ don't add up to the value of _payment_, the operation fails.
_payment_ and each **Amount** in _amountArray_ must be associated with the same **[Brand](./brand)** as **Issuer**.

```js
const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos')
const oldPayment = quatloosMint.mintPayment(
  AmountMath.make(quatloosBrand, 100n)
)
const goodAmounts = Array(10).fill(AmountMath.make(quatloosBrand, 10n))

const arrayOfNewPayments = quatloosIssuer.splitMany(oldPayment, goodAmounts)

// The total amount in the amountArray must equal the original payment amount
// Set original amount to 1000n
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 1000n))

// Total amounts in badAmounts equal 20n, when it should equal 1000n
const badAmounts = Array(2).fill(AmountMath.make(quatloosBrand, 10n))

// 20n does not equal 1000n, so throws error
quatloosIssuer.splitMany(payment, badAmounts)
```

:::
