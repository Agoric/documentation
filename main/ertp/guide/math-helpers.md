# MathHelpers
AmountMath uses MathHelpers to do value arithmetic. The results are branded, making
a new amount (which consists of a value and a brand). MathHelper operations include addition,
subtraction, equality checking, comparison of two values, and working with empty values.

The MathHelper operations are polymorphic. You have your choice of three MathHelpers, each of which 
implements all of the same set of API methods:
- `nat`: Used with fungible assests.
- `strSet`: Used with non-fungible assets, operates on an array of string identifiers
- `set`: Used with non-fungible assets, operates on an array of records (objects) with keys and values

Use `makeIssuerKit(allegedName, mathHelpersName)` to specify which MathHelpers choice your contract uses. The second
parameter, `mathHelpersName` is optional and defaults to `nat` if not given. For example
```
makeIssuerKit('quatloos'); // Defaults to 'nat'
makeIssuerKit('quatloos', 'strSet');
makeIssuerKit('quatloos, 'set');
```
See the [MathHelpers API documentation](https://agoric.com/documentation/ertp/api/math-helpers.html) for the set of operations all the above choices implement.

## MathHelpers Choices

### nat
The default fungible asset case, which works with natural number values. 
For example, an amount you'd use `nat` MathHelpers with might look like:

```js
{ brand: myBrand, value: 40 }
```

### strSet
Used for MathHelper operations on sets of string IDs for a basic nonfungible asset
case. Note that the `value` is not numeric, but an array specifying a 
specific `myBrand` appropriate object. An amount you'd use `strSet` with might look like the following.

```js
{ brand: myBrand, value: ['39283', 'bas029s'] }
```

Often, this ID can be looked up in an external or off-chain API to
learn more about the digital assets. Note that what the API returns is
up to the owner of the API and may not be trustworthy.

### set
Used for MathHelper operations on sets of objects representing more complex
information. An amount that uses `set` might look like:

```js
{ brand: myBrand, value: [{ seat: '16F', flight: '39DFK', date: '2020-06-08'}] }
```

`set` operations are more trustworthy than `strSet` operations 
because all of the necessary information is in the value. In `strSet` values,
you often only get an ID (for example, a Vehicle Identification Number (VIN) 
for a car), with other important information stored elsewhere (the car's make, model, color, etc.) 
In `set` values, the value often has all the important information for a third party to know.
Information in an immutable value is more credible than information retrieved from an external source
since that source could potentially manipulate the information.
