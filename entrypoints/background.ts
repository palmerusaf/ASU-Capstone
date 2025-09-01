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
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'Handshake-fetchJobData') {
      console.log('Handshake-fetchJobData called');
    }
  });
});
