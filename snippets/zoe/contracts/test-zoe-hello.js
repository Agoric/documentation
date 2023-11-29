// TODO: convince prettier that harden() is a global
/* global harden */

import '@endo/init';
import { E } from '@endo/far';
import test from 'ava';
import { start as startHello } from '../src/01-hello.js';
import { start as startState } from '../src/02-state.js';
import { start as startAccess } from '../src/03-access.js';

const mockZcf = harden({});

test('contract greet greets by name', async t => {
  const { publicFacet } = startHello(mockZcf);
  const actual = await E(publicFacet).greet('Bob');
  t.is(actual, 'Hello, Bob!');
});

test('state', async t => {
  const { publicFacet } = startState(mockZcf);
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await E(publicFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});

test('access', async t => {
  const { publicFacet, creatorFacet } = startAccess(mockZcf);
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await t.throwsAsync(E(publicFacet).set(2), { message: /no method/ });
  await E(creatorFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});
