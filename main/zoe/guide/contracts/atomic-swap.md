# Atomic Swap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/atomicSwap.js) (Last updated: 9/12/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

::: tip Out-of-date status
Zoe's master branch is currently an Alpha release candidate. This doc and its underlying contract are in the process of being updated, and should be current with the release candidate in another few days. What you see here is out of date. We apologize for any inconvenience this may cause.
:::

If I want to trade one kind of asset for another kind, I could send
you the asset and ask you to send me the other kind back. But, you
could choose to behave opportunistically: receive my asset and give
nothing back. To solve this problem, swap contracts allow users to
securely trade one kind of digital asset for another kind, leveraging Zoe for
escrow and offer safety. At no time does any user have the ability to
behave opportunistically.

In the `atomicSwap` contract, anyone can securely swap with a counterparty by escrowing digital assets with Zoe and sending an invitation to the counterparty.

Let's say that Alice wants to swap with Bob as the counterparty. She
already has access to the installation of the contract, so she
can create a swap instance:

```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Price: simoleanIssuer,
});
const { creatorInvitation } =
  await E(zoe).startInstance(installation, issuerKeywordRecord);
```

Then she escrows her offer with Zoe. When she escrows, she passes in two
things, the actual ERTP payments that are part of her offer, and a
`proposal`. The proposal will be used by Zoe to protect Alice from the
smart contract and other participants. The proposal has three parts:
`give` and `want`, which are used for enforcing offer safety, and `exit`,
which is used to enforce exit safety. In this case, Alice's exit rule is
`onDemand`, meaning that she can exit at any time.

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

In order for Alice to escrow with Zoe she needs to use her invite.  Once
Alice uses her invite and makes her offer she will receive a `seat`, which
gives her access to the outcome of the offer and to her payouts.

```js
const aliceSeat = await E(zoe).offer(aliceInvite, aliceProposal, alicePayments);
```

The outcome of the first offer is an invite Alice can send to Bob:

```js
const invitationP = aliceSeat.getOfferResult();
```

She then sends the invite to Bob and he examines the invite to see if it
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

Bob decides to exercise the invitation. He escrows his payments and uses
his invite to make an offer in the same way as Alice, but his `Proposal` is
designed to match Alice's (notice that the `give` and `want` clauses are
reversed from Alice's proposal):

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
resolve. She can retrieve them using the seat. She deposits the moola
payout to find out if zoe returned some of it.

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset');
const alicePricePayout = await aliceSeat.getPayout('Price');
const moolaRefundAmount = aliceMoolaPurse.deposit(alicePricePayout);
const simoleanGainAmount = aliceSimPurse.deposit(aliceAssetPayout);
```

Bob's payout is also available. Since he already knows what Alice's offer was, he doesn't have to look for a simolean refund.

```js
const bobAssetPayout = await bobSeat.getPayout('Asset');
const bobMoolaGainAmount = bobMoolaPurse.deposit(bobAssetPayout);
```
