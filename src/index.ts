import { parseHand } from './hand';

const hands = [
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M9M',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwnw',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwew',
  'this and next will throw',
  '2m3m4m:2m3m4m:2m3m4m:6M6M6M:XYZA*',
];

console.table(
  hands.map((hand) => {
    let tournament: string[] | string;
    let leisure: string[] | string;
    try {
      tournament = parseHand(hand, false).map(stringifyWinningHand);
    } catch (e) {
      tournament = (e as Error).message ?? e;
    }
    try {
      leisure = parseHand(hand, true).map(stringifyWinningHand);
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

function stringifyWinningHand(hand: ReturnType<typeof parseHand>[0]) {
  return [
    ...hand.melds.map((meld) => Array.from(meld).join(',')),
    Array.from(hand.pair).join(','),
  ]
    .map((e) => `(${e})`)
    .join(' ');
}
