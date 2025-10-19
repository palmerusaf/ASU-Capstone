'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { eq } from 'drizzle-orm';

import {
  JobSelectType,
  jobStatus,
  jobStatusEmojis,
  jobTable,
} from '@/utils/db/schema';
import { db } from '@/utils/db/db';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

async function getSavedJobs(): Promise<JobSelectType[]> {
  return await db.select().from(jobTable).where(eq(jobTable.archived, false));
}

export function JobTrackerPage() {
  const { data } = useQuery<JobSelectType[]>({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs,
  });

  const [tabValue, setTabValue] = useState<
    typeof jobTable.$inferInsert.status | 'all'
  >('all');

  // Filtered data memoized for performance
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (tabValue === 'all') return data;
    return data.filter((el) => el.status === tabValue);
  }, [data, tabValue]);

  // Build table instance with filtered data
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className='grid gap-2 content-center px-12'>
      <StatusTabs />
      <DataTable table={table} />
    </div>
  );

  function StatusTabs() {
    return (
      <Tabs
        value={tabValue}
        className='flex justify-center'
        onValueChange={(val) => setTabValue(val as typeof tabValue)}
      >
        <TabsList>
          <TabsTrigger className='cursor-pointer' value='all'>
            All
          </TabsTrigger>
          {jobStatus.map((el) => (
            <TabsTrigger key={el} className='cursor-pointer' value={el}>
              {jobStatusEmojis[el]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }
}
