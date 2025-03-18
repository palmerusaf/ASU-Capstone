import { PublicPath } from 'wxt/browser';
import '@/assets/tailwind.css';
import './App.css';

function App() {
  async function openSPA() {
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html' as PublicPath),
      active: true,
    });
  }

  // Finds and returns the url of the selected job posting as simplified form in user's active (https://asu.joinhandshake.com/stu/postings) window using DOM.
  function saveJob() {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        // Makes call to handshake.content.ts to get job URL.
        browser.tabs
          .sendMessage(activeTab.id, { message: 'Handshake-getJobURL' })
          .then((url) => {
            // Make call to background.ts to get job information.
            browser.runtime
              .sendMessage({
                type: 'Handshake-fetchJobData',
                data: { arg1: url },
              })
              .then((response2) => {
                // TODO: Save job data to database.
              });
          })
          .catch((error) => {
            console.error('Error: ', error);
          });
      }
    });
  }

  return (
    <>
      <h1>Job Sourcerer</h1>
      <div className='card'>
        <button onClick={saveJob}>Save Job</button>
      </div>
      <button onClick={openSPA}>Dashboard</button>
    </>
  );
}

export default App;
