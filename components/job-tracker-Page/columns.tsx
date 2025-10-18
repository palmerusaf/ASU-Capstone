import logo from '/wxt.svg';
import {
  appliedJobsTable,
  JobSelectType,
  jobStatus,
  jobStatusEmojis,
  jobTable,
} from '@/utils/db/schema';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { JobModal } from '../job-modal';
import { Pencil } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { db } from '@/utils/db/db';
import { eq } from 'drizzle-orm';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeMatchesModal } from './resume-matches-modal';
import { CommentsDrawer } from './comments-drawer';

export const columns: ColumnDef<JobSelectType>[] = [
  {
    accessorKey: 'companyLogoUrl',
    header: '',
    cell: ({
      row: {
        original: { companyLogoUrl },
      },
    }) => {
      const imgUrl = !companyLogoUrl?.length ? logo : companyLogoUrl;
      return <img className='ml-2 w-7 h-7' src={imgUrl} alt={imgUrl} />;
    },
  },
  {
    accessorKey: 'companyName',
    header: 'Company',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string;

      return (
        <div className='w-[16ch] overflow-hidden overflow-ellipsis text-blue-700'>
          <a href={row.original.link} target='_blank' rel='noopener noreferrer'>
            {title}
          </a>
        </div>
      );
    },
  },
  {
    cell: ({
      row: {
        original: { location },
      },
    }) => (
      <div className='w-[16ch] overflow-hidden overflow-ellipsis'>
        {location}
      </div>
    ),
    header: 'Location',
  },
  {
    accessorKey: 'employmentType',
    header: 'Employment',
  },
  {
    accessorKey: 'payrate',
    header: 'Pay',
    cell: ({
      row: {
        original: { payrate, payType },
      },
    }) => <PayRate payrate={payrate} payType={payType} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({
      row: {
        original: { status, id },
      },
    }) => <EditStatus id={id} status={status} />,
  },
  {
    header: 'Resume',
    cell: ({ row: { original } }) => <ResumeMatchesModal data={original} />,
  },
  {
    header: 'Actions',
    cell: ({ row: { original } }) => (
      <ActionMenu
        items={[
          <JobModal key={'job'} data={original} />,
          <CommentsDrawer key={'comment'} id={original.id} />,
          <ArchiveButton key={'archive'} id={original.id} />,
          <DeleteButton key={'del'} id={original.id} />,
        ]}
      />
    ),
  },
];

function EditStatus({ id, status }: Pick<JobSelectType, 'id' | 'status'>) {
  const qc = useQueryClient();

  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer'>
        <div className='text-lg gap-2 flex'>
          {jobStatusEmojis[status]}
          <Pencil className='size-4 my-auto ' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='grid gap-4'>
        {jobStatus
          .filter((el) => {
            if (el === 'search result') return false;
            if (el === 'recently added') return false;
            return true;
          })
          .map((status) => {
            return (
              <Button
                key={status}
                onClick={async () => {
                  await updateStatus({ id, status: status });
                  qc.invalidateQueries({ queryKey: ['savedJobs'] });
                }}
                className='capitalize cursor-pointer'
              >
                {jobStatusEmojis[status]} {status}
              </Button>
            );
          })}
      </PopoverContent>
    </Popover>
  );
}

export async function updateStatus({
  id,
  status,
}: Pick<JobSelectType, 'id' | 'status'>) {
  await db.update(jobTable).set({ status }).where(eq(jobTable.id, id));
  const preAppStatuses: (typeof status)[] = [
    'search result',
    'interested',
    'not interested',
    'recently added',
  ];
  if (preAppStatuses.includes(status))
    await db.delete(appliedJobsTable).where(eq(appliedJobsTable.jobId, id));
  else
    await db
      .insert(appliedJobsTable)
      .values({ jobId: id })
      .onConflictDoNothing();
}

function DeleteButton({ id }: Pick<JobSelectType, 'id'>) {
  const qc = useQueryClient();
  return (
    <Button
      onClick={async () => {
        await db.delete(jobTable).where(eq(jobTable.id, id));
        qc.invalidateQueries({ queryKey: ['savedJobs'] });
      }}
      variant={'destructive'}
    >
      Delete
    </Button>
  );
}

function ArchiveButton({ id }: Pick<JobSelectType, 'id'>) {
  const qc = useQueryClient();
  return (
    <Button
      variant={'secondary'}
      onClick={async () => {
        await db
          .update(jobTable)
          .set({ archived: true })
          .where(eq(jobTable.id, id));
        qc.invalidateQueries({ queryKey: ['savedJobs'] });
      }}
    >
      Archive
    </Button>
  );
}

function ActionMenu({ items }: { items: React.ReactNode[] }) {
  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer'>
        <div className="p-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-1">
          View
        </div>
      </PopoverTrigger>
      <PopoverContent className='grid gap-4  max-w-fit'>{items}</PopoverContent>
    </Popover>
  );
}
