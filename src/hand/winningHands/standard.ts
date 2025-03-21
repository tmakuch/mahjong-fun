import { Meld, SuitTile, Tile } from '../index';

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

function findAndRemoveTriple(input: Tile[], melds: Meld[], tile: Tile) {
  const nextTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
  const secondNextTileIdx = input.findIndex(
    findNextTileForDuplicate(tile, nextTileIdx + 1),
  );

  if (nextTileIdx > -1 && secondNextTileIdx > -1) {
    melds.push(new Meld([tile, input[nextTileIdx], input[secondNextTileIdx]]));
    removeTiles(input, [secondNextTileIdx, nextTileIdx, 0]);
    return true;
  }
  return false;
}

function findAndRemoveSequence(input: Tile[], melds: Meld[], tile: SuitTile) {
  const nextTileIdx = input.findIndex(findNextTileForSequence(tile, 1));
  const secondNextTileIdx = input.findIndex(findNextTileForSequence(tile, 2));

  if (nextTileIdx > -1 && secondNextTileIdx > -1) {
    melds.push(new Meld([tile, input[nextTileIdx], input[secondNextTileIdx]]));
    removeTiles(input, [secondNextTileIdx, nextTileIdx, 0]);
    return true;
  }
  return false;
}

function findAndRemovePair(input: Tile[], melds: Meld[], tile: Tile) {
  const pairedTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
  if (pairedTileIdx > -1) {
    melds.push(new Meld([tile, input[pairedTileIdx]]));
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
