export class SuitTile {
  public value: number;
  public suit: 'character' | 'pin' | 'sow';
  public isHidden: boolean;

  constructor(input: string) {
    this.value = +input[0];
    this.suit =
      input[1].toLowerCase() === 'c'
        ? 'character'
        : input[1].toLowerCase() === 'p'
          ? 'pin'
          : 'sow';
    this.isHidden = input[1].toLowerCase() !== input[1];
  }
}

export class DragonTile {
  public value: 'white' | 'red' | 'green';
  public suit: 'dragon' = 'dragon';
  public isHidden: boolean;

  constructor(input: string) {
    switch (input[0].toLowerCase()) {
      case 'w':
        this.value = 'white';
        break;
      case 'r':
        this.value = 'red';
        break;
      case 'g':
        this.value = 'green';
        break;
      default:
        throw new Error('Invalid hand');
    }

    this.isHidden = input[1].toLowerCase() !== input[1];
  }
}

export class WindTile {
  public value: 'west' | 'south' | 'east' | 'north';
  public suit: 'wind' = 'wind';
  public isHidden: boolean;

  constructor(input: string) {
    switch (input[0].toLowerCase()) {
      case 'w':
        this.value = 'west';
        break;
      case 's':
        this.value = 'south';
        break;
      case 'e':
        this.value = 'east';
        break;
      case 'n':
        this.value = 'north';
        break;
      default:
        throw new Error('Invalid hand - unrecognized wind');
    }

    this.isHidden = input[1].toLowerCase() !== input[1];
  }
}

export type HonourTile = DragonTile | WindTile;
export type Tile = SuitTile | HonourTile;

export type Meld =
  | {
      0: Tile[];
      1: Tile[];
      2: Tile[];
      isSequence: true;
    }
  | {
      0: Tile[];
      1: Tile[];
      2: Tile[];
      isTriple: true;
    };

export type Pair = {
  0: Tile[];
  1: Tile[];
};

export function splitHand(input: string): Tile[] {
  const rawHand = input.match(/\d[cspCSP]/g);
  if (!rawHand) {
    throw new Error('Invalid hand');
  }
  return rawHand
    .map((tile) => {
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
    })
    .sort((a, b) => (a.value === b.value ? 0 : a.value >= b.value ? 1 : -1));
}
