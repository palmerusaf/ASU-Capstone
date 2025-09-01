import { HandshakeJobDataType, jobTable } from '@/utils/db/schema';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';
import { db } from '@/utils/db/db';

async function getSavedJobs(): Promise<HandshakeJobDataType[]> {
  return await db.select().from(jobTable);
}

export function JobTrackerPage() {
  const { isPending, error, data } = useQuery<HandshakeJobDataType[]>({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs,
  });

  if (isPending) {
    return <div className='p-24 text-center'>Loading saved jobs...</div>;
  }

  if (error) {
    return (
      <div className='p-24 text-center'>There was an error loading jobs.</div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-12'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
