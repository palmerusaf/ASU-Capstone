import '@/assets/tailwind.css';
import { useState } from 'react';
import { PublicPath } from 'wxt/browser';
import './App.css';
import { HandshakeJobDataType } from '@/utils/db/schema';

function App() {
  const [status, setStatus] = useState('');

  async function openSPA() {
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html' as PublicPath),
      active: true,
    });
  }

  async function saveJob() {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!activeTab?.id) return setStatus('No active tab found.');

    const jobId = await browser.tabs.sendMessage(activeTab.id, {
      message: 'Handshake-getJobId',
    });
    if (jobId === null) return setStatus('No job ID found.');

    const token = await browser.tabs.sendMessage(activeTab.id, {
      message: 'Handshake-getToken',
    });
    if (token === null) return setStatus('Failed to get token.');

    const fetchedJob = await browser.runtime.sendMessage({
      type: 'Handshake-fetchJobData',
      data: { jobId, token },
    });
    if (fetchedJob === null) return setStatus('Fetch failed.');

    const jobData = parseFetchedJob(fetchedJob);
    if (jobData === null) return setStatus('Job Parsing failed.');

    const saveOk = await saveJobData(jobData);
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

async function saveJobData(jobData: unknown) {
  console.log('App#saveJobData jobData:', jobData);
  return true;
}

function parseFetchedJob(fetchedJob: any): HandshakeJobDataType | null {
  return null;
}
