import { getJobId } from '@/utils/popup/popup-utils';

// Finds and returns the selected job posting url in users active (https://asu.joinhandshake.com/stu/postings) window.
export default defineContentScript({
  matches: ['*://*.joinhandshake.com/*'],
  main() {
    browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        if (request.message === 'Handshake-getJobId') {
          console.log('Handshake-getJobId called');
          getJobId(location.href);
        }
      }
    );
  },
});
