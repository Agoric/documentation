# Notifiers and Subscriptions

*Notifiers* and *Subscriptions* both let a service notify clients of state changes.
Specifically, both are abstractions for producing and consuming asynchronous
value sequences. They rely on promises to deliver a stream of messages allowing 
many clients to receive notifications without the originator having to track a subscription list.
An object wanting to publish updates to interested clients makes a notifier or a 
subscription available to them. 

In JavaScript, async iterations are manipulated by `AsyncGenerators`, `AsyncIterables`, and `AsyncIterators`. For an introduction to them, see [here](https://javascript.info/async-iterators-generators).

## Distributed Asynchronous Iteration

An *async iteration* is an abstract sequence of values. It consists of zero or 
more *non-final values* in a fully ordered sequence, revealed asynchronously 
over time. In other words, the values have a full ordering, and all consumers 
see the whole sequence, or a subset of it, in the same order.

The sequence may continue indefinitely or terminate in one of two ways:

- *Finish*: The async iteration successfully completes and reports any JavaScript
   value as a final completion.
- *Fail*: The async iteration fails and gives a reported final reason. This should be an
   error object, but can be any JavaScript value.

`Finish` and `Fail` are final values. To avoid confusion, for iteration values in 
this doc, "final" and "non-final" just refer to position in an iteration, and not 
"final" in the sense of the Java keyword or similar.

## `NotifierKit` and SubscriptionKit

`makeNotifierKit()` makes an` {updater, notifier}` pair, while `makeSubscriptionKit()` 
makes a similar` {publication, subscription}` pair. Each pair’s first 
element (`updater` or `publication`) produces the async iteration which is then 
consumed using each pair’s second element (`notifier` or `subscription`).
```js
import { makeNotifierKit } from '@agoric/notifier';
import { makeSubscriberKit } from '@agoric/notifier';
const { updater, notifier } = makeNotifierKit();
const { publication, subscription } = makeSubscriptionKit(); 
```

The key difference between the two is
- `notifiers` are lossy.
   - While the sequence is ordered, the consumer requests only the current value and
      so may never see any values that happened between requests.
- `subscriptions` are lossless.
   - The consumer will see every value in the sequence.

If your consumers only care about more recent states, use a `NotifierKit`.  For
consumers that need to see all the values, use a `SubscriptionKit`. Subscriptions
are often appropriate when the iteration represents a changing quantity, like a purse
balance, and its consumer is updating a UI that doesn't care about any older and stale
non-final values. 

Notifiers are appropriate when a quantity changes quickly. They only communicate
non-final values at the rate they're consumed, bounded by the network round-trip
time.  All other non-final values are never communicated. The `NotifierKit`'s
lossy nature  enables this optimization.`

`notifier` and `subscription` both implement the JavaScript `AsyncIterable` API to consume the iteration. `updater` and `publication` implement the `IterationObserver` API, as defined by Agoric (JavaScript has no standard for producing iterations). For both pairs, ` IterationObserver` only produces the iteration. `AsyncIterable` consumes the iteration.

An iteration subset may be a valid iteration. `NotifierKit` and `SubscriptionKit` are each organized around a different way of subsetting one iteration into another.

### NotifierKit

A `NotifierKit` producer produces iteration values with the updater using the
`IterationObserver` API. Its consumers consume iteration values via the notifier
using the `AsyncIterable` API. Each `NotifierKit` consumer iteration is a lossy sampling subset of the iteration produced by that `NotifierKit` producer. Different consumers may see different sampling subsets.

An iteration’s sampling subset:
- May omit some of the iteration’s non-final values.
- All sampling subset non-final values are:
  - In the original’s non-final values (i.e. if "7" is in the subset, "7" is in
     the original).
  - In the same order (i.e. if the original is order 1, 3, 8, 5, 9, the subset
     is in the same order, even if missing some items; 1, 8, 5 for example,
     but not 8, 1, 5).
- The original and the subset both have the same termination value.

When a new iteration value is available, either it or a later value becomes
available on each sampling subset promptly. In other words, if value 'a' is
introduced on the producer end followed a few moments later by 'b', then all
clients  either promptly see 'a', or won't see it but will promptly see a
successor, such as 'b'. If a value is added and nothing else follows for a
while, then that value must be distributed promptly to the consumers.

### SubscriptionKit

Use the `SubscriptionKit` for pub-sub operations, where subscribers should see
each published value starting when the subscribe. The producer can be described
as the publisher and publishes iteration values with the publication using the
`IterationObserver` API. Subscribers consume the published iteration values with
the subscription using the `AsyncIterable` API. Since each published value is sent
to all subscribers, `SubscriptionKit` generally should not be used with rapidly
produced values.

An iteration’s suffix subset is defined by its starting point in the original
iteration, which can be a non-final value or a termination.
The suffix subset has exactly the original iteration’s members from its starting
point to and including its termination. For example, if the original is
{ 2 5 9 13 Fail } with Fail as the termination and a starting point at 9, the
subset is { 9 13 Fail }.

When a new value becomes available on the original iteration, it promptly becomes
available on every suffix subset whose starting point is at or before that value
So if the original is { 2 5 9 13 Fail } and 9 becomes available, 9 promptly
becomes available to any suffix subset with a starting point of 2, 5, or 9. It
does not become available to any subset starting at 13 or Fail).

Each subscription is an `AsyncIterable` that produces any number of
`AsyncIterators`. These `AsyncIterators` are `SubsciptionIterators` which also
have a `subscribe()` method. Calling a `subscribe()` method makes a
`Subscription` whose starting point is that `SubscriptionIterator`'s current
position.

## Methods

The `updater` and `publication` both have the same three methods:
- `updateState(state)`
  Supplies and sends out a new state to consumers. All active Promises 
  produced by `getUpdateSince()` are resolved to the next record.
- `finish(finalState)`
  - Closes the stream of state changes and supplies a final state
    value to consumers.
- `fail(reason)`
  - Closes the stream of state changes, indicates a failure to finish
    satisfactorily, and supplies a reason for the failure to consumers. Does not provide
    a next state. Instead, it causes the Promise to be rejected with the reason, 
    signalling that the monitored object hit an error condition.

The `subscription` and `publication` both have this method:
- `getUpdateSince()`: Returns `{ value, updateCount }`. 
  - Returns the next published value after the previously obtained value.
    `value` represents the state, and the format is up to the publisher.
    `updateCount` requests notification the next time there's a state change.
    If the state becomes final (e.g. a seat exits), `updateCount` will be 
    undefined. If there's an error, the promise for the record is 
    rejected and there isn't a next state.

    If you call `getUpdateSince(oldUpdateCount)` with no count, or any 
    `updateCount` other than the most recent one, the notifier immediately 
    returns a promise for a record with the current state. If you call with 
    the most-recently generated `updateCount`, the notifier returns a promise 
    for the next record, which is resolved on the next state change. If you 
    haven't called `getUpdateSince()` before, you won't have a 
    previous `updateCount` to use.

## Notifiers and Subscriptions in Zoe

Zoe provides updates on the state of seats within a contract. The updates 
from Zoe indicate changes to the allocation of a seat and seats exiting. 
These are available from `E(userSeat).getNotifier()` and `zcfSeat.getNotifier()`, 
which provide long-lived notifier objects associated with a particular 
seat. `zcfSeats` are available within contracts while `userSeats` are accessible 
from the REPL, deploy scripts, and other code outside contracts. There are no 
equivalent `getSubscription()` or `getUpdater()` methods on the
seats.

Zoe's updates for an offer show the current allocation that will be paid if the contract completes without further changes.

Individual contracts can use notifiers and subscriptions to provide updates giving current prices or other contract-specific details.

The following methods use or return notifiers. Click on the name to go to their
full documentation:

- [`ZCFSeat.getNotifier()`](/zoe/api/zoe-contract-facet.md#zcfseat-object)
   - Part of the Zoe Contract Facet API, returns a notifier associated with the seat's allocation. It  provides updates on changing
   allocations for this seat, and tells when the seat has been exited.
- [`UserSeat.getNotifier`](/zoe/api/zoe.md#userseat-object)
  - Part of the Zoe API, returns a notifier associated with the seat. Its updates can be anything the contract wants to publish, such as
     price changes, new currency pools, etc.
- [`purse.getCurrentAmountNotifier()`](/ertp/api/purse.md#purse-getcurrentamountnotifier)
   - Part of the ERTP API, returns a lossy notifier for changes to this purse's balance.
- [`getPursesNotifier`](/guides/wallet/api.md#getpursesnotifier)
   - Part of the Wallet API, it returns a notifier that follows changes in the purses in the Wallet.
- [`getOffersNotifier`](/guides/wallet/api.md#getoffersnotifier)
   - Part of the Wallet API, it returns a notifier that follows changes to the offers received by the Wallet.
- [`makeQuoteNotifier(amountIn,brandOut)`](/repl/priceAuthority.md#makequotenotifier-amountin-brandout)
   - Part of the PriceAuthority API, notifies the latest `PriceQuotes` for the given `amountIn`.
- [`getPriceNotifier(brandIn, brandOut)`](/repl/priceAuthority.md#getpricenotifier-brandin-brandout)
   - Part of the PriceAuthority API, returns a notifier for the specified brands. Different PriceAuthories may issue these at very
     different rates.
- [`E(home.<chain or local>TimerService).createNotifier(delaySecs, interval)`](/repl/timerServices.md)
   - Part of the REPL's chain and local TimerServices, it creates and returns a `Notifier` object. It repeatedly delivers updates at times
      that are a multiple of the passed in interval value, with the first update happening the value of `delaySecs` after the notifier is
      created.

## Examples

### Subscription example

Let’s look at a subscription example. We have three characters; Paula the publisher, and subscribers Alice and Bob. While Alice and Bob both consume Paula's published iteration, they use different tools to do so.

First we create a publication/subscription pair with `makeSubscriptionKit()`. Paula publishes an iteration with non-final sequence 'a', 'b' and  'done' as its completion value.
```js
const { publication, subscription } = makeSubscriptionKit(); 
// Paula the publisher says
publication.updateState('a');
publication.updateState('b');
publication.finish('done');
```
Remember, `SubscriptionKit` is lossless. It conveys all of an async iteration’s non-final values, as well as the final value.

You can use the JavaScript `AsyncIterable` API directly, but either the JavaScript for-await-of syntax or the `observeIteration` adaptor are more convenient. Here,
Alice uses the former, and then Bob uses the latter.

Subscriber Alice consumes the iteration using the for-await-of loop. She can see
the non-final values and whether the iteration completes or fails. She can see a
failure reason, but the for-await-of syntax does not let her see the completion
value 'done'. She can write code that only executes after the loop finishes,but
the code won’t know what the completion value actually was “done”, “completed”, or something else. This is a limitation of JavaScript's iteration, whether asynchronous or synchronous (as consumed by a for-of loop).
```js
const consume = async subscription => {
  try {
    for await (const val of subscription) {
      console.log('non-final', val);
    }
    console.log('the iteration finished');
  } catch (reason) {
    console.log('the iteration failed', reason);
  }
};
consume(subscription);
// eventually prints
// non-final-value a
// non-final-value b
// the iteration finished
```
Subscriber Bob consumes using the `(observeIteration(asyncIterableP, iterationObserver)` adaptor.
```js
const observer = harden({
  updateState: val => console.log('non-final', val),
  finish: completion => console.log('finished', completion),
  fail: reason => console.log('failed', reason),
});
observeIteration(subscription, observer);
// eventually prints
// non-final-value a
// non-final-value b
// finished done
```
### Notifier example

`NotifierKit()` is a lossy conveyor of non-final values, but does also
losslessly convey termination. Let's say the subscription example above 
started with the following instead of `makeSubscriberKit()`
```js
const { updater, notifier } = makeNotifierKit();
```
If we then renamed `publication` to `updater` and `subscription` to `notifier`
in the rest of the example, the code would still be correct and work. However,
when using a notifier, either Alice or Bob may have missed either or both of the
non-final values due to `NotifierKit()`'s lossy nature. 

## Distributed Operation

Either make `NotifierKit()` or `makeSubscriberKit()` can be used in a multicast
manner with good distributed systems properties, where there is only one
producing site but any number of consuming sites. The producer is not vulnerable
to the consumers; they cannot cause the kit to malfunction or prevent the code
producing values from making progress. The consumers cannot cause each other  to
hang or miss values. 

For distributed operation, all the iteration values---non-final values,
successful completion value, failure reason---must be `Passable`; values that
can somehow be passed between vats. The rest of this doc assumes all these
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
using `E()`  and so doesn't care about these differences.  

However, Bob’s code is sub-optimal. Its distributed systems properties are
not terrible, but Bob does better using `getSharableSubscriptionInternals()`
(provided by `SubscriptionKit`). This lets Bob make a local `AsyncIterable` that
coordinates better with producer Paula's `IterationObserver`.  

Subscriber Alice's above code is less forgiving. She's using JavaScript's
for-await-of loop which requires a local `AsyncIterable`. It cannot handle a
remote reference to an `AsyncIterable` at Paula's site. Alice has to make an
`AsyncIterable` at her site by using `getSharableSubsciptionInternals()`. She can
replace her call to `consume(subscription)` with:  
```js
import { makeSubscription } from '@agoric/notifier';

const localSubscription =
  makeSubscription(E(subscription).getSharableSubsciptionInternals());
  consume(localSubscription);
```
The above used a SubscriptionKit. NotifierKits have a similar pair of a
`getSharableNotifierInternals()` method and a `makeNotifier`. However, this
technique requires Alice know what kind of possibly-remote `AsyncIterable`
she has, and to have the required making function code locally available. 

Alternatively, Alice can generically mirror any possibly remote `AsyncIterable` by
making a new local pair and plugging them together with `observeIteration`. 
```js
const {
  publication: adapterPublication,
  subscription: adapterSubscription
} = makeSubscriptionKit();
observeIteration(subscription, adapterPublication);
consume(adapterSubscription);
```
This works when subscription is a reference to any `AsyncIterable`. If Alice only
needs to consume in a lossy manner, she can use` makeNotifierKit()` instead, which
still works independently of what kind of `AsyncIterable` subscription is a
reference to. 

## Summary

Data producers have to decide whether to publish losslessly or lossily. If 
your consumers only care about more recent states, then use a `NotifierKit`. 
This is often appropriate when the iteration represents a changing quantity. 
If you want to support consumers that need to see all the values, then use a `SubscriptionKit`.

Consumers can choose different ways of processing the data. In all cases, 
the publisher doesn't have to know the consumers, and the consumers can't 
interfere with the producer or each other.
