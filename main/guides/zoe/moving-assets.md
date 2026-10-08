# Moving Assets Between Seats

A contract's business logic decides how the assets escrowed in its seats
should end up allocated. It never touches the assets directly; instead it
tells `zcf` to change the allocations, and Zoe checks the result for
[offer safety](./offer-safety.md) and overall conservation before applying it.

The older way to express a reallocation was to `stage()` proposed changes on
each seat and then call `reallocate()` with the staged seats. That API isn't
compatible with contract [durability](./contract-upgrade.md#durability), so
current contracts use `zcf.atomicRearrange(transfers)` instead, and a
reallocation can only be expressed one way or the other, never a mixture of
both, for a given contract instance.

## `zcf.atomicRearrange(transfers)`

`transfers` is an array of `TransferPart`s. Each `TransferPart` is a 4-tuple:

```js
[fromSeat, toSeat, fromAmounts, toAmounts];
```

- `fromSeat` and `toSeat` are `ZCFSeat`s, or `undefined`.
- `fromAmounts` and `toAmounts` are `AmountKeywordRecord`s, or `undefined`.
- If `fromSeat` is given, `fromAmounts` is deducted from its allocation (it
  defaults to `toAmounts` if omitted).
- If `toSeat` is given, `toAmounts` is added to its allocation (it defaults
  to `fromAmounts` if omitted).

If all the `TransferPart`s in the array are individually valid, and the
overall transfer still balances (conserves the total value of every keyword)
and preserves offer safety for every seat mentioned, the whole reallocation
happens atomically. Otherwise none of it happens.

Here's the [`swap`](/reference/zoe-api/zoe-helpers#swap-zcf-leftseat-rightseat)
helper's own implementation, exchanging what each seat wants for what the
other seat is giving:

```js
export const swap = (zcf, leftSeat, rightSeat) => {
  try {
    zcf.atomicRearrange(
      harden([
        [rightSeat, leftSeat, leftSeat.getProposal().want],
        [leftSeat, rightSeat, rightSeat.getProposal().want],
      ]),
    );
  } catch (err) {
    leftSeat.fail(err);
    rightSeat.fail(err);
    throw err;
  }

  leftSeat.exit();
  rightSeat.exit();
  return defaultAcceptanceMsg;
};
```

## `fromOnly` and `toOnly`

Some transfers only need to say what comes from a seat, or only what goes to
a seat, leaving the rest of the array to balance it out. Writing
`[fromSeat, undefined, fromAmounts]` and `[undefined, toSeat, undefined,
toAmounts]` by hand is easy to get wrong, so
[`contractSupport`](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contractSupport/atomicTransfer.js)
provides `fromOnly(fromSeat, fromAmounts)` and `toOnly(toSeat, toAmounts)` to
express those cases clearly. The `swapExact` helper uses both to move each
seat's full `give` out and full `want` in:

```js
export const swapExact = (zcf, leftSeat, rightSeat) => {
  try {
    zcf.atomicRearrange(
      harden([
        fromOnly(rightSeat, rightSeat.getProposal().give),
        fromOnly(leftSeat, leftSeat.getProposal().give),

        toOnly(leftSeat, leftSeat.getProposal().want),
        toOnly(rightSeat, rightSeat.getProposal().want),
      ]),
    );
  } catch (err) {
    leftSeat.fail(err);
    rightSeat.fail(err);
    throw err;
  }

  leftSeat.exit();
  rightSeat.exit();
  return defaultAcceptanceMsg;
};
```

## `atomicTransfer`

For the common case of a single one-way transfer, `atomicTransfer` avoids
wrapping the arguments in an array:

```js
import { atomicTransfer } from '@agoric/zoe/src/contractSupport/index.js';

atomicTransfer(zcf, fromSeat, toSeat, fromAmounts, toAmounts);
```

which is exactly:

```js
zcf.atomicRearrange(harden([[fromSeat, toSeat, fromAmounts, toAmounts]]));
```

::: tip Import from `contractSupport/index.js`

`fromOnly`, `toOnly`, and `atomicTransfer` are helpers, imported from
`@agoric/zoe/src/contractSupport/index.js` alongside `swap` and `swapExact`.
There is also an `atomicRearrange` helper with the same signature as
`zcf.atomicRearrange`, but it's deprecated in favor of calling the `zcf`
method directly.

:::

## API Reference

See [`ZCF.atomicRearrange`](/reference/zoe-api/zoe-contract-facet#zcf-atomicrearrange-transfers)
and [`TransferPartShape`](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contractSupport/atomicTransfer.js).
