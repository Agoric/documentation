# PriceAuthority Object

We rely on **PriceAuthority** oracles. A **PriceAuthority**
gives reliable quotes for prices. The quotes might be based on broad surveys
of prices across the ecosystem, or might come directly from an AMM (Automatic
Market Maker). A **PriceAuthority** can either give a quote for the current price
across any pair of currencies it knows about, or can immediately return a
**Promise** resolved when a condition is true. For example, a price
crossing some threshold, or at a particular time. It can also provide a
price feed that updates with every price change.

## E(PriceAuthority).getQuoteIssuer(brandIn, brandOut)

- **brandIn**: **[Brand](/reference/ertp-api/brand)**
- **brandOut**: **Brand**
- Returns: **[Issuer](/reference/ertp-api/issuer) | Promise&lt;Issuer>**

Gets the ERTP **Issuer** of **[PriceQuotes](./zoe-data-types#pricequote)** for a
given _brandIn_/_brandOut_ pair.

```js
const quoteIssuer = await E(PriceAuthority).getQuoteIssuer(
  collateralKit.brand,
  loanKit.brand
)
```

## E(PriceAuthority).getTimerService(brandIn, brandOut)

- **brandIn**: **[Brand](/reference/ertp-api/brand)**
- **brandOut**: **Brand**
- Returns: **TimerService | Promise&lt;TimerService>**

Gets the timer used in **[PriceQuotes](./zoe-data-types#pricequote)** for a
given _brandIn_/_brandOut_ pair.

```js
const myTimer = E(PriceAuthority).getTimerService(
  collateral.brand,
  loanKit.brand
)
```

## E(PriceAuthority).makeQuoteNotifier(amountIn, brandOut)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **ERef&lt;Notifier&lt;[PriceQuote](./zoe-data-types#pricequote)>>**

Be notified of the latest **PriceQuotes** for a given _amountIn_. The issuing
rate may be very different between **PriceAuthorities**.

```js
const myNotifier = E(PriceAuthority).makeQuoteNotifier(quatloos100, usdBrand)
```

## E(PriceAuthority).quoteGiven(amountIn, brandOut)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Gets a quote on-demand corresponding to _amountIn_.

```js
const quote = await E(PriceAuthority).quoteGiven(moola500, quatloosBrand)
```

## E(PriceAuthority).quoteWanted(brandIn, amountOut)

- **brandIn**: **[Brand](/reference/ertp-api/brand)**
- **amountOut**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Gets a quote on-demand corresponding to _amountOut_.

```js
const quote = await E(PriceAuthority).quoteWanted(quatloosBrand, moola500)
```

## E(PriceAuthority).quoteAtTime(deadline, amountIn, brandOut)

- **deadline**: **Timestamp**
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves after _deadline_ passes on the **PriceAuthority**’s **timerService** with the
**PriceQuote** of _amountIn_ at that time. Note that _deadline_'s value is a **BigInt**.

```js
const priceQuoteOnThisAtTime = E(PriceAuthority).quoteAtTime(
  7n,
  quatloosAmount34,
  usdBrand
)
```

## E(PriceAuthority).quoteWhenGT(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of _amountIn_ exceeds _amountOutLimit_.

```js
const quote = E(PriceAuthority).quoteWhenGT(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).quoteWhenGTE(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of _amountIn_ reaches or exceeds _amountOutLimit_.

```js
const quote = E(PriceAuthority).quoteWhenGTE(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).quoteWhenLT(amountIn, amountOutLimit)

- **amountIn** **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit** **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of _amountIn_ drops below _amountOutLimit_.

```js
const quote = E(PriceAuthority).quoteWhenLT(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).quoteWhenLTE(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of _amountIn_ reaches or drops below _amountOutLimit_.

```js
const quote = E(PriceAuthority).quoteWhenLTE(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).mutableQuoteWhenGT(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of _amountIn_ exceeds _amountOutLimit_.

```js
const quote = E(PriceAuthority).mutableQuoteWhenGT(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).mutableQuoteWhenGTE(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of _amountIn_ reaches or exceeds
_amountOutLimit_.

```js
const quote = E(PriceAuthority).mutableQuoteWhenGTE(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).mutableQuoteWhenLT(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of _amountIn_ drops below
_amountOutLimit_.

```js
const quote = E(PriceAuthority).mutableQuoteWhenLT(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## E(PriceAuthority).mutableQuoteWhenLTE(amountIn, amountOutLimit)

- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of _amountIn_ reaches or drops below
_amountOutLimit_.

```js
const quote = E(PriceAuthority).mutableQuoteWhenLTE(
  AmountMath.make(brands.In, 29n),
  AmountMath.make(brands.Out, 974n)
)
```

## MutableQuote

A **MutableQuote** represents a statement from a **[PriceAuthority](./price-authority)** as to the
current price level at a particular time. The significant content (prices
and time) is packaged in the **[Amount](/reference/ertp-api/ertp-data-types#amount)**, and repeated
in the **[Payment](/reference/ertp-api/payment)** for veracity.

**MutableQuotes** should be used when you expect to make multiple calls, replacing the trigger
value. If you just need a single quote, and won't change the trigger level, you should use
**PriceQuotes**.

A **MutableQuote** is an **Amount**-**Payment** pair, where the **Amount** is also the current
balance of the **Payment**.

## PriceQuote

A **PriceQuote** represents a statement from a **[PriceAuthority](./price-authority)** as to the
current price level at a particular time. The significant content (prices
and time) is packaged in the **[Amount](/reference/ertp-api/ertp-data-types#amount)** and repeated
in the **[Payment](/reference/ertp-api/payment)** for veracity.
A **PriceQuote** is an **Amount**-**Payment** pair, where the **Amount** is also the current
balance of the **Payment**.

```js
const { quoteAmount, quotePayment } = priceQuote
```

**PriceQuotes** are returned in two forms:

- **PriceDescription**
  - Always includes **amountIn**, **amountOut**, the quote's **Timestamp**,
    and the **TimerService** the **Timestamp** is relative to.
- **PriceDescription** wrapped as a **QuoteAuthority** issued payment.
  - This lets quotes be shared in a format letting others verify the time and values.
