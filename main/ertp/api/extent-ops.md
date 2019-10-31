# ExtentOps

All of the difference in how a unitOps behaves can be reduced to the behavior of the set operations on extents (think: arithmetic) such as `empty`, `with`, `without`, `includes`, etc. We extract this custom logic into an extentOps. ExtentOps are about extent arithmetic, whereas UnitOps are about Units, which are labeled extents. UnitOps use ExtentOps to do their extent arithmetic, and then label the results, making new Units.

## extentOps.insistKind(allegedExtent)
- `allegedExtent` `{Extent}`
- Returns: `{Extent}`

Check the kind of this extent and throw if it is not the expected kind.

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const pixelList = [startPixel, secondPixel, thirdPixel];

// Creates an array of pixels
const pixelExtentOps = makePixelExtentOps();

// Successful check
pixelExtentOps.insistKind(pixelList));

// Throws error because pixelExtentOps expects an array
pixelExtentOps.insistKind(startPixel);
```

## extentOps.empty()
- Returns: `{Extent}`

Get the representation for empty.

```js
const empty = exampleExtentOps.empty();
```

## extentOps.isEmpty(extent)
- `extent` `{Extent}`
- Returns: `{boolean}`

Is the extent empty?

```js
const isExtentEmpty = exampleExtentOps.isEmpty(randomExtent);
```

## extentOps.includes(whole, part)
- `whole` `{Extent}`
- `part` `{Extent}`
- Returns: `{boolean}`

Does the whole include the part?

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };
const thirdPixel = { x: 0, y: 2 };
const fourthPixel = { x: 9, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns true:
extentOps.include([], []);
extentOps.include([startPixel], []);
extentOps.include([startPixel], [startPixel]);
extentOps.include([startPixel, secondPixel], [startPixel]);

// returns false:
extentOps.include([], [startPixel]);
extentOps.include([startPixel], [secondPixel]);
extentOps.include([startPixel, thirdPixel], [secondPixel, fourthPixel]);
extentOps.include([startPixel, secondPixel, thirdPixel], [thirdPixel, fourthPixel]);
```

## extentOps.equals(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Does left equal right?

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns true:
extentOps.equals([], []);
extentOps.equals([startPixel], [startPixel]);

// returns false:
extentOps.equals([startPixel], []);
```

## extentOps.with(left, right)
- `left` `{Extent}`
- `right` `{Extent}`
- Returns: `{Extent}`

Return the left combined with the right

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns []
extentOps.with([], []);

// returns [startPixel]
extentOps.with([startPixel]), []);

// returns [startPixel]
extentOps.with([], [startPixel]);

// returns [startPixel]
extentOps.with([startPixel], [startPixel]);

// returns [startPixel, secondPixel]
extentOps.with([startPixel], [secondPixel]);

// returns [startPixel, secondPixel]
extentOps.with([startPixel, secondPixel], [startPixel]);
```

## extentOps.without(whole, part)
- `whole` `{Extent}`
- `part` `{Extent}`
- Returns: `{Extent}`

Return what remains after removing the part from the whole.

```js
const startPixel = { x: 0, y: 0 };
const secondPixel = { x: 0, y: 1 };

// Create extent operations (extentOps) for the asset.
const extentOps = makePixelExtentOps();

// returns []
extentOps.without([]), []);

// returns [startPixel]
extentOps.without([startPixel]), []);

// throws error
extentOps.without([]), [startPixel]);
```
