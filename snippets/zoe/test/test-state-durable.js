// @ts-check

/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test as anyTest } from '../../prepare-test-env-ava.js';

import { createRequire } from 'module';
import { E } from '@endo/far';
import { makeNodeBundleCache } from '@endo/bundle-source/cache.js';
import { makeZoeKitForTest } from '@agoric/zoe/tools/setup-zoe.js';

const nodeRequire = createRequire(import.meta.url);
const asset = {
  stateDurable: nodeRequire.resolve(`../src/02b-state-durable.js`),
};

/** @type {import('ava').TestFn<Awaited<ReturnType<makeTestContext>>>} */
const test = anyTest;

/**
 * Tests assume access to the zoe service and that contracts are bundled.
 *
 * @param {unknown} _t
 */
const makeTestContext = async _t => {
  const { zoeService: zoe, feeMintAccess } = makeZoeKitForTest();

  const bundleCache = await makeNodeBundleCache('bundles/', {}, s => import(s));
  const bundle = await bundleCache.load(asset.stateDurable, 'stateDurable');

  return { zoe, bundle, bundleCache, feeMintAccess };
};

test.before(async t => (t.context = await makeTestContext(t)));

// #region test-state
test('state - durable', async t => {
  const { zoe, bundle } = t.context;
  const installation = await E(zoe).install(bundle);
  const { publicFacet } = await E(zoe).startInstance(installation);
  t.is(await E(publicFacet).get(), 'Hello, World!');
  await E(publicFacet).set(2);
  t.is(await E(publicFacet).get(), 2);
});
// #endregion test-state
