// #region test-01-hello
// #region test-imports
import '@endo/init';
import { E } from '@endo/far';
// eslint-disable-next-line import/no-unresolved -- https://github.com/avajs/ava/issues/2951
import test from 'ava';
// #endregion test-imports
// #region test1
import { start } from '../src/01-hello.js';

test('contract greets by name', async t => {
  const { publicFacet } = start();
  const actual = await E(publicFacet).greet('Bob');
  t.is(actual, 'Hello, Bob!');
});
// #endregion test1
// #endregion test-01-hello
