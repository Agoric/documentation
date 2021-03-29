# PriceAuthority Methods

## getQuoteIssuer(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ Issuer | Promise<Issuer> }`
- Gets the ERTP Issuer of PriceQuotes for a given brandIn/brandOut
  pair. 

## getTimerService(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ TimerService | Promise<TimerService> }`
- Gets the timer used in PriceQuotes for a given brandIn/brandOut pair. 

## makeQuoteNotifier(amountIn, brandOut)
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuote>> }`
- Be notified of the latest PriceQuotes for a given `amountIn`.  The rate at
  which these are issued may be very different between `priceAuthorities`.

## quoteAtTime(deadline, amountIn, brandOut)
- `deadline`: `{ Timestamp }`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves after `deadline` passes on the `priceAuthority`’s `timerService` with the price 
  quote of `amountIn` at that time. Note that `deadline`'s value is a `BigInt`.

## quoteGiven(amountIn, brandOut)
- `amountIn: `{ Amount }`
- `brandOut: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountIn`.

## quoteWanted(brandIn, amountOut)
- `brandIn`: `{ Brand }`
- `amountOut`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountOut`.

##  quoteWhenGT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` exceeds `amountOutLimit`.

## quoteWhenGTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or exceeds `amountOutLimit`.

## quoteWhenLT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` drops below `amountOutLimit`.

## quoteWhenLTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or drops below
  `amountOutLimit`.
