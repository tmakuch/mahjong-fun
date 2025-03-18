import { DragonTile, SuitTile, Tile, WindTile } from './types';
import { findWinningHand } from './standardWinnings';

export function splitHand(input: string): Tile[] {
  if (!/^(?:[1-9][cspCSP]|[rgwRGW][dD]|[eswnESWN][wW]){14,18}$/g.test(input)) {
    throw new Error('Invalid hand');
  }
  const rawHand = input.match(/[1-9][cspCSP]|[rgwRGW][dD]|[eswnESWN][wW]/g);
  if (!rawHand) {
    throw new Error('Invalid hand');
  }
  return rawHand.map((tile) => {
    if (!'cpswd'.includes(tile[1].toLowerCase())) {
      throw new Error('Invalid hand.');
    }

    if (tile[1].toLowerCase() === 'w') {
      return new WindTile(tile);
    }

    if (tile[1].toLowerCase() === 'd') {
      return new DragonTile(tile);
    }

    return new SuitTile(tile);
  });
}

export function findWinningHands(input: Tile[]) {
  return [findWinningHand(input, false), findWinningHand(input, true)].filter(
    (hand) => hand !== null,
  );
}
