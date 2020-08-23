# Brand
The `brand` identifies the kind of assets. A particular `brand` has one-to-one relationships within an `instance`
with an `issuer`, `mint`, and `amountMath`, and many-to-one relationships with `purses` and `payments`.
Meaning for, say, the Quatloos `brand:
- There is only one Quatloos `issuer`.
- There is only one Quatloos `mint`.
- There is only one Quatloos `amountMath`.
- There can be any number of Quatloos holding `purses`, but those `purses` can only hold Quatloos.
- There can be any number of Quatloos holding `payments`, but those `payments` can only hold Quatloos.

Every `amount` created by an `AmountMath` has have the 
same `brand`, as determined by the `brand` that `AmountMath` is in
a one-to-one relationship with.
But recipients cannot use the `brand` by itself to verify that a 
purported `amount` is authentic, since the `brand` can be reused by a misbehaving `issuer`.`

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
return a `brand`. While a brief desciption is given for each, you should click through
to a method's main documentation entry for full details on what it does and how
to use it. 
- [issuer.getBrand()](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getBrand): Returns
the `brand` for the `issuer`.  
- [payment.getAllegedBrand()](https://agoric.com/documentation/ertp/api/payment.html#payment-getallegedbrand): Returns
the `payment`'s alleged `brand`.

