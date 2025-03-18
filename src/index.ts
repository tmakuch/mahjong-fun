import { splitHand } from './hand';

const input = '2c3c4c2c3c4c2c3c4c6C6C6C7C7C';

const hand = splitHand(input);
console.log(JSON.stringify(hand, null, 2));
