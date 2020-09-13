# Atomic Swap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/atomicSwap.js) (Last updated: 12-SEP-2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

If I want to trade one kind of asset for another kind, I could send
you the asset and ask you to send me the other kind back. But, you
might behave opportunistically and receive my asset then give
nothing back. To solve this problem, swap contracts let users trade
one kind of digital asset for another kind, using Zoe for
escrow and offer safety. No user can ever behave opportunistically.

In the `atomicSwap` contract, anyone can securely swap with a counterparty
by escrowing digital assets with Zoe and sending an invitation to the counterparty.

Let's say Alice wants to swap with Bob as the counterparty. She
already has access to the contract installation, so she
creates a swap instance:

```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Price: simoleanIssuer,
});
const { creatorInvitation } =
  await E(zoe).startInstance(installation, issuerKeywordRecord);
```

Next she escrows her offer with Zoe. She passes in a `proposal`
and the actual ERTP payments that are part of her offer. 
Zoe uses the proposal to protect Alice from the
smart contract and other participants. 

The proposal has three parts;
`give` and `want`, which enforce offer safety, and `exit`,
which enforces exit safety. Here, Alice's exit rule is
`onDemand`, so she can exit at any time.

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

For Alice to escrow with Zoe, she needs to use her invitation.  After
using her invitation and making her offer, she receives a `seat`, 
giving her access to the offer's outcome and her payouts.

```js
const aliceSeat = await E(zoe).offer(aliceInvite, aliceProposal, alicePayments);
```

The first offer's outcome is an `invitation` Alice sends to Bob:

```js
const invitationP = aliceSeat.getOfferResult();
```

Bob receives the invitation and checks to see if it
matches Alice's claims.

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

Bob exercises the invitation. He escrows his payments and uses
his invitation to make an offer the same way as Alice, but his `Proposal` matches
Alice's (note that the `give` and `want` clauses are reversed from Alice's proposal):

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

Now that Bob has made his offer, the contract executes and Alice's payouts
resolve. She can retrieve them using her seat. She deposits the moola
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
