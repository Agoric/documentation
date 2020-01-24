# Swaps

If I want to trade one kind of asset for another kind, I could send
you the asset and ask you to send me the other kind back. But, you
could choose to behave opportunistically: receive my asset and give
nothing back. To solve this problem, swap contracts allow users to
securely trade one kind of eright for another kind, leveraging Zoe for
escrow and offer safety. At no time does any user have the ability to
behave opportunistically.

## Atomic Swap

In the `atomicSwap` contract, anyone can securely swap with a counterparty by escrowing digital assets with Zoe and sending an invite to the swap to the counterparty.

Let's say that Alice wants to swap with Bob as the counterparty.  She knows that the code for the swap has already
been installed, so she can create a swap instance from the swap
installation (`handle` is the unique, unforgeable identifier):

```js
const newInvite = await zoe.makeInstance(installationHandle, { assays });
```

Then she escrows her offer with Zoe. When she escrows, she passes in
two things, the actual ERTP payments that are part of her offer, and
an object called `offerRules`. The `offerRules` will be used by Zoe to
protect Alice from the smart contract and other participants. The
`offerRules` have two parts: `payoutRules`, which is used for
enforcing offer safety, and `exitRule,` which is used to enforce
exit safety. In this case, Alice's exit rule is `onDemand`, meaning
that she can exit at any time.

```js
const aliceOfferRules = harden(
  payoutRules: [
  {
    kind: 'offerAtMost',
    units: moolaAssay.makeUnits(3),
  },
  {
    kind: 'wantAtLeast',
    units: simoleanAssay.makeUnits(7),
  },
  exitRule: {
    kind: 'onDemand',
  },
]);
const alicePayments = [aliceMoolaPayment, undefined];
```

In order for Alice to escrow with Zoe she needs to redeem her invite. Once Alice redeems her invite she will receive a `seat` and a promise that resolves to her payout.

```js
const { seat: aliceSeat, payout: alicePayoutP } = await zoe.redeem(
  aliceInvite,
  aliceOfferRules,
  alicePayments,
);
```

Alice then makes the first offer in the swap:

```js
const newInviteP = aliceSeat.makeFirstOffer();
```

She then sends the invite to Bob and he looks up the invite to see if it matches Alice's claims.

```js
const inviteAssay = zoe.getInviteAssay();
const bobExclusiveInvite = await inviteAssay.claimAll(newInviteP);
const bobInviteExtent = bobExclusiveInvite.getBalance().extent;

const {
  installationHandle: bobInstallationId,
  terms: bobTerms,
} = zoe.getInstance(bobInviteExtent.instanceHandle);


// Bob does checks
insist(bobInstallationId === installationHandle)`wrong installation`;
insist(bobTerms.assays[0] === inviteAssay)`wrong assays`;
insist(bobInviteExtent.offerMadeRules === aliceOfferRules.payoutRules)`wrong payoutRules`;
```

Bob decides to be the counter-party. He also escrows his payments and redeems his invite to
make an offer in the same way as Alice, but his `offerRules` match Alice's:

```js
const bobOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: bobAssays[0].makeUnits(3),
    },
    {
      kind: 'offerAtMost',
      units: bobAssays[1].makeUnits(7),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  }
);
const bobPayments = [undefined, bobSimoleanPayment];

// Bob escrows with zoe
const { seat: bobSeat, payout: bobPayoutP } = await zoe.redeem(
  bobExclusiveInvite,
  bobOfferRules,
  bobPayments,
);

// Bob makes an offer
const bobOfferResult = await bobSeat.matchOffer();
```

Now that Bob has made his offer, Alice's `payout` resolves to an array
of ERTP payments `[moolaPayment, simoleanPayment]` where the
moolaPayment is empty, and the simoleanPayment has a balance of 7.

The same is true for Bob, but for his specific payout.

```js
const bobPayout = await bobPayoutP;
const alicePayout = await alicePayoutP;

const [bobMoolaPayout, bobSimoleanPayout] = await Promise.all(bobPayout);
const [aliceMoolaPayout, aliceSimoleanPayout] = await Promise.all(
  alicePayout,
);
```
