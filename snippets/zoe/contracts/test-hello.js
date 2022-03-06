// @ts-check

// TODO Remove babel-standalone preinitialization
// https://github.com/endojs/endo/issues/768
import '@agoric/babel-standalone';

import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
import { makeZoeKit } from '@agoric/zoe';

/**
 * Bundle sources of contracts before we start tests.
 *
 * @typedef {import('ava').Implementation<Record<string, Object>>} WithBundles
 */
test.before(async t => {
  // @ts-expect-error import.meta is outside SES but OK in tests.
  const asset = ref => new URL(ref, new URL(import.meta.url)).pathname;

  const contractRoots = {
    hello: asset('./hello-zoe.js'),
    helloRW: asset('./hello-zoe-rw.js'),
  };

  const bundles = {
    hello: await bundleSource(contractRoots.hello),
    helloRW: await bundleSource(contractRoots.helloRW),
  };
  Object.assign(t.context, { bundles });
});

test('Install, start, use hello contract', /** @type {WithBundles} */ async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);

  const installation = E(zoe).install(t.context.bundles.hello);
  const { publicFacet } = await E(zoe).startInstance(installation);

  const actual = await E(publicFacet).get();
  t.is(actual, 'Hello, World!');
});

test('get, set from hello', /** @type {WithBundles} */ async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);

  const installation = E(zoe).install(t.context.bundles.helloRW);
  const { creatorFacet, publicFacet } = E.get(
    E(zoe).startInstance(installation),
  );

  const actual = await E(publicFacet).get();
  t.is(actual, 'Hello, World!');

  await E(creatorFacet).set('Bye bye!');
  const actual2 = await E(publicFacet).get();
  t.is(actual2, 'Bye bye!');
});
