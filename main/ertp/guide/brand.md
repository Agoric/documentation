# Brand

The brand in `amount` identifies the kind of digital asset. It can be
used to get the untrusted `allegedName` that the mint was created
with. `brand.isMyIssuer(issuer)` can be used along with
`issuer.getBrand() === brand` to verify that the brand belongs to the
issuer and vice versa. 

```js
const brand = {
  isMyIssuer: allegedIssuer => allegedIssuer === issuer,
  getAllegedName: () => allegedName,
}
```

## allegedName
This `allegedName` should
not be trusted as accurate (for instance, anyone can create a mint
with `allegedName` 'BTC'), but the `allegedName` can be useful for
debugging and double-checking.
