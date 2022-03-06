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
    primes: asset('./points-for-primes.js'),
  };

  const bundles = {
    primes: await bundleSource(contractRoots.primes),
  };
  Object.assign(t.context, { bundles });
});

test('zoe - points for primes', /** @type {WithBundles} */ async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);

  const installation = E(zoe).install(t.context.bundles.primes);

  const { publicFacet, instance } = await E(zoe).startInstance(installation);

  const play = async (guess, reward) => {
    const invitation = await E(publicFacet).makeInvitation();

    const seat = E(zoe).offer(
      invitation,
      undefined,
      undefined,
      harden({ guess }),
    );
    const actual = await E(seat).getOfferResult();
    t.is(actual, reward > 0n ? 'win' : 'guess again');

    if (!reward) {
      t.log({ guess, result: actual });
      return;
    }

    const {
      issuers: { Award: awardIssuer },
      brands: { Award: awardBrand },
    } = await E(zoe).getTerms(instance);
    const myPoints = await E(seat).getPayout('Award');
    const howMuch = await E(awardIssuer).getAmountOf(myPoints);

    t.log({ guess, result: actual, value: howMuch.value });
    t.deepEqual(howMuch, { brand: awardBrand, value: reward });
  };
  await play(2n, 1n);
  await play(3n, 2n);
  await play(4n, undefined);
  await play(5n, 3n);
});
