# Covered Call

<Zoe-Version/>

In a covered call, the owner of a digital asset sells a call option. A call option is the right to buy the digital asset at a certain price, called the strike price. The call option has an expiry date, at which point the contract is cancelled.

In this contract, the expiry date is represented by the deadline at which the owner of the digital asset's offer is cancelled. Therefore, the owner of the digital asset's offer `exitRules` must be of the kind "afterDeadline".

The invite that the creator of the covered call receives is the call option and has the following additional information in the extent of the invite: `{ expirationDate, timerAuthority, underlyingAsset, strikePrice }`.


## Making A Call Option

Let's say Alice wants to create a covered call offer. She creates the first offer
just like she would create the first offer in the atomic swap.

```js
const aliceInvite = await zoe.makeInstance(
  coveredCallInstallationHandle,
  terms,
);

// Alice escrows with Zoe
const aliceOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerAtMost',
      units: moola(3),
    },
    {
      kind: 'wantAtLeast',
      units: simoleans(7),
    },
  ],
  exitRule: {
    kind: 'afterDeadline',
    deadline: 1,
    timer,
  },
});
const alicePayments = [aliceMoolaPayment, undefined];

// Alice redeems her invite for a seat
const { seat: aliceSeat, payout: alicePayoutP } = await zoe.redeem(
  aliceInvite,
  aliceOfferRules,
  alicePayments,
);

// Alice uses her seat to create an invite for the call option
const option = aliceSeat.makeCallOption();
```

This invite is a full ERTP payment and can be escrowed and used in other
contracts. For instance, if Alice is the user to makes the first
offer and gets an invite in return, she can send it to Bob, who can
either exercise the call option or sell it in another contract, say, an atomic
swap:

```js
const inviteAssay = zoe.getInviteAssay();
const bobExclOption = await inviteAssay.claimAll(option);

// Let's imagine that Bob wants to sell the invite for the call option.
// He can create a swap to trade this invite for bucks.
const bobSwapInvite = await zoe.makeInstance(swapInstallationId, {
  assays: harden([inviteAssay, bucksAssay]),
});

// Bob wants to swap the invite with the same units as his
// current invite from Alice. He wants 1 buck in return.
const bobOfferRulesSwap = harden({
  payoutRules: [
    {
      kind: 'offerExactly',
      units: bobExclOption.getBalance(),
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

const bobPayments = [bobExclOption, undefined];

// Bob escrows his option in the swap
const { seat: bobSwapSeat, payout: bobPayoutP } = await zoe.redeem(
  bobSwapInvite,
  bobOfferRulesSwap,
  bobPayments,
);

const daveSwapInvite = await bobSwapSeat.makeFirstOffer();
```

Bob now has a call option, in the form of an invite, ready to sell via an atomic swap contract.

## Buying An Option

Another user, let's call him Dave, is looking to buy the option to trade his 7 simoleans for 3 moola, and is willing to pay 1 buck for the option. He is interested in Bob's swap invite so he checks that this instance matches what he wants. He can check the
balance of the invite to see what contract it is for, and any
contract-provided information about what the invite can be used for.

```js
// Check the balance
const {
  extent: { instanceHandle: swapInstanceHandle },
} = daveSwapInvite.getBalance();

// Check the installation handle
const {
  installationHandle: daveSwapInstallId,
  terms: daveSwapTerms,
} = zoe.getInstance(swapInstanceHandle);
```

Dave can safely proceed with the swap because he knows that if Bob has lied about the swap then Dave's offer will be rejected and he will get a refund.

```js
// Dave escrows his 1 buck with Zoe and forms his offerRules
const daveSwapOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: optionUnits, // basically, the description of the option
    },
    {
      kind: 'offerAtMost',
      units: bucksAssay.makeUnits(1),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});

const daveSwapPayments = [undefined, daveBucksPayment];

const { seat: daveSwapSeat, payout: daveSwapPayoutP } = await zoe.redeem(
  daveSwapInvite,
  daveSwapOfferRules,
  daveSwapPayments,
);

// Dave completes the swap and awaits his payout
const daveSwapOutcome = await daveSwapSeat.matchOffer();

const [daveOption, daveBucksPayout] = await daveSwapPayoutP;
```

## Exercising the Option

Now that Dave owns the option he can exercise the option by making and completing an offer to the covered call. First, he escrows with Zoe, then he calls the `exercise` method to complete the offer:

```js
const daveCoveredCallOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: moola(3),
    },
    {
      kind: 'offerAtMost',
      units: simoleans(7),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});

const daveCoveredCallPayments = [undefined, daveSimoleanPayment];

const {
  seat: daveCoveredCallSeat,
  payout: daveCoveredCallPayoutP,
} = await zoe.redeem(
  daveOption,
  daveCoveredCallOfferRules,
  daveCoveredCallPayments,
);

const daveCoveredCallOutcome = await daveCoveredCallSeat.exercise();
```
