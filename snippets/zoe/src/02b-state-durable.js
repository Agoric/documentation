// @ts-check
// #region contract
import { M } from '@endo/patterns';
// #region import-zone
import { makeDurableZone } from '@agoric/zone/durable.js';
// #endregion import-zone

// #region interface-guard
const RoomI = M.interface('Room', {
  getId: M.call().returns(M.number()),
  incr: M.call().returns(M.number()),
  decr: M.call().returns(M.number()),
});

const RoomMakerI = M.interface('RoomMaker', {
  makeRoom: M.call().returns(M.remotable()),
});
// #endregion interface-guard

// #region export-prepare
export const prepare = (_zcf, _privateArgs, baggage) => {
  // #endregion export-prepare
  // #region zone1
  const zone = makeDurableZone(baggage);
  const rooms = zone.mapStore('rooms');
  // #endregion zone1

  // #region exoclass
  const makeRoom = zone.exoClass('Room', RoomI, id => ({ id, count: 0 }), {
    getId() {
      return this.state.id;
    },
    incr() {
      this.state.count += 1;
      return this.state.count;
    },
    decr() {
      this.state.count -= 1;
      return this.state.count;
    },
  });
  // #endregion exoclass

  // #region exo
  const publicFacet = zone.exo('RoomMaker', RoomMakerI, {
    makeRoom() {
      const room = makeRoom();
      const id = rooms.size;
      rooms.init(id, room);
      return room;
    },
  });

  return { publicFacet };
  // #endregion exo
};
// #endregion contract
