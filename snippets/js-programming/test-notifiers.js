// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates, no-shadow --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, and reproduces the parameter names the page uses, so imports
   interleave with statements and `consume`'s parameter shadows the
   module-level `subscription` on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file Working examples excerpted by
 *   main/guides/js-programming/notifiers.md.
 */
import { test } from '../prepare-test-env-ava.js';
import { E } from '@endo/far';
import {
  makeNotifierKit,
  makeSubscriptionKit,
  observeIteration,
  subscribeEach,
} from '@agoric/notifier';
import * as plainPublishKit from './notifiers-publish-kit.js';
import { lossless, lossy } from './notifiers-subscribe.js';
import * as durablePublishKit from './notifiers-durable.js';
import { publisher as storedPublisher, written } from './notifiers-stored.js';

// #region subscriptionKitPublish
const { publication, subscription } = makeSubscriptionKit();
// Paula the publisher says
publication.updateState('a');
publication.updateState('b');
publication.finish('done');
// #endregion subscriptionKitPublish

// #region consumeSubscription
const consume = async subscription => {
  try {
    for await (const val of subscription) {
      console.log('non-final-value', val);
    }
    console.log('the iteration finished');
  } catch (reason) {
    console.log('the iteration failed', reason);
  }
};
consume(subscription);
// Eventually prints:
// non-final-value a
// non-final-value b
// the iteration finished
// #endregion consumeSubscription

// #region observeIterationExample
const observer = harden({
  updateState: val => console.log('non-final-value', val),
  finish: completion => console.log('finished', completion),
  fail: reason => console.log('failed', reason),
});
observeIteration(subscription, observer);
// Eventually prints:
// non-final-value a
// non-final-value b
// finished done
// #endregion observeIterationExample

// #region makeNotifierKitExample
const { updater, notifier } = makeNotifierKit();
// #endregion makeNotifierKitExample

// #region makeLocalSubscription
import { makeSubscription } from '@agoric/notifier';

const localSubscription = makeSubscription(
  E(subscription).getSharableSubscriptionInternals(),
);
consume(localSubscription);
// #endregion makeLocalSubscription

// #region adapterSubscription
const { publication: adapterPublication, subscription: adapterSubscription } =
  makeSubscriptionKit();
observeIteration(subscription, adapterPublication);
consume(adapterSubscription);
// #endregion adapterSubscription

/**
 * Collect an entire async iteration into an array.
 *
 * @param {AsyncIterable<unknown>} asyncIterable
 */
const drain = async asyncIterable => {
  const collected = [];
  for await (const value of asyncIterable) {
    collected.push(value);
  }
  return collected;
};

test('makePublishKit() answers a publisher and a subscriber', t => {
  t.is(typeof plainPublishKit.publisher.publish, 'function');
  t.is(typeof plainPublishKit.publisher.finish, 'function');
  t.is(typeof plainPublishKit.publisher.fail, 'function');
  t.is(typeof plainPublishKit.subscriber.subscribeAfter, 'function');
});

test('subscribeEach is lossless where subscribeLatest is lossy', t => {
  t.deepEqual(lossless, ['a', 'b'], 'every non-final value, in order');
  t.deepEqual(lossy, [], 'a late lossy consumer skips what it missed');
});

test('prepareDurablePublishKit binds a publish kit to baggage', async t => {
  durablePublishKit.publisher.publish('durable a');
  durablePublishKit.publisher.finish('durable done');
  t.deepEqual(await drain(subscribeEach(durablePublishKit.topic)), [
    'durable a',
  ]);
});

test('makeStoredSubscriber republishes to its storage node', async t => {
  storedPublisher.publish(42n);
  storedPublisher.finish('done');
  // Let the storage writes, which are eventual sends, land.
  for (let turn = 0; turn < 10; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await null;
  }
  t.deepEqual(
    written.map(value => JSON.parse(value).body),
    ['#"+42"'],
  );
});

test('a SubscriptionKit conveys every value plus the completion', async t => {
  t.deepEqual(await drain(subscription), ['a', 'b']);
  await t.notThrowsAsync(() => consume(subscription));
});

test('observeIteration sees the completion value a for-await-of cannot', async t => {
  const seen = [];
  await observeIteration(
    subscription,
    harden({
      updateState: value => seen.push(['updateState', value]),
      finish: completion => seen.push(['finish', completion]),
      fail: reason => seen.push(['fail', reason]),
    }),
  );
  t.deepEqual(seen, [
    ['updateState', 'a'],
    ['updateState', 'b'],
    ['finish', 'done'],
  ]);
});

test('a NotifierKit conveys the latest value and the termination', async t => {
  updater.updateState('n1');
  const first = await notifier.getUpdateSince();
  t.is(first.value, 'n1');
  updater.finish('n done');
  const last = await notifier.getUpdateSince(first.updateCount);
  t.is(last.value, 'n done');
  t.is(last.updateCount, undefined, 'a final state has no next update');
});

test('a local mirror replays the whole iteration', async t => {
  t.deepEqual(await drain(localSubscription), ['a', 'b']);
});

test('an observeIteration adapter mirrors a possibly remote iteration', async t => {
  t.deepEqual(await drain(adapterSubscription), ['a', 'b']);
});
