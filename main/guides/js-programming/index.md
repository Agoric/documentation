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

::: tip Historical Note
The term "worker" in Agoric replaces the historical term "vat", which was inspired by the philosophical thought experiment "Brain in a Vat" - where a brain is sustained in isolation and connected to simulated inputs, similar to how our workers maintain strict isolation boundaries.
:::

We refer to this combination of an event loop with a message queue, a stack, and a heap as a _worker_.

Workers are the unit of synchrony. We can only use ordinary synchronous
function calls within the same worker. But we can use asynchronous function calls
(with [eventual send](./eventual-send)) either within the same worker or between workers.
Workers may be on remote machines, including massively replicated machines such as blockchains.

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

- **[Notifiers and Subscriptions](./notifiers)**
  - Notifiers and Subscriptions distribute state change
    updates. Both deliver an asynchronous stream of messages as a publish-subscribe system
    might, without requiring explicit management of lists of subscribers. Notifiers are
    lossy conveyors of non-final values while subscriptions are lossless value conveyors.
