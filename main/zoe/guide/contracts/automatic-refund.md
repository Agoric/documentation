# Automatic Refund

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/4e0aece631d8310c7ab8ef3f46fad8981f64d208/packages/zoe/src/contracts/automaticRefund.js) (Last updated: Jan 31, 2022)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

This is a very trivial contract to explain and test Zoe.
AutomaticRefund just gives you back what you put in. AutomaticRefund
tells Zoe to exit the seat, which gives the user their payout
through Zoe. Other contracts use these same steps, but they
have more sophisticated logic and interfaces.

Since the contract doesn't attempt any reallocation, the offer can contain
anything in `give` and `want`. The amounts in `give` will be returned, and
`want` will be ignored.
