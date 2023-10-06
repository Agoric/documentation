// @jessie-check
/* global Compartment */
import { test } from './prepare-test-env-ava.js';

test('Counter Example', t => {
  const assert = cond => t.true(cond);

  // #region makeCounter
  const makeCounter = () => {
    let count = 0;
    return harden({
      incr: () => (count += 1),
      decr: () => (count -= 1),
    });
  };

  const counter = makeCounter();
  counter.incr();
  const n = counter.incr();
  assert(n === 2);
  // #endregion makeCounter

  const entryGuard = { use: _f => {} };
  const exitGuard = { use: _f => {} };

  // #region entryExit
  entryGuard.use(counter.incr);
  exitGuard.use(counter.decr);
  // #endregion entryExit
});

test('counter animation', t => {
  // #region counterAnimation
  const makeCounter = () => {
    let count = 0;
    return harden({
      incr: () => (count += 1),
      // ...
    });
  };
  // #endregion counterAnimation

  const c1 = makeCounter();

  const c2 = makeCounter();
  t.is(c2.incr(), 1);
  t.deepEqual([c1.incr(), c2.incr()], [1, 2]);
});

test('assign to frozen property fails', t => {
  const x = harden({ y: 1 });
  t.throws(
    () => {
      x.y = 2;
    },
    { name: 'TypeError' },
  );
});

test('Date.now() is not available or returns NaN', t => {
  const c1 = new Compartment();
  try {
    t.is(c1.evaluate(`Date.now()`), NaN, 'legacy Date.now() is NaN');
  } catch (e) {
    // New API: throws instead of NaN.
    t.throws(() => c1.evaluate(`Date.now()`), { message: /^secure mode\b/ });
    t.throws(() => c1.evaluate(`new Date()`), { message: /^secure mode\b/ });
  }
});

test('Math.random is not available', t => {
  const c1 = new Compartment();
  t.throws(() => c1.evaluate(`Math.random()`));
});

test('stateless object', t => {
  const assert = cond => t.true(cond);

  // #region data
  const item = { size: 2, color: 'blue' };
  const point = { x: 1, y: 2 };
  assert(point.x + 1 === item.size);
  // #endregion data

  // #region singleton
  const origin = {
    getX: () => 0,
    getY: () => 0,
    distance: other => Math.sqrt(other.getX() ** 2 + other.getY() ** 2),
  };
  const x0 = origin.getX();
  assert(x0 === 0);
  // #endregion singleton

  // #region maker
  const makePoint = (x, y) => {
    return {
      getX: () => x,
      getY: () => y,
    };
  };
  const p11 = makePoint(1, 1);
  const d = origin.distance(p11);
  assert(Math.abs(d - 1.414) < 0.001);
  // #endregion maker

  // #region clobber
  p11.getX = () => 'I am not a number!';
  const d2 = origin.distance(p11);
  assert(Number.isNaN(d2));
  // #endregion clobber

  const missiles = { launch: () => null };

  p11.getX = () => 1;
  // #region exploit
  p11.getY = () => {
    missiles.launch(); // !!!
    return 1;
  };
  const d3 = origin.distance(p11);
  assert(Math.abs(d3 - 1.414) < 0.001);
  // #endregion exploit
});

test('hardened point thwarts attacker', t => {
  // #region defensiveMaker
  const makePoint = (x, y) => {
    return harden({
      getX: () => x,
      getY: () => y,
    });
  };
  // #endregion defensiveMaker
  t.throws(() => {
    // #region thwarted
    const p11 = makePoint(1, 1);
    p11.getX = () => 1; // throws
    // #endregion thwarted
  });
});

test('cannot redefine includes method on Array', t => {
  const fail = msg => {
    throw Error(msg);
  };
  const fetch = () => fail('not allowed');

  t.throws(
    () =>
      Object.assign(Array.prototype, {
        includes: specimen => {
          fetch('/pwned-db', {
            method: 'POST',
            body: JSON.stringify(specimen),
          });
          return false;
        },
      }),
    { message: /read only property/ },
  );
});

// #region makeCounter1
const makeCounter1 = () => {
  let value = 0;
  return {
    increment: () => {
      value += 1;
      return value;
    },
    decrement: () => {
      value -= 1;
      return value;
    },
  };
};
// #endregion makeCounter1

test('count people coming and going', t => {
  // #region counter1
  const people = makeCounter1();
  const entryGuard = people.increment;
  const exitGuard = people.decrement;

  t.is(entryGuard(), 1);
  t.is(entryGuard(), 2);
  t.is(exitGuard(), 1);
  // #endregion counter1
});

// #region makeCounter
const makeCounter = init => {
  let value = init;
  return harden({
    increment: () => {
      value += 1;
      return value;
    },
    decrement: () => {
      value -= 1;
      return value;
    },
  });
};
// #endregion makeCounter

test('basic counter', t => {
  const c1 = makeCounter(1);
  t.is(c1.increment(), 2);

  t.is(c1.increment(), 3);
});

const makeWeakMap = () => new WeakMap();

// region: makeMint0
const makeMint1 = () => {
  const ledger = makeWeakMap();

  const issuer = {
    // eslint-disable-next-line no-use-before-define
    makeEmptyPurse: () => mint.makePurse(0n),
  };

  const mint = {
    makePurse: initialBalance => {
      const purse = harden({
        getIssuer: () => issuer,
        getBalance: () => ledger.get(purse),

        deposit: (amount, src) => {
          ledger.set(src, ledger.get(src) - amount);
          ledger.set(purse, ledger.get(purse) + amount);
        },
        withdraw: amount => {
          const newPurse = issuer.makeEmptyPurse();
          newPurse.deposit(amount, purse);
          return newPurse;
        },
      });
      ledger.set(purse, initialBalance);
      return purse;
    },
  };

  return mint;
};
// #region makeMint0

test('DRAFT: alice sends 10 to bob', t => {
  const dollarMint = makeMint1();
  const alicePurse = dollarMint.makePurse(100n);
  const bobPurse = alicePurse.getIssuer().makeEmptyPurse();

  const p1 = alicePurse.withdraw(10n);
  bobPurse.deposit(10n, p1);

  t.is(alicePurse.getBalance(), 90n);
  t.is(bobPurse.getBalance(), 10n);
});

const fail = why => {
  throw TypeError(why);
};
const Nat = x => (typeof x === 'bigint' && x >= 0n ? x : fail(`${x} not Nat`));

// #region makeMint
const makeMint = () => {
  const ledger = makeWeakMap();

  const issuer = harden({
    // eslint-disable-next-line no-use-before-define
    makeEmptyPurse: () => mint.makePurse(0n),
  });

  const mint = harden({
    makePurse: initialBalance => {
      const purse = harden({
        getIssuer: () => issuer,
        getBalance: () => ledger.get(purse),

        deposit: (amount, src) => {
          Nat(ledger.get(purse) + Nat(amount));
          ledger.set(src, Nat(ledger.get(src) - amount));
          ledger.set(purse, ledger.get(purse) + amount);
        },
        withdraw: amount => {
          const newPurse = issuer.makeEmptyPurse();
          newPurse.deposit(amount, purse);
          return newPurse;
        },
      });
      ledger.set(purse, initialBalance);
      return purse;
    },
  });

  return mint;
};
// #endregion makeMint

test('alice sends 10 to bob', t => {
  const dollarMint = makeMint();
  const alicePurse = dollarMint.makePurse(100n);
  const bobPurse = alicePurse.getIssuer().makeEmptyPurse();

  const p1 = alicePurse.withdraw(10n);
  bobPurse.deposit(10n, p1);

  t.is(alicePurse.getBalance(), 90n);
  t.is(bobPurse.getBalance(), 10n);
});
