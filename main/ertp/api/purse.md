# Purse
Purses hold an amount of digital assets of the same brand, but unlike payments, they are not meant to be sent to others. To transfer digital assets, a payment should be withdrawn from a purse. A purse's balance can rise and fall, through the action of deposit() and withdraw().

The digital assets in purses and payments can be currency-like and goods-like digital assets, but they can also be other kinds of rights, such as the right to participate in a particular contract.

## purse.getIssuer()
- Returns: `{Issuer}`

Get the Issuer for this purse.

```js
const purseIssuer = purse.getIssuer();
```

## purse.getCurrentAmount()
- Returns: `{Amount}`

Get the current `amount` contained in this purse, confirmed by the
issuer. Note that this amount will change from call to call if assets
have been deposited or withdrawn between calls. 

```js
const { issuer } = produceIssuer('bucks');
const purse = issuer.makeEmptyPurse();

const currentBalance = purse.getCurrentAmount();
```

## purse.deposit(payment, optAmount)
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional. This parameter ensures you are depositing the amount you expect.
- Returns: `{Amount}`

Deposit all the contents of `payment` into this purse, returning the payment's amount
of digital assets (i.e. the deposit amount). If the optional argument `optAmount` does not equal the balance of
`payment`, or if `payment` is an unresolved promise, throw an error.

```js
const { issuer, mint, amountMath } = produceIssuer('bucks');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(amountMath.make(123));
const bucks123 = amountMath.make(123);

// Deposit a payment for 123 bucks into the purse. Ensure that this is the amount you expect.
purse.deposit(payment, bucks123);

const secondPayment = mint.mintPayment(amountMath.make(100));
// Throws error
purse.deposit(secondPayment, fungible123);

```

## purse.makeDepositFacet()

Creates a deposit-only facet on the `purse`. This is an object you can give to other parties
that lets them deposit to your  `purse` without being able to withdraw, making it a safe
way to let other people send you payments.
```js
const depositOnlyFacet = purse.makeDepositFacet();
// Give depositOnlyFacet to someone else. They can pass a payment that will be deposited:
depositOnlyFacet.receive(payment);
```

## purse.withdraw(amount)
- `amount` `{Amount}`
- Returns: `{Payment}`

Withdraw the `amount` from this purse into a new Payment.

```js
// Create a purse with a balance of 10 amount
const { issuer, mint } = produceIssuer('bucks');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(amountMath.make(10));
const fungible10 = amountMath.make(10);
purse.deposit(payment, fungible10);

// Withdraw 3 amount from the purse
const fungible3 = amountMath.make(3);
const withdrawalPayment = purse.withdraw(fungible3);

// The balance of the withdrawal payment is 3 amount
issuer.getAmountOf(withdrawalPayment);

// The new balance of the purse is 7 amount
purse.getCurrentAmount();
```
