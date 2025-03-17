export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') return;

    // Open a tab on install
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html'),
      active: true,
    });
  });

  browser.runtime.onMessage.addListener(
    async function test(message, sender, sendResponse) {
      if (message.type === 'Handshake-fetchJobData') {
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
        const json = await res.json();
        console.log(json);
        return { status: 'Job Saved!' };
      }
    }
  );
});
