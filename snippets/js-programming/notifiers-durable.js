// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file The durable PublishKit example excerpted by
 *   main/guides/js-programming/notifiers.md.
 */
import { makePinnedHistoryTopic } from '@agoric/notifier';
import { notifiersBaggage as baggage } from './durable-baggage.js';

// #region durablePublishKit
import { prepareDurablePublishKit } from '@agoric/notifier';

// During the vat's first crank:
const makeDurablePublishKit = prepareDurablePublishKit(baggage, 'MyTopic');
const { publisher, subscriber } = makeDurablePublishKit();
// #endregion durablePublishKit

/**
 * The iteration pinned from its start, so the test can consume everything the
 * example publishes without racing the eventual send that reaches the
 * subscriber.
 */
const topic = makePinnedHistoryTopic(subscriber);

export { publisher, subscriber, topic };
