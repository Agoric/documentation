// #region test-imports
import '@endo/init';
import { E } from '@endo/far';
// eslint-disable-next-line import/no-unresolved -- https://github.com/avajs/ava/issues/2951
import test from 'ava';
// #endregion test-imports
import * as state from '../src/02-state.js';
import * as access from '../src/03-access.js';
// #region test1
import { start } from '../src/01-hello.js';

test('contract greets by name', async t => {
  const { publicFacet } = start();
  const actual = await E(publicFacet).greet('Bob');
  t.is(actual, 'Hello, Bob!');
});
// #endregion test1

// #region test-state
test('state', async t => {
  const { publicFacet } = state.start();
  const actual = await E(publicFacet).getRoomCount();
  t.is(actual, 0);
  await E(publicFacet).makeRoom(2);
  t.is(await E(publicFacet).getRoomCount(), 1);
});
// #endregion test-state

// #region test-access
test('access control', async t => {
  const { publicFacet, creatorFacet } = access.start();
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await t.throwsAsync(E(publicFacet).set(2), { message: /no method/ });
  await E(creatorFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});
// #endregion test-access
