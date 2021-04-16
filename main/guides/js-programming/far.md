# `Far()` and Remotable Objects

## Remotable objects

Some objects have methods that can be invoked remotely (across contracts and vats) using
the [`E()` syntax](./eventual-send.html#remote-object-communication-with-e). These are
*`Remotable`* objects. All objects used in your contract's external API must be `Remotable`. 

These objects also have an *interface name* associated with them, which is useful for debugging. 
It only shows up in `console.log`.

Remotable objects must meet these requirements:

* Each of its property names is a `String`. They cannot be a `Symbol` (except for `Symbol.syncIterator`).
  * Any method named by a symbol other than `Symbol.syncIterator` is not remotely invokable in the Agoric system.
* Each of its property values is a function. They cannot be an accessor (getter/setter) or plain data.
* It must be `harden()`ed.
* It must be marked with `Far()` (some older code may use the to be deprecated`Remotable()`).

## `Far()`

`Far(interface-name, object-with-methods)`
- `interface-name` `{ String }`
- `object-with-methods` ` { Object }` `[remotable={}]`
-  Returns: A remotable object.

`Far()`'s second argument is a record of all the object's property functions
 and their definitions. See the example code below.

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

`Far()` automatically does [`harden()`](./ses/ses-guide.md#harden) on its object argument, 
so if you've made a `Remotable` object with `Far()`, you don't need to also call `harden()` 
on it. Since `far()` is not used on objects used to send data, you must still use
`harden()` on them.

## `Remotable()`

`Remotable()` is a lower-level way to do what `Far()` does. You should **not** use it. While it works now, in the future when objects like `countRemotable` below are serialized for transmission, it will cause an error.  At that point, `Far()` **must** be used. It is presented here so you know how to fix any older code that may use it. For example:

**tyg todo: Thing is, the sample code and the how to upgrade it doesn't actually use a function/method `Remotable()` but just
runs harden() on the object's methods. Should this be rephrased to something like "Another way to make an object `Remotable` 
is to run `harden()`...."? Or is there also a `remotable()` function that should be shown?**
```js
let counter;
const countRemotable = harden({
  increment() { counter++; },
  decrement() { counter--; },
  read() { return counter; },
});
```

In most cases, you can upgrade this code by simply replacing the `harden(..)` with `Far('interfacename' ...)`.

