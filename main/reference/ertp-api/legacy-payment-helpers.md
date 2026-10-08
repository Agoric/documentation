# Legacy Payment Helpers

::: warning DEPRECATED
`claim`, `combine`, `split`, and `splitMany` are deprecated. They are no
longer methods on **[Issuer](./issuer)**. They remain available as
standalone functions exported from
`@agoric/ertp/src/legacy-payment-helpers.js` (not re-exported from the
package's main entry point), each parameterized by a **recoveryPurse**
used to recover a **Payment** if the helper fails partway through.
:::

Each helper first deposits its input **Payment**(s) into the _recoveryPurse_
argument before withdrawing the result. If a helper fails after depositing
but before it can withdraw and return the result, no assets are lost: they
remain in _recoveryPurse_, and can also be recovered from that purse's
**[recovery set](./purse#apurse-getrecoveryset)** if the purse is itself
lost track of.

`combine` is not failure-atomic in one respect: if it fails partway
through, some of the input **Payments** may already have been consumed.
Even then, no assets are lost; they end up in _recoveryPurse_.

```js
import {
  claim,
  combine,
  split,
  splitMany,
} from '@agoric/ertp/src/legacy-payment-helpers.js';
```

## claim(recoveryPurse, srcPaymentP, optAmountShape?)

- **recoveryPurse**: **[Purse](./purse)**
- **srcPaymentP**: **ERef&lt;[Payment](./payment)>**
- **optAmountShape**: **Pattern** - Optional.
- Returns: **Promise&lt;Payment>**

Transfers all digital assets from _srcPaymentP_ to a new **Payment**,
consuming the original. If the _optAmountShape_ argument is passed, the
source **Payment**'s amount must match it, or the deposit throws and no
**Payment** is withdrawn.

```js
const newPayment = await claim(
  recoveryPurse,
  originalPayment,
  amountToTransfer,
);
```

## combine(recoveryPurse, srcPaymentsPs, optTotalAmount?)

- **recoveryPurse**: **[Purse](./purse)**
- **srcPaymentsPs**: **Array&lt;ERef&lt;[Payment](./payment)>>**
- **optTotalAmount**: **Pattern** - Optional.
- Returns: **Promise&lt;Payment>**

Combines multiple **Payments** into one new **Payment**, depositing each
into _recoveryPurse_ as its promise resolves. If _optTotalAmount_ is
passed, the combined total must match it before the result is withdrawn.

```js
const combinedPayment = await combine(recoveryPurse, harden(payments));
```

## split(recoveryPurse, srcPaymentP, paymentAmountA)

- **recoveryPurse**: **[Purse](./purse)**
- **srcPaymentP**: **ERef&lt;[Payment](./payment)>**
- **paymentAmountA**: **[Amount](./ertp-data-types#amount)**
- Returns: **Promise&lt;Payment[]>**

Splits a single **Payment** into two new **Payments**, A and B, according
to _paymentAmountA_, after depositing the source **Payment** into
_recoveryPurse_.

```js
const [paymentA, paymentB] = await split(
  recoveryPurse,
  oldPayment,
  AmountMath.make(quatloosBrand, 10n),
);
```

## splitMany(recoveryPurse, srcPaymentP, amounts)

- **recoveryPurse**: **[Purse](./purse)**
- **srcPaymentP**: **ERef&lt;[Payment](./payment)>**
- **amounts**: **Array&lt;[Amount](./ertp-data-types#amount)>**
- Returns: **Promise&lt;Payment[]>**

Splits a single **Payment** into multiple **Payments**, one per entry in
_amounts_, after depositing the source **Payment** into _recoveryPurse_. If
_amounts_ doesn't add up to the source **Payment**'s amount, the operation
throws once the source has already been deposited into _recoveryPurse_.

```js
const arrayOfNewPayments = await splitMany(
  recoveryPurse,
  oldPayment,
  harden(goodAmounts),
);
```
