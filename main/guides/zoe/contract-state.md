# State Smart Contract

In our first `greetings` smart contract, we created a `greet` function and exposed it using `publicFacet` so that it can be remotely called. However, if you notice, there is no state in our smart contract that is preserved between calls. Contracts can use ordinary variables and data structures for state. 

In our second example smart contract, we will manage a list of rooms. We want everyone with access to `publicFacet` to be able to create a new room, and also get current count of rooms. We maintain state using `Map` data structure as below:

<<< @/../snippets/zoe/src/02-state.js#rooms-map

Anyone can add new rooms by making a call to `makeRoom` which is defined as:

<<< @/../snippets/zoe/src/02-state.js#makeRoom

Using `makeRoom` changes the results of the following call to `getRoomCount` which returns the number of rooms:

<<< @/../snippets/zoe/src/02-state.js#getRoomCount

Putt it all together:

<<< @/../snippets/zoe/src/02-state.js#state-contract

Let us save this contract as `02-state.js` and creating a simple test to validate its functionality: 

<<< @/../snippets/zoe/contracts/test-zoe-hello.js#test-state

This test asserts that in the beginning the number of rooms is zero and after a call to `makeRoom`, the number of rooms changes to one.

::: tip Heap state is persistent

Ordinary heap state persists between contract invocations.

We'll discuss more explicit state management for
large numbers of objects (_virtual objects_) and
objects that last across upgrades ([durable objects](./contract-upgrade#durability)) later.

:::