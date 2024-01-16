// #region file
/** @file Contract to mint and sell Place NFTs for a hypothetical game. */
// @ts-check

import { Far } from '@endo/far';
import { M, getCopyBagEntries } from '@endo/patterns';
import { AmountMath, AssetKind } from '@agoric/ertp/src/amountMath.js';
import { AmountShape } from '@agoric/ertp/src/typeGuards.js';
import { atomicRearrange } from '@agoric/zoe/src/contractSupport/atomicTransfer.js';
import '@agoric/zoe/exported.js';

import { makeTracer } from './debug.js';

const { Fail, quote: q } = assert;

const trace = makeTracer('Game', true);

/** @param {Amount<'copyBag'>} amt */
const bagValueSize = amt => {
  /** @type {[unknown, bigint][]} */
  const entries = getCopyBagEntries(amt.value); // XXX getCopyBagEntries returns any???
  const total = entries.reduce((acc, [_place, qty]) => acc + qty, 0n);
  return total;
};

/**
 * @param {ZCF<{joinPrice: Amount}>} zcf
 */
// #region start
export const start = async zcf => {
  const { joinPrice } = zcf.getTerms();

  const { zcfSeat: gameSeat } = zcf.makeEmptySeatKit();
  const mint = await zcf.makeZCFMint('Place', AssetKind.COPY_BAG);
  // #endregion start

  // #region handler
  /** @param {ZCFSeat} playerSeat */
  const joinHandler = playerSeat => {
    const { give, want } = playerSeat.getProposal();
    trace('join', 'give', give, 'want', want.Places.value);

    AmountMath.isGTE(give.Price, joinPrice) ||
      Fail`${q(give.Price)} below joinPrice of ${q(joinPrice)}}`;

    bagValueSize(want.Places) <= 3n || Fail`only 3 places allowed when joining`;

    const tmp = mint.mintGains(want);
    atomicRearrange(
      zcf,
      harden([
        [playerSeat, gameSeat, give],
        [tmp, playerSeat, want],
      ]),
    );

    playerSeat.exit(true);
    return 'welcome to the game';
  };
  // #endregion handler

  // #region makeInvitation
  const joinShape = harden({
    give: { Price: AmountShape },
    want: { Places: AmountShape },
    exit: M.any(),
  });

  const publicFacet = Far('API', {
    makeJoinInvitation: () =>
      zcf.makeInvitation(joinHandler, 'join', undefined, joinShape),
  });
  // #endregion makeInvitation

  // #region started
  return { publicFacet };
  // #endregion started
};
harden(start);
// #endregion file
