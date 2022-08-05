// @ts-check
import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';
import { AmountMath, makeIssuerKit } from '@agoric/ertp';
import { E } from '@endo/eventual-send';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';

// WARNING: these are really fragile and don't really work outside the agoric-sdk repo
import { setupAmmServices } from '@agoric/inter-protocol/test/amm/vpool-xyk-amm/setup.js';
import { unsafeMakeBundleCache } from '@agoric/swingset-vat/tools/bundleTool.js';

test.before(async t => {
  const bundleCache = await unsafeMakeBundleCache('bundles/');
  t.context = { bundleCache };
});

test('creating a pool', async t => {
  // Set up central token
  const centralR = makeIssuerKit('central');
  const bldKit = makeIssuerKit('BLD');
  const electorateTerms = { committeeName: 'EnBancPanel', committeeSize: 3 };
  const timer = buildManualTimer(t.log, 30n);

  // WARNING: setupAmmServices assumes the contracts are in this package,
  // but they're not.
  const { zoe, amm } = await setupAmmServices(
    t,
    electorateTerms,
    centralR,
    timer,
  );

  t.log({ amm });
  const { issuer: BLDIssuer, brand: BLDBrand } = bldKit;
  const { brand: RUNBrand } = centralR;

  const publicFacet = amm.ammPublicFacet;

  const aliceBLDPayment = bldKit.mint.mintPayment(
    AmountMath.make(BLDBrand, 1000n),
  );
  const aliceRUNPayment = centralR.mint.mintPayment(
    AmountMath.make(RUNBrand, 5000n),
  );

  // #region addIssuer
  const BLDLiquidityIssuer = await E(publicFacet).addIssuer(BLDIssuer, 'BLD');
  // #endregion addIssuer

  const BLDLiquidityBrand = await E(BLDLiquidityIssuer).getBrand();

  // TODO: show this in a snippet?
  const BLDLiquidity = value => AmountMath.make(BLDLiquidityBrand, value);

  // #region addPool
  const aliceProposal = harden({
    // NOTE: Liquidity is less a donation to the reserve
    // document this?
    want: { Liquidity: BLDLiquidity(4000n) },
    give: {
      Secondary: AmountMath.make(BLDBrand, 1000n),
      Central: AmountMath.make(RUNBrand, 5000n),
    },
  });
  const alicePayments = {
    Secondary: aliceBLDPayment,
    Central: aliceRUNPayment,
  };

  const aliceAddPoolInvitation = E(publicFacet).addPoolInvitation();
  const addPoolAndLiquiditySeat = await E(zoe).offer(
    aliceAddPoolInvitation,
    aliceProposal,
    alicePayments,
  );
  // #endregion addPool

  const result = await E(addPoolAndLiquiditySeat).getOfferResult();
  t.deepEqual(result, 'Added liquidity.');
});
