import { DragonTile, Meld, Pair, SuitTile, Tile, WindTile } from './types';

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

export function findAWinningHand(input: Tile[]) {
  const hand = {
    melds: [] as Meld[],
    pair: null as unknown as Pair,
  };

  input = input.sort((a, b) => {
    if (a.suit !== b.suit) {
      return a.suit > b.suit ? -1 : 1;
    }
    return a.value === b.value ? 0 : a.value > b.value ? 1 : -1;
  });

  // we are looking for sequences, triples or pairs
  // if we didn't find anything there's no winning hand since hand is sorted
  while (input.length > 0) {
    const tile = input[0];

    // find sequence (no need to do it for honours)
    if (tile instanceof SuitTile) {
      const nextTileIdx = input.findIndex(findNextTileForSequence(tile, 1));
      const secondNextTileIdx = input.findIndex(
        findNextTileForSequence(tile, 2),
      );

      if (nextTileIdx > -1 && secondNextTileIdx > -1) {
        hand.melds.push({
          0: tile,
          1: input[nextTileIdx],
          2: input[secondNextTileIdx],
          length: 3,
          isSequence: true,
        });

        input.splice(secondNextTileIdx, 1);
        input.splice(nextTileIdx, 1);
        input.splice(0, 1);
        continue;
      }
    }

    // find triple
    const nextTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
    const secondNextTileIdx = input.findIndex(
      findNextTileForDuplicate(tile, nextTileIdx + 1),
    );

    if (nextTileIdx > -1 && secondNextTileIdx > -1) {
      hand.melds.push({
        0: tile,
        1: input[nextTileIdx],
        2: input[secondNextTileIdx],
        length: 3,
        isTriple: true,
      });

      input.splice(secondNextTileIdx, 1);
      input.splice(nextTileIdx, 1);
      input.splice(0, 1);

      continue;
    }

    // find pair if we didn't do it already
    if (!hand.pair) {
      const pairedTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
      if (pairedTileIdx > -1) {
        hand.pair = {
          0: tile,
          1: input[pairedTileIdx],
          length: 2,
        };

        input.splice(pairedTileIdx, 1);
        input.splice(0, 1);

        continue;
      }
    }

    return null;
  }

  return hand;
}

function findNextTileForSequence(forTile: SuitTile, whichNext: 1 | 2) {
  return (t: Tile) =>
    t.value === forTile.value + whichNext &&
    t.suit === forTile.suit &&
    t.isHidden === forTile.isHidden;
}

// pair, pon, kong
function findNextTileForDuplicate(forTile: Tile, skip: number = 1) {
  return (t: Tile, idx: number) =>
    idx >= skip &&
    t.value === forTile.value &&
    t.suit === forTile.suit &&
    t.isHidden === forTile.isHidden;
}
