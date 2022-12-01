# mint Object

Only a **mint** can issue new digital assets. 

A **mint** has a one-to-one relationship with both an **[issuer](./issuer.md)** and a **[brand](./brand.md)**.
So it can only mint new assets of that **brand** and is the only **mint** that can mint
new assets of that **brand**.

**mints** are created by cqlling the **[makeIssueKit()](./issuer.md#makeissuerkit-allegedname-assetkind?-displayinfo)** method. See the **[issuer](./issuer.md)** documentation for detailed information about how to use this method.

## mint.getIssuer()
- Returns: **[issuer](./issuer.md)**

Returns the **issuer** uniquely associated with this **mint**. From their creation, a **mint** is always
in an unchangeable one-to-one relationship with a particular **issuer**. 

```js
const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit('quatloos');
const quatloosMintIssuer = quatloosMint.getIssuer();

// returns true
issuer === quatloosMintIssuer;
```

## mint.mintPayment(newAmount)
- **newAmount** **Amount**
- Returns: **[payment](./payment.md)**

Creates and returns new digital assets of the **mint**'s associated **[brand](./brand.md)**.
From their creation, a **mint** is always in an unchangeable
one-to-one relationship with a **brand**.

```js
const { issuer: quatloosIssuer, mint: quatloosMint
        brand: quatloosBrand } = makeIssuerKit('quatloos');

const quatloos1000 = amountMath.make(quatloosBrand, 1000n);
// newPayment will have a balance of 1000 Quatloos
const newPayment = quatloosMint.mintPayment(quatloos1000);
```

**Important**: **mint.mintPayment()** is the <ins>only</ins> way
to create new digital assets. There is no other way.