# Issuer

An `issuer` cannot mint new digital assets, but it can create empty `purses` and transform `payments` (splitting, 
combining, burning, or exclusively claiming `payments`). An `issuer` should be obtained from a trusted source and 
then relied upon as the authority as to whether an untrusted `payment` is valid.

## makeIssuerKit(allegedName, amountMathKind)
 * @param {string} allegedName
 * @param {AmountMathKind} amountMathKind
 * @returns {IssuerKit}

Makes an issuer and its associated objects. A particular `issuer`, 'mint', `amountMath', and `brand` 
are all in one-to-one relationships with each other. 

The `allegedName` is available from the brand in asset descriptions. The `allegedName` is useful for debugging and double-checking assumptions, but
should not be trusted.

The `amountMathKind` is used to import a specific `amountMath`. For example, `nat`, the default, supports
natural numbers and is used for basic fungible tokens.

```js
const { issuer, mint, amountMath } = makeIssuerKit('quatloos');
// This is merely an amount, describing assets.
const quatloos2 = amountMath.make(2);

const { mint, issuer, amountMath } = makeIssuerKit('alamedaCountyPropertyTitle', 'strSet');

// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = amountMath.make(harden['1292826']);
const adjacentProperty = amountMath.make(harden['1028393']);
const combinedProperty = amountMath.make(harden['1292826', '1028393']);
```

## issuer.getBrand()
- Returns: `{Brand}` 

Get the `brand` for this `issuer`. The `brand` indicates the kind of digital asset
and is the same for the `issuer`'s associated `mint`, and any `purses` and `payments` of this particular
kind. The `brand` is not closely held, so this function should not be trusted to identify
an `issuer` alone. Fake digital assets and amounts can use another `issuer's `brand`.

```js
const { issuer, brand } = makeIssuerKit('quatloos');
const quatloosBrand = issuer.getBrand();
// brand === quatloosBrand
```

## issuer.getAllegedName()
- Returns: `{allegedName}`

Get the `allegedName` for this `issuer`.

```js
const { issuer } = makeIssuerKit('bucks');
const issuerAllegedName = issuer.getAllegedName();
// issuerAllegedName === 'bucks'
```

## issuer.getAmountMath()
- Returns: `{AmountMath}`

Get the `amountMath` for this `issuer`. 
```js
const { issuer, amountMath } = makeIssuerKit('quatloos');
const issuerAmountMath = issuer.getAmountMath();
// amountMath === issuerAmountMath
```

## issuer.getAmountMathKind()
- Returns: `{AmountMathKind}`

Get the kind of this `issuer`'s `amountMath`. It returns one of
`nat`, `str`, or `setStr`

```js
const { issuer } = makeIssuerKit('quatloos');
issuer.getAmountMathKind(); // Returns 'nat', the default value.
```

## issuer.makeEmptyPurse()
- Returns: `{Purse}`

Make an empty `purse` that holds assets of the `brand` associated with the `issuer`.

```js
const { issuer } = makeIssuerKit('quatloos');
const purse = issuer.makeEmptyPurse();
```

## issuer.getAmountOf(payment)
- `payment` `{Payment}`
- Returns: `{Amount}`

Get the `payment`'s balance. Because the `payment` is not trusted, we cannot
trust it to provide its true value, and must rely on the `issuer` for
the `payment`'s `brand` to guarantee.

```js
const { issuer, mint, amountMath } = makeIssuerKit('quatloos');
const payment = mint.mintPayment(amountMath.make(100));
issuer.getAmountOf(payment); // returns 100  **tyg todo: If it just returns 100, shouldn't this be getAmountValueOf?**
```

## issuer.burn(payment, optAmount)
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional
- Returns: `{Amount}`

Burn all of the digital assets in the `payment`. `optAmount` is optional. If `optAmount` is present, 
the code insists the `payment` balance is equal to `optAmount`, to prevent sending the wrong `payment`
and other confusion.  If `payment` is a `promise`, the operation proceeds after the
`promise` resolves.

```js
const { issuer, mint, amountMath } = makeIssuerKit('bucks');
const amountToBurn = amountMath.make(10);
const paymentToBurn = mint.mintPayment(amountToBurn);

// burntAmount should equal 10
const burntAmount = issuer.burn(paymentToBurn, amountToBurn);
```

## issuer.claim(payment, optAmount)
- `payment` `{Payment}` - The original payment.
- `optAmount` `{Amount}` - Optional.
- Returns: `{Payment}` - The new payment.

Transfer all digital assets from `payment` to a new payment and burn the original. This allows the owner to be sure that no other references to this
payment survive, so they are the exclusive owner. `optAmount` is optional. If `optAmount` is present, the code will insist that `payment`'s balance is
equal to `amount`, to prevent sending the wrong `payment` and other confusion. If `optAmount` does not equal the balance in the original `payment`
then it will throw an error.  If `payment` is a promise, the operation will proceed after the promise resolves.

```js
const { mint, issuer, amountMath } = makeIssuerKit('bucks');
const amountExpectedToTransfer = amountMath.make(2);
const originalPayment = mint.mintPayment(amountExpectedToTransfer);

const newPayment = issuer.claim(originalPayment, amountToTransfer);
```

## issuer.combine(paymentsArray)
- `paymentsArray` `{Array <Payment>}`
- `optTotalAmount` `{Amount}` - Optional.
- Returns: `{Payment}`

Combine multiple payments into one payment.  If any payment in `paymentsArray` is a promise, the operation will proceed after all the payments
resolve. The payments in `paymentsArray` will be burned.

```js
const { mint, issuer, amountMath } = makeIssuerKit('bucks');

// create an array of 100 payments of 1 unit each
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(mint.mintPayment(amountMath.make(1)));
}

// combinedPayment equals 100
const combinedPayment = issuer.combine(payments);
```

**Note**: You **cannot** combine `payments` from different `mints` (as they are of different `brands`):

```js
const { mint: otherMint, amountMath: otherAmountMath } = makeIssuerKit('other fungible');
const otherPayment = otherMint.mintPayment(otherAmountMath.make(10));
payments.push(otherPayment); // using the payments array from the above code

// throws error
const badPayment = issuer.combine(payments);
```

## issuer.split(payment, paymentAmountA)
- `payment` `{Payment}`
- `paymentAmountA` `{Amount}`
- Returns: `{Array <Payment>}`

Split a single `payment` into two new `payments`, A and B, according to `paymentAmountA`. The original `payment` is burned. If the original `payment`
is a `promise`, the operation proceeds after the `promise` resolves.

```js
const { mint, issuer, amountMath } = makeIssuerKit('quatloos');
const oldPayment = mint.mintPayment(amountMath.make(20));
// After the split, paymentA has 5 quatloos and paymentB has 15.
const [paymentA, paymentB] = issuer.split(oldPayment, amountMath.make(5));
```

## issuer.splitMany(payment, amountArray)
- `payment` `{Payment}`
- `amountArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single `payment` into multiple `payments`. The resulting array of `payments` is as long as `amountArray`, and the `payments` will have `amounts`
corresponding to `amountArray`. The original `payment` is burned. If the original `payment` is a `promise`, the operation proceed` after the `promise` resolves.  If the `amounts` in `amountArray` don't add up to the value of `payment`, the operation fails. 

```js
const { mint, issuer, amountMath } = makeIssuerKit('fungible');
const oldPayment = mint.mintPayment(amountMath.make(100));
const goodAmounts = Array(10).fill(amountMath.make(10));

const arrayOfNewPayments = issuer.splitMany(oldPayment, goodAmounts);
```

Note that the total `amoun`t in the `amountArray` must equal the `amount` in the original `payment`:

```js
const { mint, issuer, amountMath } = makeIssuerKit('fungible');
const payment = mint.mintPayment(amountMath.make(1000));

// total amounts in badAmounts equal 20, when it should equal 1000
const badAmounts = Array(2).fill(amountMath.make(10));

// throws error
issuer.splitMany(payment, badAmounts);
```

## issuer.isLive(payment)
- `payment` `{Payment}`
- Returns: `{Boolean}`

Returns true if the payment continues to have value. If `payment` is a promise, the operation will proceed upon resolution.
