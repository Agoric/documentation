// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file Working examples excerpted by main/guides/js-programming/far.md.
 */
import { test } from '../prepare-test-env-ava.js';

// #region farExoCounter
import { makeExo } from '@endo/exo';
import { M } from '@endo/patterns';

const CounterI = M.interface('Counter', {
  increment: M.call(M.number()).returns(M.number()),
});

let count = 0;
const counter = makeExo('Counter', CounterI, {
  increment(n) {
    count += n; // n is guaranteed to be a number
    return count;
  },
});

counter.increment(5); // 5
// counter.increment('5') throws: arg 0: string "5" - Must be a number
// #endregion farExoCounter

test('an exo guards its methods where a bare Far() would not', t => {
  t.is(count, 5, 'the example already incremented by 5');
  t.is(counter.increment(2), 7);
  t.throws(() => counter.increment('5'), {
    message:
      'In "increment" method of (Counter): arg 0: string "5" - Must be a number',
  });
  t.is(counter.increment(0), 7, 'the rejected call never reached the body');
});
