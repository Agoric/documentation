# Atomic Swap Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/atomicSwap.js) (Last updated: Sep 12, 2020)

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
  Price: simoleanIssuer
})
const { creatorInvitation } = await E(zoe).startInstance(
  atomicSwapInstallation,
  issuerKeywordRecord
)
```

Then Alice escrows her offer with Zoe. She passes in two
things; the actual ERTP payments of her offer, and a
`proposal`. Zoe uses the proposal to protect Alice from the
smart contract (which may have been written by someone else)
and other participants.

A proposal has three parts:

- `give`: What this party will give to the swap. Used by Zoe to enforce offer safety (Alice will get back what she gave or what she wanted).
- `want`: What this party wants to get from the swap. Used by Zoe to enforce offer safety (Alice will get back what she gave or what she wanted).
- `exit`: How this party can exit from the contract instance. Used by Zoe to enforce payout liveness (Alice will be able to get a payout according to the exit rule she specifies)

In this case, Alice's exit rule is `onDemand`, meaning she
can exit the contract instance at any time.

```js
const threeMoola = AmountMath.make(moolaBrand, 3)
const aliceProposal = harden({
  give: { Asset: threeMoola },
  want: { Price: AmountMath.make(simoleanBrand, 7) },
  exit: { onDemand: null }
})

const alicePayment = await E(aliceMoolaPurse).withdraw(threeMoola)
```

For Alice to escrow with Zoe, she needs to use her invitation.
Then she makes her offer and receives a `seat`. The `seat`
gives her access to the offer's result and her payouts.

```js
const aliceSeat = await E(zoe).offer(
  creatorInvitation,
  aliceProposal,
  harden({ Asset: alicePayment })
)
```

This first offer's outcome is an invitation Alice can send to anyone she wants. In
this example, she sends it to Bob.

```js
const invitationP = aliceSeat.getOfferResult()
```

Bob examines the invitation's details to see if they match Alice's claims
about it.

```js secondary style2
const { installation: bobInstallation, instance } =
  E(zoe).getInvitationDetails(invitationP)
const bobIssuers = E(zoe).getIssuers(instance)

const bobExclusiveInvitation = await invitationIssuer.claim(invitationP)
const bobInvitationValue = await E(zoe).getInvitationDetails(
  bobExclusiveInvitation
)

// Bob verifies the invitation.
assert(bobInstallation === atomicSwapInstallation, details`wrong contract`)
assert(bobIssuers.Asset === moolaIssuer, details`unexpected Asset issuer`)
assert(bobIssuers.Price === simoleanIssuer, details`unexpected Price issuer`)
assert(
  AmountMath.isEqual(bobInvitationValue.asset, moola(3)),
  details`wrong asset`
)
assert(
  AmountMath.isEqual(bobInvitationValue.price, simoleans(7)),
  details`wrong price`
)
```

Bob decides to exercise the invitation, and to escrow his payments. He then
uses his invitation to make an offer, the same way that Alice used hers.
But Bob has written his proposal to match Alice's (notice that the `give`
and `want` clauses are reversed from Alice's proposal):

```js secondary style2
const sevenSimoleans = AmountMath.make(simoleanBrand, 7n)
const bobProposal = harden({
  want: { Asset: AmountMath.make(moolaBrand, 3n) },
  give: { Price: sevenSimoleans },
  exit: { onDemand: null }
})

const bobPayment = await E(bobSimoleansPurse).withdraw(sevenSimoleans)
// Bob escrows with zoe and makes an offer
const bobSeat = await E(zoe).offer(
  bobExclusiveInvitation,
  bobProposal,
  harden({ Price: bobPayment })
)
```

Bob has made his offer, so the contract executes. Since Alice
and Bob's offers match, Alice's payouts resolve. She uses her
`seat` to retrieve them. Then she deposits the moola
payout to find out if Zoe returned some of it.

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset')
const alicePricePayout = await aliceSeat.getPayout('Price')
const moolaRefundAmount = aliceMoolaPurse.deposit(aliceAssetPayout)
const simoleanGainAmount = aliceSimoleansPurse.deposit(alicePricePayout)
```

Bob's payout is also available. Since he already knows what Alice's offer was,
he doesn't need to look for a simolean refund.

```js secondary style2
const bobAssetPayout = await bobSeat.getPayout('Asset')
const bobMoolaGainAmount = bobMoolaPurse.deposit(bobAssetPayout)
```
