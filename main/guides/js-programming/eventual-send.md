# Communicating with remote objects using `E`

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
