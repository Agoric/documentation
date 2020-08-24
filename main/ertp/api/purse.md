# Purse
`Purses` hold digital assets. They are created to hold assets of a single `brand`,
and their `brand` cannot be changed. For example, you might create a `purse` to
hold Quatloos. That `purse` can only hold Quatloos; it can't hold Moola or theater
tickets or anything else. And you can't change that `purse` so that it now holds
Moola instead; you need to create a `purse` that holds only `moola`.

Digital assets in `purses` and `payments` can be any of:
- Currency-like, such as our imaginary Quatloos currency.
- Goods-like digital assets, such as magic weapons for use in a game or theater tickets.
- Other kinds of rights, such as the right to participate in a particular contract.

While each `purse` can only hold assets of one `brand`, any number of `purses` can be
created that hold that `brand`. So you could have, say, three Quatloos `purses`, your
friend Alice could have eight Quatloos `purses`, and so on. 

You change a `purse`'s balance by calling either `deposit()` (to add assets)
or `withdraw()` (to remove assets) on it. A `purse` can be empty, meaning it
has a balance value of 0 (which depending on the kind of asset, could also be
that just aren't any, say, theater tickets in the `purse`).

Unlike `payments`, `purses` are not meant to be sent to others. 
To transfer digital assets, you should withdraw a `payment` from a `purse` and
send the `payment` to another party.

## issuer.makeEmptyPurse()
- Returns: `{Purse}`

While not a method called on a `purse`, clearly it's important to know how
to create a new `purse`. Call `makeEmptyPurse()` on the `issuer` associated
with the `brand` of assets you want the new `purse` to hold. It returns the
new `purse` with an empty balance. 
```js
const {quatloosIssuer: issuer} = makeIssuerKit('quatloos');
quatloosPurse1 = quatloosIssuer.makeEmptyPurse();
quatloosPurse2 = quatloosIssuer.makeEmptyPurse();
```

## purse.getCurrentAmount()
- Returns: `{Amount}`

Get an `amount` describing the current digital assets balance in the `purse`.
This `amount` is confirmed by the `issuer` for the `brand` the `purse` can hold.
Of course, the returned `amount` `value` might be different the next time you
call `getCurrentAmount()` on the same `purse` if assets have been deposited or
withdrawn from it in-between calls. . 

```js
const { quatloosissuer: issuer } = makeIssuerKit('quatloos');
const quatloosPurse = issuer.makeEmptyPurse();
// quatloos5 is a payment with balance of 5 quatloos
const quatloosPurse.deposit(quatloos5);
// Returns an amount with value = 5 and brand = quatloos
const currentBalance = quatloosPurse.getCurrentAmount();
```

## purse.deposit(payment, optAmount)
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional. This parameter ensures you are depositing the amount you expect.
- Returns: `{Amount}`

Deposit all the contents of `payment` into this `purse`, returning an `amount` describing the
`payment`'s digital assets (i.e. the deposit amount). If the optional argument `optAmount` does not equal the balance of
`payment`, or if `payment` is an unresolved promise, it throws an error.

```js
const { issuer, mint, amountMath } = makeIssuerKit('quatloos');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(amountMath.make(123));
const quatloos123 = amountMath.make(123);

// Deposit a payment for 123 Quatloos into the purse. Ensure that this is the amount you expect.
purse.deposit(payment, quatloos123);

const secondPayment = mint.mintPayment(amountMath.make(100));
// Throws error
purse.deposit(secondPayment, quatloos123);

```

## purse.makeDepositFacet()

Creates a deposit-only facet on the `purse`. This is an object you can give to other parties
that lets them deposit `payments` to your  `purse` without being able to withdraw assets from or check
the balance of the `purse`. This makes it a safe way to let other people send you `payments`.
 
```js
const depositOnlyFacet = purse.makeDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a `payment`, thus depositing the `payment` assets in the `purse` associated with the deposit facet.
depositOnlyFacet.receive(payment);
```
Once you have created a `depositFacet`, there is one method you can call 
on it. **tyg todo: is it "recieve" or "deposit"?** `deposit.receive(payment)`. 
The `depositFacet` takes the `payment` and adds it to the balance of the facet's
associated `purse`. The `payment` must be of the same `brand` as what the `purse` holds.

## purse.withdraw(amount)
- `amount` `{Amount}`
- Returns: `{Payment}`

Withdraw the `amount` specified digital assets from this `purse` into a new `payment`.

```js
// Create a purse and give it a balance of 10 Quatloos
const { issuer, mint } = makeIssuerKit('quatloos');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(amountMath.make(10));
const quatloos10 = amountMath.make(10);
purse.deposit(payment, quatloos10);

// Withdraw 3 amount from the purse
const quatloos3 = amountMath.make(3);
const withdrawalPayment = purse.withdraw(quatloos3);

// The balance of the withdrawal payment is 3 Quatloos
issuer.getAmountOf(withdrawalPayment);

// The new balance of the purse is 7 Quatloos
purse.getCurrentAmount();
```

## Other Methods

Other than the above covered `issuer.makeEmptyPurse()` and the `depositFacet` methods, 
there are no non-`purse` ERTP methods relating to `purses`.
