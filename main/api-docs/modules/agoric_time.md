[API documentation of Agoric SDK ](../README.md) / [Exports](../modules.md) / @agoric/time

# Module: @agoric/time

## Table of contents

### Interfaces

- [Clock](../interfaces/agoric_time.Clock.md)
- [TimerRepeater](../interfaces/agoric_time.TimerRepeater.md)
- [TimerService](../interfaces/agoric_time.TimerService.md)
- [TimerWaker](../interfaces/agoric_time.TimerWaker.md)

### Type Aliases

- [CancelToken](agoric_time.md#canceltoken)
- [RelativeTime](agoric_time.md#relativetime)
- [RelativeTimeRecord](agoric_time.md#relativetimerecord)
- [RelativeTimeValue](agoric_time.md#relativetimevalue)
- [TimeMathType](agoric_time.md#timemathtype)
- [TimerBrand](agoric_time.md#timerbrand)
- [Timestamp](agoric_time.md#timestamp)
- [TimestampRecord](agoric_time.md#timestamprecord)
- [TimestampValue](agoric_time.md#timestampvalue)

### Variables

- [RelativeTimeRecordShape](agoric_time.md#relativetimerecordshape)
- [RelativeTimeShape](agoric_time.md#relativetimeshape)
- [RelativeTimeValueShape](agoric_time.md#relativetimevalueshape)
- [TimeMath](agoric_time.md#timemath)
- [TimerBrandShape](agoric_time.md#timerbrandshape)
- [TimerServiceShape](agoric_time.md#timerserviceshape)
- [TimestampRecordShape](agoric_time.md#timestamprecordshape)
- [TimestampShape](agoric_time.md#timestampshape)
- [TimestampValueShape](agoric_time.md#timestampvalueshape)

## Type Aliases

### CancelToken

Ƭ **CancelToken**: `object`

A CancelToken is an arbitrary marker object, passed in with
each API call that creates a wakeup or repeater, and passed to
cancel() to cancel them all. Multiple wakeups can rely on the same
CancelToken so they can be cancelled collectively.

#### Defined in

[src/types.d.ts:103](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L103)

___

### RelativeTime

Ƭ **RelativeTime**: [`RelativeTimeRecord`](agoric_time.md#relativetimerecord) \| [`RelativeTimeValue`](agoric_time.md#relativetimevalue)

**`Deprecated`**

use RelativeTimeRecord

Transitional measure until all are converted to RelativeTimeRecord
See `TimeMath` comment for an explanation of the representation
during this transition. After the transition, `RelativeTime` will simplify
to the current definition of `RelativeTimeRecord`, which will itself
be deleted. All RelativeTimes will then be labeled by TimerBrands.

#### Defined in

[src/types.d.ts:95](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L95)

___

### RelativeTimeRecord

Ƭ **RelativeTimeRecord**: `Object`

The canonical representation of a typed relative time. It bundles the brand
with an elapsed time, as represented by a TimerService, which might represent
time since the epoch, or blockheight on a particular chain.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `relValue` | `bigint` |
| `timerBrand` | [`TimerBrand`](agoric_time.md#timerbrand) |

#### Defined in

[src/types.d.ts:70](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L70)

___

### RelativeTimeValue

Ƭ **RelativeTimeValue**: `bigint`

**`Deprecated`**

use RelativeTimeRecord

Difference between two TimestampValues.  Note that different timer services
may have different interpretations of TimestampValues values.

#### Defined in

[src/types.d.ts:53](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L53)

___

### TimeMathType

Ƭ **TimeMathType**: `Object`

TimeMath supports simple arithmetic on typed Time values, enforcing that
values are combined in type-compatible ways. You can add 3 minutes to 3pm,
or 5 minutes to a half hour, but it makes no sense to add 3pm and 5pm.
Subtracting two Timestamps does produce a useful difference.

The brands prevent you from accidentally combining time values from different
TimerServices. If some chains track time in blocks, while others
follow wall clock time, using the correct brands means you don't have to worry
about timezones or how time is represented on a particular chain. This also
makes it possible to schedule events according to the time honored by
different chains.

The basic types are `RelativeTimeRecord` (durations) and `TimestampRecord`. The numeric
values can be extracted from the typed values, but it's usually better to
maintain values as their canonical typed form so these operations can be
applied.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `absValue` | (`abs`: [`Timestamp`](agoric_time.md#timestamp)) => [`TimestampValue`](agoric_time.md#timestampvalue) | - |
| `addAbsRel` | (`abs`: `T`, `rel`: [`RelativeTime`](agoric_time.md#relativetime)) => `T` | - |
| `addRelRel` | (`rel1`: `T`, `rel2`: `T`) => `T` | - |
| `clampedSubtractAbsAbs` | (`abs1`: [`Timestamp`](agoric_time.md#timestamp), `abs2`: [`Timestamp`](agoric_time.md#timestamp)) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `coerceRelativeTimeRecord` | (`rel`: [`RelativeTimeRecord`](agoric_time.md#relativetimerecord) \| [`RelativeTimeValue`](agoric_time.md#relativetimevalue) \| `number`, `brand`: [`TimerBrand`](agoric_time.md#timerbrand)) => [`RelativeTimeRecord`](agoric_time.md#relativetimerecord) | - |
| `coerceTimestampRecord` | (`abs`: [`TimestampRecord`](agoric_time.md#timestamprecord) \| [`TimestampValue`](agoric_time.md#timestampvalue) \| `number`, `brand`: [`TimerBrand`](agoric_time.md#timerbrand)) => [`TimestampRecord`](agoric_time.md#timestamprecord) | - |
| `compareAbs` | (`abs1`: [`Timestamp`](agoric_time.md#timestamp), `abs2`: [`Timestamp`](agoric_time.md#timestamp)) => `RankComparison` | - |
| `compareRel` | (`rel1`: [`RelativeTime`](agoric_time.md#relativetime), `rel2`: [`RelativeTime`](agoric_time.md#relativetime)) => `RankComparison` | - |
| `divideRelNat` | (`rel`: [`RelativeTime`](agoric_time.md#relativetime), `nat`: `bigint`) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `divideRelRel` | (`rel1`: [`RelativeTime`](agoric_time.md#relativetime), `rel2`: [`RelativeTime`](agoric_time.md#relativetime)) => `bigint` | - |
| `isRelZero` | (`rel`: [`RelativeTime`](agoric_time.md#relativetime)) => `boolean` | - |
| `modAbsRel` | (`abs`: [`Timestamp`](agoric_time.md#timestamp), `step`: [`RelativeTime`](agoric_time.md#relativetime)) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `modRelRel` | (`rel`: [`RelativeTime`](agoric_time.md#relativetime), `step`: [`RelativeTime`](agoric_time.md#relativetime)) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `multiplyRelNat` | (`rel`: [`RelativeTime`](agoric_time.md#relativetime), `nat`: `bigint`) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `relValue` | (`rel`: [`RelativeTime`](agoric_time.md#relativetime)) => [`RelativeTimeValue`](agoric_time.md#relativetimevalue) | - |
| `subtractAbsAbs` | (`abs1`: [`Timestamp`](agoric_time.md#timestamp), `abs2`: [`Timestamp`](agoric_time.md#timestamp)) => [`RelativeTime`](agoric_time.md#relativetime) | - |
| `subtractAbsRel` | (`abs`: [`Timestamp`](agoric_time.md#timestamp), `rel`: [`RelativeTime`](agoric_time.md#relativetime)) => [`Timestamp`](agoric_time.md#timestamp) | - |
| `subtractRelRel` | (`rel1`: [`RelativeTime`](agoric_time.md#relativetime), `rel2`: [`RelativeTime`](agoric_time.md#relativetime)) => [`RelativeTime`](agoric_time.md#relativetime) | - |

#### Defined in

[src/types.d.ts:251](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L251)

___

### TimerBrand

Ƭ **TimerBrand**: `Object`

The TimerBrand is a unique object that represents the kind of Time
used in Timestamp/RelativeTime records. Times from different sources
are not comparable.

Do not call `isMyTimerService(myTimerService)` on an untrusted
brand, because that will leak your closely-held timer authority. If
the goal is to check the suitability of a client-provided
Timestamp, use coerceTimestampRecord() or add/subtract it to a
known-good Timestamp, or extract its brand and === against
`timerService.getTimerBrand()`.

TODO Not all Timestamps are labeled with the TimerBrand (in much
the same way that `Amounts` are asset/money values labeled by
`Brands`), but the SwingSet vat-timer TimerService will use branded
TimestampRecord/RelativeTimeRecord in all messages it emits. Also,
a `TimerService` is still used everywhere a `TimerBrand` is called
for.

See https://github.com/Agoric/agoric-sdk/issues/5798
and https://github.com/Agoric/agoric-sdk/pull/5821

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMyClock` | (`clock`: [`Clock`](../interfaces/agoric_time.Clock.md)) => `ERef`\<`boolean`\> |
| `isMyTimerService` | (`timer`: [`TimerService`](../interfaces/agoric_time.TimerService.md)) => `ERef`\<`boolean`\> |

#### Defined in

[src/types.d.ts:31](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L31)

___

### Timestamp

Ƭ **Timestamp**: [`TimestampRecord`](agoric_time.md#timestamprecord) \| [`TimestampValue`](agoric_time.md#timestampvalue)

**`Deprecated`**

use TimestampRecord

Transitional measure until all are converted to TimestampRecord.
See `TimeMath` comment for an explanation of the representation
during this transition. After the transition, `Timestamp` will simplify
to the current definition of `TimestampRecord`, which will itself
be deleted. All Timestamps will then be labeled by TimerBrands.

#### Defined in

[src/types.d.ts:84](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L84)

___

### TimestampRecord

Ƭ **TimestampRecord**: `Object`

The canonical representation of a typed absolute time. It bundles the brand
with the time, as represented by a TimerService, which might represent time
since the epoch, or blockheight on a particular chain.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `absValue` | `bigint` |
| `timerBrand` | [`TimerBrand`](agoric_time.md#timerbrand) |

#### Defined in

[src/types.d.ts:60](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L60)

___

### TimestampValue

Ƭ **TimestampValue**: `bigint`

**`Deprecated`**

use TimestampRecord

An absolute time returned by a TimerService. Note that different timer
services may have different interpretations of actual TimestampValue values.
Will generally be a count of some number of units starting at some starting
point. But what the starting point is and what units are counted is purely up
to the meaning of that particular TimerService

#### Defined in

[src/types.d.ts:45](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/types.d.ts#L45)

## Variables

### RelativeTimeRecordShape

• `Const` **RelativeTimeRecordShape**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `relValue` | `Matcher` |
| `timerBrand` | `Matcher` |

#### Defined in

[src/typeGuards.js:12](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L12)

___

### RelativeTimeShape

• `Const` **RelativeTimeShape**: `Matcher`

#### Defined in

[src/typeGuards.js:18](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L18)

___

### RelativeTimeValueShape

• `Const` **RelativeTimeValueShape**: `Matcher`

#### Defined in

[src/typeGuards.js:5](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L5)

___

### TimeMath

• `Const` **TimeMath**: [`TimeMathType`](agoric_time.md#timemathtype)

The `TimeMath` object provides helper methods to do arithmetic on labeled
time values, much like `AmountMath` provides helper methods to do arithmetic
on labeled asset/money values. Both check for consistency of labels: a
binary operation on two labeled objects ensures that the both carry
the same label. If they produce another object from the same domain, it
will carry the same label. If the operands have incompatible labels,
an error is thrown.

Unlike amount arithmetic, time arithmetic deals in two kinds of time objects:
Timestamps, which represent absolute time, and RelativeTime, which represents
the duration between two absolute times. Both kinds of time object
are labeled by a `TimerBrand`. For a Timestamp object, the value is
a bigint in an `absValue` property. For a RelativeTime object, the value
is a bigint in a `relValue` property. Thus we have a runtime safety check
to ensure that we don't confused the two, even if we have managed to fool
the (unsound) static type system.

As a transitional measure, currently many Timestamps and RelativeTimes are
still represented by unlabeled bigints. During this transitional period,
we allow this, both statically and dynamically. For a normal binary
operation, if both inputs are labeled, then we do the full checking as
explained above and return a labeled result. If both inputs are unlabeled
bigints, we *assume* that they indicate a time of the right kind
(Timestamp vs RelativeTime) and timer brand. Since we don't know what
brand was intended, we can only return yet another unlabeled bigint.

If one operand is labeled and the other is not, we check the labeled operand,
*assume* the unlabeled bigint represents the value needed for the other
operand, and return a labeled time object with the brand of the labeled
operand.

#### Defined in

[src/timeMath.js:242](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/timeMath.js#L242)

___

### TimerBrandShape

• `Const` **TimerBrandShape**: `Matcher`

#### Defined in

[src/typeGuards.js:3](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L3)

___

### TimerServiceShape

• `Const` **TimerServiceShape**: `Matcher`

#### Defined in

[src/typeGuards.js:23](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L23)

___

### TimestampRecordShape

• `Const` **TimestampRecordShape**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `absValue` | `Matcher` |
| `timerBrand` | `Matcher` |

#### Defined in

[src/typeGuards.js:7](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L7)

___

### TimestampShape

• `Const` **TimestampShape**: `Matcher`

#### Defined in

[src/typeGuards.js:17](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L17)

___

### TimestampValueShape

• `Const` **TimestampValueShape**: `Matcher`

#### Defined in

[src/typeGuards.js:4](https://github.com/Agoric/agoric-sdk/blob/b78dc2aa5/packages/time/src/typeGuards.js#L4)
