# JavaScript Framework for Secure Distributed Computing

The Agoric smart contract platform starts with a JavaScript framework
for secure distributed computing.

::: tip Watch: Distributed Programming for a Decentralized World (August 2019)
This 15 minute overview is the first in a
[4-parts series](https://www.youtube.com/playlist?list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG)
of short talks on the Agoric Architecture that overlap substantially with the material in
the sections below.
<br />
<ClientOnly>

<iframe width="560" height="315" src="https://www.youtube.com/embed/52SgGFpWjsY?list=PLzDw4TTug5O1oHRbp2HkcvKABAY9FKsmG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</ClientOnly>
:::

## Vats: the Unit of Synchrony

The Agoric framework uses the same [event loop concurrency model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) as web browsers and Node.js.
Each event loop has a message queue, a call stack of frames, and a heap of objects:

![heap, stack, and queue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_Loop/the_javascript_runtime_environment_example.svg)

We refer to this combination of an event loop with a message queue, a stack, and a heap as a _vat_.

Vats are the unit of synchrony. We can only use ordinary synchronous
function calls within the same vat. But we can use asynchronous function calls
(with [eventual send](./eventual-send)) either within the same vat or between vats.
Vats may be on remote machines, including massively replicated machines such as blockchains.

## Parts of the Framework

The framework includes:

- **[Hardened JavaScript](./hardened-js)**
  - Hardened JavaScript provides a platform for
    making objects that can interact with code you don't completely trust,
    without being vulnerable to bugs or bad intentions.
    We introduce [object capabilities](./hardened-js#object-capabilities-ocaps) and how to use them
    to apply the [principle of least authority](./hardened-js#the-principle-of-least-authority-pola).

- **[`E()` for Eventual Send to Remote Presences](./eventual-send)**
  - The `E()` wrapper function lets
    you invoke methods within or between vats.
    Given a local representative (a _presence_) for a remote object,
    it sends messages to the origin of the presence.
    `E(obj).myMethod(...args)` is an asynchronous form of `obj.myMethod(...args)`.

- **[`Far()`, Remoteable Objects, and Marshaling](./far)**
  - Objects used across vats are called _remotables_.
    To mark an object for exporting from a vat, use the `Far()` function.

- **[Notifiers, Subscriptions, and PublishKit](./notifiers)**
  - These distribute state change updates, each delivering an asynchronous
    stream of messages as a publish-subscribe system might, without requiring
    explicit management of lists of subscribers. `makePublishKit()` is the
    current recommended primitive, supporting both lossy and lossless
    consumption from a single producer.

- **[Exo Objects and Interface Guards](./exo)**
  - `Far()` alone doesn't validate its methods' arguments. An Exo object
    (`makeExo`, `defineExoClass`, `defineExoClassKit`) adds a declarative
    interface guard, built with the `M` pattern language, that validates
    every call at the boundary. Exo is the remotable-object surface every
    modern contract writes against.

- **[Zones and Persistence](./zones)**
  - A vat can be upgraded, replacing its code while some of its state
    survives. Zones give the same Exo- and store-allocating code a uniform
    API across the three persistence regimes: heap (ephemeral), virtual
    (pageable, still ephemeral), and durable (pageable and upgrade-surviving).

- **Vows and Durable Eventual-Send**
  - covered in [`E()` for Eventual Send](./eventual-send#vows-and-durable-eventual-send).
    Native promises don't survive a vat upgrade; a Vow is a Passable,
    durably storable stand-in that does, with `watch`/`when`/`watchPromise`
    as its `.then()`-equivalents. See also
    [`@agoric/async-flow`](https://github.com/Agoric/agoric-sdk/tree/master/packages/async-flow)
    for the complementary durable-replay mechanism for entire `async`
    function bodies.
