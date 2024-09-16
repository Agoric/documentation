# Notifiers and Subscriptions

_Notifiers_ and _subscriptions_ both let a service notify clients of state changes.
Specifically, both are abstractions for producing and consuming asynchronous
value sequences. They rely on promises to deliver a stream of messages allowing
many clients to receive notifications without the originator having to track a subscription list.
An object wanting to publish updates to interested clients makes a notifier or a
subscription available to them.

In JavaScript, async iterations are manipulated by `AsyncGenerators`, `AsyncIterables`, and `AsyncIterators`. For an introduction to them, see [Async iteration and generators](https://javascript.info/async-iterators-generators).

## Distributed Asynchronous Iteration

An _async iteration_ is an abstract sequence of values. It consists of zero or
more _non-final values_ in a fully ordered sequence, revealed asynchronously
over time. In other words, the values have a full ordering, and all consumers
see the whole sequence, or a subset of it, in the same order.

The sequence may continue indefinitely or terminate in one of two ways:

- _Finish_: The async iteration successfully completes and reports any JavaScript
  value as a final completion.
- _Fail_: The async iteration fails and gives a reported final reason. This should be an
  error object, but can be any JavaScript value.

`Finish` and `Fail` are final values. To avoid confusion, for iteration values in
this doc, "final" and "non-final" merely refer to position in an iteration, and not
"final" in the sense of the Java keyword or similar.

## NotifierKit and SubscriptionKit

`makeNotifierKit()` makes an` {updater, notifier}` pair, while `makeSubscriptionKit()`
makes a similar` {publication, subscription}` pair. Each pair’s first
element (i.e., `updater` or `publication`) produces the async iteration which is then
consumed using each pair’s second element (i.e., `notifier` or `subscription`).

```js
import { makeNotifierKit } from '@agoric/notifier'
import { makeSubscriptionKit } from '@agoric/notifier'
const { updater, notifier } = makeNotifierKit()
const { publication, subscription } = makeSubscriptionKit()
```

The key difference between the two is

- `notifiers` are lossy.
  - While the sequence is ordered, the consumer requests only the current value and
    so may never see any values that happened between requests.
- `subscriptions` are lossless.
  - The consumer will see every value in the sequence.

If your consumers only care about more recent states, use `makeNotifierKit()`. Notifiers
are often appropriate when the iteration represents a changing quantity, like a purse
balance, and the consumer is updating a UI that doesn't care about any older and stale
non-final values. Notifiers only communicate values at the rate they're consumed, bounded
by the network round-trip time, and many non-final values are never communicated if the
quantity changes quickly. Notifiers' lossy nature enables this optimization.

`notifier` and `subscription` both implement the JavaScript `AsyncIterable` API to consume the iteration. `updater` and `publication` implement the `IterationObserver` API, as defined by Agoric (JavaScript has no standard for producing iterations). For both pairs, `IterationObserver` only produces the iteration. `AsyncIterable` consumes the iteration.

### NotifierKit

A NotifierKit producer produces iteration values with the `updater` using the
`IterationObserver` API. Its consumers consume iteration values via the `notifier`
using the `AsyncIterable` API. Each NotifierKit consumer iteration is a lossy sampling subset of the iteration produced by the producer. Different consumers may see different sampling subsets.

The following properties hold for every sampling subset:

- Any non-final value from the producer may be missing from the sampling subset.
- Every non-final value in the sampling subset is a non-final value from the producer
  (e.g., if "7" is in the subset, then it was in the original producer iteration).
- Every non-final value in the sampling subset appears in producer order
  (e.g., If the producer sequence is 1, 3, 8, 5, 9,
  the sampling subset is guaranteed to not be 8, 1, 5.).
- The sampling subset has the same termination value as the iteration from the producer.

When a new iteration value is available, either it or a later value promptly
becomes available on each sampling subset. In other words, if value 'a' is
introduced on the producer end followed a few moments later by 'b', then all
clients either promptly see 'a', or won't see it but will promptly see a
successor, such as 'b'. If a value is added and nothing else follows for a
while, then that value must be distributed promptly to the consumers.

### SubscriptionKit

Use `makeSubscriptionKit()` for pub-sub operations, where subscribers should see
each published value starting when they subscribe. The producer can be described
as the publisher and publishes iteration values with the `publication` using the
`IterationObserver` API. Subscribers consume the published iteration values with
the `subscription` using the `AsyncIterable` API. Since each published value is sent
to all subscribers, `makeSubscriptionKit()` generally should not be used with
rapidly-produced values.

An iteration’s suffix subset is defined by its starting point in the original
iteration, which can be a non-final value or a termination.
The suffix subset has exactly the original iteration’s members from its starting
point to and including its termination. For example, if the original is
{ 2 5 9 13 Fail } with Fail as the termination, the subset from a starting point
of 9 is { 9 13 Fail }.

When a new value becomes available on the original iteration, it promptly becomes
available on every suffix subset whose starting point is at or before that value.
So if the original is { 2 5 9 13 Fail } and 9 is published, 9 promptly
becomes available to any suffix subset with a starting point of 2, 5, or 9. It
does not become available to any subset starting at 13 or Fail.

Each subscription is an `AsyncIterable` that produces any number of
`AsyncIterators`. These `AsyncIterators` are `SubsciptionIterators` which also
have a `subscribe()` method. Calling a `subscribe()` method makes a
`Subscription` whose starting point is that of the `SubscriptionIterator`'s current
position.

## Methods

The `updater` and `publication` both have the same three methods:

- `updateState(state)`
  - Supplies and sends out a new state to consumers. All active Promises
    produced by `getUpdateSince()` are resolved to the next record.
- `finish(finalState)`
  - Closes the stream of state changes and supplies a final state
    value to consumers.
- `fail(reason)`
  - Closes the stream of state changes, indicates a failure to finish
    satisfactorily, and supplies a reason for the failure to consumers. Does not provide
    a next state. Instead, it causes the Promise to be rejected with the reason,
    signalling that the monitored object encountered an error condition.

The `notifier` has an additional method that the `subscription` does not:

- `getUpdateSince(previousUpdateCount)`
  - Returns a promise for the next published value as a `{ value, updateCount }` record,
    using an optional `previousUpdateCount` to communicate the last obtained value.
    `value` is the new value from the publisher.
    `updateCount` is a piece of data for use with `getUpdateSince`
    to request notification the _next_ time there's a new value.
    If the state becomes final (e.g., when a Zoe seat exits), `updateCount` will be
    undefined. If there's an error, the promise for the record is
    rejected and no further values can exist.
  - If `getUpdateSince` is called without `previousUpdateCount`, or with any
    `previousUpdateCount` other than the most recent one, it returns a promise
    already resolved to the current state.
    If called with the most recent `updateCount`, it returns a promise
    for the next record, which is resolved on the next state change.

## Notifiers and Subscriptions in Zoe

[Zoe](/reference/zoe-api/) provides updates on the state of seats within a contract. The updates
from Zoe indicate changes to seat allocation and seat exits.
These are available from `E(userSeat).getNotifier()` and `zcfSeat.getNotifier()`,
each of which provide a long-lived notifier object associated with a particular
seat. `ZCFSeat`s are available within contracts while `UserSeat`s are accessible
from the REPL, deploy scripts, and other code outside contracts. There are no
equivalent `getSubscription()` or `getUpdater()` methods on the
seats.

Zoe's updates for an offer show the current allocation that will be paid if the contract completes without further changes.

Individual contracts can use notifiers and subscriptions to provide updates giving current prices or other contract-specific details.

The following methods use or return notifiers.

- [aPurse.getCurrentAmountNotifier()](/reference/ertp-api/purse#apurse-getcurrentamountnotifier)
  - Part of the ERTP API. Returns a lossy notifier for changes to this purse's balance.
- [getPursesNotifier()](/reference/wallet-api/wallet-bridge#getpursesnotifier)
  - Part of the Wallet API. It returns a notifier that follows changes in the purses in the Wallet.
- [getOffersNotifier()](/reference/wallet-api/wallet-bridge#getoffersnotifier)
  - Part of the Wallet API. It returns a notifier that follows changes to the offers received by the Wallet.
- [makeQuoteNotifier(amountIn,brandOut)](/reference/repl/priceAuthority#makequotenotifier-amountin-brandout)
  - Part of the PriceAuthority API. Notifies the latest `PriceQuotes` for the given `amountIn`.
- [getPriceNotifier(brandIn, brandOut)](/reference/repl/priceAuthority#getpricenotifier-brandin-brandout)
  - Part of the PriceAuthority API. Returns a notifier for the specified brands. Different PriceAuthorities may issue these at very
    different rates.
- [E(home.localTimerService).makeNotifier(delay, interval) and
  E(home.chainTimerService).makeNotifier(delay, interval)](/reference/repl/timerServices#e-home-chain-or-local-timerservice-makenotifier-delay-interval)
  - Part of the REPL's TimerService API. It creates and returns a `Notifier` object
    that repeatedly delivers updates at times that are a multiple of the provided `interval` value,
    with the first update happening after the provided `delay` value.

## Examples

### Subscription Example

Let’s look at a subscription example. We have three characters: Paula the publisher, and Alice and Bob the subscribers. While Alice and Bob both consume Paula's published iteration, they use different tools to do so.

First we create a publication/subscription pair with `makeSubscriptionKit()`. Paula publishes an iteration with the non-final sequence 'a', 'b' and 'done' as its completion value.

```js
const { publication, subscription } = makeSubscriptionKit()
// Paula the publisher says
publication.updateState('a')
publication.updateState('b')
publication.finish('done')
```

Remember, a `SubscriptionKit` is lossless. It conveys all of an async iteration’s non-final values, as well as the final value.

You can use the JavaScript `AsyncIterable` API directly, but both the JavaScript for-await-of syntax and the `observeIteration` adaptor are more convenient. Here,
Alice uses the former, and then Bob uses the latter.

Subscriber Alice consumes the iteration using the for-await-of loop. She can see
the non-final values and whether the iteration completes or fails. She can see a
failure reason, but the for-await-of syntax does not let her see the completion
value 'done'. She can write code that only executes after the loop finishes, but
the code won’t know what the completion value actually was “done”, “completed”, or something else. This is a limitation of JavaScript's iteration, whether asynchronous or synchronous (as consumed by a for-of loop).

```js
const consume = async subscription => {
  try {
    for await (const val of subscription) {
      console.log('non-final-value', val)
    }
    console.log('the iteration finished')
  } catch (reason) {
    console.log('the iteration failed', reason)
  }
}
consume(subscription)
// Eventually prints:
// non-final-value a
// non-final-value b
// the iteration finished
```

Subscriber Bob consumes using the `(observeIteration(asyncIterableP, iterationObserver)` adaptor.

```js
const observer = harden({
  updateState: val => console.log('non-final-value', val),
  finish: completion => console.log('finished', completion),
  fail: reason => console.log('failed', reason)
})
observeIteration(subscription, observer)
// Eventually prints:
// non-final-value a
// non-final-value b
// finished done
```

### Notifier Example

A `NotifierKit` is a lossy conveyor of non-final values, but does
losslessly convey termination. Let's say the subscription example above
started with the following instead of `makeSubscriptionKit()`.

```js
const { updater, notifier } = makeNotifierKit()
```

If we then renamed `publication` to `updater` and `subscription` to `notifier`
in the rest of the example, the code would still be correct and work. However,
when using a notifier, either Alice or Bob may have missed either or both of the
non-final values due to `NotifierKit`'s lossy nature.

## Distributed Operation

Either `makeNotifierKit()` or `makeSubscriptionKit()` can be used in a multicast
manner with good distributed systems properties, where there is only one
producing site but any number of consuming sites. The producer is not vulnerable
to the consumers; they cannot cause the kit to malfunction or prevent the code
producing values from making progress. The consumers cannot cause each other to
hang or miss values.

For distributed operations, all the iteration values&mdash;non-final values,
successful completion value, failure reason&mdash;must be _Passable_, which means they're values that
can somehow be passed between [vats](../../glossary/index#vat). The rest of this doc assumes all these
values are Passable.

The `makeNotifierKit()` or `makeSubscriptionKit()` call makes the notifier/updater
or publication/subscription pair on the producer's site. As a result, both the
`iterationObserver` and the initial `asyncIterable` are on the producer's site. If
Producer Paula sends Consumer Bob the `asyncIterable`, Bob receives a possibly
remote reference to it. Producers and their Consumers can be remote from each
other.

Bob's example code above is still correct if he uses this reference directly, since
`observeIteration` only needs its first argument to be a reference of some sort to
an `AsyncIterable` conveying `Passable` values. This reference may be a local
`AsyncIterable`, a remote presence of an `AsyncIterable`, or a local or remote
promise for an `AsyncIterable`. `observeIteration` only sends it eventual messages
using `E()` and so doesn't care about these differences.

However, Bob’s code is sub-optimal. Its distributed systems properties are
not terrible, but Bob does better using `getSharableSubscriptionInternals()`
(provided by `SubscriptionKit`). This lets Bob make a local `AsyncIterable` that
coordinates better with producer Paula's `IterationObserver`.

Subscriber Alice's code, located in the [Subscription Example section](#subscription-example) above, is less forgiving. She's using JavaScript's
for-await-of loop which requires a local `AsyncIterable`. It cannot handle a
remote reference to an `AsyncIterable` at Paula's site. Alice has to make an
`AsyncIterable` at her site by using `getSharableSubsciptionInternals()`. She can
replace her call to `consume(subscription)` with:

```js
import { makeSubscription } from '@agoric/notifier'

const localSubscription = makeSubscription(
  E(subscription).getSharableSubsciptionInternals()
)
consume(localSubscription)
```

The code above uses a SubscriptionKit. NotifierKits have a similar pair of a
`getSharableNotifierInternals()` method and a `makeNotifier`. However, this
technique requires that Alice know what kind of a possibly remote `AsyncIterable`
she has, and she must have the required making function code locally available.

Alternatively, Alice can generically mirror any possibly remote `AsyncIterable` by
making a new local pair and plugging them together with `observeIteration`.

```js
const { publication: adapterPublication, subscription: adapterSubscription } =
  makeSubscriptionKit()
observeIteration(subscription, adapterPublication)
consume(adapterSubscription)
```

This works when subscription is a reference to a `AsyncIterable`. If Alice only
needs to consume in a lossy manner, she can use the `makeNotifierKit()` method instead, which
still works independently of what kind of `AsyncIterable` subscription is a
reference to.

## Summary

Data producers have to decide between lossless and lossy publication. If
consumers only care about the most recent state, then use `makeNotifierKit()`.
This is often appropriate when the iteration represents a changing quantity.
If you want to support consumers that need to see all values, then use `makeSubscriptionKit()`.

Consumers can choose different ways of processing the data. In all cases,
the publisher doesn't need to know the consumers, and the consumers can't
interfere with the producer or each other.
