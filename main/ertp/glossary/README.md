# ERTP Glossary

## Assay
An Assay represents the identity of an issuer. Holding an Assay provides the ability to create units and empty purses, but confers no rights. It is also the mechanism used to get exclusive access to a Purse or Payment that you already hold, or to burn some or all of the contained rights.

## AssetHolder
Purses and Payments are AssetHolders.

## ContractHost
A platform for evaluating contract code and handing out seats in that contract

## ERTP
Electronic Rights Transfer Protocol - a smart contract framework that uses object capabilities to enforce access control. Instead of having to prove ownership of a corresponding private key, in the world of object capabilities, if your program has a reference to an object, it can call methods on that object. If it doesn't have a reference, it can't. For more on object capabilities, see [Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## Extent
How much, how many, or description of unique asset. (Pixel(3,2), $3 or ‘Right to occupy on Tuesdays’)

## ExtentOps
“Arithmetic” operations on Extents

## Label
AllegedName (made by maker of mint) + Assay

## Mint
The autority to mint. The right to control issuance and destruction of purses and payments containing `units` of a particular currency.

## Purse
An [AssetHolder](#assetholder). Purses hold verified units of certain rights issued by Mints, specifically units that are _stationary_. Purses can transfer part of the balance they hold in a [payment](#payment), which has a narrower interface. [Purse API](/ertp/api/mint.html#purse)

## Payment
An [AssetHolder](#assetholder). Payments hold verified units of certain rights issued by Mints, specifically units that are in _transit_. Units from payments can be deposited in [purses](#purse), but otherwise, the entire unit is available when the payment is transferred. Payments can be converted to Purses. [Payment API](/ertp/api/mint.html#payment)

## Unit
Label (allegedName + assay) + Extent

## UnitOps
"Arithmetic" operations on [Units](#unit)

## UseObj
A object associated with purses and payments that has custom behavior associated with the use of digital assets
