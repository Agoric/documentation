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

## PriceAuthority Methods

### getQuoteIssuer(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ Issuer | Promise<Issuer> }`
- Gets the ERTP Issuer of PriceQuotes for a given brandIn/brandOut
  pair. 

### getTimerService(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ TimerService | Promise<TimerService> }`
- Gets the timer used in PriceQuotes for a given brandIn/brandOut pair. 

### makeQuoteNotifier(amountIn, brandOut)
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuote>> }`
- Be notified of the latest PriceQuotes for a given `amountIn`.  The rate at
  which these are issued may be very different between `priceAuthorities`.

### quoteAtTime(deadline, amountIn, brandOut)
- `deadline`: `{ Timestamp }`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves after `deadline` passes on the `priceAuthority`’s `timerService` with the price 
  quote of `amountIn` at that time. Note that `deadline`'s value is a `BigInt`.

### quoteGiven(amountIn, brandOut)
- `amountIn: `{ Amount }`
- `brandOut: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountIn`.

### quoteWanted(brandIn, amountOut)
- `brandIn`: `{ Brand }`
- `amountOut`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountOut`.

###  quoteWhenGT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` exceeds `amountOutLimit`.

### quoteWhenGTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or exceeds `amountOutLimit`.

### quoteWhenLT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` drops below `amountOutLimit`.

### quoteWhenLTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or drops below
  `amountOutLimit`.
