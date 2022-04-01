# Purses and Payments
 
Digital assets can be any of:
- Currency-like, such as our imaginary Quatloos currency.
- Goods-like digital assets, such as magic weapons for use in a game or theater tickets.
- Other kinds of rights, such as the right to participate in a particular contract.

In ERTP, digital assets exist in either a `purse` or a `payment`:
- **`purse`**: Holds
  an amount of same-branded digital assets until part or
  all of them are withdrawn into a `payment`. A new `purse` is created
  by an `issuer` and can only hold assets of that `issuer`'s `brand`. 
- **`payment`**:
  Holds a quantity of same-branded digital assets to transfer to another party. 
  A new `payment` is created either with new assets by a `mint` or by 
  withdrawing assets from a `purse`. It can only hold assets of the same `brand` as
  that `mint` or `purse`.

For any `brand`, any number of `purses` or `payments` can hold assets
of that `brand`. Neither a `purse` nor a `payment` can ever change their
associated `brand`.

Each `purse` and `payment` object contains a specific single amount of digital assets, 
which may be none at all (`empty` in AmountMath terms). In the same way 
you might have separate bank accounts for different purposes, 
you can have different purses for the same brand of digital asset. 
One purse might hold 2 Quatloos and another purse might hold 3 Quatloos. 

When you deposit assets into a `purse` or `payment`, they are added to
whatever assets already exist there. So a 3 Quatloos deposit 
into a `purse` with 8 Quatloos, results in a `purse` with 11 Quatloos. Similarly, 
then withdrawing 6 Quatloos from that `purse` into a new `payment` leaves the `purse` 
with 5 Quatloos and the new `payment` has 6 Quatloos. 

When adding a `payment` to a `purse`, you must add the entire `payment`. To
only add part of a `payment`, you must first use `payment.split()` 
or `payment.splitMany()` to split the `payment` into two or more new `payments`.

`mints` create entirely new digital assets and put them in a new `payment`. 
You also create a `payment` by withdrawing assets from a `purse`, by splitting an 
existing `payment`, or by combining multiple `payments` into one new one. Note 
the `brand` of the new `payment` is the same as the associated `brand` of its originating `mint`, `purse` or `payment`. 

You don't transfer assets directly from one `purse` to
another `purse`. Instead, in ERTP you do something like these steps to send and receive assets. The actual send operation is up to you; ERTP does not 
implement a way of sending object-containing messages between parties.
- Send assets:
  1. Withdraw assets described by an `amount` from a `purse`, creating a `payment`.
  2. Send this `payment` to a recipient as a message.
- Receive assets:
  1. If you don't already have one, create a `purse` for the asset `brand`
     you'll receive. 
  2. Receive the message with the `payment`.
  3. Deposit the `payment` in a `brand` appropriate `purse`. 
     
## Purses

You change a purse's balance by calling either `deposit()` (to add assets) or
`withdraw()` (to remove assets) on it. A purse can be empty, which for
fungible assets means it has a value of 0. For non-fungible 
assets, such as theatre tickets, it doesn't have any tickets.

Unlike `payments`, `purses` are not meant to be sent to others. To transfer 
digital assets, you should withdraw a `payment` from a `purse` and send 
the `payment` to another party.

You can create a *deposit facet* for a `purse`. Deposit facets are either sent to other parties or made publicly known. Any party can deposit a `payment` into the 
deposit facet, which deposits it into its associated `purse`. However, no one can
use a deposit facet to either make a withdrawal from its `purse` or get the `purse`'s balance. 

If you have a deposit facet, you make a deposit to its associated `purse` by calling 
`depositFacet.receive(payment);`. Note that you add a `payment` to a `purse` with a `deposit()` method, while you add a `payment` to a `depositFacet` with a `receive()` method. 

The `payment` must be the same `brand` as what
the associated `purse` object can contain. Otherwise it throws an error. 
When sending a deposit facet object
to a party, you should tell them what assets `brand` it accepts.

![Purse methods](./assets/purse.svg)  

The following is a brief description and example of each `purse` method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](/ertp/api/#ertp-api).
- [`purse.getCurrentAmount()`](../api/purse.md#purse-getcurrentamount)
- Returns a description of the digital assets currently stored in the `purse` as an `amount`. Note that a `purse` can be empty.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#getCurrentAmount
- [`purse.withdraw(amount)`](../api/purse.md#purse-withdraw-amount)
  - Withdraw the assets described by `amount` from this `purse` into a new
    `payment`. Returns the new `payment`.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#withdraw
- [`purse.deposit(payment, optAmount)`](../api/purse.md#purse-deposit-payment-optamount)
  - Deposit the digital asset contents of the `payment` into this `purse`,
    returning a description of the `payment` balance as an `amount`. If the optional argument
    `optAmount` does not equal the `payment` balance, or if `payment`
    is an unresolved promise, it throws an error.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#deposit
- [`purse.getDepositFacet()`](/ertp/api/purse.md#purse-getdepositfacet)
  - Returns a deposit-only facet on the `purse` that can be given
    to other parties. This lets them make a deposit to the `purse`, but not make
    withdrawals from it or get its balance. Note that the command to add a `payment`'s
    assets via a `DepositFacet` is not `deposit()` but `receive()` as shown here.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#getDepositFacet

In addition, the method to create a new, empty, `purse` is called on an `issuer`:
- [`issuer.makeEmptyPurse()`](../api/issuer.md#issuer-makeemptypurse)
  - Returns a new empty `purse` for storing digital assets of the `brand` the `issuer` is associated with.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#makeEmptyPurse
## Payments

![Payment methods](./assets/payment.svg)   

Payments hold digital assets intended to be transferred to another party.
They are linear, meaning that either a `payment` has its full
original balance, or it is used up entirely. It is impossible to
partially use a `payment`. 

In other words, if you create a `payment` containing
10 Quatloos, the `payment` will always either contain 
10 Quatloos or it will be deleted from its `issuer` records and no
longer have any value. While a `payment` can be either combined with others or
split into multiple `payments`, in both cases the original `payment(s)`
is/are deleted and the results put in one or more new `payments`.

A `payment` can be deposited in purses, split into multiple 
`payments`, combined with other `payments`, and claimed (getting an exclusive `payment` and revoking access from anyone else). 

A `payment` is often received from other parties. Since they are not
self-verifying, you cannot trust `payments`. To get the verified balance
of a `payment`, use the `getAmountOf(payment)` method on the trusted `issuer` 
for the `payment`'s `brand`. 

To get the `issuer` for a `brand` you didn't create, 
ask someone you trust. For example, the venue creating tickets for shows
can be trusted to give you the tickets' `issuer`. Or, a friend might have 
a cryptocurrency they like, and, if you trust them, you might accept 
that the `issuer` they give you is valid.

To convert a `payment` into a new `purse`:
1. Get the `payment`'s trusted `issuer`.
2. Use the `issuer` to create an empty `purse` for that `brand`.
3. Deposit the `payment` into the new `purse`. `purse.deposit(payment)` deletes the `payment`.

`Payments` have only one API method, but many methods for other ERTP components
have `payments` as arguments and effectively operate on a `payment`. The following is a 
brief description and example of each `payment`-related method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](/ertp/api/#ertp-api).
- [`payment.getAllegedBrand()`](../api/payment.md#payment-getallegedbrand)
  - Returns a `brand`, indicating what kind of digital asset the
  `payment` purports to be. Since a `payment` is not trusted, this result should be   
   treated with suspicion. Either verify the value, or check 
   the result when you use it. Any successful operation by 
   the `issuer` for that `brand` done on the `payment` verifies the `payment`.

### Other objects' Payment-related methods:

- [`issuer.getAmountOf(payment)`](../api/issuer.md#issuer-getamountof-payment)
  - Describe the `payment`'s balance as an Amount.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#getAmountOf
- [`issuer.burn(payment, optAmount)`](../api/issuer.md#issuer-burn-payment-optamount)
  - Destroy all of the digital assets in the `payment`.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#burn
- [`issuer.claim(payment, optAmount)`](../api/issuer.md#issuer-claim-payment-optamount)
  - Transfer all digital assets from `payment` to a new Payment.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#claim
- [`issuer.combine(paymentsArray)`](../api/issuer.md#issuer-combine-paymentsarray-opttotalamount)
  - Combine multiple Payments into one new Payment.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#combine
- [`issuer.split(payment, paymentAmountA)`](../api/issuer.md#issuer-split-payment-paymentamounta)
  - Split a single `payment` into two new Payments.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#split
- [`issuer.splitMany(payment, amountArray)`](../api/issuer.md#issuer-splitmany-payment-amountarray)
  - Split a single `payment` into multiple Payments.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#splitManyConcise
- [`issuer.isLive(payment)`](../api/issuer.md#issuer-islive-payment)
  - Returns `true` if the `payment` was created by the issuer and is available for use (has not been consumed or burned).
- [`mint.mintPayment(newAmount)`](/ertp/api/mint.md#mint-mintpayment-newamount)
  - Create new digital assets of the `mint`'s associated `brand`.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#mintMintPayment
- [`purse.deposit(payment, optAmount)`](../api/purse.md#purse-deposit-payment-optamount)
  - Deposit all the contents of `payment` into `purse`.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#deposit
- [`purse.withdraw(amount)`](../api/purse.md#purse-withdraw-amount)
  - Withdraw the `amount` of specified digital assets from `purse` into a new `payment`.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#withdraw
- [`purse.getDepositFacet()`](../api/purse.md#purse-getdepositfacet)
  - Create and return a new deposit-only facet of the `purse` that allows arbitrary other parties to deposit Payments into `purse`.
  - <<< @/snippets/ertp/guide/test-purses-and-payments.js#getDepositFacet

## `purse` and `payment` example

The following code creates a new `purse` for the `quatloos` brand, deposits
10 Quatloos into the `purse`, withdraws 3 Quatloos from the `purse` into a
`payment`, and finally returns an `amount` describing what's currently in the `purse`, 7 Quatloos.

<<< @/snippets/ertp/guide/test-purses-and-payments.js#example
