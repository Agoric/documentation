# Mint

Holding a Mint carries the right to issue new digital assets. These assets all have the same kind, which is called a [`Brand`](./brand.md).

## mint.getIssuer()
- Returns: `{Issuer}`

Get the Issuer for this mint.

```js
const { issuer, mint } = produceIssuer('fungible');

const mintIssuer = mint.getIssuer()

// returns true
Object.is(issuer, mintIssuer)
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
