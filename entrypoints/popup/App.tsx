import '@/assets/tailwind.css';
import { useState } from 'react';
import { PublicPath } from 'wxt/browser';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  async function openSPA() {
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html' as PublicPath),
      active: true,
    });
  }

  // Finds and saves selected job posting in user's active (https://asu.joinhandshake.com/stu/postings) window.
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
                if (response2?.status) {
                  setStatus(response2.status);
                } else {
                  setStatus('Failed to save job.');
                }
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
        <p id='status'>{status}</p>
      </div>
      <button onClick={openSPA}>Dashboard</button>
    </>
  );
}

export default App;
