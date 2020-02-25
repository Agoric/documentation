# Brand

The "brand" in `amounts` identifies the `issuer`, and includes an `allegedName`
that was provided by the maker of the mint.

```js
const brand = {
  allegedName: 'bucks',
  issuer: bucksIssuer,
}
```

## allegedName
This `allegedName` should
not be trusted as accurate (for instance, anyone can create a mint
with `allegedName` 'BTC'), but the `allegedName` can be useful for
debugging and double-checking actions.
