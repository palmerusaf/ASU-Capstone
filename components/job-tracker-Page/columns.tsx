// (client component) will contain our column definitions.
import logo from '/wxt.svg';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  HandshakeJobDataType,
  jobStatusEmojis,
  jobTable,
} from '@/utils/db/schema';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';

export const columns: ColumnDef<HandshakeJobDataType>[] = [
  {
    accessorKey: 'companyLogoUrl',
    header: '',
    cell: ({ row }) => {
      const imgUrl = row.original.companyLogoUrl ?? logo;
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
        original: { status },
      },
    }) => <span className='text-lg'>{jobStatusEmojis[status]}</span>,
  },
  {
    header: 'Details',
    cell: ({ row: { original } }) => <JobModal data={original} />,
  },
];

function JobModal({ data }: { data: typeof jobTable.$inferSelect }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='p-3 py-1'>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Label>Title:</Label>
          {data.title}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
