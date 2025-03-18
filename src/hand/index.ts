import { DragonTile, Hand, Meld, SuitTile, Tile, WindTile } from './types';
import { findWinningHand } from './standardWinnings';

const singleTileRegex = /[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?/g;

export function parseHand(input: string, allowReshuffle: boolean) {
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
    const hand = rawHand.map(parseTile);

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

      const tiles = rawTiles.map(parseTile);
      switch (tiles.length) {
        case 2:
          if (!areSameSuit(tiles) || !areSameSuit(tiles)) {
            throw new Error('Provided pair does not have tiles equal');
          }
          result.melds.push({
            tiles: tiles,
            type: 'pair',
          });
          break;
        case 3:
        case 4:
          const meld = {
            tiles,
            type: (tiles.length === 4
              ? 'kan'
              : isSequence(tiles)
                ? 'chow'
                : 'pon') as 'kan' | 'chow' | 'pon',
          };
          if (
            !areSameSuit(tiles) ||
            (meld.type !== 'chow' && !areSameValue(tiles))
          ) {
            throw new Error(
              `Provided ${meld.type} does not have tile${meld.type === 'chow' ? ' suits' : 's'} equal`,
            );
          }
          result.melds.push(meld);
          break;
        default:
          throw new Error('Provided meld has incorrect number for tiles');
      }
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

function areSameSuit(tiles: Tile[]) {
  return tiles.every((tile) => tile.suit === tiles[0].suit);
}

function areSameValue(tiles: Tile[]) {
  return tiles.every((tile) => tile.value === tiles[0].value);
}

function isSequence(tiles: Tile[]) {
  if (typeof tiles[0].value === 'string') {
    return false;
  }
  return tiles.every(
    (tile, idx) => tile.value === (tiles[0].value as number) + idx,
  );
}

function parseTile(tile: string): Tile {
  if (tile[1].toLowerCase() === 'w') {
    return new WindTile(tile);
  }

  if (tile[1].toLowerCase() === 'd') {
    return new DragonTile(tile);
  }

  return new SuitTile(tile);
}
