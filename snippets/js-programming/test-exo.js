// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file Working examples excerpted by main/guides/js-programming/exo.md.
 */
import { test } from '../prepare-test-env-ava.js';
import { CounterI, FetcherI } from './exo-interface.js';
import { makeCounter as makeDurableCounter } from './exo-durable.js';

// #region makeExoCounter
import { makeExo } from '@endo/exo';

let count = 0;
const counter = makeExo('Counter', CounterI, {
  increment(n = 1) {
    count += n;
    return count;
  },
  reset(to = 0) {
    count = to;
  },
  getValue: () => count,
});
// #endregion makeExoCounter

// #region defineExoClassCounter
import { defineExoClass } from '@endo/exo';

const makeCounter = defineExoClass(
  'Counter',
  CounterI,
  (initialValue = 0) => ({ count: initialValue }), // init(): per-instance state
  {
    increment(delta = 1) {
      this.state.count += delta; // this.state: this instance's state
      return this.state.count;
    },
    reset(to = 0) {
      this.state.count = to;
    },
    getValue() {
      return this.state.count;
    },
  },
);

const counter1 = makeCounter(0);
const counter2 = makeCounter(100);
counter1.increment(); // 1
counter2.increment(); // 101, independent of counter1
// #endregion defineExoClassCounter

// #region defineExoClassKitCounter
import { defineExoClassKit } from '@endo/exo';
import { M } from '@endo/patterns';

const CounterKitI = {
  up: M.interface('UpCounter', {
    increment: M.call(M.number()).returns(M.number()),
  }),
  down: M.interface('DownCounter', {
    decrement: M.call(M.number()).returns(M.number()),
  }),
  reader: M.interface('CounterReader', {
    getValue: M.call().returns(M.number()),
  }),
};

const makeCounterKit = defineExoClassKit(
  'Counter',
  CounterKitI,
  (initialValue = 0) => ({ count: initialValue }), // shared init state
  {
    up: {
      increment(delta) {
        this.state.count += delta;
        return this.state.count;
      },
    },
    down: {
      decrement(delta) {
        this.state.count -= delta;
        return this.state.count;
      },
    },
    reader: {
      getValue() {
        return this.state.count;
      },
    },
  },
);

const { up, down, reader } = makeCounterKit(50);
// Give `up` to whoever should only be able to increment,
// `down` to whoever should only be able to decrement,
// `reader` to anyone who should be able to read but not modify.
// #endregion defineExoClassKitCounter

// #region getInterfaceGuard
import { GET_INTERFACE_GUARD } from '@endo/exo';
import { getInterfaceMethodKeys } from '@endo/patterns';
import { E } from '@endo/far';

const describeCounter = async aCounter => {
  const guard = await E(aCounter)[GET_INTERFACE_GUARD]();
  return getInterfaceMethodKeys(guard); // ['increment', 'reset', 'getValue']
};
// #endregion getInterfaceGuard

test('an interface guard rejects a bad call before the method body runs', t => {
  t.throws(
    () => {
      // #region guardRejectsBadCall
      counter.increment('5');
      // throws before increment() runs:
      // In "increment" method of (Counter): arg 0?: string "5" - Must be a number
      // #endregion guardRejectsBadCall
    },
    {
      message:
        'In "increment" method of (Counter): arg 0?: string "5" - Must be a number',
    },
  );
  // The method body never ran, so the closed-over count is untouched.
  t.is(counter.getValue(), 0);
});

test('makeExo makes one instance whose state lives in a closure', t => {
  counter.reset();
  t.is(counter.increment(5), 5);
  t.is(counter.increment(), 6);
  t.is(counter.getValue(), 6);
  counter.reset(0);
  t.is(counter.getValue(), 0);
});

test('defineExoClass gives each instance its own state', t => {
  t.is(counter1.getValue(), 1);
  t.is(counter2.getValue(), 101);
  t.is(counter1.increment(10), 11);
  t.is(counter2.getValue(), 101, 'counter2 is independent of counter1');
  t.throws(() => counter1.increment('10'), {
    message: /Must be a number/,
  });
});

test('defineExoClassKit splits one state across least-authority facets', t => {
  t.is(reader.getValue(), 50);
  t.is(up.increment(5), 55);
  t.is(down.decrement(15), 40);
  t.is(reader.getValue(), 40, 'all three facets share one state');
  t.is(up.decrement, undefined, 'the up facet cannot decrement');
  t.is(down.increment, undefined, 'the down facet cannot increment');
  t.is(reader.increment, undefined, 'the reader facet cannot write at all');
});

test('a durable zone allocates the same exo class into baggage', t => {
  const durableCounter = makeDurableCounter(7);
  t.is(durableCounter.increment(), 8);
  t.is(durableCounter.increment(4), 12);
  t.is(durableCounter.getValue(), 12);
});

test('GET_INTERFACE_GUARD reports the guarded method names', async t => {
  t.deepEqual(await describeCounter(counter), [
    'increment',
    'reset',
    'getValue',
  ]);
});

test('M.callWhen awaits promise arguments before validating them', async t => {
  const fetcher = makeExo('Fetcher', FetcherI, {
    async fetch(url) {
      return `contents of ${url}`;
    },
  });
  t.is(
    await fetcher.fetch(Promise.resolve('https://agoric.com')),
    'contents of https://agoric.com',
  );
  await t.throwsAsync(() => fetcher.fetch(Promise.resolve(42)), {
    message: /Must be a string/,
  });
});
