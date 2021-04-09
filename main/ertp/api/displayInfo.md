# DisplayInfo

A `DisplayInfo` record is associated with a brand and gives information about how to display that 
brand's amounts. A `DisplayInfo` record has one optional property, `decimalPlaces`, which takes a non-negative integer value.

`displayInfo` is an optional argument to [`makeIssuerKit`](./issuer.md#makeissuerkit-allegedname-amountmathkind-displayinfo).

If specified, its `decimalPlaces` value is used when displaying amount values of the `brand` created by the issuerKit.

The `decimalPlaces` property tells the [display software](https://github.com/Agoric/agoric-sdk/tree/master/packages/ui-components) 
how many places to move the decimal point over to the left so as to display the value
in the commonly used denomination (for instance, 10.00 dollars rather than 1000 cents.) 

Or in other words, which position corresponds to whole
numbers. Fungible digital assets are represented in integers, in their smallest unit.
So, for example, the smallest unit for a US Dollar might be either *mill*, 1/1000 of a 
dollar, or *cent*, 1/100 of a dollar. If mill, `decimalPlaces` would be 3, if cent, it
would be 2. 

Non-fungible assets do not use numeric valus, so don't specify a `decimalPlaces` value
for them. 

`decimalPlaces` should be used for *display purposes only*. Any
other use is an anti-pattern.

## `brand.getDisplayInfo()`
- Returns: `{ DisplayInfo }`

Returns the `DisplayInfo` record associated with the `brand`. 

You can either view the object's `decimalPlaces` property's value,
or reset it to a different non-negative integer. 
```js
const quatloosDisplay = quatloosBrand.getDisplayInfo;
const quatloosDecimalPlaces = quatloosDisplay.decimalPlaces;
```
