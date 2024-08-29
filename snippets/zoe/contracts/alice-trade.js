/**
 * @file Test using bundleSource() on the contract.
 *
 * TODO: how to sync with agoric-labs/dapp-game-places?
 */
// @ts-check
import { E } from '@endo/far';
import { makeCopyBag } from '@endo/patterns';
import { AmountMath } from '@agoric/ertp';

/**
 * Alice joins the game by paying the price from the contract's terms.
 *
 * @param {import('ava').ExecutionContext} t
 * @param {ZoeService} zoe
 * @param {ERef<import('@agoric/zoe/src/zoeService/utils').Instance<GameContractFn>>} instance
 * @param {Purse} purse
 */
export const alice = async (t, zoe, instance, purse) => {
  // #region queryInstance
  const publicFacet = E(zoe).getPublicFacet(instance);
  const terms = await E(zoe).getTerms(instance);
  const { issuers, brands, tradePrice } = terms;
  // #endregion queryInstance

  // #region makeProposal
  const choices = ['map', 'scroll'];
  const choiceBag = makeCopyBag(choices.map(name => [name, 1n]));
  const proposal = {
    give: { Price: tradePrice },
    want: { Places: AmountMath.make(brands.Item, choiceBag) },
  };
  const Price = await E(purse).withdraw(tradePrice);
  t.log('Alice gives', proposal.give);
  // #endregion makeProposal

  // #region trade
  const toJoin = E(publicFacet).makeTradeInvitation();

  const seat = E(zoe).offer(toJoin, proposal, { Price });
  const items = await E(seat).getPayout('Items');
  // #endregion trade

  // #region payouts
  const actual = await E(issuers.Item).getAmountOf(items);
  t.log('Alice payout brand', actual.brand);
  t.log('Alice payout value', actual.value);
  t.deepEqual(actual, proposal.want.Items);
  // #endregion payouts
};
