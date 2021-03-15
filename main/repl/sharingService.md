---
sidebar: auto 
---
# Sharing Service

The `sharingService` object  and package are not part of the general
Agoric architecture, but can be useful for hackathons and demos. 

`home.sharingService` lets you connect to other vats
connected to the same remote chain vat. You can then
use a named *shared map* to pass items to and from another vat.

Shared maps are conceptually similar to a physical bulletin
board. However, each shared map is only intended to be shared
between two parties. If you have access to a shared map, you can
append objects to or remove objects from that shared map. 

Name usage in shared maps is first come, first served, with
every name used only once. 

`sharingService` has three methods, with two more methods for
`sharedMap` objects: 
- `createSharedMap(name)`
- `grabSharedMap(name)`
- `validate(sharedMap)`
- `addEntry(key, value)` (`sharedMap` method) 
- `lookup(key)` (`sharedMap` method)

Use `sharingService` by:
1. Calling `createSharedMap(name)` to create a `sharedMap` object with the
   specified name. If the name is already used, it returns an error and
   you must try again with a different name.
2. Share the `sharedMap` object reference with whoever you want to have
   access to it. Remember, the intent is that only one other party will use
   a specific map with you.
3. They call `grabSharedMap(name)` with the name you provided.
4. They call `validate(sharedMap)` on the returned object. 
   - If it's a valid `sharedMap`, then you and they have a private channel. 
   - If invalid, then someone else has grabbed the name first, so you
     need to set up a differently named map and try again.  
   - Note that you only get the object if you're the first to request it. Otherwise,
     you were beaten to it and don't get to use it.           
5. Once you and another have a reference to the same valid `sharedMap`
   object, either of you can call `addEntry(key, value)` to store an
   object, which the other party can retrieve with `lookup(key)`. 

## `E(home.sharingService).createSharedMap(name)`
- `name`: `{ String }`
- Returns: `{ SharedMap }` 

Creates and returns a new shared map with the specified name. 

Errors: If you specify an already used name for a shared map, it
returns "Error: Entry already exists: <name>".

```js
command[1] E(home.sharingService).createSharedMap("MyMap")
history[1] [Alleged: presence o-102]{}
```

## `E(home.sharingService).grabSharedMap(name)`
- `name`: `{ String }`
- Returns: `{ SharedMap }` or `undefined`

Returns the `sharedMap` object with the given name, if it exists.
If there is no `sharedMap` with that name, it returns `undefined`.

```js
command[2] E(home.sharingService).grabSharedMap("YourMap")
history[2] undefined
command[3] E(home.sharingService).grabSharedMap("MyMap")
history[3] [Alleged: presence o-102]{}
```

## `E(home.sharingService).validate(sharedMap)`
- `sharedMap`: `{ SharedMap }`
- Returns: `{ Promise<SharedMap> }` or throws an error if it fails to validate

Validates the sharedMap argument. If valid, you and its creator have a private channel for posting and
retrieving key-value pairs. If invalid, someone else must have grabbed the name first. You should discard
this sharedMap and its name and try again to establish a sharedMap connection with the map creator.

At the moment, there is a bug filed for the behavior shown below. While it would seem it should be the same,
the `my` from `command[1]` is **not** the same as `history[1]`. `my` is the promise for the `sharedMap`. `history[1]`
is the resolved version of that promise. Once the unresolved promise is assigned to `my`, `my` doesn't update its value 
when the promise resolves.

Thus, when `validate()` is called with an argument of `my`, it returns an error as `my` is an unresolved promise.
While `history[1]` initially shows that unresolved promise, the REPL waits for it to resolve and prints the result
as `history[1]`. If you later use a `history[1]` reference, it refers to the promise's resolved state.

This behavior actually is **not** the bug. It's considered a quirk of the REPL. The bug is that `validate()` doesn't
wait for any promise arguments to resolve. This section will be updated when `validate()` is revised to wait for 
its parameter to resolve before trying to validate it. 
```js
command[1] my = E(home.sharingService).createSharedMap("MyMap")
history[1] [Alleged: presence o-134]{}
command[2] E(home.sharingService).validate(my)
history[2] Promise.reject("Error: Unrecognized sharedMap: (an object)")
command[3] E(home.sharingService).validate(history[1])
history[3] [Alleged: presence o-134]{}
```

## `E(home.sharingService).sharedMap.addEntry(key, value)`
- `sharedMap`: `{ sharedMap }`
- `key`: `{ String }`
- `value`: `{ Object }`
- Returns: `{ Integer }`

Adds an entry to the specified shared map with the specified key and value. Returns
the number of entries after the newly added one.

```js
//Alice creates a shared map
command[0] foo = E(home.sharingService).createSharedMap("AliceMap")
history[0] [Alleged: presence o-122]{}
//Alice tells Bob about her shared map
//In his REPL (thus the repeat of "command[0]"; the previous one was in Alice's REPL), 
//Bob grabs Alice's shared map
command[0] bar = E(home.sharingService).grabSharedMap("AliceMap")
history[0] [Alleged: presence o-122]{}
//Alice adds the key-value pair of "key" and "value" to her shared map
command[1] E(foo).addEntry("key", "value")
history[1] 1
//Bob retrieves the value of the key-value pair in the shared map that has "key" as its key.
//(thus the repeat of "command[1]"; the previous one was in Alice's REPL),
command[1] E(bar).lookup("key")
history[1] "value"
```

## `E(home.sharingService).sharedMap.lookup(key)` 
- `key`: `{ String }`
- Returns: `{ Object }`

Returns the value associated with the specified key in the `sharedMap`.

```js
//Alice creates a shared map.
command[0] foo = E(home.sharingService).createSharedMap("AliceMap")
history[0] [Alleged: presence o-122]{}
//Alice tells Bob about her shared map
//In his REPL (thus the repeat of "command[0]"; the previous one was in Alice's REPL), 
//Bob grabs Alice's shared map
command[0] bar = E(home.sharingService).grabSharedMap("AliceMap")
history[0] [Alleged: presence o-122]{}
//Alice adds the key-value pair of "key" and "value" to her shared map
command[1] E(foo).addEntry("key", "value")
history[1] 1
//Bob retrieves the value of the key-value pair in the shared map that has "key" as its key.
//(thus the repeat of "command[1]"; the previous one was in Alice's REPL),
command[1] E(bar).lookup("key")
history[1] "value"
```

