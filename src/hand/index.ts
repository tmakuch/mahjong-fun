import { DragonTile, SuitTile, WindTile } from './types';
import { findWinningHand } from './standardWinnings';

export function parseHand(input: string, allowReshuffle: boolean) {
  if (
    !/^(?:(?:[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?){2,4}:?){5}$/g.test(
      input,
    )
  ) {
    throw new Error('Invalid hand - could not parse hand');
  }
  if (allowReshuffle) {
    const rawHand = input.match(
      /[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?/g,
    );
    if (!rawHand) {
      throw new Error('Invalid hand - could not parse tiles');
    }
    const hand = rawHand.map((tile) => {
      if (tile[1].toLowerCase() === 'w') {
        return new WindTile(tile);
      }

      if (tile[1].toLowerCase() === 'd') {
        return new DragonTile(tile);
      }

      return new SuitTile(tile);
    });

    return [findWinningHand(hand, false), findWinningHand(hand, true)].filter(
      (hand) => hand !== null,
    );
  } else {
    return [];
  }
}
