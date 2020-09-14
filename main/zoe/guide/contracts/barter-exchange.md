<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/a564c6081976d7b66b3cdf54e0ba8903c8f1ee6d/packages/zoe/src/contracts/barterExchange.js) (Last updated: 2020/9/14)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

Barter Exchange takes offers for trading arbitrary goods for one another.

This Barter Exchange accepts offers to trade arbitrary goods for other
things. It doesn't require registration of Issuers. If two offers satisfy
each other, it exchanges the specified amounts in each side's want clause.

The Barter Exchange only accepts offers that look like
`{ give: { In: amount }, want: { Out: amount}` }

The want amount will be matched, while the give amount is a maximum. Each
successful trader gets their `want` and may trade with counter-parties who
specify any amount up to their specified `give`.
