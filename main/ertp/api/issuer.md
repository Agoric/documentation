# Issuer

An `issuer` is the authority on what holds digital assets of its kind. 
While it cannot create new value by creating digital assets like a `mint`, 
it recognizes and identifies `purses` and `payments` that carry actual value.
It can create empty `purses` and transform `payments` (by splitting, 
combining, burning, or exclusively claiming). 

An `issuer` has an unchangeable one-to-one relationship with the `mint` and
`brand` that were created with it. For any `brand` for which you will accept
`payments` in, you should obtain its `issuer` from a trusted source.
You can then rely on that `issuer` as the authority to 
validate an untrusted `payment` of that `brand`.

**Note**: You should not create an Issuer in a deploy script. Deploy scripts 
are ephemeral, so any object created there dies as soon as the script stops.

## makeIssuerKit(allegedName, assetKind, displayInfo)
- `allegedName` `{String}` 
- `assetKind` `{AssetKind}` - optional, defaults to `AssetKind.NAT`
- `displayInfo` `{DisplayInfo}` - optional, defaults to `undefined`
- Returns `{IssuerKit}`

`IssuerKit`, the return type, has these properties:
- `mint` `{Mint}` 
- `issuer` `{Issuer}` 
- `brand` `{Brand}`

Create and return a new `issuer` and its associated `mint` and `brand`.
All are in unchangeable one-to-one relationships with each other. 

The `allegedName` becomes part of the `brand` in asset descriptions. It
doesn't have to be a string, but it will only be used for its value. It
is useful for debugging and double-checking assumptions, but should not be trusted.

The optional `displayInfo` tells the UI how to display `amounts` of this brand.

The optional `assetKind` specifies the kind of math to use with the digital assets. 
Each implements all of the same set of API methods (i.e. `AmountMath` methods are 
polymorphic). We recommend you import and use the `AssetKind` values from `@agoric/ertp` 
instead of using strings. 
- `AssetKind.NAT` (`nat`): Used with fungible assets. `amount` values are natural numbers (non-negative BigInts). Default value.
- `AssetKind.SET` (`set`): Used with non-fungible assets. `amount` values are arrays that can
  include strings, numbers, objects, or anything comparable. But not promises, purses, or payments.

```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to AssetKind.NAT
makeIssuerKit('title', AssetKind.SET);
```

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');
// This is merely an amount, describing assets, not minting assets
const quatloos2 = AmountMath.make(quatloosBrand, 2n);

const { issuer: titleIssuer, mint: titleMint, brand: titleBrand } = 
      makeIssuerKit('propertyTitle');
// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = AmountMath.make(propertyTitleBrand, ['1292826']);
const adjacentProperty = AmountMath.make(propertyTitleBrand, ['1028393']);
const combinedProperty = AmountMath.make(propertyTitleBrand, ['1292826', '1028393']);
```

## `issuer.getAllegedName()`
- Returns: `{allegedName}`

Return the `allegedName` for the `issuer` (the non-trusted human-readable name of its associated `brand`).

An alleged name is a human-readable string name 
of a kind of digital asset. An alleged name
should not be trusted as accurate since there is
no public registry or expectation of uniqueness. This
means there can be multiple issuers/mints/brands with the
same alleged name, and thus the name by itself does not
uniquely identify an issuer. Rather, the `brand` object does that.

To put it another way, nothing stops anyone from creating an `issuer`
with the alleged name "Quatloos" or even "BTC", regardless of whether
or not such a name is already in use. The alleged name is just a
human readable string which is helpful for debugging.
```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
// quatloosIssuerAllegedName === 'quatloos'
```

## `issuer.getAssetKind()`
- Returns: `{AssetKind}`

Return the kind of the `issuer`'s asset; either `AssetKind.NAT` ("nat") or `AssetKind.SET` ("set").

The `assetKind` value specifies what kind of values are used in amounts for this issuer. 
`AmountMath` works for all the different kinds of values. 
- `AssetKind.NAT` (`nat`): Used with fungible assets. `amount` values are natural 
  numbers (non-negative `BigInts`). Default value.
- `AssetKind.SET` (`set`): Used with non-fungible assets. `amount` values are arrays 
  that can include strings, numbers, objects, or anything comparable. But not promises,
  purses, or payments.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
quatloosIssuer.getAssetKind(); // Returns 'nat', also known as AssetKind.NAT, the default value.
const { issuer: moolaIssuer } = makeIssuerKit('moola', AssetKind.SET);
moolaIssuer.getAssetKind(); // Returns 'set', also known as 'AssetKind.SET`
```
## `issuer.getAmountOf(payment)`
- `payment` `{Payment}`
- Returns: `{Amount}`

Describe the `payment`'s balance as an Amount. Because a `payment` from an untrusted
source cannot be trusted to provide its own true value, `issuer` must be used to
validate its `brand` and report how much it contains.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand} = makeIssuerKit('quatloos');
const quatloosPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 100n));
quatloosIssuer.getAmountOf(quatloosPayment); // returns an amount of 100 Quatloos 
```

## `issuer.getBrand()`
- Returns: `{Brand}` 

Return the `brand` for the `issuer`. The `brand` indicates the kind of digital asset
and is the same for the `issuer`'s associated `mint`, and any `purses` and `payments` of this particular
kind. The `brand` is not closely held, so this function should not be trusted to identify
an `issuer` alone. Fake digital assets and amounts can use another `issuer's` `brand`.

```js
const { issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const quatloosBrand = quatloosIssuer.getBrand();
// brand === quatloosBrand
```

## `issuer.makeEmptyPurse()`
- Returns: `{Purse}`

Make and return an empty `purse` that holds assets of the `brand` associated with the `issuer`.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
```

## `issuer.burn(payment, optAmount)`
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional
- Returns: `{Amount}`

Destroy all of the digital assets in the `payment`,
make it unavailable for later use,
and return an Amount of what was burned.

`optAmount` is optional. If `optAmount` is present, 
the code insists the `payment` balance is equal to `optAmount`, to prevent sending the wrong `payment`
and other confusion.  

If `payment` is a promise, the operation proceeds after it resolves to a Payment.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');     
const amountToBurn = AmountMath.make(quatloosBrand, 10n);
const paymentToBurn = quatloosMint.mintPayment(amountToBurn);

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosIssuer.burn(paymentToBurn, amountToBurn);
```

## `issuer.claim(payment, optAmount)`
- `payment` `{Payment}` 
- `optAmount` `{Amount}` 
- Returns: `{Payment}` 

Transfer all digital assets from `payment` to a new Payment and consume the
original, making it unavailable for later use.

`optAmount` is optional. 
If `optAmount` is present, `payment`'s balance must be
equal to `optAmount`, to prevent sending the wrong `payment` and other confusion. 
If `optAmount` does not equal the balance in the original `payment`
then it throws an error.  

If `payment` is a promise, the operation proceeds after it resolves to a Payment.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const amountExpectedToTransfer = AmountMath.make(quatloosBrand, 2n);
const originalPayment = quatloosMint.mintPayment(amountExpectedToTransfer);

const newPayment = quatloosIssuer.claim(originalPayment, amountToTransfer);
```

## `issuer.combine(paymentsArray, optTotalAmount)`
- `paymentsArray` `{Array <Payment>}`
- `optTotalAmount` `{Amount}` - Optional.
- Returns: `{Payment}`

Combine multiple Payments into one new Payment. If any item in `paymentsArray` is
a promise, the operation proceeds after each such promise resolves to a Payment.
All Payments in `paymentsArray` are consumed and made unavailable for later use.

If the optional `optTotalAmount` is present, the total value of all Payments in `paymentsArray`
must equal `optTotalAmount` or it throws an error.

Each Payment in `paymentsArray` must be associated with the same Brand as `issuer`.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
// create an array of 100 payments of 1 quatloo each
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 1n)));
}

// combinedPayment equals 100
const combinedPayment = quatloosIssuer.combine(payments);
```

## `issuer.split(payment, paymentAmountA)`
- `payment` `{Payment}`
- `paymentAmountA` `{Amount}`
- Returns: `{Array <Payment>}`

Split a single `payment` into two new Payments, A and B, according to `paymentAmountA`.
For example, if the `payment` is for 10 Quatloos, and `paymentAmountA` is 3 Quatloos,
it returns an array of two Payments with respective balances of 3 Quatloos and 7 Quatloos.

The original `payment` is consumed and made unavailable for later use.

If `payment` is a promise, the operation proceeds after it resolves to a Payment.

`payment` and `paymentAmountA` must both be associated with the same Brand as `issuer`.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const oldPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 20n));
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = quatloosIssuer.split(oldPayment, AmountMath.make(quatloosBrand, 5n));
```

## `issuer.splitMany(payment, amountArray)`
- `payment` `{Payment}`
- `amountArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single `payment` into multiple Payments.
The returned array includes a Payment item corresponding to each Amount of `amounts`, in order.

The original `payment` is consumed and made unavailable for later use.

If `payment` is a promise, the operation proceeds after it resolves to a Payment.

If the Amounts in `amountArray` don't add up to the value of `payment`, the operation fails.
`payment` and each Amount in `amountArray` must be associated with the same Brand as `issuer`.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand} = makeIssuerKit('quatloos');
const oldPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 100n));
const goodAmounts = Array(10).fill(AmountMath.make(quatloosBrand, 10n));

const arrayOfNewPayments = quatloosIssuer.splitMany(oldPayment, goodAmounts);

// The total amount in the amountArray must equal the original payment amount
// Set original amount to 1000n
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 1000n));

// Total amounts in badAmounts equal 20n, when it should equal 1000n
const badAmounts = Array(2).fill(AmountMath.make(quatloosBrand, 10n));

// 20n does not equal 1000n, so throws error
quatloosIssuer.splitMany(payment, badAmounts);
```

## `issuer.isLive(payment)`
- `payment` `{Payment}`
- Returns: `{Boolean}`

Return `true` if the `payment` was created by the issuer and is available for use (has not been consumed or burned).
If `payment` is a promise, the operation proceeds after it resolves to a Payment.
