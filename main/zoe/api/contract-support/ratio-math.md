# Ratio Math Functions

These functions let you apply a ratio (a fraction) to an ammount, multiplying or dividing an amount
by a ratio of two natural numbers. A ratio cannot have a denominator of 0. Ratios consist of
a *numerator* and a *denominator*. Both of these consist of a value and a brand, just like `amounts`.

Note that ratios are
**not** objects, but records. Thus, the ratio functions have to be imported.

The most common kind of `Ratio` is applied to an `Amount` of a particular 
brand and produces results of the same brand. 

The less common `Ratio` is applied to an `Amount` of one
brand and produces results of a different brand. For example, you might multiply
a US dollar branded amount by a ratio that returns a Swiss franc branded amount;
i.e. an exchange rate between two brands (in this case, currencies). Of course you
want to be careful to use the correct ratio for the desired direction of the exchange.
You don't want to multiply the dollar amount by the ratio that exchanges francs for
dollars. You want to multiply it by the ratio that exchanges dollars for francs. 

## `makeRatio(numerator, numeratorBrand, denominator, denominatorBrand)`
- `numerator`: `{ BigInt }`
- `numeratorBrand`: `{ Brand }`
- `denominator`: `{ BigInt }` defaults to 100n
- `denominatorBrand)`: `{ Brand }`  defaults to `numeratorBrand` value
- Returns: `{ numerator: { Value , Brand }, denominator: { Value, Brand } }` 

Makes a `Ratio`, representing a fraction and consisting of a record containing
two `Amounts`. It is a pass-by-copy record. 

By default, the `denominator` is 100; i.e. the ratio is a percent. 

By default, the `denominatorBrand` value is the same as the `numeratorBrand`
value. 

A ratio has these restrictions: 
- Both the numerator value and denominator value must be natural numbers. 
- The denominator cannot be 0. 

```js
// Use default values to create a ratio of 50 / 100 Quatloos
const ratio = makeRatio(50n, quatloosBrand);
// Specify all values to create a ratio of 75 Quatloos / 4 Moolas (the current exchange rate)
const ratio = makeRatio(75n, quatloosBrand, 4n, moolasBrand);
```

## `makeRatioFromAmounts(numeratorAmount, denominatorAmount)`
- `numeratorAmount`: `{ Amount }`
- `denominatorAmount`: `{ Amount }`
- Returns: `{ numerator: { value , brand }, denominator: { value, brand } }` 

Makes a `Ratio`, representing a fraction and consisting of a hardened pair 
of two `Amounts`.  The `numeratorAmount` is the ratio's numerator and
the `denominatorAmount` is the ratio's denominator. It is a pass-by-copy 
record. 

A ratio has these restrictions: 
- Both the numerator value and denominator value must be natural numbers. 
- The denominator cannot be 0. 

```js
const fiftyCents = centsAmountMath.make(50n);
const dollar = centsAmountMath.make(100n);
const halfADollar = makeRatioFromAmounts(fiftyCents, cents);
```

## `assertIsRatio(ratio)`
- `ratio`: `{ Record }`
- Returns: `void`

Throws an error if the argument is not a valid ratio.

Throws messages for errors:
- `Ratio ${ratio} must be a record with 2 fields.`
- `Parameter must be a Ratio record, but ${ratio} has ${q(name)}`

```js
assertIsRatio(aRatio);
```

## `multiplyBy(amount, ratio)`
- `amount`: `{ Amount }`
- `ratio`: `{ Ratio }`
- Returns: `{ Amount }`

Returns a hardened `Amount`.  Its brand is the `ratio`'s *numerator*'s brand.
Its value is determined by:
1. Multiplying the `amount` value by the `ratio`'s numerator's value.
2. Dividing the result from step 1 by the `ratio`'s denominator's value.
3. Applying a floor to the result from step 2 to round it down to
   the nearest integer. If the step 2 result is already an integer, its value does
   not change.

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 3 = 141
2. 141 / 5 = 28.2
3. Floor(28.2) = 28

If the numerator's brand was Swiss francs, the result would be an `Amount` of
28 Swiss francs.

Throws errors with messages: 
- `Expected an amount: ${amount})`:  First argument isn't an `Amount`. 
- `amount's brand ${q(amount.brand)} must match ratio's denominator ${q(
  ratio.denominator.brand`: The amount and ratio's denominator must have the same brand. 
    
```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, usDollarBrand);
const Dollars47 = dollarAmountMath.make(47n);
// Returns an amount of 28 Swiss francs
const exchange = multiplyBy(Dollars100, exchangeRatio);
```

## ` divideBy(amount, ratio)`
- `amount`: `{ Amount }`
- `ratio`: `{ Ratio }`
- Returns: `{ Amount }`

Returns a hardened `Amount`.  Its brand is the `ratio`'s *denominator*'s brand.
Its value is determined by:
1. Multiplying the `amount` value by the `ratio`'s denominator's value.
2. Dividing the result from step 1 by the `ratio`'s numerator's value.
3. Applying a floor to the result from step 2 to round it down to
    the nearest integer. If the step 2 result is already an integer, its value does
    not change.

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 5 = 235
2. 235 / 3 = 78.33333...
3. Floor(78.3333...) = 78

If the denominator's brand was US dollars, the result would be an `Amount` of
78 US dollars.

Throws errors with messages: 
- `Expected an amount: ${amount})`:  First argument isn't an `Amount`. 
- `amount's brand ${q(amount.brand)} must match ratio's numerator ${q(ratio.numerator.brand`: The 
  amount and ratio's numerator must have the same brand. 
  
```js
```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, usDollarBrand);
const Dollars47 = dollarAmountMath.make(47n);
// Returns an amount of 78 Swiss francs
const exchange = divideBy(Dollars100, exchangeRatio);
```

## `invertRatio(ratio)`
- `ratio`: `{ Ratio }`
- Returns: `{ Ratio }`

Returns a `Ratio` such that the `ratio` argument's numerator is the returned value's
denominator and the `ratio` argument's denominator is the returned value's numerator.

```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, usDollarBrand);
// Returns a ratio of 5 US dollars / 3 swiss Francs
const invertedRatio = invertRatio(exchangeRatio);

