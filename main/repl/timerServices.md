---
sidebar: auto 
---
# Timer Services 
    
## TimerService objects

`home` has two timer service objects: 
- `localTimerService` is from the local vat **with a resolution of 1ms**.
- `chainTimerService` is from the chain (if present), **with a resolution of 1s**. 

In general, you should use the chain timer for contracts. But it's more efficient to 
use the local timer for objects that don't need consensus or consistency. 
For example, people might want it for testing. 

Both timer services let you:
- Schedule `wake()` calls.
- Remove scheduled `wake()` calls.
- Create a repeater for scheduling of events at regular intervals. 

The local service lets you get a monotonically increasing timestamp for each instance 
of the local chain. The chain service lets you get the start time of the current block.

With respect to using them, the only difference between the two timer
services is whether you preface their identical command set with
`localTimerService` or `chainTimerService`. However, note that
the local and chain versions of a method may use different time bases.

Before looking at the timer service methods, we need to cover four related objects.

### `Timestamp` object

An `Integer`, an absolute individual stamp returned by a `TimerService`.  Note that different
timer services may have different interpretations of actual Timestamp values.

### `RelativeTime` object

An `Integer`, the difference between two `Timestamps`.  Note that
different timer services may have different interpretations of actual `RelativeTime` values.

## TimerService methods

The following methods provide basic TimerService functionality.

### `E(home.<chain or local>TimerService).getCurrentTimestamp()`
- Returns: A monotonically increasing timestamp for the chain or local ag-solo.

The current block might be executed more than once in case of restart or replay.
But each time it will start from the same state and receive the same inputs. 
Since this is repeatable computation, the same computation can be run in various
locations to cross-verify. So each time, the `currentTimeStamp` will be the same, 
even if we're running the computation a minute or a month later. It's expressed 
as a Unix epoch time in milliseconds or similar.
```
command[1] E(home.chainTimerService).getCurrentTimestamp()
history[1] 1632170301n // in seconds since epoch
command[2] E(home.localTimerService).getCurrentTimestamp()
history[2] 1632170301546n // in milliseconds since epoch
```

### `E(home.<chain or local>TimerService).delay(delay)`
- `delay` `{ RelativeTime }`
- Returns: `{ Promise<Timestamp>}`

Returns a promise that resolves with the current timestamp after the `delay`
relative time has passed.

```
command[32] E(home.localTimerService).delay(3_000n)
history[32] unresolved Promise
history[32] 1632170321864n // about 3 seconds later, in milliseconds since epoch
```

### `E(home.<chain or local>TimerService).makeNotifier(delay, interval)`
- `delay` `{ RelativeTime }`
- `interval` `{ RelativeTime }`
- Returns: `{ Notifier<Timestamp> }`

Creates and returns a `Notifier` object. It repeatedly delivers updates at times
that are a multiple of the passed-in `interval` value, with the first update happening
the value of `delay` after the notifier is created.

```
command[30] E(home.localTimerService).makeNotifier(5_000n,10_000n)
history[30] [Alleged: presence o-129]{}
command[31] E(history[30]).getUpdateSince()
history[31] {"updateCount":1,"value":1632163863000n}
```

## Advanced TimerService objects

These are more complex objects that are only used for the following advanced methods.

### `TimerWaker` object

A `TimerWaker` has one method, `wake`, which takes a `Timestamp` argument and returns `void`. 
The passed `timestamp` is the time when the call to `wake()` is scheduled to occur.

### `TimerRepeater` object

A `TimerRepeater` has two methods, `schedule()` and `disable`:
- `schedule(waker)`
  - `waker` `{ TimerWaker }`
  - Returns `{ Timestamp }`  
  - The `waker` argument is any object with a `wake()` method. Returns the 
    time indicating the time the waker is next scheduled to be called.  The waker continues
    to be scheduled every interval until the repeater is disabled.
- `disable()`
  - Returns `void`
  - Disable this repeater, so `schedule()` can't be called, and wakers already 
    scheduled with this repeater won't be rescheduled again 
    after `E(waker).wake()` is next called on them.
    
## Advanced TimerService methods

### `E(home.<chain or local>TimerService).setWakeup(baseTime, handler)`
- `baseTime` `{ Timestamp }` 
- `handler` `{ Handler }`
- Returns: `{ Timestamp }` 

Calls the specified handler when the current timestamp is at least `baseTime`.
**NOTE: `baseTime` is an absolute, not relative time.**

Returns the time, in the same format as the parameter,
at which the call is scheduled to happen. 

```js
command[3] handler = harden({ wake: now => { console.log(`woke up ${now}`); }})
history[3] {"wake":[Function wake]}
command[4] willWakeAt =  E(home.localTimerService).setWakeup(1632170399207n + 3_000n, handler)
history[4] 1632170402207n
// Written to console a few seconds later
woke up 1632170402207n
```

### `E(home.<chain or local>TimerService).removeWakeup(handler)`
- `handler` `{ Handler }`
- Returns: `{ Promise<Array[Timestamp]>}`

Remove the specified handler from all scheduled wakeups, whether
created by `setWakeup()` or `repeater.schedule()`, effectively
canceling the wakeups using that handler.

Returns a promise for an array of `Timestamp` times when the cancelled wakeup calls were scheduled to happen.

```js
command[5] timeList = E(home.localTimerService).removeWakeup(handler)
history[5] unresolved Promise
```
  
### `E(home.<chain or local>TimerService).makeRepeater(delay, interval)`
- `delay`: `{ Integer }`
- `interval`: `{ Integer }`
- Returns: `{ Repeater }` 

Creates and returns a `Repeater` object. It schedules `wake()` calls repeatedly at 
times that are a multiple of the specified interval following `baseTime`. `interval`
is the delay between times when `wake()` is called. Since block times are coarse-grained,
the actual call may occur later, but this won't change when the
next event will be called. 
```js
command[6] E(home.localTimerService).makeRepeater(5_000n,10_000n)
history[6] [Alleged: presence o-124]{}
```

A longer example of creating and using Repeaters:

```
command[3]  makeHandler = () => { let calls = 0; const args = []; return { getCalls() {
return calls; }, getArgs() { return args; }, wake(arg) { args.push(arg); calls += 1; }, }; }
history[3]  [Function makeHandler]
command[4]  h1 = makeHandler()
history[4]  {"getCalls":[Function getCalls],"getArgs":[Function getArgs],"wake":[Function wake]}
command[5]  h2 = makeHandler()
history[5]  {"getCalls":[Function getCalls],"getArgs":[Function getArgs],"wake":[Function wake]}
command[6]  tl = home.localTimerService
history[6]  [Presence o-59]  
command[7]  tc = home.chainTimerService
history[7]  [Presence o-55]  
command[8]  rl = E(tl).makeRepeater(7, 1500)
history[8]  [Presence o-64]  
command[9]  rc = E(tc).makeRepeater(7, 1)
history[9]  [Presence o-65]  
command[10]  E(rl).schedule(h1)
history[10]  1571783040007n
command[11]  E(rc).schedule(h2)
history[11]  1571783051n
command[12]  h1.getCalls()
history[12]  3
command[13]  h2.getCalls()
history[13]  1
...
command[22]  h1.getCalls()
history[22]  50
command[23]  h1.getCalls()
history[23]  53
command[24]  h1.getCalls()
history[24]  54
command[25]  E(tl).getCurrentTimestamp()
history[25]  1571783375000n
command[26]  E(tc).getCurrentTimestamp()
history[26]  1571783384n
```
