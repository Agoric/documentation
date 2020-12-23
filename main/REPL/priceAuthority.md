# Price Authority and Timer Service

`PriceAuthority` objects use the timer service. Therefore, before covering `PriceAuthority`, we must
first look at the timer service's objects and methods.

## Timer Service

`TimerService` objects have methods for getting the current time, scheduling
a `wake()` call, scheduling repeated events, and cancelling scheduled events.

### `getCurrentTimestamp()`
- Returns: `{ Timestamp }`

Returns the last timestamp.

### `setWakeup(baseTime, waker)`
- `baseTime` `{ Timestamp }`
- `waker` `{ TimerWaker }`
- Returns: `{ Timestamp }`

Returns the time when the call is scheduled to happen

### `removeWakeup(waker)`
- `waker` `{ TimerWaker }`
- Returns: `{ Array<Timestamp> }`

Remove the `waker` from all scheduled wakeups, whether produced by `timer.seWakeup(h)`
or `repeater.schedule(h)`.

### `createRepeater(delay, interval)`
- `delay` `{ RelativeTime }`
- `interval` `{ RelativeTime }`
Returns: `{ TimerRepeater }`

Returns a repeater that will repeatedly schedule `wake()` calls. The
first call occurs after `delay` time, and the following calls occur
at `interval` time values. 
When `schedule(w)` is called, `w.wake()` will be scheduled to be
called after the next multiple of interval from the base. Since times can be
coarse-grained, the actual call may occur later, but this won't change when
the next event will be called.


### `Timestamp` object

A `Number`, an absolute individual stamp returned by a `TimerService`.  Note that different
timer services may have different interpretations of actual Timestamp values.

### `RelativeTime` object

A `Number`, the difference between two `Timestamps`.  Note that
different timer services may have different interpretations of actual `RelativeTime` values.

### `TimerWaker` object

- `TimerWaker.wake(timestamp)
  - timestamp `{ Timestamp }`
  - Returns: `void`
  - The specified timestamp is the time the call was scheduled to occur.

### `TimerRepeater` object

The `TimerRepeater` object has two methods for scheduling its first call and disabling
itself.

- `TimerRepeater.schedule(waker)`
  - `waker` `{ TimerWaker }`
  - Returns: `void`
  - Returns the time scheduled for the first call to `E(waker).wake()`.  
    The waker continues to be scheduled every interval until the repeater is disabled.
    
- `TimerRepeater.disable()`
  - Returns: `void`
  - Disable this repeater, so `schedule(w)` can't be called, and wakers 
    already scheduled with this repeater won't be rescheduled again 
    after `E(waker).wake()` is next called on them.

## Price Authority
 
Before discussing `PriceAuthority` and `PriceAuthorityAdmin` objects, we need to cover the other price-based
objects and methods they interact with.
 
A `PriceQuote` is an object with two properties:
- `quoteAmount`: An `Amount` whose value is a `PriceQuoteValue`.
- `quotePayment`: The `quoteAmount` wrapped as a `Payment`. It is either an `ERef<Payment>` or `null`.
 
A `PriceQuoteValue` is the `Value` part of a `quoteAmount`. Its properties are:
- `amountIn` `{ Amount }`: The amount supplied to a trade
- `amountOut` `{ Amount }`: The quoted result of trading `amountIn`
- `timer` `{ TimerService }`:  The service that gave the `timestamp`
- `timestamp` `{ Timestamp }`: A timestamp according to `timer` for the quote
- `conditions` `{ any= }`: Additional conditions for the quote

`PriceAuthority` is an object that mints `PriceQuotes` and handles
triggers and notifiers for changes in the price. 
 
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
 
Returns a notifier for the specified brands. Different `PriceAuthorie`s may i
ssue these at very different rates.

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
