You use `scratch` to get, set, and list to save key-value pairs for later. It is only on the ag-solo and is not accessible from the chain, making it private to the ag-solo user. Since deploy scripts are ephemeral, use scratch to save objects in a deploy script for later scripts to use.

## `get(id)`
- `id`: `{ String }`. **tyg todo: Not sure of the type; see definition code at end**
- Returns: `{ Object }`

Takes an ID key and returns its associated object in the ag-solo's scratchpad. **tyg todo: What if no valid ID?**

## `set(iD, obj)`
- `iD`: `{ String }`
- `obj`: `{ Object }`
Returns: `{ String }`

Adds the value pair `[iD, obj]` to the Scratchpad, returns the ID string.

## `list()`
- Returns: `{ Array of Strings }`

Returns a sorted array of all ID values currently in the Scratchpad.

export default function makeScratchPad() {
  const map = new Map();
  async function get(idP) {
    const id = await idP;
    return map.get(id);
  }
  async function set(idP, objP) {
    const [id, obj] = await Promise.all([idP, objP]);
    map.set(id, obj);
    return id;
  }
  function list() {
    const ids = [];
    for (const id of map.keys()) {
      ids.push(id);
    }
    return harden(ids.sort());
  }
  return {
    get,
    set,
    list,
  };
}
