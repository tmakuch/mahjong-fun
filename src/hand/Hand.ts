import { ATile, DragonTile, Meld, SuitTile, WindTile } from './index';
import { findWinningHand } from './winningHands/standard';
import Yaku from '@/yaku/Yaku';
import { findValidYaku } from '@/yaku/yakuFinder';
import { findSevenPairs } from '@/hand/winningHands/sevenPairs';

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
  public yaku: Yaku[];

  private constructor(
    public melds: Meld[],
    public conditions: Conditions,
    private allowReshuffle: boolean,
  ) {
    this.yaku = findValidYaku(this);
  }

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
        findSevenPairs(hand),
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
        findWinningHand(hand, {
          prioritizeTriples: false,
          prioritizePair: true,
          reverseOrder: false,
        }),
        findWinningHand(hand, {
          prioritizeTriples: true,
          prioritizePair: true,
          reverseOrder: false,
        }),
        findWinningHand(hand, {
          prioritizeTriples: false,
          prioritizePair: false,
          reverseOrder: true,
        }),
        findWinningHand(hand, {
          prioritizeTriples: true,
          prioritizePair: false,
          reverseOrder: true,
        }),
        findWinningHand(hand, {
          prioritizeTriples: false,
          prioritizePair: true,
          reverseOrder: true,
        }),
        findWinningHand(hand, {
          prioritizeTriples: true,
          prioritizePair: true,
          reverseOrder: true,
        }),
      ]
        .filter((hand) => hand !== null)
        .map((melds) => new Hand(melds, conditions, allowReshuffle))
        .reduce((result, next) => {
          if (result.every((hand) => hand.toString() !== next.toString())) {
            result.push(next);
          }
          return result;
        }, [] as Hand[]);
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

      return [new Hand(melds, conditions, allowReshuffle)];
    }
  }

  valueOf() {
    return this.toString();
  }

  toString() {
    const melds = [
      ...this.melds.map((meld) => ({
        meld: meld,
        string: meld.tiles
          .map((tile) => tile.toString())
          .toSorted((a: string, b: string) =>
            !this.allowReshuffle || a === b ? 0 : a > b ? 1 : -1,
          )
          .join(','),
      })),
    ]
      .toSorted(
        (
          a: { meld: Meld; string: string },
          b: { meld: Meld; string: string },
        ) => {
          if (!this.allowReshuffle) {
            return 0;
          }
          // pons before pairs, kans are treated like pons
          if (
            Math.min(3, a.meld.tiles.length) !==
            Math.min(3, b.meld.tiles.length)
          ) {
            return a.meld.tiles.length > b.meld.tiles.length ? -1 : 1;
          }
          if (a.meld.tiles[0].constructor !== b.meld.tiles[0].constructor) {
            if (
              a.meld.tiles[0] instanceof SuitTile ||
              (a.meld.tiles[0] instanceof DragonTile &&
                b.meld.tiles[0] instanceof WindTile)
            ) {
              return -1;
            }
            return 1;
          }
          //sort but ignore last tile from comparison
          return a.string.replace('*', '') === b.string.replace('*', '')
            ? 0
            : a.string.replace('*', '') > b.string.replace('*', '')
              ? 1
              : -1;
        },
      )
      .map((e) => `(${e.string})`)
      .join(' ');

    const yaku = this.yaku
      .toSorted((a, b) => {
        if (a.han !== b.han) {
          return a.han > b.han ? -1 : 1;
        }
        return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
      })
      .map((yaku) => `${yaku.occurrences}x ${yaku.name} (${yaku.han} han)`)
      .join(', ');

    return melds + ': ' + yaku;
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
