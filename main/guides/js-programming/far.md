# `Far()` and Remotable Objects

## Remotable objects

Some objects have methods that can be invoked remotely (across contracts and vats) using the [`E()` syntax](./eventual-send.html#remote-object-communication-with-e). These are *`Remotable`* objects. All objects used in your contract's external API must be `Remotable`. 

These objects also have an *interface name* associated with them, which is useful for debugging. It only shows up in `console.log`.

Remotable objects must meet these requirements:

* Each of its property names is a `String`. They cannot be a `Symbol` (except for `AsyncIterator`),
* Each of its property values is a function. They cannot be an accessor (getter/setter) or plain data.
* It must be `harden()`ed.
* It must be marked with `Far()` or `Remotable()`.

## `Far()`

`Far(interface-name, object-with-methods)`
- `interface-name` `{ String }`
- `object-with-methods` ` { Object }` `[remotable={}]`
-  Returns: A remotable object.

`Far()`'s second argument is a record of all the object's property functions
 and their definitions. See the example code below.

Use the `Far()` function to mark an object as `Remotable`.  `Far()` also:
- Runs `harden()` on the object.
- Checks for the property name and value requirements above. Throws an error if they are not met.
- Records the object's interface name. 

```js
import { Far } from '@agoric/marshal';
let counter;
const countRemotable = Far('counter', {
  increment() { counter++; },
  decrement() { counter--; },
  read() { return counter; },
});
```
When `countRemotable` is exported from your contract to a remote vat, the vat receives a `Presence`. It can use `E(countPresence).increment()` to increment the counter. If they do a `console.log(countPresence)`, the object is labeled as a `Presence` whose alleged interface name is "counter".

`Far()` automatically does `harden()` on its object argument, so if you've made an object Remotable with `Far()`, 
you don't need to also call `harden()` on it.  If you're doing something like sending data, you must still use `harden()`
on it.

**tyg todo: Questions:
1.  **Answered** What arguments does Far() take? Looks like the first one is a string that's it's interface name (alleged). Second one is a record of all the object's property functions and their definitions?
2. You jump to countPresence from countRemotable. Neither uses the 'counter' interface name? How, in general, did you get from the storing the returned Far() value countRemotable to it becoming countPresence? Or was this just a mistake and the returned Far() value should've been named countPresence (and I'm guessing "countPresence" could've been named "foobar"; i.e. having "Presence" isn't required, just a way of being clear.
3. **Answered** For the checks and enforces the property name and value requirements, does it just throw an error if there's a violation?
4. **Answered** What is the interface name used for? Does it only show up in console.log when it's called on the Presence?
5. **Answered** Just to be sure I'm clear, if Far() is called on something, there's no need to also call harden() on it. But there are still times when you'd only call harden() on an object but not far()? If so for the latter, example use cases/situations?**

## `Remotable()`

`Remotable()` is a lower-level way to do what `Far()` does. You should **not** use it. While it works now, in the future when objects like `countRemotable` below are serialized for transmission, it will cause an error.  At that point, `Far()` **must** be used. It is presented here so you know how to fix any older code that may use it. For example:

```js
let counter;
const countRemotable = harden({
  increment() { counter++; },
  decrement() { counter--; },
  read() { return counter; },
});
```

In most cases, you can upgrade this code by simply replacing the `harden(..` with `Far('interfacename' ..`.

