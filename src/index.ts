import { findWinningHands, splitHand } from './hand';

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
    const winningHands = findWinningHands(splitHand(hand));
    console.log(
      `${hand}:\n\t${!winningHands.length ? 'nope' : winningHands.map(stringifyWinningHand).join('\n\t')}`,
    );
  } catch (e) {
    console.error(`${hand}: \t${e}`);
  }
});

function stringifyWinningHand(hand: ReturnType<typeof findWinningHands>[0]) {
  return [
    ...hand.melds.map((meld) => Array.from(meld).join(',')),
    Array.from(hand.pair).join(','),
  ]
    .map((e) => `(${e})`)
    .join(' ');
}
