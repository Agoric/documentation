// #region test-imports
import '@endo/init';
import { E } from '@endo/far';
import test from 'ava';
// #endregion test-imports
import { start as startState } from '../src/02-state.js';
import { start as startAccess } from '../src/03-access.js';
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
  const { publicFacet } = startState();
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await E(publicFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});
// #endregion test-state

// #region test-access
test('access control', async t => {
  const { publicFacet, creatorFacet } = startAccess();
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await t.throwsAsync(E(publicFacet).set(2), { message: /no method/ });
  await E(creatorFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});
// #endregion test-access
