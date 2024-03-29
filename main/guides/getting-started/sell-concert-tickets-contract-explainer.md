# Sell Concert Tickets Smart Contract
This smart contract is designed to mint and sell event tickets as non-fungible tokens (NFTs) in the form of a semi-fungible asset. In this example there are three categories or classes of tickets:
- Tickets near the front are the most expensive
- Tickets in the middle rows are priced between expensive and cheap seats
- Tickets in the back are the lowest priced

## Contract Setup
The contract is parameterized with an `inventory` object, which contains information about the different types of tickets available for sale, their prices `tradePrice`, and the maximum number of tickets for each type `maxTickets`. For example:
```js
const inventory = {
  frontRow: {
    tradePrice: AmountMath.make(istBrand, 3n),
    maxTickets: 3n,
  },
  middleRow: {
    tradePrice: AmountMath.make(istBrand, 2n),
    maxTickets: 5n,
  }
};
```

After the contract is initialized, a new ERTP mint for the "Ticket" asset is created:
```js
const ticketMint = await zcf.makeZCFMint('Ticket', AssetKind.COPY_BAG);
const { brand: ticketBrand } = ticketMint.getIssuerRecord();
```

The entire inventory of tickets is minted and held by the `inventorySeat`:
```js
const inventoryBag = makeCopyBag(
  Object.entries(inventory).map(([ticket, { maxTickets }], _i) => [
    ticket,
    maxTickets,
  ]),
);
const toMint = {
  Tickets: {
    brand: ticketBrand,
    value: inventoryBag,
  },
};
const inventorySeat = ticketMint.mintGains(toMint);
```

## Trading Tickets
Customers who wish to purchase event tickets first make an invitation to trade for tickets using `makeTradeInvitation`:
```js
const makeTradeInvitation = () =>
  zcf.makeInvitation(tradeHandler, 'buy tickets', undefined, proposalShape);
```

The `tradeHandler` function is called when a purchaser makes an offer:
```js
const tradeHandler = buyerSeat => {
  const { give, want } = buyerSeat.getProposal();
  // ... checks and transfers
};
```

## Trade Handler
The `tradeHandler` function begins by checking to see if there are enough tickets in inventory to satisfy the trade:
```js
AmountMath.isGTE(
  inventorySeat.getCurrentAllocation().Tickets,
  want.Tickets,
) || Fail`Not enough inventory, ${q(want.Tickets)} wanted`;
```

Next, the total price is calcualted using `bagPrice`:
```js
const totalPrice = bagPrice(want.Tickets.value, inventory);
```

After that, a check is made to ensure the offered price is sufficient:
```js
AmountMath.isGTE(give.Price, totalPrice) ||
  Fail`Total price is ${q(totalPrice)}, but ${q(give.Price)} was given`;
```

Finally, `atomicRearrange` can be called to exchange the requested tickets for the required payment:
```js
atomicRearrange(
  zcf,
  harden([
    // price from buyer to proceeds
    [buyerSeat, proceeds, { Price: totalPrice }],
    // tickets from inventory to buyer
    [inventorySeat, buyerSeat, want],
  ]),
);
```

As you're going through this tutorial it may be helpful to watch this video walkthrough:
<iframe width="560" height="315" src="https://www.youtube.com/embed/Wtq6dwsRdOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
