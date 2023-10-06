// @ts-check
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from './prepare-test-env-ava.js';

import { E, Far } from '@endo/far';
import { passStyleOf } from '@endo/pass-style';
import { makeCopyBag } from '@endo/patterns';

import { makeFakeBoard } from '@agoric/vats/tools/board-utils.js';

// #region marshal-import
import { makeMarshal } from '@endo/marshal';
import { AmountMath } from '@agoric/ertp';

/** @type {import('@endo/marshal').MakeMarshalOptions} */
const smallCaps = { serializeBodyFormat: 'smallcaps' };
// #endregion marshal-import

const { Fail } = assert;

test.serial('marshal.toCapData is like JSON.stringify on steroids', async t => {
  // #region marshal-json-steroids
  const m = makeMarshal(undefined, undefined, smallCaps);

  const stuff = harden([1, 2, 3n, undefined, NaN]);
  const capData = m.toCapData(stuff);
  t.deepEqual(m.fromCapData(capData), stuff);
  // #endregion marshal-json-steroids
  t.deepEqual(capData, {
    body: '#[1,2,"+3","#undefined","#NaN"]',
    slots: [],
  });

  t.deepEqual(
    capData.body.replace(/^#/, ''),
    JSON.stringify([1, 2, '+3', '#undefined', '#NaN']),
  );

  t.log(capData.body);
});

/**
 * "The marshal module helps with conversion of "capability-bearing data",
 * in which some portion of the structured input represents
 * "pass-by-proxy" or "pass-by-presence" objects.
 * These should be serialized into markers that
 * refer to special "reference identifiers".
 * These identifiers are collected in an array,
 * and the serialize() function returns a two-element structure
 * known as "CapData": a body that contains the usual string,
 * and a new slots array that holds the reference identifiers.
 * unserialize() takes this CapData structure and
 * returns the object graph.
 * The marshaller must be taught (with a pair of callbacks)
 * how to create the presence markers,
 * and how to turn these markers back into proxies/presences."
 * -- https://github.com/endojs/endo/tree/master/packages/marshal#readme
 */
test.serial(
  'remotables are passed between vats using reference identifiers',
  async t => {
    // #region marshal-remotable
    const makeCounter = () => {
      let count = 0;
      return Far('counter', {
        incr: () => (count += 1),
        decr: () => (count -= 1),
      });
    };

    const counter1 = makeCounter();
    t.is(passStyleOf(counter1), 'remotable');

    const valToSlot = new Map([[counter1, 'c1']]);
    const slotToVal = new Map([['c1', counter1]]);
    const convertValToSlot = v => valToSlot.get(v);
    const convertSlotToVal = (slot, _iface) => slotToVal.get(slot);
    const m = makeMarshal(convertValToSlot, convertSlotToVal, smallCaps);

    const capData = m.toCapData(counter1);
    t.deepEqual(capData, {
      body: '#"$0.Alleged: counter"',
      slots: ['c1'],
    });
    t.deepEqual(m.fromCapData(capData), counter1);
    // #endregion marshal-remotable
    t.log(capData);
  },
);

// #region marshal-table
const makeSlot1 = (val, serial) => {
  const prefix = Promise.resolve(val) === val ? 'promise' : 'object';
  return `${prefix}${serial}`;
};

const makeTranslationTable = (makeSlot, makeVal) => {
  const valToSlot = new Map();
  const slotToVal = new Map();

  const convertValToSlot = val => {
    if (valToSlot.has(val)) return valToSlot.get(val);
    const slot = makeSlot(val, valToSlot.size);
    valToSlot.set(val, slot);
    slotToVal.set(slot, val);
    return slot;
  };

  const convertSlotToVal = (slot, iface) => {
    if (slotToVal.has(slot)) return slotToVal.get(slot);
    if (makeVal) {
      const val = makeVal(slot, iface);
      valToSlot.set(val, slot);
      slotToVal.set(slot, val);
      return val;
    }
    throw Error(`no such ${iface}: ${slot}`);
  };

  return harden({ convertValToSlot, convertSlotToVal });
};
// #endregion marshal-table

/**
 * Marshal is an important part of [how eventual send works][1].
 *
 * "What happens when we call `E(zoe).install(bundle)` is an _eventual send_:
 * 1. A message consisting of the method name `install`
 *    with the `bundle` argument is marshaled..."
 *
 * [1]: https://docs.agoric.com/guides/js-programming/eventual-send.html#eventual-send
 */
test.serial(
  'marshal messages from E(zoe).install(), E(zoe).startInstance()',
  async t => {
    // #region marshal-messages-e
    const { convertValToSlot, convertSlotToVal } = makeTranslationTable(
      makeSlot1,
    );
    const m = makeMarshal(convertValToSlot, convertSlotToVal, smallCaps);

    const outgoingMessageQueue = [];
    // E work-alike for illustration
    const E2 = obj =>
      new Proxy(obj, {
        get: (target, method) => (...args) => {
          const msg = harden([target, [method, args]]);
          outgoingMessageQueue.push(m.toCapData(msg));
          return new Promise(_resolve => {});
        },
      });
    // #endregion marshal-messages-e

    // #region marshal-messages
    const zoe = Far('ZoeService', {});
    const bundle = { bundleFormat: 'xyz' };
    const installationP = E2(zoe).install(bundle);
    const startP = E2(zoe).startInstance(installationP);
    harden(startP); // suppress usage lint
    t.deepEqual(outgoingMessageQueue, [
      {
        body:
          '#["$0.Alleged: ZoeService",["install",[{"bundleFormat":"xyz"}]]]',
        slots: ['object0'],
      },
      {
        body: '#["$0.Alleged: ZoeService",["startInstance",["&1"]]]',
        slots: ['object0', 'promise1'],
      },
    ]);
    // #endregion marshal-messages
    t.log(outgoingMessageQueue[1]);
  },
);

/** @typedef {import('@endo/pass-style').Remotable} Brand */

/**
 * The Agoric Board is a well-known name service that issues
 * plain string identifiers for object identities.
 *
 * The board supports using its table of identifiers as a marshal
 * translation table. (Promises and Errors are not supported. Only
 * passable _keys_.)
 *
 * Data published to vstorage is typically marshalled using a board marshaler.
 */
test.serial(
  'game "contract" publishes data using board translation table',
  async t => {
    const vstorage = new Map();
    const makeVstorageNode = key => {
      return harden({
        setValue: val => vstorage.set(key, val),
        makeChildNode: name => makeVstorageNode(`${key}.${name}`),
      });
    };

    // NOTE: this test mock passes {body, slots} to .setValue()
    // The real vstorage .setValue() only takes a string.
    // So currently, we JSON.stringify({body, slots}) again.
    /**
     * @param {StorageNode} parent
     * @param {string} name
     * @param {Marshaller} m
     */
    const makeRecorder = (parent, name, m) => {
      const node = parent.makeChildNode(name);
      return harden({
        write: async val => node.setValue(await E(m).toCapData(val)),
      });
    };

    const theBoard = makeFakeBoard();

    const asset = {
      gold: { brand: Far('Gold Brand', {}) },
      victory: { brand: Far('Victory Brand', {}) },
    };

    // #region boardMarshal
    /** @type {Record<string, Brand>} */
    const brands = {
      gold: asset.gold.brand,
      victory: asset.victory.brand,
    };

    // explicitly register brand using the board API
    const victoryBrandBoardId = await E(theBoard).getId(brands.victory);
    t.is(victoryBrandBoardId, 'board0371');

    // When the publishing marshaler needs a reference marker for something
    // such as the gold brand, it issues a new board id.
    const pubm = E(theBoard).getPublishingMarshaller();
    const brandData = await E(pubm).toCapData(brands);
    t.deepEqual(brandData, {
      body: `#${JSON.stringify({
        gold: '$0.Alleged: Gold Brand',
        victory: '$1.Alleged: Victory Brand',
      })}`,
      slots: ['board0592', 'board0371'],
    });
    // #endregion boardMarshal

    const contract1 = async (node, rom) => {
      const treasure = Far('Treasure', {});

      const { add, make } = AmountMath;
      const mkSemi = (brand, entries) => make(brand, makeCopyBag(entries));
      let victories = mkSemi(brands.victory, []);

      // Use the read-only marshaler to avoid publishing sensitive things such as treasure.
      const statusTopic = makeRecorder(node, 'status', rom);
      await statusTopic.write({ victories });

      let rng = 5;
      const doBattle = async enemy => {
        await null;
        rng = (rng * rng) % 7;
        if (rng > 3) {
          victories = add(victories, mkSemi(brands.victory, [[enemy, 1n]]));
          // oops! we didn't mean to publish treasure!
          await statusTopic.write({ treasure, victories });
        }
      };

      return harden({ publicFacet: { doBattle } });
    };

    // The board provides a read-only marshaler to avoid accidentally publishing
    // sensitive things.
    const rom = E(theBoard).getReadonlyMarshaller();

    const node1 = makeVstorageNode('player1');
    const game1 = await contract1(node1, rom);
    await E(game1.publicFacet).doBattle('troll');
    await E(game1.publicFacet).doBattle('witch');
    await E(game1.publicFacet).doBattle('giant');
    await E(game1.publicFacet).doBattle('troll');
    await E(game1.publicFacet).doBattle('giant');

    t.log(vstorage.get('player1.status'));

    t.deepEqual(
      [...vstorage.entries()],
      [
        [
          'player1.status',
          {
            body: `#${JSON.stringify({
              treasure: '$0.Alleged: Treasure',
              victories: {
                brand: '$1.Alleged: Victory Brand',
                value: {
                  '#tag': 'copyBag',
                  payload: [
                    ['troll', '+1'],
                    ['giant', '+2'],
                  ],
                },
              },
            })}`,
            // Note the read-only marshaler emits a `null` slot
            // for unpublished remotables.
            slots: [null, 'board0371'],
          },
        ],
      ],
    );
  },
);

/**
 * Off-chain clients can mirror the on-chain board translation table
 * by synthesizing a remotable for each reference marker received.
 */
// #region makeBoardContext
const makeBoardContext = () => {
  const synthesizeRemotable = (_slot, iface) =>
    Far(iface.replace(/^Alleged: /, ''), {});

  const { convertValToSlot, convertSlotToVal } = makeTranslationTable(
    slot => Fail`unknown id: ${slot}`,
    synthesizeRemotable,
  );
  const marshaller = makeMarshal(convertValToSlot, convertSlotToVal, smallCaps);

  /** Read-only board work-alike. */
  const board = harden({
    getId: convertValToSlot,
    getValue: convertSlotToVal,
  });

  return harden({
    board,
    marshaller,
    /**
     * Unmarshall capData, synthesizing a Remotable for each boardID slot.
     *
     * @type {(cd: import("@endo/marshal").CapData<string>) => unknown }
     */
    ingest: marshaller.fromCapData,
  });
};
// #endregion makeBoardContext

test.serial('ingest data from vstorage', async t => {
  // From vstorage, we might get brand info such as:
  const brandData = {
    body: `#${JSON.stringify({
      gold: '$0.Alleged: Gold Brand',
      victory: '$1.Alleged: Victory Brand',
    })}`,
    slots: ['board0592', 'board0371'],
  };

  // We can unmarshal it, using a translation table that we keep around:
  const clientContext = makeBoardContext();
  const brands = clientContext.ingest(brandData);

  // The values of the object will be fresh object identities,
  // but we know what the keys look like.
  t.deepEqual(Object.keys(brands), ['gold', 'victory']);

  // The we might get player status:
  const playerStatus = {
    body: `#${JSON.stringify({
      treasure: '$0.Alleged: Treasure',
      victories: {
        brand: '$1.Alleged: Victory Brand',
        value: {
          '#tag': 'copyBag',
          payload: [
            ['troll', '+1'],
            ['giant', '+2'],
          ],
        },
      },
    })}`,
    // Note the read-only marshaler emits a `null` slot
    // for unpublished remotables.
    slots: [null, 'board0371'],
  };

  // We don't get a stable object identity for the treasure,
  // but let's look at the rest:
  const { treasure: _null, ...rest } = clientContext.ingest(playerStatus);
  t.log(rest);

  // Now we can treat the unmarshalled data as ordinary passable data,
  // including object identities such as brands.victory:
  t.deepEqual(rest, {
    victories: {
      brand: brands.victory,
      value: makeCopyBag([
        ['troll', 1n],
        ['giant', 2n],
      ]),
    },
  });
});

test.serial('assemble an offer spend action', async t => {
  const instanceQueryResult = {
    body: `#${JSON.stringify({
      game1: '$0.Alleged: Instance',
    })}`,
    slots: ['board123'],
  };
  // #region useBoardContext
  const clientContext = makeBoardContext();

  const brandQueryResult = {
    body: `#${JSON.stringify({
      gold: '$1.Alleged: Gold Brand',
      victory: '$0.Alleged: Victory Brand',
    })}`,
    slots: ['board0371', 'board32342'],
  };
  const brands = clientContext.ingest(brandQueryResult);
  const { game1: instance } = clientContext.ingest(instanceQueryResult);
  // #endregion useBoardContext

  t.log('reference info from vstorage', { instance, brands });

  // #region exInvitationSpec
  /** @type {import('@agoric/smart-wallet').InvitationSpec} */
  const invitationSpec = {
    source: 'contract',
    instance,
    publicInvitationMaker: 'makeBattleInvitation',
    invitationArgs: ['troll'],
  };
  // #endregion exInvitationSpec

  // #region exBridgeAction
  /** @type {import('@agoric/smart-wallet').BridgeAction} */
  const action = harden({
    method: 'executeOffer',
    offer: {
      id: 'battle7651',
      invitationSpec,
      proposal: {
        give: { Gold: AmountMath.make(brands.gold, 100n) },
      },
    },
  });
  // #endregion exBridgeAction

  // #region exBridgeActionEq
  t.deepEqual(clientContext.marshaller.toCapData(action), {
    body: `#${JSON.stringify({
      method: 'executeOffer',
      offer: {
        id: 'battle7651',
        invitationSpec: {
          instance: '$0.Alleged: Instance',
          invitationArgs: ['troll'],
          publicInvitationMaker: 'makeBattleInvitation',
          source: 'contract',
        },
        proposal: {
          give: {
            Gold: { brand: '$1.Alleged: Gold Brand', value: '+100' },
          },
        },
      },
    })}`,
    slots: ['board123', 'board32342'],
  });
  // #endregion exBridgeActionEq
  t.log(action.offer);

  // #region exSpendAction
  const spendAction = JSON.stringify(
    clientContext.marshaller.toCapData(action),
  );
  // #endregion exSpendAction

  // #region exSpendActionCk
  t.regex(spendAction, /^{"body":"#.*","slots":\["board123","board32342"\]}$/);
  const goldStuff =
    '\\"brand\\":\\"$1.Alleged: Gold Brand\\",\\"value\\":\\"+100\\"';
  t.true(spendAction.includes(goldStuff));
  // #endregion exSpendActionCk
});
