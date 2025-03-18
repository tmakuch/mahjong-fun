// import { Tile } from '../types';
//
// export class Meld2 {
//   public tiles: Tile[];
//   public type: 'pair' | 'pon' | 'kan' | 'chow';
//
//   constructor(tiles: Tile[]) {
//     this.tiles = tiles;
//     switch (tiles.length) {
//       case 2:
//         this.type = 'pair';
//         break;
//       case 3:
//         this.type = this.isSequence() ? 'chow' : 'pon';
//         break;
//       case 4:
//         this.type = 'kan';
//         break;
//       default:
//         throw new Error('Invalid number for tiles in meld');
//     }
//     if (!areSameSuit(tiles) || (meld.type !== 'chow' && !areSameValue(tiles))) {
//       throw new Error(
//         `Provided ${meld.type} does not have tile${meld.type === 'chow' ? ' suits' : 's'} equal`,
//       );
//     }
//   }
//
//   private isSequence() {
//     if (typeof this.tiles[0].value === 'string') {
//       return false;
//     }
//     return this.tiles.every(
//       (tile, idx) => tile.value === (this.tiles[0].value as number) + idx,
//     );
//   }
//   private areSameSuit() {
//     return this.tiles.every((tile) => tile.suit === this.tiles[0].suit);
//   }
//
//   private areSameValue() {
//     return this.tiles.every((tile) => tile.value === this.tiles[0].value);
//   }
// }
