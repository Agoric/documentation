// @ts-check

import '@agoric/zoe/tools/prepare-test-env';
import test from 'ava';
import { E } from '@agoric/eventual-send';
import { makeZoe } from '@agoric/zoe';
import { makeIssuerKit } from '@agoric/ertp';

// #region importBundleSource
import bundleSource from '@agoric/bundle-source';
// #endregion importBundleSource

import { makeFakeVatAdmin } from '@agoric/zoe/src/contractFacet/fakeVatAdmin';

test('intro to zoe', async t => {
  const zoe = makeZoe(makeFakeVatAdmin().admin);

  const moolaKit = makeIssuerKit('moola');
  const simoleanKit = makeIssuerKit('simoleans');

  const purse = simoleanKit.issuer.makeEmptyPurse();
  purse.deposit(
    simoleanKit.mint.mintPayment(simoleanKit.amountMath.make(1000)),
  );
  const aliceProposal = harden({
    give: { Asset: moolaKit.amountMath.make(3) }, // asset: 3 moola
    want: { Price: simoleanKit.amountMath.make(7) }, // price: 7 simoleans
  });
  const alicePayments = harden({
    Asset: moolaKit.mint.mintPayment(moolaKit.amountMath.make(3)),
  });

  // #region bundle
  const atomicSwapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/atomicSwap'),
  );
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
  const { installation, asset, price } = invitationDetails;
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
    want: { Asset: asset }, // asset: 3 moola
    give: { Price: price }, // price: 7 simoleans
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
    moolaKit.amountMath.make(3),
  );

  // #region alicePayout
  const aliceSimoleanPayment = await E(aliceSeat).getPayout('Price');
  // #endregion alicePayout
  t.deepEqual(
    await simoleanKit.issuer.getAmountOf(aliceSimoleanPayment),
    simoleanKit.amountMath.make(7),
  );
});

test('intro to zoe - contract-format', async t => {
  const zoe = makeZoe(makeFakeVatAdmin().admin);
  const atomicSwapBundle = await bundleSource(`${__dirname}/contract-format`);
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
