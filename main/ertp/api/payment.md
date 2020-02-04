# Payment
Payments hold verified units of certain rights issued by Mints. Units from payments can be deposited in purses, but otherwise, the entire unit is available when the payment is transferred. A payment's balance can only fall, through the action of `purse.depositExactly()`, `assay.claimExactly()` or `assay.burnExactly()`.

Payments can be converted to Purses by getting a verified assay and calling `assay.makeEmptyPurse().depositAll(payment)`;

## payment.getName()
- Returns: `{String}`

Get the name of this purse.

```js
console.log( anyPayment.getName() )
```

## payment.getAssay()
- Returns: `{Assay}`

Get the Assay for this payment.

```js
const paymentAssay = anyPayment.getAssay();
```

## payment.getBalance()
- Returns: `{Units}`

Get the units contained in this payment, confirmed by the assay.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = purse.withdraw(20);

// Returns 20
payments.getBalance();
```
