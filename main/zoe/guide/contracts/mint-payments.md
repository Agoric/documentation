# Mint Payments

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintPayments.js)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This is a very simple contract that creates a new issuer and mints payments
from it, in order to give an example of how that can be done.  This contract
sends new tokens to anyone who has an invitation.

The expectation is that most contracts that want to do something similar
would use the ability to mint new payments internally rather than sharing
that ability widely as this one does.

To pay others in tokens, the creator of the instance can make
invitations for them, which when used to make an offer, will payout
the specified amount of tokens.
