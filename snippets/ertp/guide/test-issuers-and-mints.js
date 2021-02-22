import '@agoric/install-ses';
import test from 'ava';

// #region import
import { makeIssuerKit, MathKind } from '@agoric/ertp';
// #endregion import

test('ertp guide issuers and mints makeIssuerKit', async t => {
  // #region makeIssuerKit
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    amountMath: quatloosAmountMath,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');
  // This is merely an amount, describing assets.
  // It does not create new assets.
  const quatloos2 = quatloosAmountMath.make(2);
  // Non-fungible asset, which needs an amountMath
  // of kind 'MathKind.STRING_SET'
  const {
    mint: titleMint,
    issuer: titleIssuer,
    amountMath: titleAmountMath,
  } = makeIssuerKit('alamedaCountyPropertyTitle', MathKind.STRING_SET);
  // #endregion makeIssuerKit

  t.truthy(quatloosIssuer);
  t.truthy(quatloosMint);
  t.truthy(quatloosBrand);
t.deepEqual(quatloos2, { brand: quatloosBrand, value: 2n });
  t.truthy(titleMint);
  t.truthy(titleIssuer);
  t.truthy(titleAmountMath);
});

test('ertp guide issuers and mints getBrand', async t => {
  // #region getBrand
  const { issuer: quatloosIssuer, brand: quatloosBrand } = makeIssuerKit(
    'quatloos',
  );
  // myQuatloosBrand === quatloosBrand
  const myQuatloosBrand = quatloosIssuer.getBrand();
  // #endregion getBrand

  t.is(quatloosBrand, myQuatloosBrand);
});

test('ertp guide issuers and mints getAllegedName', async t => {
  // #region getAllegedName
  const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
  const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
  // quatloosIssuerAllegedName === 'quatloos'
  // #endregion getAllegedName
  t.is(quatloosIssuerAllegedName, 'quatloos');
});

test('ertp guide issuers and mints getAmountMathKind', async t => {
  // #region getAmountMathKind
  const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
  const kind = quatloosIssuer.getAmountMathKind(); // 'nat', the default value for makeIssuerKit()
  // #endregion getAmountMathKind
  t.is(kind, 'nat');
});

test('ertp guide issuers and mints makeEmptyPurse', async t => {
  // #region makeEmptyPurse
  const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
  // The new empty purse contains 0 Quatloos
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  // #endregion makeEmptyPurse
  t.deepEqual(await quatloosPurse.getCurrentAmount(), {
    brand: quatloosIssuer.getBrand(),
    value: 0n,
  });
});

test('ertp guide issuers and mints payment methods', async t => {
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    amountMath: quatloosAmountMath,
  } = makeIssuerKit('quatloos');

  // #region getAmountOf
  const quatloosPayment = quatloosMint.mintPayment(
    quatloosAmountMath.make(100),
  );
  // returns an amount with a value of 100 and the quatloos brand
  quatloosIssuer.getAmountOf(quatloosPayment);
  // #endregion getAmountOf

  // #region burn
  const amountToBurn = quatloosAmountMath.make(10);
  const paymentToBurn = quatloosMint.mintPayment(amountToBurn);
  // burntAmount is 10 quatloos
  const burntAmount = await quatloosIssuer.burn(paymentToBurn, amountToBurn);
  // #endregion burn
  t.deepEqual(burntAmount, amountToBurn);

  // #region claim
  const amountToTransfer = quatloosAmountMath.make(2);
  const originalPayment = quatloosMint.mintPayment(amountToTransfer);
  const newPayment = await quatloosIssuer.claim(
    originalPayment,
    amountToTransfer,
  );
  // #endregion claim
  t.deepEqual(await quatloosIssuer.getAmountOf(newPayment), amountToTransfer);
  t.not(originalPayment, newPayment);

  // #region combine
  // create an array of 100 payments of 1 unit each
  const payments = [];
  for (let i = 0; i < 100; i += 1) {
    payments.push(quatloosMint.mintPayment(quatloosAmountMath.make(1)));
  }
  // combinedPayment equals 100
  const combinedPayment = quatloosIssuer.combine(payments);
  // #endregion combine

  const quatloosBrand = quatloosIssuer.getBrand();

  t.deepEqual(await quatloosIssuer.getAmountOf(combinedPayment), {
    brand: quatloosBrand,
    value: 100n,
  });

  // #region split
  const oldPayment = quatloosMint.mintPayment(quatloosAmountMath.make(30));
  const [paymentA, paymentB] = await quatloosIssuer.split(
    oldPayment,
    quatloosAmountMath.make(10),
  );
  // paymentA is 10 quatloos, payment B is 20 quatloos.
  // #endregion split
  const paymentAAmount = await quatloosIssuer.getAmountOf(paymentA);
  const paymentBAmount = await quatloosIssuer.getAmountOf(paymentB);
  t.deepEqual(paymentAAmount, quatloosAmountMath.make(10));
  t.deepEqual(paymentBAmount, quatloosAmountMath.make(20));

  // #region splitMany
  // #region splitManyConcise
  const oldQuatloosPayment = quatloosMint.mintPayment(
    quatloosAmountMath.make(100),
  );
  const goodQuatloosAmounts = Array(10).fill(quatloosAmountMath.make(10));

  const arrayOfNewPayments = await quatloosIssuer.splitMany(
    oldQuatloosPayment,
    goodQuatloosAmounts,
  );
  // #endregion splitManyConcise
  // Note that the total amount in the amountArray must equal the
  // amount in the original payment, in the above case, 100 Quatloos in each.

  const anotherQuatloosPayment = quatloosMint.mintPayment(
    quatloosAmountMath.make(1000),
  );
  // total amounts in badQuatloosAmounts equal 20, when it should equal 1000
  const badQuatloosAmounts = Array(2).fill(quatloosAmountMath.make(10));
  // throws error
  t.throwsAsync(
    () => quatloosIssuer.splitMany(anotherQuatloosPayment, badQuatloosAmounts),
    { message: 'rights were not conserved' },
  );
  // #endregion splitMany

  t.is(arrayOfNewPayments.length, 10);
  t.deepEqual(await quatloosIssuer.getAmountOf(arrayOfNewPayments[0]), {
    value: 10n,
    brand: quatloosBrand,
  });

  const payment = quatloosMint.mintPayment(quatloosAmountMath.make(100));
  // #region isLive
  const isItLive = quatloosIssuer.isLive(payment);
  // #endregion isLive
  t.truthy(isItLive);

  // #region getIssuer
  const quatloosMintIssuer = quatloosMint.getIssuer();
  // returns true
  const sameIssuer = quatloosIssuer === quatloosMintIssuer;
  // #endregion

  t.truthy(sameIssuer);

  // #region isMyIssuer
  const isIssuer = quatloosBrand.isMyIssuer(quatloosIssuer);
  // #endregion isMyIssuer

  t.truthy(isIssuer);
});

test('ertp guide issuers and mints mint.getIssuer', async t => {
  // #region mintGetIssuer
  const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit(
    'quatloos',
  );
  const quatloosMintIssuer = quatloosMint.getIssuer();
  // returns true
  const sameIssuer = quatloosIssuer === quatloosMintIssuer;
  // #endregion mintGetIssuer
  t.truthy(sameIssuer);
});

test('ertp guide issuers and mints mint.mintPayment', async t => {
  // #region mintMintPayment
  const { amountMath: quatloosAmountMath, mint: quatloosMint } = makeIssuerKit(
    'quatloos',
  );
  const quatloos1000 = quatloosAmountMath.make(1000);
  const newPayment = quatloosMint.mintPayment(quatloos1000);
  // #endregion mintMintPayment

  const issuer = quatloosMint.getIssuer();
  t.truthy(issuer.isLive(newPayment));
});
