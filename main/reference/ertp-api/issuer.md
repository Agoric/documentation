# Issuer Object

An **Issuer** is the authority on what holds digital assets of its kind. 
While it cannot create new value by creating digital assets like a **[Mint](./mint.md)** can, 
it recognizes and identifies **[Purses](./purse.md)** and **[Payments](./payment.md)** that carry actual value.
It can create empty **Purses** and transform **Payments** (by splitting, 
combining, burning, or exclusively claiming them). 

An **Issuer** has an unchangeable one-to-one relationship with the **Mint** and
**[Brand](./brand.md)** that were created with it. For any **Brands** for which you will accept
**Payments** in, you should obtain its **Issuer** from a trusted source.
You can then rely on that **Issuer** as the authority to 
validate an untrusted **Payment** of that **Brand**.

**Note**: You should not create an **Issuer** in a deploy script. Deploy scripts 
are ephemeral, so any object created there dies as soon as the script ends.

## makeIssuerKit(allegedName, assetKind?, displayInfo?)
- **allegedName** **String** 
- **assetKind** **[AssetKind](./ertp-data-types.md#assetkind)** - Optional, defaults to **AssetKind.NAT**
- **displayInfo** **[DisplayInfo](./ertp-data-types.md#displayinfo)** - Optional, defaults to **undefined**
- **optShutdownWithFailure** - Optional, defaults to **undefined**
- Returns **IssuerKit**. This is an object with three properties:
	- **issuer** **Issuer**
	- **mint** **[Mint](./mint.md)**
 	- **brand** **[Brand](./brand.md)**

Creates and returns a new **Issuer** and its associated **Mint** and **Brand**.
All three are in unchangeable one-to-one relationships with each other. 

The *allegedName* becomes part of the **Brand** in asset descriptions. It
doesn't have to be a **String**, but it will only be used for its value. It
is useful for debugging and double-checking assumptions, but should not be trusted.

The optional *assetKind* specifies the kind of math to use with the digital assets. 
Each implements all of the same set of API methods (i.e., **[AmountMath](./amount-math.md)** methods are 
polymorphic). We recommend you import and use the **AssetKind** values from **@agoric/ertp** 
instead of using **Strings**. 

The optional *displayInfo* tells the UI how to display **[Amounts](./ertp-data-types.md#amount)** of this **Brand**.

```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to AssetKind.NAT
makeIssuerKit('title', AssetKind.SET);
```

```js
const { Issuer: quatloosIssuer, mint: quatloosmint, brand: quatloosbrand } = 
      makeIssuerKit('quatloos');
// This is merely an amount, describing assets, not minting assets
const quatloos2 = AmountMath.make(quatloosbrand, 2n);

const { issuer: titleIssuer, mint: titlemint, brand: titlebrand } = 
      makeIssuerKit('propertyTitle');
// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = AmountMath.make(propertyTitlebrand, ['1292826']);
const adjacentProperty = AmountMath.make(propertyTitlebrand, ['1028393']);
const combinedProperty = AmountMath.make(propertyTitlebrand, ['1292826', '1028393']);
```

## Issuer.getAllegedName()
- Returns: **allegedName**

Returns the **allegedName** for the **Issuer**.

An alleged name is a human-readable string name 
of a kind of digital asset. An alleged name
should not be trusted as accurate because there is
no public registry or expectation of uniqueness. This
means there can be multiple **Issuers**, **[Mints](./mint.md)**, or **[Brands](./brand.md)** with the
same alleged name, and thus the name by itself does not
uniquely identify an **Issuer**. Rather, the **Brand** does that.

To put it another way, nothing stops anyone from creating an **Issuer**
with the alleged name *Quatloos* (or *BTC*, or whatever), regardless of whether
or not such a name is already in use. The alleged name is just a
human readable string which is helpful for debugging.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
// quatloosIssuerAllegedName === 'quatloos'
```

## Issuer.getAssetKind()
- Returns: **[AssetKind](./ertp-data-types.md#assetkind)**

Returns the kind of the **Issuer**'s asset: either **AssetKind.NAT** ("nat") or **AssetKind.SET** ("set").

The **AssetKind** specifies what kind of values are used in **[Amounts](./ertp-data-types.md#amount)** for this **Issuer**. 

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
quatloosIssuer.getAssetKind(); // Returns 'nat', also known as AssetKind.NAT, the default value.
const { issuer: moolaIssuer } = makeIssuerKit('moola', AssetKind.SET);
moolaIssuer.getAssetKind(); // Returns 'set', also known as 'AssetKind.SET**
```

## Issuer.getAmountOf(payment)
- **payment** **[Payment](./payment.md)**
- Returns: **[Amount](./ertp-data-types.md#amount)**

Describes the **Payment**'s balance as an **Amount**. Because a **Payment** from an untrusted
source cannot be trusted to provide its own true value, the **Issuer** must be used to
validate its **[Brand](./brand.md)** and report how much the returned **Amount** contains.

```js
const { issuer: quatloosIssuer, mint: quatloosmint, brand: quatloosbrand} = makeIssuerKit('quatloos');
const quatloospayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 100n));
quatloosIssuer.getAmountOf(quatloospayment); // returns an amount of 100 Quatloos 
```

## Issuer.getBrand()
- Returns: **[Brand](./brand.md)** 

Returns the **Brand** for the **Issuer**. The **Brand** indicates the kind of digital asset
and is the same for the **Issuer**'s associated **[Mint](./mint.md)**, and any **[Purses](./purse.md)** and **[Payments](./payment.md)** of this particular
kind. The **Brand** is not closely held, so this method should not be trusted to identify
an **Issuer** alone. Fake digital assets and amounts can use another **Issuer's** **Brand**.

```js
const { issuer: quatloosIssuer, brand: quatloosbrand } = makeIssuerKit('quatloos');
const quatloosbrand = quatloosIssuer.getBrand();
// brand === quatloosbrand
```

## Issuer.makeEmptypurse()
- Returns: **[Purse](./purse.md)**

Makes and returns an empty **Purse** that holds assets of the **[Brand](./brand.md)** associated with the **Issuer**.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloospurse = quatloosIssuer.makeEmptypurse();
```

## **Issuer.burn(payment, optAmount?)**
- **payment** **[Payment](./payment.md)**
- **optAmount** **[Amount](./ertp-data-types.md#amount)** - Optional.
- Returns: **Amount**

Destroys all of the digital assets in the **Payment**,
making them unavailable for later use,
and returns an **Amount** of what was burned.

*optAmount* is optional. If *optAmount* is present, 
the code insists the **Payment** balance is equal to *optAmount*, to prevent sending the wrong **Payment**
and other confusion.  

If the *Payment* is a promise, the operation proceeds after it resolves to a **Payment**.

```js
const { issuer: quatloosIssuer, mint: quatloosmint, brand: quatloosbrand } = 
      makeIssuerKit('quatloos');     
const amountToBurn = AmountMath.make(quatloosbrand, 10n);
const paymentToBurn = quatloosmint.mintpayment(amountToBurn);

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosIssuer.burn(paymentToBurn, amountToBurn);
```

## Issuer.claim(payment, optAmount?)
- **payment** **[Payment](./payment.md)**
- **optAmount** **[Amount](./ertp-data-types.md#amount)** - Optional
- Returns: **Payment** 

Transfer all digital assets from *payment* to a new **Payment** and consume the
original, making it unavailable for later use.

*optAmount* is optional. 
If *optAmount* is present, *payment*'s balance must be
equal to *optAmount*, to prevent sending the wrong **Payment** and other confusion. 
If *optAmount* does not equal the balance in the original *payment*
then this method throws an error.  

If the **Payment** is a promise, the operation proceeds after it resolves to a **Payment**.

```js
const { mint: quatloosmint, issuer: quatloosIssuer, brand: quatloosbrand } = makeIssuerKit('quatloos');
const amountExpectedToTransfer = AmountMath.make(quatloosbrand, 2n);
const originalpayment = quatloosmint.mintpayment(amountExpectedToTransfer);

const newpayment = quatloosIssuer.claim(originalpayment, amountToTransfer);
```

## Issuer.combine(paymentsArray, optTotalAmount?)
- **paymentsArray** **Array &lt;Payment>**
- **optTotalAmount** **[Amount](./ertp-data-types.md#amount)** - Optional.
- Returns: **Payment**

Combines multiple payments into one new payment. If any item in *paymentsArray* is
a promise, the operation proceeds after each such promise resolves to a payment.
All payments in *paymentsArray* are consumed and made unavailable for later use.

If the optional *optTotalAmount* is present, the total value of all **Payments** in *paymentsArray*
must equal *optTotalAmount* or it throws an error.

Each **Payment** in *paymentsArray* must be associated with the same **Brand** as **Issuer**.

```js
const { mint: quatloosmint, issuer: quatloosIssuer, brand: quatloosbrand } = makeIssuerKit('quatloos');
// create an array of 100 payments of 1 quatloo each
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 1n)));
}

// combinedpayment equals 100
const combinedpayment = quatloosIssuer.combine(payments);
```

## Issuer.split(payment, paymentAmountA)
- **payment** **[Payment](./payment.md)**
- **paymentAmountA** **[Amount](./ertp-data-types.md#amount)**
- Returns: **Array &lt;Payment>**

Splits a single **Payment** into two new **Payments**, A and B, according to *paymentAmountA*.
For example, if the **Payment** is for 10 *Quatloos*, and *paymentAmountA* is 3 *Quatloos*,
it returns an array of two payments with respective balances of 3 *Quatloos* and 7 *Quatloos*.

The original *Payment* is consumed and made unavailable for later use.

If the **Payment** is a promise, the operation proceeds after it resolves to a payment.

*payment* and *paymentAmountA* must both be associated with the same brand as **Issuer**.

```js
const { mint: quatloosmint, issuer: quatloosIssuer, brand: quatloosbrand } = makeIssuerKit('quatloos');
const oldpayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 20n));
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = quatloosIssuer.split(oldpayment, AmountMath.make(quatloosbrand, 5n));
```

## Issuer.splitMany(payment, amountArray)
- **payment** **[Payment](./payment.md)**
- **amountArray** **Array &lt;Amount>**
- Returns: **Array &lt;Payment>**

Splits a single **Payment** into multiple **Payments**.
The returned array includes a **Payment** item corresponding to each **Amount** of **amounts**, in order.

The original **Payment** is consumed and made unavailable for later use.

If the **Payment** is a promise, the operation proceeds after it resolves to a payment.

If the **Amounts** in *amountArray* don't add up to the value of *payment*, the operation fails.
*payment* and each **Amount** in *amountArray* must be associated with the same **Brand** as **Issuer**.

```js
const { mint: quatloosmint, issuer: quatloosIssuer, brand: quatloosbrand} = makeIssuerKit('quatloos');
const oldpayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 100n));
const goodAmounts = Array(10).fill(AmountMath.make(quatloosbrand, 10n));

const arrayOfNewpayments = quatloos.Issuer.splitMany(oldpayment, goodAmounts);

// The total amount in the amountArray must equal the original payment amount
// Set original amount to 1000n
const payment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 1000n));

// Total amounts in badAmounts equal 20n, when it should equal 1000n
const badAmounts = Array(2).fill(AmountMath.make(quatloosbrand, 10n));

// 20n does not equal 1000n, so throws error
quatloosIssuer.splitMany(payment, badAmounts);
```

## Issuer.isLive(payment)
- **payment** **[Payment](./payment.md)**
- Returns: **Boolean**

Returns **true** if the *payment* was created by the **Issuer** and is available for use 
(i.e., it hasn't been consumed or burned).
If *payment* is a promise, the method proceeds after it resolves to a **Payment**.
