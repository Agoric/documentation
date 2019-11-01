# Label

The label in units identifies the assay, and includes an `allegedName`
that was provided by the maker of the mint.

```js
const label = {
  allegedName: 'bucks',
  assay: bucksAssay,
}
```

## allegedName
This `allegedName` should
not be trusted as accurate (for instance, anyone can create a mint
with `allegedName` 'BTC'), but the `allegedName` can be useful for
debugging and double-checking actions.
