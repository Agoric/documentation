# Durable Contract Details

Zoe allows you to write smart contracts that manage interactions between cooperative, but possibly untrusting,
parties. Some contracts perform a single simple task like trading one good for another, and then are
done. Others stay around and manage assets and interactions over time. The first kind don't need persistence
or the ability to upgrade, while the second kind need to make use of more sophisticated functionality.

When a contract is intended to continue running and serving many customers over a long time, its objects and
data need to be persistent, its owners or managers may need to be able to adjust parameters or perform other
governance actions, and they may want it to be upgradeable so that the code can adapt over time.

## Durable Objects

The first step toward contracts that can be upgraded is storing all the data that a later incarnation will
need. This means putting relevant state in [Baggage](/guides/zoe/contract-upgrade#baggage), and ensuring that
reachable objects that will be accessible to clients have an identity that can be maintained as the behavior
changes with contract upgrades.

We use zone.exo(), zone.exoClass(), and zone.exoClassKit() to define durable objects.

[Zone](/glossary/#zone) provides an interface for defining objects and classes that supports both ephemeral
objects (allocated on the heap), and durable objects that can persist and that
[SwingSet](/guides/platform/#swingset) will page in or out on demand.

Our persistent objects are designed to encapsulate their state, and can present different facets to different
clients to distinguish different aspects of authority. `zone.exoClass()` defines a kind with a single facet,
while `zone.exoClassKit()` defines a kind with multiple facets. (Here are some relevant [naming
conventions](/guides/ertp/#method-naming-structure).)

```
zone.exoClassKit(tag, guard, init, methodKit, options)
zone.exoClass(tag, guard, init, methods, options)
zone.exo(tag, guard, methods, options)
```

The next several sub-sections explain how the parameters to those functions are used.

### Tag: naming kinds of objects

The `tag` provides the identity of the kind of object, which is associated with the defined behavior. When a
contract (or other vat) is restarted or upgraded, SwingSet requires that all kinds that were previously
defined in a vat be defined again. With an upgrade, the behavior can be changed. We use the term "null
upgrade" to refer to upgrades that don't change the behavior.

### Init: specifying state

The `init` parameter defines a function that is used to define the state associated with each instance of an
object. Notice that `exo()` doesn't take `init` as a parameter; this limits the defined (singleton) object to
referencing values defined in the enclosing scope. Classes can also refer to variables in their defining
scope, but any values inherited from the scope will be accessible to all instances of that type. The `init`
function's parameters become the parameters of the maker function returned by `exoClass()` and
`exoClassKit()`. `init`'s return value is the state that will be preserved by SwingSet for each
object. `exo()` doesn't have an init parameter, so it creates and returns the singleton immediately rather
than returning a maker.

The Exo objects (or just "Exos") defined by these functions are both persistent and virtualizable. SwingSet
knows their complete state, so it can page them out when space is tight, and page them back in when they are
referenced again.

Fields of the object returned by the `init` function become fields of the persistent state. (_These cannot
currently be changed on upgrade, though we're considering relaxing that restriction._) Within methods they can
each be accessed as fields of `this.state`. Our convention is to extract the fields that will be used in a
method on its first line, like `const { a, b } = this.state;` Once that has been done, those variable can be
read or written as normal javascript variables, and the values will persist. (For more details, see [the note
here](/guides/zoe/contract-upgrade.html#kinds)).

### Methods: defining behavior

The methods argument of `exoClass()` is a record of methods, written in [concise method
syntax](https://github.com/Agoric/agoric-sdk/wiki/Arrow-Function-Style#far-classes-do-not-use-arrow-function-style).
`exoClass()` defines a single facet.

The methodKit parameter to `exoClassKit` is a record that can define multiple facets. The keys give the names
of the facets, and each value defines the methods of the corresponding facet. All facets of each object share
access to the entire state defined in `init`, but each facet is a separate capability. Within the methods,
other facets can be reached by name within `this.facets`. The maker returned by `exoClassKit()` builds a new
object each time it is called, and returns all the facets. The caller can decide which of the facets to hold
or to pass to separate recipients.

### Guards: defensive methods

These objects and facets are designed to be durable and shareable across address space boundaries. Since code
in different vats might not be mutually trusting, code needs to be defensive about parameters received from
remote callers. Interface Guards let us express in code what parameters each method expects and can handle
safely. If a caller provides a parameter that doesn't match the template specified in the guard, SwingSet
returns an exception to the caller without notifying the receiver. If the return value doesn't match, the
function returns an exception to the caller.

`exoClass()` takes a guard for a single interface, defined by

```
M.interface('name', {
  methodA: M.call(paramsAShape).returns(resultAShape),
  methodB: M.callWhen(M.await(paramsBShape)).returns(resultBShape),
}
```

`M.call()` verifies that all parameters match the guard before passing them through to the
method. `M.callWhen(M.await(paramsBGuard))` awaits the resolution of the parameter, and then verifies that the
result matches before invoking the method. When a guard is written this latter way, the method doesn't have to
be `async`. In both cases, the method doesn't have to check for compliance with the guard.

[Shapes can specify](https://endojs.github.io/endo/interfaces/_endo_patterns.PatternMatchers.html) simple
types like `M.string()`, `M.remotable()`, and `M.number()`, as well as complex structures of records and
arrays. The list of parameters can specify required and optional parameters, as well as allowing unspecified
rest parameters.

If you want to make use of the power of this type-checking within methods, you can call `mustMatch(specimen,
pattern)` or `matches(specimen, pattern)` directly. The former throws if the pattern doesn't match, while the
latter returns a boolean.

### Options: finish and stateShape

All the type definers can also take an [options
argument](https://endojs.github.io/endo/types/_endo_exo.FarClassOptions.html) at the end, which is commonly
used for a `finish()` function to complete initialization, or a stateShape, which can enforce invariants on
the state values.

`finish()`, if provided, is called after instances have been created but before they are returned to the
caller. They can be used to send an initial state update, or to complete initialization which couldn't be done
in `init`. `finish` has access to state and facets if needed.
