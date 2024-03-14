# Purses and Payments

There are different kinds of digital assets:
- Currency-like, such as our imaginary Quatloos.
- Goods-like, such as theater tickets or magic weapons for use in a game.
- Abstract rights, such as participation in a particular contract.

In ERTP, digital assets always exist in either a **purse** or a **payment** object.
- **purse**: Holds
  an amount of same-branded digital assets until part or
  all of them are withdrawn into a payment. A new purse is created
  by an issuer and can only hold assets of that issuer's brand.
- **payment**:
  Holds a quantity of same-branded digital assets to transfer to another party.
  A payment is created containing either new assets from a mint or existing assets
  withdrawn from a purse or transferred from one or more other consumed payments.
  It can only hold assets of the same brand as its source(s).

Any number of `purses` or `payments` can hold assets
of any particular `brand`. Neither a `purse` nor a `payment` can ever change their
associated `brand`.

Each `purse` and `payment` object contains a specific amount of digital assets,
which may be none at all ("empty" in [AmountMath](./amount-math) terms). In the same way
you might have separate bank accounts for different purposes,
you can have separate purses for the same `brand` of digital asset.
One of your purses might hold 2 Quatloos while another holds 9000 Quatloos.

When you deposit assets into a `purse`, they are added to
whatever assets already exist there. So a 3 Quatloos deposit
into a `purse` with 8 Quatloos results in a `purse` with 11 Quatloos.

When adding a `payment` to a `purse`, you must add the entire `payment`. To
only add part of a `payment`, you must first call [anIssuer.split()](/reference/ertp-api/issuer#anissuer-split-payment-paymentamounta)
or [anIssuer.splitMany()](/reference/ertp-api/issuer#anissuer-splitmany-payment-amountarray)
to split it into two or more new `payments`.

`mints` create entirely new digital assets and put them in a new `payment`.
You also create a `payment` by withdrawing assets from a `purse`, by splitting an
existing `payment`, or by combining multiple `payments` into one new one. Note
the `brand` of the new `payment` is the same as the associated `brand` of its originating `mint`, `purse`, or `payment`.

In ERTP, assets are not transferred directly from one `purse` to another.
Instead, the transfer must be mediated by a `payment` as demonstrated below.
In the Agoric stack, the actual send and receive operations are provided by
[`E()`](../js-programming/eventual-send).
- Sender:
  1. Withdraw assets described by an `amount` from a `purse`, creating a `payment`.
  2. Send this `payment` to a recipient.
- Recipient:
  1. If you don't already have one, create a `purse` for the asset `brand`
     you'll receive.
  2. Receive the message with the `payment`.
  3. Deposit the `payment` into a `brand`-appropriate `purse`.

## Purses

You change a purse's balance by calling either `deposit()` (to add assets) or
`withdraw()` (to remove assets) on it. A purse can be empty, which for
fungible assets means it has a value of 0. For non-fungible
assets, such as theater tickets, it doesn't have any tickets.

Unlike `payments`, `purses` are not meant to be sent to others. To transfer 
digital assets, you should withdraw a `payment` from a `purse` and send 
the `payment` to another party.

You can create a [deposit facet](../../glossary/#deposit-facet) for a `purse`.
Deposit facets are either sent to other parties or made publicly known. Any party can deposit a `payment` into the
deposit facet, which deposits it into its associated `purse`. However, no one can
use a deposit facet to either make a withdrawal from its `purse` or get the `purse`'s balance.

If you have a deposit facet, you make a deposit to its associated `purse` by calling 
`depositFacet.receive(payment)`. Note that you add a `payment` to a `purse` with a `deposit()` method, while you add a `payment` to a `depositFacet` with a `receive()` method.

The `payment`'s `brand` must match that of the `purse`.
Otherwise it throws an error.
When sending a deposit facet object
to a party, you should tell them what `brand` it accepts.

![Purse methods](./assets/purse.svg)  

The following is a brief description and example of each `purse` method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](/reference/ertp-api/).
- [aPurse.getCurrentAmount()](/reference/ertp-api/purse#apurse-getcurrentamount)
  - Describe the `purse`'s current balance as an Amount. Note that a `purse` can be empty.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#getCurrentAmount
- [aPurse.withdraw(amount)](/reference/ertp-api/purse#apurse-withdraw-amount)
  - Withdraw the `amount` of specified digital assets from this `purse` into a new `payment`.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#withdraw
- [aPurse.deposit(payment, optAmount)](/reference/ertp-api/purse#apurse-deposit-payment-optamount)
  - Deposit all the contents of `payment` into this `purse`, returning an `amount` describing the
`payment`.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#deposit
- [aPurse.getDepositFacet()](/reference/ertp-api/purse#apurse-getdepositfacet)
  - Return a deposit-only facet on the `purse`. Note that the command to add a `payment`'s
    assets via a `DepositFacet` is not `deposit()` but `receive()` as shown here.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#getDepositFacet

In addition, the method to create a new, empty, `purse` is called on an `issuer`:
- [anIssuer.makeEmptyPurse()](/reference/ertp-api/issuer#anissuer-makeemptypurse)
  - Make and return an empty `purse` that holds assets of the `brand` associated with the `issuer`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#makeEmptyPurse
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
are consumed and the results put in one or more new `payments`.

A `payment` can be deposited into a purse, split into multiple
`payments`, combined with other `payments`, or claimed (getting an exclusive `payment` and revoking access from anyone else).

A `payment` is often received from other parties, but is not self-verifying
and cannot be trusted to provide its own true value.
To get the verified balance
of a `payment`, use the `getAmountOf(payment)` method on the trusted `issuer`
for the `payment`'s `brand`.

To get the `issuer` for a `brand` you didn't create, 
ask someone you trust. For example, the venue creating tickets for shows
can be trusted to give you the tickets' `issuer`. Or, a friend might have 
a cryptocurrency they like, and, if you trust them, you might accept 
that the `issuer` they give you is valid.

To consume a `payment` into a new `purse`:
1. Get the `payment`'s trusted `issuer`.
2. Use the `issuer` to create an empty `purse` for that `brand`.
3. Deposit the `payment` into the new `purse`.

`Payments` have only one API method, but many methods for other ERTP components
have `payments` as arguments and effectively operate on a `payment`. The following is a
brief description and example of each `payment`-related method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](/reference/ertp-api/index).
- [aPayment.getAllegedBrand()](/reference/ertp-api/payment#apayment-getallegedbrand)
  - Return the `brand` indicating the kind of digital asset this `payment` purports to be
    and which `issuer` to use with it.
    Because `payments` are not trusted, any method calls on them should be treated
    with suspicion and verified elsewhere. Any successful operation by an `issuer` on a `payment` verifies it.

### Other Objects' Payment-Related Methods

- [anIssuer.burn(payment, optAmount)](/reference/ertp-api/issuer#anissuer-burn-payment-optamount)
  - Destroy all of the digital assets in the `payment`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#burn
- [anIissuer.claim(payment, optAmount)](/reference/ertp-api/issuer#anissuer-claim-payment-optamount)
  - Transfer all digital assets from `payment` to a new Payment.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#claim
- [anIssuer.combine(paymentsArray)](/reference/ertp-api/issuer#anissuer-combine-paymentsarray-opttotalamount)
  - Combine multiple Payments into one new Payment.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#combine
- [anIssuer.getAmountOf(payment)](/reference/ertp-api/issuer#anissuer-getamountof-payment)
  - Describe the `payment`'s balance as an Amount.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#getAmountOf
- [anIssuer.isLive(payment)](/reference/ertp-api/issuer#anissuer-islive-payment)
  - Return `true` if the `payment` was created by the issuer and is available for use (has not been consumed or burned).
- [anIssuer.split(payment, paymentAmountA)](/reference/ertp-api/issuer#anissuer-split-payment-paymentamounta)
  - Split a single `payment` into two new Payments.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#split
- [anIssuer.splitMany(payment, amountArray)](/reference/ertp-api/issuer#anissuer-splitmany-payment-amountarray)
  - Split a single `payment` into multiple Payments.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#splitManyConcise
- [aMint.mintPayment(newAmount)](/reference/ertp-api/mint#amint-mintpayment-newamount)
  - Create new digital assets of the `mint`'s associated `brand`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#mintMintPayment
- [aPurse.deposit(payment, optAmount)](/reference/ertp-api/purse#apurse-deposit-payment-optamount)
  - Deposit all the contents of `payment` into `purse`.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#deposit
- [aPurse.getDepositFacet()](/reference/ertp-api/purse#apurse-getdepositfacet)
  - Create and return a new deposit-only facet of the `purse` that allows arbitrary other parties to deposit Payments into `purse`.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#getDepositFacet
- [aPurse.withdraw(amount)](/reference/ertp-api/purse#apurse-withdraw-amount)
  - Withdraw the `amount` of specified digital assets from `purse` into a new `payment`.
  - <<< @/../snippets/ertp/guide/test-purses-and-payments.js#withdraw

## Purse and Payment Example

The following code creates a new `purse` for the `quatloos` brand, deposits
10 Quatloos into the `purse`, withdraws 3 Quatloos from the `purse` into a
`payment`, and finally returns an `amount` describing what's currently in the `purse`, 7 Quatloos.

<<< @/../snippets/ertp/guide/test-purses-and-payments.js#example
