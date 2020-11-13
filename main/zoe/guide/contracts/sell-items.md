# Sell Items

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/sellItems.js)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

Sell items in exchange for money. Items may be fungible or
non-fungible and multiple items may be bought at once. Money must be
fungible.

The `pricePerItem` is to be set in the terms. It is expected that all
items are sold for the same uniform price.

The initial offer should be `{ give: { Items: items } }`, accompanied by
terms as described above. Buyers use offers that match `{ want: {
Items: items } give: { Money: m } }`. The items provided should match
particular items that the seller still has available to sell, and the
money should be pricePerItem times the number of items requested.

When all the items have been sold, the contract will terminate,
triggering the creator's payout. If the creator has an onDemand exit
clause, they can exit early to collect their winnings. The remaining
items will still be available for sale, but the creator won't be able
to collect later earnings.
