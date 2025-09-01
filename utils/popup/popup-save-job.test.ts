import { getJobId } from './popup-utils.ts';
import { describe, expect, test } from 'vitest';

describe('getJobId Tests', () => {
  test('returns null when job id not in url', () => {
    expect(
      getJobId('https://app.joinhandshake.com/inbox?filter=all')
    ).toBeNull();
  });
  test('returns job id when job id in url', () => {
    expect(
      getJobId(
        'https://app.joinhandshake.com/job-search/10119675?page=1&per_page=25'
      )
    ).toBe(10119675);
    expect(
      getJobId(
        'https://app.joinhandshake.com/job-search/9966672?page=1&per_page=25'
      )
    ).toBe(9966672);
    expect(
      getJobId(
        'https://app.joinhandshake.com/jobs/10119675?searchId=f5b81e40-03c4-4062-940d-ff23ea45e145'
      )
    ).toBe(10119675);
  });
  test("returns null when a number other than a job id is in url aka doesn't return false positives", () => {
    // https://app.joinhandshake.com/stu/events/1428880
    expect(
      getJobId('https://app.joinhandshake.com/stu/events/1428880')
    ).toBeNull();
    expect(
      getJobId(
        'https://app.joinhandshake.com/stu/career_fairs/60565/jobs?page=1&per_page=12'
      )
    ).toBeNull();
  });
});
