// ("server component") is where we'll fetch data and render our table.
// Since we are using Sidebar which is a client component, this should also be a client component.

'use client';

import { useEffect, useState } from 'react';
import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getSavedJobs(): Promise<Payment[]> {
  // TODO: Fetch data from API here.
  return [
    {
      id: '728ed52f',
      amount: 10000,
      status: 'pending',
      email: 'm@example.com',
    },
  ];
}

export default function JobTrackerPage() {
  const [jobs, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobs = await getSavedJobs();
      setData(jobs);
    };

    fetchData();
  }, []);

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
