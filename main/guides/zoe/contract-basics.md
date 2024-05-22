# Smart Contract Basics

Before we look at how to make a contract such as the one in [the
basic dapp](../getting-started/) in the previous section, let's cover some basics by writing a simple contract that returns a greetings message. We will simply call it _greetings smart contract_. 

A contract is defined by a JavaScript module that exports a `start` function. For our greetings smart contract, the declaration of `start` function looks like this:

<<< @/../snippets/zoe/src/01-hello.js#start

For the greetings smart contract, we will have a simple `greet` function apart from `start` function. The `greet` function takes a string as a parameter (for example, name of the person calling the function) and returns a customized greeting message.

<<< @/../snippets/zoe/src/01-hello.js#greet

The `greet` function, along with any other public function, must be made accessible through the `publicFacet` of the contract. The `publicFacet` is returned by the `start` function, which initializes the contract. In the greeting contract, the `start` function exposes the `greet` function by defining it as a method of the contract's `publicFacet`, as shown below:

<<< @/../snippets/zoe/src/01-hello.js#publicFacet

We wrap the `greet` function in a `Far(...)` call to safely expose it as a remote object, accessible from outside the contract.
We also give it a suggestive interface name `Hello` for debugging.
_We'll discuss [Far in more detail](../js-programming/far) later._

Putting it all together:

<<< @/../snippets/zoe/src/01-hello.js#contract

Let us save this code to a file named `01-hello.js` inside `src` directory. 
## Using, testing a contract

Before we deploy or start our contract, it is usually a good idea to run a few tests to validate its correctness. Agoric contracts are typically tested using the [ava](https://github.com/avajs/ava) framework. The test file begins with an `import @endo/init` to establish a [Hardened JavaScript](../js-programming/hardened-js) environment as below:

<<< @/../snippets/zoe/contracts/test-zoe-01-hello.js#test-imports

We also import `E()` in order to make asynchronous method calls and `test` function from `ava`. _We'll talk more about [using `E()` for async method calls](../js-programming/eventual-send) later._ Also note the `eslint-disable-next-line` comment on line 3; this is needed in order to suppress an error that arises due to a known issue in `ava`.

Following these `import` statements, we write a simple test that validates that the `greet` method works as expected as below:

<<< @/../snippets/zoe/contracts/test-zoe-01-hello.js#test1


Putting it all together:

<<< @/../snippets/zoe/contracts/test-zoe-01-hello.js#test-01-hello

Let's save this code in a file named `test-01-hello.js` in a `test` directory. Both `src` and `test` directories should lie in the same `contract` directory. Let us run the following command to execute the test:

```sh
npx ava --match="contract greets by name"
```
You should see the following line towards the end of the output:
```
1 test passed
```
Congratulations! You have written and tested your first smart contract. Our next goal is to deploy this contract on the local blockchain and make it more interesting by adding some business logic.

See also:

- [\$LOCKDOWN_OPTIONS for better diagnositcs](https://github.com/Agoric/agoric-sdk/wiki/Developing-with-better-error-diagnostics)
- [\$DEBUG](https://github.com/Agoric/agoric-sdk/blob/master/docs/env.md#debug)
- [\$TRACK_TURNS](https://github.com/Agoric/agoric-sdk/blob/master/docs/env.md#track_turns)

## State

Contracts can use ordinary variables and data structures for state.

<<< @/../snippets/zoe/src/02-state.js#startfn

Using `makeRoom` changes the results of the following call to `getRoomCount`:

<<< @/../snippets/zoe/contracts/test-zoe-hello.js#test-state

::: tip Heap state is persistent

Ordinary heap state persists between contract invocations.

We'll discuss more explicit state management for
large numbers of objects (_virtual objects_) and
objects that last across upgrades ([durable objects](./contract-upgrade#durability)) later.

:::

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
