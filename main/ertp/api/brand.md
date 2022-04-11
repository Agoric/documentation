# Brand
The `brand` identifies the kind of assets. A particular `brand` has one-to-one relationships
with an `issuer` and a `mint`, and one-to-many relationships with `purses` and `payments`.

Meaning for, say, the Quatloos `brand`:
- There is only one Quatloos `issuer`.
- There is only one Quatloos `mint`.
- There can be any number of Quatloos holding `purses`, but those `purses` can only hold Quatloos.
- There can be any number of Quatloos holding `payments`, but those `payments` can only hold Quatloos.

But recipients of a 
purported `amount` cannot use the `brand` by itself to verify its authenticity,
since the `brand` can be reused by a misbehaving `issuer`.

All of these relationships are unchangeable; if, say, a `mint` is created that makes new Quatloos, it
can never create new assets of any other `brand`. And a `brand` cannot be associated with any 
other `mint` or `issuer`.

## `brand.isMyIssuer(issuer)`
- `issuer` `{Issuer}`
- Returns: `{Boolean}`

Return `true` if `issuer` is the brand's `issuer`, `false` if not.

Note that a `brand` from an untrusted source can misrepresent its association with
an `issuer`. The claim should be cross-checked against
[`issuer.getBrand()`](./issuer.md#issuer-getbrand) for mutual agreement.

```js
const isIssuer = brand.isMyIssuer(issuer);
```

## `brand.getAllegedName()`
- Returns: `{String}`

Returns the alleged name of the `brand`. Should not be trusted as accurate.

An alleged name is a human-readable string name of a kind of digital asset. 
It should not be trusted as accurate since there is no public registry or 
expectation of uniqueness. This means there can be multiple issuers/mints/brands 
with the same alleged name, and thus the name by itself does not uniquely 
identify an issuer. Rather, the brand object does that.

To put it another way, nothing stops different people from creating multiple 
issuers with the alleged name Quatloos...but that doesn't make any of them the 
Quatloos issuer. The alleged name is just a human readable version which is 
helpful for debugging.
```js
const name = brand.getAllegedName();
```

## `brand.getDisplayInfo()`
- Returns: `{DisplayInfo}`

Returns the `DisplayInfo` associated with the `brand`. 

You use a `displayInfo` record at the dapp and UI levels to correctly 
display amounts. For fungible tokens, use the `decimalPlaces` property
to display their value in the commonly used denomination, rather than 
the smallest denomination used for financial accounting (for example, 
displaying in dollars rather than cents.)

```js
const quatloosDisplay = quatloosBrand.getDisplayInfo;
```

## Related Methods

The following methods on other ERTP components also either operate on or 
return a `brand`. While a brief description is given for each, you should click through
to a method's main documentation entry for full details on what it does and how
to use it. 
- [`issuer.getBrand()`](./issuer.md#issuer-getbrand): Returns
the `brand` for the `issuer`.  
- [`payment.getAllegedBrand()`](./payment.md#payment-getallegedbrand): Returns
the `payment`'s alleged `brand`.
