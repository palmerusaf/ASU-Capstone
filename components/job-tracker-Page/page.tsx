import {
  JobSelectType,
  jobStatus,
  jobStatusEmojis,
  jobTable,
} from '@/utils/db/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';
import { db } from '@/utils/db/db';

async function getSavedJobs(): Promise<JobSelectType[]> {
  return await db.select().from(jobTable);
}

export function JobTrackerPage() {
  const { isPending, error, data } = useQuery<JobSelectType[]>({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs,
  });
  const [tabValue, setTabValue] = useState<
    typeof jobTable.$inferInsert.status | 'all'
  >('all');

  if (isPending) {
    return <div className='p-24 text-center'>Loading saved jobs...</div>;
  }

  if (error) {
    return (
      <div className='p-24 text-center'>There was an error loading jobs.</div>
    );
  }

  return (
    <div className='grid gap-2 content-center px-12'>
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
            <TabsTrigger className='cursor-pointer' value={el}>
              {jobStatusEmojis[el]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <DataTable
        columns={columns}
        data={data.filter((el) => {
          if (tabValue === 'all') return true;
          return el.status === tabValue;
        })}
      />
    </div>
  );
}
