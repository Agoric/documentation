# DescOps API

## AssetDesc
AssetDescs are wrappers on extents that have been validated by a DescOps, and can be verified as having been issued by the DescOps. They contain their extent and a Label. The label identifies a particular assay.

## Extent
Extents describe the extent of something that can be owned or shared. The format is determined by its descOps. Fungible extents are normally represented by natural numbers. Other extents may be represented as strings naming a particular right, or an arbitrary object that sensibly represents the rights at issue. All AssetDescs made by the same DescOps have the same label. Extent must be Comparable. (This IDL doesn't yet provide a way to specify subtype relationships for structs.)

## DescOps
Creator and validator of asset AssetDescs.
AssetDescs are the canonical description of tradable goods. They are manipulated by mints, and represent the goods and currency carried by purses and payments. They can be used to represent things like currency, stock, and the abstract right to participate in a particular exchange.
The descOps treats the Label as an opaque object. It's used in the assetDescs produced by this descOps.

### descOps.getLabel()

- Returns: `{Label}`

Return this descOps's label.

```js
import { makeMint } from '../../core/mint';

const localMint = makeMint(description, makeMintKeeper, makeDescOps);
const localAssay = localMint.getAssay();
const localLabel = localAssay.getLabel();
```

### descOps.make(allegedExtent)

- `allegedExtent` `{Extent}`
- Returns: `{AssetDesc}`

Make a new verified AssetDesc containing the `allegedExtent`.

# <span style="color:red">Confused here, because some uses in the code indicate two parameters, not one. So I'm not sure about what to use in the example. For reference, I put the code I saw below:"</span>
```js
inviteMaker.make('writer', bobSeat);
```

### descOps.coerce(allegedAssetDesc)

- `allegedAssetDesc` `{AssetDesc}` - An AssetDesc object made by this particular DescOps. Function will error otherwise.
- Returns: `{AssetDesc}`

Is this like an AssetDesc object made by this DescOps, such as one received by pass-by-copy from an otherwise-identical remote AssetDesc? If so, return an AssetDesc object made by this DescOps. Otherwise error.

For fungible AssetDescs based on natural numbers, coerce also accepts a bare number which it will coerce to a labeled number via `descOps.make()`.

```js
function insistAssetDescEqualsPaymentBalance(assetDesc, payment) {
  // using coerce() here checks that assetDesc being passed in is an AssetDesc object made by descOps
  assetDesc = descOps.coerce(assetDesc);
  const paymentAssetDesc = paymentKeeper.getAssetDesc(payment);
  insist(
    descOps.equals(assetDesc, paymentAssetDesc),
  )`payment balance ${paymentAssetDesc} must equal assetDesc ${assetDesc}`;
  return paymentAssetDesc;
}
```

### descOps.extent(assetDesc)

- `assetDesc` `{AssetDesc}`
- Returns: `{Extent}`

Return an Extent representing the AssetDesc parameter.

```js
const coordinateExtent = coordinateDescOps.extent([{ x: 0, y: 0 }, { x: 1, y: 0 }]);

const fungibleExtent = fungibleDescOps.extent(1)

const rightsExtent = rightsDescOps.extent('This is an example of a string as an extent for rightsDescOps.')
```

### descOps.empty()

- Returns: `{AssetDesc}`

Return an empty assetDesc. Conveys no authority.

```js
const emptyAssetDesc = exampleDescOps.empty()
```

### descOps.isEmpty(assetDesc)

- `assetDesc` `{AssetDesc}`
- Returns: `{boolean}`

Return true if the AssetDesc is empty. Otherwise false.

```js
const emptyAssetDesc = exampleDescOps.empty()
const notEmptyAssetDesc = exampleDescOps.make([])

// returns true
exampleDescOps.isEmpty(emptyAssetDesc)

// returns false
exampleDescOps.isEmpty(notEmptyAssetDesc)
```

### descOps.includes(leftAssetDesc, rightAssetDesc)

- `leftAssetDesc` `{AssetDesc}`
- `rightAssetDesc` `{AssetDesc}`
- Returns: `{boolean}`

Returns true if the `leftAssetDesc` contains the `rightAssetDesc`.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelDescOps = galleryPixelAssay.getDescOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const fourthPixel = { x: 9, y: 1 };

// returns true:
galleryPixelDescOps.include([], [])
galleryPixelDescOps.include([startPixel], [])
galleryPixelDescOps.include([startPixel], [startPixel])
galleryPixelDescOps.include([startPixel, secondPixel], [startPixel])

// returns false:
galleryPixelDescOps.include([], [startPixel])
galleryPixelDescOps.include([startPixel], [secondPixel])
galleryPixelDescOps.include([startPixel, thirdPixel], [secondPixel, fourthPixel])
galleryPixelDescOps.include([startPixel, secondPixel, thirdPixel], [thirdPixel, fourthPixel])
```

### descOps.equals(leftAssetDesc, rightAssetDesc)

- `leftAssetDesc` `{AssetDesc}`
- `rightAssetDesc` `{AssetDesc}`
- Returns: `{boolean}`

Returns true if the leftAssetDesc equals the rightAssetDesc. We assume that if includes is true in both directions, equals is also true.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelDescOps = galleryPixelAssay.getDescOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns true:
galleryPixelDescOps.equals([], [])
galleryPixelDescOps.equals([startPixel], [startPixel])

// returns false:
galleryPixelDescOps.equals([startPixel], [])
```

### descOps.with(leftAssetDesc, rightAssetDesc)

- `leftAssetDesc` `{AssetDesc}`
- `rightAssetDesc` `{AssetDesc}`
- Returns: `{AssetDesc}`

Returns a new assetDesc that includes both leftAssetDesc and rightAssetDesc. For fungible assetDescs this means adding the extents. For other kinds of assetDescs, it usually means including both.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelDescOps = galleryPixelAssay.getDescOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns []
galleryPixelDescOps.with([], [])

// returns [startPixel]
galleryPixelDescOps.with([startPixel]), [])

// returns [startPixel]
galleryPixelDescOps.with([], [startPixel])

// returns [startPixel]
galleryPixelDescOps.with([startPixel], [startPixel])

// returns [startPixel, secondPixel]
galleryPixelDescOps.with([startPixel], [secondPixel])

// returns [startPixel, secondPixel]
galleryPixelDescOps.with([startPixel, secondPixel], [startPixel])
```

### descOps.without(leftAssetDesc, rightAssetDesc)

- `leftAssetDesc` `{AssetDesc}`
- `rightAssetDesc` `{AssetDesc}`
- Returns: `{AssetDesc}`

Returns a new AssetDesc that includes the portion of leftAssetDesc not included in rightAssetDesc. If leftAssetDesc doesn't include rightAmout, throw an error.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelDescOps = galleryPixelAssay.getDescOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns []
galleryPixelDescOps.without([]), [])

// returns [startPixel]
galleryPixelDescOps.without([startPixel]), [])

// throws error
galleryPixelDescOps.without([]), [startPixel])
```

# <span style="color:red">Should we move the following descriptions to the top?</span>
## Label
The label for an assetDesc identifies the assay, and includes a description of the rights it represents.

Every assetDesc created by the DescOps will have the same label, but recipients cannot use the label by itself to verify that a purported assetDesc is authentic, since the label can be copied.

## Description
Human-readable description of a kind of rights. The Descriptions must be Comparables. (This IDL doesn't yet provide a way to specify subtype relationships for structs.)

## UniDescOps
UniDescOps represents assetDescs that have unique descriptions. It is a refinement of DescOps that we've found useful, but has no special place in the protocol.

The extent must either be null, in which case it is empty,or be some truthy comparable value, in which case it represents a single unique unit described by that truthy extent. Combining two uni assetDescs with different truthy extents fails, as they represent non-combinable rights.

## NatDescOps
DescOps for a labeled natural number describing a extent of fungible erights. The label describes what kinds of rights these are. NatDescOps is a refinement of DescOps that we've found useful, but has no special place in the protocol.

Empty assetDescs have zero units. 'includes()' verifies that leftAssetDesc is greater than or equal to rightAssetDesc. 'with()' and 'without()' add and subtract their contents.
