# Mint Payments Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/4e0aece631d8310c7ab8ef3f46fad8981f64d208/packages/zoe/src/contracts/mintPayments.js) (Last updated: Jan 31, 2022)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

This very simple contract shows how to create a new issuer kit and
mint payments from it. The contract pays out new tokens to anyone who
has an invitation.

The expectation is that most contracts that want to manage a new issuer
would use the ability to mint new payments internally rather than sharing
that ability widely as this one does.

To pay others in tokens, the instance creator first makes
invitations for them. They use them to make an offer, which pay out
the specified token amount.
