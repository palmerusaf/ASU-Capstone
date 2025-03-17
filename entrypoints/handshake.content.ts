// Finds and returns the selected job posting url in users active (https://asu.joinhandshake.com/stu/postings) window.
export default defineContentScript({
  matches: ['*://*.joinhandshake.com/*'],
  main() {
    browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        if (request.message === 'Handshake-getJobURL') {
          // Extract job posting URL
          const jobPostingURL = document.querySelector(
            'a[href*="/stu/jobs/"][href*="?ref=preview"]'
          ) as HTMLAnchorElement;
          if (jobPostingURL) {
            // Trim URL to "https://asu.joinhandshake.com/stu/jobs/{JOBId}" format.
            const URLString = jobPostingURL.href;
            var baseUrl = URLString.split('?')[0];
            sendResponse({ response: baseUrl });
          } else {
            throw new Error('Job Posting Code not found.');
          }
        }
      }
    );
  },
});
