# ERTP Glossary

## Alleged `<item>`
`allegedName`, `allegedExtent`, `allegedUnits`

Because there is no way to actually prove the item you are calling or passing through is what it says it is, we prepend `alleged` to these terms to get that sentiment across.

## AllegedName
Human-readable name of a kind of rights. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be Comparable.

## AllegedExtent
The alleged amount or description of a unique asset. See [Extent](#extent) for full definition.

## AllegedUnits
The alleged description of tradeable goods. See [Unit](#unit) for full definition.

## Assay
An Assay represents the identity of an issuer. Holding an Assay provides the ability to create units and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

## AssetHolder
Purses and Payments are AssetHolders.

## ContractHost
A platform for evaluating contract code and handing out seats in that contract. A way to install and run verifiable contracts.

## ERTP
Electronic Rights Transfer Protocol - a smart contract framework that uses object capabilities to enforce access control. Instead of having to prove ownership of a corresponding private key, in the world of object capabilities, if your program has a reference to an object, it can call methods on that object. If it doesn't have a reference, it can't. For more on object capabilities, see [Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## Extent
Extents describe the extent of something that can be owned or shared: How much, how many, or description of unique asset. (Pixel(3,2), $3 or ‘Right to occupy on Tuesdays’). Fungible extents are normally represented by natural numbers. Other extents may be represented as strings naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

Extent must be Comparable.

## ExtentOps
“Arithmetic” operations on Extents. All of the difference in how a unitOps behaves can be reduced to the behavior of the set operations on extents (think: arithmetic) such as `empty`, `with`, `without`, `includes`, etc. We extract this custom logic into an extentOps. ExtentOps are about extent arithmetic, whereas UnitOps are about Units, which are labeled extents. UnitOps use ExtentOps to do their extent arithmetic, and then label the results, making new Units

## Label
The label in units identifies the assay, and includes an allegedName that was provided by the maker of the mint.

### Composition
`AllegedName (made by maker of mint) + Assay`

## Mint
The autority to mint. The right to control issuance and destruction of purses and payments containing `units` of a particular currency.

## Purse
An [AssetHolder](#assetholder). Purses hold verified units of certain rights issued by Mints, specifically units that are _stationary_. Purses can transfer part of the balance they hold in a [payment](#payment), which has a narrower interface. [Purse API](/ertp/api/mint.html#purse)

## Payment
An [AssetHolder](#assetholder). Payments hold verified units of certain rights issued by Mints, specifically units that are in _transit_. Units from payments can be deposited in [purses](#purse), but otherwise, the entire unit is available when the payment is transferred. Payments can be converted to Purses. [Payment API](/ertp/api/mint.html#payment)

## Unit
Units are the canonical description of tradeable goods. They are manipulated by mints, and represent the goods and currency carried by purses and payments. They can be used to represent things like currency, stock, and the abstract right to participate in a particular exchange.

### Composition
`Label + Extent`

## UnitOps
 "Arithmetic" operations on [Units](#unit), used for actions like withdrawing a payment from a purse. All of the custom behavior is stored in the ExtentOps, allowing for UnitOps to be polymorphic, exposing the same interface while allowing custom behavior.

## UseObj
A object associated with purses and payments that has custom behavior associated with the use of digital assets
