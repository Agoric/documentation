# The Structure of Proposals

<Zoe-Version/>

## Making an offer

In order to make an offer, you must provide two things: the payments
that will be escrowed as part of the offer, and a statement of the
conditions of the offer. This statement, which is approved by the user
in their wallet, is known as the proposal.

## Structure of the proposal

Proposals are objects with `give`, `want` and `exit` keys.

`give` and `want` utilize keywords defined by the contract.
Keywords are unique identifiers per contract, that tie together the proposal,
payments to be escrowed, and payouts to the user.
In the example below, "Asset" and "Price" are the keywords. In an auction, however,
the keywords might be "Asset" and "Bid".

`exit` determines when the user can cancel their offer. The possible kinds are:
1. 'onDemand': the user can cancel on demand
2. 'afterDeadline': the user's offer is automatically cancelled after
   a deadline. This option requires additional properties: a timer
   object and a deadline.
3. 'waived': the user agrees that they can't cancel and they are
   relying entirely on the smart contract to complete their offer
   promptly.

```js
const carolsProposal = harden({
  give: { Asset: moola(4 )},
  want: { Price: simoleans(15) },
  exit: { afterDeadline: {
    timer,
    deadline: 100,
  }}
})
```

