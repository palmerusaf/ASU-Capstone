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
import { eq } from 'drizzle-orm';

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
  const [rowSelection, setRowSelection] = useState({});

  if (!data) return 'Loading...';
  return (
    <div className='grid gap-2 content-center px-12'>
      <StatusTabs setTabValue={setTabValue} tabValue={tabValue} />
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

function StatusTabs({ setTabValue, tabValue }) {
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
