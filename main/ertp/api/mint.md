# Mint

Only a `mint` can issue new digital assets, so only the holder of the `mint` can
do so. A `mint` has a one-to-one relationship with both an `issuer` and a `brand`,
and can only mint new assets of that `brand`.

## mint.getIssuer()
- Returns: `{Issuer}`

Get the `Issuer` for this `mint`.

```js
const { issuer, mint } = makeIssuerKit('quatloos');
const mintIssuer = mint.getIssuer();

// returns true
Object.is(issuer, mintIssuer);
```

## mint.mintPayment(newAmount)
- `newAmount` `{Amount}`
- Returns: `{Payment}`

Create new digital assets of the `mint`'s associated `brand`.
Returns a `payment containing the newly minted assets..

```js
const { issuer, mint } = makeIssuerKit('quatloos');

const quatloos1000 = amountMath.make(1000);
// newPayment will have a balance of 1000 Quatloos
const newPayment = mint.mintPayment(quatloos1000);
```
