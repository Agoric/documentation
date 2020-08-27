# Mint

Only a `mint` can issue new digital assets, so only the holder of a `mint` can
do so. A `mint` has a one-to-one relationship with both an `issuer` and a `brand`,
and can only mint new assets of that `brand` and is the only `'mint` that can mint
new `brand` type assets for its associated `brand`.

## makeIssuerKit(allegedName, amountMathKind)
- `allegedName` `{String}`
- `amountMathKind` `{MathKind}`
- Returns: `{Purse}`

While not a method called on a `mint`, clearly it's important to know how to create a new `mint`. 
`makeIssuerKit()` returns a new `issuer`, `mint`, `amountMath`, and `brand`. 
See [here](./issuer.md#makeissuerkit-allegedname-amountmathkind) for details.

## mint.getIssuer()
- Returns: `{Issuer}`

Get the `Issuer` associated with this `mint`. A `mint` is always in an unchangable
one-to-one relationship with an `issuer` from their creation. 

```js
const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit('quatloos');
const quatloosMintIssuer = quatloosMint.getIssuer();

// returns true
Object.is(issuer, quatloosMintIssuer);
```

## mint.mintPayment(newAmount)
- `newAmount` `{Amount}`
- Returns: `{Payment}`

Create new digital assets of the `mint`'s associated `brand`.
A `mint` is always in an unchangable
one-to-one relationship with a `brand` from their creation. 

Returns a `payment` containing the newly minted assets. 

```js
const { issuer: quatloosIssuer, mint: quatloosMint
        amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');

const quatloos1000 = quatloosAmountMath.make(1000);
// newPayment will have a balance of 1000 Quatloos
const newPayment = quatloosMint.mintPayment(quatloos1000);
```
