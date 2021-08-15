// @ts-check
import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';

import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeZoeKit } from '@agoric/zoe';
import bundleSource from '@agoric/bundle-source';
import { makeIssuerKit, AmountMath } from '@agoric/ertp';
import { E } from '@agoric/eventual-send';
import { makeRatio } from '@agoric/zoe/src/contractSupport/index.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { makeFakePriceAuthority } from '@agoric/zoe/tools/fakePriceAuthority.js';
import { makeNotifierKit } from '@agoric/notifier';

test('loan contract', async t => {
  const { zoeService } = makeZoeKit(makeFakeVatAdmin().admin);
  const feePurse = E(zoeService).makeFeePurse();
  const zoe = E(zoeService).bindDefaultFeePurse(feePurse);

  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/loan'),
  );
  const installation = await E(zoe).install(contractBundle);

  const {
    issuer: collateralIssuer,
    mint: collateralMint,
    brand: collateralBrand,
  } = makeIssuerKit('moola');
  const {
    issuer: loanIssuer,
    mint: loanMint,
    brand: loanBrand,
  } = makeIssuerKit('simoleans');

  // Create autoswap installation and instance
  const autoswapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/autoswap'),
  );
  const autoswapInstallation = await E(zoe).install(autoswapBundle);

  const { instance: autoswapInstance } = await E(zoe).startInstance(
    autoswapInstallation,
    harden({ Central: collateralIssuer, Secondary: loanIssuer }),
  );

  const issuerKeywordRecord = harden({
    Collateral: collateralIssuer,
    Loan: loanIssuer,
  });

  const timer = buildManualTimer(console.log);

  const priceAuthority = makeFakePriceAuthority({
    actualBrandIn: collateralBrand,
    actualBrandOut: loanBrand,
    priceList: [4, 2],
    timer,
  });

  const doAddCollateral = _ => {};
  const allCollateralAmount = AmountMath.make(collateralBrand, 1000n);
  const myWarningLevel = AmountMath.make(loanBrand, 1500n);

  // #region customMarginCall
  E(priceAuthority)
    .quoteWhenLT(allCollateralAmount, myWarningLevel)
    .then(priceQuote => doAddCollateral(priceQuote));
  // #endregion customMarginCall

  const { notifier: periodNotifier } = makeNotifierKit();

  const loanPayment = loanMint.mintPayment(AmountMath.make(loanBrand, 1000n));

  // #region lend
  const terms = {
    mmr: makeRatio(150n, loanBrand),
    autoswapInstance,
    priceAuthority,
    periodNotifier,
    interestRate: 5,
    interestPeriod: 5,
  };

  const { creatorInvitation: lendInvitation } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );

  const maxLoan = AmountMath.make(loanBrand, 1000n);

  const proposal = harden({
    give: { Loan: maxLoan },
  });

  const payments = harden({
    Loan: loanPayment,
  });

  const lenderSeatPromise = E(zoe).offer(lendInvitation, proposal, payments);

  // E() can operate on a promise for an object. This enables promise pipelining.
  const borrowInvitationPromise = E(lenderSeatPromise).getOfferResult();
  // #endregion lend

  const collateralPayment = collateralMint.mintPayment(allCollateralAmount);

  // #region borrow
  const borrowerProposal = harden({
    want: { Loan: maxLoan },
    give: { Collateral: allCollateralAmount },
  });

  const borrowerPayments = {
    Collateral: collateralPayment,
  };
  const borrowSeatPromise = E(zoe).offer(
    borrowInvitationPromise,
    borrowerProposal,
    borrowerPayments,
  );

  const borrowFacetPromise = E(borrowSeatPromise).getOfferResult();
  // #endregion borrow

  const invitationIssuer = await E(zoe).getInvitationIssuer();

  // #region closeLoanInvitation
  const closeLoanInvitationPromise = E(
    borrowFacetPromise,
  ).makeCloseLoanInvitation();
  // #endregion closeLoanInvitation

  // #region addCollateralInvitation
  const addCollateralInvitationPromise = E(
    borrowFacetPromise,
  ).makeAddCollateralInvitation();
  // #endregion addCollateralInvitation

  // #region debtNotifier
  const debtNotifierPromise = E(borrowFacetPromise).getDebtNotifier();
  const state = await E(debtNotifierPromise).getUpdateSince();
  t.deepEqual(state.value, maxLoan);
  // #endregion debtNotifier

  t.truthy(await E(invitationIssuer).isLive(closeLoanInvitationPromise));
  t.truthy(await E(invitationIssuer).isLive(addCollateralInvitationPromise));

  const liquidationTriggerValue = AmountMath.make(loanBrand, 1000n);
  const liquidate = () => {};

  // #region liquidate
  const internalLiquidationPromise = E(priceAuthority).quoteWhenLT(
    allCollateralAmount,
    liquidationTriggerValue,
  );
  internalLiquidationPromise.then(liquidate);
  // #endregion liquidate
});
