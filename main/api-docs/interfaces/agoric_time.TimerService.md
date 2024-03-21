[API documentation of Agoric SDK ](../README.md) / [Exports](../modules.md) / [@agoric/time](../modules/agoric_time.md) / TimerService

# Interface: TimerService

[@agoric/time](../modules/agoric_time.md).TimerService

Gives the ability to get the current time,
schedule a single wake() call, create a repeater that will allow scheduling
of events at regular intervals, or remove scheduled calls.

## Table of contents

### Properties

- [cancel](agoric_time.TimerService.md#cancel)
- [delay](agoric_time.TimerService.md#delay)
- [getClock](agoric_time.TimerService.md#getclock)
- [getCurrentTimestamp](agoric_time.TimerService.md#getcurrenttimestamp)
- [getTimerBrand](agoric_time.TimerService.md#gettimerbrand)
- [makeNotifier](agoric_time.TimerService.md#makenotifier)
- [makeRepeater](agoric_time.TimerService.md#makerepeater)
- [repeatAfter](agoric_time.TimerService.md#repeatafter)
- [setWakeup](agoric_time.TimerService.md#setwakeup)
- [wakeAt](agoric_time.TimerService.md#wakeat)

## Properties

### cancel

• **cancel**: (`cancelToken`: `object`) => `void`

Cancel a previously-established wakeup or repeater.

#### Type declaration

▸ (`cancelToken`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cancelToken` | `object` |

##### Returns

`void`

#### Defined in

[src/types.d.ts:174](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L174)

___

### delay

• **delay**: (`delay`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `cancelToken?`: `object`) => `Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

Create and return a promise that will resolve after the relative time has
passed.

#### Type declaration

▸ (`delay`, `cancelToken?`): `Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `cancelToken?` | `object` |

##### Returns

`Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

#### Defined in

[src/types.d.ts:135](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L135)

___

### getClock

• **getClock**: () => [`Clock`](agoric_time.Clock.md)

Retrieve the read-only Clock facet.

#### Type declaration

▸ (): [`Clock`](agoric_time.Clock.md)

##### Returns

[`Clock`](agoric_time.Clock.md)

#### Defined in

[src/types.d.ts:178](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L178)

___

### getCurrentTimestamp

• **getCurrentTimestamp**: () => [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

Retrieve the latest timestamp

#### Type declaration

▸ (): [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

##### Returns

[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

#### Defined in

[src/types.d.ts:114](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L114)

___

### getTimerBrand

• **getTimerBrand**: () => [`TimerBrand`](../modules/agoric_time.md#timerbrand)

Retrieve the Brand for this timer service.

#### Type declaration

▸ (): [`TimerBrand`](../modules/agoric_time.md#timerbrand)

##### Returns

[`TimerBrand`](../modules/agoric_time.md#timerbrand)

#### Defined in

[src/types.d.ts:182](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L182)

___

### makeNotifier

• **makeNotifier**: (`delay`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `interval`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `cancelToken?`: `object`) => `Notifier`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

Create and return a Notifier that will deliver updates repeatedly at times
that are a multiple of interval following delay.

#### Type declaration

▸ (`delay`, `interval`, `cancelToken?`): `Notifier`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `interval` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `cancelToken?` | `object` |

##### Returns

`Notifier`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

#### Defined in

[src/types.d.ts:166](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L166)

___

### makeRepeater

• **makeRepeater**: (`delay`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `interval`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `cancelToken?`: `object`) => [`TimerRepeater`](agoric_time.TimerRepeater.md)

Create and return a repeater that will schedule `wake()` calls
repeatedly at times that are a multiple of interval following delay.
Interval is the difference between successive times at which wake will be
called.  When `schedule(w)` is called, `w.wake()` will be scheduled to be
called after the next multiple of interval from the base. Since times can be
coarse-grained, the actual call may occur later, but this won't change when
the next event will be called.

#### Type declaration

▸ (`delay`, `interval`, `cancelToken?`): [`TimerRepeater`](agoric_time.TimerRepeater.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `interval` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `cancelToken?` | `object` |

##### Returns

[`TimerRepeater`](agoric_time.TimerRepeater.md)

#### Defined in

[src/types.d.ts:148](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L148)

___

### repeatAfter

• **repeatAfter**: (`delay`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `interval`: [`RelativeTime`](../modules/agoric_time.md#relativetime), `handler`: [`TimerWaker`](agoric_time.TimerWaker.md), `cancelToken?`: `object`) => `void`

Create a repeater with a handler directly.

#### Type declaration

▸ (`delay`, `interval`, `handler`, `cancelToken?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `interval` | [`RelativeTime`](../modules/agoric_time.md#relativetime) |
| `handler` | [`TimerWaker`](agoric_time.TimerWaker.md) |
| `cancelToken?` | `object` |

##### Returns

`void`

#### Defined in

[src/types.d.ts:156](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L156)

___

### setWakeup

• **setWakeup**: (`baseTime`: [`Timestamp`](../modules/agoric_time.md#timestamp), `waker`: `ERef`\<[`TimerWaker`](agoric_time.TimerWaker.md)\>, `cancelToken?`: `object`) => [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

Return value is the time at which the call is scheduled to take place

#### Type declaration

▸ (`baseTime`, `waker`, `cancelToken?`): [`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

##### Parameters

| Name | Type |
| :------ | :------ |
| `baseTime` | [`Timestamp`](../modules/agoric_time.md#timestamp) |
| `waker` | `ERef`\<[`TimerWaker`](agoric_time.TimerWaker.md)\> |
| `cancelToken?` | `object` |

##### Returns

[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)

#### Defined in

[src/types.d.ts:118](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L118)

___

### wakeAt

• **wakeAt**: (`baseTime`: [`Timestamp`](../modules/agoric_time.md#timestamp), `cancelToken?`: `object`) => `Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

Create and return a promise that will resolve after the absolte
time has passed.

#### Type declaration

▸ (`baseTime`, `cancelToken?`): `Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `baseTime` | [`Timestamp`](../modules/agoric_time.md#timestamp) |
| `cancelToken?` | `object` |

##### Returns

`Promise`\<[`TimestampRecord`](../modules/agoric_time.md#timestamprecord)\>

#### Defined in

[src/types.d.ts:127](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L127)
