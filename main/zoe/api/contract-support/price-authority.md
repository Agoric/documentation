# PriceAuthority Methods

We rely on `PriceAuthority` oracles. A `PriceAuthority`
gives reliable quotes for prices. The quotes might be based on broad surveys
of prices across the ecosystem, or might come directly from an AMM (**tyg todo: What's AMM stand for?)** like our 
AutoSwap. A `PriceAuthority` can either give a quote for the current price 
across any pair of currencies it knows about, or can immediately return a 
`Promise` resolved when a condition is true. For example, a price 
crossing some threshold, or at a particular time. It can also provide a 
price feed that updates with every price change.

Price `Quotes` are returned in two forms: 
- `PriceDescription`
  - Always includes `amountIn`, `amountOut`, the quote's `Timestamp`,
    and the `TimerService` the `TimeStamp` is relative to.
- `PriceDescription wrapped as a `QuoteAuthority` issued payment. 
  - This lets quotes be shared in a format letting others verify the time and values. 
  
## `getQuoteIssuer(brandIn, brandOut)`
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ Issuer | Promise<Issuer> }`
- Gets the ERTP `Issuer` of `PriceQuotes` for a given `brandIn`/`brandOut`
  pair. 

## `getTimerService(brandIn, brandOut)`
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ TimerService | Promise<TimerService> }`
- Gets the timer used in `PriceQuotes` for a given `brandIn`/`brandOut` pair. 

## `makeQuoteNotifier(amountIn, brandOut)`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuote>> }`
- Be notified of the latest `PriceQuotes` for a given `amountIn`. The issuing
  rate may be very different between `priceAuthorities`.

## `quoteAtTime(deadline, amountIn, brandOut)`
- `deadline`: `{ Timestamp }`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves after `deadline` passes on the `priceAuthority`’s `timerService` with the price 
  quote of `amountIn` at that time. Note that `deadline`'s value is a `BigInt`.

## `quoteGiven(amountIn, brandOut)`
- `amountIn: `{ Amount }`
- `brandOut: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountIn`.

## `quoteWanted(brandIn, amountOut)`
- `brandIn`: `{ Brand }`
- `amountOut`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountOut`.

## `quoteWhenGT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` exceeds `amountOutLimit`.

## `quoteWhenGTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or exceeds `amountOutLimit`.

## `quoteWhenLT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` drops below `amountOutLimit`.

## `quoteWhenLTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or drops below
  `amountOutLimit`.
