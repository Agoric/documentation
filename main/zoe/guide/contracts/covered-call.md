# Covered Call

The covered call contract is like a swap, but with one major
difference. The covered call contract allows a user to issue an invite
to make an offer representing the other side of the swap. This invite
is itself an ERTP payment which can be escrowed and used in a
contract, allowing for "higher order" contracts.

## Making an offer

The first offer is just like the first offer in the public swap.
However, what the user gets back is different. In the public swap, the
user only receives a message back about whether their offer was
accepted or not. In the coveredCall, the user who submits the first
offer gets an outcome message but also an invite ERTP payment.

```js
const {
  outcome,
  invite,
} = await coveredCall.makeFirstOffer(escrowReceipt);
```

This invite is a full ERTP payment can be escrowed and used in other
contracts. For instance, if Alice is the user to makes the first
offer and gets an invite in return, she can send it to Bob, who can
either use it himself or sell it in another contract, say, a public
swap:

```js
const inviteAssay = zoe.getInviteAssay();
const bobExclInvitePayment = await inviteAssay.claimAll(bobInvitePayment);

// Let's imagine that Bob wants to create a swap to trade this
// invite for bucks.
const {
  instance: bobSwap,
  instanceHandle: bobSwapInstanceHandle,
} = await zoe.makeInstance(swapInstallationId, {
  assays: harden([inviteAssay, bucksAssay]),
});

// Bob wants to swap an invite with the same units as his
// current invite from Alice. He wants 1 buck in return.
const bobOfferRulesSwap = harden({
  payoutRules: [
    {
      kind: 'offerExactly',
      units: bobExclInvitePayment.getBalance(),
    },
    {
      kind: 'wantExactly',
      units: bucksAssay.makeUnits(1),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});

const bobPayments = [bobExclInvitePayment, undefined];
```

## Buying an invite

Now if Dave is interested in buying the invite, he can check the
balance of the invite to see what contract it is for, and any
contract-provided information about what the invite can be used for.
This coveredCall creates invites with the units:

```js
{
  label: {
    assay: Object, allegedName: "zoeInvite"
  },
  extent: {
     instanceHandle: Object,
     handle: Object,
     offerMadeRules: Object,
     offerToBeMade: Array,
  }
}
```
The instanceHandle can be passed to `zoe.getInstance(instanceHandle)`
to credibly get more information about the smart contract, including
the installation code and the terms of the contract. This coveredCall
also inserted information about what offer has been made and what
offer it expects to make. This information could be different
depending on what the smart contract wants to express.

## Unwrap the payment
Once a user has an invite and decides to use it, they can `unwrap` the
invite ERTP payment, which burns the payment and exposes an object on
which they can talk to the smart contract. In this case, the object
has one method, `matchOffer`, which allows the user to make an offer
to match the first offer. You can imagine that other contracts will
make invites to take other actions with the smart contract. Thus, the
invite use objects are like a private interface to the contract that
can be traded and paid for.
