# Issuer Object

An **Issuer** is the authority on what holds digital assets of its kind.
While it cannot create new value by creating digital assets like a **[Mint](./mint)** can,
it recognizes and identifies **[Purses](./purse)** and **[Payments](./payment)** that carry actual value.
It can create empty **Purses** and burn **Payments**.

An **Issuer** has an unchangeable one-to-one relationship with the **Mint** and
**[Brand](./brand)** that were created with it. For any **Brands** for which you will accept
**Payments** in, you should obtain its **Issuer** from a trusted source.
You can then rely on that **Issuer** as the authority to
validate an untrusted **Payment** of that **Brand**.

**Note**: You should not create an **Issuer** in a deploy script. Deploy scripts
are ephemeral, so any object created there dies as soon as the script ends.

## makeIssuerKit(allegedName, assetKind?, displayInfo?, optShutdownWithFailure?, issuerOptionsRecord?)

- **allegedName**: **String**
- **assetKind**: **[AssetKind](./ertp-data-types#assetkind)** - Optional, defaults to **AssetKind.NAT**.
- **displayInfo**: **[DisplayInfo](./ertp-data-types#displayinfo)** - Optional, defaults to **undefined**.
- **optShutdownWithFailure** - Optional, defaults to **undefined**.
- **issuerOptionsRecord** - Optional, defaults to `{}`. An object that may carry:
  - **elementShape**: **Pattern** - Optional, defaults to **undefined**.
  - **recoverySetsOption**: **[RecoverySetsOption](./durable-issuers#recoverysetsoption)** - Optional, defaults to **undefined**.
- Returns **IssuerKit**. This is an object with five properties:
  - **issuer**: **Issuer**
  - **mint**: **[Mint](./mint)**
  - **brand**: **[Brand](./brand)**
  - **mintRecoveryPurse**: **[Purse](./purse)**
  - **displayInfo**: **[DisplayInfo](./ertp-data-types#displayinfo)**

Creates and returns a new **Issuer** and its associated **Mint** and **Brand**.
All three are in unchangeable one-to-one relationships with each other.

`makeIssuerKit()` makes an issuer kit that is not durable; it does not
survive an upgrade of the vat that holds it. Contracts, which must
survive upgrade, instead use `prepareIssuerKit()` or `makeDurableIssuerKit()`,
which take a **Baggage** as their first argument and are otherwise
parameterized the same way. See **[Durable Issuers](./durable-issuers)**.

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

The optional _issuerOptionsRecord_ parameter's _elementShape_ property is only used
when creating an **Issuer** for a non-fungible or semi-fungible asset (an **AssetKind**
of **COPY_SET** or **COPY_BAG**). When present, it is a **Pattern** that every element
of this **Issuer**'s amounts must satisfy; for example, the Zoe **Invitation** issuer
uses an _elementShape_ describing the shape of an individual invitation's details. Its
_recoverySetsOption_ property controls whether the issuer maintains recovery sets; see
**[Durable Issuers](./durable-issuers)**.

```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to AssetKind.NAT
makeIssuerKit('title', AssetKind.COPY_SET);
```

```js
import { AssetKind, AmountMath, makeIssuerKit } from '@agoric/ertp';
import { makeCopySet } from '@endo/patterns';

const {
  issuer: quatloosIssuer,
  mint: quatloosMint,
  brand: quatloosBrand
} = makeIssuerKit('quatloos');
// This is merely an amount, describing assets, not minting assets
const quatloos2 = AmountMath.make(quatloosBrand, 2n);

const {
  issuer: titleIssuer,
  mint: titleMint,
  brand: titleBrand
} = makeIssuerKit('propertyTitle', AssetKind.COPY_SET);
// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = AmountMath.make(titleBrand, makeCopySet(['1292826']));
const adjacentProperty = AmountMath.make(titleBrand, makeCopySet(['1028393']));
const combinedProperty = AmountMath.make(
  titleBrand,
  makeCopySet(['1292826', '1028393'])
);
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
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
// quatloosIssuerAllegedName === 'quatloos'
```

## anIssuer.getAssetKind()

- Returns: **[AssetKind](./ertp-data-types#assetkind)**

Returns the kind of the **Issuer**'s asset.

The **AssetKind** specifies what kind of values are used in **[Amounts](./ertp-data-types#amount)** for this **Issuer**.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
quatloosIssuer.getAssetKind(); // Returns 'nat', also known as AssetKind.NAT, the default value.
const { issuer: moolaIssuer } = makeIssuerKit('moola', AssetKind.COPY_SET);
moolaIssuer.getAssetKind(); // Returns 'copySet', also known as AssetKind.COPY_SET
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
} = makeIssuerKit('quatloos');
const quatloosPayment = quatloosMint.mintPayment(
  AmountMath.make(quatloosBrand, 100n)
);
quatloosIssuer.getAmountOf(quatloosPayment); // returns an amount of 100 Quatloos
```

## anIssuer.getBrand()

- Returns: **[Brand](./brand)**

Returns the **Brand** for the **Issuer**. The **Brand** indicates the kind of digital asset
and is the same for the **Issuer**'s associated **[Mint](./mint)**, and any **[Purses](./purse)** and **[Payments](./payment)** of this particular
kind. The **Brand** is not closely held, so this method should not be trusted to identify
an **Issuer** alone. Fake digital assets and amounts can use another **Issuer's** **Brand**.

```js
const { issuer: quatloosIssuer, brand: quatloosBrand } =
  makeIssuerKit('quatloos');
const quatloosBrand = quatloosIssuer.getBrand();
// brand === quatloosBrand
```

## anIssuer.makeEmptyPurse()

- Returns: **[Purse](./purse)**

Makes and returns an empty **Purse** that holds assets of the **[Brand](./brand)** associated with the **Issuer**.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
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
} = makeIssuerKit('quatloos');
const amountToBurn = AmountMath.make(quatloosBrand, 10n);
const paymentToBurn = quatloosMint.mintPayment(amountToBurn);

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosIssuer.burn(paymentToBurn, amountToBurn);
```

## anIssuer.isLive(payment)

- **payment**: **[Payment](./payment)**
- Returns: **Boolean**

Returns **true** if the _payment_ was created by the **Issuer** and is available for use
(i.e., it hasn't been consumed).

If _payment_ is a promise, the method proceeds after it resolves to a **Payment**.

## Removed methods

`claim`, `combine`, `split`, and `splitMany` are no longer **Issuer**
methods. They live on as standalone, deprecated helper functions with a
different, `recoveryPurse`-first signature; see
**[Legacy Payment Helpers](./legacy-payment-helpers)**.
