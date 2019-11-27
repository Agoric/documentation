# Other Concepts

When looking at the code in our [tests](https://github.com/Agoric/ERTP/tree/master/test), you might see some new
concepts:

* __Vats__: All user code runs in what we call a vat. Within a vat, code is run synchronously. Communication with another vat happens asynchronously. The [SwingSet infrastructure](https://github.com/Agoric/SwingSet) creates the vats and makes communication between vats possible.

* __E() and tildot (~.)__: Instead of `obj.foo()`, we can write `E(obj).foo()` or the syntactic sugar, `obj~.foo()` and get a promise for the result. The syntax means "deliver the message foo() to the actual object asynchronously, in its own turn, wherever and whenever it is, even if it is local." Using `E` or `~.`, you can talk asynchronously to local and remote objects in exactly the same way.

* __Presences__: Presences are our name for the local object that stands in for the remote object. If `obj` is a presence of a remote object, we can send messages to the remote object by using "~." on `obj`, as in the above example.


## Security Properties

How does Alice know that she got paid real money? She could have been
sent fake money, or she could have been sent money that was
[double-spent](https://en.wikipedia.org/wiki/Double-spending).

When alice receives an alleged payment, she can call a method to know
that the alleged payment was valid, and get a new payment that is
exclusively hers:

```js
const myExclusivePayment = BaytownBucksIssuer.claimAll(allegedPayment);
```

The BaytownBucksIssuer is associated with the BaytownBucksMint, but
the issuer is the public-facing version that is accessible to anyone.
By holding the reference to a mint, you can mint more tokens. By
holding a reference to the issuer for a mint, you can check that a
payment is valid and exclusively claim it in a new payment to yourself.

That's the basic use case for a fungible token. `makeMint` in
[issuers.js](core/issuers.js) takes
in an optional configuration that allows for many more possibilities.
