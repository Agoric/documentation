# Brand
The `brand` identifies the kind of assets. A particular `brand` has one-to-one relationships
with an `issuer` and a `mint`, and one-to-many relationships with `amountMaths`, `purses` and `payments`.

Meaning for, say, the Quatloos `brand`:
- There is only one Quatloos `issuer`.
- There is only one Quatloos `mint`.
- All `amounts` created via the Quatloos `amountMath` have a Quatloos `brand`.
- There can be many local copies of the Quatloos `amountMath`, but those `amountMaths` only work on Quatloos branded `amounts`.
- There can be any number of Quatloos holding `purses`, but those `purses` can only hold Quatloos.
- There can be any number of Quatloos holding `payments`, but those `payments` can only hold Quatloos.

But recipients of a 
purported `amount` cannot use the `brand` by itself to verify its authenticity,
since the `brand` can be reused by a misbehaving `issuer`

All of these relationships are unchangable; if, say, a `mint` is created that makes new Quatloos, it
can never create new assets of any other `brand`.

## brand.isMyIssuer(issuer)
- `issuer` `{Issuer}`
- Returns: `{Boolean}`

Return `true` if `issuer` is this brand's `issuer`, `false` if not.

An `issuer` uniquely identifies its `brand`. A `brand` **unreliably** identifies 
its `issuer`. If `brand` B claims its `issuer` is A, but A doesn't agree 
that B is its `brand`, then the `brand` is unreliable.

```js
const isIssuer = brand.isMyIssuer(issuer);
```

## brand.getAllegedName()
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
## Related Methods

The following methods on other ERTP components also either operate on or 
return a `brand`. While a brief description is given for each, you should click through
to a method's main documentation entry for full details on what it does and how
to use it. 
- <router-link to="./issuer.html#issuer-getbrand">issuer.getBrand()</router-link>: Returns
the `brand` for the `issuer`.  
- <router-link to="./payment.html#payment-getallegedbrand">payment.getAllegedBrand()</router-link>: Returns
the `payment`'s alleged `brand`.

