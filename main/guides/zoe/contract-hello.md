# Greetings Smart Contract

Before we look at how to make a contract such as the one in [the
basic dapp](../getting-started/) in the previous section, let's cover some basics by writing a simple contract that returns a greetings message. We will simply call it _hello-world smart contract_. 

A contract is defined by a JavaScript module that exports a `start` function. For our hello-world smart contract, the declaration of `start` function looks like this:

<<< @/../snippets/zoe/src/01-hello.js#start

For the hello-world smart contract, we will have a simple `greet` function apart from `start` function. The `greet` function takes a string as a parameter (for example, name of the person calling the function) and returns a customized greeting message.

<<< @/../snippets/zoe/src/01-hello.js#greet

The `greet` function, along with any other public function, must be made accessible through the `publicFacet` of the contract. The `start` function returns an object with a `publicFacet` property. In the hello-world contract, the `start` function exposes the `greet` function by defining it as a method of the contract's `publicFacet`, as shown below:

<<< @/../snippets/zoe/src/01-hello.js#publicFacet

We wrap the value of the `publicFacet` property in a `Far(...)` call to safely expose it as a remote object, accessible from outside the contract. This also gives it a suggestive interface name `Hello` for debugging.
_We'll discuss [Far in more detail](../js-programming/far) later._

Putting it all together:

<<< @/../snippets/zoe/src/01-hello.js#contract

Let us save this code to a file named `01-hello.js` inside `src` directory. 

## Using, testing a contract

Agoric contracts are typically tested using the [ava](https://github.com/avajs/ava) framework. The test file begins with an `import @endo/init` to establish a [Hardened JavaScript](../js-programming/hardened-js) environment. We also import `E()` in order to make asynchronous method calls and `test` function from `ava`. _We'll talk more about [using `E()` for async method calls](../js-programming/eventual-send) later._ Following these `import` statements, we write a simple test that validates that the `greet` method works as expected.

Putting it all together:

<<< @/../snippets/zoe/contracts/test-zoe-01-hello.js#test-01-hello

Let's save this code in a file named `test-01-hello.js` in a `test` directory. Both `src` and `test` directories should lie in the same `contract` directory. Let us run the following command to execute the test:

```sh
yarn ava --match="contract greets by name"
```
You should see the following line towards the end of the output:
```
1 test passed
```
Congratulations! You have written and tested your first smart contract. Our next goal is to learn about the state of a smart contract.

See also:

- [\$LOCKDOWN_OPTIONS for better diagnositcs](https://github.com/Agoric/agoric-sdk/wiki/Developing-with-better-error-diagnostics)
- [\$DEBUG](https://github.com/Agoric/agoric-sdk/blob/master/docs/env.md#debug)
- [\$TRACK_TURNS](https://github.com/Agoric/agoric-sdk/blob/master/docs/env.md#track_turns)
