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

## makeIssuerKit(allegedName, amountMathKind, displayInfo)
- `allegedName` `{String}` 
- `amountMathKind` `{MathKind}` - optional, defaults to `MathKind.NAT`
- `displayInfo` `{DisplayInfo}` - optional, defaults to `undefined`
- Returns `{IssuerKit}`

`IssuerKit`, the return type, has these properties:
- `mint` `{Mint}` 
- `issuer` `{Issuer}` 
- `brand` `{Brand}`

Makes a new `issuer` as well as its one-to-one associated ERTP objects; a `mint` and a `brand`. 
All are in unchangeable one-to-one relationships with each other. 

The `allegedName` becomes part of the `brand` in asset descriptions. It
doesn't have to be a string, but it will only be used for its value. It
is useful for debugging and double-checking assumptions, but should not be trusted.

The optional `displayInfo` tells the UI how to display `amounts` from this issuer or
of this brand..

The optional `amountMathKind` specifies the kind of math to use with the digital assets. 
Each implements all of the same set of API methods (i.e. `amountMath` methods are 
polymorphic). We recommend you import and use the `MathKind` values from `@agoric/ERTP` 
instead of using strings. 
- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` values are natural numbers (non-negative BigInts). Default value.
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` values are objects or records with multiple properties.

```js
import { MathKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to MathKind.NAT
makeIssuerKit('kitties', MathKind.SET);
```

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');
// This is merely an amount, describing assets.
const quatloos2 = amountMath.make(quatloosBrand, 2n);

const { mint: titleMint, issuer: titleIssuer } = makeIssuerKit('alamedaCountyPropertyTitle', MathKind.SET);
```

## issuer.getAllegedName()
- Returns: `{allegedName}`

Returns the `allegedName` for this `issuer`.

An alleged name is a human-readable string name 
of a kind of digital asset. An alleged name
should not be trusted as accurate since there is
no public registry or expectation of uniqueness. This
means there can be multiple issuers/mints/brands with the
same alleged name, and thus the name by itself does not
uniquely identify an issuer. Rather, the `brand` object does that.

To put it another way, nothing stops different people from creating
multiple `issuers` with the alleged name `Quatloos`...but that doesn't
make any of them **the** Quatloos `issuer`. The alleged name is just a 
human readable version which is helpful for debugging. 
```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
// quatloosIssuerAllegedName === 'quatloos'
```

## issuer.getAmountMathKind()
- Returns: `{MathKind}`

Get the kind of this `issuer`'s `amountMath`. It returns one of
`MathKind.NAT` (`nat`) or `MathKind.SET` (`set`).

The `amountMathKind` value specifies which kind an `amountMath` is,
and what kind of values it is used on. Each kind implements all of the same set 
of API methods (i.e. `amountMath` methods are polymorphic). 
- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` values are natural numbers (non-negative BigInts). Default value.
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` values are objects or records with multiple properties.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
quatloosIssuer.getAmountMathKind(); // Returns 'nat', also known as MathKind.NAT, the default value.
const { issuer: moolaIssuer } = makeIssuerKit('moola', MathKind.SET);
moolaIssuer.getAmountMathKind(); // Returns 'set', also known as 'MathKind.SET`
```
## issuer.getAmountOf(payment)
- `payment` `{Payment}`
- Returns: `{Amount}`

Get the `payment`'s balance. Because the `payment` is not trusted, we cannot
trust it to provide its true value, and must rely on the `issuer` to validate
the `payment`'s `brand`  and tell us how much it contains.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand} = makeIssuerKit('quatloos');
const quatloosPayment = quatloosMint.mintPayment(amountMath.make(quatloosBrand, 100n));
quatloosIssuer.getAmountOf(quatloosPayment); // returns an amount of 100 Quatloos 
```

## issuer.getBrand()
- Returns: `{Brand}` 

Returns the `brand` for this `issuer`. The `brand` indicates the kind of digital asset
and is the same for the `issuer`'s associated `mint`, and any `purses` and `payments` of this particular
kind. The `brand` is not closely held, so this function should not be trusted to identify
an `issuer` alone. Fake digital assets and amounts can use another `issuer's` `brand`.

```js
const { issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const quatloosBrand = quatloosIssuer.getBrand();
// brand === quatloosBrand
```

## issuer.makeEmptyPurse()
- Returns: `{Purse}`

Make and return an empty `purse` that holds assets of the `brand` associated with the `issuer`.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
```

## issuer.burn(payment, optAmount)
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional
- Returns: `{Amount}`

Burn (destroy) all of the digital assets in the `payment`
and return an `amount` of what was burned. 

`optAmount` is optional. If `optAmount` is present, 
the code insists the `payment` balance is equal to `optAmount`, to prevent sending the wrong `payment`
and other confusion.  

If `payment` is a `promise` for a `payment`, the operation proceeds after the
`promise` resolves.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');     
const amountToBurn = amountMath.make(quatloosBrand, 10n);
const paymentToBurn = quatloosMint.mintPayment(amountToBurn);

// burntAmount should equal 10 Quatloos
const burntAmount = quatloosIssuer.burn(paymentToBurn, amountToBurn);
```

## issuer.claim(payment, optAmount)
- `payment` `{Payment}` 
- `optAmount` `{Amount}` 
- Returns: `{Payment}` 

Transfer all digital assets from `payment` to a new `payment` and burn the
original. This allows the owner to be sure no other references to this
payment survive, so they are the exclusive owner. 

`optAmount` is optional. 
If `optAmount` is present, `payment`'s balance must be
equal to `optAmount`, to prevent sending the wrong `payment` and other confusion. 
If `optAmount` does not equal the balance in the original `payment`
then it throws an error.  

If a `payment` is a `promise` for a `payment`, the operation will 
proceed after the `promise` resolves. Since you might also have a `promise` returned,
it might take a bit of time for the whole operation to resolve.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const amountExpectedToTransfer = amountMath.make(quatloosBrand, 2n);
const originalPayment = quatloosMint.mintPayment(amountExpectedToTransfer);

const newPayment = quatloosIssuer.claim(originalPayment, amountToTransfer);
```

## issuer.combine(paymentsArray, optTotalAmount)
- `paymentsArray` `{Array <Payment>}`
- `optTotalAmount` `{Amount}` - Optional.
- Returns: `{Payment}`

Combines multiple `payments` into one `payment`.  If any `payment` in `paymentsArray` is 
a `promise`, the operation proceeds after all the `payments`
resolve. The `payments` in `paymentsArray` are burned.

If the optional `optTotalAmount` is present, the total of all the `payment` `amounts` in the
array must equal `optTotalAmount` or it throws an error.

If a `payment` is a `promise` for a `payment`, the operation will 
proceed after the `promise` resolves. Since you might also have a `promise` returned,
it might take a bit of time for the whole operation to resolve.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
// create an array of 100 payments of 1 quatloo each
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(quatloosMint.mintPayment(amountMath.make(quatloosBrand, 1n)));
}

// combinedPayment equals 100
const combinedPayment = quatloosIssuer.combine(payments);
```

**Note**: You **cannot** combine `payments` from different `mints` (as they are of different `brands`):

```js
const { mint: otherMint, issuer: otherIssuer, brand: otherBrand } = makeIssuerKit('other');
const otherPayment = otherMint.mintPayment(amountMath.make(otherBrand, 10n));
payments.push(otherPayment); // using the payments array from the above code

// throws error
const badPayment = quatloosIssuer.combine(payments);
```

## issuer.split(payment, paymentAmountA)
- `payment` `{Payment}`
- `paymentAmountA` `{Amount}`
- Returns: `{Array <Payment>}`

Split a single `payment` into two new `payments`, A and B, according to `paymentAmountA`. 
For example, if the `payment` is for 10 Quatloos, and `paymentAmountA` is 3 Quatloos,
it returns an array of two `payments` with balances of 3 Quatloos and 7 Quatloos.

The original `payment` is burned. 

If the original `payment` is a `promise` for a `payment`, the operation will 
proceed after the `promise` resolves. Since you might also have a `promise` returned,
it might take a bit of time for the whole operation to resolve.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit('quatloos');
const oldPayment = quatloosMint.mintPayment(amountMath.make(quatloosBrand, 20n));
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = quatloosIssuer.split(oldPayment, amountMath.make(quatloosBrand, 5n));
```

## issuer.splitMany(payment, amountArray)
- `payment` `{Payment}`
- `amountArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single `payment` into multiple `payments`. The resulting array of `payments` is
as long as `amountArray`, and the `payments` will have `amounts` corresponding to 
the `amountArray` contents. The original `payment` is burned. If the original `payment` 
is a `promise`, the operation proceeds after the `promise` resolves.  If the `amounts` 
in `amountArray` don't add up to the value of `payment`, the operation fails. The `brands`
of the `amountArray` `amounts` must all be the same as the `payment` `brand`.

```js
const { mint: quatloosMint, issuer: quatloosIssuer, brand: quatloosBrand} = makeIssuerKit('quatloos');
const oldPayment = quatloosMint.mintPayment(amountMath.make(quatloosBrand, 100n));
const goodAmounts = Array(10).fill(amountMath.make(quatloosBrand, 10n));

const arrayOfNewPayments = quatloos.Issuer.splitMany(oldPayment, goodAmounts);

// The total amount in the amountArray must equal the original payment amount
// Set original amount to 1000n
const payment = quatloosMint.mintPayment(amountMath.make(quatloosBrand, 1000n));

// Total amounts in badAmounts equal 20n, when it should equal 1000n
const badAmounts = Array(2).fill(amountMath.make(quatloosBrand, 10n));

// 20n does not equal 1000n, so throws error
quatloosIssuer.splitMany(payment, badAmounts);
```

## issuer.isLive(payment)
- `payment` `{Payment}`
- Returns: `{Boolean}`

Returns `true` if the `payment` was created by the issuer and has not yet been destroyed.
If `payment` is a promise, the operation proceeds upon resolution.
