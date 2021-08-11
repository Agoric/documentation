# Intro to Hardened JavaScript

_Status: WIP_.

TL;DR: Here are the steps to play whack-a-mole with the Jessie linter:

1. If not already configured, run `yarn add eslint @jessie.js/eslint-plugin`
2. If not already configured, add the following to your `package.json`:

```json
  "eslintConfig": {
    "extends": [
      "@jessie.js"
    ]
  }
```// TODO: remove this comment to complete the json fence

3. Put `// @jessie-check` at the beginning of your `.js` source file.
4. Run `yarn eslint --fix path/to/your-source.js`
5. Follow the linter's advice to edit your file, then go back to step 4.

## Preface: Fodder / Brainstorm

 - structure from [E in a Walnut](http://www.skyhunter.com/marcs/ewalnut.html#SEC8)
   - as adapted in [Practical Security: The Mafia game — Monte 0\.1 documentation](https://monte.readthedocs.io/en/latest/ordinary-programming.html)
 - JSON / Justin / Jessie as in [Jessica](https://github.com/agoric-labs/jessica)
 - Build slides with [Remark](https://remarkjs.com/#1)
   - example: [kumc\-bmi/naaccr\-tumor\-data](https://github.com/kumc-bmi/naaccr-tumor-data)

## Overview

 - JavaScript is popular
 - JavaScript has some messy parts
 - Stick to Hardened JavaScript:
   - Objects in Jessie
   - Data in JSON
   - Expressions in Justin
   - Jessie details

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


## Map, Set

_TODO: teach these using Mafia game as in Monte_

_TODO: teach `new Set()` or `makeSet()`?_

## Eventual Send

 - `const resultP = E(possiblyRemoteObject).method(args)`
 - `const result = await resultP;`
 - `const results = await Promise.all([E(o1).m1(), E(o2).m2()]);`

_TODO: async functions?_

_TODO: tildot syntax?_
