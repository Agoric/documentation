
## DIY Data Structures

Using only the object patterns we have seen so far:

```js
const makeFlexList = () => {
  let head;
  let tail;
  const list = harden({
    push: item => {
      const cell = { item, next: undefined, previous: tail };
      tail = cell;
      if (head === undefined) {
        head = cell;
      }
    },
    at: target => {
      if (!Number.isInteger(target) || target < 0) {
        throw RangeError(target);
      }
      const position = 0;
      for (let cell = head; cell !== undefined; cell = cell.next) {
        if (position === target) {
          return cell.item;
        }
        position += 1;
      }
      return undefined;
    },
    forEach: f => {
      let position = 0;
      for (let cell = head; cell !== undefined; cell = cell.next) {
        f(cell.item, position, list);
        position += 1;
      }
      return false;
    },
  });
  return list;
};
```

_TODO: harden the cells? They don't escape, so technically we don't need to._

## Built-in Data Structures: Array

  - syntax: `[...]` expressions
  - built-in `Array` objects
    - methods: `indexOf`, `reverse`, `sort`, ...
    - full API: [Array in MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## `Array` and `harden`

**WARNING: mutable by default**:

```js
const makeGame = (...players) => {
  // TODO: harden(players)
  return harden({
    playing: () => players,
  });
};
```

Game creator:
```
> const g1 = makeGame('alice', 'bob');
```

Malicious client:
```
> const who = g1.playing();
> who.push('mallory'); g1.playing()
[ 'alice', 'bob', 'mallory' ]
```

So we `harden(players)` before we `return ...`:

```
> who.push('mallory');
Uncaught TypeError: Cannot add property 2, object is not extensible
```

## Built-in Data Structures: Map

`m.set(key, value)`, `m.get(key)`, `m.has(key)`:

```
> const m1 = makeMap([['alice', 1], ['bob', 2], ['charlie', 3]])
Map(3) { 'alice' => 1, 'bob' => 2, 'charlie' => 3 }
> m1.has('bob')
true
> m1.get('charlie')
3
> m1.set('dave', 'pickles')
Map(4) {
  'alice' => 1,
  'bob' => 2,
  'charlie' => 3,
  'dave' => 'pickles'
}
```

Full API: [Map \- JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

**NOTE:** `makeMap()` is a Jessie library function
because `new Map()` is not included in Jessie.

## Built-in Data Structures: Set

`s.delete(key)`, `s.size`: (_also on `Map`_)

```
> const s1 = makeSet([1, 2, 3]);
Set(3) { 1, 2, 3 }
> s1.has(2)
true
> s1.delete(2)
true
> s1.size
2
> [...s1]
[ 1, 3 ]
```

Full API: [Set \- JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

## Reference: JSON for Data

JSON is a ubiquitous language for structured data:

 - Literals:
   - `1, 2, 3, true, false, "abc", null`
   - `"emoji: \uD83D\uDC36"`, `"🐶"`
 - Array: `[1, true, "three"]`
 - Record (aka Object): `{ "size": 5, "color": "blue" }`


## Reference: Justin for Safe Expressions

 - more flexible syntax:
   - string delimiters: `"abc"` or  `'abc'`
   - trailing commas: `{ size: 1, }`, `[1, 2, 3,]`
   - un-quoted property names: `{ size: 1, color: "blue" }`
   - short-hand properties: `{ size }`
   - comments:
      - single line: `// ...`
      - multi-line: `/* ... */`
  - property lookup: `{ size: 1 }.size`
  - array index: `[1, 2, 3][2]`


## Justin: both bottom values (**:-/**)

  - `null`
  - `undefined`

## Justin: function and variable use

In an environment with pre-declared variables:

  - variable use: `x`
    - excludes reserved words / keywords: `if`, `else`, ...
  - function call: `sqrt(2)`, `inventory.total()`
  - spread: `sum(1, 2, ...rest)`, `{ color: 'red', ...options }`

## Justin: Quasi-Literals

  - interpolation: `the answer is: ${a}`
  - tagged templates: ``html`<a href=${url}>${linkText}</a>` ``

## Justin: operators

   - add, subtract, etc.: `+`, `-`, `*`, `/`, `%`
   - parens `(x + 4) * y`
   - comparison: `===`, `!==`, `<`, `>`, `<=`, `>=`
       - **no `==`!**
   - relational: `&&`, `||`
   - bitwise: `&`, `|`, `^`
   - shift: `<<`, `>>`
     - unsigned: `>>>`
   - runtime type check: `typeof thing === "string"`
   - conditional (ternary operator): ``a > b ? a : b``
   - void operator: `void ignoreMyResult()`

## Jessie: operators

  - pre-increment, decrement: `++x`, `--x`
  - post-increment, decrement: `x++`, `x--`

## Reference: Jessie for simple, universal safe mobile code

statements, declarations:

 - end with `;`
   - _TODO: tooling: Agoric lint configuration, based on Airbnb; @jessie-check?_
 - arrow functions:
   - simple: `const double = x => x * 2;`
   - compound:

```js
        const f = (a, b) => {
          g(a);
          h(b);
          return a + b;
        };
```

 - bindings: `const c = a + b;`, `let x = 1;`
 - assignment: `x = x + 2`;
   - combined: `x += 2`;
 - `if (cond) { /* then block */ } else { /* else block */ }`
 - `switch`:
 
```js
       switch (value) {
         case 'a':
         case 'b': {
           /* 'a' and 'b' block */
           break;
         }
         default: {
           /* default block */
         }
       }
```// TODO: delete this comment to close the js fence
 - `while (condition) { /* body */ }`
 - `break`, `continue`
 - `try` / `catch` / `finally`
 - `for (const x of items) { /* body */ }`
   - **no `for (const x in items)`!** Use `for (const x of Object.keys(items))` instead

_TODO: accessor methods?_


## Destructuring Assignments, Patterns, and Shorthand Properties

```js
const s = order.size;     // better as... 
const { size: s } = order;

const size = order.size; // better as...
const { size } = order;

const s1 = sizes[0];
const s2 = sizes[1];
const rest = sizes.slice(2);  // better as...

const [s1, s2, ...rest] = sizes;

// combine them and go nuts
const [{ size: s1, color, ...details }, { size: s2 }] = orders;

```

## Parameters: destructuring, optional, defaults

```js
const serviceOrder = ({ size, shape }) => {
  ...
};
```

```js
const f = (a, opt) => {
  if (typeof opt !== 'undefined') {
    ...
  }
};
```

```js
const f = (a, b = 0) => {
}
```

_TODO: examples that concretely motivate these features_

## Modules

 - import:
   - `import harden from '@agoric/harden';`
   - `import { Nat } from '@agoric/nat';`
   - `import { Nat as N } from '@agoric/nat';`
   - `import * as fs from 'fs';`
 - export:
   - `export const f = ...`;
   - `export default f;`
   - `export { f, g, h};`
