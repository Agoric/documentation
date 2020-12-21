# Sharing Service

Note: agoric deploy creates home object for REPL 

-------------------------

Written by Chris in April about the sharing service

home.handoffService is a handoff service that lets you connect to other vats that are connected to the same remote vat. handoffService has three methods: createBoard(name), grabBoard(name), and validate(board). These allow you to create a 'corkboard' which you can use to pass items to and from another vat. The handoff service's methods are designed to allow you to share a newly created corkboard with one other vat, after which the name can't be reused.
The way to use it is to call createBoard() with a name that you share with someone else. They then call grabBoard() and pass the name you gave. If they get a valid corkboard, then you have a private channel. If they don't get it, then someone else must have tried to grab the name first, and you can discard that one and try again.
Once you each have an end, either of you can call addEntry(key, value) to store an object, which the other party can retrieve with lookup(key).

----------------------------

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
1. Calling `createSharedMap()` to create a `sharedMap` object with the
   specified name. If it returns an error, the name is already used and
   you have to try again with a different name.
2. Share the `sharedMap` object reference with whoever you want to be
   able to access that map.  
3. They call `grabSharedMap()` with the name you provided.
4. They call `validate()` on the returned object. 
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
- Returns: A `sharedMap` object
- Errors: If you specify a name already used for a shared map, it
  returns `Promise.reject("Error: Entry already exists: <name>")`

Creates and returns a new shared map with the specified name. If the
name has already been used for a shared map, it returns an error.

```js
myMap = E(home.sharingService.createSharedMap("myMap")); 
```

## `E(home.sharingService).grabSharedMap(name)`
- `name`: `{ String }`
- Returns: Either the `sharedMap` object with the given name, or if
there is no `sharedMap` with that name, `undefined`.

Returns the `sharedMap` object with the given name, if it exists.

## `E(home.sharingService).validate(sharedMap)`

**tyg todo: Not sure what's going on here. When I tried running this I
got (where 'foobar2' is a shared map from the name "foobar2"):
```js
command[52] E(home.sharingService).validate(foobar2)
history[52] Promise.reject("Error: Unrecognized sharedMap: (an object)\nSee console for error data.")
command[53] foobar2
history[53] [Presence o-86]
command[54] E(home.sharingService).validate("foobar2")
history[54] Promise.reject("Error: Unrecognized sharedMap: (a string)\nSee console for error data.")
```

## `E(home.sharingService).sharedMap.addEntry(key, value) 
- `sharedMap`: `{ sharedMap }`
- `key`: `{ String }`
- `value`: `{ Object }` **tyg todo: is the type correct?**
- Returns: **tyg todo: Not sure**

Adds an entry to the specified shared map with the specified key and value.

**tyg todo: Not sure how to use from REPL. Got the following:
```js
command[55] E(home.sharingService).foobar2.addEntry("one", "1")
history[55] exception: TypeError: E(...).foobar2.addEntry is not a function
command[56] E(home.sharingService).sharedMap.foobar2.addEntry("one", "1")
history[56] exception: TypeError: Cannot read property 'addEntry' of undefined

## `E(home.sharingService).sharedMap.lookupKey(key)` 

**tyg todo: See above; not sure how to use this from REPL**


