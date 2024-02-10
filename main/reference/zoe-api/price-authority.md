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
given *brandIn*/*brandOut* pair. 

```js
const quoteIssuer = await E(PriceAuthority).getQuoteIssuer(
    collateralKit.brand,
    loanKit.brand
  );
```

## E(PriceAuthority).getTimerService(brandIn, brandOut)
- **brandIn**: **[Brand](/reference/ertp-api/brand)**
- **brandOut**: **Brand**
- Returns: **TimerService | Promise&lt;TimerService>**

Gets the timer used in **[PriceQuotes](./zoe-data-types#pricequote)** for a 
given *brandIn*/*brandOut* pair. 

```js
const myTimer = E(PriceAuthority).getTimerService(collateral.brand, loanKit.brand);
```

## E(PriceAuthority).makeQuoteNotifier(amountIn, brandOut)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **ERef&lt;Notifier&lt;[PriceQuote](./zoe-data-types#pricequote)>>**

Be notified of the latest **PriceQuotes** for a given *amountIn*. The issuing
rate may be very different between **PriceAuthorities**.

```js
const myNotifier = E(PriceAuthority).makeQuoteNotifier(quatloos100, usdBrand);
```

## E(PriceAuthority).quoteGiven(amountIn, brandOut)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Gets a quote on-demand corresponding to *amountIn*.

```js
const quote = await E(PriceAuthority).quoteGiven(moola500, quatloosBrand);
```

## E(PriceAuthority).quoteWanted(brandIn, amountOut)
- **brandIn**: **[Brand](/reference/ertp-api/brand)**
- **amountOut**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Gets a quote on-demand corresponding to *amountOut*.

```js
const quote = await E(PriceAuthority).quoteWanted(quatloosBrand, moola500);
```

## E(PriceAuthority).quoteAtTime(deadline, amountIn, brandOut)
- **deadline**: **Timestamp**
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **brandOut**: **[Brand](/reference/ertp-api/brand)**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves after *deadline* passes on the **PriceAuthority**’s **timerService** with the
**PriceQuote** of *amountIn* at that time. Note that *deadline*'s value is a **BigInt**.

```js
const priceQuoteOnThisAtTime = E(PriceAuthority).quoteAtTime(7n, quatloosAmount34, usdBrand);
```

## E(PriceAuthority).quoteWhenGT(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of *amountIn* exceeds *amountOutLimit*.

```js
const quote = E(PriceAuthority).quoteWhenGT(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).quoteWhenGTE(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of *amountIn* reaches or exceeds *amountOutLimit*.

```js
const quote = E(PriceAuthority).quoteWhenGTE(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).quoteWhenLT(amountIn, amountOutLimit)
- **amountIn** **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit** **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of *amountIn* drops below *amountOutLimit*.

```js
const quote = E(PriceAuthority).quoteWhenLT(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).quoteWhenLTE(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

Resolves when a **PriceQuote** of *amountIn* reaches or drops below *amountOutLimit*.

```js
const quote = E(PriceAuthority).quoteWhenLTE(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).mutableQuoteWhenGT(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of *amountIn* exceeds *amountOutLimit*.

```js
const quote = E(PriceAuthority).mutableQuoteWhenGT(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).mutableQuoteWhenGTE(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of *amountIn* reaches or exceeds
*amountOutLimit*.

```js
const quote = E(PriceAuthority).mutableQuoteWhenGTE(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).mutableQuoteWhenLT(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of *amountIn* drops below
*amountOutLimit*.

```js
const quote = E(PriceAuthority).mutableQuoteWhenLT(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```

## E(PriceAuthority).mutableQuoteWhenLTE(amountIn, amountOutLimit)
- **amountIn**: **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **amountOutLimit**: **Amount**
- Returns: **Promise&lt;[MutableQuote](./zoe-data-types#mutablequote)>**

Resolves when a **PriceQuote** of *amountIn* reaches or drops below
*amountOutLimit*.

```js
const quote = E(PriceAuthority).mutableQuoteWhenLTE(
    AmountMath.make(brands.In, 29n),
    AmountMath.make(brands.Out, 974n)
  );
```
