
## Access Control with Objects

We can limit the `publicFacet` API to read-only by omitting the `set()` method.

The `creatorFacet` is provided only to the caller who creates the contract instance.

<<< @/../snippets/zoe/src/03-access.js

Trying to `set` using the `publicFacet` throws, but
using the `creatorFacet` works:

<<< @/../snippets/zoe/contracts/test-zoe-hello.js#test-access

Note that the `set()` method has no access check inside it.
Access control is based on separation of powers between
the `publicFacet`, which is expected to be shared widely,
and the `creatorFacet`, which is closely held.
_We'll discuss this [object capabilities](../js-programming/hardened-js#object-capabilities-ocaps) approach more later._

Next, let's look at minting and trading assets with [Zoe](../zoe/).
