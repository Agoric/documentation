# Notifiers

Agoric uses a Notifier based on Promises to distribute state change updates. Notifiers rely on
promises to deliver a stream of messages allowing many subscribers to receive notifications without
the publisher having to track a subscription list.

An object that wants to publish updates to interested clients would make a `notifier` available to
them. The clients request the current state by calling `notifier.getUpdateSince()`, which returns
(a promise for) a record containing `{ value, updateCount }`. From that point on, the next update
can be retrieved by calling

<<< @/snippets/test-distributed-programming.js#getUpdateSince

On each call, if updateCount is the same as the current count, the promise won't be resolved until
a new value is reported to the notifier. If updateCount is different, the promise is resolved
immediately with the current state. If the stream is completed, the record will contain an
undefined updateCount.

Notifiers are the facet of the protocol that provides updates to consumers. The other side is an
updater, which is how information providers supply information.  The object that wants to publish
information starts by calling `makeNotifierKit()`, which returns `{ notifier, updater }`. The
notifier is provided to clients, while the updater is retained internally. The updater has three
methods, `updateState(state)`, `finish(finalState)`, and `fail(reason)`. `updateState` supplies a
new state that will be used to resolve all the outstanding promises. `finish` and `fail` both close
the stream, one with a final state, the other by rejecting the promise, so that clients' Promises
will also be rejected.

`notifier.getUpdateSince()` returns `{ value, updateCount }`.
- `value` represents the state, and the format is up to the publisher.
- `updateCount` is used to request notification the next time there's a change to the state. If the
  state becomes final (e.g. a seat exits), updateCount will be `undefined`.  If there's an error,
  the promise for the record is rejected and there isn't a next state.

If you call `getUpdateSince(oldUpdateCount)`:
- With no count, or any `updateCount` other than the most recent one:
  - The notifier immediately returns a promise for a record with the current state.
- With the most-recently generated `updateCount`:
  - The notifier returns a promise for the next record, which is resolved on the next state change.
- If you haven't called `getUpdateSince()` before, you won't have a previous updateCount to use.

Some notification systems also provide access to a complete history of an object's state
changes. The Agoric Notifier API only directly supports the single state change notification
style. The client can't work around this by keeping lists of changes, since the service doesn't
guarantee that clients will see all the changes.

An alternative approach for services that want to ensure their clients receive a more complete
history is to represent the state as a set of changes leading up to the present. Use cases for this
include an editor with an undo function, or an application with rollback ability.

Rather than sending `"the current state is 'blue'."`, a contract could send `"the current state is
'blue', the most recent update was { ''blah' => 'blue' }"`.  If you, as a contract author,
determine that clients want this much detail, you would have to package and send it.

## Follower pattern

A common pattern for following updates to a notifier until it's done is the following.  Note that
the notifier object is remote, and so we use `E()`.  Also, `PublicAPI` is a widely available
contract facet, where it often makes sense to put a `getNotifier()` method.

<<< @/snippets/test-distributed-programming.js#follower

## Providing updates

Objects that want to share info about changes to their state can use a notifier to provide
updates. Publishers import and call `makeNotifierKit()`, which returns two facets, a notifier
and an updater. The notifier object can be shared to provide the ability to see the object's state
changes.

<<< @/snippets/test-distributed-programming.js#importNotifier
<<< @/snippets/test-distributed-programming.js#makeNotifierKit

The updater has three methods, which send a notification with the new state to any waiting
notifiers:
- `updateState(newState)` provides a new state, so all active Promises produced by
  `getUpdateSince()` are resolved to the next record.
- `finish(finalState)` provides a new state, and terminates the stream. The record that the
  Promises resolve to doesn't include an updateCount (i.e. it is `undefined`), which can be used to
  detect the final state.
- `fail(reason)` doesn't provide a next state. Instead, it causes the Promise to be rejected with
    the `reason`, signalling that the monitored object hit an error condition.

## Use of Notifiers in Zoe

Zoe provides updates on the state of seats within a contract. The updates from Zoe indicate changes
to the allocation of a seat and seats exiting. These are available from `E(userSeat).getNotifier()`
and `zcfSeat.getNotifier()`, which provide long-lived notifier objects associated with a particular
seat. `zcfSeat`s are available within contracts while `userSeat`s are accessible from the REPL,
deploy scripts, and other code outside contracts.

Individual contracts can also use notifiers to provide updates giving current prices or other
contract-specific details.

Zoe's updates for an offer show the current allocation that will be paid if the contract completes
without further changes.
