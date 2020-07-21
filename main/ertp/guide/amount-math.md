# Amount Math

The [issuer](./issuer.md) has an internal table that maps [purses](../api/purse.md) and [payments](../api/payment.md) to [amounts](./amounts.md). The issuer must be able to do things such as add digital assets to a purse and withdraw digital assets from a purse. To do so, it must know how to add and subtract digital assets. Rather than hard-coding a particular solution, we chose to parameterize the issuer with a collection of polymorphic functions, which we call `amountMath`. These math functions include concepts like addition, subtraction, and greater than or equal to.

We also want to make sure there is no confusion as to what kind of asset we are using. Thus, amountMath includes checks of the `brand`, the unique identifier for the type of digital asset. If the wrong brand is used in amountMath, an error is thrown and the operation does not succeed.

AmountMath uses [mathHelpers](./math-helpers.md) to do most of the work, but then adds the brand to the result. The amountMath function `value()` gets the value from the amount by removing the brand (amount -> value), and the function `make()` adds the brand to produce an amount (value -> amount). The function `coerce()` takes an amount and checks it, returning an amount (amount -> amount). `makeAmount()` takes in a brand and the name of the particular mathHelpers to use.

AmountMath is unfortunately not pass-by-copy. If you call `getAmountMath()` on a remote issuer, it will be a remote object and each call will incur the costs of calling a remote object. However, you can create a local amountMath by importing this module locally and recreating by passing in a brand and a mathHelpers name, both of which can be passed-by-copy (since there are no calls to brand in this module).

Each issuer of digital assets has an associated brand in a one-to-one mapping. In untrusted contexts, such as in analyzing payments and amounts, we can get the brand and find the issuer which matches the brand. The issuer and the brand mutually validate each other.
