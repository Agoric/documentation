# Issuers

Issuers have several properties that allow for the creation and manipulation of digital assets. These properties include `mint`, `purses`, `payments`, [amountMath](./amount-math.md) and [mathHelpers](./math-helpers.md)

## Mint

Holding a Mint carries the right to to issue new digital assets. These assets all have the same kind, which is called a [`Brand`](./brand.md).

Purses and payments associated with a particular issuer can only transfer value to others using the same mint.

The primary use for Purses and Payments is for currency-like and goods-like valuables, but they can also be used to represent other kinds of rights, such as the right to participate in a particular contract.

## Purses

Purses hold verified `amounts` of certain rights issued by Mints. Purses can transfer part of the balance they hold in a payment, which has a narrower interface.

## Payments

Payments hold verified `amounts` of certain rights issued by Mints. Amounts from payments can be deposited in purses, but otherwise, the entire amount is available when the payment is transferred. Payments can be converted to Purses.