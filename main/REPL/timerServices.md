# Timer Service Objects

`home` has two timer service objects: 
- `localTimerService` is from the local vat.
- `chainTimerService` is from the chain (if present). 

In general, you should use the chain timer for contracts. But it's more efficient to 
use the local timer for objects that don't need consensus or consistency. 
For example, people might want it for testing. 

Both timer services let you:
- Get the start time of the current block. **tyg todo: Is this the case for local?**
- Schedule `wake()` calls.
- Remove scheduled `wake()` calls.
- Create a repeater for scheduling of events at regular intervals. 

With respect to using them, the only difference between the two timer
services is whether you preface their identical command set with
`localTimerService` or `chainTimerService`. However, note that
the local and chain versions of a method may use different time bases.

Before looking at the timer service methods, we need to cover two related objects,
the `TimerWaker` and the `TimerRepeater`. 

A `TimerWaker` has one method, `wake`, which takes a `Timestamp` argument and returns `void`. 
The passed `timestamp` is the time when the call to `wake()` is scheduled to occur.

A `TimerRepeater` has two methods, `schedule()` and `disable`:
- `schedule(waker)`
  - `waker` `{ `TimerWaker` }`
  - Returns `void`             **tyg: The source ChrisH passed along was @property {(waker: TimerWaker) => void} Should it be a Timestamp instead of void?**
  - The `waker` argument is any object with a `wake()` method. Returns the 
    time scheduled for the first call to `E(waker).wake()`.  The waker continues
    to be scheduled every interval until the repeater is disabled.
- `disable()`
  - Returns `void`
  - Disable this repeater, so `schedule()` can't be called, and wakers already 
    scheduled with this repeater won't be rescheduled again 
    after `E(waker).wake()` is next called on them.

## `E(home.<chain or local>TimerService).getCurrentTimestamp()`
- Returns: the current block's start time according to the local or chain clock

The current block might be executed more than once in case of restart or replay.
But each time it will start from the same state and receive the same inputs. 
Since this is repeatable computation, the same computation can be run in various l
ocations to cross-verify. So each time, the `currentTimeStamp` will be the same, 
even if we're running the computation a minute or a month later. It's always the 
current block's start time, expressed as a Unix epoch time in milliseconds or similar.
```js
command[1] E(home.chainTimerService).getCurrentTimestamp()
history[1] 1608523721
command[2] E(home.localTimerService).getCurrentTimestamp()
history[2] 1340435997
```

## `E(home.<chain or local>TimerService.(setWakeup(baseTime, handler)`
- `baseTime` `{ integer }` 
- `handler` `{ Handler }`
- Returns: `{ Integer }` 

Calls the specified handler the specified number of seconds after executing this call.

Returns the time, in the same format as the parameter,
at which the call is scheduled to happen. 

```js
command[3] handler = harden({ wake: now => { console.log(`woke up ${now}`); }})
history[3] {"wake":[Function wake]}
command[4] willWakeAt =  E(home.localTimerService).setWakeup(3, handler)
history[4] 1342464583
// Written to console a few seconds later
woke up 1342464583
```

## `E(home.<chain or local>TimerService).removeWakeup(handler)`
- `handler` `{ Handler }`
- Returns: `{ Array[Integer] }`

Remove the specified handler from all scheduled wakeups, whether
created by `setWakeup()` or `repeater.schedule()`, effectively
canceling the wakeups using that handler.

Returns a list of `Integer` times when the cancelled wakeup calls were scheduled to happen.

```js
command[5] timeList = E(home.localTimerService.removeWakeup(handler)
history[5] sending for eval
```
  
## `E(home.<chain or local>TimerService).createRepeater(delaySecs, interval)`
- `delaySecs`: `{ Integer }`
- `interval`: `{ Integer }`
- Returns: `{ Repeater }` 

Creates and returns a `Repeater` object. It schedules `wake()` calls repeatedly at 
times that are a multiple of the specified interval following `baseTime`. `interval`
is the delay between times when `wake()` is called. Since block times are coarse-grained,
the actual call may occur later, but this won't change when the
next event will be called. 
```js
command[6] E(home.localTimerService).createRepeater(5,10)
history[6] [Alleged: presence o-124]{}
```

## `E(home.<chain or local>TimerService).createNotifier(delaySecs, interval)`
- `delaySecs` `{ RelativeTime }`
- `interval` `{ RelativeTime }`
- Returns: `{ Notifier<Timestamp> }`

**tyg todo: Is this supposed to be here, or should it be over in the ZCF API and seat methods? **

Creates and returns a `Notifier` object. It repeatedly delivers updates at times
that are a multiple of the passed in `interval` value, with the first update happening
the value of `delaySecs` after the notifier is created.

```js
command[30] E(home.localTimerService).createNotifier(5,10)
history[30] Promise.reject("TypeError: target has no method \"createNotifier\", has [createRepeater,getCurrentTimestamp,removeWakeup,setWakeup]")
