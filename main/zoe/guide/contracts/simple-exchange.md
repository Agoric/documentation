# Simple Exchange

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/simpleExchange.js) (Last updated: 9/12/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

The "simple exchange" is a very basic, un-optimized exchange. The simple
exchange has an order book for one asset, priced in a second asset. The order
book is naively kept as an array that is iterated over to look for matches
every time a new order arrives.

## Contract API

SimpleExchange is an exchange with a simple matching algorithm, which allows
an unlimited number of parties to create new orders or accept existing
orders. The notifier allows callers to find the current list of orders.

The SimpleExchange uses Asset and Price as its keywords. The contract treats
the two keywords symmetrically. New offers can be created and existing offers
can be accepted in either direction.

```js
{ give: { Asset: simoleans(5) }, want: { Price: quatloos(3) } }
{ give: { Price: quatloos(8) }, want: { Asset: simoleans(3) } }
```

The `want` term is treated as an exact amount to be exchanged, while the
`give` term is a limit that may be improved on. This simple exchange does not
partially fill orders.

The publicFacet is returned when the contract is started.

## Instantiating the simple exchange

```js
const { publicFacet } = await E(zoe).startInstance(installation, {
   Asset: moolaIssuer,
   Price: simoleanIssuer,
   });
const simpleExchangeInvitation = await E(publicFacet).makeInvitation();
const { instance } = await E(zoe).getInvitationDetails(simpleExchangeInvitation);
const aliceInvitation = await E(publicFacet).makeInvitation();
```

## Adding an order

A user, Alice, can escrow with zoe to create a sell order. She wants to sell 3
moola and receive at least 4 simoleans in return:

```js
const aliceSellOrderProposal = harden({
  give: { Asset: moolaAmountMath.make(3) },
  want: { Price: simoleanAmountMath.make(4) },
  exit: { onDemand: null },
});

const alicePayment = { Asset: aliceMoolaPayment };
```

Alice escrows her payment with Zoe to add her sell order to the exchange.

```js
const aliceSeat = await E(zoe).offer(
  aliceInvitation,
  aliceSellOrderProposal,
  alicePayment,
);
```

## Buying an order

Let's say that Bob knows about the simple exchange, and hears about Alice's
offer, which sounds like a good deal to him. He will check the installation
with zoe and see that the exchange is trading what he expects:

```js
const bobInvitation = E(publicFacet).makeInvitation();
const invitationIssuer = E(zoe).getInvitationIssuer();
const bobExclusiveInvitation = E(invitationIssuer).claim(bobInvitation);
const {
  instance,
  installation,
} = await E(zoe).getInvitationDetails(bobExclusiveInvitation);
const bobIssuers = await E(zoe).getIssuers(instance);
```

Bob verifies that the information is what he expects. He can compare the
installation he gets from the invitation with a canonical link he found in a
public directory he trusts.

```js
assert(installation === simpleExchangeInstallation, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong Asset issuer`);
assert(bobIssuers.Price === simoleanIssuer, details`wrong Price issuer`);
```

Now that Bob has checked to make sure everything is in order, he proceeds to fulfill the buy order:

```js
const bobBuyOrderProposal = harden({
  give: { Price: simoleanAmountMath.make(7) },
  want: { Asset: moolaAmountMath.make(3) },
  exit: { onDemand: null },
});

const bobSimPayment = await E(bobSimoleanPurse).withdraw(simoleanAmountMath(7));
onst bobPayments = { Price: bobSimPayment };

const bobSeat = await E(zoe).offer(
  bobExclusiveInvitation,
  bobBuyOrderProposal,
  bobPayments,
);
```

## Payout

When a match is made, the payout promise that the user can get from their seat
is resolved to a promises for payment.

```js
const { Asset: bobAssetPayoutP, Price: bobPricePayoutP } = await bobSeat.getPayouts();
const bobAssetPayout = await bobAssetPayoutP;
const bobMoolaGainAmount = await E(bobMoolaPurse).deposit(bobAssetPayout);
const bobPricePayout = await bobPricePayoutP;
const bobSimGainAmount = await E(bobSimPurse).deposit(bobPricePayout);
```

And Alice gets her payouts the same way. (The choice of getPayouts() vs
getPayout(keyword) is purely for convenience).

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset');
const aliceMoolaGainAmount = aliceMoolaPurse.deposit(aliceAssetPayout);
const alicePricePayout = await aliceSeat.getPayout('Price');
const aliceSimGainAmount = aliceSimPurse.deposit(alicePricePayout);
```
