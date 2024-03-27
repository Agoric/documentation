[API documentation of Agoric SDK ](../README.md) / [Exports](../modules.md) / [@agoric/time](../modules/agoric_time.md) / Clock

# Interface: Clock

[@agoric/time](../modules/agoric_time.md).Clock

Read-only access to a TimeService's current time. This allows reading the
current time (e.g. to see if a deadline has passed) without the ability to
schedule events.

## Table of contents

### Properties

- [getCurrentTimestamp](agoric_time.Clock.md#getcurrenttimestamp)
- [getTimerBrand](agoric_time.Clock.md#gettimerbrand)

## Properties

### getCurrentTimestamp

• **getCurrentTimestamp**: () => [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

Retrieve the latest timestamp

#### Type declaration

▸ (): [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

##### Returns

[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

#### Defined in

[src/types.d.ts:194](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L194)

___

### getTimerBrand

• **getTimerBrand**: () => [`TimerBrand`](../modules/agoric_time.md#timerbrand)

Retrieve the Brand for this timer service.

#### Type declaration

▸ (): [`TimerBrand`](../modules/agoric_time.md#timerbrand)

##### Returns

[`TimerBrand`](../modules/agoric_time.md#timerbrand)

#### Defined in

[src/types.d.ts:198](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L198)
