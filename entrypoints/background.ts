import { HandshakeJobDataType } from '@/utils/db/schema';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') return;

    // Open a tab on install
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html'),
      active: true,
    });
  });

  // Send Handshake request to fetch data
  browser.runtime.onMessage.addListener(async function test(
    message,
  ) {
    if (message.type === 'Handshake-fetchJobData') {
      const mainUrl = message.data.arg1.response;
      const url = `${message.data.arg1.response}/search_preview`;
      const res = await fetch(
        // "https://asu.joinhandshake.com/stu/jobs/9694302/search_preview"
        url,
        {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            priority: 'u=1, i',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
          },
          referrer: 'https://asu.joinhandshake.com/stu/postings',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        }
      );
      // Get json from Handshake and parse data.
      const jobJson = await res.json();
      const jobData = parseJobJson(jobJson, mainUrl);

      // Get already saved jobs.
      const savedJobs =
        (await storage.getItem<HandshakeJobDataType[]>(
          'local:handshakeJobs'
        )) ?? [];

      // Check if job is already stored in storage.
      const isDuplicate = savedJobs.some(
        (job) => job.postingId === jobData.postingId
      );

      if (!isDuplicate) {
        // Append new job to saved jobs and save.
        await storage.setItem('local:handshakeJobs', [...savedJobs, jobData]);
      }

      console.log(jobData);

      return { status: 'Job Saved!' };
    }
  });
});

function parseJobJson(jobJson: any, url: string): HandshakeJobDataType {
  const job = jobJson.job;

  let usefulJobData: HandshakeJobDataType = {
    // Posting
    postingId: job.id,
    postingUrl: url,
    externalApplyUrl: job.job_apply_setting?.external_url || null,

    // Job
    jobType: job.job_type?.name || '',
    employmentType: job.employment_type?.name || '',
    title: job?.title || '',
    description: job?.description || '',

    // Company
    company: job.employer?.name || '',
    companyWebsite: job.employer?.website || '',
    companyLogoUrl: job.employer?.logo_url || '',

    // Pay
    payRate: job.pay_rate || '',
    currency: job.currency || null,

    // Location
    city: job.locations?.[0]?.city || null,
    country: job.locations?.[0]?.country || null,

    // Status
    status: 'recently added'
  };

  return usefulJobData;
}
