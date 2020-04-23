# Second-price auction

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/958a2c0a3dec38bdba2234934119ea2c28958262/packages/zoe/src/contracts/publicAuction.js) (Last updated: 4/22/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

In a second-price auction, the winner is the participant with the
highest bid, but the winner only pays the price corresponding to the
second highest bid. Second-price auctions must have sealed (i.e.
private) bids to have the right economic incentives, so this version,
which is entirely public, should not be used in production for real
items.

## Public second-price auction

In this particular "public" second-price auction, anyone who has
access to the auction instance can make a bid by making a proposal.

Alice can create an auction from an existing second-price auction
installation. (`installationHandle` is the unique, unforgeable
identifier for the installation.)

```js
const numBidsAllowed = 3;

const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Bid: simoleanIssuer,
});

const terms = harden({ numBidsAllowed });

const aliceInvite = await zoe.makeInstance(
  installationHandle,
  issuerKeywordRecord,
  terms,
);
```

She can put up something at auction by first escrowing it with Zoe. In
order to escrow something with Zoe, she needs to provide a payment for
what she wants to put up at auction, and she needs to make a
`proposal`. The `proposal` will be enforced by Zoe and will protect
Alice from misbehavior by the smart contract and other participants.
`want` and `give` are used to enforce offer safety, and `exit` is used
to enforce payout liveness. If no `exit` rule is given, as in this
example, the default (`{ onDemand: null }`) is used.

```js
const aliceProposal = harden({
  give: { Asset: moola(1) },
  want: { Bid: simoleans(3) },
});

const alicePayments = { Asset: aliceMoolaPayment };

const { outcome: aliceOfferResult, payout: alicePayoutP } = await E(zoe).offer(
  aliceInvite,
  aliceProposal,
  alicePayments,
);
```

Now Alice can spread her invite far and wide and see if
there are any bidders. Let's say that Bob gets the invite and
wants to see if it is the kind of contract that he wants to join. He
can check that the installationHandle installed is the swap he is expecting. He can also check that the item up for sale is the kind that he wants by comparing the issuers.

```js
// Bob collects information about the swap
const inviteIssuer = zoe.getInviteIssuer();
const bobExclusiveInvite = await inviteIssuer.claim(bobInvite);
const bobInviteExtent = inviteIssuer.getAmountOf(bobExclusiveInvite)
  .extent[0];

const {
  installationHandle: bobInstallationId,
  issuerKeywordRecord: bobIssuers,
} = zoe.getInstance(bobInviteExtent.instanceHandle);

// Bob checks the information is what he expects
assert(bobInstallationId === installationHandle, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong issuer`);
```

Bob decides to join the contract and
makes an offer:

```js
const bobProposal = harden({
  give: { Bid: simoleans(11) },
  want: { Asset: moola(1) },
});

const bobPayments = { Bid: bobSimoleanPayment };

// Bob escrows with Zoe and bids
const { outcome: bobOfferResult, payout: bobPayoutP } = await E(zoe).offer(
  bobExclusiveInvite,
  bobProposal,
  bobPayments,
);

```

Since multiple parties may want to participate in the auction, let's say that Carol and Dave also decide to bid in the same way
as Bob- Carol bidding 7 simoleans, and Dave bidding 5 simoleans.

Bob wins since he bid 11 simoleans, but pays the second-highest price, which is Carol's bid of 7
simoleans. Thus, when Alice claims her winnings, she gets 7 simoleans.
Bob gets the 1 moola that was up for auction as well as a refund of 4
simoleans (11-7), and Carol and Dave get a full refund.
