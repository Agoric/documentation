# Intro to Hardened JavaScript

_Status: WIP_.

 - JavaScript is popular
 - JavaScript has some messy parts
 - Stick to Hardened JavaScript

Overview:
 - Objects
 - Defensive Correctness
 - **Electronic Rights**
 - Data Structures
 - Reference: JSON Data, Justin expressions, Jessie programs

## Getting Started: Tools

TL;DR: Here are the steps to play whack-a-mole with the Jessie linter:

1. If not already configured, run `yarn add eslint @jessie.js/eslint-plugin`
2. If not already configured, add the following to your `package.json`:

```json
  "eslintConfig": {
    "extends": [
      "@jessie.js"
    ]
  }
```

3. Put `// @jessie-check` at the beginning of your `.js` source file.
4. Run `yarn eslint --fix path/to/your-source.js`
5. Follow the linter's advice to edit your file, then go back to step 4.

## Simple Objects

Singleton, stateless:

```js
const origin = {
    getX: () => 0,
    getY: () => 0,
};
```

```console
> origin.getY()
0
```


## Object makers

```js
const makeCounter = init => {
  let value = init;
  return {
    increment: () => {
      value += 1;
      return value;
    },
    makeOffsetCounter: delta => makeCounter(value + delta),
  };
};
```

```console
$ node
Welcome to Node.js v14.16.0.
Type ".help" for more information
> const c1 = makeCounter(1);
> c1.increment();
2
> const c2 = c1.makeOffsetCounter(10);
> c1.increment();
3
> c2.increment();
13
> [c1.increment(), c2.increment()];
[ 4, 14 ]
```

 - An object is a record of functions that close over shared state.
 - The `this` keyword is not part of Jessie, so neither are constructors.
 - A `makeCounter` function takes the place of the `class Counter` constructor syntax.


_TODO: `decrement()`, facets_

## WARNING: Pervasive Mutability

```console
> c1.increment = () => { console.log('launch the missiles!'); }
[Function (anonymous)]
> c1.increment()
launch the missiles!
```


## Defensive objects with `harden()`

```js
const makeCounter = init => {
  let value = init;
  return harden({
    increment: () => {
      value += 1;
      return value;
    },
    makeOffsetCounter: delta => makeCounter(value + delta),
  });
};
```

```
> const c3 = Object.freeze(c1.makeOffsetCounter(10));
undefined
> c3.increment = () => { console.log('launch the missiles!'); }
TypeError: Cannot assign to read only property 'increment' of object '#<Object>'
> c3.increment()
15
```

 - _caveat_: exception is thrown in strict mode. REPL might not throw.
 - regardless, the object defended itself
 - Jessie pre-defines `harden` (_as does Agoric smart contract framework_)
   - see the `ses` [hardened Javascript package](https://github.com/endojs/endo/tree/master/packages/ses#harden) otherwise


## Types: advisory

```js
// @ts-check

/** @param {number} init */
const makeCounter = init => {
  let value = init;
  return {
    increment: () => {
      value += 1;
      return value;
    },
    /** @param {number} delta */
    makeOffsetCounter: delta => makeCounter(value + delta),
  };
};
```

 - [TypeScript: Documentation \- Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)


## Types: advisory (cont.)

If we're not careful, our clients can cause us to mis-behave:

```
> const evil = makeCounter('poison')
> evil2.increment()
'poison1'
```

or worse:

```
> const evil2 = makeCounter({ valueOf: () => { console.log('launch the missiles!'); return 1; } });
> evil2.increment()
launch the missiles!
2
```

## Types: defensive

```js
/** @param {number | bignum} init */
const makeCounter = init => {
  let value = Nat(init);
  return harden({
    increment: () => {
      value += 1n;
      return value;
    },
    /** @param {number | bignum} delta */
    makeOffsetCounter: delta => makeCounter(value + Nat(delta)),
  });
};
```

```
> makeCounter('poison')
Uncaught TypeError: poison is a string but must be a bigint or a number
```

 - **defensive correctness**: a program is _defensively correct_ if it remains correct despite arbitrary behavior on the part of its clients.
   - [Miller, Tribble, Shapiro 2005](http://erights.org/talks/promises/paper/tgc05.pdf)

## Details: Stay Tuned

 - Ordinary programming in JavaScript follows in a later section
 - Much overlap with Java, Python, C, etc.

_If you are **not** familiar with programming in some language, study details a bit and then come back here._

## Electronic Rights: Mint and Purse

**Watch**: [the mint pattern](https://youtu.be/iyuo0ymTt4g?t=1525),
an 8 minute segment starting at 25:00 in

 - [Agoric \+ Protocol Labs // Higher\-order Smart Contracts across Chains \- Mark Miller \- YouTube](https://www.youtube.com/watch?v=iyuo0ymTt4g).

[![image](https://user-images.githubusercontent.com/150986/129462162-4599c0f4-8519-4a04-a707-88ef6e6044d7.png)
](https://youtu.be/iyuo0ymTt4g?t=1525)


```js
const makeMint = () => {
  const ledger = makeWeakMap();

  const issuer = harden({
    makeEmptyPurse: () => mint.makePurse(0),
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
```

## Agoric JavaScript APIs

 - [ERTP Introduction](https://agoric.com/documentation/getting-started/ertp-introduction.html#creating-assets-with-ertp)
 - [Introduction to Zoe](https://agoric.com/documentation/getting-started/intro-zoe.html#what-is-zoe)
 - [Remote object communication with E\(\)](https://agoric.com/documentation/guides/js-programming/eventual-send.html)

## Appendix / Colophon: Fodder / Brainstorm

 - structure from [E in a Walnut](http://www.skyhunter.com/marcs/ewalnut.html#SEC8)
   - as adapted in [Practical Security: The Mafia game — Monte 0\.1 documentation](https://monte.readthedocs.io/en/latest/ordinary-programming.html)
 - JSON / Justin / Jessie as in [Jessica](https://github.com/agoric-labs/jessica)
 - Build slides with [Remark](https://remarkjs.com/#1)
   - example: [kumc\-bmi/naaccr\-tumor\-data](https://github.com/kumc-bmi/naaccr-tumor-data)
