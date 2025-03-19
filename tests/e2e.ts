import { describe, it } from 'node:test';
import * as assert from 'node:assert';

import { getHands } from '@/hand';
import { failingsHands, winningHands, workingHands } from './data';
import { stringifyWinningHand } from './utils';
import { findValidYaku } from '@/yaku/yakuFinder';

describe('tests', () => {
  describe('failing hands', () => {
    describe('tournament counts', () => {
      failingsHands.forEach((testCase) => {
        it(`${testCase} should throw error`, () =>
          assert.throws(() => getHands(testCase, false)));
      });
    });

    describe('leisure counts', () => {
      failingsHands.forEach((testCase) => {
        it(`${testCase} should throw error or return no winnings hands`, () =>
          assert.throws(() => {
            const winningsHands = getHands(testCase, true);

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
          getHands(input, false).map(stringifyWinningHand);
        it(`${testCase.input} should parse`, () => {
          assert.deepEqual(test(testCase.input), testCase.expected.tournament);
        });
      });
    });
    describe('leisure counts', () => {
      workingHands.forEach((testCase) => {
        const test = (input: string) =>
          getHands(input, true).map(stringifyWinningHand);
        it(`${testCase.input} should parse`, () => {
          assert.deepEqual(test(testCase.input), testCase.expected.leisure);
        });
      });
    });
  });

  describe('counting hand value', () => {
    winningHands.forEach((testCase) => {
      const test = (input: string) => getHands(input, false).map(findValidYaku);
      it(`${testCase.input} should return correct yaku list`, () => {
        assert.deepEqual(test(testCase.input), testCase.expected.yaku);
      });
    });
  });
});
