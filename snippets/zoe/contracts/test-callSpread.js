// eslint-disable-next-line import/no-extraneous-dependencies
import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';

import bundleSource from '@agoric/bundle-source';
import { E } from '@agoric/eventual-send';
import '@agoric/zoe/exported.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { AmountMath } from '@agoric/ertp';

import { setup } from '@agoric/zoe/test/unitTests/setupBasicMints.js';
import { assertPayoutDeposit } from '@agoric/zoe/test/zoeTestHelpers.js';
import { makeFakePriceAuthority } from '@agoric/zoe/tools/fakePriceAuthority.js';

const makeTestPriceAuthority = (brands, priceList, timer) =>
  makeFakePriceAuthority({
    actualBrandIn: brands.get('simoleans'),
    actualBrandOut: brands.get('moola'),
    priceList,
    timer,
  });

test('callSpread, mid-strike', async t => {
  const {
    moolaIssuer,
    simoleanIssuer,
    moola,
    simoleans,
    bucksIssuer,
    bucksMint,
    bucks,
    zoe,
    brands,
  } = setup();
  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/callSpread/fundedCallSpread'),
  );
  const installation = await E(zoe).install(contractBundle);

  // Alice will create and fund a call spread contract, and give the invitations
  // to Bob and Carol. Bob and Carol will promptly schedule collection of funds.
  // The spread will then mature, and both will get paid.

  // Setup Alice
  const aliceBucksPayment = bucksMint.mintPayment(bucks(300));
  // Setup Bob
  const bobBucksPurse = bucksIssuer.makeEmptyPurse();
  // Setup Carol
  const carolBucksPurse = bucksIssuer.makeEmptyPurse();

  const manualTimer = buildManualTimer(console.log, 0n);
  const priceAuthority = makeTestPriceAuthority(
    brands,
    [20n, 45n],
    manualTimer,
  );

  // #region startInstance
  // underlying is 2 Simoleans, strike range is 30-50 (doubled)
  const terms = harden({
    expiration: 3n,
    underlyingAmount: simoleans(2),
    priceAuthority,
    strikePrice1: moola(60),
    strikePrice2: moola(100),
    settlementAmount: bucks(300),
    timer: manualTimer,
  });
  const issuerKeywordRecord = harden({
    Underlying: simoleanIssuer,
    Collateral: bucksIssuer,
    Strike: moolaIssuer,
  });

  const { creatorInvitation } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );
  // #endregion startInstance

  // #region invitationDetails
  const invitationDetail = await E(zoe).getInvitationDetails(creatorInvitation);
  const longOptionAmount = invitationDetail.longAmount;
  const shortOptionAmount = invitationDetail.shortAmount;
  // #endregion invitationDetails

  // #region creatorInvitation
  const aliceProposal = harden({
    want: { LongOption: longOptionAmount, ShortOption: shortOptionAmount },
    give: { Collateral: bucks(300) },
  });
  const alicePayments = { Collateral: aliceBucksPayment };
  const aliceSeat = await zoe.offer(
    creatorInvitation,
    aliceProposal,
    alicePayments,
  );
  const {
    LongOption: bobLongOption,
    ShortOption: carolShortOption,
  } = await aliceSeat.getPayouts();
  // #endregion creatorInvitation

  // #region bobExercise
  const bobOptionSeat = await zoe.offer(bobLongOption);
  const bobPayout = bobOptionSeat.getPayout('Collateral');
  // #endregion bobExercise

  const bobDeposit = assertPayoutDeposit(
    t,
    bobPayout,
    bobBucksPurse,
    bucks(225),
  );

  const carolOptionSeat = await zoe.offer(carolShortOption);
  const carolPayout = carolOptionSeat.getPayout('Collateral');
  const carolDeposit = assertPayoutDeposit(
    t,
    carolPayout,
    carolBucksPurse,
    bucks(75),
  );

  // #region verifyTerms
  const optionValue = shortOptionAmount.value[0];
  const carolTerms = await zoe.getTerms(optionValue.instance);
  t.is('short', optionValue.position);
  t.is(3n, carolTerms.expiration);
  t.is(manualTimer, carolTerms.timer);
  t.is(priceAuthority, carolTerms.priceAuthority);
  t.truthy(AmountMath.isEqual(simoleans(2), carolTerms.underlyingAmount));
  t.truthy(AmountMath.isEqual(moola(60), carolTerms.strikePrice1));
  t.truthy(AmountMath.isEqual(moola(100), carolTerms.strikePrice2));
  t.truthy(AmountMath.isEqual(bucks(300), carolTerms.settlementAmount));
  // #endregion verifyTerms

  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await Promise.all([bobDeposit, carolDeposit]);
});

test('pricedCallSpread, mid-strike', async t => {
  const {
    moolaIssuer,
    simoleanIssuer,
    moola,
    simoleans,
    bucksIssuer,
    bucksMint,
    bucks,
    zoe,
    brands,
  } = setup();
  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/callSpread/pricedCallSpread'),
  );
  const installation = await E(zoe).install(contractBundle);

  // Setup Bob
  const bobBucksPurse = bucksIssuer.makeEmptyPurse();
  const bobBucksPayment = bucksMint.mintPayment(bucks(225));
  // Setup Carol
  const carolBucksPurse = bucksIssuer.makeEmptyPurse();
  const carolBucksPayment = bucksMint.mintPayment(bucks(75));

  const manualTimer = buildManualTimer(console.log, 0n);
  const priceAuthority = await makeTestPriceAuthority(
    brands,
    [20n, 45n, 45n, 45n, 45n, 45n, 45n],
    manualTimer,
  );

  // #region startInstancePriced
  // underlying is 2 Simoleans, strike range is 30-50 (doubled)
  const terms = harden({
    expiration: 3n,
    underlyingAmount: simoleans(2),
    priceAuthority,
    strikePrice1: moola(60),
    strikePrice2: moola(100),
    settlementAmount: bucks(300),
    timer: manualTimer,
  });
  // Alice creates a pricedCallSpread instance
  const issuerKeywordRecord = harden({
    Underlying: simoleanIssuer,
    Collateral: bucksIssuer,
    Strike: moolaIssuer,
  });
  const { creatorFacet } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );
  // #endregion startInstancePriced

  // #region makeInvitationPriced
  const invitationPair = await E(creatorFacet).makeInvitationPair(75n);
  const { longInvitation, shortInvitation } = invitationPair;
  // #endregion makeInvitationPriced

  // region validatePricedInvitation
  const invitationIssuer = await E(zoe).getInvitationIssuer();
  const longAmount = await E(invitationIssuer).getAmountOf(longInvitation);
  const longOptionValue = longAmount.value[0];
  const longOption = longOptionValue.option;

  t.is(installation, longOptionValue.installation);
  t.is('long', longOptionValue.position);
  t.is(225n, longOptionValue.collateral);
  // endregion validatePricedInvitation

  // region checkTerms-priced
  const bobTerms = await E(zoe).getTerms(longOptionValue.instance);
  t.truthy(AmountMath.isEqual(simoleans(2), bobTerms.underlyingAmount));
  t.truthy(AmountMath.isEqual(bucks(300), bobTerms.settlementAmount));
  // endregion checkTerms-priced

  // Bob makes an offer for the long option
  // region exercisePricedInvitation
  const bobProposal = harden({
    want: { Option: longOption },
    give: { Collateral: bucks(longOptionValue.collateral) },
  });
  const bobFundingSeat = await zoe.offer(await longInvitation, bobProposal, {
    Collateral: bobBucksPayment,
  });
  const bobOption = await bobFundingSeat.getPayout('Option');
  // endregion exercisePricedInvitation

  // region exercisePricedOption
  // bob gets an option, and exercises it for the payout
  const bobOptionSeat = await zoe.offer(bobOption);

  const bobPayout = bobOptionSeat.getPayout('Collateral');
  // region exercisePricedOption
  const bobDeposit = assertPayoutDeposit(
    t,
    bobPayout,
    bobBucksPurse,
    bucks(225),
  );

  const shortAmount = await E(invitationIssuer).getAmountOf(shortInvitation);
  const shortOptionValue = shortAmount.value[0];
  t.is('short', shortOptionValue.position);
  const shortOption = shortOptionValue.option;

  // carol makes an offer for the short option
  const carolProposal = harden({
    want: { Option: shortOption },
    give: { Collateral: bucks(shortOptionValue.collateral) },
  });
  const carolFundingSeat = await zoe.offer(
    await shortInvitation,
    carolProposal,
    {
      Collateral: carolBucksPayment,
    },
  );
  // carol gets an option, and exercises it for the payout
  const carolOption = await carolFundingSeat.getPayout('Option');
  const carolOptionSeat = await zoe.offer(carolOption);

  const carolPayout = carolOptionSeat.getPayout('Collateral');
  const carolDeposit = assertPayoutDeposit(
    t,
    carolPayout,
    carolBucksPurse,
    bucks(75),
  );

  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await Promise.all([bobDeposit, carolDeposit]);
});
