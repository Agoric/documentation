// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file Working examples excerpted by main/guides/js-programming/zones.md.
 */
import { test } from '../prepare-test-env-ava.js';
import { zonesBaggage } from './durable-baggage.js';
import { M } from '@endo/patterns';

// #region zoneImports
import { makeHeapZone } from '@agoric/zone';
// or, inside a vat with access to baggage:
import { makeDurableZone } from '@agoric/zone/durable.js';
// #endregion zoneImports

const WidgetI = M.interface('Widget', {
  use: M.call().returns(M.number()),
});

// #region durableZoneVat
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
// #endregion durableZoneVat

test('every zone flavor exposes the same allocator interface', t => {
  const heapZone = makeHeapZone();
  const durableZone = makeDurableZone(zonesBaggage, 'comparison');
  for (const zone of [heapZone, durableZone]) {
    t.is(typeof zone.exoClass, 'function');
    t.is(typeof zone.exoClassKit, 'function');
    t.is(typeof zone.mapStore, 'function');
    t.is(typeof zone.setStore, 'function');
    t.is(typeof zone.subZone, 'function');
    t.is(typeof zone.makeOnce, 'function');
  }
});

test('a heap zone and a durable zone allocate the same exo class', t => {
  const makeWidgetIn = zone =>
    zone.exoClass('Widget', WidgetI, name => ({ name, uses: 0 }), {
      use() {
        this.state.uses += 1;
        return this.state.uses;
      },
    });
  const heapWidget = makeWidgetIn(makeHeapZone('heapFlavor'))('heap');
  const durableWidget = makeWidgetIn(
    makeDurableZone(zonesBaggage, 'durableFlavor'),
  )('durable');
  t.is(heapWidget.use(), 1);
  t.is(heapWidget.use(), 2);
  t.is(durableWidget.use(), 1);
});

test('buildRootObject allocates its widgets and its store from baggage', t => {
  const baggage = makeDurableZone(zonesBaggage, 'vat').mapStore('vatBaggage');
  const root = buildRootObject(undefined, undefined, baggage);
  const widget = root.makeWidget('sprocket');
  t.is(widget.use(), 1);
  t.is(widget.use(), 2);
  root.registerWidget('sprocket', widget);
  t.throws(() => root.registerWidget('sprocket', widget), {
    message: /already registered|already has/,
  });
});
