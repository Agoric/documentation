# Issuer

The issuer cannot mint new amount, but it can create empty purses and payments. The issuer can also transform payments (splitting payments, combining payments, burning payments, and claiming payments exclusively). The issuer should be gotten from a trusted source and then relied upon as the decider of whether an untrusted payment is valid.

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
const issuerName = issuer.allegedName;
```

## issuer.getAmountMath()
- Returns: `{AmountMath}`

Get the `AmountMath` for this Issuer.

```js
const exampleAmountMath = exampleIssuer.getAmountMath();
```

## issuer.getMathHelpersName()
- Returns: `{String}`

Get the name of the MathHelpers for this Issuer.

```js
const exampleMathHelpersName = exampleIssuer.getMathHelpersName();
```

## issuer.makeEmptyPurse(name)
- `name` `{String}`
- Returns: `{Purse}`

Make an empty purse associated with this kind of right.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();

// After creating an issuer you can create an empty purse:
const targetPurse = issuer.makeEmptyPurse();

// Returns 0
targetPurse.getBalance();
```

## issuer.combine(paymentsArray, name)
- `paymentsArray` `{Array <Payment>}` - A list of payments to combine into a new payment
- `name` `{String}` - Name to call this combination of payments
- Returns: `{Payment}`

Combine multiple payments into one payment.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

// Create a payments array. Each element, or payment, has a value of 1.
const payments = [];
for (let i = 0; i < 100; i += 1) {
  payments.push(purse.withdraw(1));
}

// Combine all the payments in the`payments` array
const combinedPayment = issuer.combine(payments);

// Returns 100
combinedPayment.getBalance();
```

## issuer.split(payment, unitsArray)
- `payment` `{Payment}`
- `unitsArray` `{Array <Amount>}`
- Returns: `{Array <Payment>}`

Split a single payment into multiple payments, according to the `amount` and names passed in.

```js
// Assume a mint has already been set up.
const aliceMoolaPurse = mints[0].mint(assays[0].makeUnits(40));
const aliceMoolaPayment = aliceMoolaPurse.withdrawAll();
const moola10 = assays[0].makeUnits(10);
const moola20 = assays[0].makeUnits(20);

// The following divides the aliceMoolaPayment into three payments:
const aliceMoolaPayments = assays[0].split(aliceMoolaPayment, [
  moola10,
  moola10,
  moola20,
]);
// aliceMoolaPayments is now an array of three Payment objects, with balances of 10, 10, 20, respectively.
```

## issuer.claimExactly(amount, src, name)
- `amount` `{Amount}`
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`, optional
- Returns: `{Payment}`

Make a new `Payment` that has exclusive rights to all the contents of `src`. If `amount` does not equal the balance of the `src` payment, throws error.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = await purse.withdraw(7);
const newPayment = await issuer.claimExactly(7, payment);

// .claimExactly() will throw an error because the the balance of wrongPayment does not equal the amount
const wrongPayment = await purse.withdraw(7);
const wrongNewPayment = await issuer.claimExactly(8, wrongPayment);
```

## issuer.claimAll(src, name)
- `src` `{Payment}`
- `name` `{String}` - name of a new `Payment`
- Returns: `{Payment}`

Make a new `Payment` that has exclusive rights to all the contents of `src`.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = await purse.withdraw(10);
const newPayment = await issuer.claimAll(payment);

// Returns 10
newPayment.getBalance();
```

## issuer.burnExactly(amount, src)
- `amount` `{Amount}`
- `src` `{Payment}`
- Returns: `{Amount}`

Burn all of the rights from `src`. If `amount` does not equal the balance of the `src` payment, throw error.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = await purse.withdraw(10);

// Throws error:
await issuer.burnExactly(6, payment);

// Successful burn:
await issuer.burnExactly(10, payment);
```

## issuer.burnAll(src)
- `src` `{Payment}`
- Returns: `{Amount}`

Burn all of the rights from `src`.

```js
import { makeMint } from './core/mint';

const myNewMint = makeMint('fungible');
const issuer = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = await purse.withdraw(10);
await issuer.burnAll(payment);
```
