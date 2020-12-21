# The Agoric Board

## Introduction

The Board is a shared, on-chain location where users post an object as a value and make
it accessible to others. When a user posts a value, they receive a unique ID 
for that value. Others can get the value just by knowing the ID. You can make 
an ID known by any communication method; private email, a DM or other private 
message, an email blast to a mailing list or many individuals, listing it on a website, etc.

In particular, the Board is frequently used to give others access to deposit
facets. After you post a deposit facet object to the Board, you distribute its
Board ID string as widely as you'd like. Anyone who has that ID can use it to
get access to its value, the deposit facet object. They can then safely deposit
assets into the facet's associated purse without being able to withdraw assets
from the purse or check its balance.

Note that when calling from the REPL's `home` object, you must use 
the [`E` syntax](/distributed-programming.md#communicating-with-remote-objects-using-e)
as shown below.

**tyg todo: Not sure if has() and ids() should be externally documented?**

## `E(home.board).getId(value)`
- `value` `{Object}`
- Returns: `{string}`

If the `value` is present in the Board, this method returns its Board-associated ID value. 

If the `value` is **not** present in the Board, this method adds it to the Board and assigns it
an associated ID value. It returns the new ID value.

```js
// Create an ID for the value "foobar"
command[1] E(home.board).getId("foobar")
history[1] "1403739213"
// The value "foobar" now has the ID of "1403739213"
command[2] E(home.board).getId("foobar")
history[2] "1403739213"
```

## `E(home.board).getValue(id)`
- `id` `{string}`
- Returns: `{Object}`

Looks up the `id` value in the Board and returns the Board-associated value for that ID.

Errors:
- If the `id` value is not a string, exits with string "id must be string (a <type of the argument>".
- If the `id` value has too few digits, exits with string "id must consist of at least 3 digits".
- If the `id` value is **tyg todo: Not clear on what it's checking here. Some sort of checksum for valid ids?**, exits with string "id is probably a typo, cannot verify CRC: a <type of the argument>".
- If the `id` value is not in the Board, exits with string "board does not have id: <id>".
```js
// Continuing from the example above in getValue(), the id returns its associated value
command[3] E(home.board).getValue("1403739213")
history[3] "foobar"
```  
  
## `E(home.board).has(value)`
- `value` `{ object }`
- Returns `{boolean}`

Returns `true` if the specified value has an associated Board ID.

```js
command[4] E(home.board).has("1403739213")
history[4] false
command[5] E(home.board).has("foobar")
history[5] true
```

## `E(home.board).ids()`
- Returns: `{Array of strings}`

Returns an array of all ID strings in the Board. 

```js
command[6] E(home.board).ids()
history[6]["604346717","381205908","1667979430","1576549616","1532665031",
           "727995140","371571443","1456154132","500716545","815824725",
           "262188032","1265655452","1202180815","813441138","605437304",
           "1403739213"]
```


