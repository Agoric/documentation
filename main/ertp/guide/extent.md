# Value

Values answer the question 'how much?' or 'how many?'. Fungible
values are normally represented by natural numbers. For instance, if
we refer to "3 bucks", the "3" is the value. Other values may be
represented as strings naming a particular right (e.g. seat 'G19'), or
an arbitrary object that sensibly represents the rights at issue.

Values must be pass-by-copy and [Comparable](https://github.com/Agoric/ERTP/blob/a7601a0fa1e26f4b2849e3c29d2026ab07331cfc/util/sameStructure.js#L32-L37).
Values are unlabeled, meaning that they alone are not necessarily
associated with a particular issuer or mint.
