abstract class ATile {
  public value!: number | string;
  public suit!: string;
  public isHidden: boolean;
  public isLastTile: boolean;

  constructor(input: string) {
    this.isHidden = input[1].toLowerCase() !== input[1];
    this.isLastTile = input[2] === '*';
  }

  toString() {
    const code =
      (typeof this.value === 'number' ? this.value : this.value[0]) +
      this.suit[0];
    return this.isHidden ? code.toUpperCase() : code;
  }
}

export class SuitTile extends ATile {
  public value: number;
  public suit: 'man' | 'pin' | 'sou';

  constructor(input: string) {
    super(input);
    this.value = +input[0];
    this.suit =
      input[1].toLowerCase() === 'm'
        ? 'man'
        : input[1].toLowerCase() === 'p'
          ? 'pin'
          : 'sou';
  }
}

export class DragonTile extends ATile {
  public value: 'white' | 'red' | 'green';
  public suit: 'dragon' = 'dragon';

  constructor(input: string) {
    super(input);
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
  }
}

export class WindTile extends ATile {
  public value: 'west' | 'south' | 'east' | 'north';
  public suit: 'wind' = 'wind';

  constructor(input: string) {
    super(input);
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
  }
}

export type HonourTile = DragonTile | WindTile;
export type Tile = SuitTile | HonourTile;

export type Meld = {
  tiles: Tile[];
  type: 'pair' | 'pon' | 'kan' | 'chow';
};
