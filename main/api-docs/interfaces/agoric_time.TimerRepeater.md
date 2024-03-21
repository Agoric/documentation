[API documentation of Agoric SDK ](../README.md) / [Exports](../modules.md) / [@agoric/time](../modules/agoric_time.md) / TimerRepeater

# Interface: TimerRepeater

[@agoric/time](../modules/agoric_time.md).TimerRepeater

Provides the ability to schedule wake() calls repeatedly at a regular
interval, or to disable all future use of this TimerRepeater.

## Table of contents

### Properties

- [disable](agoric_time.TimerRepeater.md#disable)
- [schedule](agoric_time.TimerRepeater.md#schedule)

## Properties

### disable

• **disable**: () => `void`

Disable this repeater, so `schedule(w)` can't
be called, and wakers already scheduled with this repeater won't be
rescheduled again after `E(waker).wake()` is next called on them.

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types.d.ts:230](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L230)

___

### schedule

• **schedule**: (`waker`: `ERef`\<[`TimerWaker`](agoric_time.TimerWaker.md)\>) => [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

Returns the time scheduled for
the first call to `E(waker).wake()`.  The waker will continue to be scheduled
every interval until the repeater is disabled.

#### Type declaration

▸ (`waker`): [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

##### Parameters

| Name | Type |
| :------ | :------ |
| `waker` | `ERef`\<[`TimerWaker`](agoric_time.TimerWaker.md)\> |

##### Returns

[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

#### Defined in

[src/types.d.ts:224](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L224)
