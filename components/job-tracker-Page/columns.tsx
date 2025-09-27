// (client component) will contain our column definitions.
import logo from '/wxt.svg';
import {
  JobSelectType,
  jobStatus,
  jobStatusEmojis,
  jobTable,
} from '@/utils/db/schema';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { JobModal } from './job-modal';
import { Pencil } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { db } from '@/utils/db/db';
import { eq } from 'drizzle-orm';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeMatchesModal } from './resume-matches-modal';

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
      return (
        <img
          className='ml-2'
          src={imgUrl}
          alt={imgUrl}
          width='25'
          height='25'
        />
      );
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
        original: { payrate },
      },
    }) =>
      payrate
        ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(payrate / 100)
        : 'n/a',
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
    header: 'Details',
    cell: ({ row: { original } }) => <JobModal data={original} />,
  },
  {
    header: 'Resume',
    cell: ({ row: { original } }) => <ResumeMatchesModal data={original} />,
  },
];

function EditStatus({
  id,
  status,
}: Pick<typeof jobTable.$inferSelect, 'id' | 'status'>) {
  const queryClient = useQueryClient();

  async function updateStatus(newStatus: typeof status) {
    await db
      .update(jobTable)
      .set({ status: newStatus })
      .where(eq(jobTable.id, id));
    queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
  }

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
          .map((el) => {
            return (
              <Button
                onClick={() => updateStatus(el)}
                className='capitalize cursor-pointer'
              >
                {jobStatusEmojis[el]} {el}
              </Button>
            );
          })}
      </PopoverContent>
    </Popover>
  );
}
