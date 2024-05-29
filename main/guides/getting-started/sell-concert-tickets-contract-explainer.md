# Sell Concert Tickets Smart Contract

This smart contract is engineered to mint and sell event tickets as non-fungible tokens (NFTs) that possess characteristics of semi-fungible assets. In this instance, the tickets are divided into three distinct categories based on their seating locations and associated prices:

- **Front-row tickets**: These are the premium seats, commanding the highest price due to their proximity to the event.
- **Middle-row tickets**: These seats are moderately priced, offering a balance between cost and view quality.
- **Back-row tickets**: These are the most affordable, positioned furthest from the event but providing a cost-effective option for attendees.

## Objective

The objective of this tutorial is to teach you the following:

- **How to set up a contract**: Learn the steps required to establish a functional smart contract.
- **How to initiate trading of assets**: Understand the process for starting asset trades within the system.
- **How to create a handler for trade**: Gain the skills to develop a handler that manages trade transactions effectively.

## Contract Setup

Let us first consider an `inventory` object, which holds essential information about various asset types - in this case, categories of tickets. This object includes crucial details such as the `tradePrice` for each ticket type and the `maxTickets`, specifying the maximum quantity available for each category. For example:

```js
const inventory = {
  frontRow: {
    tradePrice: AmountMath.make(istBrand, 3n),
    maxTickets: 3n,
  },
  middleRow: {
    tradePrice: AmountMath.make(istBrand, 2n),
    maxTickets: 5n,
  },
  backRow: {
    tradePrice: AmountMath.make(istBrand, n),
    maxTickets: n,
  }
};
```

The contract is typically parameterized with this `inventory` object to initiate. 

After the contract is initialized, a new (ERTP mint)[https://docs.agoric.com/glossary/#mint] for the "Ticket" asset is created.

<details>
<summary>Note: AssetKind.COPY_BAG expresses non-fungible assets</summary>
There are three types of [assets](https://docs.agoric.com/guides/ertp/#asset). You can determine the [type of your asset](https://docs.agoric.com/reference/ertp-api/ertp-data-types.html#assetkind) by referring to the provided documentation.

In our example, tickets are non-fungible and can have duplicates, meaning there can be many tickets of a single type. Therefore, we are using `AssetKind.COPY_BAG`.
</details>

```js
const ticketMint = await zcf.makeZCFMint('Ticket', AssetKind.COPY_BAG);
const { brand: ticketBrand } = ticketMint.getIssuerRecord();
```


Once our asset is defined, we will mint our inventory at the start of our the smart contract and allocate it to our `inventorySeat`, which will function as our vendor. This also allows us to check if user is buying more than our inventory allows. This can be done using an [AmountMath API method](https://docs.agoric.com/reference/ertp-api/amount-math.html#amountmath-isgte-leftamount-rightamount-brand).

<details>
<summary>Here is an explanation to the following code</summary>
In this code, we create an `inventoryBag` using the `makeCopyBag` function, converting the inventory object into an array of `[ticket, maxTickets]` pairs. This bag holds each ticket type and its maximum quantity.s

We then define the `toMint` object as a [AmountKeywordRecord](https://docs.agoric.com/reference/zoe-api/zoe-data-types.html#keywordrecord) specifying the `Tickets` asset with its (brand)[https://docs.agoric.com/glossary/#brand] and `inventoryBag`.

Finally, we use the [mintGains](https://docs.agoric.com/reference/zoe-api/zcfmint.html#azcfmint-mintgains-gains-zcfseat) to mint the tickets creating a new (ZCFSeat)[https://docs.agoric.com/reference/zoe-api/zcfseat.html#zcfseat-object] called the `inventorySeat`.
</details>


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
