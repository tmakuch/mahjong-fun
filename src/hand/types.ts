abstract class ATile {
  public value!: number | string;
  public suit!: string;
  public isHidden!: boolean;

  toString() {
    const code =
      (typeof this.value === 'number' ? this.value : this.value[0]) +
      this.suit[0];
    return this.isHidden ? code.toUpperCase() : code;
  }
}

export class SuitTile extends ATile {
  public value: number;
  public suit: 'character' | 'pin' | 'sow';
  public isHidden: boolean;

  constructor(input: string) {
    super();
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

export class DragonTile extends ATile {
  public value: 'white' | 'red' | 'green';
  public suit: 'dragon' = 'dragon';
  public isHidden: boolean;

  constructor(input: string) {
    super();
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

export class WindTile extends ATile {
  public value: 'west' | 'south' | 'east' | 'north';
  public suit: 'wind' = 'wind';
  public isHidden: boolean;

  constructor(input: string) {
    super();
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
      0: Tile;
      1: Tile;
      2: Tile;
      length: 3;
      isSequence: true;
    }
  | {
      0: Tile;
      1: Tile;
      2: Tile;
      length: 3;
      isTriple: true;
    };

export type Pair = {
  0: Tile;
  1: Tile;
  length: 2;
};
