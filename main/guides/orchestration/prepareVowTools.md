# `prepareVowTools`

The `prepareVowTools` function is designed to create a set of tools that facilitate working with promises and vows within the Agoric framework. It provides utilities to handle vow-tolerant implementations of promise-related functionalities, along with various other utilities to manage asynchronous operations more effectively.

```js
const { when, watch, makeVowKit, allVows, asVow, asPromise } = prepareVowTools(
  zone.subZone('vows'), powers
);
```

## Inputs Parameters

- `zone` (Type: `Zone`): The zone which is used to prepare the tools
- `powers` (Type: `object`, Optional): An optional parameter that can include additional functionalities. It can contain the following property:
  - `isRetryableReason` (Type: `IsRetryableReason`, Optional): A function that determines if the vow is retry-able. Defaults to a function that returns `false`.

## Return Value

The function returns an object with the following utilities:

- `when(specimenP, onFulfilled, onRejected)`: A function that triggers a `onFulfilled` or `onRejected` based on the result of the input vow

- `watch(specimenP, watcher, ...watcherArgs)`: A function that facilitates subscribing a watcher to a vow in a way that survives upgrades of both the creator and subscribing client vats

- `makeVowKit()`: A function that helps in getting the `vow` and `resolver` utilities.

- `allVows(vows)`: A function similar to `Promise.all` that ensures all vows in the input array are handled correctly.

- `asVow(fn)`: A utility function that coerces a given input function into a vow.

- `asPromise(specimenP, ...watcherArgs)`: A function to convert a vow into a promise, with optional watcher arguments.

By returning these tools, `prepareVowTools` provides a comprehensive set of utilities to manage vows effectively in an Agoric environment.
