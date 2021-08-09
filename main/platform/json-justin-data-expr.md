
## JSON: Data

 - Literals:
   - `1, 2, 3, true, false, "abc", null`
   - `"emoji: \uD83D\uDC36"`, `"🐶"`
 - Array: `[1, true, "three"]`
 - Record (aka Object): `{ "size": 5, "color": "blue" }`


## Justin: Safe Expressions

 - more flexible syntax:
   - string delimters: `"abc"` or  `'abc'`
   - trailing commas: `{ size: 1, }`, `[1, 2, 3,]`
   - un-quoted properties: `{ size: 1, color: "blue" }`
   - short-hand properties: `{ size }`
  - property lookup: `{ size: 1 }.size`
  - array index: `[1, 2, 3][2]`
  - comments:
    - single line: `// ...`
    - multi-line: `/* ... */`

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

  - post-increment, decrement: `x++`, `x--`

## Jessie: statements, declarations

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
 - `if ... then ... else`, `switch`
 - `while`, `break`, `continue`
 - `try` / `finally / `catch`
 - `for (x of items) { }`
   - **no `for (x in items)`!**

_TODO: accessor methods?_


## Destructing Assignments, Patterns, and Shorthand Properties

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
