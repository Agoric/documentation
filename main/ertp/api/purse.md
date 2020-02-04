# Purse
Purses hold verified `units` of certain rights issued by Mints. Purses can transfer part of the balance they hold in a payment, which has a narrower interface. A purse's balance can rise and fall, through the action of `purse.depositExactly()` and `purse.withdraw()`.

Operations on payments (`assay.burnExactly(units, payment)`, `purse.depositExactly(units, payment)`, `assay.claimExactly(units, payment, name)`) kill the original payment and create new payments if applicable.

The primary use for Purses and Payments is for currency-like and goods-like valuables, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

## purse.getName()
- Returns: `{String}`

Get the name of this purse.

```js
console.log( purse.getName() )
```

## purse.getAssay()
- Returns: `{Assay}`

Get the Assay for this purse.

```js
// Assume a mint has already been set up.
const aliceMoolaPurse = mints[0].mint(assays[0].makeUnits(40));
const aliceSimoleanPurse = mints[0].mint(assays[1].makeUnits(40));

const moolaAssay = await E(aliceMoolaPurse).getAssay();
const simoleanAssay = await E(aliceSimoleanPurse).getAssay();
```

## purse.getBalance()
- Returns: `{Units}`

Get the `units` contained in this purse, confirmed by the assay.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

// Returns 1000
purse.getBalance();
```

## purse.depositExactly(units, src)
- `units` `{Units}`
- `src` `{Payment}`
- Returns: `{Units}`

Deposit all the contents of `src` Payment into this purse, returning the `units`. If the `units` does not equal the balance of `src` Payment, throw error.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);
const targetPurse = assay.makeEmptyPurse();
const payment = await purse.withdraw(7);

// Throws error
await wrongTargetPurse.depositExactly(8, payment);

// Successful deposit
await targetPurse.depositExactly(7, payment);
```

## purse.depositAll(srcPayment)
- `srcPayment` `{Payment}`
- Returns: `{Units}`

Deposit all the contents of `srcPayment` into this purse, returning the `units`.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);
const targetPurse = assay.makeEmptyPurse();

const payment = await purse.withdraw(22);
await targetPurse.depositAll(payment);

// Returns 22
targetPurse.getBalance();
```

## purse.withdraw(units, name)
- `units` `{Units}`
- `name` `{String}` - Optional
- Returns: `{Payment}`

Withdraw `units` from this purse into a new Payment.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = purse.withdraw(20);

// Returns 20
payment.getBalance();
```

## purse.withdrawAll(name)
- `name` `{String}`
- Returns: `{Payment}`

Withdraw entire content of this purse into a new Payment.

```js
import { makeMint } from '@agoric/ertp';

const myNewMint = makeMint('fungible');
const assay = myNewMint.getAssay();
const purse = myNewMint.mint(1000);

const payment = purse.withdrawAll();

// Returns 1000
payment.getBalance();
```
