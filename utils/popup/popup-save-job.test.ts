import { getJobId, parseFetchedJob } from './popup-utils.ts';
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

export const remoteData = {
  id: '10119675',
  title: 'Salesforce Developer',
  description:
    '<p>Salesforce Developer</p><p>More details&nbsp;</p><p>https://jobs.gusto.com/postings/cinnovx-salesforce-developer-6e4c6c31-3872-4569-ad7c-fe4acb919e8c</p>',
  createdAt: '2025-08-07T02:48:31+07:00',
  expirationDate: '2026-02-06T21:00:00+07:00',
  employer: {
    id: '1035748',
    name: 'Cinnovx',
    logo: null,
  },
  locations: [],
  salaryRange: {
    min: 8500000,
    max: 9500000,
    currency: 'USD',
  },
  jobType: {
    id: '9',
    name: 'Job',
  },
  employmentType: {
    id: '1',
    name: 'Full-Time',
  },
  workStudy: false,
  remote: true,
};
export const onsiteData = {
  id: '10153029',
  title: 'Software Test Engineer',
  description: "Short description cause ain't nobody got time for dat",
  createdAt: '2025-08-16T06:29:30+07:00',
  expirationDate: '2026-02-15T21:00:00+07:00',
  employer: {
    id: '1030152',
    name: 'Oros Gaming',
    logo: {
      url: 'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/1030152/original/hs-emp-logo-OrosLogoOnBlack.png?1744812764',
    },
  },
  locations: [
    {
      id: '157894196',
      name: 'Reno, Nevada, United States of America',
      city: 'Reno',
      state: 'Nevada',
      country: 'United States',
      latitude: 39.526121,
      longitude: -119.812658,
    },
  ],
  salaryRange: {
    min: 4600000,
    max: 6900000,
    currency: 'USD',
  },
  jobType: {
    id: '9',
    name: 'Job',
  },
  employmentType: {
    id: '1',
    name: 'Full-Time',
  },
  workStudy: false,
  remote: false,
};
describe('parse handshake fetch', () => {
  test('parses remote data', () => {
    const pd = parseFetchedJob(remoteData);
    expect(pd).not.toBeNull();
    if (pd === null) return;
    const {
      closeOutDate,
      companyLogoUrl,
      companyName,
      datePosted,
      description,
      employmentType,
      intern,
      jobId,
      link,
      location,
      remote,
      payrate,
      title,
    } = pd;

    expect(closeOutDate).toStrictEqual(new Date(remoteData.expirationDate));
    expect(companyLogoUrl).toBe(remoteData.employer.logo);
    expect(companyName).toBe(remoteData.employer.name);
    expect(datePosted).toStrictEqual(new Date(remoteData.createdAt));
    expect(description).toBe(remoteData.description);
    expect(employmentType).toBe(remoteData.employmentType.name);
    expect(intern).toBe(false);
    expect(jobId).toBe(remoteData.id);
    expect(link).toBe(`https://app.joinhandshake.com/jobs/${remoteData.id}`);
    expect(location).toBe('remote');
    expect(remote).toBe(remoteData.remote);
    expect(title).toBe(remoteData.title);
    const testRate = Math.floor(
      (remoteData.salaryRange.max + remoteData.salaryRange.min) / 2
    );
    expect(payrate).toBe(testRate);
  });

  test('parses onsite data', () => {
    const pd = parseFetchedJob(onsiteData);
    expect(pd).not.toBeNull();
    if (pd === null) return;

    const {
      closeOutDate,
      companyLogoUrl,
      companyName,
      datePosted,
      description,
      employmentType,
      intern,
      jobId,
      link,
      location,
      remote,
      payrate,
      title,
    } = pd;

    expect(closeOutDate).toStrictEqual(new Date(onsiteData.expirationDate));
    expect(companyLogoUrl).toBe(onsiteData.employer.logo.url);
    expect(companyName).toBe(onsiteData.employer.name);
    expect(datePosted).toStrictEqual(new Date(onsiteData.createdAt));
    expect(description).toBe(onsiteData.description);
    expect(employmentType).toBe(onsiteData.employmentType.name);
    expect(intern).toBe(false);
    expect(jobId).toBe(onsiteData.id);
    expect(link).toBe(`https://app.joinhandshake.com/jobs/${onsiteData.id}`);
    expect(location).toBe(onsiteData.locations[0].name);
    expect(remote).toBe(onsiteData.remote);
    expect(title).toBe(onsiteData.title);
    const testRate = Math.floor(
      (onsiteData.salaryRange.max + onsiteData.salaryRange.min) / 2
    );
    expect(payrate).toBe(testRate);
  });

  test('invalid data returns null', () => {
    expect(parseFetchedJob({})).toBeNull();
    expect(parseFetchedJob('')).toBeNull();
    expect(parseFetchedJob(1)).toBeNull();
    expect(parseFetchedJob(1.4)).toBeNull();
  });
});
