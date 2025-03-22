import { Meld, SuitTile, Tile } from '../index';
import {
  findAndRemovePair,
  findAndRemoveSequence,
  findAndRemoveTriple,
} from '@/hand/winningHands/utils';

export function findWinningHand(
  input: Tile[],
  options: {
    prioritizeTriples: boolean;
    prioritizePair: boolean;
    reverseOrder: boolean;
  },
) {
  const melds: Meld[] = [];
  input = input.toSorted((a, b) => {
    if (a.suit !== b.suit) {
      return a.suit > b.suit ? -1 : 1;
    }
    return (
      (a.value === b.value ? 0 : a.value > b.value ? 1 : -1) *
      (options.reverseOrder ? -1 : 1)
    );
  });

  while (input.length > 0) {
    const tile = input[0];

    if (
      options.prioritizePair &&
      !melds.some((meld) => meld.type === 'pair') &&
      findAndRemovePair(input, melds, tile)
    )
      continue;

    if (options.prioritizeTriples) {
      if (findAndRemoveTriple(input, melds, tile)) continue;
      if (tile instanceof SuitTile && findAndRemoveSequence(input, melds, tile))
        continue;
    } else {
      if (tile instanceof SuitTile && findAndRemoveSequence(input, melds, tile))
        continue;
      if (findAndRemoveTriple(input, melds, tile)) continue;
    }

    if (
      !options.prioritizePair &&
      !melds.some((meld) => meld.type === 'pair') &&
      findAndRemovePair(input, melds, tile)
    )
      continue;

    return null;
  }

  return melds;
}
