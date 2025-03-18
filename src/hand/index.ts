import { ATile, Hand, Meld } from './types';
import { findWinningHand } from './standardWinnings';

const singleTileRegex = /[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?/g;

export function getHands(input: string, allowReshuffle: boolean) {
  if (
    !/^(?:(?:[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?){2,4}:?){5}$/g.test(
      input,
    )
  ) {
    throw new Error('Invalid hand - could not parse hand');
  }
  if (allowReshuffle) {
    const rawHand = input.match(singleTileRegex);
    if (!rawHand) {
      throw new Error('Invalid hand - could not parse tiles');
    }
    const hand = rawHand.map(ATile.getTile);

    return [findWinningHand(hand, false), findWinningHand(hand, true)].filter(
      (hand) => hand !== null,
    );
  } else {
    const result: Hand = {
      melds: [],
    };

    input.split(':').forEach((rawMeld) => {
      const rawTiles = rawMeld.match(singleTileRegex);
      if (!rawTiles) {
        throw new Error('Invalid hand - could not parse tiles');
      }
      rawTiles.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));

      result.melds.push(new Meld(rawTiles.map(ATile.getTile)));
    });

    const countTypes = result.melds.reduce(
      (result, next: Meld) => {
        result[next.type] = result[next.type] + 1;
        return result;
      },
      {
        chow: 0,
        pon: 0,
        kan: 0,
        pair: 0,
      },
    );

    if (
      !(
        (countTypes.pair === 1 &&
          countTypes.chow + countTypes.pon + countTypes.kan === 4) ||
        (countTypes.pair === 7 &&
          countTypes.chow + countTypes.pon + countTypes.kan === 0)
      )
    ) {
      throw new Error('Invalid count of melds in the hand');
    }

    return [result];
  }
}
