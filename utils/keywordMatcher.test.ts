import { describe, expect, test } from 'vitest';
import { keywordMatcher } from './keywordMatcher';

// TODO:implement cos sim and unskip these tests
describe.skip('keyword matcher', () => {
  test('no match', () => {
    expect(
      keywordMatcher({
        map1: new Map([
          ['hello', 1],
          ['world', 1],
        ]),
        map2: new Map([['somethingClever', 2]]),
      })
    ).toBe(0);
  });

  test('partial match', () => {
    expect(
      keywordMatcher({
        map1: new Map([
          ['hello', 1],
          ['world', 1],
        ]),
        map2: new Map([['hello', 2]]),
      })
    ).toBe(71);
    expect(
      keywordMatcher({
        map1: new Map([
          ['javascript', 2],
          ['typescript', 1],
          ['react', 1],
        ]),
        map2: new Map([
          ['javascript', 1],
          ['vue', 1],
          ['angular', 1],
        ]),
      })
    ).toBe(47);
  });

  test('full match', () => {
    expect(
      keywordMatcher({
        map1: new Map([
          ['hello', 2],
          ['world', 2],
        ]),
        map2: new Map([
          ['hello', 1],
          ['world', 1],
        ]),
      })
    ).toBe(100);
    expect(
      keywordMatcher({
        map1: new Map([
          ['hello', 1],
          ['world', 1],
        ]),
        map2: new Map([
          ['hello', 1],
          ['world', 1],
        ]),
      })
    ).toBe(100);
  });
});
