# Extent

Extents answer the question 'how much?' or 'how many?'. Fungible
extents are normally represented by natural numbers. For instance, if
we refer to "3 bucks", the "3" is the extent. Other extents may be
represented as strings naming a particular right (e.g. seat 'G19'), or
an arbitrary object that sensibly represents the rights at issue.

Extents must be pass-by-copy and [Comparable](https://github.com/Agoric/ERTP/blob/a7601a0fa1e26f4b2849e3c29d2026ab07331cfc/util/sameStructure.js#L32-L37).
Extents are unlabeled, meaning that they alone are not necessarily 
associated with a particular assay or mint.
