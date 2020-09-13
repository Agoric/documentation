# Atomic Swap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/atomicSwap.js) (Last updated: 12-SEP-2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

If I want to trade one kind of asset for another kind, I could send
you the asset and ask you to send the other kind back. But, you
could behave opportunistically by receiving my asset and giving
nothing back. 

To solve this problem, Zoe-based swap contracts let users 
securely trade one kind of digital asset for another kind. 
By using Zoe for escrow and offer safety, they insure no 
user can ever behave opportunistically.

In our `atomicSwap` contract, anyone can securely swap with a counterparty.
They escrow the to-be-swapped digital assets with Zoe and then send
an invitation to a possible counterparty. Without an invitation to this
particular swap contract instance, you can't be a counterparty.

Let's say Alice wants to swap with Bob as counterparty. She
already has access to the contract's installation, so she
can create a swap instance for this particular transaction.

```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Price: simoleanIssuer,
});
const { creatorInvitation } =
  await E(zoe).startInstance(installation, issuerKeywordRecord);
```

Then Alice escrows her offer with Zoe. She passes in two
things; the actual ERTP payments of her offer, and a
`proposal`. Zoe uses the proposal to protect Alice from the
smart contract (which may have been written by someone else) 
and other participants. 

A proposal has three parts:
- `give` and `want` enforce offer safety.
- `exit` enforces exit safety. 

In this case, Alice's exit rule is `onDemand`, meaning she
can exit the contract instance at any time.

```js
const threeMoola = moolaAmountMath.make(3);
const aliceProposal = harden({
  give: { Asset: threeMoola },
  want: { Price: simoleanAmountMath.make(15) },
  exit: { onDemand: null },
});

const aliceMoola = await E(aliceMoolaPurse).withdraw(threeMoola);
const alicePayment = { Asset: aliceMoola };
```

For Alice to escrow with Zoe, she needs to use her invitation.  
Then she makes her offer and receives a `seat`. The `seat`
gives her access to the offer's outcome and her payouts.

```js
const aliceSeat = await E(zoe).offer(aliceInvite, aliceProposal, alicePayments);
```

This first offer's outcome is an invitation Alice can send to anyone she wants. In
this example, she sends it to Bob.

```js
const invitationP = aliceSeat.getOfferResult();
```
Bob examines the invitation's details to see if they match Alice's claims
about it.

```js
const {
  installation: bobInstallationId,
  instance,
} = E(zoe).getInvitationDetails(invitationP);
  const bobIssuers = E(zoe).getIssuers(instance);

const bobExclusiveInvitation = await invitationIssuer.claim(invitationP);
const bobInvitationValue = await E(zoe).getInvitationDetails(bobExclusiveInvitation);

// Bob does checks
assert(bobInstallationId === installation, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`unexpected Asset issuer`);
assert(bobIssuers.Price === simoleanIssuer, details`unexpected Price issuer`);
assert(moolaAmountMath.isEqual(bobInvitationValue.asset, moola(3)), details`wrong asset`);
assert(simoleanAmountMath.isEqual(bobInvitationValue.price, simoleans(7)), details`wrong price`);

```

Bob decides to exercise the invitation, and to escrow his payments. He then
uses his invitation to make an offer, the same way that Alice used hers. 
But Bob's written his proposal to match Alice's (notice that the `give` 
and `want` clauses are reversed from Alice's proposal):

```js
const sevenSimoleans = simoleanAmountMath.make(7);
const bobProposal = harden({
  want: { Asset: moolaAmountMath.make(3) },
  give: { Price: sevenSimoleans },
  exit: { onDemand: null },
});

const bobPayment = bobSimPurse.withdraw(sevenSimoleans);
// Bob escrows with zoe and makes an offer
const bobSeat = await E(zoe).offer(
  bobExclusiveInvitation,
  bobProposal,
  harden({ Price: bobPayment }),
);
```
Bob has made his offer, so the contract executes. Since Alice
and Bob's offers match, Alice's payouts resolve. She uses her
`seat` to retrieve them. Then she deposits the moola
payout to find out if Zoe returned some of it.

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset');
const alicePricePayout = await aliceSeat.getPayout('Price');
const moolaRefundAmount = aliceMoolaPurse.deposit(alicePricePayout);
const simoleanGainAmount = aliceSimPurse.deposit(aliceAssetPayout);
```

Bob's payout is also available. Since he already knows what Alice's offer was, 
he doesn't need to look for a simolean refund.

```js
const bobAssetPayout = await bobSeat.getPayout('Asset');
const bobMoolaGainAmount = bobMoolaPurse.deposit(bobAssetPayout);
```
