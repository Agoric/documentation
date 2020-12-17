# Timer Service Objects

`home` has two timer service objects: 
- `localTimerService` is from the local vat.
- `chainTimerService` is from the chain (if present). 

In general, you should use the chain timer for contracts. But it's more efficient to 
use the local timer for objects that don't need consensus or consistency. **tyg todo: Examples of such local prefered objects?**

Both timer services let you:
- Get the start time of the current block. **tyg todo: Is this the case for local?**
- Schedule `wake()` calls.
- Remove scheduled `wake()` calls.
- Create a repeater for scheduling of events at regular intervals. 

With respect to using them, the only difference between the two timer
services is whether you preface their identical command set with
`localTimerService` or `chainTimerService` 

## `E(home.<chain or local>TimerService).getCurrentTimestamp()`
- Returns: If `chainTimerService`, the current block's start time **tyg todo: This
appears  to be the number of milliseconds since the
current block was created?** 
- Returns: If `localTimerService(), **tyg todo:
unclear what it's the start time of?** start time in milliseconds.
```js
command[1] E(home.chainTimerService).getCurrentTimestamp()
history[1] 1590465270
```

##  `E(home.<chain or local>TimerService.(setWakeup(baseTime, handler)`
- `baseTime` `{ integer }` 
- `handler` `{ Handler }`
- Returns: `Integer` Time at which the call is scheduled to happen. **tyg todo: In what format?**

Calls the specified handler the specified number of seconds after executing this call.

```js
const handler = harden({wake(now) { console.log(`woke up ${now}`); }});
const willWakeAt = E(home.localTimerService).setWakeup(60, handler);
```
**tyg todo: Getting an "undefined" response on the `const handler...`
in the REPL?**

###  setWakeup(baseTime :integer, handler :Handler) -> (integer);
- `baseTime` `{ integer }` 
- `handler` `{ Handler }`
- Returns: `Integer` Time at which the call is scheduled to happen.

## `E(home.<chain or local>TimerService).removeWakeup(handler)`
- `handler` `{ Handler }`
- Returns list of `Integer` times when the cancelled wakeup calls were scheduled to happen.

Remove the specified handler from all scheduled wakeups, whether
created by `setWakeup()` or `repeater.schedule()`, effectively
canceling the wakeups using that handler. **tyg todo: Is this last correct?**

```js
const timeList = E(home.chainTimerService.removeWakeup(handler);
```

### removeWakeup(handler :Handler) -> (List(integer));
- `handler` `{ Handler }`
- Returns list of times when the calls were scheduled to happen.

Remove the handler from all scheduled wakeups, whether
created by `setWakeup()` or `repeater.schedule()`, effectively
canceling the wakeups. **tyg todo: Is this last correct?**

 // Return value is the time at which the call is scheduled to take place.
  setWakeup(baseTime :integer, handler :Handler) -> (integer);

  // Remove the handler from all its scheduled wakeups, whether
  // produced by timer.setWakeup(h) or repeater.schedule(h).
  
## `E(home.<chain or local>TimerService).createRepeater(delaySecs, interval)`
- `delaySecs`: `{Integer}`
- `interval`: `{Integer}`
- Returns: `{Repeater}` that schedules `wake()` calls repeatedly at times
that are a multiple of the interval value after the base time.

Creates and returns a `Repeater` object. It schedules `wake()` calls repeatedly at 
times that are a multiple of the specified interval following baseTime. `interval`
is the delay between times when `wake()` is called. When
schedule(h) is called, h.wake() will be scheduled to be called after the
next multiple of interval from the base. Since block times are coarse-
grained, the actual call may occur later, but this won't change when the
next event will be called. 
```js
createRepeater(5, 10);
```
