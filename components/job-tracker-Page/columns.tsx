// (client component) will contain our column definitions.

import { HandshakeJobDataType } from '@/utils/db/schema';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<HandshakeJobDataType>[] = [
  {
    accessorKey: 'postingId',
    header: 'ID',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string;

      return (
        <a
          href={row.original.postingUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-700'
        >
          {title}
        </a>
      );
    },
  },
  {
    accessorKey: 'employmentType',
    header: 'Employment',
  },
  {
    accessorKey: 'jobType',
    header: 'Type',
  },
  {
    accessorKey: 'payRate',
    header: 'Pay',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

// export type HandshakeJobDataType = {
//   // Posting
//   postingId: number;
//   postingUrl: string;
//   externalApplyUrl?: string;

//   // Job
//   jobType: string; // e.g., Internship, Full-Time
//   employmentType: string; // e.g., Full-time, Part-time
//   title: string;
//   description: string;

//   // Company
//   company: string;
//   companyWebsite: string;
//   companyLogoUrl: string;

//   // Pay
//   payRate: string; // e.g., $42,411.00 Per year.
//   currency?: string; // e.g., USD, EUR

//   // location
//   city?: string;
//   country?: string;

//   // Status
//   status: Status;
// };
