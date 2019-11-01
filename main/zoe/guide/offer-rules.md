# The Structure of Offer Rules

## Making an offer

In order to make an offer, you must provide two things: the payments
that will be escrowed as part of the offer, and a statement of the
conditions of the offer. This statement, which is approved by the user
in their wallet, is known as the offer rules. 

## Structure of the offer rules

Offer rules are an object with two properties. The first is what we
call the "payout rules," the conditions that determine what kinds of
payouts you are guaranteed to receive when your offer completes. The
second is the "exit rule", the conditions that determine when the user
can cancel their offer. 

```js
const carolsOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantExactly',
      units: ticketAssay.makeUnits(1),
    },
    {
      kind: 'offerAtMost',
      units: dollarAssay.makeUnits(10),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});
```

### Payout Rules

The payout rules are an array with a rule per assay. For instance, in
the above example, we are saying that we want exactly 1 ticket, and we
are willing to offer up to 10 dollars. The payout rules array
currently must be in the same order as the array of assays that the
intended smart contract knows about. Each payout rule has a `kind` and
`units`. The possible kinds are: 'wantExactly', 'wantAtLeast',
'offerExactly', 'offerAtMost'. Units are an ERTP concept and are the
description of what is offered or wanted.

Payout rules are used by Zoe to enforce offer safety. 

### Exit Rule

The Exit Rule is a single object with a kind. The kind may be:
1. 'onDemand': the user can cancel on demand
2. 'afterDeadline': the user's offer is automatically cancelled after
   a deadline. This option requires additional properties: a timer
   object and a deadline.
3. 'noExit': the user agrees that they can't cancel and they are
   relying entirely on the smart contract to complete their offer
   promptly.
