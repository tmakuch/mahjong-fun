import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Hand } from '@/hand';
import { workingHands } from '@data';

const allPossibleConditions: Hand['conditions'] = {
  isTsumo: true,
  isRiichi: true,
  isDoubleRiichi: true,
  isIppatsu: true,
  isHaitei: true,
  isRinshan: true,
  isChankan: true,
};
const codenames = Object.keys(allPossibleConditions).map((key) => {
  const name = key.replace('is', '');
  return (
    Array.from(name.matchAll(/[A-Z]/g))
      .map((_) => _[0])
      .join('') + name[name.length - 1]
  )
    .substring(0, 2)
    .toLowerCase();
});
const exampleHand = workingHands[0].input;

describe('names', () => {
  it('should have no duplicates', () => {
    assert.equal(
      codenames.length,
      Array.from(new Set(codenames)).length,
      'There are duplicates!',
    );
  });
});
describe('parsing', () => {
  it('should allow no delimiter for conditions', () => {
    assert.doesNotThrow(() => {
      const hand = Hand.findAllWinningSets(exampleHand + ';', false);
      assert.deepEqual(hand[0].conditions, {
        isTsumo: false,
        isRiichi: false,
        isDoubleRiichi: false,
        isIppatsu: false,
        isHaitei: false,
        isRinshan: false,
        isChankan: false,
      });
    });
  });
  it('should allow empty conditions', () => {
    assert.doesNotThrow(() => {
      const hand = Hand.findAllWinningSets(exampleHand + ';', false);
      assert.deepEqual(hand[0].conditions, {
        isTsumo: false,
        isRiichi: false,
        isDoubleRiichi: false,
        isIppatsu: false,
        isHaitei: false,
        isRinshan: false,
        isChankan: false,
      });
    });
  });
  it('should allow single condition', () => {
    const hand = Hand.findAllWinningSets(exampleHand + ';to', false);
    assert.deepEqual(hand[0].conditions, {
      isTsumo: true,
      isRiichi: false,
      isDoubleRiichi: false,
      isIppatsu: false,
      isHaitei: false,
      isRinshan: false,
      isChankan: false,
    });
  });
  it('should allow multiple condition', () => {
    const hand = Hand.findAllWinningSets(exampleHand + ';to:dr', false);
    assert.deepEqual(hand[0].conditions, {
      isTsumo: true,
      isRiichi: false,
      isDoubleRiichi: true,
      isIppatsu: false,
      isHaitei: false,
      isRinshan: false,
      isChankan: false,
    });
  });
  it('should not allow conditions without delimeter', () => {
    assert.throws(() => Hand.findAllWinningSets(exampleHand + ';todr', false));
  });
});
