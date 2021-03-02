# Agoric JavaScript Programming Extensions

Agoric's platform lets you write secure smart contracts in JavaScript. The platform itself is mainly written in JavaScript. However, we've made several Agoric-specific additions to general JavaScript programming that you should know about and understand before programming on the platform. Some are *concepts*, others are *Agoric library additions*, and some are at the *syntax level*. All changes at the language level are in process to become official standards.

Extensions covered in this document are:
- **[`BigInt`](./bigint.md)**: JavaScript's `Number` primitive only represents
  numbers up to 2<sup>53</sup> - 1. `BigInt` is a built-in object that can be used for
  arbitrarily large integers. Agoric uses `BigInts` for times and amount `values`.

- **[Vats](./vats.md)**: Objects and functions in the same JavaScript vat can
  communicate synchronously. Communication with objects outside the
  vat can only be done asynchronously. 

- **[Secure EcmaScript (SES)](./ses/ses-guide.md)**: SES provides a secure platform for
  executing programs. With SES, you can run code you don't completely trust,
  without being vulnerable to bugs or bad intentions. It's a
  standards-track extension to the JavaScript standard. 

- **[Realms and compartments](./ses/ses-guide.md)**: JavaScript code runs in the context of
  a *realm*, made up of the set of primordials (the standard
  library's objects and functions) and a global object. In a web
  browser, an iframe is a realm. In Node.js, a Node process is a
  realm. A *compartment* is a separate execution environment within a realm.

- **[`harden()`](./ses/ses-guide.md)**: A hardened object’s properties cannot be changed, so the only way to interact
with a hardened object is through its methods. `harden()`is similar to `Object.freeze()` but
more powerful. 

- **[Remote object communication using `E`](./eventual-send.md)**: `E` is a local "bridge" function that lets
you invoke methods on remote objects, whether in another vat, machine, or blockchain (for example).
It takes a local representative (a *proxy*) for a remote object as an argument and sends messages
to it using normal message-sending syntax. The local proxy forwards all messages to the remote 
object to deal with. Sending a message to the remote object must be done by 
using `E` (`E(remoteObj).myMethod()`), or the "tildot" operator `remoteObj~.myMethod()``

- **[Notifiers](./notifiers.md):** The Agoric platform uses Notifiers to distribute state change
updates. Notifiers rely on promises to deliver a stream of messages as a publish-subscribe system
might, without requiring explicit management of lists of subscribers.
