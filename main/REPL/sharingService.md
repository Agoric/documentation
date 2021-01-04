# Sharing Service

The `sharingService` object  and package are not part of the general
Agoric architecture, but can be useful for hackathons and demos. 

`home.sharingService` lets you connect to other vats
connected to the same remote chain vat. You can then
use a named *shared map* to pass items to and from another vat.

Shared maps are conceptually similar to a physical bulletin
board. If you know the name of a shared map, you can
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
2. Share the `sharedMap` object reference with anyone you want to have
   access to it. 
3. They call `grabSharedMap(name)` with the name you provided.
4. They call `validate(sharedMap)` on the returned object. 
   - If it's a valid `sharedMap`, then you and they have a private channel. 
   - If invalid, then someone else must have grabbed the name first, and
     you can discard that one and try  again. **tyg todo: This doesn't
     make sense. The map name would seem to validate whether or not someone
     else is already using it**
5. Once you and others have a reference to the same valid `sharedMap`
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

**tyg todo: Not sure what's going on here. I don't seem to be able
to get validate() to do anything but return an error**
```js
command[4] E(home.sharingService).validate(history[3])

history[4] Promise.reject("Error: Unrecognized sharedMap: (a string)")
command[5] E(home.sharingService).validate("MyMap")
history[5] Promise.reject("Error: Unrecognized sharedMap: (a string)")
command[6] const foo =  E(home.sharingService).grabSharedMap("MyMap")
history[6] undefined
command[7] E(home.sharingService).createSharedMap("SecondMap")
history[7] [Alleged: presence o-103]{}
command[8] const foo =  E(home.sharingService).grabSharedMap("SecondMap")
history[8] undefined
```

## `E(home.sharingService).sharedMap.addEntry(key, value)`
- `sharedMap`: `{ sharedMap }`
- `key`: `{ String }`
- `value`: `{ Object }`
- Returns: **tyg todo: Not sure**

Adds an entry to the specified shared map with the specified key and value.

**tyg todo: Not sure how to use from REPL. See above for problems with
storing a sharedMap object**

## `E(home.sharingService).sharedMap.lookupKey(key)` 
- `key`: `{ String }`
- Returns: `{ Object }`

Returns the value associated with the specified key in the `sharedMap`.

**tyg todo: Not sure how to use from REPL. See above for problems with
storing a sharedMap object**


