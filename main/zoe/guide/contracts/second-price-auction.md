# Second-price auction

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/a564c6081976d7b66b3cdf54e0ba8903c8f1ee6d/packages/zoe/src/contracts/auction/secondPriceAuction.js) (Last updated: Sep 14, 2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

In a second-price auction, the winner is the participant with the highest bid, but
the winner only pays the price corresponding to the second highest
bid. <b>Second-price auctions must have sealed (i.e.  private) bids to have the
touted economic incentives, so this version, which is entirely public, should not be
used in production for real valuables.</b> It's a demonstration that auctions under
Zoe can enforce different rules about how prices are calculated, or how winners are
selected.

An auction contract is which the seller offers an Asset for sale, and states a
minimum price. The auction closes at the deadline specified by the timeAuthority and
closesAfter parameters in the terms provided by the creator of the contract
instance. The second price rule is followed, so the highest bidder pays the amount
bid by the second highest bidder.

`startInstance()` specifies the issuers and the terms. An invitation for the seller is
returned as the creatorInvitation. The seller's offer should look like
```js
{ give: { Asset: asset }, want: { Ask: minimumBidAmount}}
```
The asset can be non-fungible, but the Ask amount should be of a
fungible brand. Make the bidder invitations by calling
`makeBidInvitation()` on the object returned from the seller's
offer. Each bidder can submit an offer: ```js { give: { Bid: null }
want: { Asset: null } }.  ```

## Public second-price auction

In this particular "public" second-price auction, anyone who has access to the
auction instance can make a bid by submitting a proposal.

Alice can create an auction from an existing second-price auction
installation. (`installation` is the unique, unforgeable identifier for the
installation.)

```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Bid: simoleanIssuer,
});

const terms = harden({ numBidsAllowed: 3 });
const { creatorInvitation } = await E(zoe).startInstance(installation, issuerKeywordRecord, terms);
```

She can put something up for auction by escrowing it with Zoe, so she provides a
payment for what she wants to sell, and makes a `proposal`. The proposal's terms will
be enforced by Zoe and will protect Alice from misbehavior by the smart contract and
other participants. If no `exit` rule is given, as in this example, the default (`{
onDemand: null }`) is used.

```js
const aliceProposal = harden({
  give: { Asset: AmountMath.make(moolaBrand, 1n) },
  want: { Bid: AmountMath.make(simoleanBrand, 3n) },
  exit: { waived: null },
});

const alicePayments = { Asset: aliceMoolaPayment };

const aliceSeat = await E(zoe).offer(creatorInvitation, aliceProposal, alicePayments);
const invitationMaker = await E(aliceSeat).getOfferResult();
const bobInvitation = E(invitationMaker).makeBidInvitation();
```

Now Alice can share the counterparty invitation with her friends and see if there are
any bidders. Let's say that Bob gets an invitation and wants to verify that it is an
offer he's interested in. He can check that the installation is the standard auction
he expects. He can also check that the item up for sale is what he wants by comparing
the issuers.

```js
const invitationIssuer = await E(zoe).getInvitationIssuer();
const bobExclusiveInvitation = await invitationIssuer.claim(bobInvitation);

const {
  installation: bobInstallation,
  instance,
} = await E(zoe).getInvitationDetails(bobExclusiveInvitation);
const bobIssuers = await E(zoe).getIssuers(instance);

assert(bobInstallation === secondPriceAuctionInstallation, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong issuer`);
```

Bob decides to join the contract and makes an offer:

```js
const bobProposal = harden({
  give: { Bid: AmountMath.make(simoleanBrand, 11n) },
  want: { Asset: AmountMath.make(moolaBrand, 1n) },
});

const bobPayments = { Bid: bobSimoleanPayment };

const bobSeat = await E(zoe).offer(bobExclusiveInvitation, bobProposal, bobPayments);
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

const alicePricePayout = await aliceSeat.getPayout('Price');
const simoleanGainAmount = aliceSimPurse.deposit(alicePricePayout);
```

Bob's payouts are also available.

```js
const bobAssetPayout = await bobSeat.getPayout('Asset');
const bobMoolaGainAmount = bobMoolaPurse.deposit(bobAssetPayout);

const bobPricePayout = await bobSeat.getPayout('Price');
const bobSimoleanRefundAmount = bobSimoleanPurse.deposit(bobPricePayout);
```
