// @jessie-check
/**
 * @file The lossless/lossy consumption example excerpted by
 *   main/guides/js-programming/notifiers.md.
 */
// #region subscribeEachAndLatest
import {
  makePinnedHistoryTopic,
  makePublishKit,
  subscribeEach,
  subscribeLatest,
} from '@agoric/notifier';

const { publisher, subscriber } = makePublishKit();

// A subscriber is forward-lossless: it conveys what is published after a
// consumer reaches it, not what was published before. Pinning the history
// first lets a consumer that arrives later still reach the whole iteration.
const topic = makePinnedHistoryTopic(subscriber);

publisher.publish('a');
publisher.publish('b');
publisher.finish('done');

// Lossless: every non-final value, in the order it was published.
const lossless = [];
for await (const value of subscribeEach(topic)) {
  lossless.push(value);
}
// lossless is ['a', 'b']

// Lossy: a consumer skips straight to wherever the publisher is now, so one
// that arrives after the iteration finished sees none of what it missed.
const lossy = [];
for await (const value of subscribeLatest(topic)) {
  lossy.push(value);
}
// lossy is []
// #endregion subscribeEachAndLatest

export { lossless, lossy };
