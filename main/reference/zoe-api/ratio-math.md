# Ratio Math Functions

These functions let you apply a ratio (a fraction) to an amount, multiplying or
dividing an amount by a ratio of two natural numbers. Ratios consist of a
*numerator* and a *denominator*. Both of these consist of a value and a brand,
just like **amounts**. A ratio cannot have a denominator value of 0.

The ratio functions have to be imported.

The most common kind of **Ratio** is applied to an **Amount** of a particular brand
and produces results of the same brand.

**Ratios** can also have two brands, essentially typing them such as miles per
hour or US dollars for Swiss francs (an exchange rate ratio) (i.e. the numerator
is one brand and the denominator is another). Keep in mind that a ratio function
should make sense when used with a dual-branded ratio.

For example, when multiplying an amount by a ratio, the result has the ratio
numerator's brand.  So the amount should have the same brand as the ratio's
denominator to cancel it out; e.g. 5 gallons * (10 miles / 1 gallon) = 50
miles. Similarly, dividing an amount by a ratio returns a result amount with the
denominator's brand, so the amount should be the same brand as the numerator to
cancel it out.

In order to support precision calculations, the multiplication and division
operations require that the caller specify whether the result should be rounded
up or down. These operations produce Amounts, so they have to end by converting
the ratio to an integer with a division. This may require roundoff, and correct
calculations require that the caller choose which is appropriate.

## assertIsRatio(ratio)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: None.

Throws an error if the argument is not a valid ratio.

Throws messages for errors:
- **Ratio ${ratio} must be a record with 2 fields.**
- **Parameter must be a Ratio record, but ${ratio} has ${q(name)**

```js
assertIsRatio(aRatio);
```

## makeRatio(numerator, numeratorBrand, denominator?, denominatorBrand?)
- **numerator** **BigInt**
- **numeratorBrand** **[Brand](/reference/ertp-api/brand.md)**
- **denominator** **BigInt** - Optional, defaults to 100n.
- **denominatorBrand)** **Brand** - Optional, defaults to the *numeratorBrand* value.
- Returns: **[Ratio](./zoe-data-types.md#ratio)**

Returns a **Ratio**, representing a fraction and consisting of a record containing
two **Amounts**. It is a pass-by-value record. 

By default, the *denominator* is 100n (i.e., the **Ratio** is a percent). 


A ratio has these restrictions: 
- Both the numerator value and denominator value must be natural numbers. 
- The denominator cannot be 0. 

```js
// Use default values to create a ratio of 50 / 100 Quatloos
const ratio = makeRatio(50n, quatloosBrand);
// Specify all values to create a ratio of 75 Quatloos / 4 Moolas (the current exchange rate)
const ratio = makeRatio(75n, quatloosBrand, 4n, moolasBrand);
```

## makeRatioFromAmounts(numeratorAmount, denominatorAmount)
- **numeratorAmount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **denominatorAmount** **Amount**
- Returns: **[Ratio](./zoe-data-types.md#ratio)**

Returns a **Ratio**, representing a fraction and consisting of an immutable pair 
of two **Amounts**.  The *numeratorAmount* is the **Ratio's** numerator and
the *denominatorAmount* is the **Ratio's** denominator. It is a pass-by-value 
record. 

A ratio has these restrictions: 
- Both the numerator value and denominator value must be natural numbers. 
- The denominator cannot be 0. 

```js
const fiftyCents = AmountMath.make(centsBrand, 50n);
const dollar = AmountMath.make(centsBrand, 100n);
const halfADollar = makeRatioFromAmounts(fiftyCents, dollar);
```

## floorMultiplyBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the **Amount** **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded down to the next
  integer.

For example, if the *amount* value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 3 = 141
2. 141 / 5 = 28.2
3. Floor(28.2) = 28

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's denominator ${q(
  ratio.denominator.brand**: The amount and ratio's denominator must have the same brand. 
    
```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 28 Swiss francs
const exchange = floorMultiplyBy(dollars47, exchangeRatio);
```

## ceilMultiplyBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the **Amount** **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded up to the next
  integer.

For example, if the *amount* value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 3 = 141
2. 141 / 5 = 28.2
3. Ceiling(28.2) = 29

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's denominator ${q(
  ratio.denominator.brand**: The amount and ratio's denominator must have the same brand. 
    
```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 29 Swiss francs
const exchange = ceilMultiplyBy(dollars47, exchangeRatio);
```

## multiplyBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the **Amount** **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded to the nearest integer according to [banker's rounding rules](https://en.wikipedia.org/wiki/Rounding#Rounding_half_to_even).

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 3 = 141
2. 141 / 5 = 28.2
3. BankersRounding(28.2) = 28

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's denominator ${q(
  ratio.denominator.brand**: The amount and ratio's denominator must have the same brand. 
    
```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 28 Swiss francs
const exchange = multiplyBy(dollars47, exchangeRatio);
```

## floorDivideBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s denominator's **Brand**.

The resulting value is determined by:
1. Multiplying the *amount* value by the *ratio*'s denominator's value.
2. Dividing the result from step 1 by the *ratio*'s numerator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded down to the next integer.

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 5 = 235
2. 235 / 3 = 78.33333...
3. Floor(78.3333...) = 78

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's numerator ${q(ratio.numerator.brand**: The 
  amount and ratio's numerator must have the same brand. 

```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 78 dollars
const exchange = floorDivideBy(dollars47, exchangeRatio);
```

## ceilDivideBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s denominator's **Brand**.

The resulting value is determined by:
1. Multiplying the *amount* value by the *ratio*'s denominator's value.
2. Dividing the result from step 1 by the *ratio*'s numerator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded up to the next integer.

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 5 = 235
2. 235 / 3 = 78.33333...
3. Ceiling(78.3333...) = 79

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's numerator ${q(ratio.numerator.brand**: The 
  amount and ratio's numerator must have the same brand. 

```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 79 dollars
const exchange = ceilDivideBy(dollars47, exchangeRatio);
```

## divideBy(amount, ratio)
- **amount** **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Amount**

Returns an immutable **Amount**. Its **[Brand](/reference/ertp-api/brand.md)** is the *ratio*'s denominator's **Brand**.

The resulting value is determined by:
1. Multiplying the *amount* value by the *ratio*'s denominator's value.
2. Dividing the result from step 1 by the *ratio*'s numerator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded to the nearest integer according to [banker's rounding rules](https://en.wikipedia.org/wiki/Rounding#Rounding_half_to_even).

For example, if the amount value is 47 and the ratio is 3 / 5, the calculation
would go
1. 47 * 5 = 235
2. 235 / 3 = 78.33333...
3. BankersRounding(78.3333...) = 78

Throws errors with messages: 
- **Expected an amount: ${amount})**:  First argument isn't an **Amount**. 
- **amount's brand ${q(amount.brand)} must match ratio's numerator ${q(ratio.numerator.brand**: The 
  amount and ratio's numerator must have the same brand. 

```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, dollarBrand);
const dollars47 = AmountMath.make(dollarBrand, 47n);
// Returns an amount of 78 dollars
const exchange = divideBy(dollars47, exchangeRatio);
```

## invertRatio(ratio)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Ratio**

Returns a **Ratio** such that the **Ratio** argument's numerator is the returned value's
denominator and the **ratio** argument's denominator is the returned value's numerator.

```js
const exchangeRatio = makeRatio(3n, swissFrancBrand, 5n, usDollarBrand);
// Returns a ratio of 5 US dollars / 3 swiss Francs
const invertedRatio = invertRatio(exchangeRatio);
```

## addRatios(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Ratio**

Returns a **Ratio** that's the sum of the *left* and *right* parameters.

The **[Brands](/reference/ertp-api/brand.md)** of the *numerators* of *left* and *right* must be
identical. similarly, the **Brands** of the *denominators* of *left* and
*right* must also be identical. If either of these conditions aren't met, then no **Ratio** is returned
and an error is thrown instead.

If the *denominator* values aren't identical, then both ratios are multiplied by the lowest common
denominator, and then the ratios are added.

For example:

1. Let's assume *left* = {numerator: 44n kilometers, denominator: 3n hours} and 
*right* = {numerator: 25n kilometers, denominator: 2n hours}.
2. *left* would be multiplied by 2/2, and *right* would be multiplied by 3/3, resulting in 
*left* = {numerator: 88n kilometers, denominator: 6n hours} and  *right* = {numerator: 75n kilometers, denominator: 6n hours}
3. *left* and *right* would then be added together, resulting in {numerator: 163n kilometers, denominator: 6n hours}.
This **Ratio** would then be returned.


## subtractRatios(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Ratio**

Returns a **Ratio** that's the result when the *right* parameter is subtracted from the *left* one.

The **[Brands](/reference/ertp-api/brand.md)** of the *numerators* of *left* and *right* must be
identical. similarly, the **Brands** of the *denominators* of *left* and
*right* must also be identical. If either of these conditions aren't met, then no **Ratio** is returned
and an error is thrown instead.

If the *denominator* values aren't identical, then both ratios are multiplied by the lowest common
denominator, and then *right* is subtracted from *left*.

For example:

1. Let's assume *left* = {numerator: 44n kilometers, denominator: 3n hours} and 
*right* = {numerator: 25n kilometers, denominator: 2n hours}.
2. *left* would be multiplied by 2/2, and *right* would be multiplied by 3/3, resulting in 
*left* = {numerator: 88n kilometers, denominator: 6n hours} and  *right* = {numerator: 75n kilometers, denominator: 6n hours}
3. *right* would then be subtracted from *left* would then be added together, resulting in {numerator: 13n kilometers, denominator: 6n hours}.
This **Ratio** would then be returned.

## multiplyRatios(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Ratio**

Returns a **Ratio** that's the product of the *left* and *right* parameters.

The **[Brands](/reference/ertp-api/brand.md)** of the *numerators* of *left* and *right* must be
identical. similarly, the **Brands** of the *denominators* of *left* and
*right* must also be identical. If either of these conditions aren't met, then no **Ratio** is returned
and an error is thrown instead.

## oneMinus(ratio)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: **Ratio**

Subtracts the *ratio* argument from 1 and returns the resultant **Ratio**.

This function requires the *ratio* argument to be between 0 and 1. It also requires the numerator and denominator **[Brands]((/reference/ertp-api/brand.md)** to be the same. If either of these conditions aren't met, an error is thrown and no **Ratio** is returned.

## ratioGTE(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Boolean**

Returns **true** if *left* is larger than or equal to *right*, **false** otherwise.

An error is returned

## ratiosSame(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Boolean**

Returns **true** if and only if the **[Value](/reference/ertp-api/ertp-data-types.md#value)** and
**[Brand](/reference/ertp-api/brand.md)** of the *numerator

TBD

## quantize(ratio, newDen)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- **newDen** ????
- Returns: **Ratio**

/**
 * Make an equivalant ratio with a new denominator
 *
 * @param {Ratio} ratio
 * @param {bigint} newDen
 * @returns {Ratio}
 */

## parseRatio(numeric, numeratorBrand, denominatorBrand?)
- **numeric** **[ParsableNumber](./zoe-data-types.md#parsablenumber)**
- **numeratorBrand** **[Brand](/reference/ertp-api/brand.md)**
- **denominatorBrand** **Brand** - Optional, defaults to *numeratorBrand*.
- Returns: **[Ratio](./zoe-data-types.md#ratio)**

Creates a **Ratio** from the *numeric* argument, and returns that **Ratio**.

## assertParsableNumber(specimen)
- **specimen** **Object**
- Returns: None.

Throws an error if the argument is not a **[ParsableNumber](./zoe-data-types.md#parsablenumber)**.
