import { JobSelectType, jobTable } from '@/utils/db/schema';
import { useQuery } from '@tanstack/react-query';
import { UnarchiveButton, columns } from './columns';
import { DataTable } from './data-table';
import { db } from '@/utils/db/db';
import { eq } from 'drizzle-orm';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DeleteButton } from '../job-tracker-Page/columns';

async function getSavedJobs(): Promise<JobSelectType[]> {
  return await db.select().from(jobTable).where(eq(jobTable.archived, true));
}

export function JobArchivePage() {
  const { data } = useQuery<JobSelectType[]>({
    queryKey: ['archivedJobs'],
    queryFn: getSavedJobs,
  });
  const [selRowState, setSelRowState] = useState({});
  const [selRowData, setSelRowData] = useState<JobSelectType[]>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { rowSelection: selRowState },
    onRowSelectionChange: setSelRowState,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  useEffect(() => {
    const selectedData = table
      .getSelectedRowModel()
      .rows.map((r) => r.original);
    setSelRowData(selectedData);
  }, [selRowState, table]);

  //clear checkboxes when data is updated
  useEffect(() => {
    setSelRowState({});
  }, [data]);
  if (!data)
    return <div className='p-24 text-center'>Loading archived jobs...</div>;

  return (
    <div className='grid gap-2 content-center p-12'>
      <MultiSelectMenu rows={selRowData} />
      <DataTable table={table} />
    </div>
  );
}
function MultiSelectMenu({ rows }: { rows: JobSelectType[] }) {
  if (!rows.length) return <></>;
  const ids = rows.map(({ id }) => id);
  return (
    <div className='flex justify-center gap-4 animate-in fade-in zoom-in duration-500'>
      <UnarchiveButton ids={ids} />
      <DeleteButton ids={ids} />
    </div>
  );
}
