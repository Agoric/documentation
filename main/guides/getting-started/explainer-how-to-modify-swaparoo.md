# Modifying the Swaparoo Smart Contract

To modify the `swapWithFee` contract so that the fee is doubled, you need to use the parameter governance features provided by the Agoric platform. Here's how you can do it:

### Update the contract code to support parameter governance:
- Import the necessary functions from `@agoric/governance/src/contractHelper.js`.
- Define the parameter types for the governed parameters (in this case, `Fee`).
- Modify the `start` function to include `handleParamGovernance` and get the `publicMixin`, `makeDurableGovernorFacet`, and `params`.
- Update the `publicFacet` and `creatorFacet` to include the `publicMixin` and `makeDurableGovernorFacet`.
- Deploy the updated contract code and start the contract instance.

### Set up the committee (electorate) and election manager contracts:
- Deploy the `committee.js` contract from `@agoric/governance` for the electorate.
- Deploy the `econCommitteeCharter.js` contract from `@agoric/inter-protocol` for the election manager.
- Obtain invitations for the committee members and send them to their smart wallets.

### Committee members accept the charter and committee invitations:
- Each committee member uses their smart wallet to redeem the charter invitation and obtain the capability to put a question using `VoteOnParamChange`.
- Each committee member also accepts the committee invitation to obtain the capability to vote.

### A committee member puts a question to double the fee:
- The committee member creates an offer with the necessary `offerArgs`, including the new fee value (doubled) and the deadline.
- The offer is made using the `VoteOnParamChange` capability obtained earlier.

### Other committee members vote on the question:
- Each committee member retrieves the question details from `vstorage` using the `questionHandle`.
- They create an offer to vote on the question using the `makeVoteInvitation` capability obtained earlier.

### Once the deadline is reached and the question carries, the contract governor is notified:
- The contract governor instructs the `swapWithFee` contract to change the fee to the new value (doubled).
- The `swapWithFee` contract updates its parameters and publishes the changes to `vstorage`.

By following these steps and utilizing the parameter governance features provided by Agoric, you can modify the `swapWithFee` contract to double the fee without directly changing the contract code. The changes are made through a governed process involving the committee members and the election manager.

