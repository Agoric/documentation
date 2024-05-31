# Sell Concert Tickets Smart Contract
This smart contract is designed to mint and sell event tickets as non-fungible tokens (NFTs) in the form of a semi-fungible asset. In this example there are three categories or classes of tickets:
- Tickets near the front are the most expensive
- Tickets in the middle rows are priced between expensive and cheap seats
- Tickets in the back are the lowest priced
> Note: This contract simulates traditional trading i.e. between a vendor and a consumer.

## Objective
The objective of this tutorial is to teach you the following:
- A fundamental guide on how to **establish a smart contract**.
- Explain the process of **initiating asset trading** within the Agoric environment including listing of assets and setting prices etc.
- **Develop a trade handler** that manages the execution of business logic behind trades.

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
Our contract uses this `inventory` object as a parameter to initiate. 
After the contract is initialized, a new [ERTP mint](https://docs.agoric.com/glossary/#mint) for the "Ticket" asset is created.

<details>
<summary>Note: AssetKind expresses type of assets</summary>

There are three types of [assets](https://docs.agoric.com/guides/ertp/#asset). You can determine the [type of your asset](https://docs.agoric.com/reference/ertp-api/ertp-data-types.html#assetkind) by referring to the provided documentation.

In our example, tickets are non-fungible and can have duplicates, meaning there can be many tickets of a single type. So, we are using `AssetKind.COPY_BAG`.

</details>

```js
const ticketMint = await zcf.makeZCFMint('Ticket', AssetKind.COPY_BAG);
const { brand: ticketBrand } = ticketMint.getIssuerRecord();
```

Once our asset is defined, we will mint our inventory at the start of our the smart contract and allocate it to our `inventorySeat`, which will function as our vendor.
This also allows us to check if user is buying more than our inventory allows. This can be done using an [AmountMath API method](https://docs.agoric.com/reference/ertp-api/amount-math.html#amountmath-isgte-leftamount-rightamount-brand).

<details>
<summary>To understand the code better:</summary>

Take a look at [brand](https://docs.agoric.com/glossary/#brand), [AmountKeywordRecord](https://docs.agoric.com/reference/zoe-api/zoe-data-types.html#keywordrecord), [mintGains function](https://docs.agoric.com/reference/zoe-api/zcfmint.html#azcfmint-mintgains-gains-zcfseat) and [ZCFSeat](https://docs.agoric.com/reference/zoe-api/zcfseat.html#zcfseat-object).
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
Customers who wish to purchase event tickets first [make an invitation](https://docs.agoric.com/reference/zoe-api/zoe-contract-facet.html#zcf-makeinvitation-offerhandler-description-customdetails-proposalshape) to trade for tickets using `makeTradeInvitation`.
```js
const makeTradeInvitation = () =>
  zcf.makeInvitation(tradeHandler, 'buy tickets', undefined, proposalShape);
```

Here you can see two important parameters:
- **tradeHandler**: The `tradeHandler` function is invoked when a purchaser makes an offer. This function contains the contract's logic for processing each trade, ensuring that the correct procedures are followed whenever a trade is executed.
```js
const tradeHandler = buyerSeat => {
  const { give, want } = buyerSeat.getProposal();
  // ... checks and transfers
};
```

- **proposalShape** (Optional): This object outlines the necessary and permissible elements of each [proposal](https://docs.agoric.com/reference/zoe-api/zoe-contract-facet.html#proposal-shapes). Here is the proposal shape for this contract.
```js
const proposalShape = harden({
  give: { Price: AmountShape },
  want: { Tickets: { brand: ticketBrand, value: M.bag() } },
  exit: M.any(),
});
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

Take a complete look at this example code in our [Github repository](https://github.com/Agoric/dapp-agoric-basics/blob/main/contract/src/sell-concert-tickets.contract.js).

As you're going through this tutorial it may be helpful to watch this video walkthrough:
<iframe width="560" height="315" src="https://www.youtube.com/embed/Wtq6dwsRdOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
