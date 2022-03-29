---
sidebar: auto 
---
# Timer Services 
    
## TimerService objects

`home` has two timer service objects:
- `localTimerService` is from the local vat **with units of 1 millisecond**.
- `chainTimerService` is from the chain (if present) **with units of 1 second**.

In general, you should use the chain timer for contracts. But it's more efficient to 
use the local timer for objects that don't need consensus or consistency. 
For example, people might want it for testing. 

Both timer services let you:
- Schedule `wake()` calls.
- Remove scheduled `wake()` calls.
- Create a repeater for scheduling of events at regular intervals. 

The local service lets you get a monotonically increasing timestamp for each instance 
of the local chain. The chain service lets you get the start time of the current block.

Both timer services present an identical API, but apply a different interpretation to
the following data types.

### `Timestamp`

A `BigInt` representing an absolute instant in time in a `TimerService`, using units and a basis dependent upon the service.

### `RelativeTime`

A `BigInt` representing the difference between two `Timestamp`s of the same `TimerService`.

## TimerService methods

The following methods provide basic TimerService functionality.

### `E(home.<chain or local>TimerService).getCurrentTimestamp()`
- Returns: `{ Promise<Timestamp> }`

Returns a promise that resolves with the current timestamp.

```js
command[1] E(home.chainTimerService).getCurrentTimestamp()
history[1] 1632170301n // in seconds since epoch
command[2] E(home.localTimerService).getCurrentTimestamp()
history[2] 1632170301546n // in milliseconds since epoch
```

A chain block might be executed more than once in case of restart or replay or
cross-verification, but each such execution will receive the same input state
and observe the same response, even if running a minute or a month later.

### `E(home.<chain or local>TimerService).delay(delay)`
- `delay` `{ RelativeTime }`
- Returns: `{ Promise<Timestamp> }`

Returns a promise that resolves with the current timestamp after the `delay`
has elapsed.

```js
command[3] E(home.localTimerService).delay(3_000n)
history[3] unresolved Promise
history[3] 1632170321864n // about 3 seconds later, in milliseconds since epoch
```

### `E(home.<chain or local>TimerService).makeNotifier(delay, interval)`
- `delay` `{ RelativeTime }`
- `interval` `{ RelativeTime }`
- Returns: `{ Promise<Notifier<Timestamp>> }`

Creates a `Notifier` object and returns a promise that resolves with it.
The notifier repeatedly delivers updates at times
that are a multiple of the specified `interval`, with the first update happening
after the specified `delay` has elapsed.

```js
command[4] E(home.localTimerService).makeNotifier(5_000n, 10_000n)
history[4] [Alleged: presence o-129]{}
command[5] E(history[4]).getUpdateSince()
history[5] {"updateCount":1,"value":1632163863000n}
```

## Advanced TimerService objects

These are more complex objects that are only used for the following advanced methods.

### `TimerWaker` object

A `TimerWaker` has one method, `wake()`
- `wake(timestamp)`
  - `timestamp` `{ Timestamp }`
  - Returns `{ void }`
  - The provided `timestamp` is the time for which the call to `wake()` was scheduled.

### `TimerRepeater` object

A `TimerRepeater` has an associated interval and two methods, `schedule()` and `disable()`:
- `schedule(waker)`
  - `waker` `{ TimerWaker }`
  - Returns `{ Timestamp }`  
  - The `waker` argument is any object with a `wake()` method. Returns the 
    time indicating the time the waker is next scheduled to be called.  The waker continues
    to be scheduled every interval until the repeater is disabled.
- `disable()`
  - Returns `{ void }`
  - Disables this repeater, so `schedule()` can't be called again and wakers already
    scheduled with this repeater won't be rescheduled after they are called.
    
## Advanced TimerService methods

### `E(home.<chain or local>TimerService).setWakeup(baseTime, waker)`
- `baseTime` `{ Timestamp }` 
- `waker` `{ TimerWaker }`
- Returns: `{ Promise<Timestamp> }`

Calls the specified `waker` when the current timestamp is at least `baseTime`.
**NOTE: `baseTime` is an absolute, not relative time.**

Returns a promise that resolves with the time at which the call is scheduled to happen.

```js
command[3] handler = harden({ wake: now => { console.log(`woke up ${now}`); }})
history[3] {"wake":[Function wake]}
command[4] willWakeAt =  E(home.localTimerService).setWakeup(1632170399207n + 3_000n, handler)
history[4] 1632170402207n
// Written to console a few seconds later
woke up 1632170402207n
```

### `E(home.<chain or local>TimerService).removeWakeup(waker)`
- `waker` `{ TimerWaker }`
- Returns: `{ Promise<Array[Timestamp]> }`

Cancels all scheduled wakeups of the specified `waker`, whether
created by `setWakeup()` or `repeater.schedule()`.

Returns a promise for an array of Timestamps representing when the cancelled wakeup calls were scheduled to happen.

```js
command[5] timeList = E(home.localTimerService).removeWakeup(handler)
history[5] unresolved Promise
```
  
### `E(home.<chain or local>TimerService).makeRepeater(delay, interval)`
- `delay`: `{ RelativeTime }`
- `interval`: `{ RelativeTime }`
- Returns: `{ Promise<Repeater> }`

Creates a `Repeater` object and returns a promise that resolves with it.
The repeater schedules `wake()` calls repeatedly at
times that are a multiple of the specified `interval`, with the first update happening
after the specified `delay` has elapsed. Since block times are coarse-grained,
the actual calls when using `chainTimerService` may occur less frequently than the specified
`interval`.
```js
command[6] E(home.localTimerService).makeRepeater(5_000n, 10_000n)
history[6] [Alleged: presence o-124]{}
```

A longer example of creating and using Repeaters:

```js
command[3]  makeWakeCounter = () => {
  let count = 0;
  return Far('counter', { getCount() { return count; }, wake(_t) { count += 1; }, });
}
history[3]  [Function makeWakeCounter]
command[4]  c1 = makeWakeCounter()
history[4]  [Object Alleged: counter]{"getCount":[Function getCount],"wake":[Function wake]}
command[5]  c2 = makeWakeCounter()
history[5]  [Object Alleged: counter]{"getCount":[Function getCount],"wake":[Function wake]}
command[6]  tl = home.localTimerService
history[6]  [Object Alleged: timerService]{}
command[7]  tc = home.chainTimerService
history[7]  [Object Alleged: timerService]{}
command[8]  rl = E(tl).makeRepeater(7n, 1500n)
history[8]  [Object Alleged: vatRepeater]{}
command[9]  rc = E(tc).makeRepeater(7n, 15n)
history[9]  [Object Alleged: vatRepeater]{}
command[10]  E(rl).schedule(c1)
history[10]  1571783040007n
command[11]  E(rc).schedule(c2)
history[11]  1571783051n
...
command[22]  E(tl).getCurrentTimestamp().then(t => [t, c1.getCount()])
history[22]  [1571783069041n,20]
command[23]  E(tc).getCurrentTimestamp().then(t => [t, c2.getCount()])
history[23]  [1571783070n,2]
```
