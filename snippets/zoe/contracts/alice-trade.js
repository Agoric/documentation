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
  const { issuers, brands, joinPrice } = terms;
  // #endregion queryInstance

  // #region makeProposal
  const choices = ['Park Place', 'Boardwalk'];
  const choiceBag = makeCopyBag(choices.map(name => [name, 1n]));
  const proposal = {
    give: { Price: joinPrice },
    want: { Places: AmountMath.make(brands.Place, choiceBag) },
  };
  const Price = await E(purse).withdraw(joinPrice);
  t.log('Alice gives', proposal.give);
  // #endregion makeProposal

  // #region trade
  const toJoin = E(publicFacet).makeJoinInvitation();

  const seat = E(zoe).offer(toJoin, proposal, { Price });
  const places = await E(seat).getPayout('Places');
  // #endregion trade

  // #region payouts
  const actual = await E(issuers.Place).getAmountOf(places);
  t.log('Alice payout brand', actual.brand);
  t.log('Alice payout value', actual.value);
  t.deepEqual(actual, proposal.want.Places);
  // #endregion payouts
};
