# Second-price auction

<Zoe-Version/>

In a second-price auction, the winner is the participant with the
highest bid, but the winner only pays the price corresponding to the
second highest bid. Second-price auctions must have sealed (i.e.
private) bids to have the right economic incentives, so this version,
which is entirely public, should not be used in production for real
items.

## Public second-price auction

In this particular "public" second-price auction, anyone who has
access to the auction instance can make a bid by making an offer.

Alice can create an auction from an existing second-price auction
installation. (`installationHandle` is the unique, unforgeable
indentifier for the installation.)

```js
const aliceInvite = await zoe.makeInstance( installationHandle, keywords, {
    assays,
    numBidsAllowed: 3
  },
);
```

She can put up something at auction by first escrowing it with Zoe. In
order to escrow something with Zoe, she needs to provide a payment for
what she wants to put up at auction, and she needs to decide what her
`offerRules` are. The `offerRules` will be enforced by Zoe and will
protect Alice from misbehavior by the smart contract and other
participants. `payoutRules` are used to enforce offer safety, and
`exitRule` is used to enforce payout liveness.

```js
const aliceOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerAtMost',
      units: moolaAssay.makeUnits(1),
    },
    {
      kind: 'wantAtLeast',
      units: simoleanAssay.makeUnits(3),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});

const alicePayments = [aliceMoolaPayment, undefined];

const { seat: aliceSeat, payout: alicePayoutP } = await zoe.redeem(
  aliceInvite,
  aliceOfferRules,
  alicePayments,
);
```
Note that in this implementation, the item that will be auctioned is
described at index 0 of the `payoutRules` array, and Alice's minimum
bid `units` is at index 1 in the `payoutRules` array.

Once Alice has redeemed her invite, she can start the auction by making the first offer in the swap:
```js
const bobInviteP = aliceSeat.makeFirstOffer();
```

Now Alice can spread her invite far and wide and see if
there are any bidders. Let's say that Bob gets the invite and
wants to see if it is the kind of contract that he wants to join. He
can check that the installationHandle installed is the swap he is expecting. He can also check that the item up for sale is the kind that he wants by comparing the assays.

```js
// Bob collects information about the swap
const inviteAssay = zoe.getInviteAssay();
const bobExclusiveInvite = await inviteAssay.claimAll(bobInviteP);
const bobInviteExtent = bobExclusiveInvite.getBalance().extent;
const {
  installationHandle: bobInstallationId,
  terms: bobTerms,
} = zoe.getInstance(bobInviteExtent.instanceHandle);

// Bob checks the information is what he expects
insist(bobInstallationId === installationHandle)`wrong installation`;
insist(bobTerms.assays[0] === inviteAssay)`wrong assay`
```

Bob decides to join the contract and
makes an offer:

```js
const bobOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: moolaAssay.makeUnits(1),
    },
    {
      kind: 'offerAtMost',
      units: simoleanAssay.makeUnits(11),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
);

const bobPayments = [undefined, bobSimoleanPayment];

const { seat: bobSeat, payout: bobPayoutP } = await zoe.redeem(
  bobExclusiveInvite,
  bobOfferRules,
  bobPayments,
);

const bobOfferResult = await bobSeat.matchOffer();
```

Since multiple parties may want to participate in the auction, let's say that Carol and Dave also decide to bid in the same way
as Bob, Carol bidding 7 simoleans, and Dave bidding 5 simoleans.

Bob wins since he bid 11 simoleans, but pays the second-highest price, which is Carol's bid of 7
simoleans. Thus, when Alice claims her winnings, she gets 7 simoleans.
Bob gets the 1 moola that was up for auction as well as a refund of 4
simoleans (11-7), and Carol and Dave get a full refund.
