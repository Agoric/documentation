<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/958a2c0a3dec38bdba2234934119ea2c28958262/packages/zoe/src/contracts/barter-exchange.js) (Last updated: 6/30/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

::: tip Out-of-date status
Zoe's master branch is currently an Alpha release candidate. This doc
and its underlying contract are in the process of being updated, and should be current with the release candidate in another few days. What you see here is out of date. We apologize for any inconvenience this may cause.
:::

Barter Exchange takes offers for trading arbitrary goods for one another.

This Barter Exchange accepts offers to trade arbitrary goods for other
things. It doesn't require registration of Issuers. If two offers satisfy
each other, it exchanges the specified amounts in each side's want clause.

The Barter Exchange only accepts offers that look like
`{ give: { In: amount }, want: { Out: amount}` }

The want amount will be matched, while the give amount is a maximum. Each
successful trader gets their `want` and may trade with counter-parties who
specify any amount up to their specified `give`.
