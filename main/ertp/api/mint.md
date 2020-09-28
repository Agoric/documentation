# Mint

Only a `mint` can issue new digital assets. 

A `mint` has a one-to-one relationship with both an `issuer` and a `brand`.
So it can only mint new assets of that `brand` and is the only `mint` that can mint
new assets of that `brand`.

## makeIssuerKit(allegedName, amountMathKind)
- `allegedName` `{String}`
- `amountMathKind` `{MathKind}`
- Returns: `{IssuerKit}`

While not a method called on a `mint`, clearly it's important to know how to create a new `mint`. 
`makeIssuerKit()` returns a new `issuer`, `mint`, `amountMath`, and `brand`. 
See <router-link to="./issuer.md#makeissuerkitallegedname-amountmathkind">here</router-link> for details.

## mint.getIssuer()
- Returns: `{Issuer}`

Get the `Issuer` associated with this `mint`. From their creation, a `mint` is always
in an unchangeable one-to-one relationship with an `issuer`. 

```js
const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit('quatloos');
const quatloosMintIssuer = quatloosMint.getIssuer();

// returns true
issuer === quatloosMintIssuer;
```

## mint.mintPayment(newAmount)
- `newAmount` `{Amount}`
- Returns: `{Payment}`

**Important**: `mint.mintPayment()` is the <ins>only</ins> way
to create new digital assets. There is no other way.

Create new digital assets of the `mint`'s associated `brand`.
From their creation, a `mint` is always in an unchangeable
one-to-one relationship with a `brand`.

Returns a `payment` containing the newly minted assets. 

```js
const { issuer: quatloosIssuer, mint: quatloosMint
        amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');

const quatloos1000 = quatloosAmountMath.make(1000);
// newPayment will have a balance of 1000 Quatloos
const newPayment = quatloosMint.mintPayment(quatloos1000);
```
