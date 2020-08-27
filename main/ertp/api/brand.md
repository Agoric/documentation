# Brand
The `brand` identifies the kind of assets. A particular `brand` has one-to-one relationships within a
contract `instance`
with an `issuer`, `mint`, and `amountMath`, and one-to-many relationships with `purses` and `payments`.
Meaning for, say, the Quatloos `brand`:
- There is only one Quatloos `issuer`.
- There is only one Quatloos `mint`.
- There is only one Quatloos `amountMath`.
- All `amounts` created via the Quatloos `amountMath` have a Quatloos `brand`.
- There can be any number of Quatloos holding `purses`, but those `purses` can only hold Quatloos.
- There can be any number of Quatloos holding `payments`, but those `payments` can only hold Quatloos.

But recipients of a 
purported `amount` cannot use the `brand` by itself to verify its authenticity,
since the `brand` can be reused by a misbehaving `issuer`

All of these relationships are unchangable; if, say, a `mint` is created that makes new Quatloos, it
can never create new assets of any other `brand`..`

## AllegedName
Human-readable string name of a kind of digital asset. The alleged name should
not be trusted as accurate, since it is not provided by a trusted source.

## brand.isMyIssuer(issuer)
- `issuer` `{Issuer}`
- Returns: `{Boolean}`

Return `true` if the `brand` comes from this `issuer`, `false` if not.

```js
const isIssuer = brand.isMyIssuer(issuer);
```

## brand.getAllegedName()
- Returns: `{String}`

Returns the alleged name of the `brand`. Should not be trusted as accurate.

```js
const name = brand.getAllegedName();
```
## Related Methods

The following methods on other ERTP components also either operate on or 
return a `brand`. While a brief description is given for each, you should click through
to a method's main documentation entry for full details on what it does and how
to use it. 
- [issuer.getBrand()](./issuer.html#issuer-getBrand): Returns
the `brand` for the `issuer`.  
- [payment.getAllegedBrand()](./payment.html#payment-getallegedbrand): Returns
the `payment`'s alleged `brand`.

