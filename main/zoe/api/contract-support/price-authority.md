# PriceAuthority Methods

We rely on `PriceAuthority` oracles. A `PriceAuthority`
gives reliable quotes for prices. The quotes might be based on broad surveys
of prices across the ecosystem, or might come directly from an AMM (Automatic
Market Maker) like our 
AutoSwap. A `PriceAuthority` can either give a quote for the current price 
across any pair of currencies it knows about, or can immediately return a 
`Promise` resolved when a condition is true. For example, a price 
crossing some threshold, or at a particular time. It can also provide a 
price feed that updates with every price change.

A `PriceQuote` represents a statement from the PriceAuthority as to the 
current price level at a particular time. The significant content (prices 
and time) is packaged in the amount, and repeated in the payment for veracity. 
A `PriceQuote` is an amount-payment pair, where the amount is also the current 
balance of the payment.
 
```js
const { quoteAmount, quotePayment } = priceQuote;
```

`PriceQuotes` are returned in two forms: 
- `PriceDescription`
  - Always includes `amountIn`, `amountOut`, the quote's `Timestamp`,
    and the `TimerService` the `TimeStamp` is relative to.
- `PriceDescription` wrapped as a `QuoteAuthority` issued payment. 
  - This lets quotes be shared in a format letting others verify the time and values. 
  
## `getQuoteIssuer(brandIn, brandOut)`
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ Issuer | Promise<Issuer> }`
- Gets the ERTP `Issuer` of `PriceQuotes` for a given `brandIn`/`brandOut`
  pair. 
```js
const quoteIssuer = await E(pAuthority).getQuoteIssuer(
    collateralKit.brand,
    loanKit.brand,
  );
```  

## `getTimerService(brandIn, brandOut)`
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ TimerService | Promise<TimerService> }`
- Gets the timer used in `PriceQuotes` for a given `brandIn`/`brandOut` pair. 
```js
const myTimer = E(pAuthority).getTimerService(collateral.brand, loanKit.brand);
```

## `makeQuoteNotifier(amountIn, brandOut)`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuote>> }`
- Be notified of the latest `PriceQuotes` for a given `amountIn`. The issuing
  rate may be very different between `priceAuthorities`.
```js
const myNotifier = E(pAuthority).makeQuoteNotifier(quatloos100, usdBrand);
```

## `quoteAtTime(deadline, amountIn, brandOut)`
- `deadline`: `{ Timestamp }`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves after `deadline` passes on the `priceAuthority`’s `timerService` with the price 
  quote of `amountIn` at that time. Note that `deadline`'s value is a `BigInt`.
```js
const priceQuoteOnThisAtTime = E(pAuthority).quoteAtTime(7n, quatloosAmount34, usdBrand);
```

## `quoteGiven(amountIn, brandOut)`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountIn`.
```js
const quote = await E(pAuthority).quoteGiven(moola500, quatloosBrand);
```

## `quoteWanted(brandIn, amountOut)`
- `brandIn`: `{ Brand }`
- `amountOut`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote on demand corresponding to `amountOut`.
```js
const quote = await E(pAuthority).quoteWanted(quatloosBrand, moola500;
```

## `quoteWhenGT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` exceeds `amountOutLimit`.
```js
const quote = E(pAuthority).quoteWhenGT(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```

## `quoteWhenGTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or exceeds `amountOutLimit`.
```js
const quote = E(pAuthority).quoteWhenGTE(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```

## `quoteWhenLT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` drops below `amountOutLimit`.
```js
const quote = E(pAuthority).quoteWhenLT(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```

## `quoteWhenLTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves when a price quote of `amountIn` reaches or drops below
  `amountOutLimit`.
```js
const quote = E(pAuthority).quoteWhenLTE(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```
## `MutableQuote` object

Use a `MutableQuote` when you expect to make multiple calls, replacing the trigger
value. If you just need a single quote, and won't change the trigger level, then use
a non-mutable quote.

There are four *mutable quote* methods, which return a `MutableQuote` object with the methods:
- `cancel(e)`
  - `e``{ String }`
  - Causes the `Promise` to reject with the message `e`. When the promise is used with a `.then()`
    the message is part of the rejection notification. 
- `getPromise()`
  - Returns: `{ Promise<PriceQuote> }`
- `updateLevel(newAmountIn, newAmountOutLimit)`
  - `newAmountIn` `{ Amount }`
  - `newAmountOutLimit` `{ Amount }`
  - Changes the `MutableQuote`'s trigger levels to the specified values without requiring a second `Promise`.
    `newAmountIn` and `newAmountOutLimit`'s brands must match the original `amountIn` and `newAmountOutLimit`
    brands respectively. 
  
## `mutableQuoteWhenGT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<MutableQuote> }`
- Resolves when a price quote of `amountIn` exceeds `amountOutLimit`
```js
const quote = E(pAuthority).mutableQuoteWhenGT(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```
  
## `mutableQuoteWhenGTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<MutableQuote> }`
- Resolves when a price quote of `amountIn` reaches or exceeds
  `amountOutLimit`
```js
const quote = E(pAuthority).mutableQuoteWhenGTE(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```
  
## `mutableQuoteWhenLT(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<MutableQuote> }`
- Resolves when a price quote of `amountIn` drops below
  `amountOutLimit`
```js
const quote = E(pAuthority).mutableQuoteWhenLT(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```

## `mutableQuoteWhenLTE(amountIn, amountOutLimit)`
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<MutableQuote> }`
- Resolves when a price quote of `amountIn` reaches or drops below
  `amountOutLimit`
```js
const quote = E(pAuthority).mutableQuoteWhenLTE(
    amountMath.make(brands.In, 29n),
    amountMath.make(brands.Out, 974n),
  );
```
