// @ts-check
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from './prepare-test-env-ava.js';

import { createRequire } from 'module';

import { E } from '@endo/eventual-send';
import { makeZoeKit } from '@agoric/zoe';
import { makeIssuerKit, AmountMath } from '@agoric/ertp';

// #region importBundleSource
import bundleSource from '@endo/bundle-source';
// #endregion importBundleSource

import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';

const nodeRequire = createRequire(import.meta.url);

test('intro to zoe', async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);
  const moolaKit = makeIssuerKit('moola');
  const simoleanKit = makeIssuerKit('simoleans');

  const purse = simoleanKit.issuer.makeEmptyPurse();
  purse.deposit(
    simoleanKit.mint.mintPayment(AmountMath.make(simoleanKit.brand, 1000n)),
  );
  const aliceProposal = harden({
    give: { Asset: AmountMath.make(moolaKit.brand, 3n) }, // asset: 3 Moola
    want: { Price: AmountMath.make(simoleanKit.brand, 7n) }, // price: 7 Simoleans
  });
  const alicePayments = harden({
    Asset: moolaKit.mint.mintPayment(AmountMath.make(moolaKit.brand, 3n)),
  });

  // #region bundle
  const atomicSwapPath = nodeRequire.resolve(
    '@agoric/zoe/src/contracts/atomicSwap.js',
  );
  console.log('@@@', { atomicSwapPath });
  const atomicSwapBundle = await bundleSource(atomicSwapPath);
  // #endregion bundle

  // #region install
  const atomicSwapInstallation = await E(zoe).install(atomicSwapBundle);
  // #endregion install

  // #region startInstance
  const issuerKeywordRecord = harden({
    Asset: moolaKit.issuer,
    Price: simoleanKit.issuer,
  });
  const { creatorInvitation } = await E(zoe).startInstance(
    atomicSwapInstallation,
    issuerKeywordRecord,
  );
  // #endregion startInstance

  // #region aliceOffer
  const aliceSeat = await E(zoe).offer(
    creatorInvitation,
    aliceProposal,
    alicePayments,
  );
  const invitation = await E(aliceSeat).getOfferResult();
  // #endregion aliceOffer

  // #region details
  const invitationDetails = await E(zoe).getInvitationDetails(invitation);
  const { installation, customDetails } = invitationDetails;
  assert(typeof customDetails === 'object');
  const { asset, price } = customDetails;
  // #endregion details

  // #region isCorrectCode
  const isCorrectCode = installation === atomicSwapInstallation;
  // #endregion isCorrectCode
  t.truthy(isCorrectCode);

  // #region inspectCode
  const bundledCode = await E(installation).getBundle();
  // #endregion inspectCode

  t.truthy(bundledCode);

  // #region ourProposal
  const proposal = {
    want: { Asset: asset }, // asset: 3 Moola
    give: { Price: price }, // price: 7 Simoleans
  };
  // #endregion ourProposal

  // #region getPayments
  const simoleanPayment = await E(purse).withdraw(price);
  const payments = { Price: simoleanPayment };
  // #endregion getPayments

  // #region harden
  harden(proposal);
  harden(payments);
  // #endregion harden

  // #region offer
  const userSeat = await E(zoe).offer(invitation, proposal, payments);
  // #endregion offer

  // #region offerResult
  const offerResult = await E(userSeat).getOfferResult();
  // #endregion offerResult
  t.is(
    offerResult,
    'The offer has been accepted. Once the contract has been completed, please check your payout',
  );

  // #region getPayout
  const moolaPayment = await E(userSeat).getPayout('Asset');
  // #endregion getPayout
  t.deepEqual(
    await moolaKit.issuer.getAmountOf(moolaPayment),
    AmountMath.make(moolaKit.brand, 3n),
  );

  // #region alicePayout
  const aliceSimoleanPayment = await E(aliceSeat).getPayout('Price');
  // #endregion alicePayout
  t.deepEqual(
    await simoleanKit.issuer.getAmountOf(aliceSimoleanPayment),
    AmountMath.make(simoleanKit.brand, 7n),
  );
});

test('intro to zoe - contract-format', async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);
  const atomicSwapPath = nodeRequire.resolve('./contract-format.js');
  const atomicSwapBundle = await bundleSource(atomicSwapPath);
  const atomicSwapInstallation = await E(zoe).install(atomicSwapBundle);
  const { creatorInvitation } = await E(zoe).startInstance(
    atomicSwapInstallation,
  );
  const invitationIssuer = await E(zoe).getInvitationIssuer();
  const invitationAmount = await E(invitationIssuer).getAmountOf(
    creatorInvitation,
  );
  t.deepEqual(invitationAmount.value[0].description, 'myInvitation');
});
