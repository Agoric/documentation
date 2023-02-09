# Ratio Math Functions

These functions let you apply a **[Ratio](./zoe-data-types.md#ratio)** (a fraction) to an amount, multiplying or
dividing an amount by a ratio of two natural numbers.

The Ratio Math functions have to be imported.

## assertIsRatio(ratio)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- Returns: None.

Throws an error if the argument is not a valid **Ratio**.

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

Returns a **Ratio** based on the arguments passed into the function.

By default, the *denominator* is 100n (i.e., the **Ratio** is a percent). 

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
the *denominatorAmount* is the **Ratio's** denominator.

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
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the *amount* **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded down to the next
  integer.

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the *amount* **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded up to the next
  integer.

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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
numerator's **Brand**. Note that the denominator **Brand** has to be the same as the *amount* **Brand**.

The resulting **Amount** is determined by:
1. Multiplying the *amount* value by the *ratio*'s numerator's value.
2. Dividing the result from step 1 by the *ratio*'s denominator's value.
3. If that results in an integer, that value is returned. Otherwise, the value
  is rounded to the nearest integer according to [banker's rounding rules](https://en.wikipedia.org/wiki/Rounding#Rounding_half_to_even).

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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

For example, if the *amount* value is 47 and the *ratio* is 3 / 5, the calculation
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

Returns a **Ratio** such that the *ratio* argument's numerator is the returned value's
denominator and the *ratio* argument's denominator is the returned value's numerator.

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

If the *denominator* values aren't identical, then both **Ratios** are multiplied by the lowest common
denominator, and then the **Ratios** are added.

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

If the *denominator* values aren't identical, then both **Ratios** are multiplied by the lowest common
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

This function requires the *ratio* argument to be between 0 and 1. It also requires the numerator and denominator **[Brands](/reference/ertp-api/brand.md)** to be the same. If either of these conditions aren't met, an error is thrown and no **Ratio** is returned.

## ratioGTE(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Boolean**

Returns **true** if *left* is larger than or equal to *right*, **false** otherwise.

An error is returned if the **[Brands](/reference/ertp-api/brand.md)** of *left* and *right*
aren't identical.

## ratiosSame(left, right)
- **left** **[Ratio](./zoe-data-types.md#ratio)**
- **right** **Ratio**
- Returns: **Boolean**

Returns **true** if the *left* and *right* **Ratios** are the same, **false** otherwise. Note that for
the two **Ratios** to be considered the same, the 
**[Value](/reference/ertp-api/ertp-data-types.md#value)** and **[Brand](/reference/ertp-api/brand.md)**
of both the *numerator* and *denominator* of one **Ratio** must be identical to the **Value** and
**Brand** of the *numerator* and *denominator* of the other **Ratio**. 


## quantize(ratio, newDen)
- **ratio** **[Ratio](./zoe-data-types.md#ratio)**
- **newDen** **BigInt**
- Returns: **Ratio**

Creates and returns a new **Ratio** that's equivalent to the *ratio* argument, but with a new denominator specified by the *newDen* argument.

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
