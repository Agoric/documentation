# Zones and Persistence

A [vat](./#vats-the-unit-of-synchrony) can be **upgraded**: its code is
replaced with a new version while its identity, and some of its state, is
preserved. What survives an upgrade, and how, is governed by three
persistence regimes, and a **zone** is the API that lets the same
[Exo](./exo)-defining and [store](https://github.com/Agoric/agoric-sdk/tree/master/packages/store)-making
code work identically regardless of which regime it's allocating into.

## Three Regimes: Heap, Virtual, Durable

- **Heap**: ordinary JavaScript objects, living in the vat's JS heap. Lost
  the moment the vat terminates (including a normal upgrade). Cheapest, and
  the right choice for anything short-lived or low in number.
- **Virtual**: paged out to external storage so a vat can hold far more
  instances than would fit in the JS heap at once (high cardinality). Still
  lost on vat termination; virtual only addresses memory pressure, not
  survival.
- **Durable**: also paged to external storage, and additionally **survives a
  vat upgrade**: a durable object's state (though not its code) is still
  there in the successor incarnation, addressable from **baggage** (see
  below). Use durable state for anything a contract needs to remember across
  its own upgrades, such as an ERTP mint's ledger or a running total.

Being virtual or durable only changes how _instances_ of an Exo class are
stored; the exo _class_ itself (the maker function and its behavior) is
always re-established fresh each vat incarnation, and must remain low in
number regardless of regime.

## Making a Zone

<!-- excerpt: snippets/js-programming/test-zones.js#zoneImports -->

```js
import { makeHeapZone } from '@agoric/zone';
// or, inside a vat with access to baggage:
import { makeDurableZone } from '@agoric/zone/durable.js';
```

Each flavor has its own entry point, so importing one never drags the others
into your bundle:

- **`makeHeapZone(baseLabel?)`**, from `@agoric/zone` or
  `@agoric/zone/heap.js`, makes a zone backed purely by the JS heap.
  Useful for tests, and for library code that shouldn't force a durability
  choice on its caller.
- **`makeVirtualZone(baseLabel?)`**, from `@agoric/zone/virtual.js`, makes a
  zone backed by external storage, without durability.
- **`makeDurableZone(baggage, baseLabel?)`**, from `@agoric/zone/durable.js`,
  makes a zone backed by
  `baggage`, a `MapStore` provided to a vat's `buildRootObject` that is
  itself durable: whatever the zone stores under a given key, the successor
  incarnation finds again under that same key.

All three expose the same `Zone` interface, so library code written against
a `zone` parameter works the same way no matter which one its caller passes:

<!-- excerpt: snippets/js-programming/test-zones.js#durableZoneVat -->

```js
import { Far } from '@endo/far';

export const buildRootObject = (vatPowers, _args, baggage) => {
  const zone = makeDurableZone(baggage);

  const makeWidget = zone.exoClass(
    'Widget',
    WidgetI,
    name => ({ name, uses: 0 }),
    {
      use() {
        this.state.uses += 1;
        return this.state.uses;
      },
    },
  );

  const widgets = zone.mapStore('widgets'); // a durable MapStore

  return Far('WidgetFrobulator', {
    makeWidget,
    registerWidget(key, widget) {
      widgets.init(key, widget);
    },
  });
};
```

## Zone Methods

A `Zone` provides the allocators for both [Exo objects](./exo) and stores,
under the regime it was constructed with:

- **`zone.exoClass(tag, interfaceGuard, init, methods)`**: like
  `defineExoClass`, returning a maker function for instances bound to this
  zone's regime.
- **`zone.exoClassKit(tag, interfaceGuards, init, facetMethods)`**: like
  `defineExoClassKit`, for a maker function returning multi-facet cohorts.
- **`zone.mapStore(label)`, `zone.setStore(label)`, `zone.weakMapStore(label)`,
  `zone.weakSetStore(label)`**: collections (backed by
  [`@agoric/store`](https://github.com/Agoric/agoric-sdk/tree/master/packages/store))
  under this zone's regime.
- **`zone.subZone(label)`**: a child zone with its own namespace, useful
  for handing a sub-component just enough zone to make its own Exo classes
  and stores without exposing the parent's storage.
- **`zone.makeOnce(key, maker)`**: creates or retrieves a singleton bound to
  this zone, running `maker` only the first time `key` is seen.

## Baggage and the First-Crank Rule

**Baggage** is the durable `MapStore` a vat receives on `buildRootObject`,
and it's the root of everything a durable zone stores: destroying a key from
baggage or never re-registering it after an upgrade permanently orphans
whatever was reachable only through it.

Durable Exo classes must be re-established with `zone.exoClass` (which calls
`prepareExoClass` under the hood) during **the first crank** of every vat
incarnation, before the vat can process any delivery. This isn't a style
preference: a message can arrive at any moment for an instance a _previous_
incarnation exported to some other vat, and that instance's behavior has to
already be defined by the time the message shows up, because data persists
across incarnations but code does not. Concretely, this means:

- Call every `zone.exoClass`/`zone.exoClassKit` your vat needs at the very
  top of `buildRootObject` (or an `async` setup function awaited from
  it before any other delivery can interleave), not lazily on first use.
- Durable-kind maker functions are **synchronous**. If you're converting an
  asynchronous maker, make sure everything it needs is already available
  without an `await`, since a vat cannot suspend mid-restart to wait on I/O.

See the
[Exo Taxonomy's make/define/prepare section](https://github.com/endojs/endo/blob/master/packages/exo/docs/exo-taxonomy.md#makedefine-vs-prepare)
for how `prepare*` relates to `make*`/`define*`, and
[SwingSet's vat-upgrade documentation](https://github.com/Agoric/agoric-sdk/tree/master/packages/SwingSet/docs/vat-upgrade.md)
for the upgrade process itself.

## Zones and the Rest of the Modern Stack

- [Exo Objects and Interface Guards](./exo): what a zone actually allocates.
- [Vows and Durable Eventual-Send](./eventual-send#vows-and-durable-eventual-send):
  the companion mechanism for durable _results_, as opposed to durable
  _objects_. `prepareVowTools(zone)` takes a zone the same way `zone.exoClass`
  does.
- [`@agoric/store`](https://github.com/Agoric/agoric-sdk/tree/master/packages/store):
  the `MapStore`/`SetStore` family a zone's `mapStore`/`setStore` methods
  return, usable directly (without a zone) when you only need a collection
  and not an Exo class.
