# Zoe API

<Zoe-Version/>

::: tip Alpha status
The Agoric platform is at the alpha stage. It has not yet been 
formally tested or hardened. Do not use for production purposes.
:::

The Zoe framework provides a way to write smart contracts without having to worry about [offer safety](../guide/offer-safety.md). To use Zoe, we put things in terms of "offers". An offer proposal is a statement about what you want and what you're willing to offer. It turns out, many smart contracts (apart from gifts and one-way payments) involve an exchange of digital assets that can be put in terms of offer proposals.

Start creating your own contract or build on any of our existing contracts.
Explore our pre-built contracts [here](../guide/contracts/README.md).

The Zoe API is divided into the following sections:

- [Zoe Service](./zoe.md) - 
  The methods for deploying and working with smart contracts.
- [Zoe Contract Facet](./zoe-contract-facet.md) -
  These Zoe methods can be called synchronously by contract code. A contract can use the Zoe Contract Facet (zcf) to do things like reallocate among offers or complete an offer.
- [ZoeHelpers for writing contracts](./zoe-helpers.md) -
  Functions that extract common contract code and patterns into reusable helpers.
- [Price Authority](./contract-support/price-authority.md) -
  Functions related to `priceAuthority` objects that provide a price feed, on-demand
  quotes, and wakeups for various time and price conditions. See the Zoe Guide's 
  [Price Authority section](../guide/price-authority.md)
- [Ratio Math](./contract-support/ratio-math.md) -
  Functions that perform math operations on Amounts by ratios of two natural numbers (i.e. fractions).


