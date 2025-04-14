// ("server component") is where we'll fetch data and render our table.
// Since we are using Sidebar which is a client component, this should also be a client component.

'use client';

import { HandshakeJobDataType } from '@/utils/db/schema';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getSavedJobs(): Promise<HandshakeJobDataType[]> {
  const allSavedJobs =
    (await storage.getItem<HandshakeJobDataType[]>('local:handshakeJobs')) ??
    [];

  return allSavedJobs;
}

export default function JobTrackerPage() {
  const [jobs, setData] = useState<HandshakeJobDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobs = await getSavedJobs();
      setData(jobs);
    };

    fetchData();
  }, []);

  return (
    <div className='container mx-auto py-8 px-12'>
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
