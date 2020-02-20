# Purse
Purses hold an amount of digital assets of the same brand, but unlike Payments, they are not meant to be sent to others. To transfer digital assets, a Payment should be withdrawn from a Purse. A purse's balance can rise and fall, through the action of deposit() and withdraw().

The primary use for Purses and Payments is for currency-like and goods-like digital assets, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

## purse.getIssuer()
- Returns: `{Issuer}`

Get the Issuer for this mint.

```js
const purseIssuer = purse.getIssuer()
```

## purse.getBalance()
- Returns: `{Amount}`

Get the `amount` contained in this purse, confirmed by the issuer.

```js
const { issuer } = produceIssuer('fungible');
const purse = issuer.makeEmptyPurse();

const currentBalance = purse.getBalance();
```

## purse.deposit(srcPayment, amount)
- `srcPayment` `{Payment}`
- `amount` `{Amount}` - Optional. This parameter ensures you are depositing the amount you expect.
- Returns: `{Amount}`

Deposit all the contents of `srcPayment` into this purse, returning the `amount`. If the optional argument `amount` does not equal the balance of `srcPayment`, throw error.

```js
const { issuer, mint } = produceIssuer('fungible');
const purse = issuer.makeEmptyPurse()
const payment = mint.mintPayment(123)
const fungible123 = amountMath.make(123)

// Deposit a payment for 123 amount into the purse. Ensure that this is the amount you expect.
purse.deposit(payment, fungible123)

const secondPayment = mint.mintPayment(100)
// Throws error
purse.deposit(secondPayment, fungible123)

```

## purse.withdraw(amount)
- `amount` `{Amount}`
- Returns: `{Payment}`

Withdraw the `amount` from this purse into a new Payment.

```js
// Create a purse with a balance of 10 amount
const { issuer, mint } = produceIssuer('fungible');
const purse = issuer.makeEmptyPurse()
const payment = mint.mintPayment(10)
const fungible10 = amountMath.make(10)
purse.deposit(payment, fungible10)

// Withdraw 3 amount from the purse
const fungible3 = amountMath.make(3)
const withdrawalPayment = purse.withdraw(fungible3)

// The balance of the withdrawal payment is 3 amount
issuer.getBalance(withdrawalPayment)

// The new balance of the purse is 7 amount
purse.getBalance()
```