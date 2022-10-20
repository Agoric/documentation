# Hardened JavaScript

::: tip Watch: Object-capability Programming in Secure Javascript (August 2019)

_The first 15 minutes cover much of the material below.
The last 10 minutes are Q&A._

<iframe width="560" height="315" src="https://www.youtube.com/embed/YcWXqHPui_w?list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::


## Example Secure JavaScript Code

Below is an example of a reliable, secure smart contract written in JavaScript.

<<< @/snippets/test-hardened-js.js#makeCounter

We'll unpack this a bit [below](#objects-and-the-maker-pattern), but for now please
note the use of functions and records:

 - `makeCounter` is a function.
 - Each call to `makeCounter` creates a new instance:
   - a new record with two properties, `incr` and `decr`, and
   - a new `count` variable.
 - The `incr` and `decr` properties are visible from
   outside the object.
 - The `count` variable is encapsulated; only the
   `incr` and `decr` methods can access it.
 - Each of these instances is isolated from each other.

## Separation of Duties

Suppose we want to keep track of the number of people
inside a room by having an `entryGuard` count up when
people enter the room and an `exitGuard` count down
when people exit the room.

We can give the `entryGuard` access to the `incr` function
and give the `exitGuard` access to the `decr` function.

<<< @/snippets/test-hardened-js.js#entryExit

The result is that the `entryGuard` can _only_ count up
and the `exitGuard` can _only_ count down.

::: tip Eventual send syntax
The `entryGuard ! use(counter.incr);` code in the video
uses a proposed syntax for [eventual send](./eventual-send.md),
which we will get to soon.
:::

## Object Capabilities (ocaps)

The separation of duties illustrates the core idea
of _object capabilities_: an object reference familiar
from object programming _is_ a permission.

In this figure, Alice says: `bob.greet(carol)`
![alice calls bob.greet(carol)](../assets/Introduction.svg)

If object Bob has no reference to object Carol,
then Bob cannot invoke Carol; Bob can't
provoke whatever behavior Carol would have.

If Alice has a reference to Bob and invokes Bob,
passing Carol as an argument, then Alice has both
used her permission to invoke Bob _and_ given Bob
permission to invoke Carol.

We refer to these object references as _object capabilities_ or _ocaps_.

## The Principle of Least Authority (POLA)

Ocaps give us a natural way to express the
[principle of least authority](https://en.wikipedia.org/wiki/Principle_of_least_privilege), where each object
is only given the permission it needs to do its legitimate job,
e.g., only giving the `entryGuard` the ability to increment the counter.

This limits the damage that can happen if there is an exploitable bug.

::: tip Watch: Navigating the Attack Surface
to achieve a *multiplicative* reduction in risk. _15 min_<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/wW9-KuezPp8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

## Tool Support: eslint config

::: tip eslint configuration for Jessie
The examples in this section are written using _Jessie_, our
recommended style for writing JavaScript smart contracts.
This `eslint` configuration provides tool support.
:::

1. If working from an empty directory, a package.json file must first be created by running `yarn init` or `yarn init -y`.
2. From there, we can install eslint into our project along with the jessie.js eslint-plugin by running `yarn add eslint @jessie.js/eslint-plugin`.
3. The final step is to set up our project's eslint configuration inside of the package.json file by adding the following code block.

```json
"eslintConfig" : {
  "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 6
  },
  "extends": [
    "plugin:@jessie.js/recommended"
  ]
}
```

Now the contents of the package.json file should look similiar to the snippet below.

```json
{
  "name": "eslint-config-test",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "type": "module",
  "devDependencies": {
    "@jessie.js/eslint-plugin": "^0.1.3",
    "eslint": "^8.6.0"
  },
  "eslintConfig": {
    "parserOptions": { "sourceType": "module", "ecmaVersion": 6 },
    "extends": ["plugin:@jessie.js/recommended"]
  }
}
```

### Linting jessie.js Code

1. Put `// @jessie-check` at the beginning of your `.js` source file.
2. Run `yarn eslint --fix path/to/your-source.js`
3. If eslint finds issues with the code, follow the linter's advice to edit your file, and then repeat the step above.

The details of Jessie have evolved with experience. As a result, here
we use `(count += 1)` whereas the video shows `{ return count++; }`.

## Objects and the _maker_ Pattern

Let's unpack the `makeCounter` example a bit.

JavaScript is somewhat novel in that objects need not belong to any
class; they can just stand on their own:

<<< @/snippets/test-hardened-js.js#singleton

We can make a new such object each time a function is called
using the _maker pattern_:

<<< @/snippets/test-hardened-js.js#maker

::: tip Use lexically scoped variables rather than properties of `this`.
The style above avoids boilerplate such as `this.x = x; this.y = y`.
:::

::: tip Use arrow functions
We recommend [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
syntax rather than `function makePoint(x, y) { ... }` declarations
for conciseness and to avoid `this`.
:::

## Defensive Objects with harden()

By default, anyone can clobber the properties of
our objects so that they fail to conform to the expected API:

<<< @/snippets/test-hardened-js.js#clobber

Worse yet is to clobber a property so that it misbehaves but
covers its tracks so that we don't notice:

<<< @/snippets/test-hardened-js.js#exploit

Our goal is **defensive correctness**: a program is _defensively correct_ if it remains correct despite arbitrary behavior on the part of its clients. _For further discussion, see [Concurrency Among Strangers](http://erights.org/talks/promises/paper/tgc05.pdf) and other [Agoric papers on Robust Composition](https://papers.agoric.com/papers/#robust-composition)_.

To prevent tampering, use the [harden](https://github.com/endojs/endo/blob/HEAD/packages/ses/README.md#harden) function, which is a deep form of [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

<<< @/snippets/test-hardened-js.js#defensiveMaker

Any attempt to modify the properties of a hardened object throws:

<<< @/snippets/test-hardened-js.js#thwarted

`harden()` should be called on all objects that will be transferred
across a trust boundary. It's important to `harden()` an object before exposing the object by returning it or passing it to some other function.

::: tip harden(), classes, and details
Note that hardening a class instance also hardens the class.
For more details, see [harden API in the `ses` package](https://github.com/endojs/endo/blob/HEAD/packages/ses/README.md#harden)
:::
## Objects with State

Now let's review the `makeCounter` example:

<<< @/snippets/test-hardened-js.js#counterAnimation

Each call to `makeCounter` creates a new encapsulated `count` variable
along with `incr` and `decr` functions. The `incr` and `decr` functions
access the `count` variable from their lexical scope as usual
in [JavaScript closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

To see how this works in detail, you may want to step through this
[visualization of the code](https://pythontutor.com/live.html#code=const%20makeCounter%20%3D%20%28%29%20%3D%3E%20%7B%0A%20%20let%20count%20%3D%200%3B%0A%20%20const%20it%20%3D%20%7B%0A%20%20%20%20incr%3A%20%28%29%20%3D%3E%20%28count%20%2B%3D%201%29,%0A%20%20%20%20decr%3A%20%28%29%20%3D%3E%20%28count%20-%3D%201%29,%0A%20%20%7D%3B%0A%20%20return%20Object.freeze%28it%29%3B%0A%7D%3B%0A%0Aconst%20c1%20%3D%20makeCounter%28%29%3B%0A%0Aconst%20c2%20%3D%20makeCounter%28%29%3B%0Aconsole.log%28c2.incr%28%29%29%3B%0Aconsole.log%28%5Bc1.incr%28%29,%20c2.incr%28%29%5D%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=):

[![makeCounter code animation](../assets/counter-animation.png)](https://pythontutor.com/live.html#code=const%20makeCounter%20%3D%20%28%29%20%3D%3E%20%7B%0A%20%20let%20count%20%3D%200%3B%0A%20%20const%20it%20%3D%20%7B%0A%20%20%20%20incr%3A%20%28%29%20%3D%3E%20%28count%20%2B%3D%201%29,%0A%20%20%20%20decr%3A%20%28%29%20%3D%3E%20%28count%20-%3D%201%29,%0A%20%20%7D%3B%0A%20%20return%20Object.freeze%28it%29%3B%0A%7D%3B%0A%0Aconst%20c1%20%3D%20makeCounter%28%29%3B%0A%0Aconst%20c2%20%3D%20makeCounter%28%29%3B%0Aconsole.log%28c2.incr%28%29%29%3B%0Aconsole.log%28%5Bc1.incr%28%29,%20c2.incr%28%29%5D%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=)

## Hardening JavaScript: Strict Mode

The first step to hardening JavaScript is understanding that Hardened JavaScript
is always in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

[![Subsetting JavaScript](https://raw.githubusercontent.com/endojs/Jessie/HEAD/docs/jessie.png)](https://github.com/endojs/Jessie#subsetting-ecmascript)

One way that you would notice this is if you
try to assign a value to a frozen property: this will throw a `TypeError`
rather than silently failing.

Operating in strict mode yields the important benefits of complete encapsulation
and reliable static scoping.

## Hardening JavaScript: Frozen Built-ins

One form of authority that is too widely available in
ordinary JavaScript is the ability to redefine built-ins
(shown above as "mutable primordials").
Consider this `changePassword` function:

<<< @/snippets/test-no-ses.js#changePassword

In ordinary JavaScript we run the risk of stolen passwords because someone might have redefined
the `includes` method on `Array` objects:

<<< @/snippets/test-no-ses.js#exfiltrate

In Hardened JavaScript, the `Object.assign` fails because `Array.prototype` and all other
[standard, built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
are immutable.

::: tip Compatibility issues with `ses` / Hardened JavaScript
Certain libraries that make tweaks to the standard built-ins
may fail in Hardened JavaScript.

The [SES wiki](https://github.com/endojs/endo/wiki) tracks compatibility
reports for NPM packages, including potential workarounds.
:::
## Hardening JavaScript: Limiting Globals with Compartments

A globally available function such as `fetch` means that every object,
including a simple string manipulation function, can access the network.
In order to eliminate this sort of excess authority, _Object-capabity discipline_
calls for limiting globals to immutable data and deterministic functions
(eliminating "ambient authority" in the diagram above).

Hardened JavaScript includes a `Compartment` API for enforcing OCap discipline.
Only the [standard, built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
such as `Object`, `Array`, and `Promise` are globally available by default
(with an option for carefully controlled exceptions such as `console.log`).
With the default `Compartment` options, the non-deterministic `Math.random`
is not available and `Date.now()` always returns `NaN`.

Almost all existing JS code was written to run under Node.js or inside a browser,
so it's easy to conflate the environment features with JavaScript itself. For
example, you may be surprised that `Buffer` and `require` are Node.js
additions and not part of JavaScript.

The conventional globals defined by browser or Node.js hosts are
not available by default in a `Compartment`, whether authority-bearing
or not:

 - authority-bearing:
   - `window`, `document`, `process`, `console`
   - `setImmediate`, `clearImmediate`, `setTimeout`
     - but `Promise` is available, so sometimes
       `Promise.resolve().then(_ => fn())` suffices
     - see also [Timer Service](/reference/repl/timerServices.md)
   - `require` (Use `import` module syntax instead.)
   - `localStorage`
      - [SwingSet](/platform/#swingset) orthogonal persistence means state lives indefinitely in ordinary variables and data structures and need not be explicitly written to storage.
      - For high cardinality data, see [the `@agoric/store` package](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/store).
   - `global` (Use `globalThis` instead.)
 - authority-free but host-defined:
   - `Buffer`
   - `URL` and `URLSearchParams`
   - `TextEncoder`, `TextDecoder`
   - `WebAssembly`

In compartments used to load Agoric smart contracts,
`globalThis` is hardened, following OCap discipline.
These compartments have `console` and `assert` globals from [the `ses` package](https://github.com/endojs/endo/blob/HEAD/packages/ses/README.md).
Don't rely on `console.log` for printing, though; it is for debugging
only, and in a blockchain consensus context, it may do nothing at all.

You can create a new `Compartment` object. When you do, you can
decide whether to enforce OCap discipline by calling
`harden(compartment.globalThis)` or not. If not, beware that
all objects in the compartment have authority to communicate with
all other objects via properties of `globalThis`.

## Types: Advisory

[Type checking JavaScript files with TypeScript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
can help prevent certain classes of coding errors. We recommend this style rather than
writing in TypeScript syntax to remind ourselves that the type annotations really
are only for lint tools and do not have any effect at runtime:

```js
// @ts-check

/** @param {number} init */
const makeCounter = init => {
  let value = init;
  return {
    incr: () => {
      value += 1;
      return value;
    },
  };
};
```

If we're not careful, our clients can cause us to misbehave:

```
> const evil = makeCounter('poison')
> evil2.incr()
'poison1'
```

or worse:

```
> const evil2 = makeCounter({ valueOf: () => { console.log('launch the missiles!'); return 1; } });
> evil2.incr()
launch the missiles!
2
```

## Types: Defensive

To be defensively correct, we need runtime validation for any inputs that cross trust boundaries:

```js
import Nat from `@endo/nat`;

/** @param {number | bignum} init */
const makeCounter = init => {
  let value = Nat(init);
  return harden({
    increment: () => {
      value += 1n;
      return value;
    },
  });
};
```

```
> makeCounter('poison')
Uncaught TypeError: poison is a string but must be a bigint or a number
```

## From OCaps to Electronic Rights: Mint and Purse

The Hardened JavaScript techniques above are powerful enough
to express the core of ERTP and its security properties in just 30 lines.
Careful study of this 8 minute presentation segment provides
a firm foundation for writing smart contracts with Zoe.

::: tip Watch: The Mint Pattern
8 minutes [starting at 25:00](https://youtube.com/watch?v=iyuo0ymTt4g&t=1525&list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG),
in [Higher-order Smart Contracts across Chains](https://www.youtube.com/watch?v=iyuo0ymTt4g&list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG)

[![image](https://user-images.githubusercontent.com/150986/129462162-4599c0f4-8519-4a04-a707-88ef6e6044d7.png)
](https://youtube.com/watch?v=iyuo0ymTt4g&t=1525&list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG)
:::


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
