// #region state-contract
import { Far } from '@endo/far';

// #region startfn
// #region heap-state
export const start = () => {
  // #region rooms-map
  const rooms = new Map();
  // #endregion rooms-map

  // #region getRoomCount
  const getRoomCount = () => rooms.size;
  // #endregion getRoomCount
  // #region makeRoom
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
  // #endregion makeRoom
  // #endregion heap-state

  return {
    publicFacet: Far('RoomMaker', { getRoomCount, makeRoom }),
  };
};
// #endregion startfn
// #endregion state-contract
