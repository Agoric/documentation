# Modifying the Swaparoo Smart Contract

Imagine a scenario where you wanted to modify the Swaparoo contract so that the contract fee is doubled, and this changed is governed through a voting process. To make these changes, you'll need to make the following edits to the smart contract code:
- Ensure that the `Fee` parameter is included in the `governedParams` section of the `customTermsShape`. This allows the fee to be governed and modified through the contract's governance mechanism. In the Swaparoo contract, the `Fee` parameter is already included in the `governedParams`.
- Utilize the `handleParamGovernance` function to set up the governance for the `Fee` parameter. This function is already being called in the `start` function with the necessary arguments.
- Retrieve the current fee value using `params.getFee()` and use it to create the `feeShape` for the `makeFirstInvitation` function. In the Swaparoo contract code, this is already being done with the line:
```js
const feeShape = makeNatAmountShape(feeBrand, params.getFee().value);
```

- To propose a change to the fee, you'll need to create a new proposal using the contract's governance mechanism. This typically involves calling a method on the `governorFacet` to create a new proposal. For example, you could propose doubling the fee like this:
```js
const newFee = AmountMath.make(feeBrand, params.getFee().value * 2n);
const proposal = {
  paramKey: 'Fee',
  paramValue: newFee,
};
const proposalId = await E(governorFacet).createProposal(proposal);
```
- Once the proposal is created, participants with voting rights can cast their votes on the proposal. The voting process is typically handled by the governance mechanism and may involve calling methods on the `governorFacet` to vote in favor or against the proposal.
- After the voting period ends, the proposal's outcome is determined based on the votes cast. If the proposal passes, the new fee value will be automatically applied to the contract. The exact threshold for a proposal to pass depends on the governance rules defined in the contract.
- The updated fee value will be used for future invocations of the `makeFirstInvitation` function, and the contract will start charging the new fee amount.

Keep in mind that modifying the fee requires the necessary permissions and voting power as defined by the contract's governance rules. Only authorized participants with sufficient voting rights will be able to propose and vote on fee changes.

Here's an example of how you could modify the Swaparoo contract to include a function for proposing a change to the fee:

```js
// ...

export const start = async (zcf, privateArgs, baggage) => {
  // ...

  const { publicMixin, makeDurableGovernorFacet, params } =
    await handleParamGovernance(
      zcf,
      privateArgs.initialPoserInvitation,
      paramTypes,
      privateArgs.storageNode,
      privateArgs.marshaller,
    );

  // ...

  const publicFacet = Far('Public', {
    makeFirstInvitation,
    ...publicMixin,
  });
  const limitedCreatorFacet = Far('Creator', {
    makeCollectFeesInvitation() {
      return makeCollectFeesInvitation(zcf, feeSeat, feeBrand, 'Fee');
    },
    async proposeFeeChange(newFeeValue) {
      const newFee = AmountMath.make(feeBrand, newFeeValue);
      const proposal = {
        paramKey: 'Fee',
        paramValue: newFee,
      };
      const proposalId = await E(governorFacet).createProposal(proposal);
      return proposalId;
    },
  });
  const { governorFacet } = makeDurableGovernorFacet(
    baggage,
    limitedCreatorFacet,
  );
  return harden({ publicFacet, creatorFacet: governorFacet });
};
```

In this modified version, a new method called `proposeFeeChange` is added to the `limitedCreatorFacet`. This method takes a `newFeeValue` parameter, which represents the proposed new fee value.

Inside the `proposeFeeChange` method:
- The `newFee` amount is created using `AmountMath.make` with the `feeBrand` and the `newFeeValue`.
- A proposal object is created with the paramKey set to `'Fee'` and the paramValue set to the `newFee` amount.
- The `createProposal` method is called on the `governorFacet` with the proposal object, which creates a new proposal for changing the fee.
- The `proposalId` returned by `createProposal` is then returned from the `proposeFeeChange` method.
- To propose a change to the fee, you can now call the `proposeFeeChange` method on the `creatorFacet` with the desired new fee value. For example:
```js
const creatorFacet = await E(publicFacet).getCreatorFacet();
const proposalId = await E(creatorFacet).proposeFeeChange(2n * params.getFee().value);
```
- This code proposes changing the fee to double its current value.
