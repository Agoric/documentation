# Covered Call

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/coveredCall.js) (Last updated: 9/12/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

The owner of an asset can use a covered call to give someone else the right
to buy the asset at a certain price, called the strike price. That right
can then be treated as an asset in its own right. This contract creates
those derivative rights, and makes it possible for someone else to tell
what they would get if they successfully exercise that right. The call
option has an expiry date, at which point the contract is cancelled. It is
"covered", meaning that the assets it describes is in the seller's
possession, and the actual asset will be transferred when the exchange takes
place.

In this contract, the expiry date is represented by the deadline at which
the owner of the digital asset's offer is cancelled. Therefore, the owner
of the digital asset's proposal must have an `exit` of "afterDeadline".

The party that calls `startInstance()` gets an invitation that they can use
to deposit assets. When they do so, the offer result is another invitation
that serves as the call option. The invitation includes details of the
transaction for the benefit of the counter-party. Their assured presence in
the invitation allows the recipient of the invitation to verify what has
been escrowed: `{ expirationDate, timerAuthority, underlyingAsset,
strikePrice }`.

## The Contract's API

A call option is the right (but not the obligation) to buy digital assets
at a pre-determined price, called the strike price. This call option is
"covered," meaning that the invitation to accept the offer won't be issued
until the assets have been put in escrow. This guarantees that the assets
can be transferred without relying on the owner of the digital assets to
keep their promise later.

The call option has an expiration date, when the opportunity is
cancelled. The owner of the digital assets cannot remove the assets from
escrow before the expiration date.

The `creatorInvitation` of this contract is an invitation to escrow the
underlying assets. The proposal to escrow assets can have any `give` and
`want` with any keywords. Any number of assets of different brands can be
escrowed under different keywords. The proposal must have an exit condition
with the key "afterDeadline":

``` js
{
  give: { ... },
  want: { ... },
  exit: {afterDeadline: { deadline: time, timer: chainTimer } },
}
```

The deadline serves as the expiration date for the covered call
option. After this deadline, if the option has not been exercised, the
underlying assets are automatically returned to the creator of the contract
as a refund.

After the owner of the digital assets escrows the assets in the initial
offer, they receive a seat. The payout for this seat will either be a
refund of the underlying assets (as mentioned above) or payments in the
amount of the strike price. Zoe's enforcement of offer safety guarantees
that the payout is either a refund or payments in the amount of the strike
price, regardless of whether the contract is buggy.

The offerResult of the initial seat resolves to the call option itself: an
inspectable invitation to buy the underlying assets. The call option
invitation has this additional information in the value: `{ expirationDate,
timeAuthority, underlyingAssets, strikePrice }`.

The invitation itself can be traded as a valuable digital asset: a
covered call option.

The recipient of a covered call option (whether received as a gift, or
bought on an exchange or through a contract) can exercise the option before
the deadline by using it as an invitation to this contract, paying the
strike price and receiving the underlying assets. The recipient of a
covered call option can use whatever keywords they wish, as long as they
specify that they `give` the strike price as specified in the invitation
value, and `want` the underlying assets exactly.


## Making A Call Option

Let's say Alice wants to create a covered call. She creates the first proposal
just like she would create the first proposal in the atomic swap. She creates an
issuerKeywordRecord to specify the issuers to be used with each keyword.

```js
const issuerKeywordRecord = harden({
  UnderlyingAsset: moolaIssuer,
  StrikePrice: simoleanIssuer,
});

const { creatorInvitation } = await E(zoe).startInstance(
  coveredCallInstallation,
  issuerKeywordRecord,
);
```

Then Alice creates a proposal, and escrows the funds she is depositing.

```js
const threeMoola = AmountMath.make(moolaBrand, 3n);
const aliceProposal = harden({
  give: { UnderlyingAsset: threeMoola },
  want: { StrikePrice: AmountMath.make(simoleanBrand, 7n) },
  exit: { afterDeadline: { deadline: 1599856578n, timer: chainTimer } },
});

const alicePayment = { UnderlyingAsset: aliceMoolaPurse.withdraw(threeMoola) };
```

Alice makes an offer and gets a seat.

```js
const aliceSeat = await E(zoe).offer(
  creatorInvitation,
  aliceProposal,
  alicePayment,
);

const coveredCall = aliceSeat.getOfferResult()
```

The offerResult obtained from the seat is a zoe invitation that serves as the
covered call she wants.  This invitation is a full ERTP payment and can be
escrowed and used in other contracts. For instance, Alice can send it to Bob,
who can either exercise the call option or sell it in another contract, say, an
atomic swap:

```js
const invitationIssuer = E(zoe).getInvitationIssuer();
const bobExclOption = await invitationIssuer.claim(coveredCall);
```

Let's imagine that Bob wants to sell the invitation.  He can start a swap
instance to trade this invitation for bucks.

```js
const swapIssuerKeywordRecord = harden({
  Asset: invitationIssuer,
  Price: bucksR.issuer,
});
const bobSwapSeat =
  await E(zoe).startInstance(swapInstallation, swapIssuerKeywordRecord);
```
  
Bob specifies that he wants to swap the invitation for 1 buck, and escrows
the covered call invitation. In exchange, he gets a swap invitation he can
share.

```js
const bobProposalSwap = harden({
  give: { Asset: invitationIssuer.getAmountOf(bobExclOption) },
  want: { Price: bucks(1) },
});

const bobPayments = harden({ Asset: bobExclOption });
const bobSwapSeat = await E(zoe).offer(bobSwapInvitation, bobProposalSwap, bobPayments);

const daveSwapInvitation = bobSwapSeat.getOfferResult();
```

## Buying An Option

Another user, let's call him Dave, is looking to buy the option to trade
his 7 simoleans for 3 moola, and is willing to pay 1 buck for the
option. He is interested in Bob's swap invitation so he checks that this
instance matches what he wants. He can check the amount of the invitation
to see what contract it is for, and any contract-provided information about
what the invitation can be used for.

```js
const {
  installation: daveSwapInstall,
  instance,
} = await E(zoe).getInvitationDetails(daveSwapInvitation);
const daveSwapIssuers = await E(zoe).getIssuers(instance);

// Dave does some checks
assert(daveSwapInstall === swapInstallation, details`wrong installation`);
assert(daveIssuers.Asset === moolaIssuer, details`unexpected Asset issuer`);
assert(daveIssuers.Price === simoleanIssuer, details`unexpected Price issuer`);
```

Dave can safely proceed with the swap because he knows that if Bob has lied
about the swap then Dave's offer will be rejected and he will get a refund.
Dave escrows his 1 buck with Zoe and forms his proposal.

```js
const daveSwapProposal = harden({
  want: { Asset: optionAmount },
  give: { Price: bucks(1) },
});

const daveSwapPayments = harden({ Price: daveBucksPayment });

const daveSwapSeat = await E(zoe).offer(
  daveSwapInvitation,
  daveSwapProposal,
  daveSwapPayments,
);
```

## Exercising the Option

Now that Dave owns the covered call he can exercise it. He exercises the
option by submitting an offer that pays the required exercise price in
exchange for the underlying asset:

```js
const daveOption = await daveSwapSeat.getPayout('Asset');

const daveCoveredCallProposal = harden({
  want: { UnderlyingAsset: AmountMath.make(moolaBrand, 3n) },
  give: { StrikePrice: AmountMath.make(simoleanBrand, 7n) },
});

const daveCoveredCallPayments = harden({
  StrikePrice: daveSimoleanPayment,
});

const daveCallSeat = await E(zoe).offer(
  daveOption,
  daveCoveredCallProposal,
  daveCoveredCallPayments,
);

  const daveMoolaPayout = await daveCallSeat.getPayout(
    'UnderlyingAsset',
  );
  await daveMoolaPurse.deposit(daveMoolaPayout);

```
