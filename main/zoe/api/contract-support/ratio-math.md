# Ratio Math Methods

These methods let Zoe  perform operations on `Amounts` by ratios of two natural numbers.
A ratio cannot have a denominator of 0.

The most common kind of `Ratio` is applied to an `Amount` of a particular 
brand and produces results of the same brand. 

The less common `Ratio` is applied to an `Amount` of one
brand and produces results of a different brand. For example, you might multiply
a US dollar branded amount by a ratio that returns a Swiss franc branded amount;
i.e. an exchange rate between two brands (in this case, currencies). Of course you
want to be careful to use the correct ratio for the desired direction of the exchange.
You don't want to multiply the dollar amount by the ratio that exchanges francs for
dollars. You want to multiply it by the ratio that exchanges dollars for francs. 

## `makeRatio(numberator, numeratorBrand, denominator, denominatorBrand)`
- `numberator`: `{ BigInt }`
- `numeratorBrand`: `{ Brand }`
- `denominator`: `{ BigInt }` defaults to 100n
- `denominatorBrand)`: `{ Brand }`  defaults to `numberatorBrand` value
- Returns: `{ numerator: { Value , Brand }, denominator: { Value, Brand } }` 

Makes a `Ratio`, representing a fraction and consisting of a hardened pair 
of two `Amounts`. It is a pass-by-copy record. 

By default, the `denominator` is 100; i.e. the ratio is a percent. 

By default, the `denominatorBrand` value is the same as the `numeratorBrand`
value. 

A ratio has these restrictions: 
- Both the numerator value and denominator value must be natural numbers. 
- The denominator cannot be 0. 

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

## `assertIsRatio(ratio)`
- `ratio`: `{ Object }`
- Returns: `void`

Throws an error if the argument is not a valid ratio.

Throws messages for errors:
- `Ratio ${ratio} must be a record with 2 fields.`
- `Parameter must be a Ratio record, but ${ratio} has ${q(name)}`

## `multiplyBy(amount, ratio)`
- `amount`: `{ Amount }`
- `ratio`: `{ Ratio }`
- Returns: `{ Amount }`

Returns a hardened `Amount`.  Its brand is the `ratio`'s numerator's brand.
Its value is determined by:
1. Multiplying the `amount` value by the `ratio`'s numerator's value.
2. Dividing the result from step 1 by the `ratio`'s denominator's value.
3. Applying a floor method to the result from step 2 to round it down to
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

## ` divideBy(amount, ratio)`
- `amount`: `{ Amount }`
- `ratio`: `{ Ratio }`
- Returns: `{ Amount }`

Returns a hardened `Amount`.  Its brand is the `ratio`'s denomiator's brand.
Its value is determined by:
1. Multiplying the `amount` value by the `ratio`'s denominator's value.
2. Dividing the result from step 1 by the `ratio`'s numerator's value.
3. Applying a floor method to the result from step 2 to round it down to
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
- `amount's brand ${q(amount.brand)} must match ratio's numerator ${q(
    ratio.numerator.brand`: The amount and ratio's numerator must have the same brand. 

## `invertRatio(ratio)`
- `ratio`: `{ Ratio }`
- Returns: `{ Ratio }`

Returns a `Ratio` such that the `ratio` argument's numerator is the returned value's
denominator and the `ratio` argument's denominator is the returned value's numerator.

