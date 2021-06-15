import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';

import { E } from '@agoric/eventual-send';

// #region importNotifier
import { makeNotifierKit } from '@agoric/notifier';
// #endregion importNotifier

test('distributed programming -- basic notifiers', async t => {
  // region makeNotifierKit
  const { notifier, updater } = makeNotifierKit();
  // #endregion makeNotifierKit

  updater.updateState(37);
  const updateCount = 1; // bogus
  // #region getUpdateSince
  const update = await notifier.getUpdateSince(updateCount);
  // #endregion getUpdateSince
  t.is(37, update.value);
});

test('distributed programming -- follower', async t => {
  // rename notifier so the one in the sample code can be named 'notifier'
  const { notifier: topNotifier, updater } = makeNotifierKit();

  // fake publicAPI for the sake of the example
  const publicAPI = harden({
    getNotifier: () => topNotifier,
  });

  let state;
  let complete = false;
  const recordNewValue = v => (state = v);
  const recordFinalValue = v => {
    complete = true;
    state = v;
  };
  const reportError = e => {
    complete = true;
    state = e;
  };

  // #region follower
  function updateStateOnChanges(notifier, lastCount) {
    E(notifier)
      .getUpdateSince(lastCount)
      .then(
        newstate => {
          const { value, updateCount } = newstate;
          if (updateCount) {
            recordNewValue(value);
            // resubscribe for more updates
            updateStateOnChanges(notifier, updateCount);
          } else {
            recordFinalValue(value);
          }
        },
        e => reportError(e),
      );
  }

  E(publicAPI)
    .getNotifier()
    .then(notifier => updateStateOnChanges(notifier));
  // #endregion follower

  t.is(state, undefined);
  updater.updateState(37);
  const notifier1 = await E(publicAPI).getNotifier();
  const updateInWaiting = E(notifier1).getUpdateSince();

  const done = updateInWaiting.then(_update1 => {
    t.is(37, state);
    t.falsy(complete);

    updater.updateState(52);
    return E(notifier1)
      .getUpdateSince(2)
      .then(_update2 => {
        t.is(52, state);
        t.falsy(complete);

        updater.finish(97);
        return E(notifier1)
          .getUpdateSince(3)
          .then(_update3 => {
            t.is(97, state);
            t.truthy(complete);
            return true;
          });
      });
  });
  await done;
  done.then(v => t.truthy(v));
});
