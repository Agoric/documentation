import '@agoric/install-ses';
import test from 'ava';

import { makeIssuerKit, makeLocalAmountMath, MathKind } from '@agoric/ertp';
import { setupZCFTest } from '../../tools/setupZcfTest';

test('ertp guide amountMath allMathKinds', async t => {
  // #region allMathKinds
  makeIssuerKit('Quatloos'); // Defaults to MathKind.NAT
  makeIssuerKit('Quatloos', MathKind.STRING_SET);
  makeIssuerKit('Quatloos', MathKind.SET);
  // #endregion allMathKinds
  t.truthy(true);
});

test('ertp guide amountMath localAmountMath', async t => {
  const { issuer: quatloosIssuer } = makeIssuerKit('');
  // #region localAmountMath
  const quatloosLocalAmountMath = await makeLocalAmountMath(quatloosIssuer);
  // #endregion localAmountMath
  t.is(quatloosLocalAmountMath.make(2).value, 2);
});

test('ertp guide amountMath methods getBrand', async t => {
  const quatloosKit = makeIssuerKit('Quatloos');
  const { amountMath: quatloosAmountMath } = quatloosKit;

  // #region getBrand
  const quatloosBrand = quatloosAmountMath.getBrand();
  // #endregion getBrand
  t.is(quatloosBrand, quatloosKit.brand);
});

test('ertp guide amountMath methods getValue', async t => {
  // #region getValue
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const quatloos123 = quatloosAmountMath.make(123);
  // returns 123
  const value = quatloosAmountMath.getValue(quatloos123);
  // #endregion getValue
  t.is(value, 123);
});

test('ertp guide amountMath methods getAmountMathKind', async t => {
  // #region getAmountMathKind1
  // amountMath kind defaults to `nat`
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const kind = quatloosAmountMath.getAmountMathKind(); // returns 'nat'
  // #endregion getAmountMathKind1
  t.is(kind, 'nat');
});

test('ertp guide amountMath methods getEmpty', async t => {
  // #region getEmpty
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  // Returns an empty amount for this issuer.
  // Since this is a fungible amount it returns 0
  const empty = quatloosAmountMath.getEmpty();
  // #endregion getEmpty
  t.deepEqual(empty, quatloosAmountMath.make(0));
});

test('ertp guide amountMath methods isEmpty', async t => {
  // #region isEmpty
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const empty = quatloosAmountMath.getEmpty();
  const quatloos1 = quatloosAmountMath.make(1);
  // returns true
  quatloosAmountMath.isEmpty(empty);
  // returns false
  quatloosAmountMath.isEmpty(quatloos1);
  // #endregion isEmpty
  t.truthy(quatloosAmountMath.isEmpty(empty));
  t.falsy(quatloosAmountMath.isEmpty(quatloos1));
});

test('ertp guide amountMath methods isGTE', async t => {
  // #region isGTE
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const empty = quatloosAmountMath.getEmpty();
  const quatloos1 = quatloosAmountMath.make(1);
  // Returns true
  quatloosAmountMath.isGTE(quatloos1, empty);
  // Returns false
  quatloosAmountMath.isGTE(empty, quatloos1);
  // #endregion isGTE
  t.truthy(quatloosAmountMath.isGTE(quatloos1, empty));
  // Returns false
  t.falsy(quatloosAmountMath.isGTE(empty, quatloos1));
});

test('ertp guide amountMath methods isEqual', async t => {
  // #region isEqual
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const empty = quatloosAmountMath.getEmpty();
  const quatloos1 = quatloosAmountMath.make(1);
  const anotherQuatloos1 = quatloosAmountMath.make(1);

  // Returns true
  quatloosAmountMath.isEqual(quatloos1, anotherQuatloos1);
  // Returns false
  quatloosAmountMath.isEqual(empty, quatloos1);
  // #endregion isEqual

  t.truthy(quatloosAmountMath.isEqual(quatloos1, anotherQuatloos1));
  t.falsy(quatloosAmountMath.isEqual(empty, quatloos1));
});

test('ertp guide amountMath methods coerce', async t => {
  // #region coerce
  const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
  const quatloos50 = quatloosAmountMath.make(50);
  quatloosAmountMath.coerce(quatloos50); // equal to quatloos50
  // #endregion coerce
  t.deepEqual(quatloosAmountMath.coerce(quatloos50), quatloos50);
});

test('ertp guide amountMath methods add', async t => {
  // #region add
  const { amountMath: myItemsAmountMath } = makeIssuerKit('myItems', 'strSet');
  const listAmountA = myItemsAmountMath.make(harden(['1', '2', '4']));
  const listAmountB = myItemsAmountMath.make(harden(['3']));

  // Returns an amount containing all of ['1', '2', '4', '3']
  const combinedList = myItemsAmountMath.add(listAmountA, listAmountB);
  // #endregion add
  t.deepEqual(
    combinedList,
    myItemsAmountMath.make(harden(['1', '2', '4', '3'])),
  );
});

test('ertp guide amountMath methods subtract', async t => {
  // #region subtract
  const { amountMath: myItemsAmountMath } = makeIssuerKit('myItems', 'strSet');
  const listAmountA = myItemsAmountMath.make(harden(['1', '2', '4']));
  const listAmountB = myItemsAmountMath.make(harden(['3']));
  const listAmountC = myItemsAmountMath.make(harden(['2']));
  // Returns ['1', '4']
  const subtractedList = myItemsAmountMath.subtract(listAmountA, listAmountC);
  // Throws error
  t.throws(() => myItemsAmountMath.subtract(listAmountA, listAmountB), {
    message:
      'some of the elements in right ((an object)) were not present in left ((an object))\nSee console for error data.',
  });
  // #endregion subtract
  t.deepEqual(subtractedList, myItemsAmountMath.make(harden(['1', '4'])));
});

test('ertp guide amountMath methods make', async t => {
  // #region make
  const {
    amountMath: quatloosAmountMath,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');
  /// An `amount` with `value` = 837 and `brand` = Quatloos
  const quatloos837 = quatloosAmountMath.make(837);
  const anotherQuatloos837 = harden({ brand: quatloosBrand, value: 837 });
  t.deepEqual(quatloos837, anotherQuatloos837);
  // #endregion make
});

test('ertp guide amountMath related', async t => {
  // #region makeIssuerKit
  const { issuer, mint, brand, amountMath } = makeIssuerKit('quatloos');
  // #endregion makeIssuerKit
  t.truthy(mint);
  t.truthy(brand);
  t.is(amountMath.getBrand(), issuer.getBrand());

  const quatloosIssuer = issuer;
  const quatloosBrand = brand;

  // #region getAmountMathKind2
  const myAmountMathKind = quatloosIssuer.getAmountMathKind();
  // #endregion getAmountMathKind2
  t.is(myAmountMathKind, 'nat');

  const { zcf } = await setupZCFTest(harden({ Quatloos: quatloosIssuer }));
  // #region zcfGetAmountMath
  const quatloosAmountMath = zcf.getAmountMath(quatloosBrand);
  // #endregion zcfGetAmountMath
  t.is(quatloosAmountMath.getBrand(), quatloosBrand);
});
