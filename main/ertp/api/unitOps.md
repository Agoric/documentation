# UnitOps API

## Definitions

### Extent
Extents answer the question 'how much?' or 'how many?'. Fungible
extents are normally represented by natural numbers. For instance, if
we refer to "3 bucks", the "3" is the extent. Other extents may be
represented as strings naming a particular right (e.g. seat 'G19'), or
an arbitrary object that sensibly represents the rights at issue.
Extents must be pass-by-copy and Comparable. Extents are unlabeled,
meaning that they alone are not necessarily associated with a
particular assay or mint.

### Units
Units are labeled extents. To be specific, units are a record with two
parts: a label, which identifies an assay, and an extent. The balance
of a purse or payment is in units. For example, the balance of a purse
might be 3 bucks, written in units as:

```js
{
  label: {
    allegedName: 'bucks',
    assay: bucksAssay,
  },
  extent: 3,
}
```

### UnitOps
UnitOps are the "arithmetic" operations on units, used for actions like
withdrawing a payment from a purse. All of the custom behavior is
stored in the ExtentOps, allowing for UnitOps to be polymorphic,
exposing the same interface while allowing custom behavior.

Units are the canonical description of tradable goods. They are
manipulated by mints, and represent the goods and currency carried by
purses and payments. They can be used to represent things like
currency, stock, and the abstract right to participate in a particular
exchange.

### Label
The label in units identifies the assay, and includes an allegedName
that was provided by the maker of the mint. This allegedName should
not be trusted as accurate (for instance, anyone can create a mint
with allegedName 'BTC'), but the allegedName can be useful for
debugging and double-checking actions.

## Types of UnitOps

### UniUnitOps
UniUnitOps represents units that have unique descriptions. It is a refinement of UnitOps that we've found useful, but has no special place in the protocol.

The extent must either be null, in which case it is empty,or be some truthy comparable value, in which case it represents a single unique unit described by that truthy extent. Combining two uni units with different truthy extents fails, as they represent non-combinable rights.

### NatUnitOps
UnitOps for a labeled natural number describing a extent of fungible erights. The label describes what kinds of rights these are. NatUnitOps is a refinement of UnitOps that we've found useful, but has no special place in the protocol.

Empty units have an extent equal to 0. 'includes()' verifies that leftUnits is greater than or equal to rightUnits. 'with()' and 'without()' add and subtract their contents.

## unitOps Methods

### unitOps.getLabel()

- Returns: `{Label}`

Return this unitOps's label.

```js
import { makeMint } from '../../core/mint';

const localMint = makeMint(description, makeMintKeeper, makeUnitOps);
const localAssay = localMint.getAssay();
const localLabel = localAssay.getLabel();
```

### unitOps.make(allegedExtent)

- `allegedExtent` `{Extent}`
- [TOOD: add secod and third (optional) params]
- Returns: `{Units}`

Make a new verified Units containing the `allegedExtent`.

```js
inviteMaker.make('writer', bobSeat);
```

### unitOps.coerce(allegedUnits)

- `allegedUnits` `{Units}` - An Units object made by this particular UnitOps. Function will error otherwise.
- Returns: `{Units}`

Is this like a Units object made by this UnitOps, such as one received by pass-by-copy from an otherwise-identical remote Units? If so, return a Units object made by this UnitOps. Otherwise error.

For fungible Units based on natural numbers, coerce also accepts a bare number which it will coerce to a labeled number via `unitOps.make()`.

```js
function insistUnitsEqualsPaymentBalance(units, payment) {
  // using coerce() here checks that units being passed in has the correct format
  units = unitOps.coerce(units);
  const paymentUnits = paymentKeeper.getUnits(payment);
  insist(
    unitOps.equals(units, paymentUnits),
  )`payment balance ${paymentUnits} must equal units ${units}`;
  return paymentUnits;
}
```

### unitOps.extent(units)

- `units` `{Units}`
- Returns: `{Extent}`

Return an Extent representing the Units parameter.

```js
const coordinateExtent = coordinateUnitOps.extent([{ x: 0, y: 0 }, { x: 1, y: 0 }]);

const fungibleExtent = fungibleUnitOps.extent(1);

const rightsExtent = rightsUnitOps.extent('This is an example of a string as an extent for rightsUnitOps.');
```

### unitOps.empty()

- Returns: `{Units}`

Return an empty units. Conveys no authority.

```js
const emptyUnits = exampleUnitOps.empty();
```

### unitOps.isEmpty(units)

- `units` `{Units}`
- Returns: `{boolean}`

Return true if the Units is empty. Otherwise false.

```js
const emptyUnits = exampleUnitOps.empty();
const notEmptyUnits = exampleUnitOps.make([]);

// returns true
exampleUnitOps.isEmpty(emptyUnits);

// returns false
exampleUnitOps.isEmpty(notEmptyUnits);
```

### unitOps.includes(leftUnits, rightUnits)

- `leftUnits` `{Units}`
- `rightUnits` `{Units}`
- Returns: `{boolean}`

Returns true if the `leftUnits` contains the `rightUnits`.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelUnitOps = galleryPixelAssay.getUnitOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const fourthPixel = { x: 9, y: 1 };

// returns true:
galleryPixelUnitOps.include([], []);
galleryPixelUnitOps.include([startPixel], []);
galleryPixelUnitOps.include([startPixel], [startPixel]);
galleryPixelUnitOps.include([startPixel, secondPixel], [startPixel]);

// returns false:
galleryPixelUnitOps.include([], [startPixel]);
galleryPixelUnitOps.include([startPixel], [secondPixel]);
galleryPixelUnitOps.include([startPixel, thirdPixel], [secondPixel, fourthPixel]);
galleryPixelUnitOps.include([startPixel, secondPixel, thirdPixel], [thirdPixel, fourthPixel]);
```

### unitOps.equals(leftUnits, rightUnits)

- `leftUnits` `{Units}`
- `rightUnits` `{Units}`
- Returns: `{boolean}`

Returns true if the leftUnits equals the rightUnits. We assume that if includes is true in both directions, equals is also true.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelUnitOps = galleryPixelAssay.getUnitOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns true:
galleryPixelUnitOps.equals([], []);
galleryPixelUnitOps.equals([startPixel], [startPixel]);

// returns false:
galleryPixelUnitOps.equals([startPixel], []);
```

### unitOps.with(leftUnits, rightUnits)

- `leftUnits` `{Units}`
- `rightUnits` `{Units}`
- Returns: `{Units}`

Returns a new units that includes both leftUnits and rightUnits. For fungible units this means adding the extents. For other kinds of units, it usually means including both.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelUnitOps = galleryPixelAssay.getUnitOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns []
galleryPixelUnitOps.with([], []);

// returns [startPixel]
galleryPixelUnitOps.with([startPixel]), []);

// returns [startPixel]
galleryPixelUnitOps.with([], [startPixel]);

// returns [startPixel]
galleryPixelUnitOps.with([startPixel], [startPixel]);

// returns [startPixel, secondPixel]
galleryPixelUnitOps.with([startPixel], [secondPixel]);

// returns [startPixel, secondPixel]
galleryPixelUnitOps.with([startPixel, secondPixel], [startPixel]);
```

### unitOps.without(leftUnits, rightUnits)

- `leftUnits` `{Units}`
- `rightUnits` `{Units}`
- Returns: `{Units}`

Returns a new Units that includes the portion of leftUnits not included in rightUnits. If leftUnits doesn't include rightAmout, throw an error.

```js
import { makeMint } from '../../core/mint';

const galleryPixelMint = makeMint('pixels', makePixelConfig);
const galleryPixelAssay = galleryPixelMint.getAssay();
const galleryPixelUnitOps = galleryPixelAssay.getUnitOps();

const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// returns []
galleryPixelUnitOps.without([]), []);

// returns [startPixel]
galleryPixelUnitOps.without([startPixel]), []);

// throws error
galleryPixelUnitOps.without([]), [startPixel]);
```
