# Chainlink Integration

There is no Agoric-maintained Chainlink integration to document here.
Agoric price feeds are served through the platform's own `PriceAuthority`
interface, backed by contracts such as `priceAggregator` and
`scaledPriceAuthority`; oracle operators (including Chainlink node operators
who choose to run one) push prices into those contracts rather than Agoric
consuming a Chainlink feed directly. If you're integrating price data into a
contract, start here instead:

- [Price Authority Guide](./zoe/price-authority)
- [PriceAuthority API](../reference/zoe-api/price-authority)
- [Deployed Zoe Contracts](./zoe/actual-contracts/)
