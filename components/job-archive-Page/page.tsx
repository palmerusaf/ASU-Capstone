import { JobSelectType, jobTable } from '@/utils/db/schema';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';
import { db } from '@/utils/db/db';
import { eq } from 'drizzle-orm';

async function getSavedJobs(): Promise<JobSelectType[]> {
  return await db.select().from(jobTable).where(eq(jobTable.archived, true));
}

export function JobArchivePage() {
  const { isPending, error, data } = useQuery<JobSelectType[]>({
    queryKey: ['archivedJobs'],
    queryFn: getSavedJobs,
  });

  if (isPending) {
    return <div className='p-24 text-center'>Loading archived jobs...</div>;
  }

  if (error) {
    return (
      <div className='p-24 text-center'>
        There was an error loading archive.
      </div>
    );
  }

  return (
    <div className='grid gap-2 content-center px-12'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
