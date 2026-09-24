# Timer Services

::: warning
This page lives under `reference/repl/` alongside documentation for the
retired `ag-solo` REPL, but `chainTimerService` and `@agoric/time` are not
deprecated; they are the current timer API and remain in active use
(including by the [Orchestration API](/guides/orchestration/)). Only the
REPL-specific pages in this section (`scratch`, `networking`, and the REPL
itself) document retired workflows.
:::

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
