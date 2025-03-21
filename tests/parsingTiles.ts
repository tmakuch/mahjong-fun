import { describe, it } from 'node:test';
import * as assert from 'node:assert';

import { Hand } from '@/hand';
import { failingsHands, workingHands, winningHands } from './data';
import { findValidYaku } from '@/yaku/yakuFinder';

describe('failing hands', () => {
  describe('tournament counts', () => {
    failingsHands.forEach((testCase) => {
      it(`${testCase} should throw error`, () =>
        assert.throws(() => Hand.findAllWinningSets(testCase, false)));
    });
  });

  describe('leisure counts', () => {
    failingsHands.forEach((testCase) => {
      it(`${testCase} should throw error or return no winnings hands`, () =>
        assert.throws(() => {
          const winningsHands = Hand.findAllWinningSets(testCase, true);

          if (!winningsHands.length) {
            throw new Error('no winnings hands');
          }
        }));
    });
  });
});

describe('winnings hands', () => {
  describe('tournament counts', () => {
    workingHands.forEach((testCase) => {
      const test = (input: string) =>
        Hand.findAllWinningSets(input, false).map((hand) => hand.toString());
      it(`${testCase.input} should parse`, () => {
        assert.deepEqual(test(testCase.input), testCase.expected.tournament);
      });
    });
  });
  describe('leisure counts', () => {
    workingHands.forEach((testCase) => {
      const test = (input: string) =>
        Hand.findAllWinningSets(input, true).map((hand) => hand.toString());
      it(`${testCase.input} should parse`, () => {
        assert.deepEqual(test(testCase.input), testCase.expected.leisure);
      });
    });
  });
});

describe('counting hand value', () => {
  winningHands.forEach((testCase) => {
    const test = (input: string) =>
      Hand.findAllWinningSets(input, false).map(findValidYaku);
    it(`${testCase.input} should return correct yaku list`, () => {
      assert.deepEqual(test(testCase.input), testCase.expected.yaku);
    });
  });
});
