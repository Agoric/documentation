[API documentation of Agoric SDK ](../README.md) / [Exports](../modules.md) / [@agoric/time](../modules/agoric_time.md) / TimerWaker

# Interface: TimerWaker

[@agoric/time](../modules/agoric_time.md).TimerWaker

The interface that must be implemented by objects which are to be invoked at
scheduled times. Used by `TimerService.repeatAfter()`,
`TimerService.setWakeup()`, and `TimerRepeater.schedule()`.

## Table of contents

### Properties

- [wake](agoric_time.TimerWaker.md#wake)

## Properties

### wake

• **wake**: (`timestamp`: [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)) => `void`

The timestamp passed to `wake()` is the time that the call was scheduled
to occur.

#### Type declaration

▸ (`timestamp`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | [`TimestampRecord`](../modules/agoric_time.md#timestamprecord) |

##### Returns

`void`

#### Defined in

[src/types.d.ts:211](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L211)
