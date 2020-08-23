# Payment
A `payment` holds digital assets that are in transit or 
expected to soon be in transit. It can be deposited in `purses`, 
split into or combined with multiple `payments`, and claimed (getting
an exclusive `payment` and revoking access from anyone else). 

A `payment` is linear, meaning either a `payment` has its full
original balance, or it is used up entirely. While you can split
a `payment` into multiple `payments`, it is impossible to partially use a
`payment`. In other words, if a `payment` is 10 Quatloos, you can't
take out, say, 3 Quatloos from it, leaving the `payment` with 7 Quatloos.

You can split the `payment` into two new `payments` of 3 and 7 Quatloos.
The `split()` operation destroys (or burns) the original `payment`.

`Payments` are often received from other actors and therefore should not be
trusted themselves. To get the balance of a `payment`, use its trusted `issuer`: 
`issuer.getAmountOf(payment)`.

To convert a `payment` into a `purse`, get the trusted `issuer` for the `payment`'s `brand`,
use it to create an empty `purse` for that `brand`, and then deposit the `payment` into the
new `purse`. The deposit operation destroys the `payment`.

## payment.getAllegedBrand()
- Returns: `{Brand}`

Get the allegedBrand, indicating the kind of digital asset this `payment` purports to be, and which `issuer` to use 
with it. Because `payments` are not trusted, any method calls on `payments` 
should be treated with suspicion and verified elsewhere.

```js
const { issuer, mint, brand, amountMath } = makeIssuerKit('quatloos');
const payment = mint.mintPayment(amountMath.make(10));
//Should return 'quatloos'
const officialBrand = payment.getAllegedBrand();
```
