# Timer Services

## chainTimerService

The `chainTimerService` is based on block times with units of 1 second.

The timer service lets you:

- Schedule `wake()` calls.
- Remove scheduled `wake()` calls.
- Create a repeater for scheduling of events at regular intervals.

For testing, use

```js
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
```

See package [@agoric/time](https://agoric-sdk.pages.dev/modules/_agoric_time) for details.
