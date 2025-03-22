import { Meld, Tile } from '../index';
import { findAndRemovePair } from '@/hand/winningHands/utils';

export function findSevenPairs(input: Tile[]) {
  const melds: Meld[] = [];

  input = [...input];

  while (input.length > 0) {
    const tile = input[0];

    if (findAndRemovePair(input, melds, tile)) continue;

    return null;
  }

  return melds;
}
