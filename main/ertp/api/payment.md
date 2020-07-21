# Payment
Payments hold an amount of digital assets that are in transit.
Payments can be deposited in purses, split into multiple payments,
combined, and claimed (getting an exclusive payment and revoking
access from anyone else). Payments are
linear, meaning that either a payment has its full original balance,
or it is used up entirely. It is impossible to partially use a
payment.

Payments are often received from other actors and therefore should not be trusted themselves. To get the balance of a payment, use the trusted issuer: issuer.getAmountOf(payment).

Payments can be converted to Purses by getting a trusted issuer and calling `issuer.makeEmptyPurse()` to create a purse, then `purse.deposit(payment)`.

## payment.getAllegedBrand()
- Returns: `{Brand}`

Get the allegedBrand, indicating the kind of digital asset this payment purports to be, and which issuer to use. Because payments are not trusted, any method calls on payments should be treated with suspicion and verified elsewhere.

```js
const { issuer, mint, brand, amountMath } = makeIssuerKit('bucks');
const payment = mint.mintPayment(amountMath.make(10));

const officialBrand = payment.getAllegedBrand();
```
