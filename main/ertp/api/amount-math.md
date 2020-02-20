# Amount Math
Amounts describe digital assets. From an amount, you can learn the kind of digital asset as well as "how much" or "how many". These two parts are known as the **brand** (the kind of digital asset) and the **extent** (the answer to "how much"). For example, in the phrase "5 bucks", "bucks" takes the role of the brand and the extent is 5. Amounts can describe fungible and non-fungible digital assets. Amounts are pass-by-copy and can be made by and sent to anyone.

The issuer has an internal table that maps purses and payments to amounts. The issuer must be able to do things such as add digital assets to a purse and withdraw digital assets from a purse. To do so, it must know how to add and subtract digital assets. Rather than hard-coding a particular solution, we chose to parameterize the issuer with a collection of polymorphic functions, which we call `amountMath`. These math functions include concepts like addition, subtraction, and greater than or equal to.

We also want to make sure there is no confusion as to what kind of asset we are using. Thus, amountMath includes checks of the `brand`, the unique identifier for the type of digital asset. If the wrong brand is used in amountMath, an error is thrown and the operation does not succeed.

amountMath uses mathHelpers to do most of the work, but then adds the brand to the result. The function `extent` gets the extent from the amount by removing the brand (amount -> extent), and the function `make` adds the brand to produce an amount (extent -> amount). The function `coerce` takes an amount and checks it, returning an amount (amount -> amount).

`makeAmount` takes in a brand and the name of the particular mathHelpers to use.

amountMath is unfortunately not pass-by-copy. If you call `getAmountMath` on a remote issuer, it will be a remote object and each call will incur the costs of calling a remote object. However, you can create a local amountMath by importing this module locally and recreating by passing in a brand and an mathHelpers name, both of which can be passed-by-copy (since there are no calls to brand in this module).

Each issuer of digital assets has an associated brand in a one-to-one mapping. In untrusted contexts, such as in analyzing payments and amounts, we can get the brand and find the issuer which matches the brand. The issuer and the brand mutually validate each other.

## unitOps.getLabel()

- Returns: `{Label}`

Return this unitOps's label.

```js
import { makeMint } from '../../core/mint';

const localMint = makeMint(description, makeMintKeeper, makeUnitOps);
const localAssay = localMint.getAssay();
const localLabel = localAssay.getLabel();
```

## unitOps.make(allegedExtent)

- `allegedExtent` `{Extent}`
- [TOOD: add secod and third (optional) params]
- Returns: `{Units}`

Make a new verified Units containing the `allegedExtent`.

```js
const inviteUnits = inviteUnitOps.make(seatDescription);
```

## unitOps.coerce(allegedUnits)

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

## unitOps.extent(units)

- `units` `{Units}`
- Returns: `{Extent}`

Return an Extent representing the Units parameter.

```js
const coordinateExtent = coordinateUnitOps.extent([{ x: 0, y: 0 }, { x: 1, y: 0 }]);

const fungibleExtent = fungibleUnitOps.extent(1);

const rightsExtent = rightsUnitOps.extent('This is an example of a string as an extent for rightsUnitOps.');
```

## unitOps.empty()

- Returns: `{Units}`

Return an empty units. Conveys no authority.

```js
const emptyUnits = exampleUnitOps.empty();
```

## unitOps.isEmpty(units)

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

## unitOps.includes(leftUnits, rightUnits)

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

## unitOps.equals(leftUnits, rightUnits)

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

## unitOps.with(leftUnits, rightUnits)

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

## unitOps.without(leftUnits, rightUnits)

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
