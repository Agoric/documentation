# Automatic Refund

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/automaticRefund.js)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This is a very trivial contract to explain and test Zoe.
AutomaticRefund just gives you back what you put in. AutomaticRefund
tells Zoe to exit the seat, which gives the user their payout
through Zoe. Other contracts will use these same steps, but they will
have more sophisticated logic and interfaces.

Since the contract doesn't attempt any reallocation, the offer can contain
anything in `give` and `want`. The amounts in `give` will be returned, and
`want` will be ignored.