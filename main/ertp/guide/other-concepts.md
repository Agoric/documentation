# Other Concepts

When looking at the code in our [tests](https://github.com/Agoric/agoric-sdk/tree/master/packages/ERTP/test), you might see some new
concepts:

* __Vats__: All user code runs in what we call a vat. Within a vat, code is run synchronously. Communication with another vat happens asynchronously. The [SwingSet infrastructure](https://github.com/Agoric/SwingSet) creates the vats and makes communication between vats possible.

* __E() and tildot (~.)__: Instead of `obj.foo()`, we can write `E(obj).foo()` or the syntactic sugar, `obj~.foo()` and get a promise for the result. The syntax means "deliver the message foo() to the actual object asynchronously, in its own turn, wherever and whenever it is, even if it is local." Using `E` or `~.`, you can talk asynchronously to local and remote objects in exactly the same way.

* __Presences__: Presences are our name for the local object that stands in for the remote object. If `obj` is a presence of a remote object, we can send messages to the remote object by using "~." on `obj`, as in the above example.




## More ERTP resources

Mark Miller explained ERTP on Oct 10, 2018 in his [Programming Secure Smart Contracts][watch] presentation
during San Francisco Blockchain Week at a
[SF Cryptocurrency Devs meetup](https://www.meetup.com/SF-Cryptocurrency-Devs/events/253457222/).

[![miller-sfbw-erights](https://user-images.githubusercontent.com/150986/59150095-b8a65200-89e3-11e9-9b5d-43a9be8a3c90.png)][watch]

[watch]: https://www.youtube.com/watch?v=YXUqfgdDbr8
