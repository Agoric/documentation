# MathHelpers
AmountMath uses MathHelpers to do extent arithmetic. The results are branded, making
a new amount (which consists of an extent and a brand). MathHelper operations include addition,
subtraction, equality checking, comparison of two extents, and working with empty extents.

The MathHelper operations are polymorphic. You have your choice of three MathHelpers, each of which 
implements all of the same set of API methods:
- `nat`: Used with fungible assests.
- `strSet`: Used with non-fungible assets, operates on an array of string identifiers
- `set`: Used with non-fungible assets, operates on an array of records (objects) with keys and values

Use `produceIssuer(allegedName, mathHelpersName)` to specify which MathHelpers choice your contract uses. The second
parameter, `mathHelpersName` is optional and defaults to `nat` if not given. For example
```
produceIssuer('quatloos'); // Defaults to 'nat'
produceIssuer('quatloos', 'strSet');
produceIssuer('quatloos, 'set');
```
See the [MathHelpers API documentation](https://agoric.com/documentation/ertp/api/math-helpers.html) for the set of operations all the above choices implement.

## MathHelpers Choices

### 'nat'
The default fungible asset case. For example, an amount you'd use `nat` MathHelpers with might look like:

```js
{ brand: myBrand, extent: 40 }
```

### 'strSet'
High performance operations on sets of string IDs for a basic nonfungible asset
case. An amount you'd use `strSet` with might look like the following. Note that
the `extent` is not a numeric value, but an array specifying a specific `myBrand` object.

```js
{ brand: myBrand, extent: ['39283', 'bas029s'] }
```

Often, this ID can be looked up in an external or off-chain API to
learn more about the digital assets. Note that what the API returns is
up to the owner of the API and may not be trustworthy.

### 'set'
Lower performance operations on sets of objects representing more complex
information. An amount might look like:

```js
{ brand: myBrand, extent: [{ seat: '16F', flight: '39DFK', date: '2020-06-08'}] }
```

While the `set` mathHelpers are slower than the `strSet` equivalents, they are
more trustworthy because all of the necessary information is in the extent.
