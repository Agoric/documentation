# Chainlink Integration

This document explains how to consume [Chainlink
oracles](https://chain.link) when unit testing, integration testing, and
actually on-chain.

## Overview

Using Chainlink on Agoric provides two main features:
- Price feeds are exposed on Agoric via the on-chain `home.priceAuthority`. This is an
  officially-sponsored [price authority](/zoe/guide/price-authority.md) built
  from aggregating several Chainlink nodes.
- [Chainlink's Any API](https://docs.chain.link/docs/request-and-receive-data)
  can initiate a job on a single oracle and return its results

We have tested these features with [actual Chainlink oracle
software](https://github.com/Agoric/dapp-oracle/blob/main/chainlink-agoric/README.md).

**Note**: Chainlink has not yet (as of 2020-11-16) finished setting up an incentivized testnet for established Chainlink node operators to connect to Agoric.

## Price Authority

To test your contract against a locally-simulated price authority, just follow
the instructions in [the Price Authority API](/zoe/api/contract-support/price-authority.md).

To use the curated on-chain price authority, see `home.priceAuthority`.  For 
example, to get a quote for selling `30 Testnet.$LINK` in `Testnet.$USD`:

(Note that this is a mock price until there are actual Chainlink nodes on the
testnet).

```js
const linkIssuer = E(home.wallet).getIssuer('Testnet.$LINK');
const linkMath = await makeLocalAmountMath(linkIssuer);
const linkBrand = await E(linkIssuer).getBrand();
const { decimalPlaces: linkDecimals } = await E(linkBrand).getDisplayInfo();
const linkAmount = linkMath.make(30 * 10 ** linkDecimals);
const usdBrand = await E(E(home.wallet).getIssuer('Testnet.$USD')).getBrand();
const { decimalPlaces: usdDecimals } = await E(usdBrand).getDisplayInfo();
const { quoteAmount: { value: [{ amountOut: usdAmount, timestamp }] } } = await E(home.priceAuthority).quoteGiven(linkAmount, usdBrand);
const linkValue = linkAmount.value / 10 ** linkDecimals;
const usdValue = usdAmount.value / 10 ** usdDecimals;
console.log(linkValue, 'Testnet.$LINK trades for', usdValue, 'Testnet.$USD');
// 30 Testnet.$LINK trades for 12 Testnet.$USD
```

## Any API

To use Chainlink's Any API, you need to get an instance of the
[Low-level Oracle Query Contract](/zoe/guide/contracts/oracle.md) and submit a
query of the form:

```js
{
  jobId: <Chainlink JobId>,
  params: { ...<job parameters> }
}
```

The oracle node returns its result, which is a JSONable value such as a string.
This is sent as your query's reply.

You can test these queries against a locally-running Chainlink node that you
control.  Follow [the Chainlink integration
instructions](https://github.com/Agoric/dapp-oracle/blob/main/chainlink-agoric/README.md)
to set it up.

There is also a more limited local node that emulates part of the Chainlink API
without having to run Docker containers.  This is the [local (mock) builtin
oracle](https://github.com/agoric/dapp-oracle#running-a-local-builtin-oracle).
