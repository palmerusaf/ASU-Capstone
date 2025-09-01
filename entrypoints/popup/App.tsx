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

  async function saveJobData(jobData: unknown) {
    console.log('App#saveJobData jobData:', jobData);
    return true;
  }

  async function saveJob() {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!activeTab?.id) {
      setStatus('No active tab found.');
      return;
    }
    const jobId = await browser.tabs.sendMessage(activeTab.id, {
      message: 'Handshake-getJobId',
    });
    if (!jobId) {
      setStatus('No job ID found.');
      return;
    }
    const fetchedData = await browser.runtime.sendMessage({
      type: 'Handshake-fetchJobData',
      data: { jobId },
    });
    if (!fetchedData) {
      setStatus('Fetch failed.');
      return;
    }
    const saveOk = await saveJobData(fetchedData);
    setStatus(!saveOk ? 'Failed to save job.' : 'Job Saved');
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
