import { Hand } from '@/hand/types';
import * as yakuDefinitions from './yakuDefinitions';
import Yaku from './Yaku';

export function findValidYaku(hand: Hand) {
  const validYakuList: Yaku[] = [];

  for (const [functionName, yakuFunction] of Object.entries(yakuDefinitions)) {
    const yaku: Yaku | null = yakuFunction(hand);
    if (yaku === null) {
      console.log(`No yaku found for ${functionName}`);
      continue;
    }
    validYakuList.push(yaku);
  }

  return validYakuList;
}
