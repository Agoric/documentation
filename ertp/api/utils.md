# /utils

ERTP utility functions can be imported from `/utils`.

## makePromise

- **Arguments:**
  - None

- **Usage:**

Sets a variable to be an ocap-safe `Promise`.

```js
import { makePromise } from '../util/makePromise';

const winnings = makePromise();
```

### makePromise.res

- **Arguments:**
  - `{Any}` - value
    -  Argument to be resolved by this `Promise`. Can also be a `Promise` or a thenable to resolve.

- **Usage:**

Return a `Promise`-like object that is resolved with the given `value`.

```js
import { makePromise } from '../util/makePromise';

function makeTransfer(amount, srcPaymentP) {
  const { issuer } = amount.label;
  const escrowP = E(issuer).claimExactly(amount, srcPaymentP, 'escrow');
  const winnings = makePromise();
  const refund = makePromise();
  return harden({
    phase1() {
      return escrowP;
    },
    phase2() {
      winnings.res(escrowP);
      refund.res(null);
    }
  });
```

### makePromise.reject

- **Arguments:**
  - `{Any}` - reason
    - Reason why this `Promise` was rejected

- **Usage:**

Returns a `Promise` object that is rejected with a given reason.

```js
function makeTransfer(amount, srcPaymentP) {
  const { issuer } = amount.label;
  const escrowP = E(issuer).claimExactly(amount, srcPaymentP, 'escrow');
  const winnings = makePromise();
  const refund = makePromise();
  return harden({
    phase1() {
      return escrowP;
    },
    phase2() {
      winnings.res(escrowP);
      refund.res(null);
    },
    abort(reason) {
      winnings.reject(reason);
      refund.res(escrowP);
    },
    getWinnings() {
      return winnings.p;
    },
    getRefund() {
      return refund.p;
    },
  });
}
```

## allSettled

- **Arguments:**
  - `{Iterable[Promises]}` - promises

- **Usage:**

Takes in an iterable of `Promises` or eventuals, and waits for them to resolve.

```js
function makeCollect(E, log) {
  function collect(seatP, winPurseP, refundPurseP, name = 'collecting') {
    const results = harden([
      E(seatP)
        .getWinnings()
        .then(winnings => E(winPurseP).depositAll(winnings)),
      // TODO Bug if we replace the comma above with the uncommented
      // out ".then(_ => undefined)," below, somehow we end up trying
      // to marshal an array with holes, rather than an array with
      // undefined elements. This remains true whether we use
      // Promise.all or allSettled
      /* .then(_ => undefined), */
      E(seatP)
        .getRefund()
        .then(refund => refund && E(refundPurseP).depositAll(refund)),
    ]);
    const doneP = allSettled(results);
    E.resolve(doneP).then(([wins, refs]) => {
      log(`${name} wins: `, wins, ` refs: `, refs);
    });
    // Use Promise.all here rather than allSettled in order to
    // propagate rejection.
    return Promise.all(results);
  }
  return harden(collect);
}
```

## Emap

`Emap` is an abstract superclass with query-only methods. It encapsulates an iterable.

- **Arguments:**
  - `{Iterable}` - optIterable

- **Usage:**

```js
// create constructor

const emap = new Emap()
```
