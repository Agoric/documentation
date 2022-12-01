# issuer Object

An **issuer** is the authority on what holds digital assets of its kind. 
While it cannot create new value by creating digital assets like a **[mint](./mint.md)** can, 
it recognizes and identifies **[purses](./purse.md)** and **[payments](./payment.md)** that carry actual value.
It can create empty **purses** and transform **payments** (by splitting, 
combining, burning, or exclusively claiming them). 

An **issuer** has an unchangeable one-to-one relationship with the **mint** and
**[brand](./brand.md)** that were created with it. For any **brands** for which you will accept
**payments** in, you should obtain its **issuer** from a trusted source.
You can then rely on that **issuer** as the authority to 
validate an untrusted **payment** of that **brand**.

**Note**: You should not create an **issuer** in a deploy script. Deploy scripts 
are ephemeral, so any object created there dies as soon as the script ends.

## makeissuerKit(allegedName, assetKind?, displayInfo?)
- **allegedName** **String** 
- **assetKind** **AssetKind** - optional, defaults to **AssetKind.NAT**
- **displayInfo** **[DisplayInfo](./displayInfo.md)** - optional, defaults to **undefined**
- Returns **issuerKit**. This is an object with three properties:
	- **issuer** **issuer**
	- **mint** **[mint](./mint.md)**
 	- **brand** **[brand](./brand.md)**

Creates and returns a new **issuer** and its associated **mint** and **brand**.
All three are in unchangeable one-to-one relationships with each other. 

The **allegedName** becomes part of the **brand** in asset descriptions. It
doesn't have to be a **string**, but it will only be used for its value. It
is useful for debugging and double-checking assumptions, but should not be trusted.

The optional **assetKind** specifies the kind of math to use with the digital assets. 
Each implements all of the same set of API methods (i.e., **[AmountMath](./amount-math.md)** methods are 
polymorphic). We recommend you import and use the **AssetKind** values from **@agoric/ertp** 
instead of using **strings**. 
- **AssetKind.NAT** (**nat**): Used with fungible assets. **amount** **values** are natural numbers (i.e., non-negative BigInts). This is the default value for the *AssetKind* parameter.
- **AssetKind.SET** (**set**): Used with non-fungible assets. **amount** **values** are arrays that can
  include strings, numbers, objects, or anything comparable. The **amount** **values** can't include promises, **[purses](./purse.md)**, or **[payments](./payment.md)**.

The optional **displayInfo** tells the UI how to display **[amounts](/glossary/#amount)** of this **brand**.

```js
import { AssetKind, makeissuerKit } from '@agoric/ertp';
makeissuerKit('quatloos'); // Defaults to AssetKind.NAT
makeissuerKit('title', AssetKind.SET);
```

```js
const { issuer: quatloosissuer, mint: quatloosmint, brand: quatloosbrand } = 
      makeissuerKit('quatloos');
// This is merely an amount, describing assets, not minting assets
const quatloos2 = AmountMath.make(quatloosbrand, 2n);

const { issuer: titleissuer, mint: titlemint, brand: titlebrand } = 
      makeissuerKit('propertyTitle');
// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = AmountMath.make(propertyTitlebrand, ['1292826']);
const adjacentProperty = AmountMath.make(propertyTitlebrand, ['1028393']);
const combinedProperty = AmountMath.make(propertyTitlebrand, ['1292826', '1028393']);
```

## issuer.getAllegedName()
- Returns: **allegedName**

Returns the **allegedName** for the **issuer**.

An alleged name is a human-readable string name 
of a kind of digital asset. An alleged name
should not be trusted as accurate because there is
no public registry or expectation of uniqueness. This
means there can be multiple **issuers**, **[mints](./mint.md)**, or **[brands](./brand.md)** with the
same alleged name, and thus the name by itself does not
uniquely identify an **issuer**. Rather, the **[brand]** does that.

To put it another way, nothing stops anyone from creating an **issuer**
with the alleged name*"Quatloos* (or *BTC*, or whatever), regardless of whether
or not such a name is already in use. The alleged name is just a
human readable string which is helpful for debugging.
```js
const { issuer: quatloosissuer } = makeissuerKit('quatloos');
const quatloosissuerAllegedName = quatloosissuer.getAllegedName();
// quatloosissuerAllegedName === 'quatloos'
```

## issuer.getAssetKind()
- Returns: **AssetKind**

Return the kind of the **issuer**'s asset: either **AssetKind.NAT** ("nat") or **AssetKind.SET** ("set").

The **assetKind** value specifies what kind of values are used in **[amounts](/glossary/#amount)** for this issuer. 

**AmountMath** works for all the different kinds of values. 
- **AssetKind.NAT** (**nat**): Used with fungible assets. **amount** values are natural 
  numbers (non-negative **BigInts**). This is the default value.
- **AssetKind.SET** (**set**): Used with non-fungible assets. **amount** values are arrays 
  that can include strings, numbers, objects, or anything comparable. But not promises,
  purses, or payments.

```js
const { issuer: quatloosissuer } = makeissuerKit('quatloos');
quatloosissuer.getAssetKind(); // Returns 'nat', also known as AssetKind.NAT, the default value.
const { issuer: moolaissuer } = makeissuerKit('moola', AssetKind.SET);
moolaissuer.getAssetKind(); // Returns 'set', also known as 'AssetKind.SET**
```
## issuer.getAmountOf(payment)
- **payment** **[payment](./payment.md)**
- Returns: **[Amount](/glossary/#amount)**

Describes the **payment**'s balance as an **Amount**. Because a **payment** from an untrusted
source cannot be trusted to provide its own true value, the **issuer** must be used to
validate its **brand** and report how much the returned **Amount** contains.

```js
const { issuer: quatloosissuer, mint: quatloosmint, brand: quatloosbrand} = makeissuerKit('quatloos');
const quatloospayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 100n));
quatloosissuer.getAmountOf(quatloospayment); // returns an amount of 100 Quatloos 
```

## issuer.getbrand()
- Returns: **[brand](./brand.md)** 

Return the **brand** for the **issuer**. The **brand** indicates the kind of digital asset
and is the same for the **issuer**'s associated **mint**, and any **purses** and **payments** of this particular
kind. The **brand** is not closely held, so this function should not be trusted to identify
an **issuer** alone. Fake digital assets and amounts can use another **issuer's** **brand**.

```js
const { issuer: quatloosissuer, brand: quatloosbrand } = makeissuerKit('quatloos');
const quatloosbrand = quatloosissuer.getbrand();
// brand === quatloosbrand
```

## issuer.makeEmptypurse()
- Returns: **[purse](./purse.md)**

Make and return an empty **purse** that holds assets of the **brand** associated with the **issuer**.

```js
const { issuer: quatloosissuer } = makeissuerKit('quatloos');
const quatloospurse = quatloosissuer.makeEmptypurse();
```

## **issuer.burn(payment, optAmount?)**
- **payment** **[payment](./payment.md)**
- **optAmount** **Amount** - Optional
- Returns: **Amount**

Destroy all of the digital assets in the **payment**,
make it unavailable for later use,
and return an Amount of what was burned.

**optAmount** is optional. If **optAmount** is present, 
the code insists the **payment** balance is equal to **optAmount**, to prevent sending the wrong **payment**
and other confusion.  

If **payment** is a promise, the operation proceeds after it resolves to a payment.

```js
const { issuer: quatloosissuer, mint: quatloosmint, brand: quatloosbrand } = 
      makeissuerKit('quatloos');     
const amountToBurn = AmountMath.make(quatloosbrand, 10n);
const paymentToBurn = quatloosmint.mintpayment(amountToBurn);

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosissuer.burn(paymentToBurn, amountToBurn);
```

## issuer.claim(payment, optAmount)
- **payment** **[payment](./payment.md)**
- **optAmount** **Amount** 
- Returns: **payment** 

Transfer all digital assets from **payment** to a new payment and consume the
original, making it unavailable for later use.

**optAmount** is optional. 
If **optAmount** is present, **payment**'s balance must be
equal to **optAmount**, to prevent sending the wrong **payment** and other confusion. 
If **optAmount** does not equal the balance in the original **payment**
then it throws an error.  

If **payment** is a promise, the operation proceeds after it resolves to a payment.

```js
const { mint: quatloosmint, issuer: quatloosissuer, brand: quatloosbrand } = makeissuerKit('quatloos');
const amountExpectedToTransfer = AmountMath.make(quatloosbrand, 2n);
const originalpayment = quatloosmint.mintpayment(amountExpectedToTransfer);

const newpayment = quatloosissuer.claim(originalpayment, amountToTransfer);
```

## issuer.combine(paymentsArray, optTotalAmount)
- **paymentsArray** **Array &lt;payment>**
- **optTotalAmount** **Amount** - Optional.
- Returns: **payment**

Combine multiple payments into one new payment. If any item in **paymentsArray** is
a promise, the operation proceeds after each such promise resolves to a payment.
All payments in **paymentsArray** are consumed and made unavailable for later use.

If the optional **optTotalAmount** is present, the total value of all payments in **paymentsArray**
must equal **optTotalAmount** or it throws an error.

Each payment in **paymentsArray** must be associated with the same brand as **issuer**.

```js
const { mint: quatloosmint, issuer: quatloosissuer, brand: quatloosbrand } = makeissuerKit('quatloos');
// create an array of 100 payments of 1 quatloo each
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 1n)));
}

// combinedpayment equals 100
const combinedpayment = quatloosissuer.combine(payments);
```

## issuer.split(payment, paymentAmountA)
- **payment** **[payment](./payment.md)**
- **paymentAmountA** **Amount**
- Returns: **Array &lt;payment>**

Split a single **payment** into two new payments, A and B, according to **paymentAmountA**.
For example, if the **payment** is for 10 Quatloos, and **paymentAmountA** is 3 Quatloos,
it returns an array of two payments with respective balances of 3 Quatloos and 7 Quatloos.

The original **payment** is consumed and made unavailable for later use.

If **payment** is a promise, the operation proceeds after it resolves to a payment.

**payment** and **paymentAmountA** must both be associated with the same brand as **issuer**.

```js
const { mint: quatloosmint, issuer: quatloosissuer, brand: quatloosbrand } = makeissuerKit('quatloos');
const oldpayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 20n));
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = quatloosissuer.split(oldpayment, AmountMath.make(quatloosbrand, 5n));
```

## issuer.splitMany(payment, amountArray)
- **payment** **[payment](./payment.md)**
- **amountArray** **Array &lt;Amount>**
- Returns: **Array &lt;payment>**

Split a single **payment** into multiple payments.
The returned array includes a payment item corresponding to each Amount of **amounts**, in order.

The original **payment** is consumed and made unavailable for later use.

If **payment** is a promise, the operation proceeds after it resolves to a payment.

If the Amounts in **amountArray** don't add up to the value of **payment**, the operation fails.
**payment** and each Amount in **amountArray** must be associated with the same brand as **issuer**.

```js
const { mint: quatloosmint, issuer: quatloosissuer, brand: quatloosbrand} = makeissuerKit('quatloos');
const oldpayment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 100n));
const goodAmounts = Array(10).fill(AmountMath.make(quatloosbrand, 10n));

const arrayOfNewpayments = quatloos.issuer.splitMany(oldpayment, goodAmounts);

// The total amount in the amountArray must equal the original payment amount
// Set original amount to 1000n
const payment = quatloosmint.mintpayment(AmountMath.make(quatloosbrand, 1000n));

// Total amounts in badAmounts equal 20n, when it should equal 1000n
const badAmounts = Array(2).fill(AmountMath.make(quatloosbrand, 10n));

// 20n does not equal 1000n, so throws error
quatloosissuer.splitMany(payment, badAmounts);
```

## issuer.isLive(payment)
- **payment** **[payment](./payment.md)**
- Returns: **Boolean**

Returns **true** if the *payment* was created by the **issuer** and is available for use (i.e., it hasn't been consumed or burned).
If *payment* is a promise, the method proceeds after it resolves to a **payment**.
