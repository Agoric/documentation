# Asset Reserve
<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/50cd3e240fb33079948fa03b32bda86276879b4a/packages/inter-protocol/src/reserve/assetReserve.js#L56) (Last updated: Sept 8, 2022)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

Asset Reserve holds onto assets for the Inter Protocol, and can
dispense it for various purposes under governance control. It currently
supports governance decisions to add liquidity to an AMM pool.
 
This contract has the ability to mint Fee tokens, granted through its private
arguments. When adding liquidity to an AMM pool, it mints new Fee tokens and
merges them with the specified amount of collateral on hand. It then deposits
both into an AMM pool by using the AMM's method that allows the pool balance
to be determined based on the contributed funds.