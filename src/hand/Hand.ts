import { ATile, Meld } from './index';
import { findWinningHand } from './winningHands/standard';

type Conditions = {
  /*To*/ isTsumo: boolean;
  /*Ri*/ isRiichi: boolean;
  /*DR*/ isDoubleRiichi: boolean;
  /*Iu*/ isIppatsu: boolean;
  /*Hi*/ isHaitei: boolean; //For haitei/houtei
  /*Rn*/ isRinshan: boolean; //win from dead wall
  /*Cn*/ isChankan: boolean; //Robbing a kan
};

export default class Hand {
  private constructor(
    public melds: Meld[],
    public conditions: Conditions,
  ) {}

  public static findAllWinningSets(
    input: string,
    allowReshuffle: boolean,
  ): Hand[] {
    const singleTileRegex =
      /[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?/g;
    if (
      !/^(?:(?:[1-9][mspMSP]\*?|[rgwRGW][dD]\*?|[eswnESWN][wW]\*?){2,4}:?){5}(?:;|;(?:to|ri|dr|iu|hi|rn|cn)(?::(?:to|ri|dr|iu|hi|rn|cn))*)?$/g.test(
        input,
      )
    ) {
      throw new Error('Invalid hand - could not parse hand');
    }

    const [rawTiles, rawConditions] = input.split(';');
    const conditions = parseConditions(rawConditions);

    if (allowReshuffle) {
      const rawHand = rawTiles.match(singleTileRegex);
      if (!rawHand) {
        throw new Error('Invalid hand - could not parse tiles');
      }
      const hand = rawHand.map(ATile.getTile);

      return [
        findWinningHand(hand, {
          prioritizeTriples: false,
          prioritizePair: false,
          reverseOrder: false,
        }),
        findWinningHand(hand, {
          prioritizeTriples: true,
          prioritizePair: false,
          reverseOrder: false,
        }),
      ]
        .filter((hand) => hand !== null)
        .map((melds) => new Hand(melds, conditions));
    } else {
      const melds: Meld[] = [];

      rawTiles.split(':').forEach((rawMeld) => {
        const rawTiles = rawMeld.match(singleTileRegex);
        if (!rawTiles) {
          throw new Error('Invalid hand - could not parse tiles');
        }
        rawTiles.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));

        melds.push(new Meld(rawTiles.map(ATile.getTile)));
      });

      const countTypes = melds.reduce(
        (result, next: Meld) => {
          result[next.type] = result[next.type] + 1;
          return result;
        },
        {
          chow: 0,
          pon: 0,
          kan: 0,
          pair: 0,
        },
      );

      // TODO better verification for i.e. thriteen gates
      if (
        !(
          (countTypes.pair === 1 &&
            countTypes.chow + countTypes.pon + countTypes.kan === 4) ||
          (countTypes.pair === 7 &&
            countTypes.chow + countTypes.pon + countTypes.kan === 0)
        )
      ) {
        throw new Error('Invalid count of melds in the hand');
      }

      return [new Hand(melds, conditions)];
    }
  }
}

function parseConditions(rawConditions?: string): Hand['conditions'] {
  return {
    isTsumo: !!rawConditions && rawConditions.includes('to'),
    isRiichi: !!rawConditions && rawConditions.includes('ri'),
    isDoubleRiichi: !!rawConditions && rawConditions.includes('dr'),
    isIppatsu: !!rawConditions && rawConditions.includes('iu'),
    isHaitei: !!rawConditions && rawConditions.includes('hi'),
    isRinshan: !!rawConditions && rawConditions.includes('rn'),
    isChankan: !!rawConditions && rawConditions.includes('cn'),
  };
}
