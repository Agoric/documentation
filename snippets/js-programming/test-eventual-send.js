// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file Working examples excerpted by
 *   main/guides/js-programming/eventual-send.md.
 */
import { test } from '../prepare-test-env-ava.js';
import { Far } from '@endo/far';
import { makeIssuerKit } from '@agoric/ertp';
import { zoe, bundle } from './zoe-for-examples.js';
import { installationP } from './eventual-send-install.js';
import { vowsBaggage as baggage } from './durable-baggage.js';

// #region eWhen
import { E } from '@endo/far';

const installationHandle = await E.when(E(zoe).install(bundle));
// #endregion eWhen

// `issuerKitP` is a promise for a record, not a presence with methods.
const issuerKitP = Promise.resolve(makeIssuerKit('Moola'));

// #region eGet
const brand = await E.get(issuerKitP).brand;
// #endregion eGet

const recorded = [];
const logger = Far('Logger', {
  record: entry => {
    recorded.push(entry);
  },
});
const event = harden({ kind: 'installed' });

// #region eSendOnly
E.sendOnly(logger).record(event);
// #endregion eSendOnly

// #region prepareVowTools
import { prepareVowTools } from '@agoric/vow';
import { makeDurableZone } from '@agoric/zone/durable.js';

// Once, at the start of a vat incarnation:
const zone = makeDurableZone(baggage);
const { watch, when, makeVowKit } = prepareVowTools(zone);
// #endregion prepareVowTools

test('E(zoe).installBundleID() answers with an installation', async t => {
  const installation = await installationP;
  t.is(typeof installation, 'object');
  t.is(
    typeof (await E(zoe).getBundleIDFromInstallation(installation)),
    'string',
  );
});

test('E.when settles a presence, a promise, or a Vow', async t => {
  t.is(typeof installationHandle, 'object');
  t.is(await E.when(7), 7, 'E.when also accepts a plain value');
  t.is(await E.when(Promise.resolve(7)), 7);
});

test('E.get reads a property off the record a promise resolves to', async t => {
  t.is(typeof brand, 'object');
  t.is(await E(brand).getAllegedName(), 'Moola');
});

test('E.sendOnly delivers the message and answers undefined', async t => {
  t.is(E.sendOnly(logger).record(harden({ kind: 'second' })), undefined);
  // The sends are eventual, so they land on a later turn.
  await null;
  await null;
  t.deepEqual(
    recorded.map(entry => entry.kind),
    ['installed', 'second'],
  );
});

test('prepareVowTools binds the vow tools to a durable zone', async t => {
  t.is(typeof watch, 'function');
  const { vow, resolver } = makeVowKit();
  resolver.resolve('settled');
  t.is(await when(vow), 'settled');
  t.is(typeof zone.exoClass, 'function');
});
