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
The `split()` operation *burns* (destroys) the original 10 Quatloos `payment`.

`Payments` are often received from other actors and therefore should not be
trusted themselves. To get the balance of a `payment`, use its trusted `issuer`,
which is the `issuer` associated with the `payment`'s `brand`: 
`issuer.getAmountOf(payment)`.

To convert a `payment` into a new `purse`: 
1. Get the `payment`'s trusted `issuer`. 
2. Use the `issuer` to create an empty `purse` for that `brand`.
3. Deposit the `payment` into the new `purse`. 

`purse.deposit(payment)` burns the `payment`.

## payment.getAllegedBrand()
- Returns: `{Brand}`

Get the allegedBrand, indicating the kind of digital asset this `payment` purports to be, and which `issuer` to use 
with it. Because `payments` are not trusted, any method calls on `payments` 
should be treated with suspicion and verified elsewhere.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, 
        brand: quatloosBrand, amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
const payment = quatloosMint.mintPayment(quatloosAmountMath.make(10));
//Should return 'quatloos'
const allegedBrand = payment.getAllegedBrand();
```

## Related Methods

The following methods on other ERTP components either operate
on or return a `payment`. While a brief description is given for each, 
you should click through to a method's main documentation entry for 
full details on what it does and how to use it.

- [`issuer.burn(payment, optAmount)`](./issuer.html#issuer-burn-payment-optamount)
  - Burn (destroy) all of the digital assets in the `payment`.
- [`issuer.claim(payment, optAmount)`](./issuer.html#issuer-claim-payment-optamount)
  - Transfer all assets from the `payment` to a returned new `payment` and burn the original.
- [`issuer.combine(paymentsArray)`](./issuer.html#issuer-combine-paymentsarray)
  - Combine multiple `payments` into one, returned, `payment`.
- [`issuer.getAmountOf(payment)`](./issuer.html#issuer-getamountof-payment)
  - Get a description of a `payment` balance as an `amount`. 
- [`issuer.isLive(payment)`](./issuer.html#issuer-islive-payment)
  - Returns `true` if `payment` has value. 
- [`issuer.split(payment, paymentAmountA)`](./issuer.html#issuer-split-payment-paymentamounta)
  - Split one `payment` into two new ones.
- [`issuer.splitMany(payment, amountArray)`](./issuer.html#issuer-splitmany-payment-amountarray)
  - Split `payment` into multiple `payments`, returned as an array.
- [`mint.mintPayment(newAmount)`](./mint.html#mint-mintpayment-newamount)
  - Returns a new `payment` containing the newly minted assets corresponding to the `newAmount` argument. 
- [`purse.deposit(payment, optAmount`)](./purse.html#purse-deposit-payment-optamount)
  - Deposit all of `payment` into this `purse`.
- [`purse.makeDepositFacet()`](./purse.html#purse-makedepositfacet)
  - Creates a deposit-only facet on the `purse` that can be given to other parties to deposit `payments` in.
- [`purse.withdraw(amount)`](./purse.html#purse-withdraw-amount)
  - Returns a new `payment` whose balance is described by the `amount` argument. 
