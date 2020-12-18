 # Price Authority
 
`PriceAuthority` is an object that mints `PriceQuotes` and handles
triggers and notifiers for changes in the price
 
## `getQuoteIssuer(brandIn, brandOut)`
 - `brandIn` `{ Brand }`
 - `brandOut` `{ Brand }`
 - Returns: `{ ERef<Issuer> }`
 
Returns the ERTP `PriceQuote` issuer for the specified brands pair.
 
## `getTimerService(brandIn, brandOut)`
 - `brandIn` `{ Brand }`
 - `brandOut` `{ Brand }`
 - Returns: `{ ERef<TimerService> }`
 
Returns the timer used in `PriceQuotes` for the specified brands.

## `getPriceNotifier(brandIn, brandOut)`
 - `brandIn` `{ Brand }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Notifier }`
 
Returns a notifier for the specified brands.

## `quoteGiven(amountIn, brandOut)`
 - `amountIn` `{ Amount }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Promise<PriceQuote> }`
 
Returns a quote corresponding to the specified amount. **tyg todo: Should I add "in the specified brand"?**

## `quoteWanted(brandIn, amountOut)`
 - `brandIn` `{ Brand }`
 - `amountOut` `{ Amount }`
 - Returns: `{ Promise<PriceQuote> }`
 
Returns the quote for the specified amount in the specified brand. **tyg todo: Should I add "in the specified brand"?**

## `getQuoteIssuer(brandIn, brandOut)`
 - `brandIn` `{ Brand }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Issuer }`
 
Returns the quote issuer for the specified brands.

## `makeQuoteNotifier(amountIn, brandOut)`
 - `amountIn` `{ Amount }`
 - `brandOut` `{ Brand }`
 - Returns: `{ ERef<Notifier<PriceQuote>> }`
 
Be notified of the latest `PriceQuotes` for the specified amount.  
Different Price Authorities may issue notifications at very different rates. 
 
## `quoteAtTime(deadline, amountIn, brandOut)`
 - `deadline` `{ Timestamp }`
 - `amountIn` `{ Amount }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Promise<PriceQuote> }`
 
Resolves after `deadline` passes on the PriceA uthority's `timerService`
with `amountIn`'s price quote at that time.

## `quoteWhenGT(amountIn, amountOutLimit)
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` exceeds `amountOutLimit`

## `quoteWhenGTE(amountIn, amountOutLimit)
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` reaches or exceeds `amountOutLimit`

## `quoteWhenLTE(amountIn, amountOutLimit)
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` reaches or drops below `amountOutLimit`

## `quoteWhenLT(amountIn, amountOutLimit)
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` drops to below `amountOutLimit`.
