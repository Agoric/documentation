// @jessie-check
/**
 * @file The interface guards excerpted by
 *   main/guides/js-programming/exo.md, kept in their own module so that the
 *   durable example can reuse the very guard the page shows.
 */
// #region counterInterface
import { M } from '@endo/patterns';

const CounterI = M.interface('Counter', {
  increment: M.call().optional(M.number()).returns(M.number()),
  reset: M.call().optional(M.number()).returns(),
  getValue: M.call().returns(M.number()),
});
// #endregion counterInterface

// #region fetcherInterface
const FetcherI = M.interface('Fetcher', {
  fetch: M.callWhen(M.await(M.string())).returns(M.string()),
});
// #endregion fetcherInterface

export { CounterI, FetcherI };
