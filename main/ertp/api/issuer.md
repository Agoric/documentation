# Issuer

The issuer cannot mint new amounts, but it can create empty purses and payments. The issuer can also transform payments (splitting payments, combining payments, burning payments, and claiming payments exclusively). The issuer should be gotten from a trusted source and then relied upon as the decider of whether an untrusted payment is valid.

## produceIssuer(allegedName, mathHelperName)
- `allegedName` `{String}`
- `mathHelpersName` `{String}`
- Returns: `{ mint, issuer, amountMath, brand }`

Makes an issuer and related objects. 

The `allegedName` can be gotten from the brand in asset descriptions. The `allegedName` is useful for debugging and double-checking assumptions, but should not be trusted.

The `mathHelpersName` will be used to import a specific mathHelpers from the mathHelpers library. For example, `natMathHelpers`, the default, is used for basic fungible tokens.

```js
const { issuer, mint, amountMath } = produceIssuer('bucks');
// This is merely an amount, describing assets.
const bucks2 = amountMath.make(2);

const { mint, issuer, amountMath } = produceIssuer('alamedaCountyPropertyTitle', 'strSet');

// These are merely amounts describing digital assets, not minting assets.
const cornerProperty = amountMath.make(harden['1292826']);
const adjacentProperty = amountMath.make(harden['1028393']);
const combinedProperty = amountMath.make(harden['1292826', '1028393']);
```

## issuer.getBrand()
- Returns: `{Brand}` - The brand for the issuer.

Get the Brand for this Issuer. The Brand indicates the kind of digital asset and is shared by the mint, the issuer, and any purses and payments of this particular kind. The brand is not closely held, so this function should not be trusted to identify an issuer alone. Fake digital assets and amount can use another issuer's brand.

```js
const { issuer, brand } = produceIssuer('bucks');
const bucksBrand = issuer.getBrand();
// brand === bucksBrand
```

## issuer.allegedName()
- Returns: `{allegedName}`

Get the `allegedName` for this mint/issuer.

```js
const { issuer } = produceIssuer('bucks');
const issuerAllegedName = issuer.getAllegedName();
// issuerAllegedName === 'bucks'
```

## issuer.getAmountMath()
- Returns: `{AmountMath}`

Get the `AmountMath` for this Issuer.

```js
const { issuer, amountMath } = produceIssuer('bucks');
const issuerAmountMath = issuer.getAmountMath();
// amountMath === issuerAmountMath
```

## issuer.getMathHelpersName()
- Returns: `{String}`

Get the name of the MathHelpers for this Issuer.

```js
const { issuer } = produceIssuer('bucks');
issuer.getMathHelpersName(); // 'nat'
```

## issuer.makeEmptyPurse()
- Returns: `{Purse}`

Make an empty purse of this brand.

```js
const { issuer } = produceIssuer('bucks');
const purse = exampleIssuer.makeEmptyPurse();
```

## issuer.getAmountOf(payment)
- `payment` `{Payment}`
- Returns: `{Amount}`

Get payment balance. Because the payment is not trusted, we cannot call a method on it directly, and must use the issuer instead.

```js
const { issuer, mint, amountMath } = produceIssuer('bucks');
const payment = mint.mintPayment(amountMath.make(100));
issuer.getAmountOf(payment); // returns 100
```

## issuer.burn(payment, optAmount)
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional
- Returns: `{Amount}`

Burn all of the digital assets in the payment. `optAmount` is optional. If `optAmount` is present, the code will insist that the payment balance is equal to `optAmount`, to prevent sending the wrong payment and other confusion.

```js
const { issuer, mint, amountMath } = produceIssuer('bucks');
const amountToBurn = amountMath.make(10);
const paymentToBurn = mint.mintPayment(amountToBurn);

// burntAmount should equal 10
const burntAmount = issuer.burn(paymentToBurn, amountToBurn);
```

## issuer.claim(payment, optAmount)
- `payment` `{Payment}` - The original payment.
- `optAmount` `{Amount}` - Optional.
- Returns: `{Payment}` - The new payment.

Transfer all digital assets from the payment to a new payment and delete the original. `optAmount` is optional. If `optAmount` is present, the code will insist that the payment balance is equal to `amount`, to prevent sending the wrong payment and other confusion. If `optAmount` does not equal the balance in the original payment then it will throw an error.

```js
const { mint, issuer, amountMath } = produceIssuer('bucks');
const amountExpectedToTransfer = amountMath.make(2);
const originalPayment = mint.mintPayment(amountExpectedToTransfer);

const newPayment = issuer.claim(originalPayment, amountToTransfer);
```

## issuer.combine(paymentsArray)
- `paymentsArray` `{Array <Payment>}`
- `optTotalAmount` `{Amount}` - Optional.
- Returns: `{Payment}`

Combine multiple payments into one payment.

```js
const { mint, issuer, amountMath } = produceIssuer('bucks');

// create an array of payments where the total value of all elements equals 100
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(mint.mintPayment(amountMath.make(1)));
}

// combinedPayment equals 100
const combinedPayment = issuer.combine(payments);
```

Note that you cannot combine payments from different mints:

```js
const { mint: otherMint, amountMath: otherAmountMath } = produceIssuer('other fungible');
const otherPayment = otherMint.mintPayment(otherAmountMath.make(10));
payments.push(otherPayment); // using the payments array from the above code

// throws error
const badPayment = issuer.combine(payments);
```

## issuer.split(payment, paymentAmountA)
- `payment` `{Payment}`
- `paymentAmountA` `{Amount}`
- Returns: `{Array <Payment>}`

Split a single payment into two payments, A and B, according to the paymentAmountA.

```js
const { mint, issuer, amountMath } = produceIssuer('bucks');
const oldPayment = mint.mintPayment(amountMath.make(20));

const [paymentA, paymentB] = issuer.split(oldPayment, amountMath.make(10));
```

## issuer.splitMany(payment, amountArray)
- `payment` `{Payment}`
- `amountArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single payment into many payments, according to the amountArray.

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const oldPayment = mint.mintPayment(amountMath.make(100));
const goodAmounts = Array(10).fill(amountMath.make(10));

const arrayOfNewPayments = issuer.splitMany(oldPayment, goodAmounts);
```

Note that the total amount in the `amountArray` must equal the amount in the original `payment`:

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const payment = mint.mintPayment(amountMath.make(1000));

// total amounts in badAmounts equal 20, when it should equal 1000
const badAmounts = Array(2).fill(amountMath.make(10));

// throws error
issuer.splitMany(payment, badAmounts);
```
