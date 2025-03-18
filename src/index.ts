import { findAWinningHand, splitHand } from './hand';

const hands = [
  '2c3c4c2c3c4c2c3c4c6C6C6C7C7C',
  '2c3c4c2c3c4c2c3c4c6C6C6C7C9C',
  'rdrdrdwdwdwdgdgdgdswswswnwnw',
  'rdrdrdwdwdwdgdgdgdswswswnwew',
  'this and next will throw',
  '2c3c4c2c3c4c2c3c4c6C6C6CXYZA',
];

hands.forEach((hand) => {
  try {
    const aWinningHand = findAWinningHand(splitHand(hand));
    console.log(`${hand}: ${stringifyWinningHand(aWinningHand)}`);
  } catch (e) {
    console.error(`${hand}: ${e}`);
  }
});

function stringifyWinningHand(hand: ReturnType<typeof findAWinningHand>) {
  if (!hand) {
    return 'nope';
  }
  return [
    ...hand.melds.map((meld) => Array.from(meld).join(',')),
    Array.from(hand.pair).join(','),
  ]
    .map((e) => `(${e})`)
    .join(' ');
}
