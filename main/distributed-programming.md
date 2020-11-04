# Agoric JavaScript Programming Extensions

Agoric's platform lets you write secure smart contracts in JavaScript. The platform itself is mainly written in JavaScript. However, we've made several Agoric-specific additions to general JavaScript programming that you should know about and understand before programming on the platform. Some are *concepts*, others are *Agoric library additions*, and some are at the *syntax level*. All changes at the language level are in process to become official standards.

Extensions covered in this document are:
- **[Vats](#vats)**: Objects and functions in the same JavaScript vat can
  communicate synchronously. Communication with objects outside the
  vat can only be done asynchronously. 

- **[Secure EcmaScript (SES)](#secure-ecmascript-ses)**: SES provides a secure platform for
  executing programs. With SES, you can run code you don't completely trust,
  without being vulnerable to bugs or bad intentions. It's a
  standards-track extension to the JavaScript standard. 

- **[Realms and compartments](#compartments-and-realms)**: JavaScript code runs in the context of
  a *realm*, made up of the set of primordials (the standard
  library's objects and functions) and a global object. In a web
  browser, an iframe is a realm. In Node.js, a Node process is a
  realm. A *compartment* is a separate execution environment within a realm.

- **[`harden()`](#harden)**: A hardened object’s properties cannot be changed, so the only way to interact
with a hardened object is through its methods. `harden()`is similar to `Object.freeze()` but
more powerful. 

- **[Remote object communication using `E`](#communicating-with-remote-objects-using-e)**: `E` is a local "bridge" function that lets
you invoke methods on remote objects, whether in another vat, machine, or blockchain (for example).
It takes a local representative (a *proxy*) for a remote object as an argument and sends messages
to it using normal message-sending syntax. The local proxy forwards all messages to the remote 
object to deal with. Sending a message to the remote object must be done by 
using `E` (`E(remoteObj).myMethod()`), or the "tildot" operator `remoteObj~.myMethod()``

- **[Notifiers](#notifiers):** The Agoric platform uses Notifiers to distribute state change
updates. Notifiers rely on promises to deliver a stream of messages as a publish-subscribe system
might, without requiring explicit management of lists of subscribers.

## Vats

A vat is a *unit of isolation*. To paraphrase the Las Vegas advertising slogan, what happens in the vat stays in the vat. Objects and functions in a JavaScript vat can communicate synchronously with one another. Vats and their contents can communicate with other vats and their objects and functions, but have to
[manage asynchronous messages and responses](#communicating-with-remote-objects-using-e).

There are no tools for telling what vat something is in, or if two things are in the same or different vats. In general, you/your code should know if things are local (in the same vat) because you created them or they were passed to you by something guaranteeing that’s the case. Other objects you should treat as if they might be distant (in different vats). In practice, you will know that your normal method calls (`obj.method()`) fails because the method doesn't exist and that's usually when you slap your forehead and go "Of course, it's remote!".

Vats need to run on some platform. Both a single physical machine and a blockchain (which might itself be running on a set of  collaborating machines) are possible platforms. Either type of platform can host one or more vats.

Since a vat runs in a single *event loop*, each incoming request has to finish before the next one starts. If there's remaining work, you schedule it to happen later after a Promise resolves.

The Agoric process starts several vats. Each vat hosts a service (e.g. the Board, Zoe,
etc.). As of July, 2020, all contracts run in the Zoe vat. Eventually this will change to each contract having a dedicated vat.

## Secure EcmaScript (SES)

SES is a standards-track extension of the JavaScript standard 
[EcmaScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm).
It provides a secure platform for executing programs, letting you run code you don't completely trust. 
SES-based programs, whether you are an enduser or a server operator, can host untrusted developer apps’ 
code without being vulnerable to possible bugs or bad intentions.  

The guest developer’s app code runs in an immutable realm that by default has no access to ambient authority. Agoric’s hosting code provides access to disk or network or other services, and the guest code has no access to any ungranted authority. So developers can import and rely on library code from anywhere on the net, and have limited vulnerability to its misbehavior. The outside code can’t talk to the network, store data on disk, or use other powers without the Dapp's explicit permission. 

Every program that uses a library which  uses SES, should start with `import '@agoric/install-ses'` Libraries do not (and should not) do this, and contracts are basically libraries

```js
import {lockdown} from "ses";
 
lockdown(); // turns the current realm into an immutable realm
// calling this function also adds a global Compartment constructor to create compartments
```

## Compartments and realms

JavaScript code runs in the context of a [`Realm`](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-code-realms). A realm is composed of the set of *primordials* (objects and functions of the standard library like `Array.prototype.push`) and of a global object. In a web browser, an iframe is a realm. In Node.js, a Node process is a realm.

For historical reasons, the ECMAScript specification requires the *primordials*
to be mutable (`Array.prototype.push = yourFunction` is valid
ECMAScript but not recommended). SES makes it possible to turn the
current realm into an **immutable realm**, that is a realm within
which the primordials are deeply frozen. It also allows programs to
create **Compartments**. 

Compartments are "mini-realms". They have their own dedicated global object 
and environment, but they inherit the primordials from their parent realm.

Agoric deploy scripts and smart contract code run in an immutable
realm with compartments providing just enough authority to create
useful and secure contracts (but not enough authority to do anything
unintended or harmful to the participants of the smart contract). 

## `harden()`

`harden()` ensures that external callers of a hardened object can only
interact with it through functions in the object’s API.
 `harden()` is an enhanced transitive version of 
[`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze),
which only locks up an object's own properties.

All objects that will be transferred across a trust boundary must have
their API surface frozen (usually by calling `harden()`). This ensures
other objects can only interact with them through their defined
method interface. CapTP, our communications layer for passing
references to distributed objects, enforces this at vat boundaries.

The general rule is that if you make a new object and give it to someone else (and don't immediately forget it yourself),
you should give them `harden(obj)` instead of the raw object.
This prevents someone from adding/deleting the properties or prototypes of that object.
Being hardened doesn't preclude an object from having access to mutable state (`harden(new Map()) ` still behaves like a normal mutable `Map`), but it means their methods stay the same and can't be surprisingly changed by someone else

Defined objects (`mint`, `issuer`, `zcf,` etc.) shouldn't need hardening as their constructors should do that work. It's mainly records, callbacks, and ephemeral objects that need hardening.

You can send a message to a hardened object. If it's a record, you can access its
properties and their values.

You have to harden a class before you harden any of its instances; i.e. it takes two separate steps
to harden both a class and its instances. Harden a base class before hardening classes that inherit from it.
`harden()` does transitive freezing by following the object’s
own properties (as opposed to properties it inherited), and the objects whose own properties refer to them,
and so forth. 

`harden()` is automatically provided by SES. Any code that will run inside a vat or a contract
can use harden as a global, without importing anything. 

**Tip**: If your text editor/IDE complains about `harden()` not being defined or imported, try
adding `/* global harden */` to the top of the file. 

You use `harden()` like this:

```js
const o = {a: 2};
o.a  = 12;
console.log(o.a); // 12 because o is still mutable

harden(o);

o.a  = 37; // throws a TypeError because o is now hardened
```

## Communicating with remote objects using `E`

On the Agoric platform, objects may be running in distinct vats, on a remote
machine, or even on a blockchain. When you send messages to non-local
objects in different vats, the response isn't received immediately and
can't be acted upon locally until it arrives. 

To keep from blocking local code until the response arrives, we
return a `Promise` for the result. You can send more messages to a result's
`Promise`. If and when the `Promise` resolves to a remote object, the messages
are forwarded to the object's location, and their results are
eventually returned and processed locally. 

JavaScript natively
[supports Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).
Agoric's `HandledPromises` are compatible and interoperable with
standard `Promise`s. Standard interaction with a `Promise` or
`HandledPromise` is to do further processing either in a `.then()`
clause or after using `await` to get the result. 

You can send messages to a `Promise`'s eventual result, or to a
presence (a proxy for a remote object), using `E()` notation. For
example, `E(remoteServiceP).startup(params)`. The result of a
send using`E` is always a `Promise`, so the normal thing to do with
the result (as with any object) is either pass it as a parameter or
invoke a function to be performed once the `Promise` is fulfilled.

`E(remoteServiceP).startup(params).then(result => useTheService(result));`

Deploy scripts and Zoe smart contracts often access services running in a
different vat. For instance, a deploy script may want to install a contract in a
Zoe instance running in a blockchain. But the deploy script
cannot call `zoe.install(bundle)`, because it does not have local
access to the `zoe` object in a different vat. However, the deploy
script is given access to a `zoe` *presence*. To call methods on the
actual Zoe object, the deploy code can do:

```js
const installationHandle = await E(zoe).install(bundle);
```

The `E()` function is a local "bridge" that lets you invoke methods on
remote objects. The local version of a remote object is called a
**presence**. `E()` takes a presence as an argument and creates an
object that is a forwarder that doesn't know what methods the remote object has.

This is useful to know for debugging. If you misspell or incorrectly capitalize the method name, 
the local environment can't tell you've done so. You'll only find out at runtime when the 
remote object complains that it doesn't know that method.

`E()` performs the communication asynchronously. Method calls can take
objects in the current vat or presences for objects in other vats as arguments.

`E()` is frequently used in code to call
[Zoe Service API methods](./zoe/api/zoe.md).

## Notifiers

Agoric uses a Notifier based on Promises to distribute state change updates. Notifiers rely on
promises to deliver a stream of messages allowing many subscribers to receive notifications without
the publisher having to track a subscription list.

An object that wants to publish updates to interested clients would make a `notifier` available to
them. The clients request the current state by calling `notifier.getUpdateSince()`, which returns
(a promise for) a record containing `{ value, updateCount }`. From that point on, the next update
can be retrieved by calling

<<< @/snippets/test-distributed-programming.js#getUpdateSince

On each call, if updateCount is the same as the current count, the promise won't be resolved until
a new value is reported to the notifier. If updateCount is different, the promise is resolved
immediately with the current state. If the stream is completed, the record will contain an
undefined updateCount.

Notifiers are the facet of the protocol that provides updates to consumers. The other side is an
updater, which is how information providers supply information.  The object that wants to publish
information starts by calling `makeNotifierKit()`, which returns `{ notifier, updater }`. The
notifier is provided to clients, while the updater is retained internally. The udpater has three
methods, `updateState(state)`, `finish(finalState)`, and `fail(reason)`. `updateState` supplies a
new state that will be used to resolve all the outstanding promises. `finish` and `fail` both close
the stream, one with a final state, the other by rejecting the promise, so that clients' Promises
will also be rejected.

`notifier.getUpdateSince()` returns `{ value, updateCount }`.
- `value` represents the state, and the format is up to the publisher.
- `updateCount` is used to request notification the next time there's a change to the state. If the
  state becomes final (e.g. a seat exits), updateCount will be `undefined`.  If there's an error,
  the promise for the record is rejected and there isn't a next state.

If you call `getUpdateSince(oldUpdateCount)`:
- With no count, or any `updateCount` other than the most recent one:
  - The notifier immediately returns a promise for a record with the current state.
- With the most-recently generated `updateCount`:
  - The notifier returns a promise for the next record, which is resolved on the next state change.
- If you haven't called `getUpdateSince()` before, you won't have a previous updateCount to use.

Some notification systems also provide access to a complete history of an object's state
changes. The Agoric Notifier API only directly supports the single state change notification
style. The client can't work around this by keeping lists of changes, since the service doesn't
guarantee that clients will see all the changes.

An alternative approach for services that want to ensure their clients receive a more complete
history is to represent the state as a set of changes leading up to the present. Use cases for this
include an editor with an undo function, or an application with rollback ability.

Rather than sending `"the current state is 'blue'."`, a contract could send `"the current state is
'blue', the most recent update was { ''blah' => 'blue' }"`.  If you, as a contract author,
determine that clients want this much detail, you would have to package and send it.

### Follower pattern

A common pattern for following updates to a notifier until it's done is the following.  Note that
the notifier object is remote, and so we use `E()`.  Also, `PublicAPI` is a widely available
contract facet, where it often makes sense to put a `getNotifier()` method.

<<< @/snippets/test-distributed-programming.js#follower

### Providing updates

Objects that want to share info about changes to their state can use a notifier to provide
updates. Publishers import and call `produceNotifier()`, which returns two facets, a notifier
and an updater. The notifier object can be shared to provide the ability to see the object's state
changes.

<<< @/snippets/test-distributed-programming.js#importNotifier
<<< @/snippets/test-distributed-programming.js#makeNotifierKit

The updater has three methods, which send a notification with the new state to any waiting
notifiers:
- `updateState(newState)` provides a new state, so all active Promises produced by
  `getUpdateSince()` are resolved to the next record.
- `finish(finalState)` provides a new state, and terminates the stream. The record that the
  Promises resolve to doesn't include an updateCount (i.e. it is `undefined`), which can be used to
  detect the final state.
- `fail(reason)` doesn't provide a next state. Instead, it causes the Promise to be rejected with
    the `reason`, signalling that the monitored object hit an error condition.

### Use of Notifiers in Zoe

Zoe provides updates on the state of seats within a contract. The updates from Zoe indicate changes
to the allocation of a seat and seats exiting. These are available from `E(userSeat).getNotifier()`
and `zcfSeat.getNotifier()`, which provide long-lived notifier objects associated with a particular
seat. zcfSeat is available within contracts while useSeat is accessible from the REPL, deploy
scripts, and other code outside contracts.

Individual contracts can also use notifiers to provide updates giving current prices or other
contract-specific details.

Zoe's updates for an offer show the current allocation that will be paid if the contract completes
without further changes.

