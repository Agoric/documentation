# Agoric JavaScript Programming

Agoric's platform lets you write secure smart contracts in JavaScript. The platform 
itself is mainly written in JavaScript. However, we've made several Agoric-specific 
additions and deletions to general JavaScript programming that you should know about 
and understand before programming on the platform. Some are *concepts*, others 
are *Agoric library additions*, and some are at the *syntax level*. All changes at the 
language level are in process to become official standards.

Click on the top heading of each section for complete documentation of the topic.

- **[Agoric JavaScript Overview](./agoric-js-overview.md)**
  - This is the key document to familiarize yourself with and refer back to. It briefly specifies 
    all the things in JavaScript you can't or shouldn't use when working on the Agoric platform and
    all the things Agoric has added at the general JavaScript programming level. In particular, you
    should know about SES (*Secure ECMAScript*) and its `lockdown()` and `harden()` methods.

- **[Secure EcmaScript (SES)](./ses/)**
  - SES provides a secure platform for
    executing programs. With SES, you can run code you don't completely trust,
    without being vulnerable to bugs or bad intentions. It's a
    standards-track extension to the JavaScript standard. Notable additions
    include the `lockdown()` and `harden()` methods to freeze objects. 
    
- **[`BigInt`](./bigint.md)** 
  - JavaScript's `Number` primitive only represents
    numbers up to 2<sup>53</sup> - 1. `BigInt` is a newer built-in JavaScript 
    object that represents arbitrarily large integers. Agoric uses `BigInts` for 
    `amount` `values` and times.

- **[Vats](./vats.md)**
  - Objects and functions in the same JavaScript vat can
    communicate synchronously. Communication with objects outside the
    vat can only be done asynchronously. 
    
- **[`Far()` and remotable objects](./far.md)**
  - In Agoric smart contracts and dapps, you can call methods on objects from other
    vats or machines. Objects intended to be used from other vats are called *remotables*. 
    To mark an object as remotable, use the `Far()` function.

- **[Remote object communication using `E`](./eventual-send.md)**
  - `E` is a local "bridge" function that lets
    you invoke methods on remote objects, whether in another vat, machine, or blockchain (for example).
    It takes a local representative (a *proxy*) for a remote object as an argument and sends messages
    to it using normal message-sending syntax. The local proxy forwards all messages to the remote 
    object to deal with. Sending a message to the remote object must be done by 
    using `E` (`E(remoteObj).myMethod()`).

- **[Notifiers and Subscriptions](./notifiers.md)**
  - The Agoric platform uses Notifiers and Subscriptions to distribute state change
    updates. Both deliver an asynchronous stream of messages as a publish-subscribe system
    might, without requiring explicit management of lists of subscribers. Notifiers are
    lossy conveyors of non-final values while Subscriptions are lossless value conveyors.
