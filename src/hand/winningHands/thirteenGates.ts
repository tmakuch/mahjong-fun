import { Meld, Tile } from '../index';

export function findThirteenGates(input: Tile[]) {
  return input.map((tile) => new Meld([tile]));
}
