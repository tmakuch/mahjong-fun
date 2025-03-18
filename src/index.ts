import { getHands } from './hand';
import { isMenzenTsumo } from './yaku/yakuDefinitions';

const notTsumo = '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M';
const tsumo = '2M3M4M:2M3M4M:2M3M4M*:6M6M6M:7M7M';

const hands = [
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '4m3m2m:2m3m4m:2m4m3m*:6M6M6M:7M7M',
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M9M',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwnw',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwew',
  'errors from here on now',
  '2m3m4m:2m3m4m:2m3m4m:6M6M6M:XYZA*',
  '1m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2s3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2m3m4m5m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m3m3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
];

console.table(
  hands.map((hand) => {
    let tournament: string[] | string;
    let leisure: string[] | string;
    try {
      tournament = getHands(hand, false).map(stringifyWinningHand);
    } catch (e) {
      tournament = (e as Error).message ?? e;
    }
    try {
      leisure = getHands(hand, true).map(stringifyWinningHand);
    } catch (e) {
      leisure = (e as Error).message ?? e;
    }
    return {
      hand,
      'tournament count': tournament,
      'leisure count': leisure,
    };
  }),
);

function stringifyWinningHand(hand: ReturnType<typeof getHands>[0]) {
  return [...hand.melds.map((meld) => meld.tiles.join(','))]
    .map((e) => `(${e})`)
    .join(' ');
}
