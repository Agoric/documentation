// @ts-check
import { makeDurableZone } from '@agoric/zone/durable.js';

export const start = (_zcf, _privateArgs, baggage) => {
  /** @type {import('@agoric/zone').Zone} */
  const zone = makeDurableZone(baggage);

  const makeCell = zone.exoClass(
    'Cell',
    undefined,
    () => ({ value: 'Hello, World!' }),
    {
      get() {
        return this.state.value;
      },
      set(v) {
        this.state.value = v;
      },
    },
  );
  const publicFacet = makeCell();
  return { publicFacet };
};
