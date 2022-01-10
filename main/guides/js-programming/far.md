
# `Far()`, Remotable, and Marshaling

To export objects such as from our [counter example](./hardened-js.md#counter-example)
to make them available to other vats, mark them as _remotable_ using [Far](#far-api):

<<< @/snippets/test-distributed-programming.js#importFar
<<< @/snippets/test-distributed-programming.js#makeFarCounter

## Marshaling by Copy or by Presence

Recall that the first step in an [eventual send](./eventual-send.md#eventual-send) is
to _marshal_ the method name and structured arguments; that is: to make them into a single string.
This is like [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) but it can handle values such as `undefined` and `BigInt`s.
Also, while many forms of data are copied between vats,
remotables are marshalled so that they become remote _presences_ when unmarshaled:

![counter remote presence](../../assets/remote-presence-fig.svg)

Then another vat can make and use the exported counters:

<<< @/snippets/test-distributed-programming.js#useFarCounter

## Pass Styles and `harden`

Calls to remote presences must only contain *passable* arguments and return *passable* results.
There are three kinds of passables:
   * Remotables: objects with methods that can be called using `E()` eventual send notation
   * Pass-by-copy data, such as numbers or hardened structures
   * Promises for passables

Every object exported from a smart contract, such a `publicFacet` or
`creatorFacet`, must be passable. All objects used in your contract's external API must
be passable. All passables must be hardened.

Consider what might happen if we had a remote `item` and we did not harden
some pass-by-copy data that we passed to it:

```js
let amount1 = { brand: brand1, value: 10n };
await E(item).setPrice(amount1); // Throws, but let's imagine it doesn't.
amount1.value = 20n;
```

Now `amount1` is supposedly both in the local and the remote vat, but the `value`
is `20n` in the local vat but `10n` in the remote vat. (Worse: the remote vat
might be the same as the local vat.) Requiring `harden()` for pass-by-copy
data leads to behavior across vats that is straightforward to reason about.

### `passStyleOf` API

`passStyleOf(passable)`
 - `passable` `{Passable}`
 - Returns: `{PassStyle}`


A Passable is a value that may be marshalled. It is classified as one of
PassStyle. A Passable must be hardened.

The `PassStyle`s are:
   * the atomic pass-by-copy primitives (`"undefined" | "null" |
     "boolean" | "number" | "bigint" | "string" | "symbol"`),
   * the pass-by-copy containers (`"copyArray" | "copyRecord"`) that
     contain other Passables,
   * and the special cases (`"error" | "promise"`), which
     also contain other Passables.
   * so-called `PassableCap` leafs (`"remotable" | "promise"`).

::: tip Check `passStyleOf` when handling untrusted structured data
Just as you would use `typeof` to check that an argument is
a string or number, use `passStyleOf` to when you expect, say, a `copyRecord`;
this prevents malicious clients from playing tricks with cyclic data etc.
:::
## `Far()` API

`Far(farName, object-with-methods)`
- `farName` `{ String }`
- `object-with-methods` ` { Object }` `[remotable={}]`
-  Returns: A `Remotable` object.

The `farName` parameter gives the `Remotable` an *interface name* for debugging purposes, which only shows
up when logged through the `console`, for example with `console.log`. 

The `object-with-methods` parameter should be an object whose properties are the functions serving 
as the object's methods.

The `Far()` function marks an object as remotable.  `Far()` also:
- Hardens the object.
- Checks that all property values are functions and throws otherwise.
  - accessors (`get()` and `set()`) are not allowed.
- Records the object's interface name.

::: tip Avoid accidental exports
If an object should never be exposed to other vats, you should make it
a point **not** to use `Far()` on it. If an object is not marked as a remotable but is accidentally
exposed, an error is thrown. This prevents any vulnerability from such accidental exposure.
:::
