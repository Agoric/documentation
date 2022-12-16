# ERTP Data Types

ERTP introduces and uses several data types.

## Amount

An **Amount** is a description of digital assets, answering the 
questions "how much?" and "of what kind?". It is a **[Value](#value)** ("how much?") 
labeled with a **[Brand](./brand.md)** ("of what kind?"). Note that **Amounts** can describe either fungible or non-fungible assets. 

```js
someAmount: {
  brand: someBrand,
  value: someValue
}
```

## AmountShape

An **AmountShape** is a description of non-fungible digital assets. Similar to **[Amount](#amount)**, **AmountShape** has 2 properties: a **[Brand](./brand.md)**, which states what kind of asset this is, and a **ValueShape**, which is an object containing however many properties are required to describe this non-fungible asset. Note that an asset's **ValueShape** is defined by the *elementShape* parameter when the asset's **[Issuer](./issuer.md)** is created via the **[makeIssuerKit()](./issuer.md#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-elementshape)** function.

```js
someAmountShape: {
  brand: someBrand,
  valueShape: someValueShape
}
```

## Value

**Values** describe how much of something can be owned or shared.
For fungible **[Amounts](#amount)**, **Values** are non-negative **BigInts**.
For non-fungible **Amounts**, **Values** are [copyArrays](/guides/js-programming/far.md#passstyleof-api)
(e.g., a hardened array of strings).

Recall that **BigInt**s are written with an *n* at the end: **10n**, **137n**, etc.

## AssetKind

There are several different kinds of **[Amounts](#amount)**: fungible and non-fungible. Fungible 
**Amounts** have natural numbers for their **[Values](#value)**, while non-fungible **Amounts** have
an array of elements (e.g., strings, numbers, or objects) for their **Values**. Even though
very different mathematical processes are performed, **[AmountMath](./amount-math.md)** methods work for
both types of **Amounts**.


- **AssetKind.NAT** : Used with fungible assets. Values are natural numbers using the JavaScript  [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type to avoid overflow risks from using the usual JavaScript **Number** type.
- **AssetKind.SET** : Deprecated.
- **AssetKind.COPY_SET** : Used with non-fungible assets that can be combined (e.g., general admition seats in a stadium). Values are arrays of objects (e.g., strings).
- **AssetKind.COPY_BAG** : Used with non-fungible assets that can't be combined (e.g., assigned seats in a stadium). Values are arrays of objects (e.g., strings).

Use **[makeIssuerKit()](./issuer.md#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-elementshape)** to specify which **AssetKind** 
your contract uses. See the **[Issuer](./issuer.md)** documentation for details on how to use this method.

```js
import { AssetKind, makeIssuerKit } from '@agoric/ertp';
makeIssuerKit('quatloos'); // Defaults to AssetKind.NAT and undefined displayInfo
makeIssuerKit('kitties', AssetKind.SET); // Defaults to undefined displayInfo
```

## DisplayInfo

A **DisplayInfo** data type is associated with a **[Brand](./brand.md)** and gives information about how
to display that **Brand**'s **[Amounts](#amount)**. **DisplayInfo** has one optional property,
**decimalPlaces**, which takes a non-negative integer value.

The **decimalPlaces** property tells the [display software](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/ui-components)
how many places to move the decimal point over to the left so as to display the value
in the commonly used denomination (e.g., display "10.00 dollars" rather than "1000 cents"). 

Fungible digital assets are represented in integers, in their smallest unit.
For example, the smallest unit for a US dollar might be either *dollar* or *cent*.
If it's *dollar*, **decimalPlaces** would be **0**. If it's *cent*, **decimalPlaces**
would be **2**. 

Non-fungible assets have values that are arrays, so you shouldn't specify a **decimalPlaces** value
for them. 

**decimalPlaces** should be used for display purposes only. Any
other use is an anti-pattern.

**DisplayInfo** also has an **[AssetKind](#assetkind)** property. Its value specifies the kind of the associated asset.




