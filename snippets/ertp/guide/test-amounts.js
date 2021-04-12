import { test } from '@agoric/zoe/tools/prepare-test-env-ava';

import { amountMath, makeIssuerKit } from '@agoric/ertp';

test('ertp guide amounts', async t => {
  const quatloosKit = makeIssuerKit('quatloos');
  const { brand: quatloosBrand, issuer: quatloosIssuer } = quatloosKit;
  // #region manualMake
  const newAmount = { brand: quatloosBrand, value: 5n };
  // #endregion manualMake
  t.deepEqual(newAmount, amountMath.make(quatloosBrand, 5n));

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
  
  // #region getDisplayInfo
  const myDisplayInfo = brand.getDisplayInfo();
  // #endregion getDisplayInfo

  const brandToPurse = new Map();
  brandToPurse.set(brand, issuer.makeEmptyPurse());
  const quatloos50 = amountMath.make(quatloosBrand, 50n);
  const payment = quatloosKit.mint.mintPayment(quatloos50);
  // #region depositSomewhere
  const allegedBrand = payment.getAllegedBrand();
  const probablyAppropriatePurse = brandToPurse.get(allegedBrand);
  const depositAmount = probablyAppropriatePurse.deposit(payment);
  // #endregion depositSomewhere
  t.deepEqual(depositAmount, quatloos50);

  // #region getValue
  const quatloos123 = amountMath.make(quatloosBrand, 123n);
  // returns 123
  const value = amountMath.getValue(quatloosBrand, quatloos123);
  // #endregion getValue

  t.is(value, 123n);

  // #region make
  const quatloos837 = amountMath.make(quatloosBrand, 837n);
  // #endregion make

  t.deepEqual(quatloos837, { brand: quatloosBrand, value: 837n });
});
