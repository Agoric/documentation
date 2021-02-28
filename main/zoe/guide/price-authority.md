# Price Authority

A `priceAuthority` can be used in contracts (usually specified in the
terms of a contract) to provide a price feed, on-demand quotes, and wakeups for
various time and price conditions.

## Examples

To see a `priceAuthority` in use, see the [Loan
contract](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts/loan)
and the [Call Spread
contract](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/callSpread.js).

## Receiving a quote

A `priceAuthority` has a number of different methods that will return
official `priceQuotes`. A `priceQuote` is an amount, payment pair,
where the amount is also the current balance of the payment:

```js
const { quoteAmount, quotePayment } = priceQuote;
```

Because these are ERTP amounts and payments, they have issuers. And
the payments are minted by an ERTP mint. A quote issuer and mint may
be shared by several `priceAuthorities`, and a `priceAuthority` may
use several quoteIssuers.

Importantly, you can confirm the brand of a quote and that it was minted by the
mint associated with the quoteIssuer by using the `quoteIssuer` to obtain the
`quoteAmount` of the `quotePayment`:

```js
const verifiedQuoteAmount = await E(quoteIssuer).getAmountOf(quotePayment);
```

Once you have a `quoteAmount` (or a `verifiedQuoteAmount`), you can extract the
quoted amounts:

```js
const [{ value: { amountIn, amountOut, timestamp, timer }] = quoteAmount;
```

This means that the `priceAuthority` asserts that when `timestamp` according to
`timer` happened, you could sell `amountIn` and receive `amountOut` for it.
`amountIn` and `amountOut` are ERTP amounts for the `brandIn` and `brandOut` you
requested.
