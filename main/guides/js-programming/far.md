
# `Far()` and Remotable Objects

## Remotable objects

In Agoric smart contracts and dapps, you can call methods on objects from other vats or machines. 
For example, a purse for an ERTP issuer actually lives in the issuer's vat. But code in your off-chain
wallet or another contract can still use that purse.

This is possible because Agoric encapsulates inter-machine and inter-vat communication. At
the smart contract or dapp level, objects from other vats or machines can almost be treated 
as if they are local.

To call a method on an object from another vat or machine, you must 
use [`E()`](./eventual-send.html#remote-object-communication-with-e). For example, getting
an `Issuer`'s `brand` would look like `E(issuer).getBrand()`.

Objects intended to be used in other vats are called `Remotables`. In particular, note that
every object returned from a smart contract, such a `publicFacet` or 
`creatorFacet`, must be `Remotable`. All objects used in your contract's external API must
be `Remotable`

### Rules for Creating Remotables
- All property names must be strings. 
  - Property names must not be `Symbols`. **tyg todo: Do we need to have the `Symbol.asyncIterator` exception here?**
- All property values must be functions. 
  - They cannot be accessors.
  - Note: If you wish to send data, send a pass-by-copy record instead, or add a function that returns a pass-by-copy record.
- You must wrap the object with `Far()`.

### Using `Remotables`
- Call a `Remotable`'s method by first wrapping the `Remotable` object with `E`, such as `E(issuer).getBrand();`
- Handle the resulting promise. Calling `E()` always results in a `Promise`.

## Using `Far()`

`Far(interface-name, object-with-methods)`
- `interface-name` `{ String }`
- `object-with-methods` ` { Object }` `[remotable={}]`
-  Returns: A `Remotable` object.

The `interface-name` parameter gives the `Remotable` an *interface name*, which only shows
up in `console.log` when 

The `object-with-methods` parameter includes a record with definitions of all the object's 
property functions. See the example code below.

Use the `Far()` function to mark an object as `Remotable`.  `Far()` also:
- Runs `harden()` on the object.
- Checks for the property name and value requirements above. If they are not met, it throws an error.
- Records the object's interface name. 

You should call `far()` on an object if it both:
- Will be sent out of its native vat.
  - If it might ever appear as the `foo` in [`E(foo)`](./eventual-send.md),  
    you should run `far()` on it after creating it.
- Has methods called on it, as opposed to just effectively storing data.

```js
import { Far } from '@agoric/marshal';
let counter;
const countRemotable = Far('counter', {
  increment() { counter++; },
  decrement() { counter--; },
  read() { return counter; },
});
```

`Far()` automatically [hardens](./ses/ses-guide.md#harden) its object argument. 
If you make a `Remotable` object with `Far()`, you don't need to also call `harden()` 
on it. Since `far()` is not used on objects used to send data, you must still use
`harden()` on them.



