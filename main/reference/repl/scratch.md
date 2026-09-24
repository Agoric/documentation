# Scratch

::: warning DEPRECATED
This page documents the retired `ag-solo` REPL and its `home.*` object, which
are no longer part of the Agoric stack. See [Testing a Contract](/guides/zoe/contract-hello#testing-a-contract)
for the current way to test contracts with [AVA](https://github.com/avajs/ava).
`scratch` had no on-chain equivalent; it was local, ephemeral storage for an
`ag-solo`'s deploy scripts. A current client application that needs to persist
data across runs should keep its own state (for example in the browser, or in
whatever process is driving [`@agoric/client-utils`](https://github.com/Agoric/agoric-sdk/tree/master/packages/client-utils#readme))
rather than relying on anything the chain or wallet provides.
:::

You use `scratch` to save key-value pairs for later. It is only on the ag-solo and is not accessible from the chain, making it private to the ag-solo user. Since deploy scripts are ephemeral, use `scratch` to save objects from a deploy script for later scripts to use.

Note that when calling from the REPL's home object, you must use the [E() syntax](/guides/js-programming/eventual-send) as shown below.

Keys can be anything.

## `E(home.scratch).set(id, obj)`

- `id`: `{ any }`
- `obj`: `{ Object }`
  Returns: `{ any }`

Adds the key-value pair `[id, obj]` to the Scratchpad, returns the `id`.

```js
command[1] E(home.scratch).set("foo", "bar")
history[1] "foo"
```

## `E(home.scratch).get(id)`

- `id`: `{ any }`
- Returns: `{ Object }`

Takes an ID key and returns its associated object in the ag-solo's scratchpad.
If the `id` parameter is not a valid key, it returns `undefined`.

```js
command[2] E(home.scratch).get("foo")
history[2] "bar"
```

## `E(home.scratch).list()`

- Returns: `{ Array<any> }`

Returns a sorted array of all ID values currently in the Scratchpad.

```js
command[3] E(home.scratch).list()
history[3] ["faucetTokenIssuer","foo"]
```
