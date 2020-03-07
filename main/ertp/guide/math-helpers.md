# MathHelpers
MathHelpers are the "arithmetic" operations on extents, used for actions like
addition, subtraction, and greater than or equal to. There are currently three choices for mathHelpers.

## Choices of MathHelpers

### 'nat'
The default fungible asset case. For example, an amount might look like:

```js
{ brand: myBrand, extent: 40 }
```

### 'strSet'
High performance operations on sets of string IDs for a basic nonfungible asset
case. An amount might look like:

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

While the `set` mathHelpers are slower than the `strSet`, they are
more trustworthy because all of the necessary information is in the
extent.
