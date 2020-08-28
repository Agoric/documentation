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

- <router-link to="./issuer.html#issuer-burn-payment-optamount">`issuer.burn(payment, optAmount)`</router-link> 
  - Burn (destroy) all of the digital assets in the `payment`.
- <router-link to="./issuer.html#issuer-claim-payment-optamount">`issuer.claim(payment, optAmount)`</router-link> 
  - Transfer all assets from the `payment` to a returned new `payment` and burn the original.
- <router-link to="./issuer.html#issuer-combine-paymentsarray">`issuer.combine(paymentsArray)`</router-link> 
  - Combine multiple `payments` into one, returned, `payment`.
- <router-link to="./issuer.html#issuer-getamountof-payment">`issuer.getAmountOf(payment)`</router-link> 
  - Get a description of a `payment` balance as an `amount`. 
- <router-link to="./issuer.html#issuer-islive-payment">`issuer.isLive(payment)`</router-link> 
  - Returns `true` if `payment` has value. 
- <router-link to="./issuer.html#issuer-split-payment-paymentamounta">`issuer.split(payment, paymentAmountA)`</router-link> 
  - Split one `payment` into two new ones.
- <router-link to="./issuer.html#issuer-splitmany-payment-amountarray">`issuer.splitMany(payment, amountArray)`</router-link> 
  - Split `payment` into multiple `payments`, returned as an array.
- <router-link to="./mint.html#mint-mintpayment-newamount">`mint.mintPayment(newAmount)`</router-link> 
  - Returns a new `payment` containing the newly minted assets corresponding to the `newAmount` argument. 
- <router-link to="./purse.html#purse-deposit-payment-optamount">`purse.deposit(payment, optAmount`)`</router-link> 
  - Deposit all of `payment` into this `purse`.
- <router-link to="./purse.html#purse-makedepositfacet">`purse.makeDepositFacet()`</router-link> 
  - Creates a deposit-only facet on the `purse` that can be given to other parties to deposit `payments` in.
- <router-link to="./purse.html#purse-withdraw-amount">`purse.withdraw(amount)`</router-link> 
  - Returns a new `payment` whose balance is described by the `amount` argument. 
