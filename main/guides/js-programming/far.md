
# `Far()` and Remotable Objects

## Remotable and passable objects

In Agoric smart contracts and dapps, you can call methods on objects from other vats or machines. 
For example, a purse for an ERTP issuer actually lives in the issuer's vat. But code in your off-chain
wallet or another contract can still use that purse.

This is possible because Agoric encapsulates inter-machine and inter-vat communication. At
the smart contract or dapp level, objects from other vats or machines can almost be treated 
as if they are local.

To call a method on an object from another vat or machine, you must 
use [`E()`](./eventual-send.md#remote-object-communication-with-e). For example, getting
an `Issuer`'s `brand` would look like `E(issuer).getBrand()`.

Objects intended to be used from other vats are called *remotables*. Remote messages sent to
remotables must only contain *passable* arguments and return *passable* results. 
Passables includes all things that can be passed as arguments in messages. 

There are three kinds of passables:
   * Remotables, objects with methods that can be called remotely using `E()`.
   * Pass-by-copy data, such as numbers or hardened records
   * Promises for passables.

In particular, note that every object returned from a smart contract, such a `publicFacet` or 
`creatorFacet`, must be passable. All objects used in your contract's external API must
be passable.

### Rules for creating remotables
- All property values must be functions. 
  - They cannot be accessors.
- You must wrap the object with `Far()`.

**Note**: ERTP objects, such as `Purses`, are automatically created as `Remotable`, as are
`UserSeats` and `ZCFSeats`. 

### Using remotables
- Call a remotable's method by first wrapping the remotable object with `E`, such as `E(issuer).getBrand();`
- Handle the resulting promise. Calling `E()` always results in a `Promise`.

## Using `Far()`

`Far(farName, object-with-methods)`
- `farName` `{ String }`
- `object-with-methods` ` { Object }` `[remotable={}]`
-  Returns: A `Remotable` object.

The `farName` parameter gives the `Remotable` an *interface name* for debugging purposes, which only shows
up when logged through the `console`, for example with `console.log`. 

The `object-with-methods` parameter should be an object whose properties are the functions serving 
as the object's methods. See the example code below.

The `Far()` function marks an object as remotable.  `Far()` also:
- Hardens the object.
  - Both `harden()` and `Far()` function harden the object. 
  - Only hardened objects are passable.
- Checks for the property and value requirements above. 
  If they are not met, it throws an error.
- Records the object's interface name. 

You should call `Far()` on an object if it both:
- Will be sent out of its native vat.
  - If it might ever appear as the `foo` in [`E(foo).method(args)`](./eventual-send.md),  
    you should run `Far()` on it after creating it.
- Has methods called on it, as opposed to just effectively storing data.

Only passables can be passed as arguments or returned as results,
and they must be hardened. If the passable is a remotable, it must be hardened with `Far()`.
Otherwise, it must be hardened with [`harden()`](./ses/ses-guide.md#harden).

An error
is thrown if you call `Far()` on a record, instead of an object, which doesn't have function
values. However, if object `foo` should never be exposed to other vats, you should make it
a point **not** to use `Far()` on it. If `foo` is not marked as a remotable but is accidentally
exposed, an error is thrown. This prevents any vulnerability from such accidental exposure.

```js
import { Far } from '@agoric/marshal';
let counter;
const countRemotable = Far('counter', {
  increment() { counter++; },
  decrement() { counter--; },
  read() { return counter; },
});
```





