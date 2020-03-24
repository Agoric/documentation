# Simple Exchange

<Zoe-Version/>

The "simple exchange" is a very basic, un-optimized exchange. The
simple exchange has an order book for one asset, priced in a second
asset. The order book is naively kept as an array that is iterated over
to look for matches every time a new order arrives.

## Offer rules

The exchange accepts buy and sell limit orders only.

The Asset is treated as an exact amount to be exchanged, while the Price is a limit that may be improved on. This simple exchange does not support partial fills of orders.

## Instantiating the simple exchange

```js
const simpleExchangeInvite = await zoe.makeInstance(installationHandle, {
   Asset: moolaIssuer,
   Price: simoleanIssuer,
  });
const { instanceHandle } = inviteIssuer.getAmountOf(simpleExchangeInvite).extent[0];
const { publicAPI } = zoe.getInstance(instanceHandle);
const aliceInvite = publicAPI.makeInvite()
```

## Adding an order

A user, Alice, can escrow with zoe to create a sell order. She wants to sell 3 moola and receive at least 4 simoleans in return:

```js
const aliceSellOrderProposal = harden({
  give: { Asset: moola(3) },
  want: { Price: simoleans(4) },
  exit: { onDemand: null },
});

const alicePayments = { Asset: aliceMoolaPayment };

const { seat: aliceSeat, payout: alicePayoutP } = await zoe.redeem(
  aliceInvite,
  aliceSellOrderProposal,
  alicePayments,
);

// After escrowing with zoe, Alice can add her sell order to the exchange and create an invite for another party to participate in the exchange
const aliceOfferResult = await aliceSeat.addOrder();
const bobInvite = publicAPI.makeInvite();
```

## Buying an order

Let's say that Bob hears about Alice's invite and decides he wants to
join. He will check the `installationHandle` and see that the exchange
is trading what he
expects:

```js
// Bob collects information
const inviteIssuer = zoe.getInviteIssuer();
const bobExclusiveInvite = await inviteIssuer.claim(bobInvite);
const { instanceHandle } = inviteIssuer.getAmountOf(bobExclusiveInvite).extent[0];
const {
  installationHandle: bobInstallationId,
  issuerKeywordRecord: bobIssuers,
} = zoe.getInstance(instanceHandle);

// Bob checks the information is what he expects
assert(bobInstallationId === installationHandle, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong Asset issuer`);
assert(bobIssuers.Price === simoleanIssuer, details`wrong Price issuer`);
```

Now that Bob has checked to make sure everything is in order, he proceeds to fulfill the buy order:

```js
// Bob creates his proposal
const bobBuyOrderProposal = harden({
  give: { Price: simoleans(7) },
  want: { Asset: moola(3) },
  exit: { onDemand: null },
});

const bobPayments = { Price: bobSimoleanPayment };

// 6: Bob escrows with zoe
const { seat: bobSeat, payout: bobPayoutP } = await zoe.redeem(
  bobExclusiveInvite,
  bobBuyOrderProposal,
  bobPayments,
);

// 8: Bob submits the buy order to the exchange
const bobOfferResult = await bobSeat.addOrder();
```

## Payout

If a match is made, the payout promise that the user receives when
they escrow with Zoe is resolved to a record of promises for payments with keyword keys:

```js
const bobPayout = await bobPayoutP;
const alicePayout = await alicePayoutP;

const bobMoolaPayout = await bobPayout.Asset;
const bobSimoleanPayout = await bobPayout.Price;
const aliceMoolaPayout = await alicePayout.Asset;
const aliceSimoleanPayout = await alicePayout.Price;
```
