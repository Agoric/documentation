# Exo Objects and Interface Guards

[`Far()`](./far#far-api) turns a plain object into a remotable, but leaves
argument validation entirely up to your method bodies. **Exo** objects
(from the [`@endo/exo`](https://github.com/endojs/endo/tree/master/packages/exo)
package) add a declarative validation layer on top: an **interface guard**
that checks every method's arguments and return value at the boundary,
before your code runs. Every modern Agoric contract or vat that defines a
public API defines it with Exo, not bare `Far()`.

## Interface Guards with `M`

An interface guard is built with `M.interface()` from
[`@endo/patterns`](https://github.com/endojs/endo/tree/master/packages/patterns),
naming each method and describing its call shape with `M.call()`:

```js
import { M } from '@endo/patterns';

const CounterI = M.interface('Counter', {
  increment: M.call(M.number()).returns(M.number()),
  reset: M.call().optional(M.number()).returns(),
  getValue: M.call().returns(M.number())
});
```

- `M.call(...)` describes the required arguments; chain `.optional(...)` for
  optional arguments, `.rest(...)` for a rest parameter, and `.returns(...)`
  for the return value (omit `.returns()` for a method returning nothing
  meaningful).
- `M.callWhen(...)` is the async form: it **waits for any promise or
  [Vow](./eventual-send#vows-and-durable-eventual-send) arguments to settle**,
  validates the resolved values, and only then calls your method. Use it for
  any `async` method whose arguments might be eventual references:

  ```js
  const FetcherI = M.interface('Fetcher', {
    fetch: M.callWhen(M.string()).returns(M.string())
  });
  ```

- Argument and return descriptions are built from the same pattern language
  used for on-chain data shapes: `M.number()`, `M.string()`, `M.record()`,
  `M.arrayOf(...)`, `M.remotable()`, `M.or(...)`, and so on. See the
  [`@endo/patterns` README](https://github.com/endojs/endo/tree/master/packages/patterns#readme)
  for the complete `M` namespace, including `M.splitRecord`, `CopySet`,
  `CopyBag`, and `CopyMap`.

A guard rejects a bad call before your method body ever executes, which
means your method bodies can assume their arguments are already the shape
they declared:

```js
const counter = makeExo('Counter', CounterI, {
  increment(n) {
    count += n; // guaranteed to be a number
    return count;
  }
});

counter.increment('5'); // throws before increment() runs
```

## Three Ways to Make an Exo

### `makeExo`: one instance

For a single object with no interesting per-instance state (use closure
variables if you need any):

```js
import { makeExo } from '@endo/exo';

let count = 0;
const counter = makeExo('Counter', CounterI, {
  increment(n) {
    count += n;
    return count;
  },
  getValue: () => count
});
```

### `defineExoClass`: many instances, each with its own state

For a maker function that produces many independent instances:

```js
import { defineExoClass } from '@endo/exo';

const makeCounter = defineExoClass(
  'Counter',
  CounterI,
  (initialValue = 0) => ({ count: initialValue }), // init(): per-instance state
  {
    increment(delta = 1) {
      this.state.count += delta; // this.state: this instance's state
      return this.state.count;
    },
    getValue() {
      return this.state.count;
    }
  }
);

const counter1 = makeCounter(0);
const counter2 = makeCounter(100);
counter1.increment(); // 1
counter2.increment(); // 101, independent of counter1
```

Inside a method, `this.state` is this instance's state record, and
`this.self` is a reference back to the exo itself, useful for returning `this`
or passing it to a callback without a closure.

### `defineExoClassKit`: a cohort of facets sharing one state

The kit form is how Agoric code expresses **least authority**: split one
object's behavior into several facets, hand each client only the facet it
needs, and let them all share the same underlying state. The
[Mint/Issuer/Purse/Payment split in ERTP](/glossary/#ertp) is the canonical
example.

```js
import { defineExoClassKit } from '@endo/exo';

const CounterKitI = {
  up: M.interface('UpCounter', {
    increment: M.call(M.number()).returns(M.number())
  }),
  down: M.interface('DownCounter', {
    decrement: M.call(M.number()).returns(M.number())
  }),
  reader: M.interface('CounterReader', {
    getValue: M.call().returns(M.number())
  })
};

const makeCounterKit = defineExoClassKit(
  'Counter',
  CounterKitI,
  (initialValue = 0) => ({ count: initialValue }), // shared init state
  {
    up: {
      increment(delta) {
        this.state.count += delta;
        return this.state.count;
      }
    },
    down: {
      decrement(delta) {
        this.state.count -= delta;
        return this.state.count;
      }
    },
    reader: {
      getValue() {
        return this.state.count;
      }
    }
  }
);

const { up, down, reader } = makeCounterKit(50);
// Give `up` to whoever should only be able to increment,
// `down` to whoever should only be able to decrement,
// `reader` to anyone who should be able to read but not modify.
```

Inside a kit's methods, `this.state` is the shared state, and `this.facets`
gives a method on one facet access to its sibling facets, useful when one
facet needs to invoke another (for example, a `deposit` facet checking a
balance the `reader` facet also exposes).

## Heap, Virtual, and Durable

`@endo/exo` itself only provides the **heap** variants above: instances
live in the JS heap and vanish when the vat terminates. For contracts and
vats that need many instances (**virtual**, paged to disk) or instances that
must survive a vat **upgrade** (**durable**), use the corresponding functions
from [`@agoric/vat-data`](https://github.com/Agoric/agoric-sdk/tree/master/packages/vat-data),
typically accessed through a [zone](./zones):

```js
import { makeDurableZone } from '@agoric/zone';

const zone = makeDurableZone(baggage);
const makeCounter = zone.exoClass(
  'Counter',
  CounterI,
  (initialValue = 0) => ({ count: initialValue }),
  {
    increment(delta = 1) {
      this.state.count += delta;
      return this.state.count;
    }
  }
);
```

The same `make*`/`define*` vs. `prepare*` distinction that governs
[zones and persistence](./zones) applies here: a durable exo class must be
re-established with `prepare*` (or a zone's `exoClass`/`exoClassKit` methods,
which call `prepare*` under the hood) during the first crank of every vat
incarnation, before any message can arrive for a previously exported
instance. See [Zones and Persistence](./zones) for the full heap/virtual/
durable story, and the
[Exo Taxonomy](https://github.com/endojs/endo/blob/master/packages/exo/docs/exo-taxonomy.md)
for the make/define/prepare naming scheme in full.

## Introspection with `getInterfaceOf` and `GET_INTERFACE_GUARD`

Two related but distinct introspection points:

- **`getInterfaceOf(x)`** (from `@endo/far` or `@endo/pass-style`) returns the
  interface **name** (the string passed as the first argument to `Far()`,
  `makeExo()`, or `defineExoClass()`) of any remotable, or `undefined` if `x`
  isn't one. This is the same name a `console.log` of a remotable shows for
  debugging.
- **`GET_INTERFACE_GUARD`** is a meta-method every guarded exo has, returning
  its actual `InterfaceGuard` pattern object (the full `M.interface(...)`
  value), so callers can introspect argument and return shapes at runtime:

  ```js
  import { GET_INTERFACE_GUARD } from '@endo/exo';
  import { getInterfaceMethodKeys } from '@endo/patterns';
  import { E } from '@endo/far';

  const guard = await E(counter)[GET_INTERFACE_GUARD]();
  getInterfaceMethodKeys(guard); // ['increment', 'reset', 'getValue']
  ```

## `Far()` vs. Exo

Use plain [`Far()`](./far#far-api) for small, low-risk, stateless objects,
such as a one-off callback or a simple attenuating facet, where writing an
interface guard would be pure overhead. Reach for Exo whenever an object:

- exposes a public API worth defending at the boundary (most contract facets
  and vat root objects),
- holds state that should be virtual or durable, or
- benefits from splitting into multiple least-authority facets sharing state.

See also [Zones and Persistence](./zones) for how Exo instances become
virtual or durable, and [Vows and Durable Eventual-Send](./eventual-send#vows-and-durable-eventual-send)
for the complementary durable-replay story for results, not just objects.
