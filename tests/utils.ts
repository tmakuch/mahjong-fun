import type { Hand } from '@/hand/types';

export function stringifyWinningHand(hand: Hand) {
  return [...hand.melds.map((meld) => meld.tiles.join(','))]
    .map((e) => `(${e})`)
    .join(' ');
}
