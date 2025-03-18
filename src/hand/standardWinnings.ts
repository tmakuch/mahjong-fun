import { Meld, Pair, SuitTile, Tile } from './types';

type UnfinishedHand = {
  melds: Meld[];
  pair: Pair | null;
};

export function findWinningHand(input: Tile[], prioritizeTriples: boolean) {
  const hand: UnfinishedHand = { melds: [], pair: null };
  input = [...input].sort((a, b) => {
    if (a.suit !== b.suit) {
      return a.suit > b.suit ? -1 : 1;
    }
    return a.value === b.value ? 0 : a.value > b.value ? 1 : -1;
  });

  while (input.length > 0) {
    const tile = input[0];

    if (prioritizeTriples) {
      if (findAndRemoveTriple(input, hand, tile)) continue;
      if (tile instanceof SuitTile && findAndRemoveSequence(input, hand, tile))
        continue;
    } else {
      if (tile instanceof SuitTile && findAndRemoveSequence(input, hand, tile))
        continue;
      if (findAndRemoveTriple(input, hand, tile)) continue;
    }

    if (!hand.pair && findAndRemovePair(input, hand, tile)) continue;

    return null;
  }

  return hand as {
    melds: Meld[];
    pair: Pair;
  };
}

function findAndRemoveTriple(input: Tile[], hand: UnfinishedHand, tile: Tile) {
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
    removeTiles(input, [secondNextTileIdx, nextTileIdx, 0]);
    return true;
  }
  return false;
}

function findAndRemoveSequence(
  input: Tile[],
  hand: UnfinishedHand,
  tile: SuitTile,
) {
  const nextTileIdx = input.findIndex(findNextTileForSequence(tile, 1));
  const secondNextTileIdx = input.findIndex(findNextTileForSequence(tile, 2));

  if (nextTileIdx > -1 && secondNextTileIdx > -1) {
    hand.melds.push({
      0: tile,
      1: input[nextTileIdx],
      2: input[secondNextTileIdx],
      length: 3,
      isSequence: true,
    });
    removeTiles(input, [secondNextTileIdx, nextTileIdx, 0]);
    return true;
  }
  return false;
}

function findAndRemovePair(input: Tile[], hand: UnfinishedHand, tile: Tile) {
  const pairedTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
  if (pairedTileIdx > -1) {
    hand.pair = { 0: tile, 1: input[pairedTileIdx], length: 2 };
    removeTiles(input, [pairedTileIdx, 0]);
    return true;
  }
  return false;
}

function removeTiles(input: Tile[], indices: number[]) {
  indices.sort((a, b) => b - a).forEach((idx) => input.splice(idx, 1));
}

function findNextTileForSequence(forTile: SuitTile, whichNext: 1 | 2) {
  return (t: Tile) =>
    t.value === forTile.value + whichNext &&
    t.suit === forTile.suit &&
    t.isHidden === forTile.isHidden;
}

function findNextTileForDuplicate(forTile: Tile, skip: number = 1) {
  return (t: Tile, idx: number) =>
    idx >= skip &&
    t.value === forTile.value &&
    t.suit === forTile.suit &&
    t.isHidden === forTile.isHidden;
}
