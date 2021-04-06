# Amounts, Values, and Brands

## Amounts

![Amount methods](./assets/amount.svg) 

`Amounts` describe digital assets. There are no `amount` API methods.
Instead, an `amount` has two properties, `value` and `brand` with their own API methods.
Use the `amountMath` API methods (covered in-depth 
[here](../api/amount-math.md))
to get information about and otherwise manipulate an `amount` as a whole.
`amountMath.make()` is generally how you make new `amounts`.

However, you can also make an `amount` as an object literal by making a record of
a `brand` and a `value`. While `amountMath.make()` is recommended for proper object-oriented programming (it also checks the `brand`'s validity), this produces the same result:

<<< @/snippets/ertp/guide/test-amounts.js#manualMake
`amount` has two properties:
- **Brand**: The kind of digital asset, such as our imaginary `Quatloos` currency or,
  in a game, a powerful magic sword with a brand of `Plus3Sword-ABCGames` or similar.
- **Value**: How much/many of the asset. Fungible values are natural
numbers represented as BigInts. Non-fungible values may be represented as strings naming a
particular right, or an arbitrary object representing the rights at
issue (e.g., a theatre ticket's date, time, row and seat positions).

`amounts` and their `values` and `brands` are manipulated by
the `AmountMath`
API. It executes the logic of how `amounts` change when digital 
assets are merged, separated, or otherwise manipulated. For example, 
you make an offer for something, which is declined. You want to change your 
offer, represented as an `amount`, to be of a greater `value` by adding to it.

## Brands

![Brand methods](./assets/brand.svg) 

A `brand` object is an `amount` object's kind of digital asset, such as
our imaginary Quatloos currency or, in a game, a powerful magic
sword.

In ERTP, `mint` objects create new asset `payment`
objects. Each `mint` has a one-to-one relationship with an `issuer`
object. And each `issuer` object has a one-to-one
relationship with a `brand` object. This means:
- A `mint` can only create a `payment` for one specific `brand`, which
  must be the same `brand` as their associated `issuer`.
- An `issuer` can only create a new empty `purse` 
for one specific `brand`.
- An `amount` is either *fungible* or *non-fungible*, as determined by which
its `issuer`, and thus its `brand`, was created to be. 

A `brand` has two associated methods. The following is a brief description 
and example of each `brand` method. For more detail, click the method's name 
to go to its entry in the [ERTP
API Reference](../api/). 

- [`brand.isMyIssuer(issuer)`](../api/brand.md#brand-ismyissuer-issuer)
  - Returns `true` if the `issuer` argument matches the `issuer` associated with the `brand`.
    We have this method because the `issuer` is authoritative and the `brand` is not. You can
    create a `payment`, `purse`, or `amount` with a `brand` that claims a particular `issuer`,
    without that `issuer` having been involved. But if you use that `payment` or `purse`, it won't be 
    accepted by genuine ones. So to know, you have to verify with the `issuer` to see if it agrees.
  - <<< @/snippets/ertp/guide/test-amounts.js#isMyIssuer
- [`brand.getAllegedName()`](../api/brand.md#brand-getallegedname)
  - Return the `brand`'s alleged name, but should not be trusted as accurate.
  - <<< @/snippets/ertp/guide/test-amounts.js#getAllegedName

The following methods on other ERTP components also either operate on or
return a `brand`.

- [`issuer.getBrand()`](/ertp/api/issuer.md#issuer-getbrand)
  - Returns the `brand` for the `issuer`. The `brand` is not closely
    held, so this should not be trusted to identify an `issuer`
    alone. Fake digital assets and `amount`s can use the `brand` of another `issuer`.
  - <<< @/snippets/ertp/guide/test-amounts.js#getBrand
- [`payment.getAllegedBrand()`](../api/payment.md#payment-getallegedbrand)
  - Return the `payment`'s alleged `brand`. Because a `payment`
  is not trusted, this should be treated with suspicion and verified
  elsewhere. This example code determines if a `payment` we got from untrusted sources
  is valid. It uses the `brand` to find a `purse` we want to deposit it in, then verifies
  that it's genuine.
  - <<< @/snippets/ertp/guide/test-amounts.js#depositSomewhere

## Values

![Value methods](./assets/value.svg) 

Values are the "how many" part of an `amount`. 

Note that numberic values (for fungible assets) are represented as `BigInts` and
not `Numbers`. So a value of "10" is written "10n" to show it is a `BigInt` 10.
See [here](/guides/js-programming/bigint.md) for more information about `BigInt`.

There are no `value`
methods, but two `amountMath` methods use or return them. 
- [`amountMath.getValue(amount, brand)`](../api/amount-math.md#amountmath-getvalue-amount-brand)
  - Return the `amount` argument's `value`
  - <<< @/snippets/ertp/guide/test-amounts.js#getValue
- [`amountMath.make(allegedValue)`](../api/amount-math.md#amountmath-make-allegedvalue)
  - Make an `amount`from a `value` by adding the
  `amountMath` associated `brand` to the `value`. 
  - <<< @/snippets/ertp/guide/test-amounts.js#make
    
