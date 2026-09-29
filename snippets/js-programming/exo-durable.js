// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file The durable-zone exo class excerpted by
 *   main/guides/js-programming/exo.md.
 */
import { exoBaggage as baggage } from './durable-baggage.js';
import { CounterI } from './exo-interface.js';

// #region durableExoClass
import { makeDurableZone } from '@agoric/zone/durable.js';

const zone = makeDurableZone(baggage);
const makeCounter = zone.exoClass(
  'Counter',
  CounterI,
  (initialValue = 0) => ({ count: initialValue }),
  {
    increment(delta = 1) {
      this.state.count += delta;
      return this.state.count;
    },
    reset(to = 0) {
      this.state.count = to;
    },
    getValue() {
      return this.state.count;
    },
  },
);
// #endregion durableExoClass

export { makeCounter };
