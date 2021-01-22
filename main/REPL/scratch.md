# Scratch

You use `scratch` to save key-value pairs for later. It is only on the ag-solo and is not accessible from the chain, making it private to the ag-solo user. Since deploy scripts are ephemeral, use `scratch` to save objects from a deploy script for later scripts to use.

Note that when calling from the REPL's home object, you must use the [E syntax](/distributed-programming.md#communicating-with-remote-objects-using-e) as shown below.

**tyg todo: Are the keys limited to strings? Not clear from code. If not, need to fix all three methods**

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
