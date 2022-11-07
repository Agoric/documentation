# Simple Exchange Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/f29591519809dbadf19db0a26f38704d87429b89/packages/zoe/src/contracts/simpleExchange.js) (Last updated: Sep 12, 2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

The "simple exchange" is a very basic, un-optimized exchange. It
has an order book for one asset, priced in a second asset. The order
book is naively kept as an array that the contract iterates over for matches
when a new order arrives.

## Contract API

SimpleExchange is an exchange with a simple matching algorithm. This lets
an unlimited number of parties create new orders or accept existing
orders. A notifier lets callers find the current list of orders.

The SimpleExchange keywords are `Asset` and `Price`. The contract treats
the two keywords symmetrically. New offers are created and existing offers
accepted in either direction.

```js
{ give: { Asset: simoleans(5) }, want: { Price: quatloos(3) } }
{ give: { Price: quatloos(8) }, want: { Asset: simoleans(3) } }
```
Note: Here we used a shorthand for assets whose values are 5 simoleons, 3 
quatloos, 8 quatloos, and 3 simoleons. Elsewhere this might have been done 
by creating `amounts` inline (i.e. `AmountMath.make(quatloosBrand, 8n)`). Or by
creating `amounts` outside the proposal and assigning them to variables.
For example, `const quatloos8 = AmountMath.make(quatloosBrand, 8n);` and then using
`quatloos8` as the value for `Price` in the second clause above.

The `want` term is an exact amount to exchange, while the
`give` term is a limit that may be improved on. This simple exchange does not
partially fill orders.

The `publicFacet` is returned when the contract is started.

## Instantiating SimpleExchange

```js
const { publicFacet } = await E(zoe).startInstance(installation, {
   Asset: moolaIssuer,
   Price: simoleanIssuer,
   });
const simpleExchangeInvitation = await E(publicFacet).makeInvitation();
const { instance } = await E(zoe).getInvitationDetails(simpleExchangeInvitation);
const aliceInvitation = await E(publicFacet).makeInvitation();
```

## Adding an Order

A user, Alice, escrows with Zoe to create a sell order. She wants to sell 3
moola and receive at least 4 simoleans in return:

```js
const aliceSellOrderProposal = harden({
  give: { Asset: AmountMath.make(moolaBrand, 3n) },
  want: { Price: AmountMath.make(simoleanBrand, 4n) },
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

## Buying an Order

Bob knows about the simple exchange, and hears about Alice's
offer. It sounds like a good deal to him, so he checks the installation
with Zoe and sees the exchange is trading what he expects:

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

Bob verifies the information is what he expects. He compares the
installation he gets from the invitation with a canonical link he found in a
public directory he trusts.

```js
assert(installation === simpleExchangeInstallation, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong Asset issuer`);
assert(bobIssuers.Price === simoleanIssuer, details`wrong Price issuer`);
```

Bob has checked that everything is in order, so he fulfills the buy order:

```js
const bobBuyOrderProposal = harden({
  give: { Price: AmountMath.make(simoleanBrand, 7n) },
  want: { Asset: AmountMath.make(moolaBrand, 3n) },
  exit: { onDemand: null },
});

const bobSimPayment = await E(bobSimoleanPurse).withdraw(AmountMath(simoleanBrand, 7n));
const bobPayments = { Price: bobSimPayment };

const bobSeat = await E(zoe).offer(
  bobExclusiveInvitation,
  bobBuyOrderProposal,
  bobPayments,
);
```

## Payout

When a match is made, the payout promise from a user's seat
resolves to a promise for payment. For Bob:

```js
const { Asset: bobAssetPayoutP, Price: bobPricePayoutP } = await bobSeat.getPayouts();
const bobAssetPayout = await bobAssetPayoutP;
const bobMoolaGainAmount = await E(bobMoolaPurse).deposit(bobAssetPayout);
const bobPricePayout = await bobPricePayoutP;
const bobSimGainAmount = await E(bobSimPurse).deposit(bobPricePayout);
```
Alice gets her payouts the same way. (The choice between `getPayouts()` and
`getPayout(keyword)` is based on which is more convenient in each circumstance).

```js
const aliceAssetPayout = await aliceSeat.getPayout('Asset');
const aliceMoolaGainAmount = aliceMoolaPurse.deposit(aliceAssetPayout);
const alicePricePayout = await aliceSeat.getPayout('Price');
const aliceSimGainAmount = aliceSimPurse.deposit(alicePricePayout);
```
