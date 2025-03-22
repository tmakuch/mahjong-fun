import { Meld, SuitTile, Tile } from '@/hand';

export function findAndRemoveTriple(input: Tile[], melds: Meld[], tile: Tile) {
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

export function findAndRemoveSequence(
  input: Tile[],
  melds: Meld[],
  tile: SuitTile,
) {
  const nextTileIdx = input.findIndex(findNextTileForSequence(tile, 1));
  const secondNextTileIdx = input.findIndex(findNextTileForSequence(tile, 2));

  if (nextTileIdx > -1 && secondNextTileIdx > -1) {
    melds.push(new Meld([tile, input[nextTileIdx], input[secondNextTileIdx]]));
    removeTiles(input, [secondNextTileIdx, nextTileIdx, 0]);
    return true;
  }
  return false;
}

export function findAndRemovePair(input: Tile[], melds: Meld[], tile: Tile) {
  const pairedTileIdx = input.findIndex(findNextTileForDuplicate(tile, 1));
  if (pairedTileIdx > -1) {
    melds.push(new Meld([tile, input[pairedTileIdx]]));
    removeTiles(input, [pairedTileIdx, 0]);
    return true;
  }
  return false;
}

export function removeTiles(input: Tile[], indices: number[]) {
  indices.sort((a, b) => b - a).forEach((idx) => input.splice(idx, 1));
}

export function findNextTileForSequence(forTile: SuitTile, whichNext: 1 | 2) {
  return (t: Tile) =>
    t.value === forTile.value + whichNext &&
    t.suit === forTile.suit &&
    t.isConcealed === forTile.isConcealed;
}

export function findNextTileForDuplicate(forTile: Tile, skip: number = 1) {
  return (t: Tile, idx: number) =>
    idx >= skip &&
    t.value === forTile.value &&
    t.suit === forTile.suit &&
    t.isConcealed === forTile.isConcealed;
}
