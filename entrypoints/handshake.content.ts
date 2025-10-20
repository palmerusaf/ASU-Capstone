import { insertTrackedIcon } from '@/utils/insertTrackedIcon';
import { observeUrlChanges } from '@/utils/observeUrlChanges';
import { getJobId } from '@/utils/popup/popup-utils';

// Finds and returns the selected job posting url in users active (https://asu.joinhandshake.com/stu/postings) window.
export default defineContentScript({
  matches: ['*://*.joinhandshake.com/*'],
  main() {
    browser.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.message === 'Handshake-getJobId') {
        sendResponse(getJobId(location.href));
      }
      if (request.message === 'Handshake-getToken') {
        const token = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute('content');
        sendResponse(token);
      }
    });

    observeUrlChanges(async () => {
      const jobId = getJobId(location.href);
      if (!jobId) return;

      console.log('Found job ID:', jobId);

      const res = await browser.runtime.sendMessage({
        type: 'check_job_exists',
        jobId,
      });

      if (res?.tracked) {
        insertTrackedIcon(jobId);
      } else {
        removeTrackedIcon();
      }
    });
  },
});
