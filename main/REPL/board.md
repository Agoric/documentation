The Board is a shared, on-chain location where users can post an object as a value and make
it accessible to others. When a user posts a value, they receive a unique ID 
for the value. Others can get the value just by knowing the ID. You can make 
an ID known by any communication method; private email, a DM or other private 
message, a phone call/voicemail, an email blast to a mailing list or many 
individuals, listing it on a website, etc.

In particular, the Board is frequently used to give others access to deposit
facets. After you post a deposit facet object to the Board, you distribute its
Board ID string as widely as you'd like. Anyone who has that ID can use it to
get access to its value, the deposit facet object. They can then safely deposit
assets into the facet's associated purse.

A Board has four API commands: **tyg todo: Not sure if has() and ids() should be externally documented?**
- `getId(value)`
- `getValue(id)`
- `has()`
- `ids()`-

## `getID(value)`
- `value` `{Object}`
- Returns: `{string}`

If the `value` is present in the Board, this method returns its Board-associated ID value. 

If the `value` is **not** present in the Board, this method adds it to the Board and assigns it
an associated ID value. It returns the new ID value.

## `getValue(id)`
- `id` `{string}`
- Returns: `{Object}`

Looks up the `id` value in the Board and returns the Board-associated value for that ID.

Errors:
- If the `id` value is not a string, exits with string "id must be string <id>".
- If the `id` value has too few digits, exits with string "id must consiste of at least <number> digits".
- If the `id` value is **tyg todo: Not clear on what it's checking here. Some sort of checksum for valid ids?**, exits with string "id is probably a typo, cannot verify CRC: <id>".
- If the `id` value is not in the Board, exits with string "board does not have id: <id>".

## `has()`
- Returns `{boolean}`

Returns `true` if **tyg todo: ?**

## `ids()`
- Returns: `{Array of strings}`

Returns an array of all ID values in the Board. **tyg todo is this a public method?**

