# Mint and Sell NFTs

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintAndSellNFT.js)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This contract mints non-fungible tokens and creates a selling contract
instance to sell the tokens in exchange for some sort of money.

startInstance() returns a creatorFacet with a `.sellTokens()` method. `.sellTokens()` takes a
specification of what is being sold, such as:
```
{
  customValueProperties: { ...arbitrary },
  count: 3,
  moneyIssuer: moolaIssuer,
  sellItemsInstallationHandle,
  pricePerItem: moolaAmountMath.make(20),
}
```

The `offerResult` is a record with useful properties such as the
`creatorFacet` for the sales contract. You can reuse the
`creatorFacet` of this contract to mint more batches of NFTs (e.g.
more tickets for a separate show.)