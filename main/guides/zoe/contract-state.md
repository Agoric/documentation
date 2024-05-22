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