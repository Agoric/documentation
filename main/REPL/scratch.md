You use `scratch` to get, set, and list to save key-value pairs for later. It is only on the ag-solo and is not accessible from the chain, making it private to the ag-solo user. Since deploy scripts are ephemeral, use scratch to save objects in a deploy script for later scripts to use.

## `set(iD, obj)`
- `iD`: `{ String }`
- `obj`: `{ Object }`
Returns: `{ String }`

Adds the value pair `[iD, obj]` to the Scratchpad, returns the ID string.
```js
command[1] E(home.scratch).set("foo", "bar")
history[1] "foo"
```

## `get(id)`
- `id`: `{ String }`. **tyg todo: Not sure of the type; see definition code at end**
- Returns: `{ Object }`

Takes an ID key and returns its associated object in the ag-solo's scratchpad. 
If the `id` parameter is not a valid key, it returns `undefined`.
```js
command[2] E(home.scratch).get("foo")
history[2] "bar"
```

## `list()`
- Returns: `{ Array of Strings }`

Returns a sorted array of all ID values currently in the Scratchpad.
```js
command[3] E(home.scratch).list()
history[3] ["faucetTokenIssuer","foo"]
```
