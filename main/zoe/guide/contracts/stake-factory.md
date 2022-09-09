# Stake Factory
<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/50cd3e240fb33079948fa03b32bda86276879b4a/packages/inter-protocol/src/stakeFactory/stakeFactory.js#L16) (Last updated: Sept 8, 2022)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

In addition to brands and issuers for `Staked`, `Minted`, and attestation,
terms of the contract include a periodic `InterestRate`
plus a `LoanFee` proportional to the amount borrowed, as well as
a `MintingRatio` of funds to (mint and) loan per unit of staked asset.
These terms are subject to change by the `Electorate`
and `electionManager` terms.

As in vaultFactory, `timerService` provides the periodic signal to
charge interest according to `chargingPeriod` and `recordingPeriod`.

The public facet provides access to invitations to get a loan
or to return an attestation in order to release a lien on staked assets.

To take out a loan, get an `AttestationMaker` for your address from
the creator of this contract, and use
`E(attMaker).makeAttestation(stakedAmount)` to take out a lien
and get a payment that attests to the lien. Provide the payment
in the `Attestation` keyword of an offer,
using `{ want: { Debt: amountWanted }}`.

Then, using the invitationMakers pattern, use `AdjustBalances` to
pay down the loan or otherwise adjust the `Debt` and `Attestation`.

Finally, `Close` the loan, providing `{ give: Debt: debtAmount }}`