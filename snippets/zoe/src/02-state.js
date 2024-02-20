import { Far } from '@endo/far';

// #region startfn
// #region heap-state
export const start = () => {
  const rooms = new Map();

  const getRoomCount = () => rooms.size;
  const makeRoom = id => {
    let count = 0;
    const room = Far('Room', {
      getId: () => id,
      incr: () => (count += 1),
      decr: () => (count -= 1),
    });
    rooms.set(id, room);
    return room;
  };
  // #endregion heap-state

  return {
    publicFacet: Far('RoomMaker', { getRoomCount, makeRoom }),
  };
};
// #endregion startfn
