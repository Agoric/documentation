# Issuer

The issuer cannot mint new amount, but it can create empty purses and payments. The issuer can also transform payments (splitting payments, combining payments, burning payments, and claiming payments exclusively). The issuer should be gotten from a trusted source and then relied upon as the decider of whether an untrusted payment is valid.

## produceIssuer(allegedName, mathHelperName)
- `allegedName` `{Comporable}`
- `mathHelpersName` `{String}`
- Returns: `{IssuerObjs}`

Makes Issuers.

The `allegedName` becomes part of the brand in asset descriptions. The `allegedName` doesn't have to be a string, but it will only be used for its value. The `allegedName` is useful for debugging and double-checking assumptions, but should not be trusted.

The `mathHelpersName` will be used to import a specific mathHelpers from the mathHelpers library. For example, `natMathHelpers`, the default, is used for basic fungible tokens.

```js
const { issuer, mint, amountMath } = produceIssuer('fungible');
const fungible1 = amountMath.make(1)

const { mint, issuer, amountMath } = produceIssuer('items');
const listAmount = amountMath.make(harden[1,2,4])
```

## IssuerObjs

The return value of `produceIssuer`.

```js
issuer: {
  mint: 'fungible',
  issuer: someAmount,
  amountMath: amountMath,
  brand: someBrand
}
```

## issuer.getBrand()
- Returns: `{Brand}` - The brand for the issuer.

Get the Brand for this Issuer. The Brand indicates the kind of digital asset and is shared by the mint, the issuer, and any purses and payments of this particular kind. The brand is not closely held, so this function should not be trusted to identify an issuer alone. Fake digital assets and amount can use another issuer's brand.

```js
const { issuer, brand } = produceIssuer('fungible');
const myBrand = issuer.getBrand();
```

## issuer.allegedName()
- Returns: `{allegedName}`

Get the `allegedName` for this mint/issuer.

```js
const { issuer } = produceIssuer('fungible');
const issuerName = issuer.allegedName();
```

## issuer.getAmountMath()g
- Returns: `{AmountMath}`

Get the `AmountMath` for this Issuer.

```js
const { issuer } = produceIssuer('fungible');
const exampleAmountMath = issuer.getAmountMath();
```

## issuer.getMathHelpersName()
- Returns: `{String}`

Get the name of the MathHelpers for this Issuer.

```js
const { issuer } = produceIssuer('fungible');
const exampleMathHelpersName = issuer.getMathHelpersName();
```

## issuer.makeEmptyPurse()
- Returns: `{Purse}`

Make an empty purse of this brand.

```js
const { issuer } = produceIssuer('fungible');
const purse = exampleIssuer.makeEmptyPurse();
```

## issuer.getBalance(payment)
- `payment` `{Payment}`
- Returns: `{Amount}`

Get payment balance. Because the payment is not trusted, we cannot call a method on it directly, and must use the issuer instead.

```js
const { issuer, mint } = produceIssuer('fungible');
const payment = mint.mintPayment(100)

// returns 100
const currentBalance = issuer.getBalance(payment);
```

## issuer.burn(payment, amount)
- `payment` `{Payment}`
- `amount` `{Amount}` - Optional
- Returns: `{Amount}`

Burn all of the digital assets in the payment. `Amount` is optional. If `amount` is present, the code will insist that the payment balance is equal to `amount`, to prevent sending the wrong payment and other confusion.

```js
const { issuer, mint, amountMath } = produceIssuer('fungible');
const paymentToBurn = mint.mintPayment(10)
const amountToBurn = amountMath.make(10)

// burntAmount should equal 10
const burntAmount = issuer.burn(paymentToBurn, amountToBurn)
```

## issuer.claim(payment, amount)
- `payment` `{Payment}` - The original payment.
- `amount` `{Amount}` - Optional.
- Returns: `{Payment}` - The new payment.

Transfer all digital assets from the payment to a new payment and delete the original. `amount` is optional. If `amount` is present, the code will insist that the payment balance is equal to `amount`, to prevent sending the wrong payment and other confusion. If `amount` does not equal the balance in the original payment then it will throw an error.

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const originalPayment = mint.mintPayment(2)
const amountExpectedToTransfer = amountMath.make(837)

const newPayment = issuer.claim(originalPayment, amountToTransfer)
```

## issuer.combine(paymentsArray)
- `paymentsArray` `{Array <Payment>}`
- Returns: `{Payment}`

Combine multiple payments into one payment.

```js
const { mint, issuer } = produceIssuer('fungible');

// create an array of payments where the total value of all elements equals 100
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(mint.mintPayment(1));
}

// combinedPayment equals 100
const combinedPayment = issuer.combine(payments)
```

Note that you cannot combine payments from different mints:

```js
const { mint: otherMint } = produceIssuer('other fungible');
const otherPayment = otherMint.mintPayment(10)
payments.push(otherPayment) // using the payments array from the above code

// throws error
const badPayment = issuer.combine(payments)
```

## issuer.split(payment, paymentAmountA)
- `payment` `{Payment}`
- `paymentAmountA` `{Amount}`
- Returns: `{Array <Payment>}`

Split a single payment into two payments, A and B, according to the paymentAmountA.

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const oldPayment = mint.mintPayment(20);

const paymentsAandB = issuer.split(oldPayment, amountMath.make(10))
```

Note that you cannot split payments if you pass in a non-matching amount:

```js
const { mint, issuer } = produceIssuer('fungible');
const { amountMath: otherAmount } = produceIssuer('other fungible');
const payment = mint.mintPayment(1000);

// throws error
issuer.split(payment, otherAmount.make(10))
```

## issuer.splitMany(payment, amountArray)
- `payment` `{Payment}`
- `amountArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single payment into many payments, according to the amountArray.

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const oldPayment = mint.mintPayment(100);
const goodAmounts = Array(10).fill(amountMath.make(10));

const arrayOfNewPayments = issuer.splitMany(oldPayment, goodAmounts)
```

Note that the total amount in the `amountArray` must equal the amount in the original `payment`:

```js
const { mint, issuer, amountMath } = produceIssuer('fungible');
const payment = mint.mintPayment(1000);

// total amounts in badAmounts equal 20, when it should equal 1000
const badAmounts = Array(2).fill(amountMath.make(10));

// throws error
issuer.splitMany(payment, badAmounts)
```