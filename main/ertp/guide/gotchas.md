# Gotchas

When looking at the code in our [tests](https://github.com/Agoric/ERTP/tree/master/test), you might see some new
concepts:

* __Vats__: All user code runs in what we call a `vat`. Within a vat,
  code is run synchronously. Communication with another vat happens
  asynchronously. The [SwingSet
  infrastructure](https://github.com/Agoric/SwingSet) creates the vats
  and makes communication between vats possible.

* __E() and infix bang (!)__: Instead of `obj.foo()`, we can write
  `E(obj).foo()` or the syntactic sugar, `obj!foo()` and get a promise
  for the result. The syntax means "deliver the message foo() to the
  actual object asynchronously, in its own turn, wherever and whenever
  it is, even if it is local." Using E or !, you can talk
  asynchronously to local and remote objects in exactly the same way,
  which is really cool!

* __Presences__: Presences are our name for the local object that
  stands in for the remote object. If `obj` is a presence of a remote
  object, we can send messages to the remote object by using
  "!" on `obj`, as in the above example.