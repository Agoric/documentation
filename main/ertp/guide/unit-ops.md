# UnitOps
UnitOps are the "arithmetic" operations on units, used for actions like
withdrawing a payment from a purse. All of the custom behavior is
stored in the [ExtentOps](./extent), allowing for UnitOps to be polymorphic,
exposing the same interface while allowing custom behavior.

## Types of UnitOps

### UniUnitOps
UniUnitOps represents units that have unique descriptions. It is a refinement of UnitOps that we've found useful, but has no special place in the protocol.

The extent must either be `null`, in which case it is empty, or be some [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) comparable value, in which case it represents a single unique unit described by that truthy extent. Combining two uni units with different truthy extents fails, as they represent non-combinable rights.

### NatUnitOps
UnitOps for a labeled natural number describing a extent of fungible erights. The label describes what kinds of rights these are. NatUnitOps is a refinement of UnitOps that we've found useful, but has no special place in the protocol.

Empty units have an extent equal to 0. `includes()` verifies that leftUnits is greater than or equal to rightUnits. `with()` and `without()` add and subtract their contents.
