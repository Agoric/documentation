# Simple Exchange

The "simple exchange" is a very basic, un-optimized exchange. The
simple exchange has an order book for one asset, priced in a second
asset. The order book is naively kept as an array that iterated over
to look for matches every time a new order arrives. 

The exchange accepts buy and sell limit orders only. A sell order has
offer rules in the format:

```js
const sellOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerExactly',
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

A buy order has offer rules in the format:

```js
const buyOrderOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantExactly',
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

Note that the first rule in the payoutRules array is always about the
item(s) to be bought or sold, and the second rule in the array is
always about the price. For instance, if this were a BTC/USD exchange,
BTC units would be first in the payout rules array, and USD would be
in the second position. Note that there is no per unit price. Because
there is no per unit price, this exchange can work equally as well for
non-fungible tokens on both sides. 

### Instantiating the simple exchange

```js
const { instance: exchange, instanceHandle } = await zoe.makeInstance(
  exchangeInstallationHandle,
  { assays },
);
```

### Adding an order

After escrowing with Zoe, the user can send their escrow receipt to
the `exchange.addOrder` method:

```js
const outcomeMsg = await exchange.addOrder(escrowReceipt);
```

### Payout

If a match is made, the payout promise that the user receives when
they escrow with Zoe is resolved to an array of payments.
