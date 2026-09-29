// @jessie-check
/* eslint-disable import/order, import/first --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file The chain-storage example excerpted by
 *   main/guides/js-programming/notifiers.md, with a stand-in StorageNode
 *   that records what a real vstorage node would have been asked to write.
 */
import { Far } from '@endo/far';
import { makeMarshal } from '@endo/marshal';
import { publisher, subscriber } from './notifiers-publish-kit.js';

/** Everything the example asked chain storage to write. */
export const written = [];

const storageNode = Far('StorageNode', {
  setValue: value => {
    written.push(value);
  },
});

const codec = makeMarshal(undefined, undefined, {
  serializeBodyFormat: 'smallcaps',
});
const marshaller = Far('Marshaller', {
  toCapData: value => codec.toCapData(value),
  fromCapData: capData => codec.fromCapData(capData),
});

// #region storedSubscriber
import { makeStoredSubscriber } from '@agoric/notifier';

const storedSubscriber = makeStoredSubscriber(
  subscriber,
  storageNode,
  marshaller,
);
// #endregion storedSubscriber

export { publisher, storedSubscriber };
