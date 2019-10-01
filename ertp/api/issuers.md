# Issuer

## Issuer

Holding an Issuer provides the ability to create amounts and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

### issuer.getLabel()
Get the label for this Issuer. Labels can be used to manually construct amounts.

- Returns: `{Comparable}` The label for the issuer.

```js
const { description } = issuer.getLabel();
const childMint = makeMint(description, config);
```
### issuer.getAssay
Get the `Assay` for this Issuer.

- **Arguments:**
  - None

- **Returns:**
  - `{Assay}`

- **Usage:**

```js
const galleryPixelAssay = galleryPixelIssuer.getAssay();
```

After getting the `Assay` of an `Issuer`, `Assay` methods can be called to verify properties of the amount. See the [Assays API](/api/assays) for all available methods.

```js
function insistNonEmptyAmount(issuer, amount) {
  insist(!issuer.getAssay().isEmpty(amount))`\
    no use rights present in amount ${amount}`;
}

function insistAssetHasAmount(issuer, asset, amount) {
  insist(issuer.getAssay().includes(asset.getBalance(), amount))`\
    ERTP asset ${asset} does not include amount ${amount}`;
}

function getPixelList(issuer, amount) {
  return issuer.getAssay().quantity(amount);
}
```

### #getStrategy
Description

- **Arguments:**
  - `{Type}` - paramName

- **Returns:**
  - `{Type}` - description

- **Usage:**

```js
Examples
```
### #makeAmount

### #makeEmptyPurse

### #combine

### #split

### #claimExactly

### #claimAll

### #burnExactly

### burnAll

## Mint

## Purse

## Payment

## Strategy
