import '@agoric/zoe/tools/prepare-test-env';
import test from 'ava';

import { makeIssuerKit } from '@agoric/ertp';

test('ertp guide amounts', async t => {
  const quatloosKit = makeIssuerKit('quatloos');
  const {
    brand: quatloosBrand,
    amountMath: quatloosAmountMath,
    issuer: quatloosIssuer,
  } = quatloosKit;
  // #region manualMake
  const newAmount = { brand: quatloosBrand, value: 5n };
  // #endregion manualMake
  t.deepEqual(newAmount, quatloosAmountMath.make(5));

  const { brand, issuer } = quatloosKit;
  // #region isMyIssuer
  const isIssuer = brand.isMyIssuer(issuer);
  // #endregion isMyIssuer
  t.truthy(isIssuer);

  // #region getAllegedName
  const name = brand.getAllegedName();
  // #endregion getAllegedName
  t.is(name, 'quatloos');

  // #region getBrand
  const myBrand = quatloosIssuer.getBrand();
  // myBrand === quatloosBrand
  // #endregion getBrand
  t.is(myBrand, quatloosBrand);

  const brandToPurse = new Map();
  brandToPurse.set(brand, issuer.makeEmptyPurse());
  const quatloos50 = quatloosAmountMath.make(50);
  const payment = quatloosKit.mint.mintPayment(quatloos50);
  // #region depositSomewhere
  const allegedBrand = payment.getAllegedBrand();
  const probablyAppropriatePurse = brandToPurse.get(allegedBrand);
  const depositAmount = probablyAppropriatePurse.deposit(payment);
  // #endregion depositSomewhere
  t.deepEqual(depositAmount, quatloos50);

  // #region amountMathGetBrand
  const newBrand = quatloosAmountMath.getBrand();
  // #endregion amountMathGetBrand
  t.is(newBrand, quatloosBrand);

  // #region getValue
  const quatloos123 = quatloosAmountMath.make(123);
  // returns 123
  const value = quatloosAmountMath.getValue(quatloos123);
  // #endregion getValue

  t.is(value, 123n);

  // #region make
  const quatloos837 = quatloosAmountMath.make(837);
  // #endregion make

  t.deepEqual(quatloos837, { brand: quatloosBrand, value: 837n });
});
