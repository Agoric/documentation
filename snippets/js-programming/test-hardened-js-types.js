// @jessie-check
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
/**
 * @file Exercises the advisory-types and defensive-types counters excerpted
 *   by main/guides/js-programming/hardened-js.md, and the two `lockdown()`
 *   calls that page opens with.
 */
import { test } from '../prepare-test-env-ava.js';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { makeCounter as makeAdvisoryCounter } from './advisory-counter.js';
import { makeCounter as makeDefensiveCounter } from './defensive-counter.js';

const myRequire = createRequire(import.meta.url);

/**
 * Run one of the standalone lockdown examples in its own Node process, since
 * `lockdown()` may only be called once per realm and this test's realm is
 * already locked down.
 *
 * @param {string} examplePath
 * @returns {Record<string, unknown>}
 */
const runInFreshRealm = examplePath =>
  JSON.parse(
    execFileSync(process.execPath, [examplePath], { encoding: 'utf8' }),
  );

test('an advisory type annotation does not stop a hostile caller', t => {
  t.is(makeAdvisoryCounter(1).incr(), 2);
  // TypeScript rejects the next two calls statically. Nothing stops them at
  // runtime, which is the whole point of the section this example supports.
  t.is(makeAdvisoryCounter('poison').incr(), 'poison1');
  let launched = false;
  const missiles = harden({
    valueOf: () => {
      launched = true;
      return 1;
    },
  });
  t.is(makeAdvisoryCounter(missiles).incr(), 2);
  t.true(launched, 'the caller ran its own code inside our counter');
});

test('a defensive counter validates at the trust boundary', t => {
  t.is(makeDefensiveCounter(1).increment(), 2n);
  t.is(makeDefensiveCounter(1n).increment(), 2n);
  const failure = t.throws(() => makeDefensiveCounter('poison'));
  t.is(failure.name, 'TypeError');
  t.is(failure.message, 'poison is a string but must be a bigint or a number');
});

test('lockdown() tamper-proofs the intrinsics', t => {
  t.deepEqual(runInFreshRealm(myRequire.resolve('./lockdown-basic.js')), {
    objectPrototypeFrozen: true,
    hardenIsAvailable: true,
  });
});

test('lockdown() accepts options that loosen its defaults', t => {
  t.deepEqual(runInFreshRealm(myRequire.resolve('./lockdown-options.js')), {
    objectPrototypeFrozen: true,
    stackIsReadable: true,
  });
});
