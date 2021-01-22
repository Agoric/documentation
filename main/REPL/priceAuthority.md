# Price Authority

`PriceAuthority` is an object that mints `PriceQuotes` and handles
triggers and notifiers for changes in the price. 

`PriceAuthority` objects use timer services. You should be familiar with the objects 
and methods in the [REPL TimerService document](./timerServices.md) 

## Price quote objects
 
Before discussing `PriceAuthority` and `PriceAuthorityAdmin` methods, we need to 
cover the other price-based objects and methods they interact with.
 
A `PriceQuote` is an object with two properties:
- `quoteAmount`: An `Amount` whose value is a `PriceQuoteValue`.
- `quotePayment`: The `quoteAmount` wrapped as a `Payment`. It is either an `ERef<Payment>` or `null`.
 
A `PriceQuoteValue` is the `Value` part of a `quoteAmount`. Its properties are:
- `amountIn` `{ Amount }`: The amount supplied to a trade
- `amountOut` `{ Amount }`: The quoted result of trading `amountIn`
- `timer` `{ TimerService }`:  The service that gave the `timestamp`
- `timestamp` `{ Timestamp }`: A timestamp according to `timer` for the quote
- `conditions` `{ any= }`: Additional conditions for the quote
 
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

## `makeQuoteNotifier(amountIn, brandOut)`
- `amountIn` `{ Amount }`
- `brandOut` `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuotes>> }`

Be notified of the latest `PriceQuotes` for the given `amountIn`. 
Different `PriceAuthories` may issue these at very different rates.

## `getPriceNotifier(brandIn, brandOut)`
 - `brandIn` `{ Brand }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Notifier }`
 
Returns a notifier for the specified brands. Different `PriceAuthories` may 
issue these at very different rates.

## `quoteGiven(amountIn, brandOut)`
 - `amountIn` `{ Amount }`
 - `brandOut` `{ Brand }`
 - Returns: `{ Promise<PriceQuote> }`
 
Returns a price quote corresponding to the specified amount in the specified brand. 

## `quoteWanted(brandIn, amountOut)`
 - `brandIn` `{ Brand }`
 - `amountOut` `{ Amount }`
 - Returns: `{ Promise<PriceQuote> }`
 
Returns a price quote for the specified amount in the specified brand. 

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
 
Resolves after `deadline` passes on the Price Authority's `timerService`
with `amountIn`'s price quote at that time.

## `quoteWhenGT(amountIn, amountOutLimit)`
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` exceeds `amountOutLimit`

## `quoteWhenGTE(amountIn, amountOutLimit)`
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` reaches or exceeds `amountOutLimit`

## `quoteWhenLTE(amountIn, amountOutLimit)`
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` reaches or drops below `amountOutLimit`

## `quoteWhenLT(amountIn, amountOutLimit)`
- `amountIn` `{ Amount }`
- `amountOutLimit `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`

Resolve when a price quote of `amountIn` drops to below `amountOutLimit`.
