# Mint

Only the mint can issue new digital assets, so only the holder of the mint can
create new digital assets. These assets all have the same kind, which is called a
[`Brand`](./brand.md).

## mint.getIssuer()
- Returns: `{Issuer}`

Get the Issuer for this mint.

```js
const { issuer, mint } = produceIssuer('bucks');
const mintIssuer = mint.getIssuer();

// returns true
Object.is(issuer, mintIssuer);
```

## mint.mintPayment(newAmount)
- `newAmount` `{Amount}`
- Returns: `{Payment}`

Create a new Payment containing newly minted amount.

```js
const { issuer, mint } = produceIssuer('fungible');

const fungible1000 = amountMath.make(1000);
const newPayment = mint.mintPayment(fungible1000);
```
