// #region advisoryCounter
// @ts-check

/** @param {number} init */
const makeCounter = init => {
  let value = init;
  return {
    incr: () => {
      value += 1;
      return value;
    },
  };
};
// #endregion advisoryCounter

export { makeCounter };
