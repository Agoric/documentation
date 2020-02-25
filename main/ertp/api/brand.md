# Brand
The `brand` identifies the kind of issuer, and has a function to get the alleged name for the kind of asset described. The alleged name (such as 'BTC' or 'moola') is provided by the maker of the issuer and should  not be trusted as accurate.

Every amount created by AmountMath will have the same brand, but recipients cannot use the brand by itself to verify that a purported amount is authentic, since the brand can be reused by a misbehaving issuer.

## AllegedName
Human-readable string name of a kind of digital asset. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the issuer and could be deceptive.

## brand.isMyIssuer(issuer)
- `issuer` `{Issuer}`
- Returns: `{Boolean}`

Return true if the brand comes from this issuer.

```js
const isIssuer = brand.isMyIssuer(issuer);
```

## brand.getAllegedName()
- Returns: `{String}`

Return the alleged name of the brand. Should not be trusted as accurate.

```js
const name = brand.getAllegedName();
```
