// @ts-check
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import test from 'ava';

import { E } from '@endo/eventual-send';
// #region importFar
import { Far } from '@endo/far';
// #endregion importFar
// #region import-pass-style
import { passStyleOf } from '@endo/pass-style';
// #endregion import-pass-style

test('remote counter', async t => {
  const assert = cond => t.true(cond);

  // #region makeFarCounter
  const makeCounter = () => {
    let count = 0;
    return Far('counter', {
      incr: () => (count += 1),
      decr: () => (count -= 1),
    });
  };

  const publicFacet = Far('makeCounter', { makeCounter });
  assert(passStyleOf(publicFacet) === 'remotable');
  // #endregion makeFarCounter

  // #region useFarCounter
  const counter = E(publicFacet).makeCounter();
  const n = await E(counter).incr();
  assert(n === 1);
  // #endregion useFarCounter
});

test('async fetch', async t => {
  const assert = cond => t.true(cond);
  const fetch = _ =>
    Promise.resolve({
      json: () => Promise.resolve(['p1', 'p2']),
    });
  const initialize = p => assert(p.length === 2);

  // #region asyncFetch
  const init = fetch('products.json')
    .then(response => response.json())
    .then(products => initialize(products))
    .catch(err => {
      console.log(`Fetch problem: ${err.message}`);
    });
  // #endregion asyncFetch
  await init;
});
