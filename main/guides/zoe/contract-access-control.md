
# Access Control with Objects

In our third smart contract, we will demostrate how to control access to different functions of a smart contract. So far, we have only used `publicFacet` to expose all functions. There is an other facet, called `creatorFacet` that is provided only to the caller who creates the contract instance. 
In this smart contract, we 
limit the `publicFacet` API to a read-only function `get()`, and use `creatorFacet` API to expose the `set()` method to the caller who creates the contract instanace. 

Here is the complete code for `03-access.js` smart contract:
 
<<< @/../snippets/zoe/src/03-access.js#access-contract

We can write a simple test as below to make sure that trying to `set` using the `publicFacet` throws an exception, but using the `creatorFacet` works:

<<< @/../snippets/zoe/contracts/test-zoe-hello.js#test-access

Note that the `set()` method has no access check inside it. Access control is based on separation of powers between the `publicFacet`, which is expected to be shared widely, and the `creatorFacet`, which is closely held. _We'll discuss this [object capabilities](../js-programming/hardened-js#object-capabilities-ocaps) approach more later._

Next, let's look at minting and trading assets with [Zoe](../zoe/).
