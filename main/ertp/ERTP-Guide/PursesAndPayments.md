# Purses and Payments

You can store digital assets in two kinds of objects:
- **[`purse`](https://agoric.com/documentation/glossary/#purse)**: Hold
  a quantity of same branded digital assets until part or
  all of them are withdrawn into a `payment` for use.
- **[`payment`](https://agoric.com/documentation/glossary/#payment)**:
  Hold a quantity of digital assets to send to another party. Created either
  with new assets by a `mint` or by withdrawing assets from a `purse`.

Assets in purses and payments do not have to be currency-like, but can
be any kind of digital asset; swords to use in a game, rights to use 
a particular contract, theater tickets, etc.

Each non-empty `purse` and `payment` object contains exactly one
quantity of its digital asset. So, for example, a single `purse` can contain assets of
5 quatloos, but not two separated assets of 2 quatloos and 3 quatloos. If you want to
hold multiple, separated, quantities of same-branded assets (for example, you might have two
bank accounts, both of which hold dollars. You want to keep them separated since 
one is for everyday expenses, and the other is where you're saving up for the
down payment on a house), you have to have multiple `purse` objects for that `brand`.

While you may deposit or withdraw assets to or from a
`purse`, it is respectively added to the `purse` or split off into a `payment`. 
The same is true for adding to or splitting a
`payment`.  Both a `purse` and a `payment` can only
have one quantity of a single `brand` of digital asset.

When adding a `payment` to a `purse`, you must add the entire `payment`. If you
only want to add part of a `payment` to a `purse`, you must use `payment.split()` 
or `payment.splitMany()` first to split the `payment` into one or more `payment` objects.

With the exception of `mint` objects creating entirely new `payment`
objects containing digital assets, a `payment` is
created by making a withdrawal from a `purse` or by splitting an
existing `payment`. Note
that the `brand` of the new `payment` is the same as the
`purse`'s or original `payment`'s associated `brand`.

Note that you don't transfer assets directly from one `purse` to
another `purse`. Instead, you do something like these steps to send and receive assets in ERTP.
The actual send operation is up to you; ERTP does not implement a way of 
sending object-containing messages between parties.
- Send assets:
  1. Withdraw an `amount`from a `purse`, creating a `payment`.
  2. Send this `payment` to a recipient object as a message.
- Receive assets:
  1. If you don't already have one, create a `purse` for the asset `brand`
     you'll receive. 
  2. Receive the message with the `payment` and deposit the `payment` in
     your `brand` appropriate `purse`. 
     
In addition, you can create a *deposit facet* for a `purse`. This is an object you
can send to others that allows them to deposit a `payment` into the `purse` the 
deposit facet object represents. The benefit of sending a deposit facet instead of 
providing access to its `purse` is that deposit facets only accept deposits; a party 
with a deposit facet object cannot use it to make a withdrawal. 

If you receive a deposit facet, you can make a deposit to its associated `purse` by calling 
`depositOnlyFacet.receive(payment);`. Note that the `payment` must be the same `brand` as what
the associated `purse` object can contain. Otherwise it throws an error. If you send a party a 
deposit facet object, you should probably also tell them what `brand` of assets it accepts.

**tyg todo: See agoric-sdk/packages/ERTP/src/types.js. At line 221 it defines a
depositFacet with a receive() operation to add assets to the associated purse. 
But lines 253-254 specify that depositFacet uses deposit() to add assets. Which (or both?)
is/are correct? Note to self to update API docs with answer.**

## Purses

![Purse methods](./assets/purse.svg)  

Purses have four API methods:
- [`purse.getCurrentAmount()`](https://agoric.com/documentation/ertp/api/purse.html#purse-getcurrentamount)
  - Returns a description of the digital assets currently stored in the `purse` as an `amount`. Note that
    purses can be empty.
  - ```js
    const { issuer } = makeIssuerKit('bucks');
    const purse = issuer.makeEmptyPurse();
    const currentBalance = purse.getCurrentAmount();
    ```
- [`purse.deposit(payment, optAmount)`](https://agoric.com/documentation/ertp/api/purse.html#purse-deposit-payment-optamount)
  - Deposit the digital asset contents of a `payment` into this purse,
    returning a description of the `payment`'s balance as an `amount`. If the optional argument
    `optAmount` does not equal the `payment`'s balance,  or if `payment`
    is an unresolved
    [promise](https://agoric.com/documentation/glossary/#promise),
    it throws an error.
  - ```js
    const { issuer, mint, amountMath } = makeIssuerKit('bucks');
    const purse = issuer.makeEmptyPurse();
    const payment = mint.mintPayment(amountMath.make(123));
    const bucks123 = amountMath.make(123);
    // Deposit a payment for 123 bucks into the purse. Ensure that this is the amount you expect.
    purse.deposit(payment, bucks123);
    const secondPayment = mint.mintPayment(amountMath.make(100));
    // Throws error
    purse.deposit(secondPayment, fungible123);
    ```
- [`purse.makeDepositFacet()`](https://agoric.com/documentation/ertp/api/purse.html#purse-makedepositfacet)
  - Creates a deposit-only facet on the `purse` that can be given
    to other parties. This lets them make a deposit to the `purse`, but not make
    withdrawals from it. **tyg todo: Possible fix source code depending on answer to above deposit vs. receive question**
  - ```js
     const depositOnlyFacet = purse.makeDepositFacet();
     // Give depositOnlyFacet to someone else. They can pass a payment
     // that will be deposited:
     depositOnlyFacet.receive(payment);
     ```
- [`purse.withdraw(amount)`](https://agoric.com/documentation/ertp/api/purse.html#purse-withdraw-amount)
  - Withdraw the `amount` from this purse into a new
    `payment`. Returns the new `payment`.

In addition, the method to create a new, empty, `purse` is called on an `issuer`:
- [`issuer.makeEmptyPurse()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-makeemptypurse)
  - Returns a new empty `purse` for storing digital assets of the `brand` the `issuer` is assocated with.
  - ```js
    const { issuer, mint } = makeIssuerKit('bucks');
    // The new purse can only contain assets of the bucks brand.
    const purse = issuer.makeEmptyPurse();
    ```
To add the assets from a `payment` to a `depositFacet`, use the **tyg todo: See above. Write
when resolves if this is .receive(), .deposit() or both**.

## Payments

![Payment methods](./assets/payment.svg)   

Payments hold digital assets intended to be transferred to another party.
They are linear, meaning that either a `payment` has its full
original balance, or it is used up entirely. It is impossible to
partially use a `payment`. In other words, if you create a `payment` containing
10 quatloos, the `payment` will always either contain 
10 quatloos or it will be deleted from its `issuer` records and no
longer exist. 

Payments can be deposited in purses, split into multiple 
payments, combined, and claimed (getting an exclusive payment and
revoking access from anyone else). 

A `payment` is often received from other actors and therefore should not
be trusted. To get the balance of a `payment`, use the
`getAmountOf(payment)` method on the trusted `issuer` for the `brand`
of the `payment`. To get the `issuer` for a `brand` you didn't create, 
ask someone you trust. For example, the venue creating tickets for shows
can be trusted to give you the tickets' `issue. Or, a friend might have 
a cryptocurrency they like, and, if you trust them, you might accept 
that the `issuer` they give you is valid.

To convert a `payment` into a `purse`: 
1. Access a trusted `issuer` for the `payment``brand`. 
2. Create an empty purse with `issuer.makeEmptyPurse()`.
3. Transfer the digital assets from the `payment` to the `purse` with `purse.deposit(payment)`.

Payments have one API method, but many methods for other object
types have `payment` objects as arguments and effectively operate on a `payment`.
- [`payment.getAllegedBrand()`](https://agoric.com/documentation/ertp/api/payment.html#payment-getallegedbrand)
  - Returns a `brand`, indicating what kind of digital asset the
  `payment` purports to be. Since a `payment` is not trusted, this
  result should be treated with suspicion and verified before 
  use. If any operation by the `issuer` for that `brand` done on the `payment` succeeds, it verifies the `payment`.
  For example, `E(issuer).isLive(payment)`.

Other objects' `payment`-related methods:

- [`issuer.getAmountOf(payment)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getamountof-payment)
  - Get a description of the `payment`'s balance as an `amount`. The `payment` itself is not trusted,
    so you must use the `issuer` method associated with its `brand` to be sure of getting the
    true value. 
  ` ```js
    const { issuer, mint, amountMath } = makeIssuerKit('bucks');
    const payment = mint.mintPayment(amountMath.make(100));
    issuer.getAmountOf(payment); // returns an amount with 100 value `bucks` brand
    ```
- [`issuer.burn(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-burn-payment-optamount)
  - Burn all of the digital assets in the `payment`. `optAmount` is
    optional but if present, the `payment` balance must be equal to
    it. If `payment` is a promise, the operation proceeds after it resolves. 
  - ```js
    const { issuer, mint, amountMath } = makeIssuerKit('bucks');
    const amountToBurn = amountMath.make(10);
    const paymentToBurn = mint.mintPayment(amountToBurn);
    // burntAmount should equal 10
    const burntAmount = issuer.burn(paymentToBurn, amountToBurn);
    ```
- [`issuer.claim(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-claim-payment-optamount)
  - Transfer all assets from the `payment` to a returned new `payment`
    and burn the original. No other references to the argument `payment` survive, so 
    the new `payment` is the exclusive one. If `optAmount` is
    present, the `payment` balance must be equal to it or it throws
    an error. If `payment` is a promise, the operation proceeds after it resolves. 
  - ```js
    const { mint, issuer, amountMath } = makeIssuerKit('bucks');
    const amountExpectedToTransfer = amountMath.make(2);
    const originalPayment = mint.mintPayment(amountExpectedToTransfer);
    const newPayment = issuer.claim(originalPayment, amountToTransfer);
    ```
- [`issuer.combine(paymentsArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-combine-paymentsarray)
  - Combine multiple `payment`s into one, returned, `payment`. If any `payment` in
  the array is a promise, the operation proceeds after every `payment`
  resolves. All `payment`s in the array are burned.
  - ```js
    const { mint, issuer, amountMath } = makeIssuerKit('bucks');
    // create an array of 100 payments of 1 unit each
    const payments = [];
    for (let i = 0; i < 100; i += 1) {
      payments.push(mint.mintPayment(amountMath.make(1)));
    }
    // combinedPayment equals 100
    const combinedPayment = issuer.combine(payments);
    ```
- [`issuer.split(payment, paymentAmountA)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-split-payment-paymentamounta)
  - Split one `payment` into two new ones, A and B, returned in
    an array. `paymentAmountA` determines A's value, and whatever is
    left of the original `payment` after subtracting A is B's value. The `payment`
    argument is burned. If `payment` is a promise, the operation proceeds after
    the promise resolves. 
  - ```js
    const { mint, issuer, amountMath } = makeIssuerKit('bucks');
    const oldPayment = mint.mintPayment(amountMath.make(20));
    // Results in paymentA = 5 and paymentB = 15 (20 -5)
    const [paymentA, paymentB] = issuer.split(oldPayment, amountMath.make(5));
	```
- [`issuer.splitMany(payment, amountArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-splitmany-payment-amountarray)
  - Split `payment` into multiple `payment`s, returned as an array the
    same length as `amountArray` and with its `payment`s having the
    same values as specified for `amountArray`'s elements. If `payment`
    is a promise, the operation proceeds after it resolves. If
    `payment`'s value is not equal to the sum of `amountArray`'s
    values, the operation fails. On success, the original `payment` is burned.
  - ```js
    const { mint, issuer, amountMath } = makeIssuerKit('fungible');
    const oldPayment = mint.mintPayment(amountMath.make(100));
    const goodAmounts = Array(10).fill(amountMath.make(10));
    // Results in an array of 10 payments, each with value 10.
    const arrayOfNewPayments = issuer.splitMany(oldPayment, goodAmounts);
    ```
- [`issuer.isLive(payment)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-islive-payment)
  - Returns `true` if `payment` has value. If `payment` is a promise,
	 the operation proceeds upon resolution.
- [`mint.mintPayment(newAmount)`](https://agoric.com/documentation/ertp/api/mint.html#mint-mintpayment-newamount)
  - Returns a new `payment` containing the newly minted assets corresponding to the `newAmount` argument. Note
    that unlike creating a new `payment` by withdrawing existing assets from a `purse`,
    this creates new digital assets of the specified in `newAmount` `brand`.
  - ```js
    const { issuer, mint } = makeIssuerKit('fungible');
    const fungible1000 = amountMath.make(1000);
    const newPayment = mint.mintPayment(fungible1000);
    ```
- [`purse.deposit(payment, optAmount)`](https://agoric.com/documentation/ertp/api/purse.html#purse-deposit-payment-optamount)
  - Deposit all of `payment` into this `purse`, returning the deposit
    `amount` description. If optional `optAmount` does not equal the `payment`'s balance
     or if `payment` is an unresolved promise, it throws an error.
  - ```js
    const { issuer, mint, amountMath } = makeIssuerKit('bucks');
    const purse = issuer.makeEmptyPurse();
    const payment = mint.mintPayment(amountMath.make(123));
    const bucks123 = amountMath.make(123);
    // Deposit a payment for 123 bucks into the purse. Ensure that this is what you expect.
    purse.deposit(payment, bucks123);
    const secondPayment = mint.mintPayment(amountMath.make(100));
    // Throws error
    purse.deposit(secondPayment, fungible123);
    ```
- [`purse.makeDepositFacet()`](https://agoric.com/documentation/ertp/api/purse.html#purse-makedepositfacet)
  - Creates a deposit-only facet on the `purse` that can be given to
    other parties that lets them deposit a `payment` (but not
    withdraw) into the `purse`. **tyg todo: May need to rewrite source code depending on whether d-os take .receive or .deposit**
  - ```js
    const depositOnlyFacet = purse.makeDepositFacet();
    // Give depositOnlyFacet to someone else. They can pass a payment that will be deposited:
    depositOnlyFacet.receive(payment);
    ```
## `purse` and `payment` example

The following code creates a new purse for the `bucks` brand, deposits
10 bucks into the purse, withdraws 3 bucks from the purse into a
payment, and finally returns an `amount` describing what's currently in the purse, 7 bucks.

```js
// Create a purse with a balance of 10 amount
const { issuer, mint } = makeIssuerKit('bucks');
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
