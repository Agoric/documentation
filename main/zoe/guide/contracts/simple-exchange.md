# Simple Exchange

<Zoe-Version/>

The "simple exchange" is a very basic, un-optimized exchange. The
simple exchange has an order book for one asset, priced in a second
asset. The order book is naively kept as an array that is iterated over
to look for matches every time a new order arrives.

## Offer rules

The exchange accepts buy and sell limit orders only.

Note that the asset in the first slot of the payoutRules will always be bought or sold in exact amounts, whereas the amount of the second asset received in a sell order may be greater than expected, and the amount of the second asset paid in a buy order may be less than expected. This simple exchange does not support partial fills of orders.

A **sell order** has
offer rules in the format:

```js
const sellOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerAtMost',
      units: itemAssay.makeUnits(3),
    },
    {
      kind: 'wantAtLeast',
      units: priceAssay[1].makeUnits(4),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});
```

A **buy order** has offer rules in the format:

```js
const buyOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: itemAssay.makeUnits(3),
    },
    {
      kind: 'offerAtMost',
      units: priceAssay.makeUnits(7),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});
```

Also note that the first rule in the payoutRules array is always about the
item(s) to be bought or sold, and the second rule in the array is
always about the price. For instance, if this were a BTC/USD exchange,
BTC units would be first in the payout rules array, and USD would be
in the second position. Note that there is no per unit price. Because
there is no per unit price, this exchange can work equally as well for
non-fungible tokens on both sides.

## Instantiating the simple exchange

```js
const aliceInvite = await zoe.makeInstance(installationHandle, keywords, {
  assays,
});
const { instanceHandle } = aliceInvite.getBalance().extent;
const { publicAPI } = zoe.getInstance(instanceHandle);
```

## Adding an order

A user, Alice, can escrow with zoe to create a sell order. She wants to sell 3 moola and receive at least 4 simoleans in return:

```js
const aliceSellOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerAtMost',
      units: moola.makeUnits(3),
    },
    {
      kind: 'wantAtLeast',
      units: simoleans.makeUnits(4)
    }
  ],
  exitRule: {
    kind: 'onDemand'
  }
});

const alicePayments = [aliceMoolaPayment, undefined];

const { seat: aliceSeat, payout: alicePayoutP } = await zoe.redeem(
  aliceInvite,
  aliceSellOrderOfferRules,
  alicePayments,
);

// After escrowing with zoe, Alice can add her sell order to the exchange and create an invite for another party to participate in the exchange
const aliceOfferResult = await aliceSeat.addOrder();
const bobInvite = publicAPI.makeInvite();
```

## Buying an order

Let's say that Bob hears about Alice's invite and deciees he wants to join. He will check the `installationHandle` and the kind of units is what he expects:

```js
// Bob collects information
const inviteAssay = zoe.getInviteAssay();
const bobExclusiveInvite = await inviteAssay.claimAll(bobInvite);
const bobInviteExtent = bobExclusiveInvite.getBalance().extent;
const {
  installationHandle: bobInstallationId,
  terms: bobTerms,
} = zoe.getInstance(bobInviteExtent.instanceHandle);

// Bob checks the information is what he expects
insist(bobInstallationId === installationHandle)`wrong installation`;
insist(bobTerms.assays[0] === inviteAssay)`wrong assay`
```

Now that Bob has checked to make sure everything is in order, he proceeds to fulfill the buy order:

```js
// Bob creates his offerRules
const bobBuyOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: moola.makeUnits(3),
    },
    {
      kind: 'offerAtMost',
      units: simoleans.makeUnits(7)
    },
  ],
  exitRule: {
    kind: 'onDemand'
  },
});

const bobPayments = [undefined, bobSimoleanPayment];


// Bob escrows with zoe
const { seat: bobSeat, payout: bobPayoutP } = await zoe.redeem(
  bobExclusiveInvite,
  bobBuyOrderOfferRules,
  bobPayments,
);

// Bob submits the buy order to the exchange
const bobOfferResult = await bobSeat.addOrder();
```

## Payout

If a match is made, the payout promise that the user receives when
they escrow with Zoe is resolved to an array of payments.

```js
const bobPayout = await bobPayoutP;
const alicePayout = await alicePayoutP;

const [bobMoolaPayout, bobSimoleanPayout] = await Promise.all(bobPayout);
const [aliceMoolaPayout, aliceSimoleanPayout] = await Promise.all(alicePayout);
```
