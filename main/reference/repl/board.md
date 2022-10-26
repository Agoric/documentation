# The Agoric Board

## Introduction

The Board is a shared, on-chain location that is where users post an object as a value and make
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

The `ids()` method returns all of the Board's currently used IDs. 
This means anyone can access any Board-stored value. The Board is public, 
not private.

Note that when calling from the REPL's `home` object, you must use 
the [`E` syntax](/conceptual/js-programming/eventual-send.md)
as shown below.

## `E(home.board).getId(value)`
- `value` `{ any }`
- Returns: `{ string }`

If the `value` is present in the Board, this method returns its Board-associated ID value. 

If the `value` is **not** present in the Board, this method adds it to the Board and assigns it
an associated ID value. It returns the new ID value.

```js
// Create an ID for an object that you want to make public
command[1] E(home.board).getId(auctionInvitation)
history[1] "1403739213"
// The value auctionInvitation (an Invitation object) now has the ID "1403739213"
command[2] E(home.board).getId(auctionInvitation)
history[2] "1403739213"
```

## `E(home.board).getValue(id)`
- `id` `{ string }`
- Returns: `{ any }`

Looks up the `id` value in the Board and returns the Board-associated value for that ID.

With respect to the `CRC` used in an error message below, an ID has two parts, the raw id
and a [CRC](https://en.wikipedia.org/wiki/Cyclic_redundancy_check). The CRC error 
happens when the passed-in id's CRC value is checked. The alleged ID is split into its 
two parts, and if the CRC in the alleged ID doesn't match the CRC produced at this time
from the raw ID value, it throws the error.

Errors:
- If the `id` value is not a string, errors with the message "id must be string" and a log of the failing `id` that was passed in.
- If the `id` value has too few digits, errors with the message "id must consist of at least 3 digits".
- If the `id` value has a different CRC value than the stored one, errors with the message "id is probably a typo, cannot verify CRC".
- If the `id` value is not in the Board, errors with the message "board does not have id: [id]".
```js
// Continuing from the example above in getValue(), the id returns its associated value
command[3] E(home.board).getValue("1403739213")
// returns the "abc" value
history[3] [Alleged: presence o-102]{}
```  
  
## `E(home.board).has(value)`
- `value` `{ any }`
- Returns `{ boolean }`

Returns `true` if the specified value has an associated Board ID.

```js
// Pass an id, not a value, so returns false
command[4] E(home.board).has("1403739213")
history[4] false
// Pass a value that does have an id in the Board, so returns true
command[5] E(home.board).has(auctionInvitation)
history[5] true
```

## `E(home.board).ids()`
- Returns: `{ Array of strings }`

Returns an array of all IDs in the Board. Remember, the Board is public, so
anyone can access anything in it.

```js
command[6] E(home.board).ids()
history[6] ["604346717","381205908","1667979430","1576549616","1532665031",
           "727995140","371571443","1456154132","500716545","815824725",
           "262188032","1265655452","1202180815","813441138","605437304",
           "1403739213"]
```
