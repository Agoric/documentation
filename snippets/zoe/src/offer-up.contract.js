// #region file
/** @file Contract to mint and sell a few Item NFTs at a time. */
// @ts-check

import { Far } from '@endo/far';
import { M, getCopyBagEntries } from '@endo/patterns';
import { AssetKind } from '@agoric/ertp/src/amountMath.js';
import { atomicRearrange } from '@agoric/zoe/src/contractSupport/atomicTransfer.js';
import '@agoric/zoe/exported.js';

const { Fail, quote: q } = assert;

// #region bagUtils
/** @type { (xs: bigint[]) => bigint } */
const sum = xs => xs.reduce((acc, x) => acc + x, 0n);

/**
 * @param {import('@endo/patterns').CopyBag} bag
 * @returns {bigint[]}
 */
const bagCounts = bag => {
  const entries = getCopyBagEntries(bag);
  return entries.map(([_k, ct]) => ct);
};
// #endregion bagUtils

/**
 * In addition to the standard `issuers` and `brands` terms,
 * this contract is parameterized by terms for price and,
 * optionally, a maximum number of items sold for that price (default: 3).
 *
 * @typedef {{
 *   tradePrice: Amount;
 *   maxItems?: bigint;
 * }} OfferUpTerms
 */

// #region start
/** @param {ZCF<OfferUpTerms>} zcf */
export const start = async zcf => {
  const { tradePrice, maxItems = 3n } = zcf.getTerms();

  const itemMint = await zcf.makeZCFMint('Item', AssetKind.COPY_BAG);
  // #endregion start
  const { brand: itemBrand } = itemMint.getIssuerRecord();

  /** a seat for allocating proceeds of sales */
  const proceeds = zcf.makeEmptySeatKit().zcfSeat;
  // #region handler
  /** @type {OfferHandler} */
  const tradeHandler = buyerSeat => {
    // give and want are guaranteed by Zoe to match proposalShape
    const { want } = buyerSeat.getProposal();

    sum(bagCounts(want.Items.value)) <= maxItems ||
      Fail`max ${q(maxItems)} items allowed: ${q(want.Items)}`;

    const newItems = itemMint.mintGains(want);
    atomicRearrange(
      zcf,
      harden([
        // price from buyer to proceeds
        [buyerSeat, proceeds, { Price: tradePrice }],
        // new items to buyer
        [newItems, buyerSeat, want],
      ]),
    );

    buyerSeat.exit(true);
    newItems.exit();
    return 'trade complete';
  };
  // #endregion handler

  // #region makeInvitation
  const proposalShape = harden({
    give: { Price: M.gte(tradePrice) },
    want: { Items: { brand: itemBrand, value: M.bag() } },
    exit: M.any(),
  });

  const makeTradeInvitation = () =>
    zcf.makeInvitation(tradeHandler, 'buy items', undefined, proposalShape);

  // Mark the publicFacet Far, i.e. reachable from outside the contract
  const publicFacet = Far('Items Public Facet', {
    makeTradeInvitation,
  });
  // #endregion makeInvitation

  // #region started
  return harden({ publicFacet });
  // #endregion started
};

harden(start);
// #endregion file
