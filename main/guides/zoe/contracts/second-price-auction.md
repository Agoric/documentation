# Second-Price Auction Contract

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/auction/index.js) (winner-selection logic: [`secondPriceLogic.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/auction/secondPriceLogic.js))

##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

In a second-price auction, the winner is the participant with the highest bid, but
the winner only pays the price corresponding to the second highest
bid. <b>Second-price auctions must have sealed (i.e. private) bids to have the
touted economic incentives, so this version, which is entirely public, should not be
used in production for real valuables.</b> It's a demonstration that auctions under
Zoe can enforce different rules about how prices are calculated, or how winners are
selected.

This is one winner-price option of a shared `auction` contract; the other,
`first-price`, is implemented by the sibling
[`firstPriceLogic.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/auction/firstPriceLogic.js).
An auction contract is one in which the seller offers an Asset for sale, and states a
minimum price. The auction closes when `bidDuration` has elapsed on the `timeAuthority`
timer passed in as a term. The second-price rule is followed, so the highest bidder pays
the amount bid by the second-highest bidder.

`startInstance()` is given issuers for the `Asset` and `Ask` keywords, and terms
`{ timeAuthority, bidDuration, winnerPriceOption }` (`winnerPriceOption` defaults to
`'second-price'`). An invitation for the seller is returned as the creatorInvitation.
The seller's offer should look like

```js
{ give: { Asset: asset }, want: { Ask: minimumBidAmount } }
```

The asset can be non-fungible, but the Ask amount should be of a
fungible brand. Make the bidder invitations by calling
`makeBidInvitation()` on the object returned from the seller's
offer. Each bidder can submit an offer:

```js
{ give: { Bid: null }, want: { Asset: null } }
```

## Public Second-Price Auction

In this particular "public" second-price auction, anyone who has access to a bid
invitation can make a bid by submitting a proposal.

Alice can create an auction from an existing auction installation, passing a timer and
how long bidding should stay open. (`installation` is the unique, unforgeable identifier
for the installation.)

```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Ask: simoleanIssuer,
});

const terms = harden({ timeAuthority, bidDuration: 1n });
const { creatorInvitation } = await E(zoe).startInstance(
  installation,
  issuerKeywordRecord,
  terms,
);
```

She can put something up for auction by escrowing it with Zoe, so she provides a
payment for what she wants to sell, and makes a `proposal`. The proposal's terms will
be enforced by Zoe and will protect Alice from misbehavior by the smart contract and
other participants. The seller can't exit early; the auction only closes when the timer
fires.

```js
const aliceProposal = harden({
  give: { Asset: AmountMath.make(moolaBrand, 1n) },
  want: { Ask: AmountMath.make(simoleanBrand, 3n) },
  exit: { waived: null },
});

const alicePayments = { Asset: aliceMoolaPayment };

const aliceSeat = await E(zoe).offer(
  creatorInvitation,
  aliceProposal,
  alicePayments,
);
const offerResult = await E(aliceSeat).getOfferResult();
const bobInvitation = E(offerResult).makeBidInvitation();
```

Now Alice can share the counterparty invitation with her friends and see if there are
any bidders. Let's say that Bob gets an invitation and wants to verify that it is an
offer he's interested in. He can check that the installation is the standard auction
he expects. He can also check that the item up for sale is what he wants by comparing
the issuers.

```js
const invitationIssuer = await E(zoe).getInvitationIssuer();
const bobExclusiveInvitation = await invitationIssuer.claim(bobInvitation);

const { installation: bobInstallation, instance } = await E(
  zoe,
).getInvitationDetails(bobExclusiveInvitation);
const bobIssuers = await E(zoe).getIssuers(instance);

bobInstallation === auctionInstallation || Fail`wrong installation`;
bobIssuers.Asset === moolaIssuer || Fail`wrong issuer`;
```

Bob decides to join the contract and makes an offer:

```js
const bobProposal = harden({
  give: { Bid: AmountMath.make(simoleanBrand, 11n) },
  want: { Asset: AmountMath.make(moolaBrand, 1n) },
});

const bobPayments = { Bid: bobSimoleanPayment };

const bobSeat = await E(zoe).offer(
  bobExclusiveInvitation,
  bobProposal,
  bobPayments,
);
```

Since multiple parties may want to participate in the auction, let's say that Carol and Dave also decide to bid in the same way
as Bob&mdash;Carol bidding 7 simoleans, and Dave bidding 5 simoleans.

Bob wins since he bid 11 simoleans, but pays the second-highest price, which is Carol's bid of 7
simoleans. Thus, when Alice claims her winnings, she gets 7 simoleans.
Bob gets the 1 moola that was up for auction as well as a refund of 4
simoleans (11-7), and Carol and Dave get a full refund.

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset');
const moolaRefundAmount = aliceMoolaPurse.deposit(aliceAssetPayout);

const aliceAskPayout = await aliceSeat.getPayout('Ask');
const simoleanGainAmount = aliceSimPurse.deposit(aliceAskPayout);
```

Bob's payouts are also available, keyed by `Asset` (what he won) and `Bid` (his refund,
since bidders never use the `Ask` keyword):

```js
const bobAssetPayout = await bobSeat.getPayout('Asset');
const bobMoolaGainAmount = bobMoolaPurse.deposit(bobAssetPayout);

const bobBidPayout = await bobSeat.getPayout('Bid');
const bobSimoleanRefundAmount = bobSimoleanPurse.deposit(bobBidPayout);
```
