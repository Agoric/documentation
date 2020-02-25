# Issuers

An issuer maps the minted digital assets to their locations in purses
and payments. An issuer is used to verify and move
digital assets. The special admin facet of an issuer is known as a Mint.
Only mints can issue new digital assets.

## Mints

A mint has the authority to issue new digital assets in the form of
a new Payment. These assets all have the same kind, which is called a
[`Brand`](./brand.md).

These digital assets may be currency-like or goods-like valuables, but
they can also represent other kinds of rights, such as the right to
participate in a particular contract.

## Purses

Purses hold `amounts` of digital assets of the same brand. Purses should not be
transferred to another party. Instead, to transfer assets, a payment
should be withdrawn from the purse.

## Payments

Payments also hold `amounts` of digital assets of the same brand.
Amounts from payments can be deposited in purses.
