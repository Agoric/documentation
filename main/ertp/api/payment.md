# Payment
A `payment` holds digital assets that are in transit or 
expected to soon be in transit. It can be deposited in `purses`, 
split into or combined with multiple `payments`, and claimed (getting
an exclusive `payment` and revoking access from anyone else). 

A `payment` is linear, meaning either a `payment` has its full
original balance, or it is used up entirely. You cannot partially use a
`payment`. In other words, if a `payment` is 10 Quatloos, you can't
take out, say, 3 Quatloos from it, leaving the `payment` with 7 Quatloos.

However, you can split a `payment` into multiple `payments`, for example 
into two new `payments` of 3 Quatloos and 7 Quatloos.
The `split()` operation consumes the original 10 Quatloos `payment`,
making it unavailable for later use.

`Payments` are often received from other actors. Since they are not self-verifying,
you cannot trust `payments`. To get the verified balance of a `payment`, use the `issuer` 
associated with the `payment`'s `brand`: `issuer.getAmountOf(payment)`.

To convert a `payment` into a new `purse`: 
1. Get the `payment`'s trusted `issuer`. 
2. Use the `issuer` to create an empty `purse` for that `brand`.
3. Deposit the `payment` into the new `purse`. 

`purse.deposit(payment)` consumes the `payment`,
making it unavailable for later use.

## `payment.getAllegedBrand()`
- Returns: `{Brand}`

Get the allegedBrand, indicating the kind of digital asset this `payment` purports to be, and which `issuer` to use 
with it. Because `payments` are not trusted, any method calls on `payments` 
should be treated with suspicion and verified elsewhere.

```js
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 10n));
//Should return 'quatloos'
const allegedBrand = payment.getAllegedBrand();
```

## Related Methods

The following methods on other ERTP components either operate
on or return a Payment. While a brief description is given for each,
you should click through to a method's main documentation entry for 
full details on what it does and how to use it.

- [`issuer.burn(payment, optAmount)`](./issuer.md#issuer-burn-payment-optamount)
  - Destroy all of the digital assets in the `payment`.
- [`issuer.claim(payment, optAmount)`](./issuer.md#issuer-claim-payment-optamount)
  - Transfer all digital assets from `payment` to a new Payment.
- [`issuer.combine(paymentsArray)`](./issuer.md#issuer-combine-paymentsarray-opttotalamount)
  - Combine multiple Payments into one new Payment.
- [`issuer.getAmountOf(payment)`](./issuer.md#issuer-getamountof-payment)
  - Describe the `payment`'s balance as an Amount.
- [`issuer.isLive(payment)`](./issuer.md#issuer-islive-payment)
  - Return `true` if the `payment` was created by the issuer and is available for use (has not been consumed or burned).
- [`issuer.split(payment, paymentAmountA)`](./issuer.md#issuer-split-payment-paymentamounta)
  - Split a single `payment` into two new Payments.
- [`issuer.splitMany(payment, amountArray)`](./issuer.md#issuer-splitmany-payment-amountarray)
  - Split a single `payment` into multiple Payments.
- [`mint.mintPayment(newAmount)`](./mint.md#mint-mintpayment-newamount)
  - Create new digital assets of the `mint`'s associated `brand`.
- [`purse.deposit(payment, optAmount)`](./purse.md#purse-deposit-payment-optamount)
  - Deposit all the contents of `payment` into `purse`.
- [`purse.getDepositFacet()`](./purse.md#purse-getdepositfacet)
  - Create and return a new deposit-only facet of the `purse` that allows arbitrary other parties to deposit Payments into `purse`.
- [`purse.withdraw(amount)`](./purse.md#purse-withdraw-amount)
  - Withdraw the `amount` of specified digital assets from `purse` into a new `payment`.
